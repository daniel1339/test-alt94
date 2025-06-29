'use client';

import { Property } from '@/types/property';
import { PropertyGallery } from './PropertyGallery';
import { Card, Button, FavoriteButton } from '@/components/ui';
import { formatPrice, formatPricePerM2, formatPricePerRoom, formatArea } from '@/utils/format';
import Link from 'next/link';
import { 
  HiHome, 
  HiLocationMarker, 
  HiViewGrid, 
  HiCurrencyDollar,
  HiStar
} from 'react-icons/hi';

interface PropertyDetailProps {
  property: Property;
  className?: string;
}

export function PropertyDetail({ property, className = '' }: PropertyDetailProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      
      {/* Property header */}
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
          
          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Link href={`/recommendations/${property.id}`}>
              <Button variant="primary" size="md">
                <HiStar className="w-4 h-4 mr-2" />
                Ver Similares
              </Button>
            </Link>
            <FavoriteButton 
              property={property}
              variant="button"
              size="md"
              showText={true}
            />
            <Link href="/properties">
              <Button variant="outline" size="md">
                <HiViewGrid className="w-4 h-4 mr-2" />
                Explorar Más
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid-detail">
        
        {/* Gallery - 2 columns on desktop */}
        <div className="lg:col-span-2">
          <PropertyGallery 
            images={[property.imagen]} 
            title={property.titulo}
          />
        </div>

        {/* Main information - 1 column on desktop */}
        <div className="space-y-6">
          
          {/* Price */}
          <Card padding="lg" shadow="md">
            <div className="text-center space-y-3">
              <div className="price-display">
                {formatPrice(property.precio)}
              </div>
              <div className="text-sm text-secondary">
                {formatPricePerM2(property.precio, property.metros_cuadrados)} per m²
              </div>
              <div className="space-y-2">
                <div className="text-xs text-muted text-center">
                  💡 <strong>Próximamente:</strong> Sistema de contacto
                </div>
                <Button variant="outline" size="lg" className="w-full" disabled>
                <HiCurrencyDollar className="w-4 h-4 mr-2" />
                  Consultar (Próximamente)
              </Button>
              </div>
            </div>
          </Card>

          {/* Main features */}
          <Card padding="lg" shadow="md">
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Características
            </h3>
            <div className="space-y-4">
              <div className="feature-row">
                <div className="feature-label">
                  <HiHome className="w-5 h-5" />
                  <span>Habitaciones</span>
                </div>
                <span className="feature-value">
                  {property.ambientes}
                </span>
              </div>
              
              <div className="feature-row">
                <div className="feature-label">
                  <HiViewGrid className="w-5 h-5" />
                  <span>Área</span>
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

          {/* Additional information */}
          <Card padding="lg" shadow="md">
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Información adicional
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary">
                  ID de Propiedad:
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
                  Precio por habitación:
                </span>
                <span className="text-primary">
                  {formatPricePerRoom(property.precio, property.ambientes)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Extended description (placeholder) */}
      <Card padding="lg" shadow="md">
        <h3 className="text-xl font-semibold mb-4 text-primary">
          Descripción
        </h3>
        <div className="prose prose-gray max-w-none text-secondary">
          <p>
            Excelente {property.tipo.toLowerCase()} ubicado en {property.ciudad}, 
            con {property.ambientes} habitaciones distribuidas en {property.metros_cuadrados} metros cuadrados. 
            Esta propiedad ofrece una gran oportunidad tanto para vivir como para invertir.
          </p>
          <p>
            La propiedad está ubicada en una zona privilegiada de {property.ciudad}, 
            con excelente conectividad y acceso a servicios. El precio de {formatPrice(property.precio)} 
            representa una gran oportunidad en el mercado actual.
          </p>
          <p>
            <strong>Características destacadas:</strong>
          </p>
          <ul>
            <li>{property.ambientes} habitaciones amplias y bien iluminadas</li>
            <li>{formatArea(property.metros_cuadrados)} de superficie total</li>
            <li>Ubicación estratégica en {property.ciudad}</li>
            <li>Excelente relación precio-calidad</li>
          </ul>
        </div>
      </Card>
    </div>
  );
} 