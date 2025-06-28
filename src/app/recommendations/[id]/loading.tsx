import { MainLayout } from '@/components/layout';
import { Card, Breadcrumb, LoadingSpinner, TextSkeleton } from '@/components/ui';
import { createLoadingBreadcrumb } from '@/utils/breadcrumb';

export default function RecommendationsLoading() {
  const breadcrumbItems = createLoadingBreadcrumb('Recomendaciones');

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Breadcrumb navigation */}
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Loading content */}
        <div className="space-y-6 animate-pulse">
          
          {/* Botón de regreso skeleton */}
          <div className="skeleton skeleton-text w-32"></div>

          {/* Header de propiedad original skeleton */}
          <Card padding="lg" shadow="md" className="bg-primary-50 border border-primary-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-xl bg-primary-600 flex items-center justify-center">
                  <LoadingSpinner size="sm" color="secondary" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="skeleton skeleton-title w-48"></div>
                  <div className="skeleton skeleton-text w-64"></div>
                  <div className="skeleton skeleton-text w-40"></div>
                </div>
              </div>
              
              <div className="skeleton skeleton-text w-32 h-6"></div>
            </div>
          </Card>

          {/* Descripción del algoritmo skeleton */}
          <Card padding="md" className="bg-info-50 border border-info-200">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-info-300 rounded mt-0.5 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="skeleton skeleton-text w-48 mb-2"></div>
                <TextSkeleton lines={2} />
              </div>
            </div>
          </Card>

          {/* Header de recomendaciones skeleton */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-primary-300 rounded"></div>
              <div className="skeleton skeleton-text w-40"></div>
            </div>
            <div className="skeleton skeleton-text w-64"></div>
          </div>

          {/* Grid de recomendaciones skeleton */}
          <div className="grid-properties">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} padding="none" shadow="md" className="overflow-hidden">
                <div className="skeleton skeleton-image"></div>
                <div className="p-4 space-y-3">
                  <div className="skeleton skeleton-text w-3/4"></div>
                  <div className="skeleton skeleton-text w-1/2"></div>
                  <div className="flex space-x-4">
                    <div className="skeleton skeleton-text w-16"></div>
                    <div className="skeleton skeleton-text w-20"></div>
                  </div>
                  <div className="skeleton skeleton-text w-24 h-8"></div>
                  <div className="flex space-x-2">
                    <div className="skeleton skeleton-button flex-1"></div>
                    <div className="skeleton skeleton-button w-8"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Footer CTA skeleton */}
          <Card padding="lg" className="bg-surface-gray text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto"></div>
              <div className="skeleton skeleton-text w-48 mx-auto"></div>
              <div className="skeleton skeleton-text w-64 mx-auto"></div>
              <div className="skeleton skeleton-button w-48 mx-auto"></div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
} 