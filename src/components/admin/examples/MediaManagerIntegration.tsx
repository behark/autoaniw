'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ErrorBoundary from '../../ui/feedback/ErrorBoundary';
import { LoadingSpinner, LoadingButton, UploadProgress } from '../../ui/feedback/LoadingStates';
import { formatApiError } from '../../../utils/errorHandling';
import { 
  useMediaFiles, 
  useMediaFolders, 
  useUploadMediaFile,
  useUploadMultipleFiles,
  useDeleteMediaFile,
  useCreateFolder
} from '../../../hooks/api';
import { MediaFile, MediaFolder } from '../../../services/api/types';

/**
 * Media Manager component integrated with API hooks
 * Demonstrates how to connect the Media Manager UI with backend services
 */
export default function MediaManagerIntegration() {
  // State for selected files and folders
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string | undefined>(undefined);
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  
  // File upload state
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  
  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    sortBy: 'uploadDate',
    sortOrder: 'desc' as 'asc' | 'desc'
  });
  
  // API hooks
  const { 
    data: mediaFilesData, 
    isLoading: isLoadingFiles,
    error: filesError,
    updateFilters,
    refresh: refreshFiles
  } = useMediaFiles({
    ...filters,
    folder: currentFolder,
    page: 1,
    limit: 50
  });
  
  const { 
    folders, 
    isLoading: isLoadingFolders,
    error: foldersError,
    refresh: refreshFolders
  } = useMediaFolders();
  
  const {
    uploadFile,
    isLoading: isUploading,
    progress: uploadProgress
  } = useUploadMediaFile();
  
  const {
    uploadFiles: uploadMultipleFiles,
    isLoading: isUploadingMultiple,
    progress: multiUploadProgress
  } = useUploadMultipleFiles();
  
  const {
    deleteFile,
    isLoading: isDeleting
  } = useDeleteMediaFile();
  
  const {
    createFolder,
    isLoading: isCreatingFolder
  } = useCreateFolder();
  
  // Handle API errors
  useEffect(() => {
    if (filesError) {
      toast.error(formatApiError(filesError));
    }
    
    if (foldersError) {
      toast.error(formatApiError(foldersError));
    }
  }, [filesError, foldersError]);
  
  // Handle file selection
  const handleFileSelect = (file: MediaFile) => {
    if (selectedFileIds.includes(file.id)) {
      // Deselect if already selected
      setSelectedFileIds(selectedFileIds.filter(id => id !== file.id));
      if (selectedFile?.id === file.id) {
        setSelectedFile(null);
      }
    } else {
      // Select new file
      setSelectedFile(file);
      setSelectedFileIds([...selectedFileIds, file.id]);
    }
  };
  
  // Handle folder navigation
  const handleFolderClick = (folder: MediaFolder) => {
    setCurrentFolder(folder.id);
    setSelectedFile(null);
    setSelectedFileIds([]);
  };
  
  // Navigate up to parent folder
  const handleNavigateUp = () => {
    setCurrentFolder(undefined);
    setSelectedFile(null);
    setSelectedFileIds([]);
  };
  
  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({...filters, search: e.target.value});
    updateFilters({search: e.target.value});
  };
  
  // Handle filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({...filters, [name]: value});
    updateFilters({[name]: value});
  };
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFilesToUpload(Array.from(e.target.files));
    }
  };
  
  // Upload selected files
  const handleUpload = async () => {
    if (filesToUpload.length === 0) return;
    
    try {
      if (filesToUpload.length === 1) {
        // Single file upload
        await uploadFile({
          file: filesToUpload[0],
          folder: currentFolder,
          altText: filesToUpload[0].name
        });
        toast.success('File uploaded successfully');
      } else {
        // Multiple files upload
        await uploadMultipleFiles(filesToUpload, currentFolder);
        toast.success(`${filesToUpload.length} files uploaded successfully`);
      }
      
      // Clear selected files and refresh file list
      setFilesToUpload([]);
      refreshFiles();
    } catch (error) {
      toast.error('Failed to upload files');
    }
  };
  
  // Handle file deletion
  const handleDeleteFile = async () => {
    if (!selectedFile) return;
    
    if (confirm('Are you sure you want to delete this file?')) {
      try {
        await deleteFile(selectedFile.id);
        toast.success('File deleted successfully');
        setSelectedFile(null);
        setSelectedFileIds(selectedFileIds.filter(id => id !== selectedFile.id));
        refreshFiles();
      } catch (error) {
        toast.error('Failed to delete file');
      }
    }
  };
  
  // Create new folder
  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    
    try {
      await createFolder(newFolderName, currentFolder);
      toast.success('Folder created successfully');
      setNewFolderName('');
      setShowNewFolderModal(false);
      refreshFolders();
    } catch (error) {
      toast.error('Failed to create folder');
    }
  };
  
  // Get URL for selected file
  const getSelectedFileUrl = () => {
    if (!selectedFile) return '';
    return selectedFile.url;
  };
  
  // Copy URL to clipboard
  const handleCopyUrl = () => {
    const url = getSelectedFileUrl();
    if (!url) return;
    
    navigator.clipboard.writeText(url)
      .then(() => toast.success('URL copied to clipboard'))
      .catch(() => toast.error('Failed to copy URL'));
  };
  
  return (
    <ErrorBoundary>
      <div className="bg-white rounded-lg shadow">
        {/* Toolbar */}
        <div className="border-b border-gray-200 p-4 flex flex-wrap items-center justify-between gap-4">
          {/* Left side: Navigation and folder actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleNavigateUp}
              disabled={!currentFolder}
              className={`px-3 py-1.5 text-sm rounded-md flex items-center ${
                !currentFolder ? 'text-gray-400 cursor-default' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            
            <div className="h-6 w-px bg-gray-300"></div>
            
            <button
              onClick={() => setShowNewFolderModal(true)}
              className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Folder
            </button>
          </div>
          
          {/* Right side: Search, filter, upload */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search files..."
                value={filters.search}
                onChange={handleSearchChange}
                className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-48"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2.5 top-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Type Filter */}
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="py-1.5 pl-3 pr-8 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="image">Images</option>
              <option value="document">Documents</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
            </select>
            
            {/* Sort Filter */}
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="py-1.5 pl-3 pr-8 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="uploadDate">Date</option>
              <option value="name">Name</option>
              <option value="size">Size</option>
            </select>
            
            {/* Sort Order */}
            <select
              name="sortOrder"
              value={filters.sortOrder}
              onChange={handleFilterChange}
              className="py-1.5 pl-3 pr-8 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
        
        {/* File Browser Area */}
        <div className="grid grid-cols-5 h-[500px]">
          {/* Folder Sidebar */}
          <div className="col-span-1 border-r border-gray-200 p-4 overflow-y-auto">
            <h3 className="font-semibold text-gray-700 mb-3">Folders</h3>
            {isLoadingFolders ? (
              <LoadingSpinner className="py-6" />
            ) : (
              <ul className="space-y-1">
                {folders?.map((folder) => (
                  <li key={folder.id}>
                    <button
                      onClick={() => handleFolderClick(folder)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center ${
                        currentFolder === folder.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      {folder.name}
                      <span className="ml-auto text-xs text-gray-500">{folder.files}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Files Grid */}
          <div className="col-span-4 p-4 overflow-y-auto">
            {isLoadingFiles ? (
              <LoadingSpinner message="Loading files..." className="py-12" />
            ) : (
              <>
                {/* Upload progress */}
                {(isUploading || isUploadingMultiple) && (
                  <div className="mb-4">
                    <UploadProgress 
                      progress={isUploading ? uploadProgress : multiUploadProgress}
                      fileName={filesToUpload.length === 1 ? filesToUpload[0].name : `${filesToUpload.length} files`}
                    />
                  </div>
                )}
                
                {/* Files grid */}
                {mediaFilesData?.items && mediaFilesData.items.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {mediaFilesData.items.map((file) => (
                      <div
                        key={file.id}
                        onClick={() => handleFileSelect(file)}
                        className={`relative group rounded-lg border overflow-hidden cursor-pointer transition-all ${
                          selectedFileIds.includes(file.id) 
                            ? 'ring-2 ring-blue-500 border-transparent' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {/* File preview */}
                        {file.type.startsWith('image/') ? (
                          <div className="aspect-square bg-gray-100">
                            <img
                              src={file.thumbnailUrl || file.url}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        )}
                        
                        {/* File info */}
                        <div className="p-2">
                          <p className="text-xs font-medium text-gray-900 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
                        </div>
                        
                        {/* Selected indicator */}
                        {selectedFileIds.includes(file.id) && (
                          <div className="absolute top-2 right-2">
                            <div className="bg-blue-500 text-white rounded-full p-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="mt-2">No files found</p>
                    <p className="text-sm">Upload files or select a different folder</p>
                  </div>
                )}
                
                {/* Pagination info */}
                {mediaFilesData && (
                  <div className="mt-4 flex justify-between text-sm text-gray-500">
                    <div>
                      Showing {mediaFilesData.items.length} of {mediaFilesData.total} files
                    </div>
                    <div>
                      Page {mediaFilesData.page} of {mediaFilesData.totalPages}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Footer/Actions Bar */}
        <div className="border-t border-gray-200 p-4 flex flex-wrap items-center justify-between gap-4">
          {/* Selected file info */}
          <div>
            {selectedFile && (
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">Selected:</span>
                <span className="text-sm">{selectedFile.name}</span>
              </div>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-3">
            {/* Upload buttons */}
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileChange}
                className="sr-only"
              />
              <label
                htmlFor="file-upload"
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer"
              >
                Select Files
              </label>
            </div>
            
            {filesToUpload.length > 0 && (
              <LoadingButton
                isLoading={isUploading || isUploadingMultiple}
                loadingText="Uploading..."
                onClick={handleUpload}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Upload {filesToUpload.length} {filesToUpload.length === 1 ? 'File' : 'Files'}
              </LoadingButton>
            )}
            
            {/* File actions */}
            {selectedFile && (
              <>
                <button
                  onClick={handleCopyUrl}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Copy URL
                </button>
                
                <LoadingButton
                  isLoading={isDeleting}
                  loadingText="Deleting..."
                  onClick={handleDeleteFile}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  Delete
                </LoadingButton>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* New Folder Modal */}
      {showNewFolderModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Folder</h3>
            
            <div className="mb-4">
              <label htmlFor="folder-name" className="block text-sm font-medium text-gray-700 mb-1">
                Folder Name
              </label>
              <input
                type="text"
                id="folder-name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter folder name"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNewFolderModal(false)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              
              <LoadingButton
                isLoading={isCreatingFolder}
                loadingText="Creating..."
                onClick={handleCreateFolder}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                disabled={!newFolderName.trim()}
              >
                Create Folder
              </LoadingButton>
            </div>
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
}
