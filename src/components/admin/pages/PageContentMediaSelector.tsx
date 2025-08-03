'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/design-system/Button';
import { Modal } from '@/components/ui/design-system/Modal';
import MediaManagerIntegration from '@/components/admin/media/MediaManagerIntegration';
import { MediaItem } from '@/types/media';
import { FaImage, FaFileAlt, FaVideo, FaTimes } from 'react-icons/fa';
import { useTheme } from '@/providers/ThemeProvider';

interface PageContentMediaSelectorProps {
  editorRef: any; // Reference to the editor instance
  onInsert?: (html: string) => void; // Optional callback for direct HTML insertion
}

export default function PageContentMediaSelector({
  editorRef,
  onInsert
}: PageContentMediaSelectorProps) {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'document'>('image');
  
  // Insert selected media into the editor
  const handleMediaSelect = (media: MediaItem | MediaItem[]) => {
    const item = Array.isArray(media) ? media[0] : media;
    
    if (!item) return;
    
    // Generate HTML based on media type
    let html = '';
    
    switch (item.type) {
      case 'image':
        html = `<figure class="image">
          <img src="${item.url}" alt="${item.alt || item.name}" />
          ${item.description ? `<figcaption>${item.description}</figcaption>` : ''}
        </figure>`;
        break;
        
      case 'video':
        html = `<figure class="media">
          <div data-oembed-url="${item.url}">
            <div>
              <video controls width="100%" poster="${item.thumbnailUrl || ''}">
                <source src="${item.url}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </figure>`;
        break;
        
      case 'document':
        html = `<p>
          <a href="${item.url}" target="_blank" rel="noopener noreferrer">
            <span class="file-icon">${getFileIcon(item.name)}</span>
            ${item.name} (${formatFileSize(item.size)})
          </a>
        </p>`;
        break;
    }
    
    // Insert the HTML
    if (onInsert) {
      onInsert(html);
    } else if (editorRef && editorRef.current) {
      // For CKEditor or similar WYSIWYG editors
      const editor = editorRef.current;
      
      if (editor.model && editor.model.change) {
        // CKEditor 5 style insertion
        editor.model.change(writer => {
          const viewFragment = editor.data.processor.toView(html);
          const modelFragment = editor.data.toModel(viewFragment);
          editor.model.insertContent(modelFragment);
        });
      } else if (editor.insertHtml) {
        // Classic editor insertion
        editor.insertHtml(html);
      } else {
        console.error('Editor method for inserting HTML not found');
      }
    }
    
    // Close the modal
    setIsModalOpen(false);
  };
  
  // Helper to get file icon based on extension
  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return '<i class="fa fa-file-pdf-o"></i>';
      case 'doc':
      case 'docx':
        return '<i class="fa fa-file-word-o"></i>';
      case 'xls':
      case 'xlsx':
        return '<i class="fa fa-file-excel-o"></i>';
      default:
        return '<i class="fa fa-file-o"></i>';
    }
  };
  
  // Helper to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Open modal with specific media type
  const openMediaSelector = (type: 'image' | 'video' | 'document') => {
    setMediaType(type);
    setIsModalOpen(true);
  };
  
  // Get icon and text for each media type
  const getMediaTypeInfo = (type: 'image' | 'video' | 'document') => {
    switch (type) {
      case 'image':
        return { icon: <FaImage />, text: 'Insert Image' };
      case 'video':
        return { icon: <FaVideo />, text: 'Insert Video' };
      case 'document':
        return { icon: <FaFileAlt />, text: 'Insert Document' };
    }
  };
  
  return (
    <>
      {/* Media insertion buttons */}
      <div className="flex items-center gap-2">
        {(['image', 'video', 'document'] as const).map(type => {
          const { icon, text } = getMediaTypeInfo(type);
          
          return (
            <Button
              key={type}
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5"
              onClick={() => openMediaSelector(type)}
            >
              <span className="text-text-secondary">{icon}</span>
              <span>{text}</span>
            </Button>
          );
        })}
      </div>
      
      {/* Media Manager Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Select ${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}`}
        size="xl"
      >
        <MediaManagerIntegration
          mode="selector"
          multiple={false}
          onSelect={handleMediaSelect}
          allowedTypes={[mediaType]}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}
