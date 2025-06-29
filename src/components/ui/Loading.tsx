import { clsx } from 'clsx';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export function LoadingSpinner({ size = 'md', className, color = 'primary' }: LoadingProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const colors = {
    primary: 'text-primary-600',
    secondary: 'text-gray-600',
    success: 'text-success-600',
    warning: 'text-warning-600',
    error: 'text-error-600'
  };

  return (
    <svg
      className={clsx(
        'animate-spin',
        sizes[size],
        colors[color],
        className
      )}
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
  );
}

export function LoadingCard({ rows = 3 }: { rows?: number }) {
  return (
    <div 
      className="bg-surface border border-default rounded-lg p-4 shadow-md animate-pulse"
      style={{ animationDuration: '1.5s' }}
    >
      {/* Image placeholder */}
      <div 
        className="h-48 bg-gray-200 rounded-lg mb-4"
        style={{ backgroundColor: 'var(--color-gray-200)' }}
      ></div>
      
      {/* Text lines placeholder */}
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="h-4 bg-gray-200 rounded"
            style={{
              backgroundColor: 'var(--color-gray-200)',
              width: index === 0 ? '75%' : index === rows - 1 ? '40%' : '60%'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export function LoadingPage({ 
  message = "Cargando...", 
  size = "lg",
  className 
}: { 
  message?: string; 
  size?: 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const containerSizes = {
    md: 'min-h-32',
    lg: 'min-h-64',
    xl: 'min-h-96'
  };

  return (
    <div className={clsx(
      'flex flex-col items-center justify-center space-y-4',
      containerSizes[size],
      className
    )}>
      <LoadingSpinner size={size} />
      <p 
        className="text-lg"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {message}
      </p>
    </div>
  );
}

// Skeleton para texto
export function TextSkeleton({ 
  lines = 1, 
  className 
}: { 
  lines?: number; 
  className?: string; 
}) {
  const lineWidths = ['w-1/2', 'w-3/4', 'w-1/4'];

  return (
    <div className={clsx('space-y-2', className)}>
      {/* Placeholder text lines */}
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index}
          className={`skeleton skeleton-text ${lineWidths[index % lineWidths.length]}`}
        />
      ))}
    </div>
  );
} 