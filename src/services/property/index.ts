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
} 