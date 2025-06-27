import { Property } from '@/types/property';

/**
 * Calculates similarity score between two properties using weighted criteria
 * Returns a value between 0 (no similarity) and 1 (identical)
 */
export function calculateSimilarity(property1: Property, property2: Property): number {
  let score = 0;

  // Same city (40% weight) - Most important factor
  if (property1.ciudad === property2.ciudad) {
    score += 0.4;
  }

  // Same property type (30% weight) - Very important
  if (property1.tipo === property2.tipo) {
    score += 0.3;
  }

  // Similar price within ±20% range (20% weight)
  const priceRange = property1.precio * 0.2;
  if (Math.abs(property1.precio - property2.precio) <= priceRange) {
    score += 0.2;
  }

  // Similar room count within ±1 room (10% weight)
  if (Math.abs(property1.ambientes - property2.ambientes) <= 1) {
    score += 0.1;
  }

  return score;
}

/**
 * Finds the most similar properties to a given property
 */
export function findSimilarProperties(
  targetProperty: Property, 
  allProperties: Property[], 
  limit: number = 3
): Property[] {
  const similarities = allProperties
    .filter(prop => prop.id !== targetProperty.id) // Exclude the target property itself
    .map(prop => ({
      ...prop,
      similarityScore: calculateSimilarity(targetProperty, prop)
    }))
    .sort((a, b) => b.similarityScore - a.similarityScore) // Sort by highest similarity first
    .slice(0, limit); // Take only the top results

  return similarities;
} 