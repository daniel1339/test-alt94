import { NextRequest, NextResponse } from 'next/server';
import { PropertyService } from '@/services/property';
import { findSimilarProperties } from '@/utils/similarity';

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
      return NextResponse.json(
        {
          success: false,
          property: null,
          recommendations: [],
          message: 'Invalid property ID. Must be a number.'
        },
        { status: 400 }
      );
    }

    // Validate limit parameter
    if (isNaN(limit) || limit < 1 || limit > 10) {
      return NextResponse.json(
        {
          success: false,
          property: null,
          recommendations: [],
          message: 'Invalid limit. Must be between 1 and 10.'
        },
        { status: 400 }
      );
    }

    // Get target property
    const targetProperty = propertyService.getPropertyById(propertyId);
    
    if (!targetProperty) {
      return NextResponse.json(
        {
          success: false,
          property: null,
          recommendations: [],
          message: `Property with ID ${propertyId} not found`
        },
        { status: 404 }
      );
    }

    // Get all properties for similarity comparison
    const allProperties = propertyService.getAllProperties();
    
    // Find similar properties using our algorithm
    const similarProperties = findSimilarProperties(
      targetProperty,
      allProperties,
      limit
    );

    return NextResponse.json({
      success: true,
      property: targetProperty,
      recommendations: similarProperties,
      total: similarProperties.length,
      message: `Found ${similarProperties.length} similar properties for "${targetProperty.titulo}"`
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        property: null,
        recommendations: [],
        message: 'Error generating recommendations'
      },
      { status: 500 }
    );
  }
} 