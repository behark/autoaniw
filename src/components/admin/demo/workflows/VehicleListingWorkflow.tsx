'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@/utils/animations';
import { Button } from '@/components/ui/design-system/Button';
import { FaCar, FaImage, FaGlobe, FaCheck } from 'react-icons/fa';

// Demo vehicle data
const vehicleData = {
  name: "Ferrari F8 Tributo",
  year: 2023,
  price: "$329,000",
  images: [
    "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1080",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1080",
    "https://images.unsplash.com/photo-1610036615665-ec9252872f0c?q=80&w=1080"
  ],
  languages: ['en', 'es', 'fr', 'de']
};

interface VehicleListingWorkflowProps {
  currentStep: number;
}

export default function VehicleListingWorkflow({ currentStep }: VehicleListingWorkflowProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  // Simplified step content rendering
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basic info
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Vehicle Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Vehicle Name</label>
                <input 
                  type="text" 
                  className="w-full border p-2 rounded" 
                  value={vehicleData.name}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <input 
                  type="text" 
                  className="w-full border p-2 rounded" 
                  value={vehicleData.year}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input 
                  type="text" 
                  className="w-full border p-2 rounded" 
                  value={vehicleData.price}
                  readOnly
                />
              </div>
            </div>
          </div>
        );
        
      case 1: // Media selection
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Select Media</h3>
            <div className="grid grid-cols-3 gap-3">
              {vehicleData.images.map((image, index) => (
                <div key={index} className="border rounded overflow-hidden">
                  <img src={image} alt={`${vehicleData.name} view ${index+1}`} className="w-full h-40 object-cover" />
                  <div className="p-2 flex justify-between items-center">
                    <span className="text-sm">View {index+1}</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 2: // Localization
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Localize Content</h3>
            
            <div className="flex gap-3 mb-4">
              {vehicleData.languages.map((lang) => (
                <button 
                  key={lang}
                  className={`px-3 py-1 rounded ${selectedLanguage === lang ? 'bg-primary-500 text-white' : 'bg-gray-100'}`}
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Title ({selectedLanguage.toUpperCase()})
              </label>
              <input 
                type="text" 
                className="w-full border p-2 rounded" 
                value={selectedLanguage === 'en' 
                  ? vehicleData.name 
                  : `${vehicleData.name} (${selectedLanguage.toUpperCase()})`}
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Description ({selectedLanguage.toUpperCase()})
              </label>
              <textarea 
                className="w-full border p-2 rounded h-20" 
                value={selectedLanguage === 'en' 
                  ? "The Ferrari F8 Tributo is the new mid-rear-engined sports car that represents the highest expression of the Prancing Horse's classic two-seater berlinetta."
                  : `${selectedLanguage.toUpperCase()} - The Ferrari F8 Tributo is the new mid-rear-engined sports car that represents the highest expression of the Prancing Horse's classic two-seater berlinetta.`}
                readOnly
              />
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-2">Media Localization</h4>
              <div className="space-y-3">
                {vehicleData.images.slice(0, 1).map((image, index) => (
                  <div key={index} className="flex gap-3">
                    <img src={image} alt="" className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Alt Text ({selectedLanguage.toUpperCase()})
                      </label>
                      <input 
                        type="text" 
                        className="w-full border p-2 rounded" 
                        value={selectedLanguage === 'en' 
                          ? "Front view of a red Ferrari F8 Tributo"
                          : `${selectedLanguage.toUpperCase()} - Front view of a red Ferrari F8 Tributo`}
                        readOnly
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 3: // Publishing confirmation
        return (
          <div className="space-y-4">
            <div className="text-center p-6 bg-success-50 rounded-lg border border-success-200">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="text-success-600 text-xl" />
              </div>
              <h3 className="text-xl font-medium text-success-800 mb-2">Ready to Publish</h3>
              <p className="mb-4">
                Your Ferrari F8 Tributo listing is ready to be published with localized content in 4 languages.
              </p>
              <Button variant="success">
                Publish Listing
              </Button>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-3 border-b font-medium">Publishing Summary</div>
              <div className="p-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <FaCar className="text-primary-500 mr-2" />
                    Vehicle details complete in all languages
                  </li>
                  <li className="flex items-center">
                    <FaImage className="text-primary-500 mr-2" />
                    3 media items selected with optimized sizes
                  </li>
                  <li className="flex items-center">
                    <FaGlobe className="text-primary-500 mr-2" />
                    Content localized in 4 languages
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Step content not found</div>;
    }
  };

  return (
    <motion.div 
      variants={fadeAnimation}
      initial="hidden"
      animate="visible"
      className="min-h-[400px]"
    >
      {renderStepContent()}
    </motion.div>
  );
}
