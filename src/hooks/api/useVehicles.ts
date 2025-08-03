import { useState, useCallback, useEffect } from 'react';
import { useApi, usePaginatedApi } from './useApi';
import vehiclesApi from '../../services/api/endpoints/vehicles';
import { Vehicle, VehicleFilter, CreateVehicleDto, UpdateVehicleDto, PaginatedResponse } from '../../services/api/types';

// Default filter values
const defaultFilters: VehicleFilter = {
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

/**
 * Hook for fetching vehicles with pagination and filtering
 */
export function useVehicles(initialFilters?: Partial<VehicleFilter>) {
  const filters = { ...defaultFilters, ...initialFilters };
  
  return usePaginatedApi<PaginatedResponse<Vehicle>, VehicleFilter>(
    vehiclesApi.getVehicles.bind(vehiclesApi),
    filters
  );
}

/**
 * Hook for fetching a single vehicle by ID
 */
export function useVehicle(id?: string) {
  const { data, isLoading, error, execute } = useApi(
    vehiclesApi.getVehicleById.bind(vehiclesApi),
    !!id,
    id ? [id] : undefined as any
  );

  const refresh = useCallback(() => {
    if (id) {
      execute(id);
    }
  }, [id, execute]);

  // Refetch when ID changes
  useEffect(() => {
    if (id) {
      execute(id);
    }
  }, [id, execute]);

  return {
    vehicle: data as Vehicle | null,
    isLoading,
    error,
    refresh,
  };
}

/**
 * Hook for fetching featured vehicles
 */
export function useFeaturedVehicles(limit: number = 6) {
  const { data, isLoading, error, execute } = useApi(
    vehiclesApi.getFeaturedVehicles.bind(vehiclesApi),
    true,
    [limit]
  );

  const refresh = useCallback(() => {
    execute(limit);
  }, [limit, execute]);

  return {
    vehicles: data as Vehicle[] | null,
    isLoading,
    error,
    refresh,
  };
}

/**
 * Hook for fetching similar vehicles
 */
export function useSimilarVehicles(vehicleId?: string, limit: number = 3) {
  const { data, isLoading, error, execute } = useApi(
    vehiclesApi.getSimilarVehicles.bind(vehiclesApi),
    !!vehicleId,
    vehicleId ? [vehicleId, limit] : undefined as any
  );

  const refresh = useCallback(() => {
    if (vehicleId) {
      execute(vehicleId, limit);
    }
  }, [vehicleId, limit, execute]);

  return {
    vehicles: data as Vehicle[] | null,
    isLoading,
    error,
    refresh,
  };
}

/**
 * Hook for creating a new vehicle
 */
export function useCreateVehicle() {
  const [progress, setProgress] = useState<number>(0);
  
  const { isLoading, error, execute } = useApi<Vehicle, [CreateVehicleDto, ((percentage: number) => void) | undefined]>(
    vehiclesApi.createVehicle.bind(vehiclesApi)
  );

  const createVehicle = useCallback(
    async (vehicleData: CreateVehicleDto) => {
      setProgress(0);
      return execute(vehicleData, (percentage) => setProgress(percentage));
    },
    [execute]
  );

  return {
    createVehicle,
    isLoading,
    error,
    progress,
  };
}

/**
 * Hook for updating an existing vehicle
 */
export function useUpdateVehicle(id?: string) {
  const [progress, setProgress] = useState<number>(0);
  
  const { isLoading, error, execute } = useApi<Vehicle, [string, UpdateVehicleDto, ((percentage: number) => void) | undefined]>(
    vehiclesApi.updateVehicle.bind(vehiclesApi)
  );

  const updateVehicle = useCallback(
    async (vehicleData: UpdateVehicleDto) => {
      if (!id) {
        throw new Error('Vehicle ID is required');
      }
      setProgress(0);
      return execute(id, vehicleData, (percentage) => setProgress(percentage));
    },
    [id, execute]
  );

  return {
    updateVehicle,
    isLoading,
    error,
    progress,
  };
}

/**
 * Hook for deleting a vehicle
 */
export function useDeleteVehicle() {
  const { isLoading, error, execute } = useApi<void, [string]>(
    vehiclesApi.deleteVehicle.bind(vehiclesApi)
  );

  return {
    deleteVehicle: execute,
    isLoading,
    error,
  };
}

/**
 * Hook for fetching vehicle brands for filtering
 */
export function useVehicleBrands() {
  const { data, isLoading, error, execute } = useApi<string[], []>(
    vehiclesApi.getVehicleBrands.bind(vehiclesApi),
    true,
    []
  );

  return {
    brands: data || [],
    isLoading,
    error,
    refresh: execute,
  };
}

/**
 * Hook for fetching vehicle models for a specific brand
 */
export function useVehicleModels(brand?: string) {
  const { data, isLoading, error, execute } = useApi<string[], [string]>(
    vehiclesApi.getVehicleModels.bind(vehiclesApi),
    !!brand,
    brand ? [brand] : undefined as any
  );

  useEffect(() => {
    if (brand) {
      execute(brand);
    }
  }, [brand, execute]);

  return {
    models: data || [],
    isLoading,
    error,
    refresh: () => brand && execute(brand),
  };
}

/**
 * Hook for fetching vehicle years for filtering
 */
export function useVehicleYears() {
  const { data, isLoading, error, execute } = useApi<string[], []>(
    vehiclesApi.getVehicleYears.bind(vehiclesApi),
    true,
    []
  );

  return {
    years: data || [],
    isLoading,
    error,
    refresh: execute,
  };
}

/**
 * Hook for updating vehicle images
 */
export function useVehicleImageUpdate(vehicleId?: string) {
  const [progress, setProgress] = useState<number>(0);
  
  const { isLoading, error, execute } = useApi<Vehicle, [string, File[], any, ((percentage: number) => void) | undefined]>(
    vehiclesApi.updateVehicleImages.bind(vehiclesApi)
  );

  const updateImages = useCallback(
    async (images: File[], existingImages: any) => {
      if (!vehicleId) {
        throw new Error('Vehicle ID is required');
      }
      setProgress(0);
      return execute(vehicleId, images, existingImages, (percentage) => setProgress(percentage));
    },
    [vehicleId, execute]
  );

  return {
    updateImages,
    isLoading,
    error,
    progress,
  };
}

/**
 * Hook for toggling vehicle featured status
 */
export function useToggleVehicleFeatured() {
  const { isLoading, error, execute } = useApi<Vehicle, [string, boolean]>(
    vehiclesApi.toggleFeaturedStatus.bind(vehiclesApi)
  );

  return {
    toggleFeatured: execute,
    isLoading,
    error,
  };
}

/**
 * Hook for updating vehicle status
 */
export function useUpdateVehicleStatus() {
  const { isLoading, error, execute } = useApi<Vehicle, [string, Vehicle['status']]>(
    vehiclesApi.updateVehicleStatus.bind(vehiclesApi)
  );

  return {
    updateStatus: execute,
    isLoading,
    error,
  };
}
