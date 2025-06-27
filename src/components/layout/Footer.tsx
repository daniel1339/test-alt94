export function Footer() {
  return (
    <footer 
      className="bg-surface-gray border-t border-default"
      style={{ 
        backgroundColor: 'var(--color-surface-gray)',
        borderColor: 'var(--color-border)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          
          {/* Información principal */}
          <div>
            <p 
              className="text-lg font-medium"
              style={{ color: 'var(--color-text-primary)' }}
            >
              PropiedadesApp - Sistema de Recomendación
            </p>
            <p 
              className="text-sm mt-1"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Encuentra propiedades similares con tecnología inteligente
            </p>
          </div>

          {/* Links útiles */}
          <div className="flex justify-center space-x-6 text-sm">
            <a 
              href="/"
              className="text-muted hover:text-primary transition-colors focus-ring rounded px-2 py-1"
              style={{ transition: 'color var(--transition-fast)' }}
            >
              Inicio
            </a>
            <a 
              href="/properties"
              className="text-muted hover:text-primary transition-colors focus-ring rounded px-2 py-1"
              style={{ transition: 'color var(--transition-fast)' }}
            >
              Propiedades
            </a>
            <a 
              href="/favorites"
              className="text-muted hover:text-primary transition-colors focus-ring rounded px-2 py-1"
              style={{ transition: 'color var(--transition-fast)' }}
            >
              Favoritos
            </a>
          </div>

          {/* Copyright y atribución */}
          <div 
            className="pt-4 border-t border-light"
            style={{ borderColor: 'var(--color-border-light)' }}
          >
            <p 
              className="text-xs"
              style={{ color: 'var(--color-text-muted)' }}
            >
              © 2024 PropiedadesApp. Desarrollado para <span className="font-medium">Alt94</span> - Prueba Técnica
            </p>
            <p 
              className="text-xs mt-1"
              style={{ color: 'var(--color-text-light)' }}
            >
              Sistema construido con Next.js, TypeScript y algoritmos de similitud
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 