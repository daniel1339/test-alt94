import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/property';
import { Card, Button } from '@/components/ui';
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
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card 
      hover 
      padding="none" 
      shadow="md" 
      className={className}
      as="article"
    >
      {/* Imagen de la propiedad */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
        <Image
          src={property.imagen}
          alt={property.titulo}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badge del tipo */}
        <div 
          className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1"
          style={{ 
            backgroundColor: 'var(--color-primary-600)',
            color: 'white'
          }}
        >
          <HiHome className="w-3 h-3" />
          <span>{property.tipo}</span>
        </div>

        {/* Badge de precio */}
        <div 
          className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-bold"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white'
          }}
        >
          {formatPrice(property.precio)}
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4 space-y-3">
        {/* Título y ubicación */}
        <div>
          <h3 
            className="font-semibold text-lg leading-tight mb-1"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {property.titulo}
          </h3>
          <p 
            className="text-sm flex items-center"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <HiLocationMarker className="w-4 h-4 mr-1" />
            {property.ciudad}
          </p>
        </div>

        {/* Características */}
        <div className="flex items-center space-x-4 text-sm">
          <div 
            className="flex items-center"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <HiHome className="w-4 h-4 mr-1" />
            {property.ambientes} amb.
          </div>
          
          <div 
            className="flex items-center"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <HiViewGrid className="w-4 h-4 mr-1" />
            {property.metros_cuadrados} m²
          </div>
        </div>

        {/* Precio destacado */}
        <div 
          className="text-xl font-bold"
          style={{ color: 'var(--color-primary-600)' }}
        >
          {formatPrice(property.precio)}
        </div>

        {/* Acciones */}
        <div className="flex space-x-2 pt-2">
          <Link href={`/properties/${property.id}`} className="flex-1">
            <Button variant="primary" size="sm" className="w-full">
              Ver Detalle
            </Button>
          </Link>
          
          {showRecommendations && (
            <Link href={`/recommendations/${property.id}`}>
              <Button variant="outline" size="sm">
                Similares
              </Button>
            </Link>
          )}
          
          {/* Botón favorito (placeholder) */}
          <Button 
            variant="ghost" 
            size="sm"
            className="px-2"
            aria-label="Agregar a favoritos"
          >
            <HiHeart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
} 