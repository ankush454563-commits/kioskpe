import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-accent">Kioskpe Law</h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner for legal and business compliance. We simplify Company Registration, GST, ITR, and Legal Drafting.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/business-legal" className="text-gray-400 hover:text-accent transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="/login" className="text-gray-400 hover:text-accent transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Company Registration</li>
              <li>GST Registration & Filing</li>
              <li>Income Tax Returns (ITR)</li>
              <li>Legal Drafting</li>
              <li>NGO/Trust Registration</li>
              <li>Compliance Services</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>info@kioskpe.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
          <p>&copy; 2025 Kioskpe. All rights reserved. | <Link href="/privacy" className="hover:text-accent">Privacy Policy</Link> | <Link href="/terms" className="hover:text-accent">Terms of Service</Link></p>
        </div>
      </div>
    </footer>
  );
}
