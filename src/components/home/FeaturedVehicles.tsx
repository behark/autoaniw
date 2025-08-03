'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Vehicle {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  year: string;
  engine: string;
  fuel: string;
  mileage: string;
  power: string;
  image: string;
  isNew?: boolean;
}

const FeaturedVehicles = () => {
  // Sample featured vehicles data - this will be replaced with actual data from API
  const featuredVehicles: Vehicle[] = [
    {
      id: '1',
      title: 'AUDI Q7',
      subtitle: 'AUDI Q7 50TDI S-LINE / FACELIFT / 7 ULESE',
      price: '€85,000',
      year: '2024',
      engine: '3.0',
      fuel: 'Diesel',
      mileage: '0 KM',
      power: '286 PS',
      image: '/images/vehicle-1.jpg',
      isNew: true
    },
    {
      id: '2',
      title: 'MERCEDES BENZ S-CLASS',
      subtitle: 'MERCEDES BENZ S 400D 4MATIC AMG-LINE',
      price: '€95,000',
      year: '2023',
      engine: '3.0',
      fuel: 'Diesel',
      mileage: '15,000 KM',
      power: '330 PS',
      image: '/images/vehicle-2.jpg',
    },
    {
      id: '3',
      title: 'BMW X5',
      subtitle: 'BMW X5 M50D XDRIVE / M-PAKET',
      price: '€65,000',
      year: '2023',
      engine: '3.0',
      fuel: 'Diesel',
      mileage: '20,000 KM',
      power: '400 PS',
      image: '/images/vehicle-3.jpg',
    },
    {
      id: '4',
      title: 'RANGE ROVER SPORT',
      subtitle: 'RANGE ROVER SPORT P440e AUTOBIOGRAPHY',
      price: '€110,000',
      year: '2024',
      engine: '3.0',
      fuel: 'Hybrid',
      mileage: '0 KM',
      power: '440 PS',
      image: '/images/vehicle-4.jpg',
      isNew: true
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Automjetet e Veçuara</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nëse dëshironi të shihni veturat e veçanta që posedojmë dhe janë të disponueshme për shitje, këtu janë disa nga opsionet që kemi në dispozicion.
          </p>
        </motion.div>

        <div className="featured-vehicles-slider">
          <Slider {...settings}>
            {featuredVehicles.map((vehicle) => (
              <div key={vehicle.id} className="px-3 pb-6">
                <motion.div 
                  variants={childVariants}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-56 md:h-64">
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-300 flex items-center justify-center">
                      {/* Placeholder for images - will be replaced with actual images */}
                      <span className="text-gray-500">Vehicle Image</span>
                    </div>
                    {vehicle.isNew && (
                      <span className="absolute top-4 right-4 bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-md">
                        New
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1">{vehicle.title}</h3>
                    <p className="text-gray-500 text-sm mb-3">{vehicle.subtitle}</p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-sm">
                        <span className="text-gray-500">Viti:</span>
                        <span className="ml-2 font-medium">{vehicle.year}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Motor:</span>
                        <span className="ml-2 font-medium">{vehicle.engine}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Lëndë Djegëse:</span>
                        <span className="ml-2 font-medium">{vehicle.fuel}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Kilometrazh:</span>
                        <span className="ml-2 font-medium">{vehicle.mileage}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Fuqia:</span>
                        <span className="ml-2 font-medium">{vehicle.power}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-bold text-gray-800">{vehicle.price}</span>
                      <Link 
                        href={`/vehicle/${vehicle.id}`} 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                      >
                        Më shumë
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
        
        <div className="text-center mt-8">
          <Link
            href="/cars"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Shiko të gjitha veturat në stok
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
