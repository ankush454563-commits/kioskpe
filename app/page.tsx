'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';
import { 
  Smartphone, 
  DollarSign, 
  FileText, 
  Laptop, 
  CreditCard, 
  Building, 
  Scale, 
  MessageSquare,
  Globe,
  TrendingUp,
  Users,
  CheckCircle
} from 'lucide-react';

const heroSlides = [
  {
    title: 'Expert Legal & Business Solutions',
    subtitle: 'Simplify your business journey with our Company Registration, GST, and ITR services.',
    cta: 'Get Started',
  },
  {
    title: 'Professional Legal Compliance',
    subtitle: 'From NGO Registration to Legal Drafting, we handle the complexities for you.',
    cta: 'Consult Now',
  },
  {
    title: 'Your Trusted Legal Partner',
    subtitle: 'Transparent, efficient, and affordable legal services for businesses of all sizes.',
    cta: 'Contact Us',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {heroSlides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-accent hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
            >
              {heroSlides[currentSlide].cta}
            </Link>
            <Link
              href="/business-legal"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
            >
              Our Services
            </Link>
          </div>
          
          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1000+</div>
              <div className="text-gray-600 text-lg">Businesses Registered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">5000+</div>
              <div className="text-gray-600 text-lg">ITR Filed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">98%</div>
              <div className="text-gray-600 text-lg">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Service Icons */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Legal Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={Building}
              title="Company Registration"
              description="Pvt Ltd, LLP, OPC & more"
              link="/business-legal"
            />
            <ServiceCard
              icon={FileText}
              title="GST Services"
              description="Registration & Monthly Filing"
              link="/business-legal"
            />
            <ServiceCard
              icon={Scale}
              title="Legal Drafting"
              description="Contracts, Deeds & Agreements"
              link="/business-legal"
            />
            <ServiceCard
              icon={TrendingUp}
              title="ITR Filing"
              description="Personal & Business Tax Returns"
              link="/business-legal"
            />
            <ServiceCard
              icon={Users}
              title="NGO Registration"
              description="Trust, Society & Section 8"
              link="/business-legal"
            />
            <ServiceCard
              icon={CheckCircle}
              title="Compliance"
              description="Annual Filings & ROC Compliance"
              link="/business-legal"
            />
            <ServiceCard
              icon={MessageSquare}
              title="Legal Consultation"
              description="Expert advice for your business"
              link="/business-legal"
            />
            <ServiceCard
              icon={Globe}
              title="Trademark"
              description="Protect your brand identity"
              link="/business-legal"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Kioskpe Law?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">Qualified CAs, CSs, and Lawyers at your service</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-secondary" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
              <p className="text-gray-600">Quick turnaround time for all registrations</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-accent" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
              <p className="text-gray-600">Personalized assistance for every client</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Digital First</h3>
              <p className="text-gray-600">Complete online process, no paperwork hassle</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Legal Assistance?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get in touch with our experts today for a free consultation regarding your business or legal needs.
          </p>
          <Link
            href="/contact"
            className="bg-accent hover:bg-orange-600 text-white px-10 py-4 rounded-full text-lg font-semibold inline-block transition-all hover:scale-105"
          >
            Contact Us Now
          </Link>
        </div>
      </section>
    </div>
  );
}
