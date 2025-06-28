'use client';

import { Button } from './Button';
import { HiChevronLeft, HiChevronRight, HiDotsHorizontal } from 'react-icons/hi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showNumbers?: boolean;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  loading?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'numbers' | 'simple' | 'loadmore';
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showNumbers = true,
  showLoadMore = false,
  onLoadMore,
  hasNextPage = false,
  loading = false,
  className = "",
  size = 'md',
  variant = 'numbers'
}: PaginationProps) {
  
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const buttonSizes = {
    sm: 'h-8 px-2 text-sm',
    md: 'h-10 px-3 text-md',
    lg: 'h-12 px-4 text-lg'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  // Variante Load More (Infinite Scroll)
  if (variant === 'loadmore') {
    return (
      <div className={`flex justify-center pt-8 ${className}`}>
        {hasNextPage && (
          <Button
            variant="outline"
            size={size}
            onClick={onLoadMore}
            loading={loading}
            className="min-w-32"
          >
            {loading ? 'Cargando...' : 'Cargar más propiedades'}
          </Button>
        )}
        
        {!hasNextPage && !loading && (
          <div 
            className="text-center py-4"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <p className="text-sm">
              Has visto todas las propiedades disponibles
            </p>
          </div>
        )}
      </div>
    );
  }

  // Variante Simple (Solo prev/next)
  if (variant === 'simple') {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        <Button
          variant="outline"
          size={size}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex items-center space-x-2"
        >
          <HiChevronLeft className={iconSizes[size]} />
          <span>Anterior</span>
        </Button>

        <span 
          className="text-sm font-medium"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Página {currentPage} de {totalPages}
        </span>

        <Button
          variant="outline"
          size={size}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex items-center space-x-2"
        >
          <span>Siguiente</span>
          <HiChevronRight className={iconSizes[size]} />
        </Button>
      </div>
    );
  }

  // Variante con números (completa)
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages();

  return (
    <nav className={`flex items-center justify-center space-x-1 ${className}`} aria-label="Paginación">
      
      {/* Botón Anterior */}
      <Button
        variant="outline"
        size={size}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`${buttonSizes[size]} flex items-center justify-center`}
        aria-label="Página anterior"
      >
        <HiChevronLeft className={iconSizes[size]} />
      </Button>

      {/* Números de página */}
      {showNumbers && visiblePages.map((page, index) => {
        if (page === '...') {
          return (
            <div 
              key={`dots-${index}`}
              className={`${buttonSizes[size]} flex items-center justify-center`}
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <HiDotsHorizontal className={iconSizes[size]} />
            </div>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <Button
            key={page}
            variant={isActive ? "primary" : "outline"}
            size={size}
            onClick={() => onPageChange(pageNumber)}
            className={`${buttonSizes[size]} min-w-0 flex items-center justify-center`}
            aria-label={`Ir a página ${pageNumber}`}
            aria-current={isActive ? "page" : undefined}
          >
            {pageNumber}
          </Button>
        );
      })}

      {/* Botón Siguiente */}
      <Button
        variant="outline"
        size={size}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`${buttonSizes[size]} flex items-center justify-center`}
        aria-label="Página siguiente"
      >
        <HiChevronRight className={iconSizes[size]} />
      </Button>

      {/* Info adicional */}
      <div 
        className="hidden sm:flex items-center ml-6 text-sm"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        Página <span className="font-medium text-primary mx-1">{currentPage}</span> 
        de <span className="font-medium text-primary mx-1">{totalPages}</span>
      </div>
    </nav>
  );
} 