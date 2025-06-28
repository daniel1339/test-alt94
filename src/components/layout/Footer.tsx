import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-light mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold bg-primary-600">
                P
              </div>
              <h3 className="text-lg font-semibold text-primary">
                PropiedadesApp
              </h3>
            </div>
            <p className="text-sm leading-relaxed max-w-md text-secondary">
              Sistema de recomendación de propiedades con algoritmo inteligente. 
              Encuentra tu hogar ideal basado en ubicación, tipo, precio y características.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/properties" 
                  className="text-secondary hover:text-primary transition-colors"
                >
                  Todas las Propiedades
                </Link>
              </li>
              <li>
                <Link 
                  href="/favorites" 
                  className="text-secondary hover:text-primary transition-colors"
                >
                  Mis Favoritos
                </Link>
              </li>
              <li>
                <Link 
                  href="/" 
                  className="text-secondary hover:text-primary transition-colors"
                >
                  Inicio
                </Link>
              </li>
            </ul>
          </div>

          {/* Información técnica */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">Tecnología</h4>
            <ul className="space-y-2 text-sm text-secondary">
              <li>Next.js 15.3.4</li>
              <li>React 19</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-light text-center">
          <p className="text-sm text-muted">
            © {currentYear} PropiedadesApp. 
            <span className="text-light ml-1">
              Desarrollado como prueba técnica para Alt94.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
} 