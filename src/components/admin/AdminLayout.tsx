'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// usePathname equivalent in Pages Router
const usePathname = () => {
  const router = useRouter();
  return router.pathname;
};
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaTachometerAlt,
  FaCar,
  FaFileAlt,
  FaUsers,
  FaCogs,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaUser
} from 'react-icons/fa';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(true);
  
  // Navigation items
  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <FaTachometerAlt /> },
    { name: 'Vehicles', href: '/admin/vehicles', icon: <FaCar /> },
    { name: 'Pages', href: '/admin/pages', icon: <FaFileAlt /> },
    { name: 'Users', href: '/admin/users', icon: <FaUsers /> },
    { name: 'Settings', href: '/admin/settings', icon: <FaCogs /> },
  ];

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');
    
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if not on login page
      if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    }
    
    setIsLoading(false);
  }, [pathname, router]);

  const handleLogout = () => {
    // Remove auth data
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    // Redirect to login
    router.push('/admin/login');
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // For login page, don't show the admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Sidebar Header - Logo */}
        <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
          <Link href="/admin/dashboard" className="flex items-center">
            <div className="relative h-8 w-24 mr-2">
              <Image 
                src="/logo.svg" 
                alt="AutoAni Logo" 
                width={96}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-white font-bold ml-2">Admin</span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white md:hidden"
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        {/* Sidebar Navigation */}
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
        
        {/* Logout Button */}
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-sm text-white bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`md:pl-64 flex flex-col flex-1 min-h-screen ${isSidebarOpen ? 'md:pl-64' : ''}`}>
        {/* Top Navbar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-900 md:hidden"
            >
              <FaBars size={20} />
            </button>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-1 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
                <FaBell size={18} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600 ring-2 ring-white"></span>
              </button>
              
              {/* User Menu */}
              <div className="flex items-center">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 text-white">
                  <FaUser size={14} />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">{user.name}</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
