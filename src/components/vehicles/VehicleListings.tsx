'use client';

import { useState, useEffect } from 'react';
import VehicleCard, { VehicleCardProps } from './VehicleCard';
import VehicleFilters from './VehicleFilters';
import { motion } from 'framer-motion';

interface FilterOptions {
  brand: string;
  model: string;
  year: string;
  minPrice: string;
  maxPrice: string;
  fuel: string;
}

// Sample vehicle data - this would be fetched from API in production
const sampleVehicles: VehicleCardProps[] = [
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
  {
    id: '5',
    title: 'PORSCHE 911',
    subtitle: 'PORSCHE 911 CARRERA 4S',
    price: '€165,000',
    year: '2023',
    engine: '3.0',
    fuel: 'Petrol',
    mileage: '5,000 KM',
    power: '450 PS',
    image: '/images/vehicle-5.jpg',
  },
  {
    id: '6',
    title: 'VOLKSWAGEN GOLF',
    subtitle: 'VOLKSWAGEN GOLF 8 GTI',
    price: '€45,000',
    year: '2022',
    engine: '2.0',
    fuel: 'Petrol',
    mileage: '25,000 KM',
    power: '245 PS',
    image: '/images/vehicle-6.jpg',
  },
  {
    id: '7',
    title: 'MERCEDES BENZ G-CLASS',
    subtitle: 'MERCEDES BENZ G 63 AMG',
    price: '€195,000',
    year: '2023',
    engine: '4.0',
    fuel: 'Petrol',
    mileage: '10,000 KM',
    power: '585 PS',
    image: '/images/vehicle-7.jpg',
  },
  {
    id: '8',
    title: 'AUDI RS6',
    subtitle: 'AUDI RS6 AVANT',
    price: '€125,000',
    year: '2022',
    engine: '4.0',
    fuel: 'Petrol',
    mileage: '18,000 KM',
    power: '600 PS',
    image: '/images/vehicle-8.jpg',
  }
];

const VehicleListings = () => {
  const [vehicles, setVehicles] = useState<VehicleCardProps[]>(sampleVehicles);
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleCardProps[]>(sampleVehicles);
  const [isLoading, setIsLoading] = useState(false);
  const [resultsCount, setResultsCount] = useState(sampleVehicles.length);

  // Filter vehicles based on filter options
  const handleFilterChange = (filters: FilterOptions) => {
    setIsLoading(true);
    
    // In production, this would be an API call with the filters
    // For demo purposes, we're filtering the sample data client-side
    setTimeout(() => {
      const filtered = vehicles.filter(vehicle => {
        const brandMatch = !filters.brand || vehicle.title.toUpperCase().includes(filters.brand.toUpperCase());
        const modelMatch = !filters.model || 
          (vehicle.subtitle && vehicle.subtitle.toUpperCase().includes(filters.model.toUpperCase())) || 
          vehicle.title.toUpperCase().includes(filters.model.toUpperCase());
        const yearMatch = !filters.year || vehicle.year === filters.year;
        const fuelMatch = !filters.fuel || vehicle.fuel.toUpperCase() === filters.fuel.toUpperCase();
        
        let priceMatch = true;
        if (filters.minPrice && filters.maxPrice) {
          const vehiclePrice = parseInt(vehicle.price.replace(/[^0-9]/g, ''));
          priceMatch = vehiclePrice >= parseInt(filters.minPrice) && vehiclePrice <= parseInt(filters.maxPrice);
        } else if (filters.minPrice) {
          const vehiclePrice = parseInt(vehicle.price.replace(/[^0-9]/g, ''));
          priceMatch = vehiclePrice >= parseInt(filters.minPrice);
        } else if (filters.maxPrice) {
          const vehiclePrice = parseInt(vehicle.price.replace(/[^0-9]/g, ''));
          priceMatch = vehiclePrice <= parseInt(filters.maxPrice);
        }
        
        return brandMatch && modelMatch && yearMatch && fuelMatch && priceMatch;
      });
      
      setFilteredVehicles(filtered);
      setResultsCount(filtered.length);
      setIsLoading(false);
    }, 500); // Simulated API delay
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Makina në Shitje</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tek AutoAni, cilësia është prioriteti kryesor. Çdo makinë që kalon nëpër duart tona është e kontrolluar në detaje 
          për t&apos;i përmbushur standardet më të larta.
        </p>
      </div>
      
      {/* Filters */}
      <VehicleFilters onFilterChange={handleFilterChange} />
      
      {/* Results Counter */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-600">
          Showing <span className="font-bold">{resultsCount}</span> results
        </p>
        {/* Sort Options could go here */}
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        </div>
      )}

      {/* Vehicle Grid */}
      {!isLoading && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </motion.div>
      )}

      {/* No Results Message */}
      {!isLoading && filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            No vehicles match your criteria. Please try different filters.
          </p>
        </div>
      )}

      {/* Load More Button - would be connected to pagination API in production */}
      {!isLoading && filteredVehicles.length > 0 && (
        <div className="text-center pb-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
            Load More Vehicles
          </button>
        </div>
      )}
    </div>
  );
};

export default VehicleListings;
