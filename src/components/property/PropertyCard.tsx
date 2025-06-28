'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Property } from '@/types/property';
import { Card, Button, FavoriteButton } from '@/components/ui';
import { formatPrice, formatRooms, formatArea } from '@/utils/format';
import { HiLocationMarker, HiHome, HiViewGrid } from 'react-icons/hi';

interface PropertyCardProps {
  property: Property;
  showRecommendations?: boolean;
  className?: string;
}

export function PropertyCard({ 
  property, 
  showRecommendations = false,
  className 
}: PropertyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/properties/${property.id}`);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="h-full cursor-pointer" onClick={handleCardClick}>
    <Card 
      hover 
      padding="none" 
      shadow="md" 
        className={`h-full flex flex-col ${className}`}
      as="article"
    >
        {/* Imagen de la propiedad - altura fija */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-gray-200 flex-shrink-0">
          {/* Skeleton mientras carga la imagen */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse">
              <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
            </div>
          )}
          
          {/* Imagen principal */}
          {!imageError && (
        <Image
          src={property.imagen}
          alt={property.titulo}
          fill
              className={`object-cover transition-all duration-300 hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
          
          {/* Fallback si la imagen falla */}
          {imageError && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <HiHome className="w-8 h-8 mx-auto mb-2" />
                <span className="text-xs">Sin imagen</span>
              </div>
            </div>
          )}
          
          {/* Badges container para evitar superposición */}
          <div className={`absolute top-3 left-3 right-3 flex justify-between items-start gap-2 transition-opacity duration-300 ${
            imageLoaded || imageError ? 'opacity-100' : 'opacity-0'
          }`}>
        {/* Badge del tipo */}
            <div className="badge-type flex-shrink-0 shadow-sm">
          <HiHome className="w-3 h-3" />
              <span className="truncate max-w-20">{property.tipo}</span>
        </div>

        {/* Badge de precio */}
            <div className="px-2 py-1 rounded-md text-xs font-bold bg-black/80 text-white flex-shrink-0 shadow-lg backdrop-blur-sm">
          {formatPrice(property.precio)}
            </div>
        </div>
      </div>

        {/* Contenido de la tarjeta - flex-grow para ocupar espacio restante */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Título y ubicación - altura fija */}
          <div className="mb-3 flex-shrink-0">
            <h3 
              className="font-semibold text-lg leading-tight mb-1 text-primary truncate" 
              title={property.titulo}
            >
            {property.titulo}
          </h3>
            <p 
              className="text-sm flex items-center text-secondary truncate" 
              title={property.ciudad}
            >
              <HiLocationMarker className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">{property.ciudad}</span>
          </p>
        </div>

          {/* Características - altura fija */}
          <div className="flex items-center justify-between text-sm mb-3 flex-shrink-0">
          <div className="flex items-center text-muted">
            <HiHome className="w-4 h-4 mr-1" />
              <span>{formatRooms(property.ambientes)}</span>
          </div>
          
          <div className="flex items-center text-muted">
            <HiViewGrid className="w-4 h-4 mr-1" />
              <span>{formatArea(property.metros_cuadrados)}</span>
          </div>
        </div>

          {/* Precio destacado - altura fija */}
          <div className="mb-4 flex-shrink-0">
            <div className="price-display truncate" title={formatPrice(property.precio)}>
          {formatPrice(property.precio)}
        </div>
          </div>

          {/* Acciones - pegadas al bottom con margin-top auto */}
          <div className="flex space-x-2 mt-auto" onClick={handleActionClick}>
          {showRecommendations && (
              <Link href={`/recommendations/${property.id}`} className="flex-shrink-0">
              <Button variant="outline" size="sm">
                Similares
              </Button>
            </Link>
          )}
          
            {/* Botón de favoritos */}
            <div className="flex-shrink-0 ml-auto">
              <FavoriteButton 
                property={property}
                variant="icon"
            size="sm"
              />
            </div>
          </div>
        </div>
      </Card>
      </div>
  );
} 