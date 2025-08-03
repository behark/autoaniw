'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export interface VehicleCardProps {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  year: string;
  engine: string;
  fuel: string;
  mileage: string;
  power: string;
  image: string;
  isNew?: boolean;
  hasCustoms?: boolean;
}

const VehicleCard = ({
  id,
  title,
  subtitle,
  price,
  year,
  engine,
  fuel,
  mileage,
  power,
  image,
  isNew = false,
  hasCustoms = true,
}: VehicleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Vehicle Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-300 flex items-center justify-center">
          {/* Placeholder for images - will be replaced with actual images */}
          <span className="text-gray-500">Vehicle Image</span>
        </div>
        
        {/* Tags */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {isNew && (
            <span className="bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-md">
              New
            </span>
          )}
          {hasCustoms && (
            <span className="bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-md">
              Me doganë!
            </span>
          )}
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1 truncate">{title}</h3>
        {subtitle && <p className="text-gray-500 text-sm mb-3 truncate">{subtitle}</p>}
        
        {/* Specifications */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-sm">
            <span className="text-gray-500">Viti:</span>
            <span className="ml-2 font-medium">{year}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Motor:</span>
            <span className="ml-2 font-medium">{engine}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Lëndë Djegëse:</span>
            <span className="ml-2 font-medium">{fuel}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Kilometrazh:</span>
            <span className="ml-2 font-medium">{mileage}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Fuqia:</span>
            <span className="ml-2 font-medium">{power}</span>
          </div>
        </div>
        
        {/* Price and Action */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-gray-800">{price}</span>
          <Link 
            href={`/vehicle/${id}`} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Më shumë
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
