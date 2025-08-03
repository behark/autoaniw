'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { X, Plus, Upload, Camera, Trash2, Star } from 'react-icons/hi';
import ErrorBoundary from '../../ui/feedback/ErrorBoundary';
import { LoadingSpinner } from '../../ui/feedback/LoadingStates';
import { formatApiError, formatValidationErrors } from '../../../utils/errorHandling';
import { useVehicle, useCreateVehicle, useUpdateVehicle, useVehicleBrands, useVehicleModels, useVehicleYears } from '../../../hooks/api';
import { Vehicle } from '../../../services/api/types';
import { Button } from '../../ui/design-system/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../ui/design-system/Card';
import { Input } from '../../ui/design-system/Input';
import { FormField } from '../../ui/design-system/FormField';
import { Modal } from '../../ui/design-system/Modal';

interface VehicleFormProps {
  vehicleId?: string; // If provided, we're editing an existing vehicle
}

/**
 * Enhanced Vehicle Form using our design system components
 */
export default function EnhancedVehicleForm({ vehicleId }: VehicleFormProps) {
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
  
  // UI state management
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'basic' | 'details' | 'images'>('basic');
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);
  
  // Features state management
  const [newFeature, setNewFeature] = useState('');
  
  // Specs state management
  const [newSpec, setNewSpec] = useState({ name: '', value: '' });
  
  // API hooks
  const { vehicle, isLoading: isLoadingVehicle, error: vehicleError } = useVehicle(vehicleId);
  const { createVehicle, isLoading: isCreating, error: createError, progress: createProgress } = useCreateVehicle();
  const { updateVehicle, isLoading: isUpdating, error: updateError, progress: updateProgress } = useUpdateVehicle(vehicleId);
  const { brands, isLoading: isLoadingBrands } = useVehicleBrands();
  const { models, isLoading: isLoadingModels } = useVehicleModels(formData.brand || '');
  const { years, isLoading: isLoadingYears } = useVehicleYears(formData.brand || '', formData.model || '');
  
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
    setIsDirty(true);
    
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
    setIsDirty(true);
  };
  
  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages((prev) => [...prev, ...filesArray]);
      setIsDirty(true);
    }
  };
  
  // Add a new feature
  const addFeature = () => {
    if (newFeature.trim() && !formData.features?.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev, 
        features: [...(prev.features || []), newFeature.trim()]
      }));
      setNewFeature('');
      setIsDirty(true);
    }
  };
  
  // Remove a feature
  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: (prev.features || []).filter(f => f !== feature)
    }));
    setIsDirty(true);
  };
  
  // Add a new specification
  const addSpec = () => {
    if (newSpec.name.trim() && newSpec.value.trim()) {
      setFormData(prev => ({
        ...prev,
        specs: {
          ...(prev.specs || {}),
          [newSpec.name.trim()]: newSpec.value.trim()
        }
      }));
      setNewSpec({ name: '', value: '' });
      setIsDirty(true);
    }
  };
  
  // Remove a specification
  const removeSpec = (key: string) => {
    setFormData(prev => {
      const newSpecs = { ...(prev.specs || {}) };
      delete newSpecs[key];
      return { ...prev, specs: newSpecs };
    });
    setIsDirty(true);
  };
  
  // Remove selected image
  const removeSelectedImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setIsDirty(true);
  };
  
  // Remove existing image
  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    setIsDirty(true);
  };
  
  // Toggle featured status
  const toggleFeatured = () => {
    setFormData(prev => ({
      ...prev,
      featured: !prev.featured
    }));
    setIsDirty(true);
  };
  
  // Navigate back safely with confirmation if form is dirty
  const navigateBack = () => {
    if (isDirty) {
      setConfirmLeave(true);
    } else {
      router.push('/admin/vehicles');
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    
    try {
      if (isEditMode) {
        // Update existing vehicle
        const result = await updateVehicle({
          ...formData as any,
          images: selectedImages,
          existingImages
        });
        
        if (result.data) {
          toast.success('Vehicle updated successfully');
          setIsDirty(false);
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
          setIsDirty(false);
          router.push('/admin/vehicles');
        }
      }
    } catch (error) {
      // Error handling is done in the useEffect above
    }
  };
  
  // Conditional loading state
  if (isEditMode && isLoadingVehicle) {
    return (
      <Card variant="default" className="mb-8">
        <CardContent className="pt-6">
          <LoadingSpinner message="Loading vehicle data..." />
        </CardContent>
      </Card>
    );
  }
  
  // Handle vehicle not found in edit mode
  if (isEditMode && vehicleError) {
    return (
      <Card variant="default" className="border-accent-red/20 bg-accent-red/5">
        <CardHeader>
          <CardTitle className="text-accent-red">Error Loading Vehicle</CardTitle>
          <CardDescription>{formatApiError(vehicleError)}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            variant="outline"
            onClick={() => router.push('/admin/vehicles')}
          >
            Return to Vehicles
          </Button>
        </CardFooter>
      </Card>
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
      <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
        {/* Page header with title and actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              {isEditMode ? 'Edit Vehicle' : 'Add New Vehicle'}
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              {isEditMode ? 'Update vehicle details and images' : 'Create a new vehicle listing'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="default"
              onClick={navigateBack}
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant={formData.featured ? 'secondary' : 'ghost'}
              size="default"
              type="button"
              onClick={toggleFeatured}
              leftIcon={<Star className={formData.featured ? 'text-white' : 'text-neutral-400'} />}
            >
              {formData.featured ? 'Featured' : 'Mark as Featured'}
            </Button>
            <Button
              variant="default"
              size="default"
              type="submit"
              isLoading={isCreating || isUpdating}
              loadingText={isEditMode ? 'Saving...' : 'Creating...'}
            >
              {isEditMode ? 'Save Changes' : 'Create Vehicle'}
            </Button>
          </div>
        </div>
        
        {/* Tab navigation */}
        <div className="border-b border-neutral-200">
          <nav className="-mb-px flex space-x-8">
            {['basic', 'details', 'images'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab as any)}
                className={`
                  whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab 
                    ? 'border-primary-500 text-primary-600' 
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'}
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Information
              </button>
            ))}
          </nav>
        </div>
        
        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <Card variant="default" padding="lg">
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <FormField 
                  label="Vehicle Title" 
                  htmlFor="title" 
                  error={validationErrors.title}
                  required
                  className="col-span-full"
                >
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter vehicle title"
                    state={validationErrors.title ? 'error' : 'default'}
                    fullWidth
                  />
                </FormField>

                {/* Brand */}
                <FormField 
                  label="Brand" 
                  htmlFor="brand" 
                  error={validationErrors.brand}
                  required
                >
                  <select
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className={`w-full h-10 rounded-md border ${
                      validationErrors.brand ? 'border-accent-red' : 'border-neutral-300'
                    } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400`}
                  >
                    <option value="">Select Brand</option>
                    {isLoadingBrands ? (
                      <option disabled>Loading brands...</option>
                    ) : (
                      brands?.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))
                    )}
                  </select>
                </FormField>

                {/* Model */}
                <FormField 
                  label="Model" 
                  htmlFor="model" 
                  error={validationErrors.model}
                  required
                >
                  <select
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className={`w-full h-10 rounded-md border ${
                      validationErrors.model ? 'border-accent-red' : 'border-neutral-300'
                    } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400`}
                    disabled={!formData.brand}
                  >
                    <option value="">Select Model</option>
                    {isLoadingModels ? (
                      <option disabled>Loading models...</option>
                    ) : (
                      models?.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))
                    )}
                  </select>
                </FormField>

                {/* Year */}
                <FormField 
                  label="Year" 
                  htmlFor="year" 
                  error={validationErrors.year}
                  required
                >
                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className={`w-full h-10 rounded-md border ${
                      validationErrors.year ? 'border-accent-red' : 'border-neutral-300'
                    } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400`}
                    disabled={!formData.model}
                  >
                    <option value="">Select Year</option>
                    {isLoadingYears ? (
                      <option disabled>Loading years...</option>
                    ) : (
                      years?.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))
                    )}
                  </select>
                </FormField>

                {/* Price */}
                <FormField 
                  label="Price" 
                  htmlFor="price" 
                  error={validationErrors.price}
                  required
                >
                  <Input
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    state={validationErrors.price ? 'error' : 'default'}
                    fullWidth
                    leftElement="$"
                  />
                </FormField>

                {/* Status */}
                <FormField 
                  label="Status" 
                  htmlFor="status" 
                  required
                >
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="reserved">Reserved</option>
                    <option value="coming soon">Coming Soon</option>
                  </select>
                </FormField>

                {/* Description */}
                <FormField 
                  label="Description" 
                  htmlFor="description" 
                  error={validationErrors.description}
                  className="col-span-full"
                >
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full rounded-md border ${
                      validationErrors.description ? 'border-accent-red' : 'border-neutral-300'
                    } px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400`}
                    placeholder="Enter vehicle description"
                  />
                </FormField>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Features */}
            <Card variant="default" padding="lg">
              <CardHeader>
                <CardTitle>Vehicle Features</CardTitle>
                <CardDescription>Add key features that make this vehicle stand out</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Enter a feature"
                      fullWidth
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addFeature}
                      disabled={!newFeature.trim()}
                    >
                      Add
                    </Button>
                  </div>
                  
                  <div className="mt-4">
                    {formData.features && formData.features.length > 0 ? (
                      <ul className="space-y-2">
                        {formData.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center justify-between bg-neutral-50 px-3 py-2 rounded-md">
                            <span>{feature}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFeature(feature)}
                              className="text-accent-red"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-neutral-500 italic">No features added yet</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card variant="default" padding="lg">
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
                <CardDescription>Add technical specifications and details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={newSpec.name}
                      onChange={(e) => setNewSpec({...newSpec, name: e.target.value})}
                      placeholder="Name (e.g. Engine)"
                      fullWidth
                    />
                    <Input
                      value={newSpec.value}
                      onChange={(e) => setNewSpec({...newSpec, value: e.target.value})}
                      placeholder="Value (e.g. V8 5.0L)"
                      fullWidth
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addSpec}
                    fullWidth
                    disabled={!newSpec.name.trim() || !newSpec.value.trim()}
                  >
                    Add Specification
                  </Button>
                  
                  <div className="mt-4">
                    {formData.specs && Object.keys(formData.specs).length > 0 ? (
                      <ul className="space-y-2">
                        {Object.entries(formData.specs).map(([key, value]) => (
                          <li key={key} className="flex items-center justify-between bg-neutral-50 px-3 py-2 rounded-md">
                            <div>
                              <span className="font-medium">{key}:</span> {value}
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSpec(key)}
                              className="text-accent-red"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-neutral-500 italic">No specifications added yet</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Images Tab */}
        {activeTab === 'images' && (
          <Card variant="default" padding="lg">
            <CardHeader>
              <CardTitle>Vehicle Images</CardTitle>
              <CardDescription>
                Upload high-quality images of the vehicle
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Image uploader */}
              <div className="mb-6">
                <div className="flex items-center justify-center w-full">
                  <label 
                    htmlFor="dropzone-file" 
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer bg-neutral-50 hover:bg-neutral-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-neutral-400" />
                      <p className="mb-2 text-sm text-neutral-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-neutral-500">
                        PNG, JPG or WEBP (MAX. 5MB per image)
                      </p>
                    </div>
                    <input 
                      id="dropzone-file" 
                      type="file" 
                      multiple 
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
              
              {/* Image previews */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* New images */}
                {selectedImages.map((image, index) => (
                  <div key={`new-${index}`} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Selected ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSelectedImage(index)}
                      className="absolute top-2 right-2 bg-neutral-900/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <p className="mt-1 text-xs text-neutral-500 truncate">
                      {image.name}
                    </p>
                  </div>
                ))}
                
                {/* Existing images */}
                {existingImages.map((image, index) => (
                  <div key={`existing-${index}`} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
                      <img
                        src={image.url}
                        alt={image.altText || `Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute top-2 right-2 bg-neutral-900/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <p className="mt-1 text-xs text-neutral-500 truncate">
                      {image.name || `Image ${index + 1}`}
                    </p>
                  </div>
                ))}
              </div>
              
              {selectedImages.length === 0 && existingImages.length === 0 && (
                <div className="text-center py-10 text-neutral-500">
                  <Camera className="mx-auto h-12 w-12 text-neutral-400 mb-3" />
                  <p>No images uploaded yet</p>
                  <p className="text-sm mt-1">Images will appear here after uploading</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </form>
      
      {/* Confirm Leave Modal */}
      <Modal
        isOpen={confirmLeave}
        onClose={() => setConfirmLeave(false)}
        title="Unsaved Changes"
        description="You have unsaved changes. Are you sure you want to leave?"
        footer={
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setConfirmLeave(false)}
            >
              Continue Editing
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setConfirmLeave(false);
                router.push('/admin/vehicles');
              }}
            >
              Discard Changes
            </Button>
          </div>
        }
      >
        <p>If you leave this page, any unsaved changes will be lost.</p>
      </Modal>
      
      {/* Media Manager Modal */}
      <Modal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        title="Media Manager"
        size="full"
      >
        <p>Media manager content would go here</p>
      </Modal>
    </ErrorBoundary>
  );
}
