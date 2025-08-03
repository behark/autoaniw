'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash,
  FaEye,
  FaFileAlt,
  FaGlobe
} from 'react-icons/fa';

// Mock data for pages
const mockPages = [
  {
    id: 'p1',
    title: 'Home',
    slug: '/',
    lastModified: '2023-10-15',
    author: 'Admin',
    status: 'published',
    isHomepage: true
  },
  {
    id: 'p2',
    title: 'About Us',
    slug: '/about',
    lastModified: '2023-10-10',
    author: 'Admin',
    status: 'published',
    isHomepage: false
  },
  {
    id: 'p3',
    title: 'Contact',
    slug: '/contact',
    lastModified: '2023-10-05',
    author: 'Editor',
    status: 'published',
    isHomepage: false
  },
  {
    id: 'p4',
    title: 'Financing Options',
    slug: '/financing',
    lastModified: '2023-09-28',
    author: 'Admin',
    status: 'draft',
    isHomepage: false
  },
  {
    id: 'p5',
    title: 'Leasing',
    slug: '/leasing',
    lastModified: '2023-09-20',
    author: 'Editor',
    status: 'published',
    isHomepage: false
  },
];

export default function AdminPagesPage() {
  const [pages, setPages] = useState(mockPages);
  const [searchQuery, setSearchQuery] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Delete page (mock function)
  const handleDeletePage = (id: string) => {
    setPageToDelete(id);
    setIsConfirmModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (pageToDelete) {
      setPages(pages.filter(page => page.id !== pageToDelete));
      setPageToDelete(null);
      setIsConfirmModalOpen(false);
    }
  };

  // Apply filters
  const filteredPages = pages.filter(page => {
    // Search filter
    return (
      searchQuery === '' ||
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
            <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage website content pages
            </p>
          </motion.div>
          
          <div className="mt-4 md:mt-0">
            <Link
              href="/admin/pages/new"
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaPlus className="mr-2" />
              Add New Page
            </Link>
          </div>
        </div>
        
        {/* Search Bar */}
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
                placeholder="Search pages..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Pages List */}
        <motion.div
          className="bg-white rounded-lg shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredPages.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Page
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    URL
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Modified
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
                {filteredPages.map((page) => (
                  <tr key={page.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <FaFileAlt className="text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900 flex items-center">
                            {page.title}
                            {page.isHomepage && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Homepage
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">By {page.author}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <FaGlobe className="mr-1.5 text-gray-400" />
                        {page.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {page.lastModified}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          page.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={page.slug}
                          className="text-gray-600 hover:text-gray-900"
                          target="_blank"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          href={`/admin/pages/edit/${page.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDeletePage(page.id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={page.isHomepage}
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
              <FaFileAlt className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No pages found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new page.
              </p>
              <div className="mt-6">
                <Link
                  href="/admin/pages/new"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  <FaPlus className="mr-2" />
                  Add New Page
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
              Are you sure you want to delete this page? This action cannot be undone.
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
