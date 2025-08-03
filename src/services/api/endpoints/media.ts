import apiClient from '../client';
import {
  MediaFile,
  MediaFolder,
  MediaFilter,
  PaginatedResponse,
  UploadMediaDto
} from '../types';

/**
 * Media API service
 * Handles all media-related API calls including uploads, browsing, and organization
 */
class MediaApiService {
  private baseUrl = '/media';
  
  /**
   * Get all media files with optional filtering and pagination
   */
  public async getMediaFiles(filters?: MediaFilter): Promise<PaginatedResponse<MediaFile>> {
    // Convert filters to query params
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    const response = await apiClient.get<PaginatedResponse<MediaFile>>(`${this.baseUrl}/files${queryString}`);
    return response.data;
  }
  
  /**
   * Get media files in a specific folder
   */
  public async getFilesByFolder(folderId: string, filters?: MediaFilter): Promise<PaginatedResponse<MediaFile>> {
    // Convert filters to query params
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = queryParams.toString() ? `&${queryParams.toString()}` : '';
    const response = await apiClient.get<PaginatedResponse<MediaFile>>(
      `${this.baseUrl}/folders/${folderId}/files?${queryString}`
    );
    return response.data;
  }
  
  /**
   * Get a single media file by ID
   */
  public async getMediaFileById(id: string): Promise<MediaFile> {
    const response = await apiClient.get<MediaFile>(`${this.baseUrl}/files/${id}`);
    return response.data;
  }
  
  /**
   * Upload a single media file with progress tracking
   */
  public async uploadMediaFile(
    uploadData: UploadMediaDto,
    onProgress?: (percentage: number) => void
  ): Promise<MediaFile> {
    const { file, folder, altText } = uploadData;
    
    const formData = new FormData();
    formData.append('file', file);
    
    if (folder) {
      formData.append('folder', folder);
    }
    
    if (altText) {
      formData.append('altText', altText);
    }
    
    const response = await apiClient.post<MediaFile>(
      `${this.baseUrl}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: onProgress 
          ? (progressEvent) => {
              const percentage = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
              onProgress(percentage);
            }
          : undefined,
      }
    );
    
    return response.data;
  }
  
  /**
   * Upload multiple media files with progress tracking
   */
  public async uploadMultipleFiles(
    files: File[],
    folder?: string,
    onProgress?: (percentage: number) => void
  ): Promise<MediaFile[]> {
    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append('files', file);
    });
    
    if (folder) {
      formData.append('folder', folder);
    }
    
    const response = await apiClient.post<MediaFile[]>(
      `${this.baseUrl}/upload-multiple`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: onProgress 
          ? (progressEvent) => {
              const percentage = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
              onProgress(percentage);
            }
          : undefined,
      }
    );
    
    return response.data;
  }
  
  /**
   * Update media file metadata
   */
  public async updateMediaFile(
    id: string, 
    metadata: { name?: string; altText?: string; folder?: string }
  ): Promise<MediaFile> {
    const response = await apiClient.patch<MediaFile>(`${this.baseUrl}/files/${id}`, metadata);
    return response.data;
  }
  
  /**
   * Delete a media file
   */
  public async deleteMediaFile(id: string): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/files/${id}`);
  }
  
  /**
   * Delete multiple media files
   */
  public async deleteMultipleFiles(ids: string[]): Promise<void> {
    await apiClient.post(`${this.baseUrl}/delete-multiple`, { ids });
  }
  
  /**
   * Get all media folders
   */
  public async getFolders(): Promise<MediaFolder[]> {
    const response = await apiClient.get<MediaFolder[]>(`${this.baseUrl}/folders`);
    return response.data;
  }
  
  /**
   * Get a single folder by ID
   */
  public async getFolderById(id: string): Promise<MediaFolder> {
    const response = await apiClient.get<MediaFolder>(`${this.baseUrl}/folders/${id}`);
    return response.data;
  }
  
  /**
   * Create a new folder
   */
  public async createFolder(name: string, parentId?: string): Promise<MediaFolder> {
    const response = await apiClient.post<MediaFolder>(`${this.baseUrl}/folders`, { name, parentId });
    return response.data;
  }
  
  /**
   * Update a folder
   */
  public async updateFolder(id: string, name: string): Promise<MediaFolder> {
    const response = await apiClient.patch<MediaFolder>(`${this.baseUrl}/folders/${id}`, { name });
    return response.data;
  }
  
  /**
   * Delete a folder and optionally its contents
   */
  public async deleteFolder(id: string, deleteContents: boolean = false): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/folders/${id}?deleteContents=${deleteContents}`);
  }
  
  /**
   * Move files to a different folder
   */
  public async moveFilesToFolder(fileIds: string[], targetFolderId: string): Promise<void> {
    await apiClient.post(`${this.baseUrl}/move-files`, { fileIds, targetFolderId });
  }
  
  /**
   * Get image dimensions
   */
  public async getImageDimensions(url: string): Promise<{ width: number; height: number }> {
    const response = await apiClient.get<{ width: number; height: number }>(`${this.baseUrl}/dimensions?url=${encodeURIComponent(url)}`);
    return response.data;
  }
  
  /**
   * Get file types for filtering
   */
  public async getFileTypes(): Promise<string[]> {
    const response = await apiClient.get<string[]>(`${this.baseUrl}/file-types`);
    return response.data;
  }
  
  /**
   * Optimize image (resize, compress, etc.)
   */
  public async optimizeImage(
    id: string, 
    options: { 
      width?: number; 
      height?: number; 
      quality?: number; 
      format?: 'jpeg' | 'png' | 'webp' 
    }
  ): Promise<MediaFile> {
    const response = await apiClient.post<MediaFile>(`${this.baseUrl}/files/${id}/optimize`, options);
    return response.data;
  }
}

// Create singleton instance
const mediaApi = new MediaApiService();
export default mediaApi;
