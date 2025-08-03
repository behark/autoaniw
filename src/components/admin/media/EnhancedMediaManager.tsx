'use client';

import React, { useState, useCallback } from 'react';
import { FaFolder, FaImage, FaVideo, FaFile, FaTrash, FaCloudDownloadAlt, FaPencilAlt } from 'react-icons/fa';
import { Button } from '../../ui/design-system/Button';
import { Card } from '../../ui/design-system/Card';
import { Modal } from '../../ui/design-system/Modal';
import { Toast } from '../../ui/design-system/Toast';
import { useDropzone } from 'react-dropzone';
import { useTheme } from '../../../providers/ThemeProvider';
import MediaGrid from './MediaGrid';
import MediaToolbar from './MediaToolbar';
import MediaPreview from './MediaPreview';
import MediaEditor from './MediaEditor';
import { MediaItem, MediaType, ViewMode } from '../../../types/media';

interface EnhancedMediaManagerProps {
  onSelectMedia?: (media: MediaItem | MediaItem[]) => void;
  multiple?: boolean;
  allowedTypes?: MediaType[];
  maxSize?: number; // In MB
}

export default function EnhancedMediaManager({
  onSelectMedia,
  multiple = false,
  allowedTypes = ['image', 'video', 'document'],
  maxSize = 5, // Default 5MB
}: EnhancedMediaManagerProps) {
  // Theme context for styling
  const { theme } = useTheme();
  
  // Media state
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'size'>('date');
  const [filterType, setFilterType] = useState<MediaType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFolder, setCurrentFolder] = useState('/');
  
  // UI state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editItem, setEditItem] = useState<MediaItem | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; visible: boolean }>({ message: '', type: 'info', visible: false });
  
  // Mock data - would be replaced with API calls
  React.useEffect(() => {
    // Simulated media data
    const mockMedia: MediaItem[] = [
      {
        id: '1',
        name: 'car-1.jpg',
        url: '/images/vehicles/car-1.jpg',
        thumbnailUrl: '/images/vehicles/car-1-thumb.jpg',
        type: 'image',
        size: 1200000,
        dimensions: { width: 1920, height: 1080 },
        createdAt: new Date('2023-05-10'),
        folder: '/',
        tags: ['car', 'luxury'],
      },
      {
        id: '2',
        name: 'car-2.jpg',
        url: '/images/vehicles/car-2.jpg',
        thumbnailUrl: '/images/vehicles/car-2-thumb.jpg',
        type: 'image',
        size: 950000,
        dimensions: { width: 1920, height: 1080 },
        createdAt: new Date('2023-06-15'),
        folder: '/',
        tags: ['car', 'sports'],
      },
      {
        id: '3',
        name: 'brochure.pdf',
        url: '/documents/brochure.pdf',
        thumbnailUrl: '/images/file-icons/pdf.png',
        type: 'document',
        size: 2500000,
        createdAt: new Date('2023-04-20'),
        folder: '/',
        tags: ['document', 'brochure'],
      },
      {
        id: '4',
        name: 'car-tour.mp4',
        url: '/videos/car-tour.mp4',
        thumbnailUrl: '/images/videos/car-tour-thumb.jpg',
        type: 'video',
        size: 15000000,
        dimensions: { width: 1920, height: 1080 },
        duration: 45, // seconds
        createdAt: new Date('2023-05-28'),
        folder: '/',
        tags: ['video', 'tour'],
      },
    ];
    
    setMediaItems(mockMedia);
  }, []);

  // Filter and sort media
  const filteredMedia = React.useMemo(() => {
    return mediaItems
      .filter(item => 
        // Filter by current folder
        item.folder === currentFolder &&
        // Filter by type if not 'all'
        (filterType === 'all' || item.type === filterType) &&
        // Filter by search query
        (searchQuery === '' || 
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.tags && item.tags.some(tag => 
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          ))
        )
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'size':
            return b.size - a.size;
          case 'date':
          default:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
  }, [mediaItems, currentFolder, filterType, searchQuery, sortBy]);

  // File upload handling
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const timer = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    // Simulate upload completion
    setTimeout(() => {
      clearInterval(timer);
      setUploadProgress(100);
      
      // Create new media items from uploaded files
      const newItems: MediaItem[] = acceptedFiles.map((file, index) => ({
        id: `new-${Date.now()}-${index}`,
        name: file.name,
        url: URL.createObjectURL(file),
        thumbnailUrl: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 
              file.type.startsWith('video/') ? 'video' : 'document',
        size: file.size,
        createdAt: new Date(),
        folder: currentFolder,
        tags: [],
      }));
      
      setMediaItems(prev => [...newItems, ...prev]);
      setIsUploading(false);
    }, 3000);
  }, [currentFolder]);
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': allowedTypes.includes('image') ? [] : undefined,
      'video/*': allowedTypes.includes('video') ? [] : undefined,
      'application/pdf': allowedTypes.includes('document') ? [] : undefined,
    },
    maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
  });
  
  // Media selection handling
  const handleSelectMedia = (item: MediaItem) => {
    if (multiple) {
      setSelectedMedia(prev => {
        const isSelected = prev.some(m => m.id === item.id);
        if (isSelected) {
          return prev.filter(m => m.id !== item.id);
        } else {
          return [...prev, item];
        }
      });
    } else {
      setSelectedMedia([item]);
      if (onSelectMedia) {
        onSelectMedia(item);
      }
    }
  };
  
  // Confirm selection for multiple mode
  const handleConfirmSelection = () => {
    if (onSelectMedia && multiple && selectedMedia.length > 0) {
      onSelectMedia(selectedMedia);
    }
  };
  
  // Preview handling
  const handleShowPreview = (item: MediaItem) => {
    setPreviewItem(item);
    setShowPreview(true);
  };
  
  // Edit handling
  const handleEditItem = (item: MediaItem) => {
    setEditItem(item);
    setShowEditor(true);
  };
  
  // Save edited media
  const handleSaveEdit = (updatedItem: MediaItem) => {
    setMediaItems(prev => 
      prev.map(item => item.id === updatedItem.id ? updatedItem : item)
    );
    
    setToast({
      message: 'Media successfully updated',
      type: 'success',
      visible: true
    });
    
    setShowEditor(false);
    setEditItem(null);
  };
  
  // Batch actions
  const handleDeleteSelected = () => {
    // Would be replaced with actual API call
    const selectedIds = selectedMedia.map(item => item.id);
    setMediaItems(prev => prev.filter(item => !selectedIds.includes(item.id)));
    setSelectedMedia([]);
  };
  
  return (
    <div className="bg-bg-paper rounded-lg border border-border-default">
      {/* Toolbar */}
      <MediaToolbar 
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterType={filterType}
        setFilterType={setFilterType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCount={selectedMedia.length}
        onDelete={handleDeleteSelected}
      />
      
      {/* Upload area */}
      <div 
        {...getRootProps()} 
        className="border-2 border-dashed border-border-default rounded-md p-6 mb-6 text-center hover:border-primary-400 transition-colors cursor-pointer"
      >
        <input {...getInputProps()} />
        <div className="text-text-muted">
          <FaCloudDownloadAlt className="mx-auto h-12 w-12 mb-3 text-text-muted" />
          <p className="text-lg font-medium">Drag and drop files here, or click to browse</p>
          <p className="text-sm mt-1">
            Supports: {allowedTypes.join(', ')} files up to {maxSize}MB
          </p>
        </div>
      </div>
      
      {/* Upload progress */}
      {isUploading && (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-bg-subtle rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Media grid */}
      <MediaGrid 
        media={filteredMedia}
        selectedMedia={selectedMedia}
        viewMode={viewMode}
        onSelect={handleSelectMedia}
        onPreview={handleShowPreview}
      />
      
      {/* Selection actions */}
      {multiple && selectedMedia.length > 0 && (
        <div className="border-t border-border-default mt-4 pt-4 flex justify-between items-center">
          <div className="text-sm text-text-secondary">
            {selectedMedia.length} item{selectedMedia.length !== 1 ? 's' : ''} selected
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedMedia([])}>
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleConfirmSelection}>
              Confirm Selection
            </Button>
          </div>
        </div>
      )}
      
      {/* Media preview modal */}
      <Modal 
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title={previewItem?.name || 'Media Preview'}
        size="xl"
      >
        {previewItem && (
          <MediaPreview 
            item={previewItem} 
            onEdit={handleEditItem}
          />
        )}
      </Modal>
      
      {/* Media editor modal */}
      {editItem && (
        <MediaEditor 
          item={editItem}
          isOpen={showEditor}
          onClose={() => setShowEditor(false)}
          onSave={handleSaveEdit}
        />
      )}
      
      {/* Toast notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast(prev => ({ ...prev, visible: false }))}
      />
    </div>
  );
}
