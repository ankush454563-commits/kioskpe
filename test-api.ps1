# test-api.ps1
$base = "https://kioskpe-backend.onrender.com"

function GET-Json($path) {
  Write-Host "`n=== GET $path ===`n"
  try {
    $res = Invoke-RestMethod -Uri "$base$path" -Method Get -ErrorAction Stop
    $res | ConvertTo-Json -Depth 6
  } catch {
    Write-Host "ERROR (GET) $path"
    if ($_.Exception.Response) {
      $stream = $_.Exception.Response.GetResponseStream()
      $sr = New-Object System.IO.StreamReader($stream)
      $sr.ReadToEnd()
    } else {
      $_.Exception.Message
    }
  }
}

function POST-Json($path, $payload) {
  Write-Host "`n=== POST $path ===`n"
  try {
    $body = $payload | ConvertTo-Json -Depth 6
    $res = Invoke-RestMethod -Uri "$base$path" -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
    $res | ConvertTo-Json -Depth 6
  } catch {
    Write-Host "ERROR (POST) $path"
    if ($_.Exception.Response) {
      $stream = $_.Exception.Response.GetResponseStream()
      $sr = New-Object System.IO.StreamReader($stream)
      $sr.ReadToEnd()
    } else {
      $_.Exception.Message
    }
  }
}

# 1) Health
GET-Json "/api/health"

# 2) Financial registration
POST-Json "/api/financial/register" @{
  name = "Test Agent"
  email = "test+agent@example.com"
  phone = "9999999999"
  service = "AEPS"
  city = "Mumbai"
}

# 3) Legal appointment
POST-Json "/api/legal/appointment" @{
  name = "Test Client"
  email = "test+legal@example.com"
  phone = "9999999999"
  service = "Document Drafting"
  preferredDate = (Get-Date).AddDays(3).ToString("yyyy-MM-dd")
  notes = "Testing appointment booking"
}

# 4) Digital quotation
POST-Json "/api/digital/quotation" @{
  name = "Test Customer"
  email = "test+digital@example.com"
  phone = "9999999999"
  service = "Website Development"
  budget = "20000-50000"
  details = "Need small business website"
}

# 5) Loan application
POST-Json "/api/loans/apply" @{
  name = "Loan Applicant"
  email = "test+loan@example.com"
  phone = "9999999999"
  amount = 50000
  tenureMonths = 24
  income = 45000
}

# 5b) EMI calculator
POST-Json "/api/loans/calculate-emi" @{
  principal = 50000
  annualRate = 12
  months = 24
}

# 6) Bulk laptop deal
POST-Json "/api/laptops/bulk-deal" @{
  companyName = "Test Co"
  contactName = "Purchaser"
  email = "test+laptop@example.com"
  phone = "9999999999"
  quantity = 10
  requirements = "Business laptops, i5, 8GB RAM, 256GB SSD"
}

# 7) Contact inquiry
POST-Json "/api/contact/inquiry" @{
  name = "Visitor"
  email = "test+contact@example.com"
  phone = "9999999999"
  message = "Just testing contact form"
}

# 8) Partner registration
POST-Json "/api/contact/partner" @{
  name = "Partner Candidate"
  email = "test+partner@example.com"
  phone = "9999999999"
  company = "Partner Co"
  services = "AEPS, Loans"
}

Write-Host "`nAll tests executed. Check output above for results.`"
