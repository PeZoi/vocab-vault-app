# 🚀 Quick Push Script - No prompts, just build & push!
# For users already authenticated with Docker Hub

param(
    [string]$Username = "pezoi",
    [string]$Tag = "latest"
)

Write-Host "🚀 Quick Docker Build & Push..." -ForegroundColor Cyan
Write-Host "Building and pushing: $Username/vocab-vault-*:$Tag" -ForegroundColor White

try {
    # Generate sitemap
    Write-Host "🗺️ Generating sitemap..." -ForegroundColor Yellow
    Set-Location vocab_vault_fe
    npm run generate-sitemap | Out-Null
    Set-Location ..

    # Build images
    Write-Host "🔨 Building images..." -ForegroundColor Yellow
    docker build -t "$Username/vocab-vault-backend:$Tag" -f vocab_vault_be/Dockerfile vocab_vault_be --quiet
    docker build -t "$Username/vocab-vault-frontend:$Tag" -f vocab_vault_fe/Dockerfile . --quiet

    # Push images
    Write-Host "📤 Pushing images..." -ForegroundColor Yellow
    docker push "$Username/vocab-vault-backend:$Tag" | Out-Null
    docker push "$Username/vocab-vault-frontend:$Tag" | Out-Null

    Write-Host "✅ Done! Images pushed successfully!" -ForegroundColor Green
    Write-Host "🚀 Run on server: docker compose pull && docker compose up -d" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
} 