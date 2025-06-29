'use client';

import { useState, useEffect } from 'react';
import { Property, PropertyWithScore } from '@/types/property';

interface UseRecommendationsResult {
  recommendations: PropertyWithScore[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface RecommendationsApiResponse {
  success: boolean;
  data: {
    property: Property;
    recommendations: PropertyWithScore[];
  };
  message?: string;
}

/**
 * Custom hook to load property recommendations
 */
export function useRecommendations(propertyId: string): UseRecommendationsResult {
  const [recommendations, setRecommendations] = useState<PropertyWithScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/recommendations/${propertyId}`, {
        cache: 'no-store'
      });

      if (!response.ok) {
        if (response.status === 404) {
          setRecommendations([]);
          return;
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: RecommendationsApiResponse = await response.json();
      
      if (data.success) {
        setRecommendations(data.data.recommendations);
      } else {
        throw new Error(data.message || 'Error al cargar recomendaciones');
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (propertyId) {
      fetchRecommendations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId]);

  return {
    recommendations,
    loading,
    error,
    refetch: fetchRecommendations
  };
}

// SSR functions moved to src/lib/ssr/property.ts 