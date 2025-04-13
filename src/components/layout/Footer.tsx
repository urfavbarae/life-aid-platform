
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              Life<span className="text-medical-red">Aid</span>
            </h3>
            <p className="text-sm text-gray-400">
              Connecting people with healthcare services, medicine information, and blood donation
              opportunities.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/pharmacies" className="text-gray-400 hover:text-white">Find Pharmacies</Link>
              </li>
              <li>
                <Link to="/medicines" className="text-gray-400 hover:text-white">Medicine Search</Link>
              </li>
              <li>
                <Link to="/blood-donation" className="text-gray-400 hover:text-white">Blood Donation</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-400 hover:text-white">FAQs</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span className="text-gray-400">contact@lifeaid.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="text-gray-400">+1 (800) 555-1234</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Healthcare Ave, Medical District, MD 12345</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} LifeAid. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4 text-sm text-gray-500">
              <li>
                <Link to="/privacy" className="hover:text-white">Privacy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">Terms</Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white">Cookies</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
