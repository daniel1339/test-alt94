import { NextRequest } from 'next/server';
import { getPropertyService } from '@/services/property/singleton';
import { successResponse, ApiErrors } from '@/utils/api';
import { validatePriceRange, validatePropertyType, validatePagination } from '@/utils/validation';

/**
 * GET /api/properties
 * Returns list of properties with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyService = getPropertyService();

    // Get parameters from query string
    const ciudad = searchParams.get('ciudad');
    const tipoParam = searchParams.get('tipo');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');

    // Validate parameters
    const tipoValidation = validatePropertyType(tipoParam);
    if ('error' in tipoValidation) return tipoValidation.error;

    const priceValidation = validatePriceRange(minPriceParam, maxPriceParam);
    if ('error' in priceValidation) return priceValidation.error;

    const paginationValidation = validatePagination(pageParam, limitParam);
    if ('error' in paginationValidation) return paginationValidation.error;

    // Build filters object
    const filters: Record<string, string | number> = {};
    if (ciudad) filters.ciudad = ciudad;
    if (tipoValidation.tipo) filters.tipo = tipoValidation.tipo;
    if (priceValidation.minPrice !== null && priceValidation.maxPrice !== null) {
      filters.minPrice = priceValidation.minPrice;
      filters.maxPrice = priceValidation.maxPrice;
    }

    // Get paginated results
    const result = propertyService.getPaginatedProperties(
      paginationValidation.page,
      paginationValidation.limit,
      Object.keys(filters).length > 0 ? filters : undefined
    );

    return successResponse(
      result.data,
      `Found ${result.pagination.total} properties (page ${result.pagination.page} of ${result.pagination.totalPages})`,
      { pagination: result.pagination }
    );

  } catch {
    return ApiErrors.internalError('Error fetching properties');
  }
} 