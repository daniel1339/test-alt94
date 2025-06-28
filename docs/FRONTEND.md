# Frontend - Componentes y UI

## Visión General

El frontend de PropiedadesApp está construido con React 18 y Next.js 15, utilizando el App Router para navegación y un sistema de componentes modular y reutilizable.

## Estructura del Frontend

### Páginas y Routing

```
src/app/
├── layout.tsx             # Layout raíz de la aplicación
├── page.tsx              # Página de inicio (/)
├── globals.css           # Estilos globales
├── properties/
│   ├── page.tsx          # Lista de propiedades (/properties)
│   └── [id]/
│       ├── page.tsx      # Detalle propiedad (/properties/[id])
│       ├── loading.tsx   # Estado de carga
│       └── not-found.tsx # Error 404
├── recommendations/
│   └── [id]/
│       ├── page.tsx      # Recomendaciones (/recommendations/[id])
│       ├── loading.tsx   # Estado de carga
│       └── not-found.tsx # Error 404
└── favorites/
    └── page.tsx          # Lista de favoritos (/favorites)
```

### Componentes

```
src/components/
├── ui/                   # Componentes base del sistema de diseño
├── layout/              # Componentes de estructura
├── property/            # Componentes específicos de propiedades
└── index.ts             # Exports centralizados
```

## Páginas Principales

### Página de Inicio (/)
- Estadísticas generales de propiedades
- Búsqueda rápida por ciudad
- Acceso directo a propiedades populares

### Lista de Propiedades (/properties)
- Grid responsive de todas las propiedades
- Sistema de filtros avanzados
- Paginación y búsqueda por texto

### Detalle de Propiedad (/properties/[id])
- Información completa de la propiedad
- Galería de imágenes
- Sistema de favoritos
- Recomendaciones similares

### Favoritos (/favorites)
- Lista de propiedades guardadas
- Gestión completa de favoritos

## Componentes de Layout

### Header
- Logo y navegación principal
- Contador de favoritos
- Menu móvil responsive

### Footer
- Links de navegación
- Información de copyright

## Componentes de Propiedades

### PropertyCard
Tarjeta individual de propiedad con:
- Imagen con skeleton loading
- Información clave (precio, ubicación, tipo)
- Botón de favoritos integrado
- Hover effects y animations

```tsx
interface PropertyCardProps {
  property: Property;
  showRecommendations?: boolean;
  className?: string;
}
```

### PropertyList
Grid responsive que maneja:
- Estados de loading con skeletons
- Estado vacío con mensaje
- Integración con hooks de propiedades

### PropertyDetail
Vista completa que incluye:
- Header con título y precio
- Galería de imágenes
- Características detalladas
- Botones de acción

### PropertyGallery
Galería con:
- Navegación con flechas
- Thumbnails clickeables
- Indicadores de posición
- Responsive design

## Componentes UI Base

### Button
**Variantes:** primary, secondary, outline, ghost, success, warning, error
**Tamaños:** sm, md, lg

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

### Card
Componente base con configuraciones de:
- padding, shadow, rounded, border, hover

### SearchInput
Búsqueda con:
- Búsqueda en tiempo real
- Iconos contextuales
- Botón para limpiar
- Estados de focus

### FilterSidebar
Filtros por:
- Ciudad (select multiple)
- Tipo de propiedad (radio buttons)
- Rango de precios (range sliders)

### Loading Components
```tsx
<LoadingSpinner size="lg" color="primary" />
<LoadingCard rows={4} />
<TextSkeleton lines={3} />
```

## Sistema de Favoritos

### FavoritesContext
Estado global con:
```typescript
interface FavoritesContextType {
  favorites: Property[];
  addToFavorites: (property: Property) => void;
  removeFromFavorites: (propertyId: number) => void;
  toggleFavorite: (property: Property) => void;
  isFavorite: (propertyId: number) => boolean;
  favoriteCount: number;
  clearFavorites: () => void;
  isLoading: boolean;
}
```

### FavoriteButton
**Variantes:**
- `icon` - Solo icono (ideal para cards)
- `button` - Botón completo con texto

**Estados:**
- Activo (corazón rojo lleno)
- Inactivo (corazón gris vacío)

### FavoritesCounter
- Badge con número de favoritos
- Estados responsive
- Link a página de favoritos

## Hooks Personalizados

### useProperties
```typescript
interface UsePropertiesReturn {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}
```

### useProperty
Para obtención de propiedad individual con cache automático.

### useRecommendations
Para generación de recomendaciones con scores de similitud.

### useSearchAndFilters
Estado completo de búsqueda y filtros:
```typescript
interface UseSearchAndFiltersReturn {
  searchQuery: string;
  filters: FilterState;
  filteredProperties: Property[];
  setSearchQuery: (query: string) => void;
  setFilters: (filters: FilterState) => void;
  clearAllFilters: () => void;
  availableCities: string[];
  availableTypes: string[];
}
```

## Responsive Design

**Breakpoints:**
- `sm`: 640px (tablets)
- `md`: 768px (tablets grandes)
- `lg`: 1024px (desktop)
- `xl`: 1280px (desktop grande)

**Estrategia:**
- Mobile-first approach
- Componentes adaptativos
- Grids responsivos automáticos

## Optimizaciones

### Performance
```typescript
// Memoización de componentes
const PropertyCard = React.memo(function PropertyCard({ property }) {
  // ...
});

// Callbacks estables
const handleSearch = useCallback((query: string) => {
  setSearchQuery(query);
}, []);
```

### Lazy Loading
- Imágenes con loading="lazy"
- Skeleton loading durante carga

### Accesibilidad
```tsx
<button 
  aria-label={`${isFavorite ? 'Quitar de' : 'Agregar a'} favoritos`}
  aria-pressed={isFavorite}
>
  <HeartIcon />
</button>
```

---

**Actualizado:** Junio 2025 