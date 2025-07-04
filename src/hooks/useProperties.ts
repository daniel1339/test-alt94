'use client';

import { useState, useEffect } from 'react';
import { Property } from '@/types/property';

interface UsePropertiesResult {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

interface ApiResponse {
  success: boolean;
  data: Property[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

interface UsePropertiesOptions {
  page?: number;
  limit?: number;
  initialProperties?: Property[];
}

/**
 * Custom hook to load properties list
 */
export function useProperties(options: UsePropertiesOptions = {}): UsePropertiesResult {
  const { page = 1, limit = 12, initialProperties } = options;
  
  const [properties, setProperties] = useState<Property[]>(initialProperties || []);
  const [loading, setLoading] = useState(!initialProperties);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<UsePropertiesResult['pagination']>();

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/properties?page=${page}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setProperties(data.data);
        setPagination(data.pagination);
      } else {
        throw new Error('Error al cargar las propiedades');
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialProperties) {
      fetchProperties();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  useEffect(() => {
    if (initialProperties) {
      setProperties(initialProperties);
      setLoading(false);
    }
  }, [initialProperties]);

  return {
    properties,
    loading,
    error,
    refetch: fetchProperties,
    pagination
  };
} 