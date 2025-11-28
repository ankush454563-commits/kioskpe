# Kioskpe Backend API

Backend API for Kioskpe multi-service platform built with Node.js, Express, and MongoDB.

## 🚀 Features

- RESTful API for all frontend forms
- MongoDB database integration
- Email notifications via Nodemailer
- Form validation with express-validator
- CORS enabled for frontend integration
- Security with Helmet
- Request logging with Morgan

## 📋 API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Financial Services
- `POST /api/financial/register` - Agent/Retailer registration
- `GET /api/financial/registrations` - Get all registrations (admin)

### Legal Services
- `POST /api/legal/appointment` - Book appointment
- `POST /api/legal/upload` - Upload documents
- `GET /api/legal/appointments` - Get all appointments (admin)

### Digital Solutions
- `POST /api/digital/quotation` - Request quotation
- `GET /api/digital/quotations` - Get all quotations (admin)

### Loans
- `POST /api/loans/apply` - Submit loan application
- `POST /api/loans/calculate-emi` - Calculate EMI
- `GET /api/loans/applications` - Get all applications (admin)

### Laptops
- `POST /api/laptops/bulk-deal` - Request bulk deal
- `GET /api/laptops/bulk-deals` - Get all deals (admin)

### Contact
- `POST /api/contact/inquiry` - Submit contact form
- `POST /api/contact/partner` - Partner registration
- `GET /api/contact/inquiries` - Get all inquiries (admin)
- `GET /api/contact/partners` - Get all partners (admin)

## 🛠️ Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` file with your values:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_uri
FRONTEND_URL=https://your-frontend.vercel.app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@kioskpe.com
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Run Production Server
```bash
npm start
```

## 🌐 Deploy to Render

### Step 1: Create MongoDB Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string (replace `<password>` with your password)

### Step 2: Push to GitHub
```bash
cd backend
git init
git add .
git commit -m "Initial backend commit"
git remote add origin https://github.com/yourusername/kioskpe-backend.git
git push -u origin main
```

### Step 3: Deploy on Render
1. Go to [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: kioskpe-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Region**: Select closest to you

5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = Your MongoDB connection string
   - `FRONTEND_URL` = Your Vercel frontend URL
   - `EMAIL_HOST` = `smtp.gmail.com`
   - `EMAIL_PORT` = `587`
   - `EMAIL_USER` = Your Gmail
   - `EMAIL_PASS` = Your App Password
   - `ADMIN_EMAIL` = Your admin email

6. Click "Create Web Service"

### Step 4: Get Your API URL
After deployment, Render will give you a URL like:
```
https://kioskpe-backend.onrender.com
```

## 📧 Email Setup (Gmail)

1. Enable 2-Factor Authentication in your Google Account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate an app password for "Mail"
4. Use this password in `EMAIL_PASS` environment variable

## 🔗 Connect Frontend to Backend

Update your frontend API calls to use the backend URL:

```typescript
// Example: In your frontend form submission
const response = await fetch('https://kioskpe-backend.onrender.com/api/financial/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});
```

## 📊 Database Models

### FinancialRegistration
- name, email, phone, service, message, status

### Appointment
- name, email, phone, service, date, time, message, status

### Quotation
- name, email, phone, service, budget, description, status

### LoanApplication
- name, email, phone, loanType, amount, employment, income, status

### BulkDeal
- name, company, email, phone, quantity, specifications, message, status

### ContactInquiry
- name, email, phone, subject, message, status

### PartnerRegistration
- name, email, phone, city, state, businessType, investment, experience, status

## 🔒 Security

- Helmet for security headers
- CORS configured for specific origins
- Input validation on all endpoints
- MongoDB injection protection via Mongoose

## 📝 Testing

Test the API using curl or Postman:

```bash
# Health check
curl https://your-backend-url.onrender.com/api/health

# Submit registration
curl -X POST https://your-backend-url.onrender.com/api/financial/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"1234567890","service":"aeps"}'
```

## 🆘 Troubleshooting

### MongoDB Connection Issues
- Verify connection string is correct
- Whitelist Render's IP (0.0.0.0/0) in MongoDB Atlas
- Check if database user has proper permissions

### Email Not Sending
- Verify Gmail app password is correct
- Check if 2FA is enabled on Gmail account
- Confirm EMAIL_USER and EMAIL_PASS are set in environment variables

### CORS Errors
- Set FRONTEND_URL to your actual frontend domain
- Include protocol (https://) in the URL

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **nodemailer**: Email sending
- **express-validator**: Input validation
- **cors**: CORS middleware
- **helmet**: Security middleware
- **morgan**: Request logging
- **dotenv**: Environment variables

## 🔄 Updates

To update the deployed backend:
```bash
git add .
git commit -m "Update message"
git push
```

Render will automatically redeploy.

## 📞 Support

For issues or questions, check the logs in Render dashboard.

---

**Status**: Ready to deploy ✅
**Database**: MongoDB Atlas required
**Hosting**: Render.com (Free tier available)
