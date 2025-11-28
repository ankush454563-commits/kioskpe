# test-api-runner.ps1 - uses Invoke-RestMethod with JSON bodies
Write-Host "=== HEALTH ==="
try {
  $h = Invoke-RestMethod -Uri 'https://kioskpe-backend.onrender.com/api/health' -Method Get -ErrorAction Stop
  Write-Output $h
} catch {
  Write-Output "HEALTH ERROR: $_"
}

Write-Host "`n=== FINANCIAL REGISTER ==="
try {
  $body = @{ name='Test Agent'; email='test+agent@example.com'; phone='9999999999'; service='aeps'; city='Mumbai' }
  $json = $body | ConvertTo-Json -Compress
  $r = Invoke-RestMethod -Uri 'https://kioskpe-backend.onrender.com/api/financial/register' -Method Post -Body $json -ContentType 'application/json' -ErrorAction Stop
  Write-Output $r
} catch {
  if ($_.Exception.Response) { $s = $_.Exception.Response.GetResponseStream(); $sr = New-Object System.IO.StreamReader($s); Write-Output ($sr.ReadToEnd()) } else { Write-Output "FINANCIAL ERROR: $_" }
}

Write-Host "`n=== LEGAL APPOINTMENT ==="
try {
  $body = @{ name='Test Client'; email='test+legal@example.com'; phone='9999999999'; service='Document Drafting'; preferredDate=(Get-Date).AddDays(3).ToString('yyyy-MM-dd'); notes='Testing appointment booking' }
  $json = $body | ConvertTo-Json -Compress
  $r = Invoke-RestMethod -Uri 'https://kioskpe-backend.onrender.com/api/legal/appointment' -Method Post -Body $json -ContentType 'application/json' -ErrorAction Stop
  Write-Output $r
} catch {
  if ($_.Exception.Response) { $s = $_.Exception.Response.GetResponseStream(); $sr = New-Object System.IO.StreamReader($s); Write-Output ($sr.ReadToEnd()) } else { Write-Output "LEGAL ERROR: $_" }
}

Write-Host "`n=== CONTACT INQUIRY ==="
try {
  $body = @{ name='Visitor'; email='test+contact@example.com'; phone='9999999999'; message='Just testing contact form' }
  $json = $body | ConvertTo-Json -Compress
  $r = Invoke-RestMethod -Uri 'https://kioskpe-backend.onrender.com/api/contact/inquiry' -Method Post -Body $json -ContentType 'application/json' -ErrorAction Stop
  Write-Output $r
} catch {
  if ($_.Exception.Response) { $s = $_.Exception.Response.GetResponseStream(); $sr = New-Object System.IO.StreamReader($s); Write-Output ($sr.ReadToEnd()) } else { Write-Output "CONTACT ERROR: $_" }
}

Write-Host "`nAll tests executed."