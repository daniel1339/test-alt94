# Sistema de Recomendación de Propiedades

Backend API desarrollado con Next.js 15 para gestionar propiedades inmobiliarias y generar recomendaciones basadas en similitud.

## APIs Disponibles

**GET /api/properties**
- Lista propiedades con filtros opcionales (ciudad, tipo, precio)
- Soporte de paginación (page, limit)
- Ejemplo: `/api/properties?ciudad=Córdoba&page=1&limit=10`

**GET /api/properties/[id]**
- Obtiene una propiedad específica por ID
- Ejemplo: `/api/properties/5`

**GET /api/recommendations/[id]**
- Genera recomendaciones similares a una propiedad
- Algoritmo de similitud por ciudad, tipo, precio y ambientes
- Ejemplo: `/api/recommendations/5?limit=5`

## Instalación

```bash
npm install
npm run dev
```

## Testing

```bash
npm test
```

## Datos

100 propiedades de muestra en `src/data/properties.json` con ciudades argentinas (Buenos Aires, Córdoba, Rosario, La Plata, etc).

## Estructura

- `/src/services` - Lógica de negocio
- `/src/utils` - Validaciones y algoritmos
- `/src/types` - Definiciones TypeScript
- `/src/app/api` - Endpoints REST
