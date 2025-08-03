// Media Types for AutoAni's Enhanced Media Manager

export type MediaType = 'image' | 'video' | 'document';

export type ViewMode = 'grid' | 'list';

export interface MediaDimensions {
  width: number;
  height: number;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
  type: MediaType;
  size: number; // In bytes
  dimensions?: MediaDimensions;
  duration?: number; // For videos, in seconds
  createdAt: Date;
  updatedAt?: Date;
  folder: string;
  tags?: string[];
  alt?: string;
  description?: string;
}

export interface MediaFolder {
  id: string;
  name: string;
  path: string;
  parentFolder?: string;
  createdAt: Date;
  itemCount: number;
}

export interface MediaUploadProgress {
  file: File;
  progress: number;
  error?: string;
  completed: boolean;
  mediaItem?: MediaItem;
}

export interface MediaFilters {
  searchQuery?: string;
  types?: MediaType[];
  tags?: string[];
  dateRange?: {
    from: Date;
    to: Date;
  };
  sizeRange?: {
    min: number; // In bytes
    max: number; // In bytes
  };
}

export interface MediaSortOptions {
  field: 'name' | 'createdAt' | 'updatedAt' | 'size';
  direction: 'asc' | 'desc';
}

export interface MediaBatchActions {
  move: (items: MediaItem[], targetFolder: string) => Promise<void>;
  delete: (items: MediaItem[]) => Promise<void>;
  tag: (items: MediaItem[], tags: string[]) => Promise<void>;
  untag: (items: MediaItem[], tags: string[]) => Promise<void>;
}

export interface MediaEditorOptions {
  crop: boolean;
  resize: boolean;
  rotate: boolean;
  flip: boolean;
  filter: boolean;
  text: boolean;
  compress: boolean;
}

export interface MediaUploadOptions {
  maxSize: number; // In bytes
  allowedTypes: MediaType[];
  autoProcess: boolean;
  createThumbnails: boolean;
  folder: string;
}
