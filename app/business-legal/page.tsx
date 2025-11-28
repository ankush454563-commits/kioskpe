'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building, FileCheck, Scale, Handshake, Upload, Calendar, ArrowRight } from 'lucide-react';

export default function BusinessLegalPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    
    if (token) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setFormData(prev => ({
          ...prev,
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || ''
        }));
      }
    }
  }, []);

  const handleApply = (serviceTitle: string) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    // Map service title to enum value
    const serviceMap: Record<string, string> = {
      'Company Incorporation': 'company-registration',
      'Annual Compliance': 'compliance',
      'Legal Litigation': 'legal-consultation',
      'Tender Tie-Up': 'other'
    };
    
    setSelectedService(serviceMap[serviceTitle] || 'other');
    // Scroll to form
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://kioskpe-backend.onrender.com';
      
      const res = await fetch(`${apiUrl}/api/services/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          serviceType: selectedService || 'other'
        })
      });

      const data = await res.json();

      if (data.status === 'success') {
        alert(`Application Submitted Successfully! Your Reference ID is: ${data.data._id}`);
        router.push('/dashboard');
      } else {
        alert(data.message || 'Submission failed');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const services = [
    {
      icon: Building,
      title: 'Company Incorporation',
      description: 'Register your business as Private Limited, LLP, OPC, or Partnership firm with complete documentation.',
      features: [
        'Private Limited Company',
        'Limited Liability Partnership (LLP)',
        'One Person Company (OPC)',
        'Partnership Firm',
        'Sole Proprietorship',
        'Complete documentation support',
      ],
      pricing: 'Starting from ₹6,999',
    },
    {
      icon: FileCheck,
      title: 'Annual Compliance',
      description: 'Stay compliant with all regulatory requirements. ROC filings, GST returns, IT returns, and more.',
      features: [
        'ROC Annual Filings',
        'GST Return Filing',
        'Income Tax Returns',
        'TDS Returns',
        'Audit Reports',
        'DIN & DSC Services',
      ],
      pricing: 'Starting from ₹3,999/year',
    },
    {
      icon: Scale,
      title: 'Legal Litigation',
      description: 'Expert legal representation for civil, criminal, corporate, and property disputes.',
      features: [
        'Civil Litigation',
        'Criminal Cases',
        'Corporate Disputes',
        'Property Matters',
        'Family Law',
        'Consumer Court Cases',
      ],
      pricing: 'Consultation: ₹2,999',
    },
    {
      icon: Handshake,
      title: 'Tender Tie-Up',
      description: 'Complete support for government tenders, including registration, bidding, and documentation.',
      features: [
        'Tender Registration',
        'Bid Preparation',
        'Document Support',
        'GeM Registration',
        'EMD & Bank Guarantee',
        'Performance Bank Guarantee',
      ],
      pricing: 'Custom Pricing',
    },
  ];

  const handleAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Appointment request submitted! We will confirm shortly.');
    setAppointmentData({
      name: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      time: '',
      message: '',
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
      alert(`File "${e.target.files[0].name}" uploaded successfully!`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Business & Legal Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Complete business incorporation, compliance, and legal support for your growing business
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Legal Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md card-hover">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <service.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <span className="text-secondary mr-2 mt-1">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-4 mt-auto">
                  <p className="text-accent font-bold text-xl mb-4">{service.pricing}</p>
                  <button 
                    onClick={() => handleApply(service.title)}
                    className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
                  >
                    Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-primary py-6 px-8">
              <h2 className="text-2xl font-bold text-white">Service Application Form</h2>
              <p className="text-primary-100 mt-2">Fill in the details below to start your application.</p>
            </div>
            
            <div className="p-8">
              {!isLoggedIn ? (
                <div className="text-center py-12">
                  <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg mb-6 inline-block">
                    Please login to submit an application
                  </div>
                  <div className="flex justify-center space-x-4">
                    <button 
                      onClick={() => router.push('/login')}
                      className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => router.push('/register')}
                      className="bg-white border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50"
                    >
                      Register
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                      <select
                        required
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select Service</option>
                        <option value="company-registration">Company Incorporation</option>
                        <option value="gst-registration">GST Registration</option>
                        <option value="itr-filing">ITR Filing</option>
                        <option value="compliance">Annual Compliance</option>
                        <option value="legal-consultation">Legal Consultation</option>
                        <option value="contract-drafting">Contract Drafting</option>
                        <option value="other">Other Service</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name (Optional)</label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="If applicable"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description / Requirements</label>
                    <textarea
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Please describe your requirements briefly..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
            <h3 className="text-2xl font-bold mb-4">Login Required</h3>
            <p className="text-gray-600 mb-6">Please login or register to apply for this service. It helps us track your application status.</p>
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => router.push('/login')}
                className="bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90"
              >
                Login
              </button>
              <button 
                onClick={() => router.push('/register')}
                className="border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-gray-50"
              >
                Create Account
              </button>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 text-sm mt-2 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Our Legal Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">👨‍⚖️</div>
              <h3 className="text-xl font-semibold mb-2">Expert Lawyers</h3>
              <p className="text-gray-600">Experienced legal professionals with proven track record</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
              <p className="text-gray-600">Quick turnaround time for all services</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
              <p className="text-gray-600">Transparent and competitive pricing with no hidden charges</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
