param(
  [ValidateSet('local', 'docker')]
  [string]$Mode = 'local',
  [ValidateSet('web', 'auth', 'api', 'db', 'all')]
  [string]$Service = 'web',
  [switch]$Tools
)

$ErrorActionPreference = 'Stop'
$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$Runtime = Join-Path $Root '.runtime'
$ApiDirectory = Join-Path (Join-Path (Join-Path $Root 'server') 'services') 'api'

function Fail([string]$Message) { throw "Error: $Message" }
function Need([string]$Command, [string]$Help) {
  if (-not (Get-Command $Command -ErrorAction SilentlyContinue)) { Fail "'$Command' is required. $Help" }
}
function Pid-File([string]$Name) { return (Join-Path $Runtime "$Name.pid") }
function Ensure-NotRunning([string]$Name) {
  $file = Pid-File $Name
  if (-not (Test-Path $file)) { return }
  $pid = Get-Content $file -Raw
  $process = Get-Process -Id $pid.Trim() -ErrorAction SilentlyContinue
  if ($process) { Fail "'$Name' is already running (PID $($process.Id)). Use .\scripts\stop.ps1 local $Name first." }
  Remove-Item $file -Force
}
function Start-Tracked([string]$Name, [string]$FilePath, [string[]]$Arguments, [string]$WorkingDirectory) {
  New-Item -ItemType Directory -Force -Path $Runtime | Out-Null
  Ensure-NotRunning $Name
  $process = Start-Process -FilePath $FilePath -ArgumentList $Arguments -WorkingDirectory $WorkingDirectory -PassThru
  Set-Content -Path (Pid-File $Name) -Value $process.Id -NoNewline
  return $process
}
function Stop-Tracked([string]$Name) {
  $file = Pid-File $Name
  if (-not (Test-Path $file)) { return }
  $pid = (Get-Content $file -Raw).Trim()
  $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
  if ($process) {
    & taskkill.exe /PID $pid /T | Out-Null
    Start-Sleep -Milliseconds 500
    if (Get-Process -Id $pid -ErrorAction SilentlyContinue) { & taskkill.exe /PID $pid /T /F | Out-Null }
  }
  Remove-Item $file -Force -ErrorAction SilentlyContinue
}
function Load-Env {
  $envFile = Join-Path $Root '.env'
  if (-not (Test-Path $envFile)) { Fail "Create .env first: Copy-Item .env.example .env" }
  Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -and -not $line.StartsWith('#')) {
      $pair = $line -split '=', 2
      if ($pair.Length -eq 2) { [Environment]::SetEnvironmentVariable($pair[0].Trim(), $pair[1].Trim().Trim([char]'"'), 'Process') }
    }
  }
}
function Install-Client {
  Need node 'Install Node.js 22 or newer.'
  Need pnpm 'Enable Corepack or install pnpm 11 or newer.'
  $nodeMajor = [int](& node -p 'process.versions.node.split(".")[0]')
  if ($nodeMajor -lt 22) { Fail "Node.js 22+ is required; found $(& node --version)." }
  Set-Location $Root
  & pnpm install --frozen-lockfile
}
function Prepare-Api {
  Load-Env
  Need py 'Install Python 3.12 or newer with the Python launcher.'
  Need pg_isready 'Install PostgreSQL 16+ locally, start it, then rerun this command.'
  $postgresUrl = $env:DATABASE_URL -replace 'postgresql\+asyncpg', 'postgresql'
  & pg_isready -d $postgresUrl | Out-Null
  if ($LASTEXITCODE -ne 0) { Fail 'PostgreSQL is not ready at DATABASE_URL.' }

  $venv = Join-Path $ApiDirectory '.venv'
  $python = Join-Path $venv 'Scripts\python.exe'
  if (-not (Test-Path $python)) { & py -3.12 -m venv $venv | Out-Host }
  & $python -m pip install --upgrade pip | Out-Host
  & $python -m pip install -e "$ApiDirectory[dev]" | Out-Host
  $script:ApiPython = $python
}
function Wait-Tracked([System.Diagnostics.Process]$Process, [string[]]$Cleanup) {
  try { Wait-Process -Id $Process.Id } finally { foreach ($name in $Cleanup) { Stop-Tracked $name } }
}
function Start-Local {
  switch ($Service) {
    'web' {
      Install-Client
      $web = Start-Tracked 'web' 'pnpm' @('--filter', '@bayes/web', 'dev') $Root
      Wait-Tracked $web @('web')
      break
    }
    'auth' {
      Install-Client
      $auth = Start-Tracked 'auth' 'pnpm' @('--filter', '@bayes/auth', 'dev') $Root
      Wait-Tracked $auth @('auth')
      break
    }
    'api' {
      Prepare-Api
      $api = Start-Tracked 'api' $ApiPython @('-m', 'uvicorn', 'app.main:app', '--reload', '--port', '8000') $ApiDirectory
      Wait-Tracked $api @('api')
      break
    }
    'db' { Fail "The local script cannot provision PostgreSQL. Start your installed PostgreSQL service, then use 'local api' or 'local all'." }
    'all' {
      Install-Client
      Prepare-Api
      $api = Start-Tracked 'api' $ApiPython @('-m', 'uvicorn', 'app.main:app', '--reload', '--port', '8000') $ApiDirectory
      $client = Start-Tracked 'all' 'pnpm' @('dev') $Root
      Wait-Tracked $client @('all', 'api')
      break
    }
  }
}
function Start-Docker {
  Need docker "Install Docker Desktop, or use '.\scripts\start.ps1 local'."
  & docker compose version | Out-Null
  if ($LASTEXITCODE -ne 0) { Fail 'Docker Compose v2 is required.' }
  if ($Tools -and $Service -notin @('all')) { Fail 'pgAdmin is only available with the all target.' }
  Set-Location $Root
  $profile = @()
  if ($Tools) { $profile = @('--profile', 'tools') }
  if ($Service -eq 'db') { & docker compose up postgres; return }
  if ($Service -eq 'all') { & docker compose @profile up --build } else { & docker compose @profile up --build $Service }
}

if ($Mode -eq 'local') { Start-Local } else { Start-Docker }
