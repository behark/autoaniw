'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import PageEditor from '@/components/admin/pages/PageEditor';
import { FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function NewPagePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSave = async (content: string, metaData: any) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In a real app, you would make an API call to create the page
      console.log('Creating new page with content:', content);
      console.log('Page metadata:', metaData);
      
      // Redirect to pages list after successful creation
      router.push('/admin/pages');
    } catch (error) {
      console.error('Error creating page:', error);
      alert('Failed to create page. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Create New Page</h1>
            <p className="mt-1 text-sm text-gray-500">
              Add a new page to your website with content and SEO information
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
            initialContent="<p>Start typing your content here...</p>" 
            onSave={handleSave}
            isLoading={isLoading}
          />
        </motion.div>
      </div>
    </AdminLayout>
  );
}
