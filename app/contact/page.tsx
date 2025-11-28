'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Users } from 'lucide-react';

export default function ContactPage() {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [partnerData, setPartnerData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    businessType: '',
    investment: '',
    experience: '',
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will respond within 24 hours.');
    setContactData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your interest! Our partnership team will contact you soon.');
    setPartnerData({
      name: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      businessType: '',
      investment: '',
      experience: '',
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have questions? We're here to help. Reach out to us and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg text-center">
              <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-primary" size={28} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Call Us</h3>
              <p className="text-gray-600">+91 9876543210</p>
              <p className="text-gray-600">+91 9876543211</p>
            </div>
            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-6 rounded-lg text-center">
              <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-secondary" size={28} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email Us</h3>
              <p className="text-gray-600">info@kioskpe.com</p>
              <p className="text-gray-600">support@kioskpe.com</p>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-6 rounded-lg text-center">
              <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-accent" size={28} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
              <p className="text-gray-600">Connaught Place</p>
              <p className="text-gray-600">New Delhi - 110001</p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg text-center">
              <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-primary" size={28} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Working Hours</h3>
              <p className="text-gray-600">Mon - Sat</p>
              <p className="text-gray-600">9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={contactData.name}
                      onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={contactData.phone}
                        onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Subject *</label>
                    <select
                      required
                      value={contactData.subject}
                      onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="financial">Financial Services</option>
                      <option value="legal">Legal Services</option>
                      <option value="digital">Digital Solutions</option>
                      <option value="loans">Loans & Credit</option>
                      <option value="laptops">Refurbished Laptops</option>
                      <option value="support">Technical Support</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Message *</label>
                    <textarea
                      required
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-orange-600 text-white py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
                  >
                    <Send className="mr-2" size={20} />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Map & Additional Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Find Us</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
                <div className="h-80 bg-gray-200 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9827476493896!2d77.21445931508044!3d28.63124908241883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd371c3c1e55%3A0x2b1f6b7d62b8c8e3!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Why Contact Kioskpe?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-secondary mr-2 mt-1">✓</span>
                    <span className="text-gray-700">24/7 customer support available</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2 mt-1">✓</span>
                    <span className="text-gray-700">Expert guidance on all services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2 mt-1">✓</span>
                    <span className="text-gray-700">Quick response within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2 mt-1">✓</span>
                    <span className="text-gray-700">Dedicated account manager</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2 mt-1">✓</span>
                    <span className="text-gray-700">Complete onboarding support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Registration */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Users className="inline-block text-primary mb-4" size={48} />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Kioskpe as Partner</h2>
              <p className="text-xl text-gray-600">
                Become a part of India's fastest-growing digital services network
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-lg shadow-lg">
              <form onSubmit={handlePartnerSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={partnerData.name}
                      onChange={(e) => setPartnerData({ ...partnerData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={partnerData.email}
                      onChange={(e) => setPartnerData({ ...partnerData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={partnerData.phone}
                    onChange={(e) => setPartnerData({ ...partnerData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">City *</label>
                    <input
                      type="text"
                      required
                      value={partnerData.city}
                      onChange={(e) => setPartnerData({ ...partnerData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                      placeholder="Your city"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">State *</label>
                    <input
                      type="text"
                      required
                      value={partnerData.state}
                      onChange={(e) => setPartnerData({ ...partnerData, state: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                      placeholder="Your state"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Business Type *</label>
                  <select
                    required
                    value={partnerData.businessType}
                    onChange={(e) => setPartnerData({ ...partnerData, businessType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                  >
                    <option value="">Select business type</option>
                    <option value="retail">Retail Shop</option>
                    <option value="kiosk">Kiosk / CSC</option>
                    <option value="cyber-cafe">Cyber Cafe</option>
                    <option value="travel">Travel Agency</option>
                    <option value="mobile">Mobile Shop</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Investment Capacity *</label>
                  <select
                    required
                    value={partnerData.investment}
                    onChange={(e) => setPartnerData({ ...partnerData, investment: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                  >
                    <option value="">Select investment range</option>
                    <option value="10k-25k">₹10,000 - ₹25,000</option>
                    <option value="25k-50k">₹25,000 - ₹50,000</option>
                    <option value="50k-1L">₹50,000 - ₹1,00,000</option>
                    <option value="1L+">₹1,00,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Previous Experience</label>
                  <textarea
                    value={partnerData.experience}
                    onChange={(e) => setPartnerData({ ...partnerData, experience: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                    placeholder="Tell us about your experience in similar business..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-orange-600 text-white py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  Submit Partnership Request
                </button>
              </form>
            </div>

            {/* Benefits */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-3">💰</div>
                <h4 className="font-semibold mb-2">High Earnings</h4>
                <p className="text-sm text-gray-600">Earn up to ₹50,000+ per month</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-3">📚</div>
                <h4 className="font-semibold mb-2">Free Training</h4>
                <p className="text-sm text-gray-600">Complete training & support</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-3">🎯</div>
                <h4 className="font-semibold mb-2">Marketing Support</h4>
                <p className="text-sm text-gray-600">Promotional materials provided</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-2">How long does it take to become a partner?</h4>
              <p className="text-gray-600">The entire process takes 3-5 business days from application to activation.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-2">What are the requirements to start?</h4>
              <p className="text-gray-600">You need a shop/kiosk, laptop/computer, internet connection, and basic documents (Aadhaar, PAN, etc.).</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-2">Is there any monthly fee?</h4>
              <p className="text-gray-600">No monthly fees. Only a one-time registration fee which varies by service.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-2">How do I receive my commissions?</h4>
              <p className="text-gray-600">Commissions are credited to your bank account within 2-3 business days.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
