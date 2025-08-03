'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const inputVariants = cva(
  "flex rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    size, 
    state, 
    fullWidth,
    leftElement,
    rightElement,
    type = 'text',
    ...props 
  }, ref) => {
    // If we have left/right elements, we need to wrap the input
    if (leftElement || rightElement) {
      return (
        <div className="relative flex items-center">
          {leftElement && (
            <div className="absolute left-3 flex items-center pointer-events-none text-neutral-500">
              {leftElement}
            </div>
          )}
          
          <input
            type={type}
            className={cn(
              inputVariants({ variant, size, state, fullWidth, className }),
              leftElement && "pl-10",
              rightElement && "pr-10"
            )}
            ref={ref}
            {...props}
          />
          
          {rightElement && (
            <div className="absolute right-3 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
      );
    }
    
    // Regular input without elements
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size, state, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
