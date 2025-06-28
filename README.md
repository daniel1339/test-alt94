# PropiedadesApp - Sistema de Recomendación Inmobiliaria

**Aplicación web desarrollada con Next.js 15 para visualizar propiedades inmobiliarias y generar recomendaciones inteligentes basadas en algoritmos de similitud.**

## Descripción General

PropiedadesApp es una plataforma completa que permite:
- Visualizar un catálogo de 100 propiedades inmobiliarias
- Buscar y filtrar propiedades por diversos criterios
- Generar recomendaciones inteligentes basadas en similitud
- Gestionar una lista de propiedades favoritas
- Explorar detalles completos de cada propiedad

## Tecnologías Utilizadas

- **Framework**: Next.js 15.3.4 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + Sistema de diseño personalizado
- **Estado**: React Context API + localStorage
- **Algoritmos**: Sistema de similitud con pesos ponderados
- **Optimización**: Server-Side Rendering (SSR)

## Instalación y Ejecución

```bash
# Clonar el repositorio
git clone https://github.com/daniel1339/test-alt94.git
cd test-alt94

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar tests
npm test
```

La aplicación estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
├── src/
│   ├── app/                    # Rutas y páginas (App Router)
│   │   ├── api/               # Endpoints del backend
│   │   ├── properties/        # Páginas de propiedades
│   │   ├── recommendations/   # Páginas de recomendaciones
│   │   └── favorites/         # Página de favoritos
│   ├── components/            # Componentes React reutilizables
│   │   ├── ui/               # Componentes base del sistema de diseño
│   │   ├── layout/           # Componentes de layout (Header, Footer)
│   │   └── property/         # Componentes específicos de propiedades
│   ├── contexts/             # Contextos de React (estado global)
│   ├── hooks/                # Hooks personalizados
│   ├── services/             # Lógica de negocio y servicios
│   ├── utils/                # Utilidades y helpers
│   ├── types/                # Definiciones de tipos TypeScript
│   ├── styles/               # Estilos globales y sistema de diseño
│   └── data/                 # Datos de muestra (properties.json)
├── docs/                      # Documentación técnica
└── __tests__/                # Tests unitarios y de integración
```

## Backend (APIs)

### Endpoints Disponibles

**GET /api/properties**
- Lista todas las propiedades con filtros opcionales
- Parámetros: `ciudad`, `tipo`, `minPrice`, `maxPrice`, `page`, `limit`
- Respuesta: Lista paginada de propiedades

**GET /api/properties/[id]**
- Obtiene una propiedad específica por ID
- Respuesta: Objeto de propiedad con todos sus detalles

**GET /api/recommendations/[id]**
- Genera recomendaciones para una propiedad específica
- Parámetros: `limit` (cantidad de recomendaciones)
- Respuesta: Lista de propiedades similares con scores de similitud

### Algoritmo de Recomendaciones

El sistema utiliza un algoritmo de similitud ponderado que evalúa:
- **Ubicación (40%)**: Misma ciudad
- **Tipo de propiedad (30%)**: Casa o Departamento
- **Rango de precio (20%)**: Proximidad en valores
- **Cantidad de ambientes (10%)**: Similaridad en tamaño

## Frontend (Interfaz)

### Páginas Principales

- **/** - Página de inicio con estadísticas y búsqueda
- **/properties** - Listado completo con filtros avanzados
- **/properties/[id]** - Detalle de propiedad individual
- **/recommendations/[id]** - Recomendaciones para una propiedad
- **/favorites** - Lista de propiedades guardadas

### Componentes Clave

**Sistema de Propiedades**
- `PropertyCard`: Tarjeta individual de propiedad
- `PropertyList`: Grid responsive de propiedades
- `PropertyDetail`: Vista completa de una propiedad
- `PropertyGallery`: Galería de imágenes con navegación

**Sistema de Búsqueda**
- `SearchInput`: Búsqueda por texto libre
- `FilterSidebar`: Filtros avanzados (ciudad, tipo, precio)
- `SortSelector`: Ordenamiento por diversos criterios
- `Pagination`: Navegación entre páginas

**Sistema de Favoritos**
- `FavoriteButton`: Botón para agregar/quitar favoritos
- `FavoritesCounter`: Contador en el header
- `FavoritesList`: Lista completa de favoritos guardados

## Sistema de Diseño

La aplicación utiliza un sistema de diseño consistente con:
- **Colores**: Paleta definida con variables CSS personalizadas
- **Tipografía**: Jerarquía clara con tamaños responsivos
- **Espaciados**: Sistema de espaciado uniforme
- **Componentes**: Biblioteca de componentes reutilizables
- **Animaciones**: Transiciones suaves y estados de carga

Ver documentación completa en: `docs/design-system.md`

## Estado y Gestión de Datos

### Contextos de React
- **FavoritesContext**: Gestión de propiedades favoritas con persistencia en localStorage

### Hooks Personalizados
- **useProperties**: Manejo de listas de propiedades
- **useProperty**: Gestión de propiedad individual
- **useRecommendations**: Sistema de recomendaciones
- **useSearchAndFilters**: Búsqueda y filtrado avanzado

## Optimizaciones

### Performance
- Server-Side Rendering (SSR) para SEO y carga inicial
- Lazy loading de imágenes
- Componentes optimizados con memo y useMemo
- Skeleton loading para mejor UX

### SEO
- Metadata dinámica para cada página
- Open Graph y Twitter Cards
- URLs semánticas y breadcrumbs
- Estructura HTML accesible

## Documentación Adicional

- **[Arquitectura](./docs/ARCHITECTURE.md)** - Explicación detallada de la arquitectura
- **[Backend](./docs/BACKEND.md)** - Documentación completa del backend
- **[Frontend](./docs/FRONTEND.md)** - Guía de componentes y UI
- **[Componentes](./docs/COMPONENTS.md)** - Documentación de todos los componentes
- **[Sistema de Diseño](./docs/design-system.md)** - Guía completa de estilos

## Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construcción para producción
npm run start        # Servidor de producción
npm run test         # Ejecutar tests
npm run lint         # Verificar código con ESLint
npm run type-check   # Verificar tipos TypeScript
```

## Datos de Muestra

La aplicación incluye 100 propiedades de muestra ubicadas en ciudades argentinas principales:
- Buenos Aires, Córdoba, Rosario, La Plata, Mendoza, Tucumán, Salta, y más
- Tipos: Casas y Departamentos
- Rangos de precio: $50,000 - $500,000
- Variedad de tamaños y características

## Contribución

Para contribuir al proyecto:
1. Fork del repositorio
2. Crear una rama para la nueva funcionalidad
3. Implementar cambios siguiendo las convenciones del proyecto
4. Agregar tests si es necesario
5. Enviar Pull Request con descripción detallada

## Licencia

Este proyecto ha sido desarrollado como prueba técnica para Alt94.
