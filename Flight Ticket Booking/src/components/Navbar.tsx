import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Menu, X, User, BookOpen, LogIn, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Plane className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-primary-800">SkyWay</span>
            </Link>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-secondary-700 hover:text-primary-700 hover:bg-primary-50 transition-colors">
              Home
            </Link>
            <Link to="/my-bookings" className="px-3 py-2 rounded-md text-sm font-medium text-secondary-700 hover:text-primary-700 hover:bg-primary-50 transition-colors">
              My Bookings
            </Link>
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-secondary-700 hover:text-primary-700 hover:bg-primary-50 transition-colors">
              Help
            </a>
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-secondary-700 hover:text-primary-700 hover:bg-primary-50 transition-colors">
              Contact
            </a>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center">
            <button className="btn-secondary text-sm">
              <LogIn className="h-4 w-4 mr-1" />
              Sign In
            </button>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-secondary-700 hover:text-primary-700 hover:bg-primary-50"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Home
            </div>
          </Link>
          <Link
            to="/my-bookings"
            className="block px-3 py-2 rounded-md text-base font-medium text-secondary-700 hover:text-primary-700 hover:bg-primary-50"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              My Bookings
            </div>
          </Link>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-secondary-700 hover:text-primary-700 hover:bg-primary-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Help
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-secondary-700 hover:text-primary-700 hover:bg-primary-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium bg-primary-50 text-primary-700"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Sign In
            </div>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;