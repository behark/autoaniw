'use client';

import { useState } from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

interface FilterOptions {
  brand: string;
  model: string;
  year: string;
  minPrice: string;
  maxPrice: string;
  fuel: string;
}

interface VehicleFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const VehicleFilters = ({ onFilterChange }: VehicleFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    brand: '',
    model: '',
    year: '',
    minPrice: '',
    maxPrice: '',
    fuel: '',
  });

  // Sample data for select options
  const brands = ['All', 'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 'Range Rover', 'Ferrari', 'Lamborghini'];
  const years = ['All', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'];
  const fuelTypes = ['All', 'Diesel', 'Petrol', 'Hybrid', 'Electric'];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      brand: '',
      model: '',
      year: '',
      minPrice: '',
      maxPrice: '',
      fuel: '',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      {/* Mobile Toggle Button */}
      <div className="md:hidden mb-4">
        <button 
          onClick={toggleFilters}
          className="w-full flex items-center justify-between bg-gray-100 p-3 rounded-md"
        >
          <span className="font-medium flex items-center">
            <FaFilter className="mr-2" /> Filters
          </span>
          {isFilterOpen ? <FaTimes /> : <FaSearch />}
        </button>
      </div>
      
      {/* Filters Form - always visible on desktop, toggleable on mobile */}
      <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Brand Filter */}
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
              Marka
            </label>
            <select
              id="brand"
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                brand !== 'All' && <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Model Filter */}
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
              Modeli
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={filters.model}
              onChange={handleFilterChange}
              placeholder="Any Model"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Year Filter */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Viti
            </label>
            <select
              id="year"
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                year !== 'All' && <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Min Price Filter */}
          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Çmimi Min
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="€ Min"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Max Price Filter */}
          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Çmimi Max
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="€ Max"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Fuel Type Filter */}
          <div>
            <label htmlFor="fuel" className="block text-sm font-medium text-gray-700 mb-1">
              Lëndë Djegëse
            </label>
            <select
              id="fuel"
              name="fuel"
              value={filters.fuel}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Fuel Types</option>
              {fuelTypes.map((fuel) => (
                fuel !== 'All' && <option key={fuel} value={fuel}>{fuel}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex justify-between">
          <button
            onClick={clearFilters}
            className="text-gray-600 hover:text-gray-800 font-medium flex items-center"
          >
            <FaTimes className="mr-1" /> Clear Filters
          </button>
          <button
            onClick={() => onFilterChange(filters)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center"
          >
            <FaSearch className="mr-2" /> Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleFilters;
