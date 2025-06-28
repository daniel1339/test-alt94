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
 * Hook personalizado para cargar una propiedad por ID
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
  }, [id]);

  return {
    property,
    loading,
    error,
    refetch: fetchProperty
  };
}

/**
 * Hook para cargar propiedades desde el servidor (SSR)
 */
export async function getPropertySSR(id: string): Promise<Property | null> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/properties/${id}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      return null;
    }

    const data: ApiResponse = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching property SSR:', error);
    return null;
  }
} 