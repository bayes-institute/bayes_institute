param(
  [ValidateSet('local', 'docker')]
  [string]$Mode = 'local',
  [ValidateSet('web', 'auth', 'api', 'db', 'all')]
  [string]$Service = 'web'
)

$ErrorActionPreference = 'Stop'
$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$Runtime = Join-Path $Root '.runtime'

function Fail([string]$Message) { throw "Error: $Message" }
function Need([string]$Command, [string]$Help) {
  if (-not (Get-Command $Command -ErrorAction SilentlyContinue)) { Fail "'$Command' is required. $Help" }
}
function Pid-File([string]$Name) { return (Join-Path $Runtime "$Name.pid") }
function Stop-LocalProcess([string]$Name, [string]$Expected) {
  $file = Pid-File $Name
  if (-not (Test-Path $file)) { Write-Output "$Name is not tracked as running."; return }
  $pid = (Get-Content $file -Raw).Trim()
  $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
  if (-not $process) { Remove-Item $file -Force; Write-Output "$Name is already stopped."; return }
  $command = (Get-CimInstance Win32_Process -Filter "ProcessId = $pid" -ErrorAction SilentlyContinue).CommandLine
  if (-not $command -or $command -notmatch $Expected) { Fail "Refusing to stop PID $pid: it no longer looks like the tracked $Name process." }
  Write-Output "Stopping $Name (PID $pid)…"
  & taskkill.exe /PID $pid /T | Out-Null
  Start-Sleep -Milliseconds 500
  if (Get-Process -Id $pid -ErrorAction SilentlyContinue) { & taskkill.exe /PID $pid /T /F | Out-Null }
  Remove-Item $file -Force -ErrorAction SilentlyContinue
}
function Stop-Local {
  switch ($Service) {
    'web' { Stop-LocalProcess 'web' 'pnpm' }
    'auth' { Stop-LocalProcess 'auth' 'pnpm' }
    'api' { Stop-LocalProcess 'api' 'uvicorn' }
    'db' { Fail 'The local script does not own your PostgreSQL service; stop it with your OS service manager.' }
    'all' { Stop-LocalProcess 'all' 'pnpm'; Stop-LocalProcess 'api' 'uvicorn' }
  }
}
function Stop-Docker {
  Need docker 'Install Docker Desktop to stop Compose services.'
  & docker compose version | Out-Null
  if ($LASTEXITCODE -ne 0) { Fail 'Docker Compose v2 is required.' }
  Set-Location $Root
  switch ($Service) {
    'web' { & docker compose stop web }
    'auth' { & docker compose stop auth }
    'api' { & docker compose stop api postgres }
    'db' { & docker compose stop postgres }
    'all' { & docker compose --profile tools down --remove-orphans }
  }
}

if ($Mode -eq 'local') { Stop-Local } else { Stop-Docker }
