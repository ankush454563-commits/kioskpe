# Kioskpe Backend - Quick Reference

## 🎯 What's This?

Complete Node.js/Express backend API for all Kioskpe website forms with:
- MongoDB database storage
- Email notifications via Nodemailer
- Input validation
- Ready to deploy on Render.com (FREE)

## ⚡ Quick Start

### Local Development
```bash
# 1. Setup (first time only)
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials

# 2. Run development server
npm run dev

# 3. Test
# Open: http://localhost:5000
```

### Deploy to Render (FREE)
```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/kioskpe-backend.git
git push -u origin main

# 2. Deploy on Render.com
# - Connect GitHub repo
# - Add environment variables
# - Deploy!

# See DEPLOY_GUIDE.md for detailed steps
```

## 📡 API Endpoints

Base URL (after deploy): `https://your-app.onrender.com`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/health` | GET | Check if API is running |
| `/api/financial/register` | POST | Financial services registration |
| `/api/legal/appointment` | POST | Book legal appointment |
| `/api/digital/quotation` | POST | Request digital solutions quote |
| `/api/loans/apply` | POST | Submit loan application |
| `/api/loans/calculate-emi` | POST | Calculate loan EMI |
| `/api/laptops/bulk-deal` | POST | Request bulk laptop deal |
| `/api/contact/inquiry` | POST | General contact form |
| `/api/contact/partner` | POST | Partner registration |

## 🔑 Required Environment Variables

```env
# MongoDB (get from mongodb.com/cloud/atlas)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/kioskpe

# Email (Gmail with App Password)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@kioskpe.com

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend.vercel.app
```

## 📝 Example API Usage

### Test Health Check
```bash
curl https://your-backend.onrender.com/api/health
```

### Submit Registration (from frontend)
```javascript
const response = await fetch('https://your-backend.onrender.com/api/financial/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    service: 'aeps',
    message: 'Interested in becoming an agent'
  })
});

const data = await response.json();
console.log(data); // { status: 'success', ... }
```

## 📁 Project Structure

```
backend/
├── models/           # MongoDB schemas
│   ├── FinancialRegistration.js
│   ├── Appointment.js
│   ├── Quotation.js
│   ├── LoanApplication.js
│   ├── BulkDeal.js
│   └── Contact.js
├── routes/           # API endpoints
│   ├── financial.js
│   ├── legal.js
│   ├── digital.js
│   ├── loan.js
│   ├── laptop.js
│   └── contact.js
├── utils/
│   └── email.js     # Email sending utility
├── server.js        # Main server file
├── package.json
├── .env.example
└── README.md
```

## 🎨 Database Models

### All forms save data with these fields:
- User details (name, email, phone)
- Service-specific information
- Status (pending/contacted/approved/etc.)
- Timestamp (createdAt)

### Admin can access via GET endpoints:
- `/api/financial/registrations`
- `/api/legal/appointments`
- `/api/digital/quotations`
- `/api/loans/applications`
- `/api/laptops/bulk-deals`
- `/api/contact/inquiries`
- `/api/contact/partners`

## 🔒 Security Features

✅ Helmet.js for security headers
✅ CORS configured for frontend only
✅ Input validation on all endpoints
✅ MongoDB injection protection
✅ Environment variables for secrets

## 🆓 Free Hosting Options

1. **Render.com** (Recommended)
   - Free tier: 750 hours/month
   - Auto-deploy from GitHub
   - Easy environment variables
   - See DEPLOY_GUIDE.md

2. **Railway.app**
   - $5 free credit monthly
   - Similar to Render

3. **Heroku**
   - No longer free
   - Not recommended

## 💡 Pro Tips

1. **Keep it awake**: Free tier sleeps after 15 min. Use UptimeRobot to ping `/api/health` every 5 minutes.

2. **MongoDB Free Tier**: 512MB storage is plenty for forms data.

3. **Email Limits**: Gmail allows 500 emails/day with app passwords.

4. **Logs**: Check Render dashboard logs for debugging.

5. **Auto-deploy**: Every git push to main branch triggers re-deployment.

## 🐛 Troubleshooting

### MongoDB won't connect
- Whitelist IP `0.0.0.0/0` in MongoDB Atlas
- Check connection string has correct password
- Verify database user has read/write permissions

### Emails not sending
- Use Gmail App Password (not regular password)
- Enable 2-Factor Authentication first
- Check EMAIL_USER and EMAIL_PASS are set

### CORS errors
- Set FRONTEND_URL to your actual frontend domain
- Include https:// in the URL

### Render shows "Cannot GET /"
- This is normal! API is running at `/api/` endpoints
- Test `/api/health` instead

## 📖 Documentation

- **Full Deployment Guide**: `DEPLOY_GUIDE.md` (step-by-step with screenshots description)
- **API Documentation**: `README.md` (this file)
- **Code Comments**: Check individual route files

## 🎉 Quick Deploy Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Gmail app password generated  
- [ ] Code pushed to GitHub
- [ ] Render web service created
- [ ] Environment variables added
- [ ] Health check returns success
- [ ] Test one form submission
- [ ] Email notification received

## 📞 Support

- Check Render logs for errors
- Test API with curl or Postman
- Verify environment variables are set
- See DEPLOY_GUIDE.md for detailed help

---

**Status**: Ready to deploy! ✅
**Time to deploy**: ~20 minutes
**Cost**: $0 (completely free)
