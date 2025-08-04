import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-neutral-900 to-neutral-800 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/images/hero-background.jpg"
          alt="Luxury car background" 
          className="w-full h-full object-cover opacity-30"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Exceptional Vehicles for Exceptional People
          </h1>
          <p className="text-xl md:text-2xl text-neutral-200 mb-8">
            Discover premium quality pre-owned vehicles with AutoAni's curated selection and exceptional service.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="/vehicles" 
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
            >
              View Our Inventory
            </a>
            <a 
              href="/about" 
              className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
            >
              About Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
