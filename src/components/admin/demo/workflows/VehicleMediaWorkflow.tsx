'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@/utils/animations';
import { MediaItem } from '@/types/media';
import { EnhancedMediaManager } from '@/components/admin/media/EnhancedMediaManager';
import MediaEditor from '@/components/admin/media/MediaEditor';
import { VehicleShowcase } from '@/components/vehicles/VehicleShowcase';
import { FaStar, FaCarSide, FaImage, FaVideo, FaInfoCircle } from 'react-icons/fa';

// Demo vehicle data
const vehicleData = {
  name: 'Mercedes-Benz S-Class 2023',
  year: 2023,
  make: 'Mercedes-Benz',
  model: 'S-Class',
  price: 129000,
  description: 'Luxury sedan with advanced technology and refined interior'
};

// Demo media items
const demoMediaItems: MediaItem[] = [
  {
    id: 'media-1',
    name: 'Mercedes Front',
    url: 'https://images.unsplash.com/photo-1617469767053-d3b16ee6a4ff?q=80&w=1080',
    type: 'image',
    size: 2500000,
    mimeType: 'image/jpeg',
    width: 1920,
    height: 1080,
    alt: 'Front view of Mercedes-Benz S-Class',
    createdAt: new Date('2023-07-15'),
    tags: ['front', 'exterior'],
    isFeatured: true
  },
  {
    id: 'media-2',
    name: 'Mercedes Interior',
    url: 'https://images.unsplash.com/photo-1604705528621-83f1f9a36b36?q=80&w=1080',
    type: 'image',
    size: 1800000,
    mimeType: 'image/jpeg',
    width: 1920,
    height: 1080,
    alt: 'Interior dashboard view of Mercedes-Benz S-Class',
    createdAt: new Date('2023-07-15'),
    tags: ['interior', 'dashboard']
  },
  {
    id: 'media-3',
    name: 'Mercedes Side Profile',
    url: 'https://images.unsplash.com/photo-1563720223177-cc503cac5f5d?q=80&w=1080',
    type: 'image',
    size: 2200000,
    mimeType: 'image/jpeg',
    width: 1920,
    height: 1080,
    alt: 'Side profile of Mercedes-Benz S-Class',
    createdAt: new Date('2023-07-16'),
    tags: ['side', 'exterior']
  },
  {
    id: 'media-4',
    name: 'Mercedes Test Drive',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    type: 'video',
    size: 15000000,
    mimeType: 'video/mp4',
    width: 1920,
    height: 1080,
    duration: 60,
    thumbnailUrl: 'https://images.unsplash.com/photo-1667048586270-52aaf211a153?q=80&w=1080',
    alt: 'Test drive video of Mercedes-Benz S-Class',
    createdAt: new Date('2023-07-17'),
    tags: ['video', 'test-drive']
  }
];

interface VehicleMediaWorkflowProps {
  currentStep: number;
  totalSteps: number;
}

export default function VehicleMediaWorkflow({ currentStep, totalSteps }: VehicleMediaWorkflowProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>([]);
  const [availableMedia, setAvailableMedia] = useState<MediaItem[]>(demoMediaItems);
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  
  // Helper to reset the state based on the current step
  useEffect(() => {
    switch (currentStep) {
      case 0: // Select and upload
        setSelectedMedia([]);
        setAvailableMedia(demoMediaItems);
        break;
      case 1: // Crop images
        if (selectedMedia.length === 0) {
          setSelectedMedia([demoMediaItems[0], demoMediaItems[1]]);
        }
        break;
      case 2: // Trim video
        if (!selectedMedia.some(media => media.type === 'video')) {
          const video = demoMediaItems.find(m => m.type === 'video');
          if (video) {
            setSelectedMedia(prev => [...prev, video]);
          }
        }
        break;
      case 3: // Organize gallery
        if (selectedMedia.length < 3) {
          setSelectedMedia(demoMediaItems);
        }
        break;
      case 5: // Preview
        if (selectedMedia.length === 0) {
          setSelectedMedia(demoMediaItems);
        }
        break;
      default:
        break;
    }
  }, [currentStep]);

  // Handle media selection
  const handleMediaSelect = (media: MediaItem) => {
    if (selectedMedia.some(m => m.id === media.id)) {
      setSelectedMedia(selectedMedia.filter(m => m.id !== media.id));
    } else {
      setSelectedMedia([...selectedMedia, media]);
    }
  };

  // Handle opening the media editor
  const handleEditMedia = (media: MediaItem) => {
    setEditingMedia(media);
    setIsEditorOpen(true);
  };

  // Handle saving edited media
  const handleSaveEditedMedia = (updatedMedia: MediaItem) => {
    setAvailableMedia(prev => 
      prev.map(m => m.id === updatedMedia.id ? updatedMedia : m)
    );
    setSelectedMedia(prev => 
      prev.map(m => m.id === updatedMedia.id ? updatedMedia : m)
    );
    setIsEditorOpen(false);
    setEditingMedia(null);
  };

  // Render content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">Select Media Files</h3>
            <p className="mb-6 text-text-secondary">
              Choose images and videos to showcase this vehicle. High-quality media helps vehicles sell faster.
            </p>
            
            <EnhancedMediaManager
              mediaItems={availableMedia}
              selectedItems={selectedMedia}
              onSelect={handleMediaSelect}
              onEdit={handleEditMedia}
              height="450px"
              selectionMode="multi"
            />
            
            <div className="mt-4 p-3 bg-bg-subtle rounded-lg flex items-center text-sm">
              <FaInfoCircle className="text-info-500 mr-2" />
              <span>Select multiple files by clicking on them. Selected files will have a blue border.</span>
            </div>
          </div>
        );
        
      case 1:
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">Crop Images for Perfect Presentation</h3>
            <p className="mb-6 text-text-secondary">
              Fine-tune your images with our cropping tools to ensure they look their best.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {selectedMedia
                .filter(media => media.type === 'image')
                .slice(0, 2)
                .map(media => (
                  <div key={media.id} className="border border-border-default rounded-lg overflow-hidden">
                    <div className="aspect-video bg-bg-subtle relative">
                      <img 
                        src={media.url} 
                        alt={media.alt || media.name} 
                        className="w-full h-full object-cover"
                      />
                      <button
                        className="absolute bottom-3 right-3 bg-primary-500 text-white px-3 py-1 rounded-md text-sm hover:bg-primary-600 transition-colors"
                        onClick={() => handleEditMedia(media)}
                      >
                        Edit Image
                      </button>
                    </div>
                    <div className="p-3 bg-white">
                      <h4 className="font-medium">{media.name}</h4>
                      <p className="text-sm text-text-secondary">{media.alt}</p>
                    </div>
                  </div>
                ))}
            </div>
            
            <div className="mt-4 p-3 bg-bg-subtle rounded-lg flex items-center text-sm">
              <FaInfoCircle className="text-info-500 mr-2" />
              <span>Click "Edit Image" to open the cropping tool. In a real scenario, the MediaEditor would open.</span>
            </div>
          </div>
        );
        
      case 2:
        const videoMedia = selectedMedia.find(media => media.type === 'video');
        
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">Edit Video Content</h3>
            <p className="mb-6 text-text-secondary">
              Trim videos and select the perfect thumbnail to showcase vehicle features.
            </p>
            
            {videoMedia ? (
              <div className="border border-border-default rounded-lg overflow-hidden">
                <div className="aspect-video bg-bg-subtle relative">
                  <video
                    src={videoMedia.url}
                    poster={videoMedia.thumbnailUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute bottom-3 right-3 bg-primary-500 text-white px-3 py-1 rounded-md text-sm hover:bg-primary-600 transition-colors"
                    onClick={() => handleEditMedia(videoMedia)}
                  >
                    Edit Video
                  </button>
                </div>
                <div className="p-3 bg-white">
                  <h4 className="font-medium">{videoMedia.name}</h4>
                  <p className="text-sm text-text-secondary">{videoMedia.alt}</p>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-bg-subtle rounded-lg">
                <FaVideo className="mx-auto h-12 w-12 text-text-muted mb-2" />
                <p>No video content selected</p>
              </div>
            )}
            
            <div className="mt-4 p-3 bg-bg-subtle rounded-lg flex items-center text-sm">
              <FaInfoCircle className="text-info-500 mr-2" />
              <span>Click "Edit Video" to trim the video and capture a custom thumbnail.</span>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">Organize Gallery Order</h3>
            <p className="mb-6 text-text-secondary">
              Drag and drop media to arrange the perfect presentation order.
            </p>
            
            <div className="grid grid-cols-4 gap-3">
              {selectedMedia.map((media, index) => (
                <div 
                  key={media.id} 
                  className="border border-border-default rounded-lg overflow-hidden cursor-move hover:border-primary-300 transition-colors"
                >
                  <div className="aspect-square bg-bg-subtle relative">
                    {media.type === 'image' ? (
                      <img 
                        src={media.url} 
                        alt={media.alt || media.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <img 
                          src={media.thumbnailUrl || ''} 
                          alt={media.alt || media.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <FaVideo className="text-white" />
                        </div>
                      </div>
                    )}
                    {index === 0 && (
                      <div className="absolute top-2 left-2 bg-primary-500 text-white p-1 rounded-md text-xs">
                        <FaStar className="h-3 w-3" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-bg-subtle text-text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-bg-subtle rounded-lg flex items-center text-sm">
              <FaInfoCircle className="text-info-500 mr-2" />
              <span>Drag items to rearrange them. The first image (with star) will be the featured image.</span>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">Add SEO Metadata</h3>
            <p className="mb-6 text-text-secondary">
              Improve discoverability with proper titles, alt text, and tags.
            </p>
            
            <div className="border border-border-default rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Media Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-border-default rounded"
                    value="Mercedes-Benz S-Class Front View"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-border-default rounded"
                    value="Front angle view of 2023 Mercedes-Benz S-Class luxury sedan in silver"
                    readOnly
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border border-border-default rounded"
                  rows={3}
                  value="Official Mercedes-Benz promotional image showing the front design of the 2023 S-Class with LED headlights and chrome accents."
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {['mercedes', 'sclass', '2023', 'luxury', 'sedan', 'silver', 'front'].map(tag => (
                    <span key={tag} className="bg-bg-subtle px-2 py-1 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-bg-subtle rounded-lg flex items-center text-sm">
              <FaInfoCircle className="text-info-500 mr-2" />
              <span>Proper metadata helps with SEO and accessibility. Always include descriptive alt text.</span>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">Preview Vehicle Showcase</h3>
            <p className="mb-6 text-text-secondary">
              See how your media will appear to potential customers.
            </p>
            
            <div className="border border-border-default rounded-lg p-4 bg-white">
              <h2 className="text-2xl font-bold mb-2">{vehicleData.name}</h2>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xl font-medium text-primary-600">${vehicleData.price.toLocaleString()}</span>
                <span className="text-sm bg-bg-subtle px-2 py-1 rounded">{vehicleData.year}</span>
                <span className="text-sm bg-bg-subtle px-2 py-1 rounded">{vehicleData.make}</span>
                <span className="text-sm bg-bg-subtle px-2 py-1 rounded">{vehicleData.model}</span>
              </div>
              
              <VehicleShowcase
                vehicleName={vehicleData.name}
                media={selectedMedia.map(media => ({
                  id: media.id,
                  url: media.url,
                  type: media.type as 'image' | 'video',
                  thumbnailUrl: media.thumbnailUrl,
                  title: media.name,
                  description: media.alt
                }))}
              />
            </div>
            
            <div className="mt-4 p-3 bg-success-50 border border-success-200 rounded-lg flex items-center text-sm text-success-700">
              <FaCheck className="mr-2" />
              <span>Great job! The vehicle showcase looks professional and ready to attract customers.</span>
            </div>
          </div>
        );
        
      default:
        return <div>Step content not found</div>;
    }
  };

  return (
    <motion.div 
      variants={fadeAnimation}
      initial="hidden"
      animate="visible"
      className="min-h-[500px] flex flex-col"
    >
      {renderStepContent()}
      
      {/* Media editor modal */}
      {isEditorOpen && editingMedia && (
        <MediaEditor
          item={editingMedia}
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleSaveEditedMedia}
        />
      )}
    </motion.div>
  );
}
