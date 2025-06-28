# Arquitectura del Sistema

## Stack Tecnológico

- **Framework:** Next.js 15.3.4 con App Router
- **Lenguaje:** TypeScript
- **UI:** React 18 + Tailwind CSS
- **Estado:** Context API + localStorage
- **Testing:** Jest + React Testing Library

## Estructura de Carpetas

```
src/
├── app/                    # App Router (páginas y API routes)
│   ├── api/               # Endpoints REST
│   ├── properties/        # Páginas de propiedades
│   ├── favorites/         # Página de favoritos
│   └── layout.tsx         # Layout principal
├── components/            # Componentes React
│   ├── ui/               # Componentes base
│   ├── layout/           # Header, Footer
│   └── property/         # Componentes de propiedades
├── contexts/             # Estado global (favoritos)
├── hooks/                # Hooks personalizados
├── services/             # Lógica de negocio
├── utils/                # Utilidades y helpers
├── types/                # Tipos TypeScript
├── styles/               # Sistema de diseño
└── data/                 # Datos JSON
```

## Patrones de Diseño

### Separación de Responsabilidades
- **Componentes:** Solo presentación
- **Hooks:** Lógica reutilizable
- **Services:** Lógica de negocio
- **Utils:** Funciones helper

### Estado Global
- **FavoritesContext:** Gestión de favoritos con localStorage
- **Hooks personalizados:** Para lógica específica

### Server-Side Rendering
- **Server Components:** Para SEO y performance
- **API Routes:** Backend integrado
- **SSR Functions:** Datos iniciales

## Flujo de Datos

```
Páginas → Hooks → Services → Datos JSON
                ↓
Context (favoritos) → localStorage
```

## APIs Principales

- `GET /api/properties` - Lista de propiedades
- `GET /api/properties/[id]` - Propiedad específica
- `GET /api/recommendations/[id]` - Recomendaciones

## Algoritmo de Recomendaciones

Calcula similitud basado en:
- Ciudad (40%)
- Tipo (30%) 
- Precio (20%)
- Ambientes (10%)

---

**Actualizado:** Junio 2025 