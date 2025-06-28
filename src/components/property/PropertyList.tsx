'use client';

import { useState, useEffect } from 'react';
import { Property } from '@/types/property';
import { PropertyCard } from './PropertyCard';
import { LoadingCard, LoadingPage } from '@/components/ui';
import { HiExclamationCircle, HiHome } from 'react-icons/hi';

interface PropertyListProps {
  initialProperties?: Property[];
  showRecommendations?: boolean;
  className?: string;
  emptyMessage?: string;
}

interface ApiResponse {
  success: boolean;
  data: Property[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export function PropertyList({ 
  initialProperties,
  showRecommendations = false,
  className = '',
  emptyMessage = "No se encontraron propiedades"
}: PropertyListProps) {
  const [properties, setProperties] = useState<Property[]>(initialProperties || []);
  const [loading, setLoading] = useState(!initialProperties);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProperties) {
      setProperties(initialProperties);
      setLoading(false);
      return;
    }

    fetchProperties();
  }, [initialProperties]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/properties?page=1&limit=12');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setProperties(data.data);
      } else {
        throw new Error('Error al cargar las propiedades');
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  // Estado de loading
  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center">
          <LoadingPage message="Cargando propiedades..." size="md" />
        </div>
        
        {/* Skeleton grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        <HiExclamationCircle 
          className="mx-auto text-6xl mb-4"
          style={{ color: 'var(--color-error-500)' }}
        />
        <h3 
          className="text-xl font-semibold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Error al cargar propiedades
        </h3>
        <p 
          className="text-sm max-w-md mx-auto"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {error}
        </p>
        <button
          onClick={fetchProperties}
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
        <HiHome 
          className="mx-auto text-6xl mb-4"
          style={{ color: 'var(--color-text-muted)' }}
        />
        <h3 
          className="text-xl font-semibold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {emptyMessage}
        </h3>
        <p 
          className="text-sm max-w-md mx-auto"
          style={{ color: 'var(--color-text-secondary)' }}
        >
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
        <p 
          className="text-sm"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Mostrando <span className="font-medium">{properties.length}</span> propiedades
        </p>
      </div>

      {/* Grid de propiedades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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