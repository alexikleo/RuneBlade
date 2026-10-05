param([switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$gameRoot = Split-Path -Parent $PSScriptRoot
$gameUrl = 'http://localhost:3000/'
function Test-GameReady {
    try {
        $response = Invoke-WebRequest -Uri $gameUrl -UseBasicParsing -TimeoutSec 3
        return $response.StatusCode -eq 200 -and $response.Content -match 'Runeblade'
    } catch { return $false }
}
try {
    if (-not (Test-GameReady)) {
        $nodePath = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
        if (-not (Test-Path -LiteralPath $nodePath)) {
            $nodePath = (Get-Command node -ErrorAction Stop).Source
        }
        $cliPath = Join-Path $gameRoot 'node_modules\vinext\dist\cli.js'
        if (-not (Test-Path -LiteralPath $cliPath)) { throw 'Game dependencies are missing. Open this project in Codex to repair the installation.' }
        $logDir = Join-Path $gameRoot '.local-game'
        New-Item -ItemType Directory -Path $logDir -Force | Out-Null
        Write-Host 'Starting Runeblade...'
        $server = Start-Process -FilePath $nodePath -ArgumentList @(('"' + $cliPath + '"'), 'dev', '--port', '3000', '--strictPort') -WorkingDirectory $gameRoot -WindowStyle Hidden -RedirectStandardOutput (Join-Path $logDir 'server.log') -RedirectStandardError (Join-Path $logDir 'server-error.log') -PassThru
        $deadline = (Get-Date).AddSeconds(60)
        while (-not (Test-GameReady)) {
            $server.Refresh()
            if ($server.HasExited) { throw "The game server could not start. See $logDir\server-error.log (another app may be using port 3000)." }
            if ((Get-Date) -gt $deadline) { throw "The game is taking longer than expected to start. Try the shortcut again. Logs: $logDir" }
            Start-Sleep -Milliseconds 500
        }
    }
    Write-Host "Runeblade is ready at $gameUrl"
    if (-not $NoBrowser) { Start-Process $gameUrl }
} catch {
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}
