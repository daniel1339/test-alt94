import { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  className,
  disabled,
  children,
  ...props 
}: ButtonProps) {
  const baseClasses = [
    'inline-flex items-center justify-center',
    'font-medium transition-all',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'border border-transparent',
    'cursor-pointer'
  ].join(' ');
  
  const variants = {
    primary: [
      'text-white',
      'hover:opacity-90 focus:ring-2 focus:ring-offset-2',
      'active:opacity-95'
    ].join(' '),
    
    secondary: [
      'text-white',
      'hover:opacity-90 focus:ring-2 focus:ring-offset-2',
      'active:opacity-95'
    ].join(' '),
    
    outline: [
      'bg-white text-gray-700',
      'hover:bg-gray-50 focus:ring-2 focus:ring-offset-2',
      'active:bg-gray-100'
    ].join(' '),
    
    ghost: [
      'text-gray-700 bg-transparent',
      'hover:bg-gray-100 focus:ring-2 focus:ring-offset-2',
      'active:bg-gray-200'
    ].join(' '),
    
    success: [
      'text-white',
      'hover:opacity-90 focus:ring-2 focus:ring-offset-2',
      'active:opacity-95'
    ].join(' '),
    
    warning: [
      'text-white',
      'hover:opacity-90 focus:ring-2 focus:ring-offset-2',
      'active:opacity-95'
    ].join(' '),
    
    error: [
      'text-white',
      'hover:opacity-90 focus:ring-2 focus:ring-offset-2',
      'active:opacity-95'
    ].join(' ')
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg'
  };

  const getVariantStyle = (variant: string) => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--color-primary-600)',
          color: 'white',
          borderColor: 'var(--color-primary-600)'
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--color-gray-600)',
          color: 'white',
          borderColor: 'var(--color-gray-600)'
        };
      case 'outline':
        return {
          backgroundColor: 'white',
          color: 'var(--color-gray-700)',
          borderColor: 'var(--color-gray-300)'
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-gray-700)',
          borderColor: 'transparent'
        };
      case 'success':
        return {
          backgroundColor: 'var(--color-success-600)',
          color: 'white',
          borderColor: 'var(--color-success-600)'
        };
      case 'warning':
        return {
          backgroundColor: 'var(--color-warning-600)',
          color: 'white',
          borderColor: 'var(--color-warning-600)'
        };
      case 'error':
        return {
          backgroundColor: 'var(--color-error-600)',
          color: 'white',
          borderColor: 'var(--color-error-600)'
        };
      default:
        return {
          backgroundColor: 'var(--color-primary-600)',
          color: 'white',
          borderColor: 'var(--color-primary-600)'
        };
    }
  };

  return (
    <button
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        loading && 'cursor-wait',
        className
      )}
      disabled={disabled || loading}
      style={{
        ...getVariantStyle(variant),
        transition: 'all var(--transition-normal)'
      }}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
} 