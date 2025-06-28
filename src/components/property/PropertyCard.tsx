import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Property } from '@/types/property';
import { Card, Button } from '@/components/ui';
import { formatPrice, formatRooms, formatArea } from '@/utils/format';
import { HiLocationMarker, HiHome, HiViewGrid, HiHeart } from 'react-icons/hi';

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

  return (
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
        
        {/* Badge del tipo - solo visible cuando la imagen carga */}
        <div className={`absolute top-3 left-3 badge-type transition-opacity duration-300 ${
          imageLoaded || imageError ? 'opacity-100' : 'opacity-0'
        }`}>
          <HiHome className="w-3 h-3" />
          <span>{property.tipo}</span>
        </div>

        {/* Badge de precio - solo visible cuando la imagen carga */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-bold bg-black/70 text-white transition-opacity duration-300 ${
          imageLoaded || imageError ? 'opacity-100' : 'opacity-0'
        }`}>
          {formatPrice(property.precio)}
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
        <div className="flex space-x-2 mt-auto">
          <Link href={`/properties/${property.id}`} className="flex-1">
            <Button variant="primary" size="sm" className="w-full">
              Ver Detalle
            </Button>
          </Link>
          
          {showRecommendations && (
            <Link href={`/recommendations/${property.id}`}>
              <Button variant="outline" size="sm" className="flex-shrink-0">
                Similares
              </Button>
            </Link>
          )}
          
          {/* Botón favorito (placeholder) */}
          <Button 
            variant="ghost" 
            size="sm"
            className="px-2 flex-shrink-0"
            aria-label="Agregar a favoritos"
            title="Agregar a favoritos"
          >
            <HiHeart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
} 