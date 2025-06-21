import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, CreditCard, HelpCircle, Shield, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <Plane className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-bold text-white">SkyWay</span>
            </div>
            <p className="mt-4 text-sm text-secondary-300">
              Making air travel accessible, affordable, and convenient for everyone.
            </p>
            <div className="mt-4 flex space-x-3">
              <a href="#" className="text-secondary-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-secondary-300 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-base text-secondary-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-base text-secondary-300 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-base text-secondary-300 hover:text-white transition-colors">News</a></li>
              <li><a href="#" className="text-base text-secondary-300 hover:text-white transition-colors">Partners</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-secondary-300 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-base text-secondary-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-base text-secondary-300 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-base text-secondary-300 hover:text-white transition-colors">Baggage</a></li>
              <li><a href="#" className="text-base text-secondary-300 hover:text-white transition-colors">Refunds</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-secondary-300 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-base text-secondary-300 hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-base text-secondary-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-base text-secondary-300 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-base text-secondary-300 hover:text-white transition-colors">Accessibility</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-secondary-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <Shield className="h-5 w-5 text-secondary-400" />
              <span className="text-sm text-secondary-400">Secure Payments</span>
              
              <CreditCard className="h-5 w-5 text-secondary-400 ml-4" />
              <span className="text-sm text-secondary-400">Multiple Payment Options</span>
              
              <HelpCircle className="h-5 w-5 text-secondary-400 ml-4" />
              <span className="text-sm text-secondary-400">24/7 Support</span>
            </div>
            
            <p className="mt-4 md:mt-0 text-sm text-secondary-400">
              &copy; {new Date().getFullYear()} SkyWay Airlines. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;