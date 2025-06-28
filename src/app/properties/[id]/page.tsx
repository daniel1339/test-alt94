import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import { PropertyDetail } from '@/components/property';
import { Breadcrumb } from '@/components/ui';
import { Property } from '@/types/property';

interface PageProps {
  params: Promise<{ id: string }>;
}

interface ApiResponse {
  success: boolean;
  data: Property;
  message?: string;
}

// Función para obtener la propiedad
async function getProperty(id: string): Promise<Property | null> {
  try {
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/properties/${id}`, {
      cache: 'no-store' // Para obtener datos frescos
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Error al cargar la propiedad');
    }

    const data: ApiResponse = await response.json();
    
    if (data.success) {
      return data.data;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

// Metadata dinámica para SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    return {
      title: 'Propiedad no encontrada - PropiedadesApp',
      description: 'La propiedad que buscas no está disponible.'
    };
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

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
  const property = await getProperty(id);

  // Si no se encuentra la propiedad, mostrar 404
  if (!property) {
    notFound();
  }

  // Items del breadcrumb
  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Propiedades', href: '/properties' },
    { label: property.titulo, isActive: true }
  ];

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