import { NextRequest } from 'next/server';
import { PropertyService } from '@/services/property';
import { successResponse, ApiErrors } from '@/utils/api';

/**
 * GET /api/properties/[id]
 * Returns specific property by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propertyService = new PropertyService();
    const propertyId = parseInt(params.id);

    // Validate ID is a number
    if (isNaN(propertyId)) {
      return ApiErrors.invalidId('property ID');
    }

    // Get property by ID
    const property = propertyService.getPropertyById(propertyId);

    // Check if property exists
    if (!property) {
      return ApiErrors.notFoundById('Property', propertyId);
    }

    return successResponse(
      property,
      `Property ${propertyId} retrieved successfully`
    );

  } catch (error) {
    return ApiErrors.internalError('Error fetching property details');
  }
} 