'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const BrandHighlights = () => {
  // Sample car brands - these will be replaced with actual brands
  const brands = [
    { id: 1, name: 'Mercedes-Benz', logo: '/images/brands/mercedes.png' },
    { id: 2, name: 'BMW', logo: '/images/brands/bmw.png' },
    { id: 3, name: 'Audi', logo: '/images/brands/audi.png' },
    { id: 4, name: 'Volkswagen', logo: '/images/brands/volkswagen.png' },
    { id: 5, name: 'Range Rover', logo: '/images/brands/range-rover.png' },
    { id: 6, name: 'Porsche', logo: '/images/brands/porsche.png' },
    { id: 7, name: 'Ferrari', logo: '/images/brands/ferrari.png' },
    { id: 8, name: 'Lamborghini', logo: '/images/brands/lamborghini.png' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shfleto sipas Markës</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Importojmë të gjitha llojet e veturave nga brendet më prestigjoze në botë.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center"
            >
              <Link href={`/cars?brand=${brand.name}`}>
                <div className="bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg p-6 w-full h-32 flex items-center justify-center">
                  <div className="relative h-16 w-full">
                    <div className="flex items-center justify-center h-full">
                      {/* Placeholder for brand logos - will be replaced with actual logos */}
                      <span className="text-gray-700 font-medium">{brand.name}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandHighlights;
