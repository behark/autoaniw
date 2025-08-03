import { useState, useCallback, useEffect } from 'react';
import { useApi, usePaginatedApi } from './useApi';
import mediaApi from '../../services/api/endpoints/media';
import { 
  MediaFile, 
  MediaFolder, 
  MediaFilter,
  PaginatedResponse,
  UploadMediaDto
} from '../../services/api/types';

// Default filter values
const defaultFilters: MediaFilter = {
  page: 1,
  limit: 20,
  sortBy: 'uploadDate',
  sortOrder: 'desc',
};

/**
 * Hook for fetching media files with pagination and filtering
 */
export function useMediaFiles(initialFilters?: Partial<MediaFilter>) {
  const filters = { ...defaultFilters, ...initialFilters };
  
  return usePaginatedApi<PaginatedResponse<MediaFile>, MediaFilter>(
    mediaApi.getMediaFiles.bind(mediaApi),
    filters
  );
}

/**
 * Hook for fetching media files in a specific folder
 */
export function useMediaFilesByFolder(folderId?: string, initialFilters?: Partial<MediaFilter>) {
  const filters = { ...defaultFilters, ...initialFilters };
  
  const { data, isLoading, error, execute, updateFilters, refresh } = usePaginatedApi<PaginatedResponse<MediaFile>, MediaFilter>(
    (filters) => {
      if (!folderId) {
        return Promise.resolve({
          items: [],
          total: 0,
          page: 1,
          limit: filters.limit || 20,
          totalPages: 0
        });
      }
      return mediaApi.getFilesByFolder(folderId, filters);
    },
    filters
  );
  
  // Refetch when folder ID changes
  useEffect(() => {
    if (folderId) {
      execute(filters);
    }
  }, [folderId, filters, execute]);
  
  return {
    data,
    isLoading,
    error,
    filters,
    updateFilters,
    refresh,
  };
}

/**
 * Hook for fetching a single media file by ID
 */
export function useMediaFile(id?: string) {
  const { data, isLoading, error, execute } = useApi(
    mediaApi.getMediaFileById.bind(mediaApi),
    !!id,
    id ? [id] : undefined as any
  );

  const refresh = useCallback(() => {
    if (id) {
      execute(id);
    }
  }, [id, execute]);

  useEffect(() => {
    if (id) {
      execute(id);
    }
  }, [id, execute]);

  return {
    file: data as MediaFile | null,
    isLoading,
    error,
    refresh,
  };
}

/**
 * Hook for uploading a media file
 */
export function useUploadMediaFile() {
  const [progress, setProgress] = useState<number>(0);
  
  const { data, isLoading, error, execute } = useApi<MediaFile, [UploadMediaDto, ((percentage: number) => void) | undefined]>(
    mediaApi.uploadMediaFile.bind(mediaApi)
  );

  const uploadFile = useCallback(
    async (uploadData: UploadMediaDto) => {
      setProgress(0);
      return execute(uploadData, (percentage) => setProgress(percentage));
    },
    [execute]
  );

  return {
    uploadFile,
    file: data as MediaFile | null,
    isLoading,
    error,
    progress,
  };
}

/**
 * Hook for uploading multiple media files
 */
export function useUploadMultipleFiles() {
  const [progress, setProgress] = useState<number>(0);
  
  const { data, isLoading, error, execute } = useApi<MediaFile[], [File[], string | undefined, ((percentage: number) => void) | undefined]>(
    mediaApi.uploadMultipleFiles.bind(mediaApi)
  );

  const uploadFiles = useCallback(
    async (files: File[], folder?: string) => {
      setProgress(0);
      return execute(files, folder, (percentage) => setProgress(percentage));
    },
    [execute]
  );

  return {
    uploadFiles,
    files: data as MediaFile[] | null,
    isLoading,
    error,
    progress,
  };
}

/**
 * Hook for updating media file metadata
 */
export function useUpdateMediaFile() {
  const { data, isLoading, error, execute } = useApi<MediaFile, [string, { name?: string; altText?: string; folder?: string }]>(
    mediaApi.updateMediaFile.bind(mediaApi)
  );

  return {
    updateFile: execute,
    file: data as MediaFile | null,
    isLoading,
    error,
  };
}

/**
 * Hook for deleting a media file
 */
export function useDeleteMediaFile() {
  const { isLoading, error, execute } = useApi<void, [string]>(
    mediaApi.deleteMediaFile.bind(mediaApi)
  );

  return {
    deleteFile: execute,
    isLoading,
    error,
  };
}

/**
 * Hook for deleting multiple media files
 */
export function useDeleteMultipleFiles() {
  const { isLoading, error, execute } = useApi<void, [string[]]>(
    mediaApi.deleteMultipleFiles.bind(mediaApi)
  );

  return {
    deleteFiles: execute,
    isLoading,
    error,
  };
}

/**
 * Hook for fetching all media folders
 */
export function useMediaFolders() {
  const { data, isLoading, error, execute } = useApi<MediaFolder[], []>(
    mediaApi.getFolders.bind(mediaApi),
    true,
    []
  );

  return {
    folders: data as MediaFolder[] | null,
    isLoading,
    error,
    refresh: execute,
  };
}

/**
 * Hook for fetching a single folder by ID
 */
export function useMediaFolder(id?: string) {
  const { data, isLoading, error, execute } = useApi(
    mediaApi.getFolderById.bind(mediaApi),
    !!id,
    id ? [id] : undefined as any
  );

  useEffect(() => {
    if (id) {
      execute(id);
    }
  }, [id, execute]);

  return {
    folder: data as MediaFolder | null,
    isLoading,
    error,
    refresh: () => id && execute(id),
  };
}

/**
 * Hook for creating a new folder
 */
export function useCreateFolder() {
  const { data, isLoading, error, execute } = useApi<MediaFolder, [string, string | undefined]>(
    mediaApi.createFolder.bind(mediaApi)
  );

  return {
    createFolder: execute,
    folder: data as MediaFolder | null,
    isLoading,
    error,
  };
}

/**
 * Hook for updating a folder
 */
export function useUpdateFolder() {
  const { data, isLoading, error, execute } = useApi<MediaFolder, [string, string]>(
    mediaApi.updateFolder.bind(mediaApi)
  );

  return {
    updateFolder: execute,
    folder: data as MediaFolder | null,
    isLoading,
    error,
  };
}

/**
 * Hook for deleting a folder
 */
export function useDeleteFolder() {
  const { isLoading, error, execute } = useApi<void, [string, boolean]>(
    mediaApi.deleteFolder.bind(mediaApi)
  );

  return {
    deleteFolder: execute,
    isLoading,
    error,
  };
}

/**
 * Hook for moving files to a different folder
 */
export function useMoveFilesToFolder() {
  const { isLoading, error, execute } = useApi<void, [string[], string]>(
    mediaApi.moveFilesToFolder.bind(mediaApi)
  );

  return {
    moveFiles: execute,
    isLoading,
    error,
  };
}

/**
 * Hook for getting image dimensions
 */
export function useImageDimensions() {
  const { data, isLoading, error, execute } = useApi<{ width: number; height: number }, [string]>(
    mediaApi.getImageDimensions.bind(mediaApi)
  );

  return {
    getDimensions: execute,
    dimensions: data,
    isLoading,
    error,
  };
}

/**
 * Hook for getting file types for filtering
 */
export function useFileTypes() {
  const { data, isLoading, error, execute } = useApi<string[], []>(
    mediaApi.getFileTypes.bind(mediaApi),
    true,
    []
  );

  return {
    fileTypes: data || [],
    isLoading,
    error,
    refresh: execute,
  };
}

/**
 * Hook for optimizing images
 */
export function useOptimizeImage() {
  const { data, isLoading, error, execute } = useApi<MediaFile, [string, { width?: number; height?: number; quality?: number; format?: 'jpeg' | 'png' | 'webp' }]>(
    mediaApi.optimizeImage.bind(mediaApi)
  );

  return {
    optimizeImage: execute,
    optimizedFile: data as MediaFile | null,
    isLoading,
    error,
  };
}
