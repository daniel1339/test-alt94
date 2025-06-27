/**
 * Basic Configuration and Environment Tests
 */
describe('Environment and Configuration', () => {
  
  test('Environment variables should be loaded correctly', () => {
    // Test that environment variables are accessible
    expect(process.env.MAX_RECOMMENDATIONS).toBeDefined();
    expect(process.env.API_BASE_URL).toBeDefined();
    expect(parseInt(process.env.MAX_RECOMMENDATIONS || '10')).toBeGreaterThan(0);
  });

  test('MAX_RECOMMENDATIONS should be a valid number', () => {
    const maxRecs = parseInt(process.env.MAX_RECOMMENDATIONS || '10');
    expect(maxRecs).toBeGreaterThan(0);
    expect(maxRecs).toBeLessThanOrEqual(50); // Reasonable upper limit
  });

  test('API_BASE_URL should be a valid URL', () => {
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
    expect(baseUrl).toMatch(/^https?:\/\/.+/);
  });
});

/**
 * Service and Utility Tests
 */
describe('Application Services', () => {
  
  test('PropertyService singleton should work', async () => {
    const { getPropertyService } = await import('@/services/property/singleton');
    const service1 = getPropertyService();
    const service2 = getPropertyService();
    
    // Should return same instance (singleton)
    expect(service1).toBe(service2);
    expect(service1.getPropertyCount()).toBeGreaterThan(0);
  });

  test('Validation utilities should be importable', async () => {
    const validation = await import('@/utils/validation');
    
    expect(validation.validatePropertyId).toBeDefined();
    expect(validation.validateLimit).toBeDefined();
    expect(validation.validatePriceRange).toBeDefined();
  });

  test('Similarity algorithm should be importable', async () => {
    const similarity = await import('@/utils/similarity');
    
    expect(similarity.calculateSimilarity).toBeDefined();
    expect(similarity.findSimilarProperties).toBeDefined();
  });
}); 