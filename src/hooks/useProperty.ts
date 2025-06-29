'use client';

import { useState, useEffect } from 'react';
import { Property } from '@/types/property';

interface UsePropertyResult {
  property: Property | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface ApiResponse {
  success: boolean;
  data: Property;
  message?: string;
}

/**
 * Custom hook to load a property by ID
 */
export function useProperty(id: string): UsePropertyResult {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/properties/${id}`, {
        cache: 'no-store'
      });

      if (!response.ok) {
        if (response.status === 404) {
          setProperty(null);
          return;
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setProperty(data.data);
      } else {
        throw new Error(data.message || 'Error al cargar la propiedad');
      }
    } catch (err) {
      console.error('Error fetching property:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return {
    property,
    loading,
    error,
    refetch: fetchProperty
  };
}

// SSR functions moved to src/lib/ssr/property.ts 