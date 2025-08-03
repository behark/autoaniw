'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import VehicleForm from '@/components/admin/vehicles/VehicleForm';
import { FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AddVehiclePage() {
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
            <h1 className="text-2xl font-bold text-gray-900">Add New Vehicle</h1>
            <p className="mt-1 text-sm text-gray-500">
              Create a new vehicle listing with all details and images
            </p>
          </div>
        </motion.div>
        
        {/* Vehicle Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <VehicleForm />
        </motion.div>
      </div>
    </AdminLayout>
  );
}
