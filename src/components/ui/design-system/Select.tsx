'use client';

import React, { forwardRef, SelectHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { ChevronDown } from 'react-icons/hi';

const selectVariants = cva(
  "flex w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
  {
    variants: {
      variant: {
        default: "",
        filled: "bg-neutral-100 border-neutral-200",
        flushed: "border-x-0 border-t-0 border-b-neutral-300 rounded-none px-0 focus-visible:border-b-primary-500",
        outline: "border border-neutral-300",
        unstyled: "border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
      },
      size: {
        default: "h-10",
        xs: "h-7 text-xs px-2",
        sm: "h-8 text-sm",
        lg: "h-12 text-base px-4",
        xl: "h-14 text-lg px-5",
      },
      state: {
        default: "",
        error: "border-accent-red focus-visible:ring-accent-red/25",
        success: "border-accent-green focus-visible:ring-accent-green/25",
        warning: "border-accent-yellow focus-visible:ring-accent-yellow/25",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
      fullWidth: false,
    },
  }
);

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {
  options?: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  placeholder?: string;
  leftElement?: React.ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    variant, 
    size, 
    state, 
    fullWidth,
    leftElement,
    options,
    placeholder,
    children,
    ...props 
  }, ref) => {
    // If we have a left element, we need to wrap the select
    if (leftElement) {
      return (
        <div className="relative flex items-center">
          <div className="absolute left-3 flex items-center pointer-events-none text-neutral-500">
            {leftElement}
          </div>
          
          <select
            className={cn(
              selectVariants({ variant, size, state, fullWidth, className }),
              "pl-10 pr-10"
            )}
            ref={ref}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options?.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
            {children}
          </select>
          
          <div className="absolute right-3 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-neutral-500" />
          </div>
        </div>
      );
    }
    
    // Regular select without left element
    return (
      <div className="relative">
        <select
          className={cn(selectVariants({ variant, size, state, fullWidth, className }), "pr-10")}
          ref={ref}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options?.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
          {children}
        </select>
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-neutral-500" />
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select, selectVariants };
