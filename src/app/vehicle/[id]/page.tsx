'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import VehicleImageGallery from '@/components/vehicles/detail/VehicleImageGallery';
import VehicleSpecs from '@/components/vehicles/detail/VehicleSpecs';
import VehiclePriceContact from '@/components/vehicles/detail/VehiclePriceContact';
import VehicleSidebar from '@/components/vehicles/detail/VehicleSidebar';
import { VehicleCardProps } from '@/components/vehicles/VehicleCard';
import { FaArrowLeft, FaShare, FaHeart } from 'react-icons/fa';

// Sample data - in production this would come from API
const sampleVehicle = {
  id: '1',
  title: 'MERCEDES BENZ S-CLASS',
  subtitle: 'MERCEDES BENZ S 400D 4MATIC AMG-LINE',
  brand: 'Mercedes Benz',
  model: 'S-Class',
  year: '2023',
  price: '€95,000',
  description: 'Mercedes-Benz S-Klasa është një simbol i luksi, komforti dhe teknologjisë. Me versionin e saj të fundit S 400d 4MATIC AMG-LINE, ky model ofron një kombinim perfekt të fuqisë dhe elegancës. E pajisur me sistemet më të avancuara të sigurisë dhe teknologjisë, kjo makinë është krijuar për të ofruar një përvojë unike vozitjeje.',
  engine: '3.0L Diesel',
  fuel: 'Diesel',
  mileage: '15,000 KM',
  power: '330 PS',
  transmission: 'Automatike',
  color: 'E zezë metalike',
  features: [
    'AMG Line Exterior',
    'Burmester® surround sound system',
    'Panoramic sliding sunroof',
    'Active Parking Assist',
    'LED Intelligent Light System',
    'MULTIBEAM LED headlamps',
    '360° camera',
    'KEYLESS-GO',
    'Head-up Display',
    'MBUX augmented reality for navigation',
    'Wireless charging',
    'Leather seats',
    'Memory seats',
    'Seat heating and ventilation',
    'Driving Assistance Package Plus',
    'Air suspension',
  ],
  images: [
    { url: '/placeholder-image-1.jpg', altText: 'Mercedes S-Class Front View' },
    { url: '/placeholder-image-2.jpg', altText: 'Mercedes S-Class Side View' },
    { url: '/placeholder-image-3.jpg', altText: 'Mercedes S-Class Interior' },
    { url: '/placeholder-image-4.jpg', altText: 'Mercedes S-Class Rear View' },
    { url: '/placeholder-image-5.jpg', altText: 'Mercedes S-Class Dashboard' },
  ],
  status: 'available' as const,
};

// Sample similar vehicles
const similarVehicles: VehicleCardProps[] = [
  {
    id: '2',
    title: 'AUDI A8 L 50 TDI QUATTRO',
    price: '€85,000',
    year: '2022',
    engine: '3.0',
    fuel: 'Diesel',
    mileage: '25,000 KM',
    power: '286 PS',
    image: '/placeholder-image-2.jpg',
  },
  {
    id: '3',
    title: 'BMW 7 SERIES 740d xDrive',
    price: '€90,000',
    year: '2023',
    engine: '3.0',
    fuel: 'Diesel',
    mileage: '10,000 KM',
    power: '340 PS',
    image: '/placeholder-image-3.jpg',
  },
  {
    id: '4',
    title: 'MERCEDES BENZ E-CLASS',
    price: '€75,000',
    year: '2023',
    engine: '2.0',
    fuel: 'Diesel',
    mileage: '5,000 KM',
    power: '245 PS',
    image: '/placeholder-image-4.jpg',
  },
];

export default function VehicleDetailPage() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(sampleVehicle);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In production, this would fetch data from API based on ID
    // For now, we'll simulate loading and use sample data
    setIsLoading(true);
    
    setTimeout(() => {
      setVehicle({
        ...sampleVehicle,
        id: id as string,
      });
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="h-12 bg-gray-200 rounded-lg w-3/4"></div>
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="space-y-8">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Navigation Bar */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <FaArrowLeft className="mr-2" /> Kthehu
          </button>
          
          <div className="flex space-x-2">
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <FaHeart className="text-gray-500" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <FaShare className="text-gray-500" />
            </button>
          </div>
        </div>
        
        {/* Vehicle Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{vehicle.title}</h1>
        {vehicle.subtitle && (
          <p className="text-xl text-gray-600 mb-8">{vehicle.subtitle}</p>
        )}
        
        {/* Vehicle Image Gallery */}
        <div className="mb-8">
          <VehicleImageGallery images={vehicle.images || []} />
        </div>
        
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Specs & Description) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">Përshkrimi</h2>
              <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>
            </div>
            
            {/* Specifications */}
            <VehicleSpecs
              brand={vehicle.brand}
              model={vehicle.model}
              year={vehicle.year}
              mileage={vehicle.mileage}
              engine={vehicle.engine}
              fuel={vehicle.fuel}
              power={vehicle.power}
              transmission={vehicle.transmission}
              color={vehicle.color}
              features={vehicle.features}
            />
          </div>
          
          {/* Right Column (Price, Contact, Sidebar) */}
          <div className="space-y-6">
            {/* Price & Contact */}
            <VehiclePriceContact
              title={vehicle.title}
              price={vehicle.price}
              status={vehicle.status}
            />
            
            {/* Sidebar with Similar Vehicles & Financing */}
            <VehicleSidebar
              similarVehicles={similarVehicles}
              brand={vehicle.brand}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
