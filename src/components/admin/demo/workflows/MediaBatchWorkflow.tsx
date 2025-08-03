'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@/utils/animations';
import { Button } from '@/components/ui/design-system/Button';
import { FaUpload, FaTag, FaInfoCircle, FaCropAlt, FaFolder, FaCheck } from 'react-icons/fa';

// Sample media items for the batch workflow
const batchMediaItems = [
  {
    id: 'batch-1',
    name: 'Ferrari F8 Front',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1080',
    size: 1_200_000,
    tags: []
  },
  {
    id: 'batch-2',
    name: 'Ferrari F8 Side',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1080',
    size: 950_000,
    tags: []
  },
  {
    id: 'batch-3',
    name: 'Ferrari F8 Rear',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1610036615665-ec9252872f0c?q=80&w=1080',
    size: 1_350_000,
    tags: []
  },
  {
    id: 'batch-4',
    name: 'Ferrari F8 Interior',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1605515298946-d0573c8791da?q=80&w=1080',
    size: 1_050_000,
    tags: []
  },
  {
    id: 'batch-5',
    name: 'Ferrari F8 Engine',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1080',
    size: 1_150_000,
    tags: []
  },
  {
    id: 'batch-6',
    name: 'Ferrari F8 Drive',
    type: 'video',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1080',
    size: 15_000_000,
    tags: []
  }
];

interface MediaBatchWorkflowProps {
  currentStep: number;
  totalSteps: number;
}

export default function MediaBatchWorkflow({ currentStep, totalSteps }: MediaBatchWorkflowProps) {
  const [selectedMedia, setSelectedMedia] = useState(batchMediaItems);
  const [tags, setTags] = useState(['ferrari', 'f8', 'italian', 'supercar', 'v8']);
  const [collections, setCollections] = useState(['Ferrari Collection', 'Supercars', 'New Inventory']);
  const [selectedCollection, setSelectedCollection] = useState('Ferrari Collection');
  const [processCompleted, setProcessCompleted] = useState(false);
  const [optimizeProgress, setOptimizeProgress] = useState(0);
  
  // Simulate progress for step 3 (optimization)
  React.useEffect(() => {
    if (currentStep === 3 && optimizeProgress < 100) {
      const timer = setTimeout(() => {
        setOptimizeProgress(prev => Math.min(prev + 20, 100));
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentStep, optimizeProgress]);

  // Render content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Bulk upload
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">Bulk Upload Media</h3>
            <p className="mb-6 text-text-secondary">
              Upload multiple files at once to efficiently build your media library.
            </p>
            
            <div className="border-2 border-dashed border-border-default rounded-lg p-8 text-center mb-6">
              <div className="w-16 h-16 bg-bg-subtle rounded-full mx-auto flex items-center justify-center mb-4">
                <FaUpload className="text-text-secondary text-xl" />
              </div>
              <h4 className="font-medium mb-2">Drag & Drop Files Here</h4>
              <p className="text-text-secondary mb-4">or</p>
              <Button variant="primary" className="mx-auto">
                Browse Files
              </Button>
            </div>
            
            <div className="grid grid-cols-6 gap-3">
              {batchMediaItems.map(media => (
                <div key={media.id} className="border border-border-default rounded-lg overflow-hidden">
                  <div className="aspect-square bg-bg-subtle relative">
                    {media.type === 'image' ? (
                      <img 
                        src={media.url} 
                        alt={media.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <img 
                          src={media.thumbnailUrl!}
                          alt={media.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-bg-subtle rounded-lg flex items-center text-sm">
              <FaInfoCircle className="text-info-500 mr-2" />
              <span>Upload up to 100 files at once. Supported formats: JPG, PNG, WEBP, MP4, MOV.</span>
            </div>
          </div>
        );
        
      case 1: // Apply batch tags and categories
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">Apply Batch Tags & Categories</h3>
            <p className="mb-6 text-text-secondary">
              Tag multiple files at once to improve organization and searchability.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-medium mb-3">Apply Tags to All Files</h4>
                <div className="p-4 border border-border-default rounded-lg">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map(tag => (
                      <span key={tag} className="bg-bg-subtle px-2 py-1 rounded text-sm flex items-center gap-1">
                        <FaTag className="h-3 w-3 opacity-60" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      className="flex-grow border border-border-default rounded-md px-3 py-2 text-sm"
                      placeholder="Add new tag..."
                    />
                    <Button variant="secondary" size="sm">
                      Add
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Assign to Collections</h4>
                <div className="p-4 border border-border-default rounded-lg">
                  <div className="space-y-2 mb-4">
                    {collections.map(collection => (
                      <div key={collection} className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id={`collection-${collection}`}
                          checked={collection === selectedCollection}
                          onChange={() => setSelectedCollection(collection)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`collection-${collection}`} className="text-sm">
                          <FaFolder className="inline-block mr-1 opacity-60" />
                          {collection}
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      className="flex-grow border border-border-default rounded-md px-3 py-2 text-sm"
                      placeholder="New collection..."
                    />
                    <Button variant="secondary" size="sm">
                      Create
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-bg-subtle rounded-lg flex items-center text-sm">
              <FaInfoCircle className="text-info-500 mr-2" />
              <span>Consistent tagging and organization improves search and filtering capabilities.</span>
            </div>
          </div>
        );
        
      case 2: // Auto-generate metadata
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">Auto-Generate Metadata</h3>
            <p className="mb-6 text-text-secondary">
              Let AI help you generate titles, descriptions, and alt text for multiple files at once.
            </p>
            
            <div className="border border-border-default rounded-lg overflow-hidden mb-6">
              <div className="bg-bg-subtle p-4 border-b border-border-default flex justify-between items-center">
                <h4 className="font-medium">AI-Generated Metadata Preview</h4>
                <Button variant="primary" size="sm">
                  Apply to All
                </Button>
              </div>
              
              <div className="divide-y divide-border-default">
                {batchMediaItems.slice(0, 3).map(media => (
                  <div key={media.id} className="p-4 flex gap-4">
                    <div className="w-20 h-20 bg-bg-subtle rounded overflow-hidden shrink-0">
                      <img 
                        src={media.type === 'image' ? media.url : media.thumbnailUrl} 
                        alt={media.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="mb-2">
                        <label className="text-xs text-text-secondary">Title:</label>
                        <input 
                          type="text" 
                          className="w-full border border-border-default rounded px-3 py-1.5 text-sm"
                          value={`Ferrari F8 Tributo - ${media.name.split(' ').pop()} View`}
                          readOnly
                        />
                      </div>
                      
                      <div className="mb-2">
                        <label className="text-xs text-text-secondary">Alt Text:</label>
                        <input 
                          type="text" 
                          className="w-full border border-border-default rounded px-3 py-1.5 text-sm"
                          value={`${media.name.split(' ').pop()} view of Ferrari F8 Tributo supercar in vibrant red`}
                          readOnly
                        />
                      </div>
                      
                      <div>
                        <label className="text-xs text-text-secondary">Description:</label>
                        <textarea
                          className="w-full border border-border-default rounded px-3 py-1.5 text-sm"
                          rows={2}
                          value={`Professional ${media.name.split(' ').pop().toLowerCase()} angle photograph of the Ferrari F8 Tributo, showcasing its aerodynamic design and distinctive Italian styling.`}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-bg-subtle p-4 text-sm text-text-secondary">
                Showing 3 of 6 items
              </div>
            </div>
            
            <div className="p-3 bg-bg-subtle rounded-lg flex items-center text-sm">
              <FaInfoCircle className="text-info-500 mr-2" />
              <span>AI-generated metadata enhances SEO and accessibility without manual effort.</span>
            </div>
          </div>
        );
        
      case 3: // Bulk resize for optimization
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">Optimize Media in Bulk</h3>
            <p className="mb-6 text-text-secondary">
              Automatically resize and optimize files for better performance and faster loading.
            </p>
            
            <div className="border border-border-default rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Optimization Settings</h4>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-text-secondary">
                    Estimated savings: <span className="font-medium">4.2 MB</span>
                  </span>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    disabled={optimizeProgress > 0}
                  >
                    {optimizeProgress > 0 ? 'Processing...' : 'Start Optimization'}
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Image Resize</label>
                  <select className="w-full border border-border-default rounded px-3 py-2">
                    <option value="1920">Maximum 1920px (Recommended)</option>
                    <option value="2560">Maximum 2560px (High Resolution)</option>
                    <option value="1280">Maximum 1280px (Standard)</option>
                    <option value="none">No Resize</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Image Quality</label>
                  <select className="w-full border border-border-default rounded px-3 py-2">
                    <option value="80">80% (Recommended)</option>
                    <option value="90">90% (High Quality)</option>
                    <option value="70">70% (More Compression)</option>
                    <option value="100">100% (Lossless)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Video Resize</label>
                  <select className="w-full border border-border-default rounded px-3 py-2">
                    <option value="1080">1080p (Recommended)</option>
                    <option value="720">720p (Standard)</option>
                    <option value="none">No Resize</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Format Conversion</label>
                  <select className="w-full border border-border-default rounded px-3 py-2">
                    <option value="webp">Convert to WebP (Recommended)</option>
                    <option value="original">Keep Original Format</option>
                  </select>
                </div>
              </div>
              
              {optimizeProgress > 0 && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Processing {optimizeProgress === 100 ? '6/6' : `${Math.round(optimizeProgress/100*6)}/6`} items</span>
                    <span>{optimizeProgress}%</span>
                  </div>
                  <div className="w-full bg-bg-subtle rounded-full h-2.5">
                    <div 
                      className="bg-primary-500 h-2.5 rounded-full transition-all duration-500" 
                      style={{ width: `${optimizeProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-3 bg-bg-subtle rounded-lg flex items-center text-sm">
              <FaInfoCircle className="text-info-500 mr-2" />
              <span>Optimized images load faster and consume less bandwidth while maintaining visual quality.</span>
            </div>
          </div>
        );
        
      case 4: // Organize into collections
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">Organize Collections</h3>
            <p className="mb-6 text-text-secondary">
              Group media into meaningful collections for easier management and usage.
            </p>
            
            <div className="border border-border-default rounded-lg overflow-hidden mb-6">
              <div className="bg-bg-subtle p-4 border-b border-border-default">
                <h4 className="font-medium">Ferrari Collection</h4>
                <p className="text-sm text-text-secondary">6 items</p>
              </div>
              
              <div className="p-4 grid grid-cols-6 gap-3">
                {batchMediaItems.map(media => (
                  <div key={media.id} className="border border-border-default rounded-lg overflow-hidden">
                    <div className="aspect-square bg-bg-subtle relative">
                      {media.type === 'image' ? (
                        <img 
                          src={media.url} 
                          alt={media.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="relative w-full h-full">
                          <img 
                            src={media.thumbnailUrl!}
                            alt={media.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-bg-subtle p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <label className="text-sm">Select All</label>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Move
                  </Button>
                  <Button variant="outline" size="sm">
                    Copy
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-bg-subtle rounded-lg flex items-center text-sm">
              <FaInfoCircle className="text-info-500 mr-2" />
              <span>Collections help organize media by vehicle, campaign, or purpose.</span>
            </div>
          </div>
        );
        
      case 5: // Review and publish
        return (
          <div>
            <h3 className="text-xl font-medium mb-4">Review & Publish</h3>
            <p className="mb-6 text-text-secondary">
              Verify all media settings before publishing to your library.
            </p>
            
            <div className="border border-success-200 bg-success-50 rounded-lg p-6 text-center mb-6">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="text-success-600 text-xl" />
              </div>
              <h4 className="text-xl font-medium text-success-700 mb-2">Batch Processing Complete!</h4>
              <p className="text-success-600 mb-4">
                All 6 items have been processed and are ready to publish to your media library.
              </p>
              <Button variant="success" className="mx-auto">
                Publish to Library
              </Button>
            </div>
            
            <div className="border border-border-default rounded-lg overflow-hidden">
              <div className="bg-bg-subtle p-4 border-b border-border-default">
                <h4 className="font-medium">Processing Summary</h4>
              </div>
              
              <div className="p-4">
                <ul className="space-y-3">
                  <li className="flex items-center text-sm">
                    <span className="w-4 h-4 mr-2 rounded-full bg-success-100 flex items-center justify-center">
                      <FaCheck className="text-success-600 text-xs" />
                    </span>
                    <span>6 files uploaded successfully (5 images, 1 video)</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="w-4 h-4 mr-2 rounded-full bg-success-100 flex items-center justify-center">
                      <FaCheck className="text-success-600 text-xs" />
                    </span>
                    <span>All files tagged with 5 tags</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="w-4 h-4 mr-2 rounded-full bg-success-100 flex items-center justify-center">
                      <FaCheck className="text-success-600 text-xs" />
                    </span>
                    <span>Metadata auto-generated for all files</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="w-4 h-4 mr-2 rounded-full bg-success-100 flex items-center justify-center">
                      <FaCheck className="text-success-600 text-xs" />
                    </span>
                    <span>All files optimized (4.2 MB saved)</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="w-4 h-4 mr-2 rounded-full bg-success-100 flex items-center justify-center">
                      <FaCheck className="text-success-600 text-xs" />
                    </span>
                    <span>All files added to "Ferrari Collection"</span>
                  </li>
                </ul>
              </div>
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
    </motion.div>
  );
}
