import { NextRequest } from 'next/server';
import { getPropertyService } from '@/services/property/singleton';
import { successResponse, ApiErrors } from '@/utils/api';
import { validatePriceRange, validatePropertyType } from '@/utils/validation';

/**
 * GET /api/properties
 * Returns list of properties with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyService = getPropertyService();

    // Get filter parameters from query string
    const ciudad = searchParams.get('ciudad');
    const tipoParam = searchParams.get('tipo');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');

    // Validate parameters
    const tipoValidation = validatePropertyType(tipoParam);
    if ('error' in tipoValidation) return tipoValidation.error;

    const priceValidation = validatePriceRange(minPriceParam, maxPriceParam);
    if ('error' in priceValidation) return priceValidation.error;

    let properties = propertyService.getAllProperties();

    // Apply filters if provided
    if (ciudad) {
      properties = propertyService.getPropertiesByCity(ciudad);
    }

    if (tipoValidation.tipo) {
      properties = properties.filter(prop => prop.tipo === tipoValidation.tipo);
    }

    if (priceValidation.minPrice !== null && priceValidation.maxPrice !== null) {
      properties = properties.filter(prop => 
        prop.precio >= priceValidation.minPrice! && prop.precio <= priceValidation.maxPrice!
      );
    }

    return successResponse(
      properties,
      `Found ${properties.length} properties`,
      { total: properties.length }
    );

  } catch (error) {
    return ApiErrors.internalError('Error fetching properties');
  }
} 