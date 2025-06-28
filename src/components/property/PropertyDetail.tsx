'use client';

import { Property } from '@/types/property';
import { PropertyGallery } from './PropertyGallery';
import { Card, Button } from '@/components/ui';
import { formatPrice, formatPricePerM2, formatPricePerRoom, formatArea, formatRooms } from '@/utils/format';
import Link from 'next/link';
import { 
  HiHome, 
  HiLocationMarker, 
  HiViewGrid, 
  HiCurrencyDollar,
  HiHeart,
  HiShare,
  HiStar
} from 'react-icons/hi';

interface PropertyDetailProps {
  property: Property;
  className?: string;
}

export function PropertyDetail({ property, className = '' }: PropertyDetailProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      
      {/* Header de la propiedad */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-primary">
              {property.titulo}
            </h1>
            <div className="flex items-center space-x-4 text-lg">
              <div className="flex items-center text-secondary">
                <HiLocationMarker className="w-5 h-5 mr-2" />
                {property.ciudad}
              </div>
              <div className="badge-type">
                <HiHome className="w-4 h-4 mr-1" />
                {property.tipo}
              </div>
            </div>
          </div>
          
          {/* Acciones */}
          <div className="flex space-x-3">
            <Button variant="ghost" size="md">
              <HiShare className="w-4 h-4 mr-2" />
              Compartir
            </Button>
            <Button variant="outline" size="md">
              <HiHeart className="w-4 h-4 mr-2" />
              Favorito
            </Button>
            <Link href={`/recommendations/${property.id}`}>
              <Button variant="primary" size="md">
                <HiStar className="w-4 h-4 mr-2" />
                Ver Similares
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid principal */}
      <div className="grid-detail">
        
        {/* Galería - 2 columnas en desktop */}
        <div className="lg:col-span-2">
          <PropertyGallery 
            images={[property.imagen]} 
            title={property.titulo}
          />
        </div>

        {/* Información principal - 1 columna en desktop */}
        <div className="space-y-6">
          
          {/* Precio */}
          <Card padding="lg" shadow="md">
            <div className="text-center space-y-3">
              <div className="price-display">
                {formatPrice(property.precio)}
              </div>
              <div className="text-sm text-secondary">
                {formatPricePerM2(property.precio, property.metros_cuadrados)} por m²
              </div>
              <Button variant="primary" size="lg" className="w-full">
                <HiCurrencyDollar className="w-4 h-4 mr-2" />
                Consultar
              </Button>
            </div>
          </Card>

          {/* Características principales */}
          <Card padding="lg" shadow="md">
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Características
            </h3>
            <div className="space-y-4">
              <div className="feature-row">
                <div className="feature-label">
                  <HiHome className="w-5 h-5" />
                  <span>Ambientes</span>
                </div>
                <span className="feature-value">
                  {property.ambientes}
                </span>
              </div>
              
              <div className="feature-row">
                <div className="feature-label">
                  <HiViewGrid className="w-5 h-5" />
                  <span>Superficie</span>
                </div>
                <span className="feature-value">
                  {formatArea(property.metros_cuadrados)}
                </span>
              </div>
              
              <div className="feature-row">
                <div className="feature-label">
                  <HiLocationMarker className="w-5 h-5" />
                  <span>Ubicación</span>
                </div>
                <span className="feature-value">
                  {property.ciudad}
                </span>
              </div>
            </div>
          </Card>

          {/* Información adicional */}
          <Card padding="lg" shadow="md">
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Información adicional
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary">
                  ID de la propiedad:
                </span>
                <span className="font-mono text-muted">
                  #{property.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">
                  Tipo de propiedad:
                </span>
                <span className="text-primary">
                  {property.tipo}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">
                  Precio por ambiente:
                </span>
                <span className="text-primary">
                  {formatPricePerRoom(property.precio, property.ambientes)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Descripción extendida (placeholder) */}
      <Card padding="lg" shadow="md">
        <h3 className="text-xl font-semibold mb-4 text-primary">
          Descripción
        </h3>
        <div className="prose prose-gray max-w-none text-secondary">
          <p>
            Excelente {property.tipo.toLowerCase()} ubicada en {property.ciudad}, 
            con {property.ambientes} ambientes distribuidos en {property.metros_cuadrados} metros cuadrados. 
            Esta propiedad ofrece una gran oportunidad tanto para vivir como para invertir.
          </p>
          <p>
            La propiedad se encuentra en una zona privilegiada de {property.ciudad}, 
            con excelente conectividad y acceso a servicios. El precio de {formatPrice(property.precio)} 
            representa una gran oportunidad en el mercado actual.
          </p>
          <p>
            <strong>Características destacadas:</strong>
          </p>
          <ul>
            <li>{property.ambientes} ambientes amplios y luminosos</li>
            <li>{formatArea(property.metros_cuadrados)} de superficie total</li>
            <li>Ubicación estratégica en {property.ciudad}</li>
            <li>Excelente relación precio-calidad</li>
          </ul>
        </div>
      </Card>
    </div>
  );
} 