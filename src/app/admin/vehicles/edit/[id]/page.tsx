'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import VehicleForm from '@/components/admin/vehicles/VehicleForm';
import { FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Sample vehicle data - in a real app, this would be fetched from the API
const sampleVehicle = {
  id: 'v1',
  title: 'MERCEDES BENZ S-CLASS',
  subtitle: 'S 400D 4MATIC AMG-LINE',
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
  ],
  status: 'available',
  featured: true,
  seoTitle: 'Mercedes Benz S-Class 2023 | AutoAni',
  seoDescription: 'Mercedes-Benz S-Class 2023 for sale at AutoAni - S 400D 4MATIC AMG-LINE, premium luxury sedan with advanced technology and comfort features.',
  seoKeywords: 'Mercedes S-Class, luxury sedan, S 400D, AMG-LINE, 4MATIC, Albania, premium cars',
  images: [
    { url: '/placeholder-image-1.jpg', altText: 'Mercedes S-Class Front View' },
    { url: '/placeholder-image-2.jpg', altText: 'Mercedes S-Class Side View' },
    { url: '/placeholder-image-3.jpg', altText: 'Mercedes S-Class Interior' },
  ],
};

export default function EditVehiclePage() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call to fetch the vehicle data
    // For now, we'll simulate an API call with a timeout
    const fetchVehicle = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, you would fetch the vehicle by ID
        // const response = await fetch(`/api/vehicles/${id}`);
        // const data = await response.json();
        
        // For now, we'll use our sample data
        setVehicle({
          ...sampleVehicle,
          id: id as string,
        });
      } catch (err: any) {
        setError(err.message || 'Failed to load vehicle data');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchVehicle();
    }
  }, [id]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Error: {error}</p>
              <p className="mt-2">
                <Link 
                  href="/admin/vehicles"
                  className="text-red-700 hover:text-red-600 font-medium"
                >
                  Go back to vehicles
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <Link 
              href="/admin/vehicles"
              className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-2"
            >
              <FaChevronLeft className="mr-1" /> Back to Vehicles
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Edit Vehicle</h1>
            <p className="mt-1 text-sm text-gray-500">
              Modify vehicle details and images for ID: {id}
            </p>
          </div>
        </motion.div>
        
        {/* Vehicle Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {vehicle && <VehicleForm initialData={vehicle} isEditing={true} />}
        </motion.div>
      </div>
    </AdminLayout>
  );
}
