'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaWhatsapp, FaEnvelope, FaInfoCircle } from 'react-icons/fa';

interface VehiclePriceContactProps {
  title: string;
  price: string | number;
  formattedPrice?: string;
  status?: 'available' | 'sold' | 'reserved';
  phoneNumber?: string;
  email?: string;
  whatsapp?: string;
}

const VehiclePriceContact = ({
  title,
  price,
  formattedPrice,
  status = 'available',
  phoneNumber = '+355 69 XXX XXXX',
  email = 'info@autoani.com',
  whatsapp = '+355 69 XXX XXXX'
}: VehiclePriceContactProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Interested in: ${title}`,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the form data to the backend
    alert('Thank you for your inquiry! We will contact you soon.');
    setIsModalOpen(false);
  };

  // Format price if not provided
  const displayPrice = formattedPrice || (typeof price === 'number' 
    ? `€${price.toLocaleString()}`
    : price);

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Price Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Çmimi</h2>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-blue-600">{displayPrice}</div>
          {status === 'sold' && (
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-md font-medium">Shitur</span>
          )}
          {status === 'reserved' && (
            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-md font-medium">Rezervuar</span>
          )}
          {status === 'available' && (
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md font-medium">Në shitje</span>
          )}
        </div>
        <div className="mt-2 text-sm text-gray-500">
          <span className="flex items-center">
            <FaInfoCircle className="mr-1" /> Çmimi përfshin TVSH-në dhe doganën
          </span>
        </div>
      </div>
      
      {/* Contact Buttons */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg mb-2">Na kontaktoni për këtë automjet:</h3>
        
        {/* Phone Call */}
        <a 
          href={`tel:${phoneNumber.replace(/\s/g, '')}`}
          className="flex items-center justify-between w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md transition-colors"
        >
          <span className="flex items-center">
            <FaPhone className="mr-2" /> Telefononi tani
          </span>
          <span className="font-semibold">{phoneNumber}</span>
        </a>
        
        {/* WhatsApp */}
        <a 
          href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-md transition-colors"
        >
          <span className="flex items-center">
            <FaWhatsapp className="mr-2" /> WhatsApp
          </span>
          <span className="font-semibold">{whatsapp}</span>
        </a>
        
        {/* Email/Form */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-between w-full bg-gray-700 hover:bg-gray-800 text-white p-3 rounded-md transition-colors"
        >
          <span className="flex items-center">
            <FaEnvelope className="mr-2" /> Dërgoni mesazh
          </span>
          <span className="font-semibold">Formular</span>
        </button>
      </div>
      
      {/* Contact Form Modal */}
      {isModalOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Kontakt për "{title}"</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Emri juaj
                </label>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Numri i telefonit
                </label>
                <input 
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mesazhi juaj
                </label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
                >
                  Mbyll
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Dërgo
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VehiclePriceContact;
