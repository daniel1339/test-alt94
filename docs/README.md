# Documentación Técnica - PropiedadesApp

## Guías Esenciales

### 1. [Arquitectura](./ARCHITECTURE.md)
Estructura general del proyecto y tecnologías utilizadas.

### 2. [Backend](./BACKEND.md) 
APIs REST, endpoints y servicios.

### 3. [Frontend](./FRONTEND.md)
Componentes React, páginas y funcionalidades de UI.

### 4. [Sistema de Diseño](./design-system.md)
Estilos, colores y componentes de diseño.

## Tecnologías

- **Framework:** Next.js 15.3.4 con App Router
- **Lenguaje:** TypeScript
- **UI:** React 18 + Tailwind CSS
- **Estado:** Context API + localStorage

## Comandos Principales

```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm test             # Ejecutar tests
npm run lint         # Linting
```

## Estructura del Proyecto

```
src/
├── app/               # Páginas y API Routes
├── components/        # Componentes React
├── contexts/          # Estado global
├── hooks/             # Hooks personalizados
├── lib/               # Funciones Server-Side Rendering
├── services/          # Lógica de negocio
├── utils/             # Utilidades
├── types/             # Tipos TypeScript
├── styles/            # Estilos
└── data/              # Datos de muestra
```

## Páginas Principales

- Inicio: `/`
- Propiedades: `/properties`
- Detalle: `/properties/[id]`
- Favoritos: `/favorites`

---

**Última actualización:** Junio 2025  
**Versión:** Next.js 15.3.4, React 18, TypeScript 5+