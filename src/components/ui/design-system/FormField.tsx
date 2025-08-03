'use client';

import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { AlertCircle, CheckCircle, HelpCircle } from 'react-icons/hi';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  htmlFor?: string;
  error?: string;
  success?: string;
  helpText?: string;
  required?: boolean;
  optional?: boolean;
  fullWidth?: boolean;
}

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ 
    className,
    children,
    label,
    htmlFor,
    error,
    success,
    helpText,
    required,
    optional,
    fullWidth = true,
    ...props
  }, ref) => {
    // Determine state for styling
    const hasError = !!error;
    const hasSuccess = !!success && !hasError;
    
    return (
      <div 
        ref={ref}
        className={cn(
          "space-y-2",
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {label && (
          <div className="flex items-center justify-between">
            <label 
              htmlFor={htmlFor}
              className={cn(
                "text-sm font-medium",
                hasError ? "text-accent-red" : "text-neutral-700"
              )}
            >
              {label}
              {required && <span className="ml-1 text-accent-red">*</span>}
              {optional && <span className="ml-1 text-neutral-400 text-xs font-normal">(optional)</span>}
            </label>
          </div>
        )}
        
        {children}
        
        {/* Error, success, or help text */}
        {(error || success || helpText) && (
          <div className="flex items-start mt-1.5">
            {hasError && (
              <AlertCircle className="h-4 w-4 text-accent-red mr-1.5 flex-shrink-0 mt-0.5" />
            )}
            
            {hasSuccess && (
              <CheckCircle className="h-4 w-4 text-accent-green mr-1.5 flex-shrink-0 mt-0.5" />
            )}
            
            {!hasError && !hasSuccess && helpText && (
              <HelpCircle className="h-4 w-4 text-neutral-400 mr-1.5 flex-shrink-0 mt-0.5" />
            )}
            
            <span 
              className={cn(
                "text-sm",
                hasError ? "text-accent-red" : hasSuccess ? "text-accent-green" : "text-neutral-500"
              )}
            >
              {error || success || helpText}
            </span>
          </div>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export { FormField };
