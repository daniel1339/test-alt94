import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import { 
  HiHome, 
  HiStar, 
  HiHeart, 
  HiSearchCircle, 
  HiChartBar, 
  HiShieldCheck, 
  HiDeviceMobile 
} from 'react-icons/hi';

export default function Home() {
  return (
    <MainLayout>
      <div className="space-y-8">
        
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 
              className="text-4xl font-bold"
              style={{ 
                color: 'var(--color-text-primary)',
                fontSize: 'var(--font-size-4xl)',
                fontWeight: 'var(--font-weight-bold)'
              }}
            >
              Sistema de Recomendación de Propiedades
            </h1>
            <p 
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ 
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-xl)'
              }}
            >
              Descubre propiedades similares basadas en ubicación, tipo, precio y características.
              Explora nuestro catálogo de <span className="font-semibold text-primary-600">100 propiedades</span> en Argentina.
            </p>
          </div>

          {/* CTA Principal */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <Button variant="primary" size="lg">
                Explorar Propiedades
              </Button>
            </Link>
            <Link href="/properties">
              <Button variant="outline" size="lg">
                Ver Recomendaciones
              </Button>
            </Link>
          </div>
        </div>

        {/* Cards de Funcionalidades */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card hover padding="lg" shadow="md">
            <div className="text-center space-y-4">
              <div 
                className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-600)' }}
              >
                <HiHome className="w-6 h-6" />
              </div>
              <h3 
                className="text-lg font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Listado de Propiedades
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Explora todas las propiedades disponibles con filtros avanzados por ciudad, tipo y rango de precio.
              </p>
              <Link href="/properties">
                <Button variant="primary" size="sm" className="w-full">
                  Ver Propiedades
                </Button>
              </Link>
            </div>
          </Card>

          <Card hover padding="lg" shadow="md">
            <div className="text-center space-y-4">
              <div 
                className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-success-100)', color: 'var(--color-success-600)' }}
              >
                <HiStar className="w-6 h-6" />
              </div>
              <h3 
                className="text-lg font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Recomendaciones Inteligentes
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Algoritmo que encuentra propiedades similares basado en múltiples características y preferencias.
              </p>
              <Link href="/properties">
                <Button variant="success" size="sm" className="w-full">
                  Ver Recomendaciones
                </Button>
              </Link>
            </div>
          </Card>

          <Card hover padding="lg" shadow="md">
            <div className="text-center space-y-4">
              <div 
                className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-warning-100)', color: 'var(--color-warning-600)' }}
              >
                <HiHeart className="w-6 h-6" />
              </div>
              <h3 
                className="text-lg font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Lista de Favoritos
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Guarda tus propiedades favoritas para acceder fácilmente y comparar opciones.
              </p>
              <Link href="/favorites">
                <Button variant="outline" size="sm" className="w-full">
                  Mis Favoritos
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Características Técnicas */}
        <Card 
          padding="lg" 
          shadow="lg"
          style={{ backgroundColor: 'var(--color-primary-50)', borderColor: 'var(--color-primary-200)' }}
        >
          <div className="space-y-6">
            <div className="text-center">
              <h2 
                className="text-2xl font-bold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Características del Sistema
              </h2>
              <p 
                className="mt-2"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Tecnología avanzada para encontrar la propiedad perfecta
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-primary-600)', color: 'white' }}
                  >
                    <HiSearchCircle className="w-5 h-5" />
                  </div>
                  <h4 
                    className="font-semibold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Algoritmo de Similitud Avanzado
                  </h4>
                </div>
                <p 
                  className="text-sm leading-relaxed ml-11"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Sistema de pesos: ciudad (40%), tipo (30%), precio (20%) y ambientes (10%) para recomendaciones precisas.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-success-600)', color: 'white' }}
                  >
                    <HiChartBar className="w-5 h-5" />
                  </div>
                  <h4 
                    className="font-semibold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Datos de Propiedades Reales
                  </h4>
                </div>
                <p 
                  className="text-sm leading-relaxed ml-11"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  100 propiedades en ciudades argentinas: Buenos Aires, Córdoba, Rosario, La Plata, Neuquén y más.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-info-600)', color: 'white' }}
                  >
                    <HiShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 
                    className="font-semibold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    APIs Robustas y Seguras
                  </h4>
                </div>
                <p 
                  className="text-sm leading-relaxed ml-11"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Backend con validación completa, paginación, filtros avanzados y manejo centralizado de errores.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-warning-600)', color: 'white' }}
                  >
                    <HiDeviceMobile className="w-5 h-5" />
                  </div>
                  <h4 
                    className="font-semibold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Diseño Responsive y Modular
                  </h4>
                </div>
                <p 
                  className="text-sm leading-relaxed ml-11"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Interfaz optimizada para desktop, tablet y móvil con sistema de diseño consistente.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
