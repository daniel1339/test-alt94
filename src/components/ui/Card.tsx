import { ReactNode, CSSProperties } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  hover?: boolean;
  as?: 'div' | 'article' | 'section';
}

export function Card({ 
  children, 
  className,
  style,
  padding = 'md',
  shadow = 'md',
  rounded = 'lg',
  border = true,
  hover = false,
  as: Component = 'div'
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };

  const roundedClasses = {
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl'
  };

  return (
    <Component
      className={clsx(
        // Base styles
        'bg-surface',
        
        // Border
        border && 'border border-default',
        
        // Padding, shadow, rounded
        paddingClasses[padding],
        shadowClasses[shadow],
        roundedClasses[rounded],
        
        // Hover effects
        hover && 'hover-lift cursor-pointer',
        
        className
      )}
      style={{
        transition: 'all var(--transition-normal)',
        ...style
      }}
    >
      {children}
    </Component>
  );
} 