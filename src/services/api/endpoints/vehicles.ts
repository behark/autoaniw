import apiClient from '../client';
import {
  Vehicle,
  VehicleFilter,
  CreateVehicleDto,
  UpdateVehicleDto,
  PaginatedResponse
} from '../types';

/**
 * Vehicles API service
 * Handles all vehicle-related API calls including CRUD, filtering, and pagination
 */
class VehiclesApiService {
  private baseUrl = '/vehicles';
  
  /**
   * Get all vehicles with optional filtering and pagination
   */
  public async getVehicles(filters?: VehicleFilter): Promise<PaginatedResponse<Vehicle>> {
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
    const response = await apiClient.get<PaginatedResponse<Vehicle>>(`${this.baseUrl}${queryString}`);
    return response.data;
  }
  
  /**
   * Get a single vehicle by ID
   */
  public async getVehicleById(id: string): Promise<Vehicle> {
    const response = await apiClient.get<Vehicle>(`${this.baseUrl}/${id}`);
    return response.data;
  }
  
  /**
   * Get featured vehicles
   */
  public async getFeaturedVehicles(limit: number = 6): Promise<Vehicle[]> {
    const response = await apiClient.get<Vehicle[]>(`${this.baseUrl}/featured?limit=${limit}`);
    return response.data;
  }
  
  /**
   * Get similar vehicles based on a vehicle ID
   */
  public async getSimilarVehicles(id: string, limit: number = 3): Promise<Vehicle[]> {
    const response = await apiClient.get<Vehicle[]>(`${this.baseUrl}/${id}/similar?limit=${limit}`);
    return response.data;
  }
  
  /**
   * Create a new vehicle with images
   */
  public async createVehicle(
    vehicleData: CreateVehicleDto, 
    onProgress?: (percentage: number) => void
  ): Promise<Vehicle> {
    // Handle image uploads with special processing
    const { images, ...vehicleDetails } = vehicleData;
    
    if (!images || images.length === 0) {
      // No images, just create the vehicle with regular data
      const response = await apiClient.post<Vehicle>(this.baseUrl, vehicleDetails);
      return response.data;
    } 
    
    // We have images, use file upload with FormData
    const formData = new FormData();
    
    // Add vehicle details
    formData.append('data', JSON.stringify(vehicleDetails));
    
    // Add images
    if (images && images.length > 0) {
      images.forEach((image, index) => {
        formData.append('images', image);
      });
    }
    
    const response = await apiClient.post<Vehicle>(
      this.baseUrl, 
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
   * Update an existing vehicle
   */
  public async updateVehicle(
    id: string, 
    vehicleData: UpdateVehicleDto,
    onProgress?: (percentage: number) => void
  ): Promise<Vehicle> {
    const { images, existingImages, ...vehicleDetails } = vehicleData;
    
    if (!images || images.length === 0) {
      // No new images, just update the vehicle data including existing images info
      const updateData = {
        ...vehicleDetails,
        ...(existingImages && { existingImages })
      };
      const response = await apiClient.put<Vehicle>(`${this.baseUrl}/${id}`, updateData);
      return response.data;
    } 
    
    // We have new images, use file upload with FormData
    const formData = new FormData();
    
    // Add vehicle details and existing images info
    const detailsWithExistingImages = {
      ...vehicleDetails,
      ...(existingImages && { existingImages })
    };
    
    formData.append('data', JSON.stringify(detailsWithExistingImages));
    
    // Add new images
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append('images', image);
      });
    }
    
    const response = await apiClient.put<Vehicle>(
      `${this.baseUrl}/${id}`, 
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
   * Delete a vehicle
   */
  public async deleteVehicle(id: string): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/${id}`);
  }
  
  /**
   * Get vehicle brands for filtering
   */
  public async getVehicleBrands(): Promise<string[]> {
    const response = await apiClient.get<string[]>(`${this.baseUrl}/brands`);
    return response.data;
  }
  
  /**
   * Get vehicle models for a specific brand
   */
  public async getVehicleModels(brand: string): Promise<string[]> {
    const response = await apiClient.get<string[]>(`${this.baseUrl}/models?brand=${brand}`);
    return response.data;
  }
  
  /**
   * Get vehicle years for filtering
   */
  public async getVehicleYears(): Promise<string[]> {
    const response = await apiClient.get<string[]>(`${this.baseUrl}/years`);
    return response.data;
  }
  
  /**
   * Update vehicle images (add, remove, reorder)
   */
  public async updateVehicleImages(
    id: string, 
    images: File[], 
    existingImages: VehicleImage[],
    onProgress?: (percentage: number) => void
  ): Promise<Vehicle> {
    const formData = new FormData();
    
    // Add existing images information
    formData.append('existingImages', JSON.stringify(existingImages));
    
    // Add new images
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append('images', image);
      });
    }
    
    const response = await apiClient.post<Vehicle>(
      `${this.baseUrl}/${id}/images`, 
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
   * Toggle vehicle featured status
   */
  public async toggleFeaturedStatus(id: string, featured: boolean): Promise<Vehicle> {
    const response = await apiClient.patch<Vehicle>(`${this.baseUrl}/${id}/featured`, { featured });
    return response.data;
  }
  
  /**
   * Update vehicle status (available, sold, reserved, coming soon)
   */
  public async updateVehicleStatus(id: string, status: Vehicle['status']): Promise<Vehicle> {
    const response = await apiClient.patch<Vehicle>(`${this.baseUrl}/${id}/status`, { status });
    return response.data;
  }
}

// Create singleton instance
const vehiclesApi = new VehiclesApiService();
export default vehiclesApi;
