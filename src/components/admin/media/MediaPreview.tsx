'use client';

import React from 'react';
import { FaFile, FaDownload, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Button } from '../../ui/design-system/Button';
import { formatFileSize, formatDate } from '../../../utils/formatters';
import { MediaItem } from '../../../types/media';

interface MediaPreviewProps {
  item: MediaItem;
  onEdit?: (item: MediaItem) => void;
  onDelete?: (item: MediaItem) => void;
}

export default function MediaPreview({ item, onEdit, onDelete }: MediaPreviewProps) {
  // Determine content based on media type
  const renderMediaContent = () => {
    switch (item.type) {
      case 'image':
        return (
          <div className="flex justify-center bg-bg-subtle rounded-lg overflow-hidden">
            <img 
              src={item.url} 
              alt={item.name}
              className="max-h-[60vh] object-contain"
            />
          </div>
        );
      case 'video':
        return (
          <div className="bg-bg-subtle rounded-lg overflow-hidden">
            <video 
              src={item.url} 
              controls
              className="w-full max-h-[60vh]"
            />
          </div>
        );
      case 'document':
        return (
          <div className="bg-bg-subtle rounded-lg p-12 text-center">
            <FaFile className="mx-auto h-24 w-24 text-text-muted" />
            <p className="mt-4 text-lg font-medium">{item.name}</p>
            <Button 
              variant="outline" 
              size="sm"
              className="mt-4"
              onClick={() => window.open(item.url, '_blank')}
            >
              <FaDownload className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        );
      default:
        return (
          <div className="bg-bg-subtle rounded-lg p-12 text-center">
            <FaFile className="mx-auto h-24 w-24 text-text-muted" />
            <p className="mt-4">Unknown file type</p>
          </div>
        );
    }
  };

  return (
    <div>
      {/* Media content */}
      {renderMediaContent()}
      
      {/* Media info and actions */}
      <div className="mt-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">{item.name}</h3>
            <p className="text-sm text-text-muted mt-1">
              {formatFileSize(item.size)} • Uploaded on {formatDate(item.createdAt)}
            </p>
            
            {/* Additional metadata based on type */}
            {item.type === 'image' && item.dimensions && (
              <p className="text-sm text-text-muted mt-1">
                Dimensions: {item.dimensions.width} × {item.dimensions.height} px
              </p>
            )}
            
            {item.type === 'video' && item.duration && (
              <p className="text-sm text-text-muted mt-1">
                Duration: {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
              </p>
            )}
            
            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-block bg-bg-subtle text-text-secondary text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex space-x-2">
            {onEdit && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onEdit(item)}
              >
                <FaPencilAlt className="h-3 w-3 mr-1" />
                Edit
              </Button>
            )}
            
            {onDelete && (
              <Button 
                variant="danger" 
                size="sm"
                onClick={() => onDelete(item)}
              >
                <FaTrash className="h-3 w-3 mr-1" />
                Delete
              </Button>
            )}
          </div>
        </div>
        
        {/* URL for copying */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">File URL</label>
          <div className="flex">
            <input
              type="text"
              readOnly
              value={item.url}
              className="form-input flex-grow rounded-r-none"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(item.url);
                // Here you would typically show a toast notification
              }}
              className="px-3 bg-bg-subtle border border-l-0 border-border-default rounded-r-md hover:bg-bg-muted"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
