import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import { RecommendationsList } from '@/components/property';
import { Breadcrumb, Card, Button } from '@/components/ui';
import { getPropertySSR, getRecommendationsSSR } from '@/lib/ssr/property';
import { createRecommendationsBreadcrumb } from '@/utils/breadcrumb';
import { formatPrice } from '@/utils/format';
import Link from 'next/link';
import { HiArrowLeft, HiHome, HiSparkles } from 'react-icons/hi';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Metadata dinámica para SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertySSR(id);

  if (!property) {
    return {
      title: 'Recomendaciones no encontradas - PropiedadesApp',
      description: 'No se pudieron cargar las recomendaciones para esta propiedad.'
    };
  }

  return {
    title: `Propiedades Similares a ${property.titulo} | PropiedadesApp`,
    description: `Descubre propiedades similares a ${property.tipo} en ${property.ciudad}. Recomendaciones inteligentes basadas en ubicación, tipo y precio.`,
    openGraph: {
      title: `Propiedades Similares a ${property.titulo}`,
      description: `${property.tipo} en ${property.ciudad} - ${formatPrice(property.precio)}`,
      images: [property.imagen],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Similares a ${property.titulo}`,
      description: `${property.tipo} en ${property.ciudad} - ${formatPrice(property.precio)}`,
      images: [property.imagen],
    }
  };
}

export default async function RecommendationsPage({ params }: PageProps) {
  const { id } = await params;
  
  // Cargar propiedad original y recomendaciones en paralelo
  const [property, recommendations] = await Promise.all([
    getPropertySSR(id),
    getRecommendationsSSR(id)
  ]);

  // Si no se encuentra la propiedad original, mostrar 404
  if (!property) {
    notFound();
  }

  // Items del breadcrumb usando utilidad centralizada
  const breadcrumbItems = createRecommendationsBreadcrumb(property.titulo);

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Breadcrumb navigation */}
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Header de la página */}
        <div className="space-y-6">
          {/* Botón de regreso */}
          <Link 
            href={`/properties/${property.id}`}
            className="inline-flex items-center text-sm text-secondary hover:text-primary transition-colors"
          >
            <HiArrowLeft className="w-4 h-4 mr-2" />
            Volver a la propiedad
          </Link>

          {/* Información de la propiedad original */}
          <Card padding="lg" shadow="md" className="bg-primary-50 border border-primary-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-primary-600">
                  <HiHome className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-primary mb-1">
                    Propiedades Similares
                  </h1>
                  <p className="text-lg text-primary-700 font-medium">
                    {property.titulo}
                  </p>
                  <p className="text-sm text-secondary">
                    {property.tipo} en {property.ciudad} • {formatPrice(property.precio)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <HiSparkles className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-medium text-primary-700">
                  Recomendaciones IA
                </span>
              </div>
            </div>
          </Card>

          {/* Descripción del algoritmo */}
          <Card padding="md" className="bg-info-50 border border-info-200">
            <div className="flex items-start space-x-3">
              <HiSparkles className="w-5 h-5 text-info-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-info-700 mb-1">
                  ¿Cómo funciona nuestro algoritmo?
                </h3>
                <p className="text-xs text-info-600 leading-relaxed">
                  Utilizamos inteligencia artificial para encontrar propiedades similares basándose en: 
                  <strong> ubicación (40%)</strong>, <strong>tipo de propiedad (30%)</strong>, 
                  <strong> rango de precio (20%)</strong> y <strong>cantidad de ambientes (10%)</strong>.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Lista de recomendaciones */}
        <RecommendationsList 
          propertyId={id}
          initialRecommendations={recommendations}
        />
      </div>
    </MainLayout>
  );
} 