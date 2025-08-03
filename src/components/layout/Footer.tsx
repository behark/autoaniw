'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaTiktok, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/">
              <div className="mb-4 font-bold text-2xl text-white">AutoAni</div>
            </Link>
            <p className="text-gray-400 mb-4">
              AutoAni, lider në rajon me përvojë në tregtinë e makinave. Ne ofrojmë makina vetëm nga markat më të njohura botërore.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="https://facebook.com/aniautosallon" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebookF className="text-xl" />
              </a>
              <a href="https://instagram.com/aniautosallon" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://tiktok.com/@aniautosallon" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaTiktok className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4">Linqe</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Fillimi
                </Link>
              </li>
              <li>
                <Link href="/cars" className="text-gray-400 hover:text-white transition-colors">
                  Makina
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  Rreth Nesh
                </Link>
              </li>
              <li>
                <Link href="/financing" className="text-gray-400 hover:text-white transition-colors">
                  Financim
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4">Na Kontaktoni</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-gray-400 mt-1 mr-3" />
                <span className="text-gray-400">
                  Prishtinë, Kosovë
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-gray-400 mr-3" />
                <span className="text-gray-400">+383 44 123 456</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-gray-400 mr-3" />
                <span className="text-gray-400">info@autoani.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4">Orari i Punës</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">E Hënë - E Premte: 09:00 - 18:00</li>
              <li className="text-gray-400">E Shtunë: 10:00 - 16:00</li>
              <li className="text-gray-400">E Dielë: Pushim</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} AutoAni. Të gjitha të drejtat e rezervuara.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
