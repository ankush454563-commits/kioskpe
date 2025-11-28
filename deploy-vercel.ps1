# deploy-vercel.ps1
# Usage: set environment variable VERCEL_TOKEN in your OS (or supply via CI), then run this script

$token = $env:VERCEL_TOKEN
if (-not $token) {
  Write-Host "VERCEL_TOKEN not found in environment. Please set it and re-run."
  Write-Host "You can create a token at https://vercel.com/account/tokens"
  exit 1
}

# Use existing NEXT_PUBLIC_API_URL or default to deployed backend
$apiUrl = $env:NEXT_PUBLIC_API_URL
if (-not $apiUrl) {
  $apiUrl = 'https://kioskpe-backend.onrender.com'
  Write-Host "NEXT_PUBLIC_API_URL not set — defaulting to $apiUrl"
}

Write-Host "Installing vercel CLI (if needed) and deploying..."

# Use npx to avoid global install; pass env var to the deploy command
$envArg = "-e NEXT_PUBLIC_API_URL=$apiUrl"

# Run the deploy command
# --prod for production deployment, --confirm to skip interactive prompts
$cmd = "npx vercel --prod --confirm --token $token $envArg"
Write-Host "Running: $cmd"

$proc = Start-Process -FilePath pwsh -ArgumentList "-NoProfile","-Command",$cmd -NoNewWindow -Wait -PassThru
if ($proc.ExitCode -eq 0) {
  Write-Host "Vercel deploy finished successfully (exit code 0)."
} else {
  Write-Host "Vercel deploy exited with code $($proc.ExitCode). Check output above for errors."
}
