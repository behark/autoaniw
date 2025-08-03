'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { motion } from 'framer-motion';
import { 
  FaCar, 
  FaFileAlt, 
  FaUsers, 
  FaChartLine, 
  FaEye, 
  FaPlus,
  FaEdit,
  FaCalendarAlt
} from 'react-icons/fa';
import Link from 'next/link';

// Sample data for dashboard stats
const dashboardStats = [
  { title: 'Total Vehicles', value: 124, icon: <FaCar />, color: 'bg-blue-500' },
  { title: 'Active Listings', value: 98, icon: <FaEye />, color: 'bg-green-500' },
  { title: 'Total Pages', value: 12, icon: <FaFileAlt />, color: 'bg-purple-500' },
  { title: 'Admin Users', value: 3, icon: <FaUsers />, color: 'bg-yellow-500' },
];

// Sample data for recent activities
const recentActivities = [
  { id: 1, action: 'Vehicle Added', item: 'AUDI Q7 3.0 TDI Quattro', user: 'Admin', date: '2 hours ago' },
  { id: 2, action: 'Vehicle Updated', item: 'BMW X5 xDrive30d', user: 'Editor', date: '5 hours ago' },
  { id: 3, action: 'Page Edited', item: 'Contact Us', user: 'Admin', date: '1 day ago' },
  { id: 4, action: 'Vehicle Sold', item: 'MERCEDES BENZ GLC 300d', user: 'Admin', date: '2 days ago' },
  { id: 5, action: 'Vehicle Added', item: 'VOLKSWAGEN TOUAREG 3.0 TDI', user: 'Editor', date: '2 days ago' },
];

// Sample data for recent vehicles
const recentVehicles = [
  { 
    id: 'v1', 
    title: 'MERCEDES BENZ S-CLASS', 
    price: '€95,000', 
    status: 'available', 
    added: '2023-10-10'
  },
  { 
    id: 'v2', 
    title: 'AUDI Q7 3.0 TDI Quattro', 
    price: '€65,000', 
    status: 'available', 
    added: '2023-10-05'
  },
  { 
    id: 'v3', 
    title: 'BMW X5 xDrive30d', 
    price: '€70,000', 
    status: 'available', 
    added: '2023-10-02'
  },
  { 
    id: 'v4', 
    title: 'MERCEDES BENZ GLC 300d', 
    price: '€55,000', 
    status: 'sold', 
    added: '2023-09-28'
  },
];

export default function AdminDashboardPage() {
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
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Overview and summary of your AutoAni website
            </p>
          </motion.div>
          
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Link
              href="/admin/vehicles/new"
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaPlus className="mr-2" />
              Add Vehicle
            </Link>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="bg-white rounded-lg shadow-sm p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.color} text-white`}>
                  {stat.icon}
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    {stat.title}
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Recent Activities & Vehicles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Vehicles */}
          <motion.div
            className="bg-white rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Recent Vehicles</h2>
                <Link
                  href="/admin/vehicles"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  View all
                </Link>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
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
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Added
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentVehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {vehicle.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vehicle.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            vehicle.status === 'available'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1.5 text-gray-400" />
                          {vehicle.added}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/vehicles/edit/${vehicle.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          
          {/* Recent Activities */}
          <motion.div
            className="bg-white rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Activities</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="mr-4 flex-shrink-0">
                      <div className="bg-gray-100 rounded-full p-2">
                        {activity.action.includes('Vehicle') ? (
                          <FaCar className="text-gray-500" />
                        ) : activity.action.includes('Page') ? (
                          <FaFileAlt className="text-gray-500" />
                        ) : (
                          <FaChartLine className="text-gray-500" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {activity.item}
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{activity.user}</p>
                        <p className="text-xs text-gray-400">{activity.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
