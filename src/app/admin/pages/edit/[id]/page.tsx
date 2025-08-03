'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import PageEditor from '@/components/admin/pages/PageEditor';
import { FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock data for a page
const mockPageData = {
  id: 'p2',
  title: 'About Us',
  slug: '/about',
  content: `
    <h1>About AutoAni</h1>
    <p>AutoAni is a premium car dealership based in Tirana, Albania. We specialize in luxury and high-performance vehicles from the world's most prestigious manufacturers.</p>
    
    <h2>Our Story</h2>
    <p>Founded in 2010, AutoAni has quickly established itself as Albania's premier destination for automotive excellence. Our passion for exceptional vehicles and commitment to customer service sets us apart from other dealerships.</p>
    
    <h2>Our Mission</h2>
    <p>At AutoAni, our mission is to provide our clients with an unparalleled car buying experience. We aim to exceed expectations in every aspect of our business, from the quality of our vehicles to the professionalism of our staff.</p>
    
    <h3>Our Values</h3>
    <ul>
      <li>Quality - We only select the finest vehicles for our inventory</li>
      <li>Integrity - We believe in transparent and honest business practices</li>
      <li>Service - We go above and beyond to ensure customer satisfaction</li>
      <li>Innovation - We continuously improve our processes and offerings</li>
    </ul>
    
    <h2>Visit Us</h2>
    <p>We invite you to visit our showroom in Tirana to explore our collection of exceptional vehicles. Our knowledgeable staff is ready to assist you in finding the perfect car that matches your preferences and requirements.</p>
  `,
  description: 'Learn about AutoAni, Albania\'s premier luxury car dealership offering the finest vehicles from prestigious manufacturers.',
  keywords: 'AutoAni, luxury cars, Albania, car dealership, premium vehicles, high-end automobiles',
  lastModified: '2023-10-10',
  author: 'Admin',
  status: 'published'
};

export default function EditPagePage() {
  const { id } = useParams();
  const router = useRouter();
  const [page, setPage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPage = async () => {
      setIsFetching(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, you would fetch the page by ID
        // const response = await fetch(`/api/pages/${id}`);
        // const data = await response.json();
        
        // For now, we'll use mock data
        setPage({
          ...mockPageData,
          id: id as string
        });
      } catch (err: any) {
        setError(err.message || 'Failed to load page data');
      } finally {
        setIsFetching(false);
      }
    };
    
    if (id) {
      fetchPage();
    }
  }, [id]);
  
  const handleSave = async (content: string, metaData: any) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In a real app, you would make an API call to update the page
      console.log('Updating page with ID:', id);
      console.log('New content:', content);
      console.log('Updated metadata:', metaData);
      
      // Redirect to pages list after successful update
      router.push('/admin/pages');
    } catch (error) {
      console.error('Error updating page:', error);
      alert('Failed to update page. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isFetching) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }
  
  if (error || !page) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Error: {error || 'Page not found'}</p>
              <p className="mt-2">
                <Link 
                  href="/admin/pages"
                  className="text-red-700 hover:text-red-600 font-medium"
                >
                  Go back to pages
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }
  
  const initialMetaData = {
    title: page.title || '',
    description: page.description || '',
    keywords: page.keywords || '',
    slug: page.slug || ''
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <Link 
              href="/admin/pages"
              className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-2"
            >
              <FaChevronLeft className="mr-1" /> Back to Pages
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Edit Page</h1>
            <p className="mt-1 text-sm text-gray-500">
              Modify page content and SEO information for: {page.title}
            </p>
          </div>
        </motion.div>
        
        {/* Page Editor */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PageEditor 
            initialContent={page.content} 
            onSave={handleSave}
            isLoading={isLoading}
          />
        </motion.div>
      </div>
    </AdminLayout>
  );
}
