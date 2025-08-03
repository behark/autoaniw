'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  CarFront, 
  FileText, 
  Image, 
  Settings, 
  Users, 
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  User
} from 'react-icons/hi';
import { useAuth } from '../../../hooks/api'; // Assuming we have this hook
import { Button } from '../../ui/design-system/Button';
import { Toaster } from '../../ui/design-system/Toast';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  hasSubItems?: boolean;
  subItems?: Array<{ href: string; label: string }>;
}

const NavItem: React.FC<NavItemProps> = ({ 
  href, 
  icon, 
  label, 
  isActive,
  isCollapsed,
  hasSubItems = false,
  subItems = []
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Check if any sub-item is active
  const isSubItemActive = subItems.some(item => pathname === item.href);
  
  // Expand if any sub-item is active
  useEffect(() => {
    if (isSubItemActive && !isOpen) {
      setIsOpen(true);
    }
  }, [isSubItemActive, isOpen]);
  
  if (hasSubItems) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-md
            transition-colors duration-200 ease-in-out
            ${isCollapsed ? 'justify-center' : 'justify-between'}
            ${isSubItemActive 
              ? 'bg-primary-50 text-primary-700' 
              : 'hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900'}
          `}
        >
          <div className="flex items-center">
            <span className="mr-3 text-xl">{icon}</span>
            {!isCollapsed && <span>{label}</span>}
          </div>
          {!isCollapsed && (
            <ChevronDown 
              className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            />
          )}
        </button>
        
        <AnimatePresence initial={false}>
          {isOpen && !isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-7 mt-1 space-y-1"
            >
              {subItems.map((subItem, idx) => {
                const isSubActive = pathname === subItem.href;
                return (
                  <Link
                    key={idx}
                    href={subItem.href}
                    className={`
                      block px-3 py-2 text-sm rounded-md 
                      ${isSubActive 
                        ? 'bg-primary-50 text-primary-700 font-medium' 
                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'}
                    `}
                  >
                    {subItem.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  
  return (
    <Link
      href={href}
      className={`
        flex items-center ${isCollapsed ? 'justify-center px-3' : 'px-3'} py-2.5 text-sm font-medium rounded-md
        transition-colors duration-200 ease-in-out
        ${isActive 
          ? 'bg-primary-50 text-primary-700' 
          : 'hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900'}
      `}
    >
      <span className={`text-xl ${!isCollapsed ? 'mr-3' : ''}`}>{icon}</span>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  
  // Toggle sidebar collapse on desktop
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  // Close mobile menu if route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  
  // Close mobile menu on window resize (if screen becomes larger)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const navItems = [
    {
      href: '/admin',
      icon: <Home />,
      label: 'Dashboard',
      isActive: pathname === '/admin'
    },
    {
      href: '/admin/vehicles',
      icon: <CarFront />,
      label: 'Vehicles',
      isActive: pathname.startsWith('/admin/vehicles'),
      hasSubItems: true,
      subItems: [
        { href: '/admin/vehicles', label: 'All Vehicles' },
        { href: '/admin/vehicles/new', label: 'Add Vehicle' },
        { href: '/admin/vehicles/categories', label: 'Categories' }
      ]
    },
    {
      href: '/admin/pages',
      icon: <FileText />,
      label: 'Pages',
      isActive: pathname.startsWith('/admin/pages')
    },
    {
      href: '/admin/media',
      icon: <Image />,
      label: 'Media',
      isActive: pathname.startsWith('/admin/media')
    },
    {
      href: '/admin/users',
      icon: <Users />,
      label: 'Users',
      isActive: pathname.startsWith('/admin/users')
    },
    {
      href: '/admin/settings',
      icon: <Settings />,
      label: 'Settings',
      isActive: pathname.startsWith('/admin/settings')
    }
  ];
  
  return (
    <div className="h-full min-h-screen bg-neutral-50">
      {/* Toaster for notifications */}
      <Toaster />
      
      {/* Mobile navigation overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar navigation */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full bg-white border-r border-neutral-200 transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-64'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo and collapse toggle */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200">
          {!isCollapsed && (
            <Link href="/admin" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary-600">AutoAni</span>
              <span className="text-sm font-medium text-neutral-500">Admin</span>
            </Link>
          )}
          {isCollapsed && (
            <Link href="/admin" className="flex items-center mx-auto">
              <span className="text-xl font-bold text-primary-600">A</span>
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className="text-neutral-500 hover:text-neutral-700 lg:block hidden"
          >
            {isCollapsed ? (
              <ChevronDown className="w-5 h-5 transform -rotate-90" />
            ) : (
              <ChevronDown className="w-5 h-5 transform rotate-90" />
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-neutral-500 hover:text-neutral-700 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Navigation items */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={item.isActive}
              isCollapsed={isCollapsed}
              hasSubItems={item.hasSubItems}
              subItems={item.subItems}
            />
          ))}
        </nav>
        
        {/* User profile and logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200">
          {isCollapsed ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="w-full justify-center"
            >
              <LogOut className="h-5 w-5 text-neutral-500" />
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 bg-neutral-200 rounded-full h-8 w-8 flex items-center justify-center">
                  <User className="h-4 w-4 text-neutral-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-neutral-500 truncate">
                    {user?.email || 'admin@autoani.com'}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                leftIcon={<LogOut className="h-4 w-4" />}
                className="w-full justify-start text-neutral-700"
              >
                Log out
              </Button>
            </div>
          )}
        </div>
      </aside>
      
      {/* Main content */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
        `}
      >
        {/* Top header */}
        <header className="sticky top-0 z-20 h-16 bg-white border-b border-neutral-200 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden mr-4 text-neutral-500 hover:text-neutral-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-medium text-neutral-900">
              {navItems.find(item => item.isActive)?.label || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative text-neutral-500 hover:text-neutral-700">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-accent-red transform translate-x-1/2 -translate-y-1/2"></span>
            </button>
            <div className="h-6 w-px bg-neutral-200 hidden sm:block" />
            <Link 
              href="/"
              className="text-sm text-neutral-600 hover:text-primary-600 hidden sm:block"
            >
              View Website
            </Link>
          </div>
        </header>
        
        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="py-4 px-6 border-t border-neutral-200">
          <div className="text-center text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} AutoAni Admin Dashboard. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
