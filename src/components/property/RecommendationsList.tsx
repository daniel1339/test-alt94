'use client';

import Link from 'next/link';
import { PropertyWithScore } from '@/types/property';
import { PropertyCard } from './PropertyCard';
import { LoadingCard, LoadingPage } from '@/components/ui';
import { useRecommendations } from '@/hooks/useRecommendations';
import { HiExclamationCircle, HiSparkles, HiHome } from 'react-icons/hi';

interface RecommendationsListProps {
  propertyId: string;
  initialRecommendations?: PropertyWithScore[];
  className?: string;
}

export function RecommendationsList({ 
  propertyId,
  initialRecommendations,
  className = ''
}: RecommendationsListProps) {
  const { recommendations, loading, error, refetch } = useRecommendations(propertyId);

  // Usar datos iniciales si están disponibles
  const displayRecommendations = initialRecommendations || recommendations;

  // Estado de loading
  if (loading && !initialRecommendations) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center">
          <LoadingPage message="Cargando recomendaciones..." size="md" />
        </div>
        
        {/* Skeleton grid */}
        <div className="grid-properties">
          {Array.from({ length: 6 }).map((_, index) => (
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
          Error al cargar recomendaciones
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
  if (displayRecommendations.length === 0) {
    return (
      <div className={`text-center space-y-4 py-12 ${className}`}>
        <HiSparkles className="mx-auto text-6xl mb-4 text-muted" />
        <h3 className="text-xl font-semibold text-primary">
          No hay recomendaciones disponibles
        </h3>
        <p className="text-sm max-w-md mx-auto text-secondary">
          No se encontraron propiedades similares en este momento. 
          Intenta explorar otras opciones en el catálogo.
        </p>
      </div>
    );
  }

  // Lista de recomendaciones con scores
  return (
    <div className={className}>
      {/* Header con información */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <HiSparkles className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-primary">
            Propiedades Similares
          </h2>
        </div>
        <p className="text-sm text-secondary">
          Encontramos <span className="font-medium">{displayRecommendations.length}</span> propiedades 
          similares ordenadas por compatibilidad
        </p>
      </div>

      {/* Grid de recomendaciones */}
      <div className="grid-properties">
        {displayRecommendations.map((recommendation) => (
          <div key={recommendation.id} className="relative">
                         {/* Badge de score de similitud */}
             <div className="absolute top-2 right-2 z-10 px-2 py-1 rounded-full text-xs font-bold bg-success-100 text-success-700 border border-success-200">
               {Math.round(recommendation.similarityScore * 100)}% similar
             </div>
            
            <PropertyCard
              property={recommendation}
              showRecommendations={false} // No mostrar botón "Similares" en recomendaciones
            />
          </div>
        ))}
      </div>

      {/* Footer con CTA */}
      <div className="text-center mt-8 p-6 bg-surface-gray rounded-lg">
        <HiHome className="mx-auto text-3xl mb-2 text-primary-600" />
        <h3 className="font-semibold mb-2 text-primary">
          ¿No encontraste lo que buscabas?
        </h3>
        <p className="text-sm text-secondary mb-4">
          Explora todo nuestro catálogo de propiedades
        </p>
        <Link 
          href="/properties"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
        >
          Ver Todas las Propiedades
        </Link>
      </div>
    </div>
  );
} 