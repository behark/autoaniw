'use client';

import { FaCar, FaGasPump, FaTachometerAlt, FaCogs, FaCalendarAlt, FaPaintBrush } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface VehicleSpecsProps {
  brand: string;
  model: string;
  year: string | number;
  mileage: string | number;
  engine: string;
  fuel: string;
  power: string;
  transmission: string;
  color?: string;
  features?: string[];
}

const VehicleSpecs = ({
  brand,
  model,
  year,
  mileage,
  engine,
  fuel,
  power,
  transmission,
  color = 'N/A',
  features = [],
}: VehicleSpecsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4">Specifikimet</h2>
      
      {/* Main Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Të dhënat kryesore</h3>
          <ul className="space-y-3">
            <motion.li 
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <FaCar className="text-blue-600" />
              </div>
              <div>
                <span className="text-gray-600 text-sm">Marka & Modeli:</span>
                <p className="font-medium">{brand} {model}</p>
              </div>
            </motion.li>
            
            <motion.li 
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <FaCalendarAlt className="text-blue-600" />
              </div>
              <div>
                <span className="text-gray-600 text-sm">Viti:</span>
                <p className="font-medium">{year}</p>
              </div>
            </motion.li>
            
            <motion.li 
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <FaTachometerAlt className="text-blue-600" />
              </div>
              <div>
                <span className="text-gray-600 text-sm">Kilometrazh:</span>
                <p className="font-medium">{typeof mileage === 'number' ? `${mileage.toLocaleString()} KM` : mileage}</p>
              </div>
            </motion.li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Specifikimet teknike</h3>
          <ul className="space-y-3">
            <motion.li 
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <FaCogs className="text-blue-600" />
              </div>
              <div>
                <span className="text-gray-600 text-sm">Motori:</span>
                <p className="font-medium">{engine}</p>
              </div>
            </motion.li>
            
            <motion.li 
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <FaGasPump className="text-blue-600" />
              </div>
              <div>
                <span className="text-gray-600 text-sm">Lëndë Djegëse:</span>
                <p className="font-medium">{fuel}</p>
              </div>
            </motion.li>
            
            <motion.li 
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <FaCogs className="text-blue-600" />
              </div>
              <div>
                <span className="text-gray-600 text-sm">Fuqia:</span>
                <p className="font-medium">{power}</p>
              </div>
            </motion.li>
            
            <motion.li 
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <FaCogs className="text-blue-600" />
              </div>
              <div>
                <span className="text-gray-600 text-sm">Transmisioni:</span>
                <p className="font-medium">{transmission}</p>
              </div>
            </motion.li>
            
            <motion.li 
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <FaPaintBrush className="text-blue-600" />
              </div>
              <div>
                <span className="text-gray-600 text-sm">Ngjyra:</span>
                <p className="font-medium">{color}</p>
              </div>
            </motion.li>
          </ul>
        </div>
      </div>
      
      {/* Features */}
      {features.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Pajisjet dhe opsionet</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {features.map((feature, index) => (
              <motion.li 
                key={index}
                className="flex items-center py-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VehicleSpecs;
