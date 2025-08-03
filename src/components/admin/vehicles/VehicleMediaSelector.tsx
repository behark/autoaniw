'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/design-system/Button';
import { Modal } from '@/components/ui/design-system/Modal';
import { MediaManagerIntegration } from '@/components/admin/media/MediaManagerIntegration';
import { MediaItem } from '@/types/media';
import { FaImage, FaPlus, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface VehicleMediaSelectorProps {
  initialImages?: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

export default function VehicleMediaSelector({
  initialImages = [],
  onChange,
  maxImages = 10
}: VehicleMediaSelectorProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>(initialImages);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  
  // Update parent component when selection changes
  useEffect(() => {
    onChange(selectedImages);
  }, [selectedImages, onChange]);
  
  // Handle media selection from the media manager
  const handleMediaSelect = (media: MediaItem | MediaItem[]) => {
    const mediaItems = Array.isArray(media) ? media : [media];
    
    // Extract URLs and add to selected images
    const newUrls = mediaItems
      .filter(item => item.type === 'image')
      .map(item => item.url);
    
    // Respect the maximum number of images
    const updatedImages = [...selectedImages, ...newUrls].slice(0, maxImages);
    
    setSelectedImages(updatedImages);
    setIsMediaModalOpen(false);
  };
  
  // Remove an image from selection
  const removeImage = (urlToRemove: string) => {
    setSelectedImages(selectedImages.filter(url => url !== urlToRemove));
  };
  
  // Reorder images by drag and drop (placeholder for future enhancement)
  const reorderImages = (startIndex: number, endIndex: number) => {
    const result = Array.from(selectedImages);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setSelectedImages(result);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-text-primary">Vehicle Images</h3>
        <div className="text-sm text-text-secondary">
          {selectedImages.length} / {maxImages} images
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* Selected Images */}
        {selectedImages.map((url, index) => (
          <div 
            key={`${url}-${index}`} 
            className="relative aspect-square border border-border-default rounded-md overflow-hidden group"
          >
            <img 
              src={url} 
              alt={`Vehicle image ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            
            {/* Overlay with actions */}
            <div className="absolute inset-0 bg-bg-paper bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                onClick={() => removeImage(url)}
                className="p-2 bg-bg-paper rounded-full text-danger-600 hover:bg-danger-100"
                title="Remove image"
              >
                <FaTimes />
              </button>
            </div>
            
            {/* Primary image badge */}
            {index === 0 && (
              <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                Primary
              </div>
            )}
          </div>
        ))}
        
        {/* Add image button - only show if under max limit */}
        {selectedImages.length < maxImages && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsMediaModalOpen(true)}
            className="aspect-square border-2 border-dashed border-border-default rounded-md flex flex-col items-center justify-center text-text-muted hover:text-primary-600 hover:border-primary-400 transition-colors"
          >
            <FaPlus size={24} />
            <span className="mt-2 text-sm font-medium">Add Image</span>
          </motion.button>
        )}
      </div>
      
      {/* Media selection tips */}
      <div className="text-sm text-text-secondary">
        <p><span className="font-medium">Tip:</span> The first image will be used as the primary image in listings</p>
      </div>
      
      {/* Media Manager Modal */}
      <Modal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        title="Select Vehicle Images"
        size="xl"
      >
        <div className="py-2">
          <MediaManagerIntegration
            mode="selector"
            multiple={true}
            onSelect={handleMediaSelect}
            allowedTypes={['image']}
            onClose={() => setIsMediaModalOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
}
