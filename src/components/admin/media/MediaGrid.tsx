'use client';

import React from 'react';
import { FaImage, FaVideo, FaFile, FaFolder, FaCheck, FaPlay, FaEye, FaDownload } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, gridItemVariants, mediaItemAnimation } from '../../../utils/animations';
import { formatFileSize } from '../../../utils/formatters';
import { MediaItem, ViewMode } from '../../../types/media';

interface MediaGridProps {
  media: MediaItem[];
  selectedMedia: MediaItem[];
  viewMode: ViewMode;
  onSelect: (item: MediaItem) => void;
  onPreview: (item: MediaItem) => void;
}

export default function MediaGrid({ 
  media, 
  selectedMedia, 
  viewMode, 
  onSelect, 
  onPreview 
}: MediaGridProps) {
  // Helper to determine if an item is selected
  const isSelected = (item: MediaItem) => {
    return selectedMedia.some(media => media.id === item.id);
  };

  // Get appropriate icon for media type
  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <FaImage />;
      case 'video':
        return <FaVideo />;
      default:
        return <FaFile />;
    }
  };

  if (media.length === 0) {
    return (
      <div className="text-center py-12 text-text-muted">
        <p className="text-lg">No media files found</p>
        <p className="text-sm mt-2">Upload files or change your filters</p>
      </div>
    );
  }

  return (
    <div className={`w-full`}>
      {viewMode === 'grid' && media.length > 0 && (
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {media.map(item => (
              // Grid view
              <motion.div 
                key={item.id}
                className={`
                  relative group rounded-md overflow-hidden border border-border-default
                  ${isSelected(item) ? 'ring-2 ring-primary-500' : 'hover:border-primary-400'}
                  cursor-pointer transition-all
                `}
                variants={gridItemVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Thumbnail */}
                <div className="aspect-square relative bg-bg-subtle">
                  {item.type === 'image' ? (
                    <img 
                      src={item.thumbnailUrl || item.url} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl text-text-muted">
                        {getMediaIcon(item.type)}
                      </span>
                    </div>
                  )}
                  
                  {/* Selection indicator */}
                  {isSelected(item) && (
                    <div className="absolute top-2 right-2 bg-primary-500 text-white p-1 rounded-full">
                      <FaCheck size={12} />
                    </div>
                  )}
                  
                  {/* Hover actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onPreview(item);
                      }}
                      className="bg-white text-text-primary rounded-full p-2 transform hover:scale-110 transition-transform"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
            className={`
              relative group rounded-md overflow-hidden border border-border-default
              ${isSelected(item) ? 'ring-2 ring-primary-500' : 'hover:border-primary-400'}
              cursor-pointer transition-all
            `}
            onClick={() => onSelect(item)}
          >
            {/* Thumbnail */}
            <div className="aspect-square relative bg-bg-subtle">
              {item.type === 'image' ? (
                <img 
                  src={item.thumbnailUrl || item.url} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-3xl text-text-muted">
                    {getMediaIcon(item.type)}
                  </span>
                </div>
              )}
              
              {/* Selection indicator */}
              {isSelected(item) && (
                <div className="absolute top-2 right-2 bg-primary-500 text-white p-1 rounded-full">
                  <FaCheck size={12} />
                </div>
              )}
              
              {/* Hover actions */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview(item);
                  }}
                  className="bg-white text-text-primary rounded-full p-2 transform hover:scale-110 transition-transform"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* File info */}
            <div className="p-2">
              <p className="text-sm font-medium truncate" title={item.name}>
                {item.name}
              </p>
              <p className="text-xs text-text-muted mt-1">
                {formatFileSize(item.size)}
              </p>
            </div>
          </div>
        ) : (
          // List view
          <div 
            key={item.id}
            className={`
              flex items-center py-3 px-2 rounded-md
              ${isSelected(item) ? 'bg-primary-50 dark:bg-primary-900/20' : 'hover:bg-bg-subtle'}
              cursor-pointer transition-colors
            `}
            onClick={() => onSelect(item)}
          >
            {/* Type icon or thumbnail */}
            <div className="w-10 h-10 flex-shrink-0 rounded-md overflow-hidden mr-3 bg-bg-subtle">
              {item.type === 'image' ? (
                <img 
                  src={item.thumbnailUrl || item.url} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted">
                  {getMediaIcon(item.type)}
                </div>
              )}
            </div>
            
            {/* File info */}
            <div className="flex-grow min-w-0">
              <p className="text-sm font-medium truncate" title={item.name}>
                {item.name}
              </p>
              <p className="text-xs text-text-muted">
                {formatFileSize(item.size)} • {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
            
            {/* Selection indicator */}
            {isSelected(item) && (
              <div className="ml-2 text-primary-500">
                <FaCheck size={16} />
              </div>
            )}
            
            {/* Preview action */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onPreview(item);
              }}
              className="ml-2 p-1 text-text-secondary hover:text-primary-600 rounded-full hover:bg-bg-subtle transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )
      ))}
    </div>
  );
}
