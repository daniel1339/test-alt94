import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { Card, Button, Breadcrumb } from '@/components/ui';
import { HiHome, HiExclamationCircle } from 'react-icons/hi';

export default function PropertyNotFound() {
  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Propiedades', href: '/properties' },
    { label: 'No encontrada', isActive: true }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Breadcrumb navigation */}
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Contenido de error */}
        <div className="min-h-[60vh] flex items-center justify-center">
          <Card padding="lg" className="text-center max-w-md mx-auto">
            <div className="space-y-6">
              <HiExclamationCircle 
                className="mx-auto text-6xl"
                style={{ color: 'var(--color-warning-500)' }}
              />
              
              <div className="space-y-2">
                <h1 
                  className="text-2xl font-bold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Propiedad no encontrada
                </h1>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
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