import { NextRequest, NextResponse } from 'next/server';
import { PropertyService } from '@/services/property';

/**
 * GET /api/properties
 * Returns list of properties with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyService = new PropertyService();

    // Get filter parameters from query string
    const ciudad = searchParams.get('ciudad');
    const tipo = searchParams.get('tipo') as 'Casa' | 'Departamento' | null;
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    let properties = propertyService.getAllProperties();

    // Apply filters if provided
    if (ciudad) {
      properties = propertyService.getPropertiesByCity(ciudad);
    }

    if (tipo) {
      properties = properties.filter(prop => prop.tipo === tipo);
    }

    if (minPrice && maxPrice) {
      const min = parseInt(minPrice);
      const max = parseInt(maxPrice);
      properties = properties.filter(prop => 
        prop.precio >= min && prop.precio <= max
      );
    }

    return NextResponse.json({
      success: true,
      data: properties,
      total: properties.length,
      message: `Found ${properties.length} properties`
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: [],
        total: 0,
        message: 'Error fetching properties'
      },
      { status: 500 }
    );
  }
} 