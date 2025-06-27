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
    'border border-transparent'
  ].join(' ');
  
  const variants = {
    primary: [
      'bg-primary-600 text-white',
      'hover:bg-primary-700 focus:ring-primary-500',
      'active:bg-primary-800'
    ].join(' '),
    
    secondary: [
      'bg-gray-600 text-white',
      'hover:bg-gray-700 focus:ring-gray-500',
      'active:bg-gray-800'
    ].join(' '),
    
    outline: [
      'border-gray-300 bg-white text-gray-700',
      'hover:bg-gray-50 focus:ring-primary-500',
      'active:bg-gray-100'
    ].join(' '),
    
    ghost: [
      'text-gray-700 bg-transparent',
      'hover:bg-gray-100 focus:ring-gray-500',
      'active:bg-gray-200'
    ].join(' '),
    
    success: [
      'bg-success-600 text-white',
      'hover:bg-success-700 focus:ring-success-500',
      'active:bg-success-800'
    ].join(' '),
    
    warning: [
      'bg-warning-600 text-white',
      'hover:bg-warning-700 focus:ring-warning-500',
      'active:bg-warning-800'
    ].join(' '),
    
    error: [
      'bg-error-600 text-white',
      'hover:bg-error-700 focus:ring-error-500',
      'active:bg-error-800'
    ].join(' ')
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg'
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