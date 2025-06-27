import { NextRequest } from 'next/server';
import { PropertyService } from '@/services/property';
import { findSimilarProperties } from '@/utils/similarity';
import { successResponse, ApiErrors } from '@/utils/api';

/**
 * GET /api/recommendations/[id]
 * Returns similar properties based on the target property ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propertyService = new PropertyService();
    const propertyId = parseInt(params.id);
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '3');

    // Validate ID is a number
    if (isNaN(propertyId)) {
      return ApiErrors.invalidId('property ID');
    }

    // Validate limit parameter
    if (isNaN(limit) || limit < 1 || limit > 10) {
      return ApiErrors.badRequest('Invalid limit. Must be between 1 and 10.');
    }

    // Get target property
    const targetProperty = propertyService.getPropertyById(propertyId);
    
    if (!targetProperty) {
      return ApiErrors.notFoundById('Property', propertyId);
    }

    // Get all properties for similarity comparison
    const allProperties = propertyService.getAllProperties();
    
    // Find similar properties using our algorithm
    const similarProperties = findSimilarProperties(
      targetProperty,
      allProperties,
      limit
    );

    return successResponse(
      {
        property: targetProperty,
        recommendations: similarProperties
      },
      `Found ${similarProperties.length} similar properties for "${targetProperty.titulo}"`,
      { total: similarProperties.length }
    );

  } catch (error) {
    return ApiErrors.internalError('Error generating recommendations');
  }
} 