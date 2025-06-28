import Link from 'next/link';
import { Button } from '@/components/ui';
import { HiMenu } from 'react-icons/hi';

export function Header() {
  return (
    <header 
      className="bg-surface border-b border-default sticky top-0"
      style={{ 
        zIndex: 'var(--z-sticky)',
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo y navegación principal */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center group">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: 'var(--color-primary-600)' }}
                >
                  P
                </div>
                <h1 
                  className="text-xl font-bold transition-colors group-hover:text-primary-700"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  PropiedadesApp
                </h1>
              </div>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link 
                href="/properties" 
                className="text-secondary hover:text-primary transition-colors focus-ring rounded-md px-2 py-1"
                style={{ transition: 'color var(--transition-fast)' }}
              >
                Propiedades
              </Link>
              <Link 
                href="/favorites" 
                className="text-secondary hover:text-primary transition-colors focus-ring rounded-md px-2 py-1"
                style={{ transition: 'color var(--transition-fast)' }}
              >
                Favoritos
              </Link>
            </nav>
          </div>

          {/* Acciones del header */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Filtros
            </Button>
            
            {/* Menú móvil (placeholder) */}
            <button 
              className="md:hidden p-2 rounded-md focus-ring"
              style={{ color: 'var(--color-text-secondary)' }}
              aria-label="Menú principal"
            >
              <HiMenu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 