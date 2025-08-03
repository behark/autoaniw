'use client';

import React from 'react';
import { Loader2 } from 'react-icons/hi';

interface LoadingProps {
  message?: string;
  className?: string;
}

/**
 * Spinner loading indicator
 */
export const LoadingSpinner: React.FC<LoadingProps> = ({ 
  message = 'Loading...', 
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
      <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
      {message && <p className="text-gray-500 text-sm">{message}</p>}
    </div>
  );
};

/**
 * Full page loading overlay
 */
export const LoadingOverlay: React.FC<LoadingProps> = ({ 
  message = 'Loading...', 
  className = ''
}) => {
  return (
    <div className={`fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center ${className}`}>
      <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
      {message && <p className="text-gray-700 font-medium">{message}</p>}
    </div>
  );
};

/**
 * Button with loading state
 */
export const LoadingButton: React.FC<{
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}> = ({ 
  isLoading, 
  loadingText = 'Loading...', 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  type = 'button'
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`px-4 py-2 font-medium rounded-md relative ${isLoading ? 'text-transparent' : ''} ${className}`}
    >
      {children}
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          <span className="text-current">{loadingText}</span>
        </div>
      )}
    </button>
  );
};

/**
 * Loading skeleton for content that's being loaded
 */
export const Skeleton: React.FC<{
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  height?: string | number;
  width?: string | number;
}> = ({ 
  className = '', 
  variant = 'rectangular',
  height,
  width 
}) => {
  const baseClasses = "animate-pulse bg-gray-200";
  
  const variantClasses = {
    rectangular: "rounded",
    circular: "rounded-full",
    text: "rounded h-4"
  };
  
  const style: React.CSSProperties = {};
  if (height) style.height = height;
  if (width) style.width = width;
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

/**
 * Loading state for a list of items
 */
export const SkeletonList: React.FC<{
  count: number;
  height?: string | number;
  className?: string;
}> = ({ count, height = '1rem', className = '' }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            height={height}
            className={`mb-2 ${className}`}
          />
        ))}
    </>
  );
};

/**
 * Component to show progress during file uploads
 */
export const UploadProgress: React.FC<{
  progress: number;
  fileName?: string;
  className?: string;
}> = ({ progress, fileName, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {fileName && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700 truncate">{fileName}</span>
          <span className="text-sm font-medium text-gray-700">{progress}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
