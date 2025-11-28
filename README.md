# LetsLegal - Digital & Legal Services Platform

A comprehensive multi-service website built with Next.js, TypeScript, and Tailwind CSS.

## 🌟 Features

### Main Pages
- **Home Page** - Hero slider, service icons, stats counter, CTA sections
- **Financial Services** - AePS, DMT, Bill Payments, mATM, Account Opening, Kiosk Banking
- **Business & Legal** - Company Incorporation, Annual Compliance, Legal Litigation, Tender Tie-Up
- **Digital Solutions** - DSC, WhatsApp API, Bulk SMS, Website/Software/App Development
- **Loans & Credit** - Business Loans, Personal Loans, Credit Cards with EMI Calculator
- **Refurbished Laptops** - Product catalog with bulk deal request form
- **Contact & Support** - Contact form, Google Maps, Partner registration

### Interactive Features
- ✅ Auto-rotating hero banner with 3 slides
- ✅ Service registration forms
- ✅ EMI Calculator with real-time updates
- ✅ Appointment booking system with date/time picker
- ✅ Document upload functionality
- ✅ Bulk deal request forms
- ✅ WhatsApp chat button (floating)
- ✅ Google Maps integration
- ✅ Partner registration form
- ✅ Responsive mobile-first design

### Design & Styling
- 🎨 **Colors**: Blue (#007BFF), Green (#00B894), Orange (#FFA500)
- 🔤 **Font**: Poppins (Google Fonts)
- ✨ **Animations**: Card hover effects, smooth transitions
- 📱 **Responsive**: Mobile-first design with breakpoints
- 🎯 **Icons**: Lucide React icons throughout

## 🚀 Tech Stack

- **Frontend**: Next.js 15.5 + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion (installed but can be added)
- **Font**: Poppins via Google Fonts

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Development Server

The application runs on:
- **Local**: http://localhost:3000
- **Network**: http://[your-ip]:3000

## 📁 Project Structure

```
kioskpe/
├── app/
│   ├── page.tsx                    # Home page
│   ├── financial-services/         # Financial services page
│   ├── business-legal/             # Business & legal page
│   ├── digital-solutions/          # Digital solutions page
│   ├── loans/                      # Loans with EMI calculator
│   ├── laptops/                    # Refurbished laptops page
│   ├── contact/                    # Contact & partner page
│   ├── layout.tsx                  # Root layout with Header/Footer
│   └── globals.css                 # Global styles
├── components/
│   ├── Header.tsx                  # Navigation header
│   ├── Footer.tsx                  # Footer with links
│   ├── WhatsAppButton.tsx          # Floating WhatsApp button
│   └── ServiceCard.tsx             # Reusable service card
├── public/                         # Static assets
├── tailwind.config.ts              # Tailwind configuration
├── next.config.ts                  # Next.js configuration
└── package.json                    # Dependencies

```

## 🎯 Key Features by Page

### Home Page
- Hero banner with 3 auto-rotating slides
- Stats counter (5000+ Kiosks, 10M+ Transactions, 50K+ Clients)
- 8 service quick-access cards
- "Why Choose Us" section
- CTA section for partner registration

### Financial Services
- 6 service cards with detailed features
- Commission structure display
- Agent/Retailer registration form
- Service descriptions with benefits

### Business & Legal
- 4 main service offerings
- Document upload section
- Appointment booking with date/time picker
- Pricing information

### Digital Solutions
- 6 digital services
- Portfolio gallery (6 projects)
- WhatsApp API feature highlights
- Quotation request form

### Loans & Credit
- Interactive EMI calculator with sliders
- 4 loan product types
- Partner bank logos
- Loan application form

### Refurbished Laptops
- 6 laptop products with details
- Quality assurance badges
- Bulk deal request form (10+ units)
- Terms & conditions section

### Contact Page
- Contact information cards
- Contact form with subject selection
- Google Maps integration
- Partner registration form
- FAQ section

## 🎨 Customization

### Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: '#007BFF',      // Blue
  secondary: '#00B894',    // Green
  accent: '#FFA500',       // Orange
  accentYellow: '#FDCB6E', // Yellow
}
```

### WhatsApp Number
Edit `components/WhatsAppButton.tsx`:
```typescript
const phoneNumber = '919876543210'; // Your number
```

### Contact Information
Update in `components/Footer.tsx` and `app/contact/page.tsx`

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- AWS Amplify
- Netlify
- Hostinger
- GoDaddy

## 📝 To-Do / Future Enhancements

- [ ] Add backend API integration for forms
- [ ] Implement actual AePS/DMT transaction processing
- [ ] Add admin dashboard for managing leads
- [ ] Integrate payment gateway (Razorpay/PayU)
- [ ] Add client login/retailer dashboard
- [ ] Implement multilingual support (Hindi)
- [ ] Add testimonials and reviews section
- [ ] Integrate CRM for lead management
- [ ] Add live chat support
- [ ] SEO optimization

## 📞 Support

For any queries or support:
- Email: info@letslegal.co.in
- Phone: +91 9876543210
- WhatsApp: Click the floating button

## 📄 License

All rights reserved © 2025 LetsLegal

---

Built with ❤️ using Next.js and Tailwind CSS
