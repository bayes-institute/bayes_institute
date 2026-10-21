param(
  [ValidateSet('local', 'docker', 'web', 'auth', 'api', 'db', 'all')]
  [string]$Mode = 'local',
  [ValidateSet('web', 'auth', 'api', 'db', 'all')]
  [string]$Service,
  [switch]$Tools,
  [Alias('h')]
  [switch]$Help
)

$ErrorActionPreference = 'Stop'
$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$Runtime = Join-Path $Root '.runtime'
$ApiDirectory = Join-Path (Join-Path (Join-Path $Root 'server') 'services') 'api'

if ($Mode -in @('web', 'auth', 'api', 'db', 'all')) {
  if ($PSBoundParameters.ContainsKey('Service')) { throw "Error: Use either '.\scripts\start.ps1 $Mode' or '.\scripts\start.ps1 local $Service', not both." }
  $Service = $Mode
  $Mode = 'local'
}
if (-not $Service) { $Service = 'web' }

function Fail([string]$Message) { throw "Error: $Message" }
function Show-Usage {
  Write-Output @'
Usage: .\scripts\start.ps1 [local|docker] [web|auth|api|db|all] [-Tools]
       .\scripts\start.ps1 [web|auth|api|db|all]

Examples:
  .\scripts\start.ps1 web          Start the web app locally
  .\scripts\start.ps1 all          Start both clients, FastAPI, and PostgreSQL
  .\scripts\start.ps1 docker all   Start the complete stack in Docker

Defaults to: local web
'@
}
function Need([string]$Command, [string]$Help) {
  if (-not (Get-Command $Command -ErrorAction SilentlyContinue)) { Fail "'$Command' is required. $Help" }
}
function Pid-File([string]$Name) { return (Join-Path $Runtime "$Name.pid") }
function Ensure-NotRunning([string]$Name) {
  $file = Pid-File $Name
  if (-not (Test-Path $file)) { return }
  $procId = Get-Content $file -Raw
  $process = Get-Process -Id $procId.Trim() -ErrorAction SilentlyContinue
  if ($process) { Fail "'$Name' is already running (PID $($process.Id)). Use .\scripts\stop.ps1 local $Name first." }
  Remove-Item $file -Force
}
function Resolve-Exe([string]$Command) {
  $cmd = Get-Command $Command -All -ErrorAction SilentlyContinue |
    Where-Object { $_.Source -match '\.(exe|cmd|bat|com)$' } |
    Select-Object -First 1
  if (-not $cmd) { $cmd = Get-Command $Command -ErrorAction SilentlyContinue }
  if (-not $cmd) { return $Command }
  return $cmd.Source
}
function Start-Tracked([string]$Name, [string]$FilePath, [string[]]$Arguments, [string]$WorkingDirectory) {
  New-Item -ItemType Directory -Force -Path $Runtime | Out-Null
  Ensure-NotRunning $Name
  $exe = Resolve-Exe $FilePath
  $argList = $Arguments
  if ($exe -match '\.(cmd|bat)$') {
    $argList = @('/c', $exe) + $Arguments
    $exe = 'cmd.exe'
  }
  $process = Start-Process -FilePath $exe -ArgumentList $argList -WorkingDirectory $WorkingDirectory -NoNewWindow -PassThru
  Set-Content -Path (Pid-File $Name) -Value $process.Id -NoNewline
  return $process
}
function Stop-Tracked([string]$Name) {
  $file = Pid-File $Name
  if (-not (Test-Path $file)) { return }
  $procId = (Get-Content $file -Raw).Trim()
  $process = Get-Process -Id $procId -ErrorAction SilentlyContinue
  if ($process) {
    $previousErrorPreference = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    & taskkill.exe /PID $procId /T /F 2>$null | Out-Null
    $ErrorActionPreference = $previousErrorPreference
  }
  Remove-Item $file -Force -ErrorAction SilentlyContinue
}
function Load-Env {
  $envFile = Join-Path $Root '.env'
  if (-not (Test-Path $envFile)) {
    Copy-Item (Join-Path $Root '.env.example') $envFile
    Write-Output 'Created .env from .env.example.'
  }
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
  $nodeVersion = (& node --version).Trim()
  if ($nodeVersion -notmatch '^v(?<major>\d+)\.') { Fail "Could not determine the Node.js version from '$nodeVersion'." }
  if ([int]$Matches.major -lt 22) { Fail "Node.js 22+ is required; found $nodeVersion." }
  Set-Location $Root
  & pnpm install --frozen-lockfile
  if ($LASTEXITCODE -ne 0) { Fail 'pnpm install failed.' }
}
function Test-DatabaseLogin {
  $previousErrorPreference = $ErrorActionPreference
  $oldPgPassword = $env:PGPASSWORD
  $env:PGPASSWORD = $env:POSTGRES_PASSWORD
  $ErrorActionPreference = 'Continue'
  & psql --host=localhost "--port=$($env:POSTGRES_PORT)" "--username=$($env:POSTGRES_USER)" "--dbname=$($env:POSTGRES_DB)" --no-password --quiet --command="SELECT 1" 2>$null | Out-Null
  $succeeded = $LASTEXITCODE -eq 0
  $ErrorActionPreference = $previousErrorPreference
  if ($null -eq $oldPgPassword) { Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue } else { $env:PGPASSWORD = $oldPgPassword }
  return $succeeded
}
function Initialize-DevelopmentDatabase {
  Need psql 'Install the PostgreSQL command-line tools or create the configured development database manually.'
  if ($script:PostgresUrl -notmatch '@(localhost|127\.0\.0\.1)(:|/)') { Fail 'PostgreSQL is reachable, but DATABASE_URL authentication failed. Automatic provisioning is limited to localhost.' }
  if (Test-DatabaseLogin) { Write-Output 'PostgreSQL credentials are valid.'; return }

  foreach ($name in @($env:POSTGRES_DB, $env:POSTGRES_USER, $env:POSTGRES_ADMIN_USER)) {
    if ($name -notmatch '^[A-Za-z_][A-Za-z0-9_]*$') { Fail "PostgreSQL development identifiers must contain only letters, digits, and underscores: '$name'." }
  }
  if (-not $env:POSTGRES_ADMIN_USER -or -not $env:POSTGRES_ADMIN_PASSWORD) {
    Fail 'Database login failed. Set POSTGRES_ADMIN_USER and POSTGRES_ADMIN_PASSWORD in .env so the local development role can be provisioned.'
  }

  Write-Output "Provisioning local PostgreSQL role '$env:POSTGRES_USER' and database '$env:POSTGRES_DB'..."
  $oldPgPassword = $env:PGPASSWORD
  $env:PGPASSWORD = $env:POSTGRES_ADMIN_PASSWORD
  $escapedPassword = $env:POSTGRES_PASSWORD.Replace("'", "''")
  $adminArgs = @('--host=localhost', "--port=$($env:POSTGRES_PORT)", "--username=$($env:POSTGRES_ADMIN_USER)", '--dbname=postgres', '--no-password', '--set=ON_ERROR_STOP=1')
  $dollarQuote = ([char]36).ToString() + ([char]36).ToString()
  $roleSql = "DO $dollarQuote BEGIN IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '$($env:POSTGRES_USER)') THEN ALTER ROLE `"$($env:POSTGRES_USER)`" WITH LOGIN PASSWORD '$escapedPassword'; ELSE CREATE ROLE `"$($env:POSTGRES_USER)`" LOGIN PASSWORD '$escapedPassword'; END IF; END $dollarQuote;"
  try {
    & psql @adminArgs --command=$roleSql | Out-Host
    if ($LASTEXITCODE -ne 0) { Fail 'Could not provision the PostgreSQL development role. Check POSTGRES_ADMIN_USER and POSTGRES_ADMIN_PASSWORD in .env.' }
    $databaseExists = (& psql @adminArgs --tuples-only --no-align --command="SELECT 1 FROM pg_database WHERE datname = '$($env:POSTGRES_DB)'" | Out-String).Trim()
    if ($LASTEXITCODE -ne 0) { Fail 'Could not inspect PostgreSQL databases with the configured administrator credentials.' }
    if ($databaseExists -ne '1') {
      & psql @adminArgs --command="CREATE DATABASE `"$($env:POSTGRES_DB)`" OWNER `"$($env:POSTGRES_USER)`"" | Out-Host
      if ($LASTEXITCODE -ne 0) { Fail 'Could not create the PostgreSQL development database.' }
    }
  } finally {
    if ($null -eq $oldPgPassword) { Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue } else { $env:PGPASSWORD = $oldPgPassword }
  }
  if (-not (Test-DatabaseLogin)) { Fail 'The development database was provisioned, but DATABASE_URL still cannot authenticate.' }
  Write-Output 'PostgreSQL credentials are valid.'
}
function Ensure-LocalDatabase {
  Load-Env
  Need pg_isready 'Install PostgreSQL locally or use Docker mode.'
  $script:PostgresUrl = $env:DATABASE_URL -replace 'postgresql\+asyncpg', 'postgresql'
  & pg_isready -d $script:PostgresUrl | Out-Null
  if ($LASTEXITCODE -eq 0) {
    Write-Output 'PostgreSQL is ready.'
    Initialize-DevelopmentDatabase
    return
  }

  $postgresService = Get-Service -ErrorAction SilentlyContinue | Where-Object { $_.Name -like 'postgresql*' } | Select-Object -First 1
  if (-not $postgresService) { Fail 'PostgreSQL is not reachable and no PostgreSQL Windows service was found. Start PostgreSQL or install Docker Desktop and use docker mode.' }
  if ($postgresService.Status -ne 'Running') {
    Write-Output "Starting PostgreSQL service '$($postgresService.Name)'..."
    try { Start-Service -Name $postgresService.Name } catch { Fail "Could not start PostgreSQL service '$($postgresService.Name)'. Start PowerShell as Administrator or start the service manually. $($_.Exception.Message)" }
    New-Item -ItemType Directory -Force -Path $Runtime | Out-Null
    Set-Content -Path (Join-Path $Runtime 'postgres.service') -Value $postgresService.Name -NoNewline
  }
  for ($attempt = 0; $attempt -lt 30; $attempt++) {
    & pg_isready -d $script:PostgresUrl | Out-Null
    if ($LASTEXITCODE -eq 0) { Write-Output 'PostgreSQL is ready.'; Initialize-DevelopmentDatabase; return }
    Start-Sleep -Seconds 1
  }
  Fail 'PostgreSQL did not become ready within 30 seconds.'
}
function Prepare-Api {
  Ensure-LocalDatabase
  Need py 'Install Python 3.12 or newer with the Python launcher.'

  $venv = Join-Path $ApiDirectory '.venv'
  $python = Join-Path $venv 'Scripts\python.exe'
  if (-not (Test-Path $python)) { & py -3.12 -m venv $venv | Out-Host }
  if (-not (Test-Path $python)) { Fail 'Could not create the Python 3.12 virtual environment.' }
  & $python -m pip install --upgrade pip | Out-Host
  if ($LASTEXITCODE -ne 0) { Fail 'Could not upgrade pip in the API virtual environment.' }
  & $python -m pip install -e "$ApiDirectory[dev]" | Out-Host
  if ($LASTEXITCODE -ne 0) { Fail 'Could not install the API dependencies.' }
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
    'db' { Ensure-LocalDatabase }
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

if ($Help) { Show-Usage; exit 0 }
if ($Mode -eq 'local') { Start-Local } else { Start-Docker }
