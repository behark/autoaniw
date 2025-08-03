'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import MediaManagerIntegration from '@/components/admin/media/MediaManagerIntegration';
import { motion } from 'framer-motion';
import { useTheme } from '@/providers/ThemeProvider';
import { FaCloudUploadAlt, FaLayerGroup, FaImage } from 'react-icons/fa';
import { Button } from '@/components/ui/design-system/Button';
import { useState } from 'react';

export default function AdminMediaPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'all' | 'images' | 'videos' | 'documents'>('all');
  const [showUploadTips, setShowUploadTips] = useState(true);
  
  // Filter media types based on active tab
  const getFilteredTypes = () => {
    switch (activeTab) {
      case 'images':
        return ['image'];
      case 'videos':
        return ['video'];
      case 'documents':
        return ['document'];
      default:
        return ['image', 'video', 'document'];
    }
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Media Library</h1>
            <p className="mt-1 text-sm text-text-secondary">
              Upload, organize, and manage your media assets
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Media type filters */}
            <div className="flex rounded-md overflow-hidden border border-border-default">
              <Button 
                variant={activeTab === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('all')}
                className={`rounded-none ${activeTab !== 'all' ? 'text-text-secondary hover:text-text-primary' : ''}`}
              >
                <FaLayerGroup className="mr-1 h-3.5 w-3.5" />
                All
              </Button>
              <Button 
                variant={activeTab === 'images' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('images')}
                className={`rounded-none ${activeTab !== 'images' ? 'text-text-secondary hover:text-text-primary' : ''}`}
              >
                <FaImage className="mr-1 h-3.5 w-3.5" />
                Images
              </Button>
            </div>
          </div>
        </motion.div>
        
        {/* Upload Tips Card - Collapsible */}
        {showUploadTips && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4 }}
            className="bg-bg-subtle border border-border-default rounded-lg p-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="mt-1 text-primary-600">
                  <FaCloudUploadAlt size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">Quick Upload Tips</h3>
                  <ul className="mt-2 text-sm text-text-secondary space-y-1">
                    <li>• Drag and drop files directly into the media area</li>
                    <li>• Images are automatically optimized for web</li>
                    <li>• Add tags to keep your media organized</li>
                    <li>• Use batch selection for multiple actions</li>
                  </ul>
                </div>
              </div>
              <button 
                onClick={() => setShowUploadTips(false)}
                className="text-text-muted hover:text-text-secondary"
              >
                <span className="sr-only">Dismiss</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
        
        {/* Enhanced Media Manager Component */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MediaManagerIntegration 
            mode="standalone"
            allowedTypes={getFilteredTypes() as any}
            multiple={true}
          />
        </motion.div>
      </div>
    </AdminLayout>
  );
}
