param(
  [ValidateSet('local', 'docker', 'web', 'auth', 'api', 'db', 'all')]
  [string]$Mode = 'local',
  [ValidateSet('web', 'auth', 'api', 'db', 'all')]
  [string]$Service,
  [Alias('h')]
  [switch]$Help
)

$ErrorActionPreference = 'Stop'
$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$Runtime = Join-Path $Root '.runtime'

if ($Mode -in @('web', 'auth', 'api', 'db', 'all')) {
  if ($PSBoundParameters.ContainsKey('Service')) { throw "Error: Use either '.\scripts\stop.ps1 $Mode' or '.\scripts\stop.ps1 local $Service', not both." }
  $Service = $Mode
  $Mode = 'local'
}
if (-not $Service) { $Service = 'web' }

function Fail([string]$Message) { throw "Error: $Message" }
function Show-Usage {
  Write-Output @'
Usage: .\scripts\stop.ps1 [local|docker] [web|auth|api|db|all]
       .\scripts\stop.ps1 [web|auth|api|db|all]

Defaults to: local web
'@
}
function Need([string]$Command, [string]$Help) {
  if (-not (Get-Command $Command -ErrorAction SilentlyContinue)) { Fail "'$Command' is required. $Help" }
}
function Pid-File([string]$Name) { return (Join-Path $Runtime "$Name.pid") }
function Stop-LocalProcess([string]$Name, [string]$Expected) {
  $file = Pid-File $Name
  if (-not (Test-Path $file)) { Write-Output "$Name is not tracked as running."; return }
  $procId = (Get-Content $file -Raw).Trim()
  $process = Get-Process -Id $procId -ErrorAction SilentlyContinue
  if (-not $process) { Remove-Item $file -Force; Write-Output "$Name is already stopped."; return }
  $command = (Get-CimInstance Win32_Process -Filter "ProcessId = $procId" -ErrorAction SilentlyContinue).CommandLine
  if (-not $command -or $command -notmatch $Expected) { Fail "Refusing to stop PID ${procId}: it no longer looks like the tracked $Name process." }
  Write-Output "Stopping $Name (PID $procId)..."
  $previousErrorPreference = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  & taskkill.exe /PID $procId /T /F 2>$null | Out-Null
  $ErrorActionPreference = $previousErrorPreference
  Remove-Item $file -Force -ErrorAction SilentlyContinue
}
function Stop-LocalDatabase {
  $marker = Join-Path $Runtime 'postgres.service'
  if (-not (Test-Path $marker)) {
    Write-Output 'PostgreSQL was not started by this script; leaving it running.'
    return
  }
  $serviceName = (Get-Content $marker -Raw).Trim()
  $postgresService = Get-Service -Name $serviceName -ErrorAction SilentlyContinue
  if ($postgresService -and $postgresService.Status -ne 'Stopped') {
    Write-Output "Stopping PostgreSQL service '$serviceName'..."
    try { Stop-Service -Name $serviceName -ErrorAction Stop } catch { Fail "Could not stop PostgreSQL service '$serviceName'. $($_.Exception.Message)" }
  }
  Remove-Item $marker -Force -ErrorAction SilentlyContinue
}
function Stop-Local {
  switch ($Service) {
    'web' { Stop-LocalProcess 'web' 'pnpm' }
    'auth' { Stop-LocalProcess 'auth' 'pnpm' }
    'api' { Stop-LocalProcess 'api' 'uvicorn'; Stop-LocalDatabase }
    'db' { Stop-LocalDatabase }
    'all' { Stop-LocalProcess 'all' 'pnpm'; Stop-LocalProcess 'api' 'uvicorn'; Stop-LocalDatabase }
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

if ($Help) { Show-Usage; exit 0 }
if ($Mode -eq 'local') { Stop-Local } else { Stop-Docker }
