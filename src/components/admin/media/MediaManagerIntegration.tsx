'use client';

import React, { useState } from 'react';
import EnhancedMediaManager from './EnhancedMediaManager';
import { MediaItem } from '../../../types/media';
import { Toast } from '../../ui/design-system/Toast';
import { useTheme } from '../../../providers/ThemeProvider';
import { motion } from 'framer-motion';

interface MediaManagerIntegrationProps {
  onSelect?: (media: MediaItem | MediaItem[]) => void;
  multiple?: boolean;
  onClose?: () => void;
  mode?: 'standalone' | 'selector';
  allowedTypes?: ('image' | 'video' | 'document')[];
}

export default function MediaManagerIntegration({
  onSelect,
  multiple = false,
  onClose,
  mode = 'standalone',
  allowedTypes = ['image', 'video', 'document'],
}: MediaManagerIntegrationProps) {
  const { theme } = useTheme();
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    visible: boolean;
  }>({
    message: '',
    type: 'info',
    visible: false,
  });

  // Handle media selection
  const handleMediaSelect = (media: MediaItem | MediaItem[]) => {
    if (onSelect) {
      onSelect(media);
      
      // Show toast notification
      setToast({
        message: Array.isArray(media) 
          ? `${media.length} items selected` 
          : 'Media selected successfully',
        type: 'success',
        visible: true,
      });
      
      // Auto-close if in selector mode
      if (mode === 'selector' && onClose) {
        setTimeout(() => {
          onClose();
        }, 500);
      }
    }
  };

  // Handle toast close
  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  return (
    <div className="bg-bg-paper rounded-lg shadow-md">
      {/* Header - Only show in standalone mode */}
      {mode === 'standalone' && (
        <motion.div
          className="p-5 border-b border-border-default"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Media Library</h2>
              <p className="text-sm text-text-secondary mt-1">
                Manage your media files with advanced features
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {/* Additional toolbar buttons could go here */}
            </div>
          </div>
        </motion.div>
      )}

      {/* Enhanced Media Manager */}
      <div className="p-5">
        <EnhancedMediaManager
          onSelectMedia={handleMediaSelect}
          multiple={multiple}
          allowedTypes={allowedTypes}
          maxSize={10} // 10MB max size
        />
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={handleCloseToast}
      />
    </div>
  );
}
