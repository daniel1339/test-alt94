/**
 * Core property data structure matching the JSON data format
 */
export interface Property {
  id: number;
  titulo: string;
  ciudad: string;
  tipo: 'Casa' | 'Departamento';
  precio: number;
  ambientes: number;
  metros_cuadrados: number;
  imagen: string;
}

/**
 * Property with calculated similarity score for recommendations
 */
export interface PropertyWithScore extends Property {
  similarityScore: number;
}

/**
 * Recommendation request parameters
 */
export interface RecommendationParams {
  propertyId: number;
  limit?: number;
}

/**
 * API response structure for recommendations
 */
export interface RecommendationResponse {
  property: Property;
  recommendations: PropertyWithScore[];
  success: boolean;
  message?: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: PaginationMeta;
  message?: string;
} 