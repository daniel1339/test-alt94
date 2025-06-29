import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { Card, Button, Breadcrumb } from '@/components/ui';
import { createNotFoundBreadcrumb } from '@/utils/breadcrumb';
import { HiHome, HiExclamationCircle } from 'react-icons/hi';

export default function PropertyNotFound() {
  const breadcrumbItems = createNotFoundBreadcrumb('Propiedades');

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Breadcrumb navigation */}
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Error content */}
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card padding="lg" className="text-center max-w-md mx-auto">
            <div className="space-y-6">
              <HiExclamationCircle className="mx-auto text-6xl text-warning-500" />
              
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-primary">
                  Propiedad no encontrada
                </h1>
                <p className="text-sm text-secondary">
                  La propiedad que buscas no existe o ya no está disponible. 
                  Puede que haya sido vendida o el enlace sea incorrecto.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/properties">
                  <Button variant="primary" size="md">
                    <HiHome className="w-4 h-4 mr-2" />
                    Ver Propiedades
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" size="md">
                    Volver al Inicio
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
} 