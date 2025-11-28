# Quick Start Script for Backend

Write-Host "🚀 Setting up Kioskpe Backend..." -ForegroundColor Green

# Check if .env exists
if (!(Test-Path .env)) {
    Write-Host "📝 Creating .env file from example..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✅ .env file created. Please edit it with your credentials." -ForegroundColor Green
    Write-Host ""
    Write-Host "You need to set:" -ForegroundColor Cyan
    Write-Host "  - MONGODB_URI (from MongoDB Atlas)" -ForegroundColor White
    Write-Host "  - EMAIL_USER (your Gmail)" -ForegroundColor White
    Write-Host "  - EMAIL_PASS (Gmail App Password)" -ForegroundColor White
    Write-Host "  - ADMIN_EMAIL (your admin email)" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

# Check if node_modules exists
if (!(Test-Path node_modules)) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}

# Initialize git if not already
if (!(Test-Path .git)) {
    Write-Host "🐙 Initializing git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git already initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Edit .env file with your credentials" -ForegroundColor White
Write-Host "2. Run: npm run dev (for development)" -ForegroundColor White
Write-Host "3. Or deploy to Render (see DEPLOY_GUIDE.md)" -ForegroundColor White
Write-Host ""
Write-Host "📖 Full deployment guide: DEPLOY_GUIDE.md" -ForegroundColor Yellow
