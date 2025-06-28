'use client';

import { Property } from '@/types/property';
import { PropertyCard } from './PropertyCard';
import { LoadingCard, LoadingPage } from '@/components/ui';
import { useProperties } from '@/hooks/useProperties';
import { HiExclamationCircle, HiHome } from 'react-icons/hi';

interface PropertyListProps {
  initialProperties?: Property[];
  showRecommendations?: boolean;
  className?: string;
  emptyMessage?: string;
}

export function PropertyList({ 
  initialProperties,
  showRecommendations = false,
  className = '',
  emptyMessage = "No se encontraron propiedades"
}: PropertyListProps) {
  const { properties, loading, error, refetch } = useProperties({
    initialProperties
  });

  // Estado de loading
  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center">
          <LoadingPage message="Cargando propiedades..." size="md" />
        </div>
        
        {/* Skeleton grid */}
        <div className="grid-properties">
          {Array.from({ length: 8 }).map((_, index) => (
            <LoadingCard key={index} rows={3} />
          ))}
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className={`text-center space-y-4 ${className}`}>
        <HiExclamationCircle className="mx-auto text-6xl mb-4 text-error-500" />
        <h3 className="text-xl font-semibold text-primary">
          Error al cargar propiedades
        </h3>
        <p className="text-sm max-w-md mx-auto text-secondary">
          {error}
        </p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // Estado vacío
  if (properties.length === 0) {
    return (
      <div className={`text-center space-y-4 py-12 ${className}`}>
        <HiHome className="mx-auto text-6xl mb-4 text-muted" />
        <h3 className="text-xl font-semibold text-primary">
          {emptyMessage}
        </h3>
        <p className="text-sm max-w-md mx-auto text-secondary">
          No hay propiedades disponibles en este momento. Intenta ajustar los filtros o vuelve más tarde.
        </p>
      </div>
    );
  }

  // Grid de propiedades
  return (
    <div className={className}>
      {/* Header con contador */}
      <div className="mb-6">
        <p className="text-sm text-secondary">
          Mostrando <span className="font-medium">{properties.length}</span> propiedades
        </p>
      </div>

      {/* Grid de propiedades */}
      <div className="grid-properties">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            showRecommendations={showRecommendations}
          />
        ))}
      </div>
    </div>
  );
} 