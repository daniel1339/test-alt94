import { NextRequest } from 'next/server';
import { getPropertyService } from '@/services/property/singleton';
import { successResponse, ApiErrors } from '@/utils/api';
import { validatePropertyId, validateAndGetProperty } from '@/utils/validation';

/**
 * GET /api/properties/[id]
 * Returns specific property by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propertyService = getPropertyService();
    
    // Validate property ID
    const idValidation = validatePropertyId(params.id);
    if ('error' in idValidation) return idValidation.error;

    // Validate and get property
    const propertyValidation = validateAndGetProperty(idValidation.propertyId, propertyService);
    if ('error' in propertyValidation) return propertyValidation.error;

    return successResponse(
      propertyValidation.property,
      `Property ${idValidation.propertyId} retrieved successfully`
    );

  } catch {
    return ApiErrors.internalError('Error fetching property details');
  }
} 