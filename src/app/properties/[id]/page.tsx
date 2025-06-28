import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import { PropertyDetail } from '@/components/property';
import { Breadcrumb } from '@/components/ui';
import { getPropertySSR } from '@/hooks/useProperty';
import { createPropertyDetailBreadcrumb } from '@/utils/breadcrumb';
import { formatPrice } from '@/utils/format';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Metadata dinámica para SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertySSR(id);

  if (!property) {
    return {
      title: 'Propiedad no encontrada - PropiedadesApp',
      description: 'La propiedad que buscas no está disponible.'
    };
  }

  return {
    title: `${property.titulo} - ${property.ciudad} | PropiedadesApp`,
    description: `${property.tipo} en ${property.ciudad} con ${property.ambientes} ambientes y ${property.metros_cuadrados} m². Precio: ${formatPrice(property.precio)}`,
    openGraph: {
      title: property.titulo,
      description: `${property.tipo} en ${property.ciudad} - ${formatPrice(property.precio)}`,
      images: [property.imagen],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: property.titulo,
      description: `${property.tipo} en ${property.ciudad} - ${formatPrice(property.precio)}`,
      images: [property.imagen],
    }
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = await getPropertySSR(id);

  // Si no se encuentra la propiedad, mostrar 404
  if (!property) {
    notFound();
  }

  // Items del breadcrumb usando utilidad centralizada
  const breadcrumbItems = createPropertyDetailBreadcrumb(property.titulo);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Breadcrumb navigation */}
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Componente principal de detalle */}
        <PropertyDetail property={property} />
      </div>
    </MainLayout>
  );
} 