'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import ErrorBoundary from '../../ui/feedback/ErrorBoundary';
import { LoadingButton, LoadingSpinner, UploadProgress } from '../../ui/feedback/LoadingStates';
import { formatApiError, formatValidationErrors } from '../../../utils/errorHandling';
import { useVehicle, useCreateVehicle, useUpdateVehicle, useVehicleBrands } from '../../../hooks/api';
import { Vehicle } from '../../../services/api/types';

// This component demonstrates how to integrate the API hooks with the UI components
// It's a simplified version of what your actual VehicleForm would look like

interface VehicleFormProps {
  vehicleId?: string; // If provided, we're editing an existing vehicle
}

export default function VehicleFormIntegration({ vehicleId }: VehicleFormProps) {
  const router = useRouter();
  const isEditMode = !!vehicleId;
  
  // State for form values
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    title: '',
    brand: '',
    model: '',
    year: '',
    price: '',
    description: '',
    status: 'available',
    featured: false,
    specs: {},
    features: []
  });
  
  // State for images
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  
  // State for validation errors
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // API hooks
  const { vehicle, isLoading: isLoadingVehicle, error: vehicleError } = useVehicle(vehicleId);
  const { createVehicle, isLoading: isCreating, error: createError, progress: createProgress } = useCreateVehicle();
  const { updateVehicle, isLoading: isUpdating, error: updateError, progress: updateProgress } = useUpdateVehicle(vehicleId);
  const { brands, isLoading: isLoadingBrands } = useVehicleBrands();
  
  // Populate form with vehicle data when in edit mode
  useEffect(() => {
    if (vehicle) {
      setFormData({
        title: vehicle.title,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
        description: vehicle.description || '',
        status: vehicle.status,
        featured: vehicle.featured || false,
        specs: vehicle.specs || {},
        features: vehicle.features || []
      });
      
      if (vehicle.images) {
        setExistingImages(vehicle.images);
      }
    }
  }, [vehicle]);
  
  // Handle API errors
  useEffect(() => {
    const error = createError || updateError;
    if (error) {
      toast.error(formatApiError(error));
      
      // Handle validation errors
      const fieldErrors = formatValidationErrors(error);
      if (fieldErrors) {
        setValidationErrors(fieldErrors);
      }
    }
  }, [createError, updateError]);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };
  
  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages((prev) => [...prev, ...filesArray]);
    }
  };
  
  // Remove selected image
  const removeSelectedImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };
  
  // Remove existing image
  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    
    try {
      if (isEditMode) {
        // Update existing vehicle
        const result = await updateVehicle({
          ...formData,
          images: selectedImages,
          existingImages
        });
        
        if (result.data) {
          toast.success('Vehicle updated successfully');
          router.push('/admin/vehicles');
        }
      } else {
        // Create new vehicle
        const result = await createVehicle({
          ...formData as any,
          images: selectedImages
        });
        
        if (result.data) {
          toast.success('Vehicle created successfully');
          router.push('/admin/vehicles');
        }
      }
    } catch (error) {
      // Error handling is done in the useEffect above
    }
  };
  
  // Conditional loading state
  if (isEditMode && isLoadingVehicle) {
    return <LoadingSpinner message="Loading vehicle data..." />;
  }
  
  // Handle vehicle not found in edit mode
  if (isEditMode && vehicleError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
        <h3 className="font-semibold">Error loading vehicle</h3>
        <p>{formatApiError(vehicleError)}</p>
        <button
          onClick={() => router.push('/admin/vehicles')}
          className="mt-2 px-4 py-2 bg-white border border-red-300 rounded text-sm"
        >
          Return to vehicles
        </button>
      </div>
    );
  }
  
  return (
    <ErrorBoundary
      onReset={() => {
        if (isEditMode) {
          router.refresh();
        } else {
          setFormData({
            title: '',
            brand: '',
            model: '',
            year: '',
            price: '',
            description: '',
            status: 'available',
            featured: false,
            specs: {},
            features: []
          });
          setSelectedImages([]);
          setExistingImages([]);
        }
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="col-span-full">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Vehicle Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                validationErrors.title ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter vehicle title"
              required
            />
            {validationErrors.title && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
            )}
          </div>

          {/* Brand */}
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <select
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                validationErrors.brand ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              required
            >
              <option value="">Select Brand</option>
              {isLoadingBrands ? (
                <option disabled>Loading brands...</option>
              ) : (
                brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))
              )}
            </select>
            {validationErrors.brand && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.brand}</p>
            )}
          </div>

          {/* Model */}
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                validationErrors.model ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter model"
              required
            />
            {validationErrors.model && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.model}</p>
            )}
          </div>

          {/* Year */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <input
              type="text"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                validationErrors.year ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter year"
              required
            />
            {validationErrors.year && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.year}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                validationErrors.price ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter price"
              required
            />
            {validationErrors.price && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.price}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="reserved">Reserved</option>
              <option value="coming soon">Coming Soon</option>
            </select>
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={!!formData.featured}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
              Featured Vehicle
            </label>
          </div>

          {/* Description */}
          <div className="col-span-full">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={4}
              className={`mt-1 block w-full px-3 py-2 border ${
                validationErrors.description ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter vehicle description"
            />
            {validationErrors.description && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">Images</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="images"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload files</span>
                    <input
                      id="images"
                      name="images"
                      type="file"
                      multiple
                      onChange={handleImageChange}
                      className="sr-only"
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            
            {/* Upload Progress */}
            {(isCreating || isUpdating) && (
              <UploadProgress 
                progress={isCreating ? createProgress : updateProgress} 
                className="mt-4"
              />
            )}

            {/* Selected Images Preview */}
            {selectedImages.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">New Images:</h4>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Selected ${index + 1}`}
                        className="h-24 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeSelectedImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Existing Images Preview (for edit mode) */}
            {existingImages.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Existing Images:</h4>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {existingImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.url}
                        alt={image.altText || `Image ${index + 1}`}
                        className="h-24 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/admin/vehicles')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <LoadingButton
            type="submit"
            isLoading={isCreating || isUpdating}
            loadingText={isEditMode ? 'Saving...' : 'Creating...'}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {isEditMode ? 'Save Changes' : 'Create Vehicle'}
          </LoadingButton>
        </div>
      </form>
    </ErrorBoundary>
  );
}
