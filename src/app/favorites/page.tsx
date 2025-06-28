import { MainLayout } from '@/components/layout';
import { FavoritesList } from '@/components/ui';

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

        {/* Lista de favoritos */}
        <FavoritesList />
      </div>
    </MainLayout>
  );
} 