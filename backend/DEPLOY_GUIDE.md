# 🚀 Deploy Kioskpe Backend to Render - Step by Step

## ✅ Prerequisites

Before starting, make sure you have:
- [ ] GitHub account
- [ ] Render account (free at render.com)
- [ ] MongoDB Atlas account (free at mongodb.com/cloud/atlas)
- [ ] Gmail account with App Password

---

## 📦 Step 1: Set Up MongoDB Atlas (5 minutes)

### 1.1 Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Choose "Free Shared" cluster

### 1.2 Create Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0 Sandbox)
3. Select region closest to you
4. Name it "kioskpe-db"
5. Click "Create"

### 1.3 Create Database User
1. Go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `kioskpe_admin`
5. Password: Click "Autogenerate Secure Password" (SAVE THIS!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### 1.4 Allow Network Access
1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for Render)
4. Confirm "0.0.0.0/0"
5. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://kioskpe_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace `<password>` with the password you saved in step 1.3**
6. Add database name: `kioskpe` after `.net/` like this:
   ```
   mongodb+srv://kioskpe_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/kioskpe?retryWrites=true&w=majority
   ```

**SAVE THIS CONNECTION STRING!** You'll need it later.

---

## 📧 Step 2: Set Up Gmail App Password (3 minutes)

### 2.1 Enable 2-Factor Authentication
1. Go to https://myaccount.google.com/security
2. Under "How you sign in to Google", enable "2-Step Verification"
3. Follow the prompts to set it up

### 2.2 Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select app: "Mail"
3. Select device: "Other" → Type "Kioskpe Backend"
4. Click "Generate"
5. **Copy the 16-character password (SAVE THIS!)**

---

## 🐙 Step 3: Push Backend to GitHub (5 minutes)

### 3.1 Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `kioskpe-backend`
3. Description: "Backend API for Kioskpe platform"
4. Make it **Public**
5. DON'T initialize with README
6. Click "Create repository"

### 3.2 Copy the Git URL
You'll see something like:
```
https://github.com/YOUR_USERNAME/kioskpe-backend.git
```
**COPY THIS URL!**

### 3.3 Initialize and Push
Open PowerShell in the backend folder:

```powershell
# Navigate to backend folder
cd c:\Users\ankud\Desktop\kioskpe\backend

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial backend setup"

# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/kioskpe-backend.git

# Push to GitHub
git push -u origin main
```

If it asks for authentication, use GitHub username and Personal Access Token.

---

## 🌐 Step 4: Deploy on Render (5 minutes)

### 4.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub account
3. Authorize Render to access your repositories

### 4.2 Create Web Service
1. Click "New +" button (top right)
2. Select "Web Service"
3. Find your `kioskpe-backend` repository
4. Click "Connect"

### 4.3 Configure Service
Fill in these settings:

| Field | Value |
|-------|-------|
| **Name** | `kioskpe-backend` |
| **Region** | Select closest to you |
| **Branch** | `main` |
| **Root Directory** | Leave empty |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free |

### 4.4 Add Environment Variables
Click "Advanced" → "Add Environment Variable"

Add these variables ONE BY ONE:

| Key | Value | Example |
|-----|-------|---------|
| `NODE_ENV` | `production` | production |
| `PORT` | `5000` | 5000 |
| `MONGODB_URI` | Your MongoDB connection string from Step 1.5 | mongodb+srv://... |
| `FRONTEND_URL` | Your frontend URL | https://kioskpe.vercel.app |
| `EMAIL_HOST` | `smtp.gmail.com` | smtp.gmail.com |
| `EMAIL_PORT` | `587` | 587 |
| `EMAIL_USER` | Your Gmail address | yourname@gmail.com |
| `EMAIL_PASS` | Your App Password from Step 2.2 | abcdabcdabcdabcd |
| `EMAIL_FROM` | `Kioskpe <noreply@kioskpe.com>` | Kioskpe <noreply@kioskpe.com> |
| `ADMIN_EMAIL` | Your admin email | admin@kioskpe.com |

### 4.5 Deploy
1. Click "Create Web Service"
2. Wait 2-3 minutes for deployment
3. Watch the logs for "✅ MongoDB connected successfully"
4. Once you see "🚀 Server running on port 5000" → Success!

### 4.6 Get Your API URL
Render will give you a URL like:
```
https://kioskpe-backend.onrender.com
```

**COPY THIS URL!** You'll use it in your frontend.

---

## ✅ Step 5: Test Your Backend

### Test in Browser
Open your backend URL in browser:
```
https://kioskpe-backend.onrender.com
```

You should see:
```json
{
  "message": "Welcome to Kioskpe API",
  "version": "1.0.0",
  "endpoints": [...]
}
```

### Test Health Check
```
https://kioskpe-backend.onrender.com/api/health
```

Should return:
```json
{
  "status": "success",
  "message": "Kioskpe API is running",
  "mongodb": "connected"
}
```

---

## 🔗 Step 6: Connect Frontend to Backend

### Option A: Environment Variable (Recommended)
1. In your frontend project root, create `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://kioskpe-backend.onrender.com
```

2. In Vercel dashboard:
   - Go to your project → Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_URL` = `https://kioskpe-backend.onrender.com`

### Option B: Update Forms Directly
In each form component, replace alert() with API call:

```typescript
// Example for financial-services page
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('https://kioskpe-backend.onrender.com/api/financial/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    
    if (data.status === 'success') {
      alert('Registration submitted successfully! Our team will contact you within 24 hours.');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } else {
      alert('Failed to submit. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  }
};
```

---

## 📝 API Endpoints Reference

Use these in your frontend:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/health` | GET | Health check |
| `/api/financial/register` | POST | Financial services registration |
| `/api/legal/appointment` | POST | Book appointment |
| `/api/digital/quotation` | POST | Request quotation |
| `/api/loans/apply` | POST | Loan application |
| `/api/loans/calculate-emi` | POST | Calculate EMI |
| `/api/laptops/bulk-deal` | POST | Bulk laptop deal |
| `/api/contact/inquiry` | POST | Contact form |
| `/api/contact/partner` | POST | Partner registration |

---

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
- Check if IP `0.0.0.0/0` is whitelisted in MongoDB Atlas
- Verify connection string has correct password
- Make sure database name is included in URI

### "Email not sending"
- Verify Gmail App Password is correct (16 characters, no spaces)
- Check if 2FA is enabled on Gmail
- Make sure EMAIL_USER and EMAIL_PASS are set correctly

### "CORS error in frontend"
- Add your Vercel URL to `FRONTEND_URL` environment variable
- Include full URL with https://

### "Logs show errors"
- Check Render logs: Dashboard → Your Service → Logs
- Look for red error messages
- Common issues: missing environment variables

---

## 🎉 Success Checklist

- [ ] MongoDB cluster created and connected
- [ ] Gmail app password generated
- [ ] Code pushed to GitHub
- [ ] Backend deployed on Render
- [ ] API health check returns success
- [ ] MongoDB shows "connected" in health check
- [ ] Test form submission works
- [ ] Email notifications received
- [ ] Frontend connected to backend

---

## 💡 Pro Tips

1. **Free Tier Limitations**: Render free tier sleeps after 15 min of inactivity. First request may take 30 seconds.

2. **Keep Backend Awake**: Use a service like [UptimeRobot](https://uptimerobot.com) to ping your health check every 5 minutes.

3. **Monitor Logs**: Check Render logs regularly for errors.

4. **Update Backend**: Just push to GitHub - Render auto-deploys:
   ```bash
   git add .
   git commit -m "Update"
   git push
   ```

5. **Database Backups**: MongoDB Atlas automatically backs up free tier clusters.

---

## 📞 Need Help?

- Render Docs: https://render.com/docs
- MongoDB Docs: https://docs.mongodb.com
- Your API URL: https://kioskpe-backend.onrender.com
- Check logs in Render dashboard for errors

---

**Estimated Total Time: 20-25 minutes** ⏱️

**Cost: $0 (All free tiers)** 💰
