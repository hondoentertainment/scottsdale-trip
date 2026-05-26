# Scottsdale Trip — fast deploy to Vercel
# Usage: .\deploy.ps1

Write-Host "Building..." -ForegroundColor Cyan
npm run build --silent

Write-Host "Preparing deploy..." -ForegroundColor Cyan
if (Test-Path ".vercel\output\static") { Remove-Item -Recurse -Force ".vercel\output\static" }
New-Item -ItemType Directory -Path ".vercel\output\static" -Force | Out-Null
Copy-Item -Recurse "out\*" ".vercel\output\static\"

Write-Host "Deploying to production..." -ForegroundColor Cyan
Rename-Item .git .git-backup
try {
    npx vercel deploy --prebuilt --prod --yes
} finally {
    Rename-Item .git-backup .git
}

Write-Host "Done — https://scottsdale-trip.vercel.app" -ForegroundColor Green
