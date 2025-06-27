import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export function MainLayout({ 
  children, 
  className = '',
  maxWidth = 'xl'
}: MainLayoutProps) {
  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl', 
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-none'
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Header />
      
      <main 
        className={`flex-1 ${className}`}
        style={{ backgroundColor: 'var(--color-surface-gray)' }}
      >
        <div 
          className={`${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8`}
          style={{ padding: 'var(--spacing-2xl) var(--spacing-lg)' }}
        >
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 