import { MainLayout } from '@/components/layout';
import { PropertyList } from '@/components/property/PropertyList';
import { Button } from '@/components/ui';
import { HiFilter, HiSearch, HiHome, HiLocationMarker, HiOfficeBuilding, HiSparkles } from 'react-icons/hi';

export default function PropertiesPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        
        {/* Header de la página */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 
              className="text-3xl font-bold"
              style={{ 
                color: 'var(--color-text-primary)',
                fontSize: 'var(--font-size-3xl)',
                fontWeight: 'var(--font-weight-bold)'
              }}
            >
              Propiedades Disponibles
            </h1>
            <p 
              className="mt-2 text-lg"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Explora nuestro catálogo completo de propiedades
            </p>
          </div>

          {/* Acciones del header */}
          <div className="flex space-x-3">
            <Button variant="outline" size="md">
              <HiFilter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline" size="md">
              <HiSearch className="w-4 h-4 mr-2" />
              Buscar
            </Button>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div 
            className="bg-primary-50 rounded-lg p-4 text-center"
            style={{ backgroundColor: 'var(--color-primary-50)' }}
          >
            <div 
              className="text-2xl font-bold flex items-center justify-center space-x-2"
              style={{ color: 'var(--color-primary-600)' }}
            >
              <HiHome className="w-6 h-6" />
              <span>100</span>
            </div>
            <div 
              className="text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Propiedades totales
            </div>
          </div>
          
          <div 
            className="bg-success-50 rounded-lg p-4 text-center"
            style={{ backgroundColor: 'var(--color-success-50)' }}
          >
            <div 
              className="text-2xl font-bold flex items-center justify-center space-x-2"
              style={{ color: 'var(--color-success-600)' }}
            >
              <HiLocationMarker className="w-6 h-6" />
              <span>8</span>
            </div>
            <div 
              className="text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Ciudades disponibles
            </div>
          </div>

          <div 
            className="bg-warning-50 rounded-lg p-4 text-center"
            style={{ backgroundColor: 'var(--color-warning-50)' }}
          >
            <div 
              className="text-2xl font-bold flex items-center justify-center space-x-2"
              style={{ color: 'var(--color-warning-600)' }}
            >
              <HiOfficeBuilding className="w-6 h-6" />
              <span>2</span>
            </div>
            <div 
              className="text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Tipos (Casa/Depto)
            </div>
          </div>

          <div 
            className="bg-info-50 rounded-lg p-4 text-center"
            style={{ backgroundColor: 'var(--color-info-50)' }}
          >
            <div 
              className="text-2xl font-bold flex items-center justify-center space-x-2"
              style={{ color: 'var(--color-info-600)' }}
            >
              <HiSparkles className="w-6 h-6" />
              <span>AI</span>
            </div>
            <div 
              className="text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Recomendaciones
            </div>
          </div>
        </div>

        {/* Lista de propiedades */}
        <PropertyList showRecommendations={true} />
      </div>
    </MainLayout>
  );
} 