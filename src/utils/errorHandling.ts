import { ApiError } from '../services/api/client';

/**
 * Format API error messages for user-friendly display
 */
export const formatApiError = (error: ApiError | null): string => {
  if (!error) return 'An unknown error occurred';

  // Handle different error status codes
  switch (error.status) {
    case 400:
      return error.message || 'Invalid request. Please check your inputs.';
    case 401:
      return 'Authentication required. Please log in again.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 409:
      return 'Conflict with existing data. Please refresh and try again.';
    case 422:
      return error.message || 'Validation failed. Please check your inputs.';
    case 429:
      return 'Too many requests. Please try again later.';
    case 500:
      return 'A server error occurred. Please try again later.';
    case 503:
      return 'Service unavailable. Please try again later.';
    case 0:
      return 'Network error. Please check your internet connection.';
    default:
      return error.message || 'An unexpected error occurred';
  }
};

/**
 * Format validation errors from API
 * Returns an object with field names as keys and error messages as values
 */
export const formatValidationErrors = (
  error: ApiError | null
): Record<string, string> | null => {
  if (!error || !error.errors) return null;

  const formattedErrors: Record<string, string> = {};
  
  // Convert array of errors per field to single string per field
  Object.entries(error.errors).forEach(([field, messages]) => {
    formattedErrors[field] = Array.isArray(messages) ? messages[0] : messages as string;
  });
  
  return formattedErrors;
};

/**
 * Check if an error is a network error
 */
export const isNetworkError = (error: ApiError | null): boolean => {
  return error?.status === 0;
};

/**
 * Check if an error is an authentication error
 */
export const isAuthError = (error: ApiError | null): boolean => {
  return error?.status === 401;
};

/**
 * Show an error toast with a formatted error message
 * Requires a toast library like react-hot-toast or react-toastify
 */
export const showErrorToast = (
  error: ApiError | null,
  toast: { error: (message: string) => void }
): void => {
  toast.error(formatApiError(error));
};
