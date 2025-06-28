import Image from 'next/image';
import Link from 'next/link';
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
        <div className="absolute top-3 left-3 badge-type">
          <HiHome className="w-3 h-3" />
          <span>{property.tipo}</span>
        </div>

        {/* Badge de precio */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-bold bg-black/70 text-white">
          {formatPrice(property.precio)}
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4 space-y-3">
        {/* Título y ubicación */}
        <div>
          <h3 className="font-semibold text-lg leading-tight mb-1 text-primary">
            {property.titulo}
          </h3>
          <p className="text-sm flex items-center text-secondary">
            <HiLocationMarker className="w-4 h-4 mr-1" />
            {property.ciudad}
          </p>
        </div>

        {/* Características */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center text-muted">
            <HiHome className="w-4 h-4 mr-1" />
            {formatRooms(property.ambientes)}
          </div>
          
          <div className="flex items-center text-muted">
            <HiViewGrid className="w-4 h-4 mr-1" />
            {formatArea(property.metros_cuadrados)}
          </div>
        </div>

        {/* Precio destacado */}
        <div className="price-display">
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