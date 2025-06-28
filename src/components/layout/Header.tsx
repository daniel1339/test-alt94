import Link from 'next/link';
import { HiHome } from 'react-icons/hi';
import { FavoritesCounter, MobileMenu } from '@/components/ui';

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
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
                  <HiHome className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold transition-colors group-hover:text-primary-700 text-primary">
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
              <FavoritesCounter />
            </nav>
          </div>

          {/* Acciones del header */}
          <div className="flex items-center space-x-4">
            
            
            {/* Menú móvil interactivo */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
} 