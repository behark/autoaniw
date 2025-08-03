import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from './useApi';
import authApi from '../../services/api/endpoints/auth';
import { LoginCredentials, LoginResponse, User, ChangePasswordDto } from '../../services/api/types';

/**
 * Hook for handling user authentication state
 */
export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Initialize auth state from localStorage (client-side only)
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }
    
    const checkAuth = async () => {
      setIsLoading(true);
      const isAuth = authApi.isAuthenticated();
      setIsAuthenticated(isAuth);
      
      if (isAuth) {
        const currentUser = authApi.getCurrentUser();
        setUser(currentUser);
        
        // Optionally verify the token with the backend
        try {
          const isValid = await authApi.verifyToken();
          if (!isValid) {
            // Token is invalid, logout
            setIsAuthenticated(false);
            setUser(null);
            authApi.logout();
          }
        } catch (error) {
          console.error('Error verifying token:', error);
          // Token verification failed, logout
          setIsAuthenticated(false);
          setUser(null);
          authApi.logout();
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  /**
   * Login handler
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      const response = await authApi.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      setIsLoading(false);
      return { 
        success: false, 
        error: error.message || 'Invalid email or password'
      };
    }
  }, []);
  
  /**
   * Logout handler
   */
  const logout = useCallback(async (redirectTo: string = '/admin/login'): Promise<void> => {
    setIsLoading(true);
    
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      
      // Redirect after logout
      if (redirectTo) {
        router.push(redirectTo);
      }
    }
  }, [router]);
  
  /**
   * Update user profile
   */
  const updateProfile = useCallback(async (profileData: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      const updatedUser = await authApi.updateProfile(profileData);
      setUser(updatedUser);
      setIsLoading(false);
      return { success: true };
    } catch (error: any) {
      setIsLoading(false);
      return { 
        success: false, 
        error: error.message || 'Failed to update profile'
      };
    }
  }, []);
  
  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateProfile,
    refreshUser: async () => {
      if (isAuthenticated) {
        try {
          const userData = await authApi.getUserProfile();
          setUser(userData);
          return userData;
        } catch (error) {
          console.error('Error refreshing user data:', error);
        }
      }
      return null;
    }
  };
}

/**
 * Hook for handling password changes
 */
export function useChangePassword() {
  const { execute, isLoading, error } = useApi<{ success: boolean }, [ChangePasswordDto]>(
    authApi.changePassword.bind(authApi)
  );
  
  return {
    changePassword: execute,
    isLoading,
    error
  };
}

/**
 * Hook for handling password reset requests
 */
export function usePasswordReset() {
  const requestReset = useApi<{ success: boolean }, [string]>(
    authApi.requestPasswordReset.bind(authApi)
  );
  
  const resetPassword = useApi<{ success: boolean }, [string, string]>(
    authApi.resetPassword.bind(authApi)
  );
  
  return {
    requestPasswordReset: requestReset.execute,
    isRequestLoading: requestReset.isLoading,
    requestError: requestReset.error,
    
    resetPassword: resetPassword.execute,
    isResetLoading: resetPassword.isLoading,
    resetError: resetPassword.error
  };
}

/**
 * Hook that redirects to login if user is not authenticated
 * Use this on protected pages
 */
export function useRequireAuth(redirectTo: string = '/admin/login') {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);
  
  return { isAuthenticated, isLoading };
}
