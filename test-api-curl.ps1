# test-api-curl.ps1
Write-Host "=== HEALTH ==="
curl.exe -s "https://kioskpe-backend.onrender.com/api/health" | Write-Host

Write-Host "`n=== FINANCIAL REGISTER ==="
curl.exe -s -X POST "https://kioskpe-backend.onrender.com/api/financial/register" -H "Content-Type: application/json" -d '{"name":"Test Agent","email":"test+agent@example.com","phone":"9999999999","service":"AEPS","city":"Mumbai"}' | Write-Host

Write-Host "`n=== LEGAL APPOINTMENT ==="
curl.exe -s -X POST "https://kioskpe-backend.onrender.com/api/legal/appointment" -H "Content-Type: application/json" -d '{"name":"Test Client","email":"test+legal@example.com","phone":"9999999999","service":"Document Drafting","preferredDate":"2025-11-22","notes":"Testing appointment booking"}' | Write-Host

Write-Host "`n=== CONTACT INQUIRY ==="
curl.exe -s -X POST "https://kioskpe-backend.onrender.com/api/contact/inquiry" -H "Content-Type: application/json" -d '{"name":"Visitor","email":"test+contact@example.com","phone":"9999999999","message":"Just testing contact form"}' | Write-Host

Write-Host "`nAll curl tests executed."