# 📦 Guía de Componentes - PropiedadesApp

## 🏗️ Arquitectura General

Este proyecto está construido con **Next.js 15.3.4** usando App Router, TypeScript y un sistema de diseño centralizado. Todos los componentes están optimizados para ser reutilizables y mantener consistencia visual.

---

## 🎨 Sistema de Diseño

### 📍 Ubicación: `src/styles/design-system.css`

**Variables CSS disponibles:**
- **Colores**: `--color-primary-*`, `--color-success-*`, `--color-warning-*`, etc.
- **Espaciados**: `--spacing-xs` a `--spacing-4xl`
- **Tipografía**: `--font-size-xs` a `--font-size-4xl`
- **Sombras**: `--shadow-sm` a `--shadow-xl`

**Clases utilitarias clave:**
```css
.grid-properties        /* Grid responsivo para propiedades */
.grid-stats            /* Grid para estadísticas */
.price-display         /* Precio destacado */
.badge-type           /* Badge de tipo de propiedad */
.truncate-1/.truncate-2/.truncate-3  /* Texto truncado */
.hover-lift           /* Efecto elevación en hover */
.skeleton             /* Animación loading */
```

---

## 🧩 Componentes UI Base

### 📍 Ubicación: `src/components/ui/`

#### **Button** 
```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="lg">Primario</Button>
<Button variant="outline" size="md">Outline</Button>
<Button variant="success" loading>Cargando</Button>
```

**Variantes**: `primary`, `secondary`, `outline`, `ghost`, `success`, `warning`, `error`  
**Tamaños**: `sm`, `md`, `lg`

#### **Card**
```tsx
import { Card } from '@/components/ui';

<Card padding="lg" shadow="md" hover>
  Contenido de la tarjeta
</Card>
```

**Props**: `padding`, `shadow`, `rounded`, `border`, `hover`, `as`

#### **Loading Components**
```tsx
import { LoadingSpinner, LoadingCard, LoadingPage, TextSkeleton } from '@/components/ui';

<LoadingSpinner size="lg" color="primary" />
<LoadingCard rows={4} />
<LoadingPage message="Cargando propiedades..." />
<TextSkeleton lines={3} />
```

#### **Breadcrumb**
```tsx
import { Breadcrumb } from '@/components/ui';

const items = [
  { label: 'Inicio', href: '/' },
  { label: 'Propiedades', href: '/properties' },
  { label: 'Casa en Córdoba', isActive: true }
];

<Breadcrumb items={items} />
```

---

## 🏠 Componentes de Propiedades

### 📍 Ubicación: `src/components/property/`

#### **PropertyCard** ⭐
```tsx
import { PropertyCard } from '@/components/property';

<PropertyCard 
  property={propertyObject}
  showRecommendations={true}
  className="custom-class"
/>
```

**Características:**
- ✅ Altura consistente con flex layout
- ✅ Skeleton loading para imágenes  
- ✅ Texto truncado con tooltips
- ✅ Fallback si imagen falla
- ✅ Badges responsivos
- ✅ Botones de acción

#### **PropertyList**
```tsx
import { PropertyList } from '@/components/property';

<PropertyList 
  initialProperties={properties}
  showRecommendations={true}
  emptyMessage="No hay propiedades"
/>
```

**Estados manejados:**
- Loading con skeletons
- Error con retry
- Vacío con mensaje personalizable
- Grid responsivo automático

#### **PropertyDetail**
```tsx
import { PropertyDetail } from '@/components/property';

<PropertyDetail property={propertyObject} />
```

**Incluye:**
- Galería de imágenes
- Información detallada
- Características organizadas
- Botones de acción
- Layout responsivo

#### **PropertyGallery**
```tsx
import { PropertyGallery } from '@/components/property';

<PropertyGallery 
  images={['url1', 'url2']} 
  title="Casa en Córdoba"
/>
```

**Características:**
- ✅ Navegación con flechas
- ✅ Thumbnails clickeables
- ✅ Skeleton loading
- ✅ Indicador de posición
- ✅ Responsive design

#### **RecommendationsList**
```tsx
import { RecommendationsList } from '@/components/property';

<RecommendationsList 
  propertyId="123"
  initialRecommendations={recommendations}
/>
```

**Muestra:**
- Score de similitud
- Grid de propiedades similares
- Estados de loading/error
- CTA para ver más

---

## 🎯 Layout Components

### 📍 Ubicación: `src/components/layout/`

#### **MainLayout**
```tsx
import { MainLayout } from '@/components/layout';

<MainLayout>
  <div>Tu contenido aquí</div>
</MainLayout>
```

**Incluye:**
- Header con navegación
- Footer
- Container responsivo
- Estilos globales

#### **Header**
```tsx
import { Header } from '@/components/layout';

<Header />
```

**Características:**
- Logo y navegación
- Links principales
- Responsive menu
- Preparado para contador favoritos

#### **Footer**
```tsx
import { Footer } from '@/components/layout';

<Footer />
```

---

## 🔄 Hooks Personalizados

### 📍 Ubicación: `src/hooks/`

#### **useProperties**
```tsx
import { useProperties } from '@/hooks/useProperties';

const { properties, loading, error, refetch, pagination } = useProperties({
  page: 1,
  limit: 12,
  initialProperties: []
});
```

#### **useProperty**
```tsx
import { useProperty, getPropertySSR } from '@/hooks/useProperty';

// Cliente
const { property, loading, error, refetch } = useProperty('123');

// Servidor
const property = await getPropertySSR('123');
```

#### **useRecommendations**
```tsx
import { useRecommendations, getRecommendationsSSR } from '@/hooks/useRecommendations';

// Cliente
const { recommendations, loading, error } = useRecommendations('123');

// Servidor  
const recommendations = await getRecommendationsSSR('123');
```

---

## 🛠️ Utilidades

### 📍 Ubicación: `src/utils/`

#### **Formateo** (`src/utils/format/`)
```tsx
import { formatPrice, formatArea, formatRooms } from '@/utils/format';

formatPrice(150000)           // "$150.000"
formatArea(85)               // "85 m²"
formatRooms(3)               // "3 amb."
formatPricePerM2(150000, 85) // "$1.765 por m²"
```

#### **Breadcrumbs** (`src/utils/breadcrumb/`)
```tsx
import { 
  createPropertyDetailBreadcrumb,
  createRecommendationsBreadcrumb 
} from '@/utils/breadcrumb';

const items = createPropertyDetailBreadcrumb("Casa en Córdoba");
```

#### **Similitud** (`src/utils/similarity/`)
```tsx
import { calculateSimilarity, findSimilarProperties } from '@/utils/similarity';

const score = calculateSimilarity(property1, property2); // 0.0 - 1.0
const similar = findSimilarProperties(target, allProperties, 3);
```

---

## 🎪 Tipos TypeScript

### 📍 Ubicación: `src/types/property/`

```tsx
interface Property {
  id: number;
  titulo: string;
  ciudad: string;
  tipo: 'Casa' | 'Departamento';
  precio: number;
  ambientes: number;
  metros_cuadrados: number;
  imagen: string;
}

interface PropertyWithScore extends Property {
  similarityScore: number;
}
```

---

## 🚀 APIs Disponibles

### **GET /api/properties**
- Lista paginada de propiedades
- Filtros: ciudad, tipo, precio, etc.
- Paginación automática

### **GET /api/properties/[id]**
- Propiedad específica por ID
- Manejo de errores 404

### **GET /api/recommendations/[id]**
- Recomendaciones para una propiedad
- Algoritmo de similitud AI
- Score de compatibilidad

---

## 🎯 Patrones de Uso Recomendados

### **1. Listado de Propiedades**
```tsx
export default function PropertiesPage() {
  return (
    <MainLayout>
      <PropertyList showRecommendations={true} />
    </MainLayout>
  );
}
```

### **2. Detalle de Propiedad**
```tsx
export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = await getPropertySSR(params.id);
  
  return (
    <MainLayout>
      <PropertyDetail property={property} />
    </MainLayout>
  );
}
```

### **3. Grid Personalizado**
```tsx
<div className="grid-properties">
  {properties.map(property => (
    <PropertyCard 
      key={property.id}
      property={property}
      showRecommendations={false}
    />
  ))}
</div>
```

---

## 🎨 Mejores Prácticas

### **Consistencia Visual**
- ✅ Usa las clases del design system
- ✅ Mantén alturas consistentes con flexbox  
- ✅ Implementa estados de loading
- ✅ Agrega tooltips para texto truncado

### **Performance**
- ✅ Componentes con 'use client' solo cuando necesario
- ✅ SSR para datos iniciales
- ✅ Lazy loading de imágenes
- ✅ Skeletons mientras carga

### **Accesibilidad**
- ✅ Alt text en imágenes
- ✅ ARIA labels en botones
- ✅ Focus states visibles
- ✅ Navegación por teclado

---

## 🔄 Próximas Implementaciones

### **Pendientes:**
- [ ] Sistema de Favoritos completo
- [ ] Buscador por texto libre  
- [ ] Filtros avanzados
- [ ] Paginación en frontend
- [ ] Optimizaciones de performance

### **En Progreso:**
- [x] ✅ Skeletons de imagen implementados
- [x] ✅ Tarjetas consistentes con alturas iguales
- [x] ✅ Texto truncado con tooltips
- [x] ✅ Sistema de recomendaciones funcionando

---

**📝 Última actualización**: Diciembre 2024  
**🏗️ Versión**: Next.js 15.3.4 con App Router  
**⚡ Estado**: Listo para sistema de favoritos 