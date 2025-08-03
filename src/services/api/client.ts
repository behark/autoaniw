import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Types
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// Environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
const API_TIMEOUT = 30000; // 30 seconds

/**
 * API Client class to handle HTTP requests with axios
 * Includes interceptors for authentication, error handling, and request/response transformations
 */
class ApiClient {
  private client: AxiosInstance;
  
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    this.setupInterceptors();
  }
  
  /**
   * Set up request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Get auth token from localStorage
        const token = typeof window !== 'undefined' 
          ? localStorage.getItem('autoani_token') 
          : null;
          
        // Add authorization header if token exists
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // Response interceptor
    this.client.interceptors.response.use(
      this.handleSuccessResponse,
      this.handleErrorResponse
    );
  }
  
  /**
   * Handle successful responses
   */
  private handleSuccessResponse(response: AxiosResponse): ApiResponse {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as Record<string, string>,
    };
  }
  
  /**
   * Handle error responses with consistent formatting
   */
  private handleErrorResponse(error: AxiosError): Promise<never> {
    if (error.response) {
      // Server responded with an error status
      const status = error.response.status;
      
      // Handle 401 Unauthorized - redirect to login
      if (status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('autoani_token');
        window.location.href = '/admin/login';
      }
      
      const apiError: ApiError = {
        status,
        message: (error.response.data as any)?.message || 'An error occurred',
        errors: (error.response.data as any)?.errors,
      };
      
      return Promise.reject(apiError);
    }
    
    if (error.request) {
      // Request was made but no response received (network issue)
      const apiError: ApiError = {
        status: 0,
        message: 'Network error: Unable to connect to server',
      };
      
      return Promise.reject(apiError);
    }
    
    // Something else caused the error
    const apiError: ApiError = {
      status: 0,
      message: error.message || 'An unexpected error occurred',
    };
    
    return Promise.reject(apiError);
  }
  
  /**
   * Make a GET request
   */
  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.get<T>(url, config);
  }
  
  /**
   * Make a POST request
   */
  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.post<T>(url, data, config);
  }
  
  /**
   * Make a PUT request
   */
  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.put<T>(url, data, config);
  }
  
  /**
   * Make a PATCH request
   */
  public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }
  
  /**
   * Make a DELETE request
   */
  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.delete<T>(url, config);
  }
  
  /**
   * Upload a file with progress tracking
   */
  public async uploadFile<T = any>(
    url: string, 
    file: File, 
    onProgress?: (percentage: number) => void,
    additionalData?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    // Append any additional data to the form
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }
    
    return this.client.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: onProgress 
        ? (progressEvent) => {
            const percentage = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
            onProgress(percentage);
          }
        : undefined,
    });
  }
  
  /**
   * Upload multiple files with progress tracking
   */
  public async uploadFiles<T = any>(
    url: string, 
    files: File[], 
    fieldName: string = 'files',
    onProgress?: (percentage: number) => void,
    additionalData?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    
    files.forEach((file, index) => {
      formData.append(`${fieldName}`, file);
    });
    
    // Append any additional data to the form
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });
    }
    
    return this.client.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: onProgress 
        ? (progressEvent) => {
            const percentage = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
            onProgress(percentage);
          }
        : undefined,
    });
  }
}

// Create singleton instance
const apiClient = new ApiClient();
export default apiClient;
