'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaTrophy } from 'react-icons/fa';

const AwardsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-blue-600 rounded-xl overflow-hidden">
          <div className="md:flex items-center">
            {/* Left side with image - replace with actual award image */}
            <div className="md:w-1/3 bg-blue-700 p-8 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <FaTrophy className="h-24 w-24 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-white text-2xl font-bold">Çmimi "Best Service"</h3>
                <p className="text-blue-100 mt-2">2023</p>
              </motion.div>
            </div>

            {/* Right side with content */}
            <div className="md:w-2/3 p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
                  Angazhimi për Cilësi
                </h2>
                <p className="text-blue-100 text-lg mb-6">
                  Auto Ani është përkushtuar ndaj cilësisë dhe ofrimit të shërbimit të shkëlqyer për të gjithë klientët tanë. 
                  Përpjekjet tona janë njohur në industri dhe ne vazhdojmë të përmbushim standardet më të larta.
                </p>
                <p className="text-blue-100 mb-8">
                  Vizioni ynë është të vazhdojmë të jemi lider në tregun e makinave luksoze, duke ofruar 
                  automjete të kualitetit të lartë dhe shërbim të personalizuar për secilin klient.
                </p>
                <Link
                  href="/about"
                  className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Mëso më shumë për ne
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
