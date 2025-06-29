import Link from 'next/link';
import { Button } from '@/components/ui';
import { MainLayout } from '@/components/layout';
import { 
  HiHome,
  HiStar,
  HiHeart,
  HiSearch,
  HiChartBar,
  HiShieldCheck,
  HiDeviceMobile,
  HiArrowRight
} from 'react-icons/hi';

export default function HomePage() {
  return (
    <MainLayout>
      <div className="space-y-16">
        
        {/* Hero Section */}
        <section className="text-center space-y-8 py-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Encuentra tu Propiedad
              <br />
              <span className="text-primary-600">Perfecta</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-secondary">
              Encuentra propiedades similares comparando ubicación, tipo, precio y número de habitaciones 
              para ayudarte a descubrir opciones que se adapten a lo que buscas.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <Button variant="primary" size="lg">
                <HiSearch className="w-5 h-5 mr-2" />
                Explorar Propiedades
              </Button>
            </Link>
            <Link href="/favorites">
              <Button variant="outline" size="lg">
                <HiHeart className="w-5 h-5 mr-2" />
                Mis Favoritos
              </Button>
            </Link>
          </div>
        </section>

        {/* Main Features */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-xl mx-auto flex items-center justify-center bg-primary-100">
              <HiHome className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-primary">
              100+ Propiedades
            </h3>
            <p className="text-secondary">
              Amplio catálogo de casas y departamentos en múltiples ciudades argentinas.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-xl mx-auto flex items-center justify-center bg-success-100">
              <HiStar className="w-8 h-8 text-success-600" />
            </div>
            <h3 className="text-xl font-semibold text-primary">
              Recomendaciones Inteligentes
            </h3>
            <p className="text-secondary">
              Sistema de similitud que encuentra propiedades parecidas según ubicación, tipo y precio.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-xl mx-auto flex items-center justify-center bg-warning-100">
              <HiHeart className="w-8 h-8 text-warning-600" />
            </div>
            <h3 className="text-xl font-semibold text-primary">
              Lista de Favoritos
            </h3>
            <p className="text-secondary">
              Guarda y organiza las propiedades que más te interesan en tu lista personal.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-xl mx-auto flex items-center justify-center bg-info-100">
              <HiSearch className="w-8 h-8 text-info-600" />
            </div>
            <h3 className="text-xl font-semibold text-primary">
              Navegación Fácil
            </h3>
            <p className="text-secondary">
              Explora propiedades por ciudad, visualiza detalles completos y encuentra lo que necesitas rápidamente.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-xl mx-auto flex items-center justify-center bg-error-100">
              <HiChartBar className="w-8 h-8 text-error-600" />
            </div>
            <h3 className="text-xl font-semibold text-primary">
              Información Completa
            </h3>
            <p className="text-secondary">
              Datos detallados de cada propiedad incluyendo precio, ubicación, tipo y características principales.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-xl mx-auto flex items-center justify-center bg-primary-100">
              <HiShieldCheck className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-primary">
              Información Confiable
            </h3>
            <p className="text-secondary">
              Datos verificados y actualizados con detalles completos de cada propiedad.
            </p>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="bg-surface-gray rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary">
              Nuestros Números
            </h2>
            <p className="text-secondary mt-2">
              Datos actualizados del sistema
            </p>
          </div>
          
          <div className="grid-stats">
            <div className="stat-card bg-surface">
              <div className="text-3xl font-bold text-primary-600">100</div>
              <div className="text-sm text-secondary">Propiedades</div>
            </div>
            <div className="stat-card bg-surface">
              <div className="text-3xl font-bold text-success-600">8</div>
              <div className="text-sm text-secondary">Ciudades</div>
            </div>
            <div className="stat-card bg-surface">
              <div className="text-3xl font-bold text-warning-600">2</div>
              <div className="text-sm text-secondary">Tipos</div>
            </div>
            <div className="stat-card bg-surface">
              <div className="text-3xl font-bold text-info-600">95%</div>
              <div className="text-sm text-secondary">Precisión</div>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="text-center space-y-8">
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-xl mx-auto flex items-center justify-center bg-info-100">
              <HiDeviceMobile className="w-8 h-8 text-info-600" />
            </div>
            <h2 className="text-2xl font-bold text-primary">
              Tecnología Moderna
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-secondary">
              Construido con las últimas tecnologías web para garantizar la mejor experiencia de usuario.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-medium">
              Next.js 15.3.4
            </span>
            <span className="px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-medium">
              React 19
            </span>
            <span className="px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-medium">
              TypeScript
            </span>
            <span className="px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-medium">
              Tailwind CSS
            </span>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="text-center space-y-6 py-12">
          <h2 className="text-3xl font-bold text-primary">
            ¿Listo para encontrar tu próxima propiedad?
          </h2>
          <p className="text-lg text-secondary">
            Comienza explorando nuestro catálogo completo
          </p>
          <Link href="/properties">
            <Button variant="primary" size="lg">
              Ver Todas las Propiedades
              <HiArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </section>
      </div>
    </MainLayout>
  );
}
