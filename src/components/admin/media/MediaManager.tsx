'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUpload,
  FaSearch,
  FaFolderOpen,
  FaTrash,
  FaImage,
  FaFile,
  FaCheck,
  FaTimes,
  FaCloudUploadAlt,
  FaFolder,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaCopy,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp
} from 'react-icons/fa';

// Types
interface MediaFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  thumbnailUrl: string;
  uploadDate: string;
  dimensions?: {
    width: number;
    height: number;
  };
}

interface MediaFolder {
  id: string;
  name: string;
  files: number;
  path: string;
}

interface MediaManagerProps {
  onSelect?: (file: MediaFile) => void;
  allowMultiple?: boolean;
  mode?: 'standalone' | 'selector';
  onClose?: () => void;
}

// Mock data for media files
const mockFiles: MediaFile[] = [
  {
    id: 'f1',
    name: 'mercedes-s-class-front.jpg',
    type: 'image/jpeg',
    size: 1240000,
    url: '/placeholder-image-1.jpg',
    thumbnailUrl: '/placeholder-image-1.jpg',
    uploadDate: '2023-10-15',
    dimensions: { width: 1920, height: 1080 }
  },
  {
    id: 'f2',
    name: 'mercedes-s-class-interior.jpg',
    type: 'image/jpeg',
    size: 950000,
    url: '/placeholder-image-2.jpg',
    thumbnailUrl: '/placeholder-image-2.jpg',
    uploadDate: '2023-10-15',
    dimensions: { width: 1920, height: 1080 }
  },
  {
    id: 'f3',
    name: 'bmw-7-series.jpg',
    type: 'image/jpeg',
    size: 1100000,
    url: '/placeholder-image-3.jpg',
    thumbnailUrl: '/placeholder-image-3.jpg',
    uploadDate: '2023-10-10',
    dimensions: { width: 1920, height: 1080 }
  },
  {
    id: 'f4',
    name: 'audi-a8-side.jpg',
    type: 'image/jpeg',
    size: 890000,
    url: '/placeholder-image-4.jpg',
    thumbnailUrl: '/placeholder-image-4.jpg',
    uploadDate: '2023-10-08',
    dimensions: { width: 1920, height: 1080 }
  },
  {
    id: 'f5',
    name: 'vehicle-specs.pdf',
    type: 'application/pdf',
    size: 450000,
    url: '/sample.pdf',
    thumbnailUrl: '',
    uploadDate: '2023-10-05'
  },
  {
    id: 'f6',
    name: 'inventory-list.xlsx',
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 250000,
    url: '/sample.xlsx',
    thumbnailUrl: '',
    uploadDate: '2023-10-01'
  }
];

// Mock data for folders
const mockFolders: MediaFolder[] = [
  {
    id: 'folder1',
    name: 'Vehicles',
    files: 12,
    path: '/media/vehicles'
  },
  {
    id: 'folder2',
    name: 'Logos',
    files: 5,
    path: '/media/logos'
  },
  {
    id: 'folder3',
    name: 'Banners',
    files: 3,
    path: '/media/banners'
  }
];

// File size formatter
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / 1048576).toFixed(1) + ' MB';
};

// Get file icon based on type
const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return <FaImage className="text-blue-500" />;
  else if (type.includes('pdf')) return <FaFilePdf className="text-red-500" />;
  else if (type.includes('word')) return <FaFileWord className="text-blue-700" />;
  else if (type.includes('excel') || type.includes('sheet')) return <FaFileExcel className="text-green-600" />;
  else return <FaFile className="text-gray-500" />;
};

const MediaManager = ({ 
  onSelect, 
  allowMultiple = false, 
  mode = 'standalone',
  onClose
}: MediaManagerProps) => {
  // State
  const [files, setFiles] = useState<MediaFile[]>(mockFiles);
  const [folders, setFolders] = useState<MediaFolder[]>(mockFolders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'document'>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Toggle file selection
  const toggleFileSelection = (fileId: string) => {
    if (allowMultiple) {
      if (selectedFiles.includes(fileId)) {
        setSelectedFiles(selectedFiles.filter(id => id !== fileId));
      } else {
        setSelectedFiles([...selectedFiles, fileId]);
      }
    } else {
      setSelectedFiles([fileId]);
    }
  };

  // Handle file upload click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Simulate adding new files after upload
        const newFiles: MediaFile[] = Array.from(uploadedFiles).map((file, index) => {
          const id = `new-file-${Date.now()}-${index}`;
          const fileType = file.type;
          
          return {
            id,
            name: file.name,
            type: fileType,
            size: file.size,
            url: URL.createObjectURL(file),
            thumbnailUrl: fileType.startsWith('image/') ? URL.createObjectURL(file) : '',
            uploadDate: new Date().toISOString().split('T')[0],
            ...(fileType.startsWith('image/') && {
              dimensions: { width: 1920, height: 1080 } // Mock dimensions
            })
          };
        });
        
        setFiles([...newFiles, ...files]);
        setIsUploading(false);
        setUploadProgress(0);
        
        // Clear the input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }, 300);
  };

  // Handle delete files
  const handleDeleteFiles = () => {
    if (selectedFiles.length === 0) return;
    
    // Simulate API call to delete files
    setFiles(files.filter(file => !selectedFiles.includes(file.id)));
    setSelectedFiles([]);
  };

  // Handle folder click
  const handleFolderClick = (folder: MediaFolder) => {
    setCurrentFolder(folder.id);
    // In a real app, you would fetch files for this folder from the server
  };

  // Handle back to folders
  const handleBackToFolders = () => {
    setCurrentFolder(null);
  };

  // Handle confirm selection
  const handleConfirmSelection = () => {
    if (selectedFiles.length > 0 && onSelect) {
      const selectedFileObjects = files.filter(file => selectedFiles.includes(file.id));
      if (allowMultiple) {
        onSelect(selectedFileObjects[0]);
      } else {
        onSelect(selectedFileObjects[0]);
      }
      
      if (onClose) {
        onClose();
      }
    }
  };

  // Handle copy URL
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('URL copied to clipboard!');
      })
      .catch(err => {
        console.error('Could not copy URL: ', err);
      });
  };

  // Toggle sort direction
  const handleToggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  // Change sort by
  const handleChangeSortBy = (newSortBy: 'name' | 'date' | 'size') => {
    if (sortBy === newSortBy) {
      handleToggleSortDirection();
    } else {
      setSortBy(newSortBy);
      setSortDirection('desc');
    }
  };

  // Filter files by search query and type
  const filteredFiles = files.filter(file => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      file.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by type
    let matchesType = true;
    if (filterType === 'image') {
      matchesType = file.type.startsWith('image/');
    } else if (filterType === 'document') {
      matchesType = !file.type.startsWith('image/');
    }
    
    return matchesSearch && matchesType;
  });

  // Sort files
  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (sortBy === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'date') {
      return sortDirection === 'asc'
        ? a.uploadDate.localeCompare(b.uploadDate)
        : b.uploadDate.localeCompare(a.uploadDate);
    } else { // size
      return sortDirection === 'asc'
        ? a.size - b.size
        : b.size - a.size;
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-lg font-medium text-gray-900">
            {currentFolder 
              ? folders.find(f => f.id === currentFolder)?.name || 'Media Files'
              : 'Media Manager'}
          </h2>
          
          <div className="flex items-center space-x-2">
            {/* Upload Button */}
            <button
              onClick={handleUploadClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
            >
              <FaUpload className="mr-2" />
              Upload Files
            </button>
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
            
            {/* Delete Button */}
            {selectedFiles.length > 0 && (
              <button
                onClick={handleDeleteFiles}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center"
              >
                <FaTrash className="mr-2" />
                Delete {selectedFiles.length > 1 ? `(${selectedFiles.length})` : ''}
              </button>
            )}
            
            {/* Select Button (for selector mode) */}
            {mode === 'selector' && selectedFiles.length > 0 && (
              <button
                onClick={handleConfirmSelection}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
              >
                <FaCheck className="mr-2" />
                Select {selectedFiles.length > 1 ? `(${selectedFiles.length})` : ''}
              </button>
            )}
            
            {/* Close Button (for selector mode) */}
            {mode === 'selector' && (
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
        
        {/* Breadcrumb - Show when inside a folder */}
        {currentFolder && (
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <button
              onClick={handleBackToFolders}
              className="hover:text-blue-600 flex items-center"
            >
              <FaFolder className="mr-1" /> All Folders
            </button>
            <span className="mx-2">/</span>
            <span className="font-medium">
              {folders.find(f => f.id === currentFolder)?.name}
            </span>
          </div>
        )}
      </div>
      
      {/* Upload Progress */}
      {isUploading && (
        <div className="p-4 bg-blue-50">
          <div className="flex items-center">
            <FaCloudUploadAlt className="text-blue-500 text-xl mr-2" />
            <span className="text-sm font-medium text-blue-700">Uploading files...</span>
          </div>
          <div className="mt-2 h-2 bg-blue-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Search and Filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search files..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Type Filter */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <FaFilter className="text-gray-400 mr-2" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Files</option>
                <option value="image">Images</option>
                <option value="document">Documents</option>
              </select>
            </div>
            
            {/* Sort */}
            <div className="flex items-center">
              <button 
                onClick={handleToggleSortDirection}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                {sortDirection === 'asc' ? (
                  <FaSortAmountUp />
                ) : (
                  <FaSortAmountDown />
                )}
              </button>
              <select
                value={sortBy}
                onChange={(e) => handleChangeSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="name">Name</option>
                <option value="date">Date</option>
                <option value="size">Size</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-4">
        {/* Show folders when not inside a folder */}
        {!currentFolder && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Folders</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {folders.map(folder => (
                <div
                  key={folder.id}
                  onClick={() => handleFolderClick(folder)}
                  className="bg-gray-50 border border-gray-200 rounded-md p-4 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className="flex items-center">
                    <FaFolderOpen className="text-yellow-500 text-xl mr-2" />
                    <div>
                      <h4 className="font-medium text-gray-800">{folder.name}</h4>
                      <p className="text-xs text-gray-500">{folder.files} files</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Files */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            {currentFolder 
              ? `Files in ${folders.find(f => f.id === currentFolder)?.name}`
              : 'Recent Files'}
          </h3>
          
          {sortedFiles.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {sortedFiles.map(file => (
                <div
                  key={file.id}
                  onClick={() => toggleFileSelection(file.id)}
                  className={`relative border rounded-md overflow-hidden group cursor-pointer ${
                    selectedFiles.includes(file.id)
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Thumbnail or Icon */}
                  <div className="aspect-w-1 aspect-h-1 w-full bg-gray-100 flex items-center justify-center">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={file.thumbnailUrl}
                        alt={file.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="text-4xl flex items-center justify-center h-full">
                        {getFileIcon(file.type)}
                      </div>
                    )}
                  </div>
                  
                  {/* File Info */}
                  <div className="p-2">
                    <p className="text-xs font-medium text-gray-800 truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  
                  {/* Selection Overlay */}
                  {selectedFiles.includes(file.id) && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                      <FaCheck size={12} />
                    </div>
                  )}
                  
                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-2">
                      {file.type.startsWith('image/') && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(file.url, '_blank');
                          }}
                          className="p-2 bg-white rounded-full hover:bg-gray-100"
                        >
                          <FaEye className="text-gray-700" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyUrl(file.url);
                        }}
                        className="p-2 bg-white rounded-full hover:bg-gray-100"
                      >
                        <FaCopy className="text-gray-700" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFiles();
                        }}
                        className="p-2 bg-white rounded-full hover:bg-gray-100"
                      >
                        <FaTrash className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaImage className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No files found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery 
                  ? 'Try a different search term'
                  : 'Upload some files to get started'}
              </p>
              <div className="mt-6">
                <button
                  onClick={handleUploadClick}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FaUpload className="-ml-1 mr-2 h-5 w-5" />
                  Upload Files
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer with selection count */}
      {selectedFiles.length > 0 && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} selected
            </span>
            
            {mode === 'selector' && (
              <button
                onClick={handleConfirmSelection}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                <FaCheck className="mr-2 inline-block" />
                Select
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaManager;
