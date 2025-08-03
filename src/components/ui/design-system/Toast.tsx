'use client';

import React from 'react';
import { Toaster as HotToaster } from 'react-hot-toast';
import { CheckCircle, AlertCircle, XCircle, Info } from 'react-icons/hi';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "bg-white border-neutral-200",
        success: "bg-accent-green/10 border-accent-green/20 text-accent-green-900",
        error: "bg-accent-red/10 border-accent-red/20 text-accent-red-900",
        warning: "bg-accent-yellow/10 border-accent-yellow/20 text-accent-yellow-900",
        info: "bg-primary-50 border-primary-100 text-primary-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ToastProps extends VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({ 
  title, 
  description, 
  icon, 
  action, 
  variant = "default", 
  className 
}) => {
  // Determine icon based on variant if none provided
  let iconToRender = icon;
  
  if (!icon) {
    switch (variant) {
      case 'success':
        iconToRender = <CheckCircle className="h-5 w-5 text-accent-green" />;
        break;
      case 'error':
        iconToRender = <XCircle className="h-5 w-5 text-accent-red" />;
        break;
      case 'warning':
        iconToRender = <AlertCircle className="h-5 w-5 text-accent-yellow" />;
        break;
      case 'info':
        iconToRender = <Info className="h-5 w-5 text-primary-500" />;
        break;
      default:
        iconToRender = null;
    }
  }

  return (
    <div className={cn(toastVariants({ variant }), className)}>
      {iconToRender && (
        <div className="flex-shrink-0">{iconToRender}</div>
      )}
      <div className="flex-1">
        {title && (
          <div className="font-medium">
            {title}
          </div>
        )}
        {description && (
          <div className="text-sm opacity-90">
            {description}
          </div>
        )}
      </div>
      {action}
    </div>
  );
};

// Customized Toaster component with our styling preferences
export const Toaster: React.FC = () => {
  return (
    <HotToaster
      position="top-right"
      gutter={12}
      toastOptions={{
        duration: 5000,
        style: {
          background: 'transparent',
          border: 'none',
          padding: 0,
          boxShadow: 'none',
          overflow: 'visible',
          maxWidth: '100%',
          width: 'auto',
        },
        success: {
          icon: null,
          style: {
            background: 'transparent',
            border: 'none',
            padding: 0,
          },
        },
        error: {
          icon: null,
          style: {
            background: 'transparent',
            border: 'none',
            padding: 0,
          },
        },
      }}
    />
  );
};

// Toast service utility
type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default';

interface ToastService {
  show: (props: ToastProps) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

// Re-export toast from react-hot-toast to maintain compatibility
export { toast } from 'react-hot-toast';

// Enhanced toast utility with our styled versions
import { toast as hotToast } from 'react-hot-toast';

export const enhancedToast: ToastService = {
  show: ({ title, description, icon, action, variant }) => {
    hotToast.custom(
      (t) => (
        <Toast
          title={title}
          description={description}
          icon={icon}
          action={action}
          variant={variant}
          className={t.visible ? 'animate-enter' : 'animate-leave'}
        />
      ),
      { id: `toast-${Date.now()}` }
    );
  },
  success: (message: string, title?: string) => {
    hotToast.custom(
      (t) => (
        <Toast
          title={title || 'Success'}
          description={message}
          variant="success"
          className={t.visible ? 'animate-enter' : 'animate-leave'}
        />
      ),
      { id: `success-${Date.now()}` }
    );
  },
  error: (message: string, title?: string) => {
    hotToast.custom(
      (t) => (
        <Toast
          title={title || 'Error'}
          description={message}
          variant="error"
          className={t.visible ? 'animate-enter' : 'animate-leave'}
        />
      ),
      { id: `error-${Date.now()}` }
    );
  },
  warning: (message: string, title?: string) => {
    hotToast.custom(
      (t) => (
        <Toast
          title={title || 'Warning'}
          description={message}
          variant="warning"
          className={t.visible ? 'animate-enter' : 'animate-leave'}
        />
      ),
      { id: `warning-${Date.now()}` }
    );
  },
  info: (message: string, title?: string) => {
    hotToast.custom(
      (t) => (
        <Toast
          title={title || 'Information'}
          description={message}
          variant="info"
          className={t.visible ? 'animate-enter' : 'animate-leave'}
        />
      ),
      { id: `info-${Date.now()}` }
    );
  },
};
