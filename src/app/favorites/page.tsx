import { MainLayout } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import Link from 'next/link';
import { HiHeart } from 'react-icons/hi';

export default function FavoritesPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        
        {/* Header de la página */}
        <div className="text-center space-y-4">
          <h1 
            className="text-3xl font-bold"
            style={{ 
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 'var(--font-weight-bold)'
            }}
          >
            Mis Propiedades Favoritas
          </h1>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Aquí encontrarás todas las propiedades que has marcado como favoritas
          </p>
        </div>

        {/* Estado vacío (temporal) */}
        <Card padding="lg" className="text-center">
          <div className="space-y-6">
            <HiHeart 
              className="mx-auto text-6xl"
              style={{ color: 'var(--color-warning-500)' }}
            />
            
            <div className="space-y-2">
              <h3 
                className="text-xl font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Aún no tienes favoritos
              </h3>
              <p 
                className="text-sm max-w-md mx-auto"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Comienza explorando propiedades y marca las que más te gusten como favoritas. 
                Aparecerán aquí para que puedas acceder fácilmente.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties">
                <Button variant="primary" size="md">
                  Explorar Propiedades
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="md">
                  Volver al Inicio
                </Button>
              </Link>
            </div>

            <div 
              className="text-xs pt-4 border-t border-default"
              style={{ 
                color: 'var(--color-text-muted)',
                borderColor: 'var(--color-border)'
              }}
            >
              🚧 Funcionalidad de favoritos será implementada en próximos pasos
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
} 