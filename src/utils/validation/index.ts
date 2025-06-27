import { PropertyService } from '@/services/property';
import { ApiErrors } from '@/utils/api';

/**
 * Validates and parses property ID from route params
 */
export function validatePropertyId(id: string) {
  const propertyId = parseInt(id);
  
  if (isNaN(propertyId)) {
    return { error: ApiErrors.invalidId('property ID') };
  }
  
  return { propertyId };
}

/**
 * Validates and retrieves property by ID
 */
export function validateAndGetProperty(propertyId: number, propertyService: PropertyService) {
  const property = propertyService.getPropertyById(propertyId);
  
  if (!property) {
    return { error: ApiErrors.notFoundById('Property', propertyId) };
  }
  
  return { property };
}

/**
 * Validates limit parameter for recommendations
 */
export function validateLimit(limitParam: string | null, defaultLimit: number = 3) {
  const maxLimit = parseInt(process.env.MAX_RECOMMENDATIONS || '10');
  const limit = parseInt(limitParam || defaultLimit.toString());
  
  if (isNaN(limit) || limit < 1 || limit > maxLimit) {
    return { error: ApiErrors.badRequest(`Invalid limit. Must be between 1 and ${maxLimit}.`) };
  }
  
  return { limit };
}

/**
 * Validates price range parameters
 */
export function validatePriceRange(minPriceParam: string | null, maxPriceParam: string | null) {
  if (!minPriceParam || !maxPriceParam) {
    return { minPrice: null, maxPrice: null };
  }
  
  const minPrice = parseInt(minPriceParam);
  const maxPrice = parseInt(maxPriceParam);
  
  if (isNaN(minPrice) || isNaN(maxPrice)) {
    return { error: ApiErrors.badRequest('Invalid price range. Prices must be numbers.') };
  }
  
  if (minPrice < 0 || maxPrice < 0) {
    return { error: ApiErrors.badRequest('Invalid price range. Prices must be positive.') };
  }
  
  if (minPrice > maxPrice) {
    return { error: ApiErrors.badRequest('Invalid price range. Min price cannot be greater than max price.') };
  }
  
  return { minPrice, maxPrice };
}

/**
 * Validates property type parameter
 */
export function validatePropertyType(tipo: string | null): { tipo: 'Casa' | 'Departamento' | null } | { error: any } {
  if (!tipo) return { tipo: null };
  
  if (tipo !== 'Casa' && tipo !== 'Departamento') {
    return { error: ApiErrors.badRequest('Invalid property type. Must be "Casa" or "Departamento".') };
  }
  
  return { tipo: tipo as 'Casa' | 'Departamento' };
}

/**
 * Validates pagination parameters
 */
export function validatePagination(pageParam: string | null, limitParam: string | null) {
  const page = parseInt(pageParam || '1');
  const limit = parseInt(limitParam || '10');
  
  if (isNaN(page) || page < 1) {
    return { error: ApiErrors.badRequest('Invalid page number. Must be a positive integer.') };
  }
  
  if (isNaN(limit) || limit < 1 || limit > 50) {
    return { error: ApiErrors.badRequest('Invalid limit. Must be between 1 and 50.') };
  }
  
  return { page, limit };
} 