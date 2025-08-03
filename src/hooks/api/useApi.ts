import { useState, useCallback } from 'react';
import { ApiError } from '../../services/api/client';

type ApiFunction<T, P extends any[]> = (...params: P) => Promise<T>;
type ApiState<T> = {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
};

/**
 * Generic hook for handling API requests with loading, error states
 * @param apiFunction The API function to call
 * @param immediate Whether to call the API function immediately (with default params)
 * @param defaultParams Default parameters to use when calling the API function immediately
 */
export function useApi<T, P extends any[]>(
  apiFunction: ApiFunction<T, P>,
  immediate: boolean = false,
  defaultParams?: P
) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  });

  const execute = useCallback(
    async (...params: P) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const data = await apiFunction(...params);
        setState({ data, isLoading: false, error: null });
        return { data, error: null };
      } catch (error) {
        const apiError = error as ApiError;
        setState({ data: null, isLoading: false, error: apiError });
        return { data: null, error: apiError };
      }
    },
    [apiFunction]
  );

  // Execute immediately if requested
  useState(() => {
    if (immediate && defaultParams) {
      execute(...defaultParams);
    }
  });

  return {
    ...state,
    execute,
    // Helper to reset state
    reset: useCallback(() => {
      setState({ data: null, isLoading: false, error: null });
    }, []),
  };
}

/**
 * Hook for handling paginated API requests with filtering
 */
export function usePaginatedApi<T, F extends object>(
  apiFunction: (filters: F) => Promise<T>,
  defaultFilters: F
) {
  const [filters, setFilters] = useState<F>(defaultFilters);
  const { data, isLoading, error, execute } = useApi(apiFunction, true, [filters] as any);

  const updateFilters = useCallback(
    (newFilters: Partial<F>) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);
      execute(updatedFilters);
    },
    [filters, execute]
  );

  const refresh = useCallback(() => {
    execute(filters);
  }, [execute, filters]);

  return {
    data,
    isLoading,
    error,
    filters,
    updateFilters,
    refresh,
  };
}
