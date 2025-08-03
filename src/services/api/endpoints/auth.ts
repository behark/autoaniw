import apiClient from '../client';
import {
  LoginCredentials,
  LoginResponse,
  User,
  ChangePasswordDto
} from '../types';

/**
 * Auth API service
 * Handles all authentication-related API calls including login, logout, session management
 */
class AuthApiService {
  private baseUrl = '/auth';
  private tokenKey = 'autoani_token';
  private userKey = 'autoani_user';
  
  /**
   * Login with email and password
   */
  public async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(`${this.baseUrl}/login`, credentials);
    
    // Store token and user info in localStorage
    if (typeof window !== 'undefined' && response.data) {
      localStorage.setItem(this.tokenKey, response.data.token);
      localStorage.setItem(this.userKey, JSON.stringify(response.data.user));
    }
    
    return response.data;
  }
  
  /**
   * Logout current user
   */
  public async logout(): Promise<void> {
    // Clear token and user data from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    }
    
    // Optional: Call logout endpoint to invalidate token on server
    try {
      await apiClient.post(`${this.baseUrl}/logout`);
    } catch (error) {
      // Even if server logout fails, we still clear local storage
      console.error('Error during logout:', error);
    }
  }
  
  /**
   * Check if user is authenticated
   */
  public isAuthenticated(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }
  
  /**
   * Get current user from localStorage
   */
  public getCurrentUser(): User | null {
    if (typeof window === 'undefined') {
      return null;
    }
    
    const userJson = localStorage.getItem(this.userKey);
    
    if (!userJson) {
      return null;
    }
    
    try {
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  
  /**
   * Get current authentication token
   */
  public getToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    
    return localStorage.getItem(this.tokenKey);
  }
  
  /**
   * Verify current token is valid
   */
  public async verifyToken(): Promise<boolean> {
    try {
      const response = await apiClient.get<{ valid: boolean }>(`${this.baseUrl}/verify-token`);
      return response.data.valid;
    } catch (error) {
      // If verification fails, clear auth data
      if (typeof window !== 'undefined') {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
      }
      return false;
    }
  }
  
  /**
   * Get current user profile from API
   */
  public async getUserProfile(): Promise<User> {
    const response = await apiClient.get<User>(`${this.baseUrl}/profile`);
    
    // Update stored user data
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.userKey, JSON.stringify(response.data));
    }
    
    return response.data;
  }
  
  /**
   * Update user profile
   */
  public async updateProfile(profileData: Partial<User>): Promise<User> {
    const response = await apiClient.patch<User>(`${this.baseUrl}/profile`, profileData);
    
    // Update stored user data
    if (typeof window !== 'undefined') {
      const currentUser = this.getCurrentUser();
      const updatedUser = { ...currentUser, ...response.data };
      localStorage.setItem(this.userKey, JSON.stringify(updatedUser));
    }
    
    return response.data;
  }
  
  /**
   * Change user password
   */
  public async changePassword(passwordData: ChangePasswordDto): Promise<{ success: boolean }> {
    const response = await apiClient.post<{ success: boolean }>(`${this.baseUrl}/change-password`, passwordData);
    return response.data;
  }
  
  /**
   * Request password reset
   */
  public async requestPasswordReset(email: string): Promise<{ success: boolean }> {
    const response = await apiClient.post<{ success: boolean }>(`${this.baseUrl}/request-reset`, { email });
    return response.data;
  }
  
  /**
   * Reset password with token
   */
  public async resetPassword(token: string, newPassword: string): Promise<{ success: boolean }> {
    const response = await apiClient.post<{ success: boolean }>(`${this.baseUrl}/reset-password`, {
      token,
      newPassword
    });
    return response.data;
  }
}

// Create singleton instance
const authApi = new AuthApiService();
export default authApi;
