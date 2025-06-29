import { Property } from '@/types/property';

/**
 * Gets all properties from server (SSR)
 */
export async function getAllPropertiesSSR(): Promise<Property[]> {
  try {
    // In production, this would be a real API call
    // For now, we import the data directly
    const { default: propertiesData } = await import('@/data/properties.json');
    
    // Validate that data is an array
    if (!Array.isArray(propertiesData)) {
      console.error('Properties data is not an array');
      return [];
    }
    
    // Transform and validate data
    const properties: Property[] = propertiesData.map((prop: unknown) => {
      const p = prop as Record<string, unknown>;
      return {
        id: Number(p.id) || 0,
        titulo: String(p.titulo || ''),
        ciudad: String(p.ciudad || ''),
        tipo: (p.tipo === 'Casa' || p.tipo === 'Departamento') ? p.tipo as 'Casa' | 'Departamento' : 'Casa',
        precio: Number(p.precio) || 0,
        ambientes: Number(p.ambientes) || 1,
        metros_cuadrados: Number(p.metros_cuadrados) || 0,
        imagen: String(p.imagen || '')
      };
    });
    
    return properties;
  } catch (error) {
    console.error('Error loading properties in SSR:', error);
    return [];
  }
}

/**
 * Gets basic properties statistics
 */
export async function getPropertiesStatsSSR(): Promise<{
  total: number;
  cities: number;
  types: number;
  avgPrice: number;
}> {
  try {
    const properties = await getAllPropertiesSSR();
    
    const cities = new Set(properties.map(p => p.ciudad)).size;
    const types = new Set(properties.map(p => p.tipo)).size;
    const avgPrice = properties.length > 0 
      ? Math.round(properties.reduce((sum, p) => sum + p.precio, 0) / properties.length)
      : 0;
    
    return {
      total: properties.length,
      cities,
      types,
      avgPrice
    };
  } catch (error) {
    console.error('Error calculating properties stats:', error);
    return {
      total: 0,
      cities: 0,
      types: 0,
      avgPrice: 0
    };
  }
} 