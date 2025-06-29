import { Property, PropertyWithScore } from '@/types/property';
import { getPropertyService } from '@/services/property/singleton';
import { findSimilarProperties } from '@/utils/similarity';

/**
 * SSR function to load a property by ID
 * Runs only on server
 */
export async function getPropertySSR(id: string): Promise<Property | null> {
  try {
    const propertyId = parseInt(id);
    if (isNaN(propertyId)) {
      return null;
    }
    
    const propertyService = getPropertyService();
    const property = propertyService.getPropertyById(propertyId);
    
    return property || null;
  } catch (error) {
    console.error('Error fetching property SSR:', error);
    return null;
  }
}

/**
 * SSR function to load property recommendations
 * Runs only on server
 */
export async function getRecommendationsSSR(propertyId: string): Promise<PropertyWithScore[]> {
  try {
    const id = parseInt(propertyId);
    if (isNaN(id)) {
      return [];
    }
    
    const propertyService = getPropertyService();
    const targetProperty = propertyService.getPropertyById(id);
    
    if (!targetProperty) {
      return [];
    }
    
    const allProperties = propertyService.getAllProperties();
    const limit = parseInt(process.env.MAX_RECOMMENDATIONS || '3');
    
    const similarProperties = findSimilarProperties(targetProperty, allProperties, limit);
    
    return similarProperties;
  } catch (error) {
    console.error('Error fetching recommendations SSR:', error);
    return [];
  }
} 