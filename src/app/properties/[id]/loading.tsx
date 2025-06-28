import { MainLayout } from '@/components/layout';
import { Card, Breadcrumb, LoadingSpinner, TextSkeleton } from '@/components/ui';

export default function PropertyDetailLoading() {
  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Propiedades', href: '/properties' },
    { label: 'Cargando...', isActive: true }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Breadcrumb navigation */}
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Loading content */}
        <div className="space-y-8 animate-pulse">
          
          {/* Header skeleton */}
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="space-y-3 flex-1">
                <div 
                  className="h-8 bg-gray-200 rounded w-2/3"
                  style={{ backgroundColor: 'var(--color-gray-200)' }}
                ></div>
                <div className="flex items-center space-x-4">
                  <div 
                    className="h-5 bg-gray-200 rounded w-32"
                    style={{ backgroundColor: 'var(--color-gray-200)' }}
                  ></div>
                  <div 
                    className="h-8 bg-gray-200 rounded-full w-20"
                    style={{ backgroundColor: 'var(--color-gray-200)' }}
                  ></div>
                </div>
              </div>
              
              {/* Action buttons skeleton */}
              <div className="flex space-x-3">
                <div 
                  className="h-10 bg-gray-200 rounded w-24"
                  style={{ backgroundColor: 'var(--color-gray-200)' }}
                ></div>
                <div 
                  className="h-10 bg-gray-200 rounded w-24"
                  style={{ backgroundColor: 'var(--color-gray-200)' }}
                ></div>
                <div 
                  className="h-10 bg-gray-200 rounded w-32"
                  style={{ backgroundColor: 'var(--color-gray-200)' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Main grid skeleton */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Gallery skeleton - 2 columns */}
            <div className="lg:col-span-2">
              <div 
                className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-gray-200)' }}
              >
                <LoadingSpinner size="lg" color="secondary" />
              </div>
            </div>

            {/* Sidebar skeleton - 1 column */}
            <div className="space-y-6">
              {/* Price card skeleton */}
              <Card padding="lg" shadow="md">
                <div className="text-center space-y-3">
                  <div 
                    className="h-10 bg-gray-200 rounded mx-auto w-48"
                    style={{ backgroundColor: 'var(--color-gray-200)' }}
                  ></div>
                  <div 
                    className="h-4 bg-gray-200 rounded mx-auto w-32"
                    style={{ backgroundColor: 'var(--color-gray-200)' }}
                  ></div>
                  <div 
                    className="h-12 bg-gray-200 rounded w-full"
                    style={{ backgroundColor: 'var(--color-gray-200)' }}
                  ></div>
                </div>
              </Card>

              {/* Features card skeleton */}
              <Card padding="lg" shadow="md">
                <div 
                  className="h-6 bg-gray-200 rounded w-32 mb-4"
                  style={{ backgroundColor: 'var(--color-gray-200)' }}
                ></div>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div 
                        className="h-5 bg-gray-200 rounded w-24"
                        style={{ backgroundColor: 'var(--color-gray-200)' }}
                      ></div>
                      <div 
                        className="h-5 bg-gray-200 rounded w-16"
                        style={{ backgroundColor: 'var(--color-gray-200)' }}
                      ></div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Additional info card skeleton */}
              <Card padding="lg" shadow="md">
                <div 
                  className="h-6 bg-gray-200 rounded w-40 mb-4"
                  style={{ backgroundColor: 'var(--color-gray-200)' }}
                ></div>
                <TextSkeleton lines={3} />
              </Card>
            </div>
          </div>

          {/* Description card skeleton */}
          <Card padding="lg" shadow="md">
            <div 
              className="h-6 bg-gray-200 rounded w-32 mb-4"
              style={{ backgroundColor: 'var(--color-gray-200)' }}
            ></div>
            <TextSkeleton lines={5} />
          </Card>
        </div>
      </div>
    </MainLayout>
  );
} 