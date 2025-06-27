import { NextRequest, NextResponse } from 'next/server';
import { PropertyService } from '@/services/property';

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
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: 'Invalid property ID. Must be a number.'
        },
        { status: 400 }
      );
    }

    // Get property by ID
    const property = propertyService.getPropertyById(propertyId);

    // Check if property exists
    if (!property) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: `Property with ID ${propertyId} not found`
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: property,
      message: `Property ${propertyId} retrieved successfully`
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Error fetching property details'
      },
      { status: 500 }
    );
  }
} 