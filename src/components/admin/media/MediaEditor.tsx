'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/design-system/Modal';
import { Button } from '@/components/ui/design-system/Button';
import { Toast } from '@/components/ui/design-system/Toast';
import ImageCropper from './ImageCropper';
import VideoEditor from './VideoEditor';
import { MediaItem } from '@/types/media';
import { FaCheck, FaPencilAlt, FaCrop, FaAdjust, FaUndo, FaVideo } from 'react-icons/fa';
import { useTheme } from '@/providers/ThemeProvider';

interface MediaEditorProps {
  item: MediaItem;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedItem: MediaItem) => void;
}

type EditorMode = 'crop' | 'metadata' | 'video';

export default function MediaEditor({ item, isOpen, onClose, onSave }: MediaEditorProps) {
  const { theme } = useTheme();
  const [mode, setMode] = useState<EditorMode>('crop');
  const [editedItem, setEditedItem] = useState<MediaItem>(item);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    visible: boolean;
  }>({
    message: '',
    type: 'info',
    visible: false,
  });

  // Handle cropped image save
  const handleCropSave = async (blob: Blob, filename: string) => {
    setIsProcessing(true);
    
    try {
      // In a real app, this would upload to the server
      // For now, we'll simulate a successful upload
      const newUrl = URL.createObjectURL(blob);
      
      // Update the media item with the new URL
      setEditedItem(prev => ({
        ...prev,
        url: newUrl,
        thumbnailUrl: newUrl,
        // In a real implementation, we would get these from the server
        size: blob.size,
        updatedAt: new Date(),
      }));
      
      // Show success toast
      setToast({
        message: 'Image successfully cropped',
        type: 'success',
        visible: true,
      });
      
      // In a real app, you'd wait for the upload to complete
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error('Error saving cropped image:', error);
      setToast({
        message: 'Failed to save cropped image',
        type: 'error',
        visible: true,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle metadata update
  const handleMetadataUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setEditedItem(prev => ({
      ...prev,
      name: formData.get('name') as string || prev.name,
      alt: formData.get('alt') as string || '',
      description: formData.get('description') as string || '',
      tags: formData.get('tags') ? 
        (formData.get('tags') as string).split(',').map(tag => tag.trim()) : 
        prev.tags,
    }));
    
    setToast({
      message: 'Metadata successfully updated',
      type: 'success',
      visible: true,
    });
  };

  // Finalize edits and save
  const handleSaveAll = () => {
    onSave(editedItem);
    onClose();
  };

  // Render editor content based on mode
  const renderEditorContent = () => {
    switch (mode) {
      case 'crop':
        return (
          <div>
            {item.type === 'image' ? (
              <ImageCropper
                src={item.url}
                onSave={handleCropSave}
                onCancel={() => {}}
                fileName={item.name}
              />
            ) : (
              <div className="p-8 text-center text-text-muted">
                <FaAdjust className="mx-auto h-12 w-12 mb-3" />
                <h3 className="text-lg font-medium mb-2">Cropping Not Available</h3>
                <p>This media type doesn't support cropping.</p>
              </div>
            )}
          </div>
        );
        
      case 'video':
        return (
          <div>
            {item.type === 'video' ? (
              <VideoEditor
                videoSrc={item.url}
                onSave={(videoBlob, thumbnailBlob, start, end) => {
                  // Handle video edit save
                  const newVideoUrl = URL.createObjectURL(videoBlob);
                  const newThumbnailUrl = thumbnailBlob ? URL.createObjectURL(thumbnailBlob) : item.thumbnailUrl;
                  
                  setEditedItem(prev => ({
                    ...prev,
                    url: newVideoUrl,
                    thumbnailUrl: newThumbnailUrl,
                    duration: end - start,
                    metadata: {
                      ...prev.metadata,
                      trimStart: start,
                      trimEnd: end
                    }
                  }));
                  
                  setToast({
                    message: 'Video successfully edited',
                    type: 'success',
                    visible: true,
                  });
                }}
                onCancel={() => {}}
              />
            ) : (
              <div className="p-8 text-center text-text-muted">
                <h3 className="text-lg font-medium mb-2">Video Editing Not Available</h3>
                <p>This media type doesn't support video editing.</p>
              </div>
            )}
          </div>
        );
      
      case 'metadata':
        return (
          <form onSubmit={handleMetadataUpdate} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
                File Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={editedItem.name}
                className="w-full px-3 py-2 border border-border-default rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-bg-paper"
              />
            </div>
            
            <div>
              <label htmlFor="alt" className="block text-sm font-medium text-text-secondary mb-1">
                Alt Text
              </label>
              <input
                type="text"
                id="alt"
                name="alt"
                defaultValue={editedItem.alt || ''}
                className="w-full px-3 py-2 border border-border-default rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-bg-paper"
                placeholder="Describe the image for accessibility"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={editedItem.description || ''}
                rows={3}
                className="w-full px-3 py-2 border border-border-default rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-bg-paper"
                placeholder="Add a description for this media"
              />
            </div>
            
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-text-secondary mb-1">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                defaultValue={editedItem.tags?.join(', ') || ''}
                className="w-full px-3 py-2 border border-border-default rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-bg-paper"
                placeholder="Comma-separated tags"
              />
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="flex items-center gap-1.5 mt-2"
            >
              <FaCheck className="h-3 w-3" />
              Update Metadata
            </Button>
          </form>
        );
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`Edit ${item.name}`}
        size="lg"
      >
        <div className="flex flex-col">
          {/* Editor tabs */}
          <div className="flex border-b border-border-default mb-4">
            {item.type === 'image' && (
              <button
                className={`px-4 py-2 text-sm font-medium border-b-2 ${
                  mode === 'crop'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border-hover'
                }`}
                onClick={() => setMode('crop')}
              >
                <FaCrop className="inline-block mr-2 h-3.5 w-3.5" />
                Crop & Resize
              </button>
            )}
            
            {item.type === 'video' && (
              <button
                className={`px-4 py-2 text-sm font-medium border-b-2 ${
                  mode === 'video'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border-hover'
                }`}
                onClick={() => setMode('video')}
              >
                <FaVideo className="inline-block mr-2 h-3.5 w-3.5" />
                Trim & Thumbnail
              </button>
            )}
            
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                mode === 'metadata'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border-hover'
              }`}
              onClick={() => setMode('metadata')}
            >
              <FaPencilAlt className="inline-block mr-2 h-3.5 w-3.5" />
              Metadata
            </button>
          </div>

          {/* Editor content */}
          <div className="mb-6">
            {renderEditorContent()}
          </div>

          {/* Action buttons */}
          <div className="flex justify-between pt-4 border-t border-border-default mt-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveAll}
              disabled={isProcessing}
              className="flex items-center gap-1.5"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <FaCheck className="h-3 w-3" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Toast notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast(prev => ({ ...prev, visible: false }))}
      />
    </>
  );
}
