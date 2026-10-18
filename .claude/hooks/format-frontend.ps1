# Formats frontend/src files after Claude Write|Edit tools.
$ErrorActionPreference = 'Stop'

$raw = [Console]::In.ReadToEnd()
if (-not $raw) { exit 0 }

try {
  $payload = $raw | ConvertFrom-Json
} catch {
  exit 0
}

$path = $payload.tool_input.file_path
if (-not $path) { exit 0 }

$normalized = $path -replace '/', '\'
if ($normalized -notmatch '(?i)\\frontend\\src\\') { exit 0 }
if ($normalized -notmatch '\.(tsx?|jsx?|css|json|md)$') { exit 0 }
if (-not (Test-Path -LiteralPath $path)) { exit 0 }

$projectDir = $env:CLAUDE_PROJECT_DIR
if (-not $projectDir) {
  $projectDir = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
}

$frontendDir = Join-Path $projectDir 'frontend'
$prettier = Join-Path $frontendDir 'node_modules\.bin\prettier.cmd'

if (Test-Path -LiteralPath $prettier) {
  & $prettier --write -- $path | Out-Null
} else {
  Push-Location $frontendDir
  try {
    npx --yes prettier --write -- $path | Out-Null
  } finally {
    Pop-Location
  }
}

exit 0
