# Backend - APIs y Servicios

## Endpoints Disponibles

### GET /api/properties
Lista todas las propiedades con filtros opcionales.

**Parámetros:**
- `ciudad` - Filtrar por ciudad
- `tipo` - Casa o Departamento
- `page` - Número de página (default: 1)
- `limit` - Elementos por página (default: 10)

**Ejemplo:**
```
GET /api/properties?ciudad=Córdoba&page=1&limit=12
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "titulo": "Casa moderna en Córdoba",
      "ciudad": "Córdoba",
      "tipo": "Casa",
      "precio": 150000,
      "ambientes": 3,
      "metros_cuadrados": 120,
      "imagen": "https://..."
    }
  ],
  "pagination": {
    "page": 1,
    "total": 25,
    "totalPages": 3
  }
}
```

### GET /api/properties/[id]
Obtiene una propiedad específica.

**Ejemplo:**
```
GET /api/properties/15
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 15,
    "titulo": "Departamento céntrico",
    "ciudad": "Buenos Aires",
    "tipo": "Departamento",
    "precio": 185000,
    "ambientes": 2,
    "metros_cuadrados": 65,
    "imagen": "https://..."
  }
}
```

### GET /api/recommendations/[id]
Genera recomendaciones similares a una propiedad.

**Parámetros:**
- `limit` - Número de recomendaciones (default: 3)

**Ejemplo:**
```
GET /api/recommendations/15?limit=5
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "property": { /* propiedad base */ },
    "recommendations": [
      {
        "id": 23,
        "titulo": "Departamento moderno",
        "similarityScore": 0.95,
        /* resto de campos */
      }
    ]
  }
}
```

## Algoritmo de Recomendaciones

### Cálculo de Similitud
```typescript
function calculateSimilarity(property1: Property, property2: Property): number {
  const cityScore = property1.ciudad === property2.ciudad ? 1 : 0;
  const typeScore = property1.tipo === property2.tipo ? 1 : 0;
  const priceScore = calculatePriceScore(property1.precio, property2.precio);
  const roomScore = calculateRoomScore(property1.ambientes, property2.ambientes);

  return (
    cityScore * 0.4 +      // Ciudad: 40%
    typeScore * 0.3 +      // Tipo: 30%
    priceScore * 0.2 +     // Precio: 20%
    roomScore * 0.1        // Ambientes: 10%
  );
}
```

### Componentes del Score
- **Ciudad (40%):** 1.0 si coincide, 0.0 si no
- **Tipo (30%):** 1.0 si coincide, 0.0 si no
- **Precio (20%):** Basado en diferencia porcentual
- **Ambientes (10%):** Basado en diferencia absoluta

## Servicios

### PropertyService
```typescript
interface PropertyService {
  getAllProperties(): Property[];
  getPropertyById(id: number): Property | null;
  findSimilarProperties(target: Property, limit?: number): PropertyWithScore[];
}
```

### Fuente de Datos
- **Ubicación:** `src/data/properties.json`
- **Cantidad:** 100 propiedades de muestra
- **Ciudades:** Buenos Aires, Córdoba, Rosario, etc.
- **Tipos:** Casa y Departamento

## Tipos TypeScript

```typescript
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

## Validaciones

### ID de Propiedad
```typescript
export function validatePropertyId(id: string) {
  const propertyId = parseInt(id);
  if (isNaN(propertyId)) {
    return { error: 'Invalid property ID' };
  }
  return { propertyId };
}
```

### Paginación
```typescript
export function validatePagination(page: string, limit: string) {
  const pageNum = parseInt(page || '1');
  const limitNum = parseInt(limit || '10');
  
  if (pageNum < 1 || limitNum < 1 || limitNum > 50) {
    return { error: 'Invalid pagination parameters' };
  }
  
  return { page: pageNum, limit: limitNum };
}
```

---

**Actualizado:** Junio 2025 