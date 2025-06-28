import { NextRequest } from 'next/server';
import { getPropertyService } from '@/services/property/singleton';
import { findSimilarProperties } from '@/utils/similarity';
import { successResponse, ApiErrors } from '@/utils/api';
import { validatePropertyId, validateAndGetProperty, validateLimit } from '@/utils/validation';

/**
 * GET /api/recommendations/[id]
 * Returns similar properties based on the target property ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const propertyService = getPropertyService();
    const { searchParams } = new URL(request.url);
    const { id } = await params;

    // Validate property ID
    const idValidation = validatePropertyId(id);
    if ('error' in idValidation) return idValidation.error;

    // Validate limit parameter
    const limitValidation = validateLimit(searchParams.get('limit'));
    if ('error' in limitValidation) return limitValidation.error;

    // Validate and get target property
    const propertyValidation = validateAndGetProperty(idValidation.propertyId, propertyService);
    if ('error' in propertyValidation) return propertyValidation.error;

    // Get all properties for similarity comparison
    const allProperties = propertyService.getAllProperties();
    
    // Find similar properties using our algorithm
    const similarProperties = findSimilarProperties(
      propertyValidation.property,
      allProperties,
      limitValidation.limit
    );

    return successResponse(
      {
        property: propertyValidation.property,
        recommendations: similarProperties
      },
      `Found ${similarProperties.length} similar properties for "${propertyValidation.property.titulo}"`,
      { total: similarProperties.length }
    );

  } catch {
    return ApiErrors.internalError('Error generating recommendations');
  }
} 