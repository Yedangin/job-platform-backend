$ErrorActionPreference = 'Stop'

# MongoDB replica-set 인증키는 PC별 로컬 비밀정보이므로 Git으로 공유하지 않습니다.
# The MongoDB replica-set key is a machine-local secret and must not be committed.
$repositoryRoot = Split-Path -Parent $PSScriptRoot
$keyPath = Join-Path $repositoryRoot 'mongo-keyfile'

if (Test-Path -LiteralPath $keyPath) {
  Write-Host 'mongo-keyfile already exists; leaving it unchanged.'
  exit 0
}

$bytes = New-Object byte[] 756
$generator = [System.Security.Cryptography.RandomNumberGenerator]::Create()
try {
  $generator.GetBytes($bytes)
} finally {
  $generator.Dispose()
}

$key = [Convert]::ToBase64String($bytes)
[System.IO.File]::WriteAllText($keyPath, $key, [System.Text.UTF8Encoding]::new($false))
Write-Host 'Created local mongo-keyfile. Do not commit or share this file.'
