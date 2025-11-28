'use client';

import { useState } from 'react';
import { Building, FileCheck, Scale, Handshake, Upload, Calendar } from 'lucide-react';

export default function BusinessLegalPage() {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: '',
  });

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
                <div className="border-t pt-4">
                  <p className="text-accent font-bold text-xl">{service.pricing}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Upload Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Upload Documents</h2>
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-lg">
              <div className="text-center mb-6">
                <Upload className="mx-auto text-primary mb-4" size={48} />
                <p className="text-gray-700 mb-4">
                  Upload your documents for company registration, compliance filing, or legal consultation
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <label className="block">
                  <span className="sr-only">Choose file</span>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-3 file:px-6
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary file:text-white
                      hover:file:bg-primary/90
                      file:cursor-pointer cursor-pointer"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>
                {uploadFile && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 font-semibold">✓ File uploaded: {uploadFile.name}</p>
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-4">
                  Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Booking */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              <Calendar className="inline-block mr-3 mb-2" size={36} />
              Book Consultation
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <form onSubmit={handleAppointment} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={appointmentData.name}
                      onChange={(e) => setAppointmentData({ ...appointmentData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={appointmentData.email}
                      onChange={(e) => setAppointmentData({ ...appointmentData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={appointmentData.phone}
                    onChange={(e) => setAppointmentData({ ...appointmentData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Service Required *</label>
                  <select
                    required
                    value={appointmentData.service}
                    onChange={(e) => setAppointmentData({ ...appointmentData, service: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="incorporation">Company Incorporation</option>
                    <option value="compliance">Annual Compliance</option>
                    <option value="litigation">Legal Litigation</option>
                    <option value="tender">Tender Tie-Up</option>
                    <option value="other">Other Legal Services</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      value={appointmentData.date}
                      onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Preferred Time *</label>
                    <select
                      required
                      value={appointmentData.time}
                      onChange={(e) => setAppointmentData({ ...appointmentData, time: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select time</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    value={appointmentData.message}
                    onChange={(e) => setAppointmentData({ ...appointmentData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Describe your requirements..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-orange-600 text-white py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  Book Appointment
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

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
