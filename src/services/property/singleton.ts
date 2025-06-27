import { PropertyService } from './index';

/**
 * Singleton instance of PropertyService
 * Ensures only one instance is created and shared across the application
 */
let propertyServiceInstance: PropertyService | null = null;

export function getPropertyService(): PropertyService {
  if (!propertyServiceInstance) {
    propertyServiceInstance = new PropertyService();
  }
  return propertyServiceInstance;
} 