'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaPlus, 
  FaSearch, 
  FaSort, 
  FaFilter, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaCarAlt
} from 'react-icons/fa';

// Mock data for vehicles
const mockVehicles = [
  {
    id: 'v1',
    title: 'MERCEDES BENZ S-CLASS',
    subtitle: 'S 400D 4MATIC AMG-LINE',
    brand: 'Mercedes Benz',
    year: '2023',
    price: '€95,000',
    image: '/placeholder-image-1.jpg',
    status: 'available',
    featured: true,
  },
  {
    id: 'v2',
    title: 'AUDI Q7',
    subtitle: '3.0 TDI Quattro',
    brand: 'Audi',
    year: '2022',
    price: '€65,000',
    image: '/placeholder-image-2.jpg',
    status: 'available',
    featured: false,
  },
  {
    id: 'v3',
    title: 'BMW X5',
    subtitle: 'xDrive30d M Sport',
    brand: 'BMW',
    year: '2022',
    price: '€70,000',
    image: '/placeholder-image-3.jpg',
    status: 'available',
    featured: true,
  },
  {
    id: 'v4',
    title: 'MERCEDES BENZ GLC',
    subtitle: '300d 4MATIC',
    brand: 'Mercedes Benz',
    year: '2021',
    price: '€55,000',
    image: '/placeholder-image-4.jpg',
    status: 'sold',
    featured: false,
  },
  {
    id: 'v5',
    title: 'VOLKSWAGEN TOUAREG',
    subtitle: '3.0 TDI R-Line',
    brand: 'Volkswagen',
    year: '2022',
    price: '€60,000',
    image: '/placeholder-image-5.jpg',
    status: 'available',
    featured: false,
  },
];

// Available filters
const brands = ['All', 'Mercedes Benz', 'BMW', 'Audi', 'Volkswagen'];
const years = ['All', '2023', '2022', '2021', '2020'];
const statuses = ['All', 'available', 'sold', 'reserved'];

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter changes
  const handleFilterChange = (
    filterType: 'brand' | 'year' | 'status',
    value: string
  ) => {
    switch (filterType) {
      case 'brand':
        setSelectedBrand(value);
        break;
      case 'year':
        setSelectedYear(value);
        break;
      case 'status':
        setSelectedStatus(value);
        break;
    }
  };

  // Delete vehicle (mock function)
  const handleDeleteVehicle = (id: string) => {
    setVehicleToDelete(id);
    setIsConfirmModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (vehicleToDelete) {
      setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleToDelete));
      setVehicleToDelete(null);
      setIsConfirmModalOpen(false);
    }
  };

  // Apply filters
  const filteredVehicles = vehicles.filter(vehicle => {
    // Search filter
    const searchFilter = 
      searchQuery === '' ||
      vehicle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Brand filter
    const brandFilter = selectedBrand === 'All' || vehicle.brand === selectedBrand;
    
    // Year filter
    const yearFilter = selectedYear === 'All' || vehicle.year === selectedYear;
    
    // Status filter
    const statusFilter = selectedStatus === 'All' || vehicle.status === selectedStatus;
    
    return searchFilter && brandFilter && yearFilter && statusFilter;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-gray-900">Vehicle Listings</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your inventory of vehicles
            </p>
          </motion.div>
          
          <div className="mt-4 md:mt-0">
            <Link
              href="/admin/vehicles/new"
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaPlus className="mr-2" />
              Add New Vehicle
            </Link>
          </div>
        </div>
        
        {/* Search & Filter Bar */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {/* Search Input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search vehicles..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-2">
              {/* Brand Filter */}
              <div className="relative inline-block">
                <select
                  value={selectedBrand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="block pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand === 'All' ? 'All Brands' : brand}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Year Filter */}
              <div className="relative inline-block">
                <select
                  value={selectedYear}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                  className="block pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year === 'All' ? 'All Years' : year}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Status Filter */}
              <div className="relative inline-block">
                <select
                  value={selectedStatus}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="block pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status === 'All' 
                        ? 'All Statuses' 
                        : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Vehicle Listings */}
        <motion.div
          className="bg-white rounded-lg shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredVehicles.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Vehicle
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Brand/Year
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          {vehicle.image ? (
                            <div className="relative h-10 w-16 rounded overflow-hidden">
                              <Image
                                src={vehicle.image}
                                alt={vehicle.title}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-10 w-16 rounded bg-gray-100 flex items-center justify-center">
                              <FaCarAlt className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {vehicle.title}
                            {vehicle.featured && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Featured
                              </span>
                            )}
                          </div>
                          {vehicle.subtitle && (
                            <div className="text-sm text-gray-500">{vehicle.subtitle}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vehicle.brand}</div>
                      <div className="text-sm text-gray-500">{vehicle.year}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{vehicle.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          vehicle.status === 'available'
                            ? 'bg-green-100 text-green-800'
                            : vehicle.status === 'sold'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/vehicle/${vehicle.id}`}
                          className="text-gray-600 hover:text-gray-900"
                          target="_blank"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          href={`/admin/vehicles/edit/${vehicle.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="px-6 py-8 text-center">
              <FaCarAlt className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No vehicles found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Add a new vehicle or adjust your filters.
              </p>
              <div className="mt-6">
                <Link
                  href="/admin/vehicles/new"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  <FaPlus className="mr-2" />
                  Add New Vehicle
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div 
            className="bg-white rounded-lg p-6 max-w-md mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-lg font-medium text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete this vehicle? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}
