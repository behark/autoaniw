/**
 * Type definitions for API services
 * Shared interfaces used across vehicle, page, media, and auth services
 */

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter types
export interface BaseFilter {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Vehicle related types
export interface VehicleFilter extends BaseFilter, PaginationParams {
  brand?: string;
  model?: string;
  year?: string | number;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  featured?: boolean;
}

export interface VehicleImage {
  id?: string;
  url: string;
  altText?: string;
  isPrimary?: boolean;
}

export interface Vehicle {
  id: string;
  title: string;
  subtitle?: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  description?: string;
  status: 'available' | 'sold' | 'reserved' | 'coming soon';
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
  images: VehicleImage[];
  specs?: {
    engine?: string;
    fuel?: string;
    mileage?: string;
    power?: string;
    transmission?: string;
    color?: string;
    [key: string]: string | undefined;
  };
  features?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface CreateVehicleDto extends Omit<Vehicle, 'id' | 'images' | 'createdAt' | 'updatedAt'> {
  images?: File[];
  existingImages?: VehicleImage[];
}

export interface UpdateVehicleDto extends Partial<Omit<Vehicle, 'id' | 'images' | 'createdAt' | 'updatedAt'>> {
  images?: File[];
  existingImages?: VehicleImage[];
}

// Page related types
export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  description?: string;
  keywords?: string;
  status: 'published' | 'draft';
  author?: string;
  isHomepage?: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastModified?: string;
}

export interface PageFilter extends BaseFilter, PaginationParams {
  status?: string;
}

export interface CreatePageDto extends Omit<Page, 'id' | 'createdAt' | 'updatedAt' | 'lastModified'> {}

export interface UpdatePageDto extends Partial<Omit<Page, 'id' | 'createdAt' | 'updatedAt' | 'lastModified'>> {}

// Media related types
export interface MediaFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  uploadDate: string;
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface MediaFolder {
  id: string;
  name: string;
  files: number;
  path: string;
}

export interface MediaFilter extends BaseFilter, PaginationParams {
  type?: string;
  folder?: string;
}

export interface UploadMediaDto {
  file: File;
  folder?: string;
  altText?: string;
}

// Auth related types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  expiresAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  avatar?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
