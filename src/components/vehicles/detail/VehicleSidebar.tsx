'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCar, FaCalculator, FaHandshake, FaShieldAlt } from 'react-icons/fa';
import { VehicleCardProps } from '../VehicleCard';

interface VehicleSidebarProps {
  similarVehicles?: VehicleCardProps[];
  brand: string;
}

const VehicleSidebar = ({ similarVehicles = [], brand }: VehicleSidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Similar Vehicles Section */}
      <motion.div 
        className="bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-xl font-bold mb-4 border-b pb-2">Automjete të ngjashme</h3>
        
        {similarVehicles.length > 0 ? (
          <div className="space-y-4">
            {similarVehicles.slice(0, 3).map((vehicle) => (
              <Link 
                key={vehicle.id}
                href={`/vehicle/${vehicle.id}`}
                className="block hover:bg-gray-50 rounded-lg p-2 transition-colors"
              >
                <div className="flex space-x-3">
                  <div className="relative h-16 w-24 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 line-clamp-1">{vehicle.title}</h4>
                    <p className="text-sm text-gray-500 mb-1">{vehicle.year} • {vehicle.mileage}</p>
                    <p className="font-semibold text-blue-600">{vehicle.price}</p>
                  </div>
                </div>
              </Link>
            ))}
            
            {/* View More Button */}
            <Link 
              href={`/cars?brand=${encodeURIComponent(brand)}`} 
              className="block text-center text-blue-600 hover:text-blue-800 font-medium pt-2"
            >
              Shiko më shumë {brand}
            </Link>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">Nuk ka automjete të ngjashme në dispozicion.</p>
        )}
      </motion.div>

      {/* Financing Options Section */}
      <motion.div 
        className="bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-xl font-bold mb-4 border-b pb-2">Opsionet e financimit</h3>
        
        <div className="space-y-4">
          {/* Financing Calculator */}
          <Link 
            href="/financing-calculator"
            className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="mr-4 mt-1">
              <div className="bg-blue-100 p-2 rounded-full">
                <FaCalculator className="text-blue-600 text-lg" />
              </div>
            </div>
            <div>
              <h4 className="font-medium">Kalkulator Financimi</h4>
              <p className="text-sm text-gray-600">Llogarisni këste mujore bazuar në vlerën e automjetit</p>
            </div>
          </Link>
          
          {/* Leasing Options */}
          <Link 
            href="/leasing"
            className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="mr-4 mt-1">
              <div className="bg-blue-100 p-2 rounded-full">
                <FaHandshake className="text-blue-600 text-lg" />
              </div>
            </div>
            <div>
              <h4 className="font-medium">Opsione Lizing</h4>
              <p className="text-sm text-gray-600">Zbuloni opsionet tona të lizingut për biznese dhe individë</p>
            </div>
          </Link>
          
          {/* Warranty Info */}
          <Link 
            href="/warranty"
            className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="mr-4 mt-1">
              <div className="bg-blue-100 p-2 rounded-full">
                <FaShieldAlt className="text-blue-600 text-lg" />
              </div>
            </div>
            <div>
              <h4 className="font-medium">Informacion për Garancinë</h4>
              <p className="text-sm text-gray-600">Të gjitha automjetet tona vijnë me garanci të kufizuar</p>
            </div>
          </Link>
          
          {/* Trade-in Option */}
          <Link 
            href="/trade-in"
            className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="mr-4 mt-1">
              <div className="bg-blue-100 p-2 rounded-full">
                <FaCar className="text-blue-600 text-lg" />
              </div>
            </div>
            <div>
              <h4 className="font-medium">Shkëmbim (Trade-in)</h4>
              <p className="text-sm text-gray-600">Përdorni automjetin tuaj aktual për të ulur çmimin e blerjes</p>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default VehicleSidebar;
