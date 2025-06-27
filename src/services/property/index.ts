import { Property } from '@/types/property';
import propertiesData from '@/data/properties.json';

/**
 * Service for managing property data operations
 */
export class PropertyService {
  private properties: Property[];

  constructor() {
    this.properties = propertiesData as Property[];
  }

  /**
   * Get all properties
   */
  getAllProperties(): Property[] {
    return this.properties;
  }

  /**
   * Find property by ID
   */
  getPropertyById(id: number): Property | null {
    const property = this.properties.find(prop => prop.id === id);
    return property || null;
  }

  /**
   * Filter properties by city
   */
  getPropertiesByCity(city: string): Property[] {
    return this.properties.filter(prop => 
      prop.ciudad.toLowerCase() === city.toLowerCase()
    );
  }

  /**
   * Filter properties by type
   */
  getPropertiesByType(type: 'Casa' | 'Departamento'): Property[] {
    return this.properties.filter(prop => prop.tipo === type);
  }

  /**
   * Filter properties by price range
   */
  getPropertiesByPriceRange(minPrice: number, maxPrice: number): Property[] {
    return this.properties.filter(prop => 
      prop.precio >= minPrice && prop.precio <= maxPrice
    );
  }

  /**
   * Get total count of properties
   */
  getPropertyCount(): number {
    return this.properties.length;
  }

  /**
   * Get paginated properties with filtering
   */
  getPaginatedProperties(
    page: number, 
    limit: number, 
    filters?: {
      ciudad?: string;
      tipo?: 'Casa' | 'Departamento';
      minPrice?: number;
      maxPrice?: number;
    }
  ) {
    let filteredProperties = this.properties;

    // Apply filters if provided
    if (filters?.ciudad) {
      filteredProperties = this.getPropertiesByCity(filters.ciudad);
    }

    if (filters?.tipo) {
      filteredProperties = filteredProperties.filter(prop => prop.tipo === filters.tipo);
    }

    if (filters?.minPrice !== undefined && filters?.maxPrice !== undefined) {
      filteredProperties = filteredProperties.filter(prop => 
        prop.precio >= filters.minPrice! && prop.precio <= filters.maxPrice!
      );
    }

    const total = filteredProperties.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const data = filteredProperties.slice(startIndex, endIndex);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1
      }
    };
  }
} 