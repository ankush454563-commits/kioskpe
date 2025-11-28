'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search,
  Building, 
  FileText, 
  Scale, 
  TrendingUp,
  Users,
  CheckCircle,
  Globe,
  MessageSquare,
  ArrowRight,
  Star,
  ShieldCheck,
  Clock
} from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const popularServices = [
    { icon: Building, title: 'Company Registration', link: '/business-legal' },
    { icon: FileText, title: 'GST Registration', link: '/business-legal' },
    { icon: Globe, title: 'Trademark', link: '/business-legal' },
    { icon: TrendingUp, title: 'ITR Filing', link: '/business-legal' },
    { icon: Scale, title: 'Legal Notice', link: '/business-legal' },
    { icon: Users, title: 'NGO Registration', link: '/business-legal' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section - Zolvit Style */}
      <section className="relative bg-[#f8f9fa] pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Legal Work Made <span className="text-secondary">Simple</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              India's largest legal services platform for startups and SMEs. 
              Register your company, file taxes, and protect your IP with ease.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto shadow-lg rounded-full bg-white p-2 flex items-center border border-gray-200">
              <Search className="ml-4 text-gray-400 w-6 h-6" />
              <input 
                type="text"
                placeholder="What do you want to do today? (e.g. Register Pvt Ltd)"
                className="flex-1 px-4 py-3 outline-none text-gray-700 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-secondary hover:bg-amber-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                Search
              </button>
            </div>

            {/* Trust Markers */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-500 font-medium">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-secondary mr-2 fill-current" />
                4.8/5 Rated
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-primary mr-2" />
                500k+ Customers
              </div>
              <div className="flex items-center">
                <ShieldCheck className="w-5 h-5 text-accent mr-2" />
                100% Secure
              </div>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 opacity-30">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -right-20 w-72 h-72 bg-yellow-100 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Popular Services Grid */}
      <section className="py-16 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Popular Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {popularServices.map((service, index) => (
                <Link 
                  key={index} 
                  href={service.link}
                  className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-colors group text-center"
                >
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-primary transition-colors">
                    {service.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-blue-800">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2 text-secondary">500K+</div>
              <div className="text-blue-200">Happy Customers</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2 text-secondary">300+</div>
              <div className="text-blue-200">Legal Experts</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2 text-secondary">100%</div>
              <div className="text-blue-200">Data Privacy</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2 text-secondary">4.8</div>
              <div className="text-blue-200">Google Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose LetsLegal?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine technology with legal expertise to provide you with the fastest, most affordable, and reliable services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Super Fast Delivery</h3>
              <p className="text-gray-600">
                We use technology to automate processes, ensuring your work is done faster than traditional methods.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Transparent Pricing</h3>
              <p className="text-gray-600">
                What you see is what you pay. No hidden charges, no surprise fees. Complete transparency.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Assistance</h3>
              <p className="text-gray-600">
                Get dedicated support from our team of experienced lawyers, CAs, and company secretaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to start your business journey?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of Indian businesses that trust LetsLegal for their legal and compliance needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/business-legal"
                  className="bg-primary hover:bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-center transition-colors"
                >
                  Explore Services
                </Link>
                <Link 
                  href="/contact"
                  className="border-2 border-gray-300 hover:border-primary hover:text-primary text-gray-700 px-8 py-4 rounded-lg font-semibold text-center transition-colors"
                >
                  Talk to Expert
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 bg-blue-600 relative min-h-[300px]">
              {/* Abstract pattern or image placeholder */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white/20">
                <Scale size={200} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
