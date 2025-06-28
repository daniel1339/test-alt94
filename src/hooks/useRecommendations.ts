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
 * Hook personalizado para cargar recomendaciones de una propiedad
 */
export function useRecommendations(propertyId: string): UseRecommendationsResult {
  const [recommendations, setRecommendations] = useState<PropertyWithScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);

      const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/recommendations/${propertyId}`, {
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
  }, [propertyId]);

  return {
    recommendations,
    loading,
    error,
    refetch: fetchRecommendations
  };
}

/**
 * Hook para cargar recomendaciones desde el servidor (SSR)
 */
export async function getRecommendationsSSR(propertyId: string): Promise<PropertyWithScore[]> {
  try {
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/recommendations/${propertyId}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      return [];
    }

    const data: RecommendationsApiResponse = await response.json();
    return data.success ? data.data.recommendations : [];
  } catch (error) {
    console.error('Error fetching recommendations SSR:', error);
    return [];
  }
} 