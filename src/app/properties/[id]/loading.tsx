import { MainLayout } from '@/components/layout';
import { Card, Breadcrumb, LoadingSpinner, TextSkeleton } from '@/components/ui';
import { createLoadingBreadcrumb } from '@/utils/breadcrumb';

export default function PropertyDetailLoading() {
  const breadcrumbItems = createLoadingBreadcrumb('Propiedades');

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
                <div className="skeleton skeleton-title w-2/3"></div>
                <div className="flex items-center space-x-4">
                  <div className="skeleton skeleton-text w-32"></div>
                  <div className="skeleton skeleton-text w-20 rounded-full"></div>
                </div>
              </div>
              
              {/* Action buttons skeleton */}
              <div className="flex space-x-3">
                <div className="skeleton skeleton-button w-24"></div>
                <div className="skeleton skeleton-button w-24"></div>
                <div className="skeleton skeleton-button w-32"></div>
              </div>
            </div>
          </div>

          {/* Main grid skeleton */}
          <div className="grid-detail">
            
            {/* Gallery skeleton - 2 columns */}
            <div className="lg:col-span-2">
              <div className="skeleton skeleton-image aspect-video rounded-xl flex items-center justify-center">
                <LoadingSpinner size="lg" color="secondary" />
              </div>
            </div>

            {/* Sidebar skeleton - 1 column */}
            <div className="space-y-6">
              {/* Price card skeleton */}
              <Card padding="lg" shadow="md">
                <div className="text-center space-y-3">
                  <div className="skeleton skeleton-title w-48 mx-auto"></div>
                  <div className="skeleton skeleton-text w-32 mx-auto"></div>
                  <div className="skeleton skeleton-button w-full"></div>
                </div>
              </Card>

              {/* Features card skeleton */}
              <Card padding="lg" shadow="md">
                <div className="skeleton skeleton-text w-32 mb-4"></div>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="feature-row">
                      <div className="skeleton skeleton-text w-24"></div>
                      <div className="skeleton skeleton-text w-16"></div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Additional info card skeleton */}
              <Card padding="lg" shadow="md">
                <div className="skeleton skeleton-text w-40 mb-4"></div>
                <TextSkeleton lines={3} />
              </Card>
            </div>
          </div>

          {/* Description card skeleton */}
          <Card padding="lg" shadow="md">
            <div className="skeleton skeleton-text w-32 mb-4"></div>
            <TextSkeleton lines={5} />
          </Card>
        </div>
      </div>
    </MainLayout>
  );
} 