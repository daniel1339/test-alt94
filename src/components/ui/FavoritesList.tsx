'use client';

import { useFavorites } from '@/contexts';
import { PropertyCard } from '@/components/property';
import { Card, Button } from '@/components/ui';
import { HiHeart, HiTrash } from 'react-icons/hi';
import Link from 'next/link';

interface FavoritesListProps {
  className?: string;
}

export function FavoritesList({ className = '' }: FavoritesListProps) {
  const { favorites, favoriteCount, clearFavorites, isLoading } = useFavorites();

  if (isLoading) {
    return (
      <div className={className}>
        <div className="grid-properties">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton h-80 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (favoriteCount === 0) {
    return (
      <div className={className}>
        <Card padding="lg" className="text-center">
          <div className="space-y-6">
            <HiHeart 
              className="mx-auto text-6xl"
              style={{ color: 'var(--color-warning-500)' }}
            />
            
            <div className="space-y-2">
              <h3 
                className="text-xl font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Aún no tienes favoritos
              </h3>
              <p 
                className="text-sm max-w-md mx-auto"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Comienza explorando propiedades y marca las que más te gusten como favoritas. 
                Aparecerán aquí para que puedas acceder fácilmente.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties">
                <Button variant="primary" size="md">
                  Explorar Propiedades
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="md">
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header con contador y acción de limpiar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="space-y-1">
          <h2 
            className="text-2xl font-bold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Mis Propiedades Favoritas
          </h2>
          <p 
            className="text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {favoriteCount} {favoriteCount === 1 ? 'propiedad guardada' : 'propiedades guardadas'}
          </p>
        </div>

        {favoriteCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFavorites}
            className="text-error-600 border-error-200 hover:bg-error-50"
          >
            <HiTrash className="w-4 h-4 mr-2" />
            Limpiar Favoritos
          </Button>
        )}
      </div>

      {/* Grid de propiedades favoritas */}
      <div className="grid-properties">
        {favorites.map(property => (
          <PropertyCard
            key={property.id}
            property={property}
            showRecommendations={true}
          />
        ))}
      </div>

      {/* Footer con info adicional */}
      <Card padding="md" className="mt-8 bg-info-50 border-info-200">
        <div className="flex items-start space-x-3">
          <HiHeart className="w-5 h-5 text-info-600 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p 
              className="text-sm font-medium"
              style={{ color: 'var(--color-info-700)' }}
            >
              Tus favoritos se guardan automáticamente
            </p>
            <p 
              className="text-xs"
              style={{ color: 'var(--color-info-600)' }}
            >
              Accede a tus propiedades favoritas desde cualquier dispositivo. 
              Los favoritos se almacenan localmente en tu navegador.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
} 