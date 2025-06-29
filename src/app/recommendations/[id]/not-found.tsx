import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { Card, Button, Breadcrumb } from '@/components/ui';
import { createNotFoundBreadcrumb } from '@/utils/breadcrumb';
import { HiHome, HiExclamationCircle, HiSparkles } from 'react-icons/hi';

export default function RecommendationsNotFound() {
  const breadcrumbItems = createNotFoundBreadcrumb('Recomendaciones');

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
                  Recomendaciones no encontradas
                </h1>
                <p className="text-sm text-secondary">
                  No se pudieron cargar las recomendaciones para esta propiedad. 
                  La propiedad puede no existir o no tener similares disponibles.
                </p>
              </div>

              <div className="p-4 bg-info-50 rounded-lg border border-info-200">
                <div className="flex items-start space-x-3">
                  <HiSparkles className="w-5 h-5 text-info-600 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="text-sm font-semibold text-info-700 mb-1">
                      ¿Qué puedes hacer?
                    </h3>
                    <ul className="text-xs text-info-600 space-y-1">
                      <li>• Verifica que el ID de la propiedad sea correcto</li>
                      <li>• Explora propiedades similares manualmente</li>
                      <li>• Contacta con soporte si el problema persiste</li>
                    </ul>
                  </div>
                </div>
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