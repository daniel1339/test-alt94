import { MainLayout } from '@/components/layout';
import { PropertyListWithFilters } from '@/components/property';
import { getAllPropertiesSSR, getPropertiesStatsSSR } from '@/lib/ssr/properties';
import { HiHome, HiLocationMarker, HiOfficeBuilding, HiSparkles } from 'react-icons/hi';

export default async function PropertiesPage() {
  const [properties, stats] = await Promise.all([
    getAllPropertiesSSR(),
    getPropertiesStatsSSR()
  ]);
  return (
    <MainLayout>
      <div className="space-y-8">
        
        {/* Header de la página */}
        <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-primary">
              Propiedades Disponibles
            </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Explora nuestro catálogo completo con búsqueda avanzada, filtros y recomendaciones inteligentes
          </p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid-stats">
          <div className="stat-card bg-primary-50">
            <div className="text-2xl font-bold flex items-center justify-center space-x-2 text-primary-600">
              <HiHome className="w-6 h-6" />
              <span>{stats.total}</span>
            </div>
            <div className="text-sm text-secondary">
              Propiedades totales
            </div>
          </div>
          
          <div className="stat-card bg-success-50">
            <div className="text-2xl font-bold flex items-center justify-center space-x-2 text-success-600">
              <HiLocationMarker className="w-6 h-6" />
              <span>{stats.cities}</span>
            </div>
            <div className="text-sm text-secondary">
              Ciudades disponibles
            </div>
          </div>

          <div className="stat-card bg-warning-50">
            <div className="text-2xl font-bold flex items-center justify-center space-x-2 text-warning-600">
              <HiOfficeBuilding className="w-6 h-6" />
              <span>{stats.types}</span>
            </div>
            <div className="text-sm text-secondary">
              Tipos disponibles
            </div>
          </div>

          <div className="stat-card bg-info-50">
            <div className="text-2xl font-bold flex items-center justify-center space-x-2 text-info-600">
              <HiSparkles className="w-6 h-6" />
              <span>95%</span>
            </div>
            <div className="text-sm text-secondary">
              Precisión recomendaciones
            </div>
          </div>
        </div>

        {/* Lista de propiedades con filtros */}
        <PropertyListWithFilters 
          initialProperties={properties} 
          showRecommendations={true}
          itemsPerPage={12}
        />
      </div>
    </MainLayout>
  );
} 