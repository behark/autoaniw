'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaPhoneAlt, FaUser, FaSearch, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = router.pathname;

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Vehicles', href: '/cars' },
    { name: 'About Us', href: '/about' },
    { name: 'Financing', href: '/financing' },
    { name: 'Contact', href: '/contact' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebookF />, href: 'https://facebook.com/aniautosallon' },
    { name: 'Instagram', icon: <FaInstagram />, href: 'https://instagram.com/aniautosallon' }
  ];

  return (
    <header className="relative">
      {/* Top info bar */}
      <div className="bg-primary-900 text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 text-sm">
            <a href="tel:+1234567890" className="flex items-center space-x-1 hover:text-primary-300 transition-colors">
              <FaPhoneAlt size={12} />
              <span>(123) 456-7890</span>
            </a>
            <span className="text-primary-400">|</span>
            <span>Open: Mon-Fri 9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/login" className="flex items-center space-x-1 text-sm hover:text-primary-300 transition-colors">
              <FaUser size={12} />
              <span>Client Portal</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Main navbar */}
      <nav className={`bg-white py-4 ${isScrolled ? 'shadow-md sticky top-0 z-50 animate-slideDown' : ''} transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-primary-600">
                  Auto<span className="text-secondary-600">Ani</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                    pathname === link.href 
                      ? 'text-primary-600 border-b-2 border-primary-600' 
                      : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Social Icons - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
              <button className="p-2 rounded-full hover:bg-primary-50 text-neutral-600 hover:text-primary-600 transition-colors ml-2">
                <FaSearch size={18} />
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-700"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="h-6 w-6"
              >
                {isMobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t mt-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                      pathname === link.href 
                        ? 'text-primary-600 border-l-2 border-primary-600 pl-2' 
                        : 'text-gray-700'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Search in mobile menu */}
                <div className="relative flex items-center mt-2">
                  <input 
                    type="text" 
                    placeholder="Search vehicles..." 
                    className="w-full pl-10 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <FaSearch className="absolute left-3 text-gray-400 h-4 w-4" />
                </div>
                
                {/* Social icons in mobile menu */}
                <div className="flex space-x-4 pt-4">
                  {socialLinks.map((link) => (
                    <a 
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
