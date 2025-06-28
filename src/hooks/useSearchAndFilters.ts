'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Property } from '@/types/property';
import { FilterState } from '@/components/ui/FilterSidebar';

interface SearchAndFiltersState {
  searchQuery: string;
  filters: FilterState;
  currentPage: number;
  itemsPerPage: number;
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'newest';
}

interface UseSearchAndFiltersProps {
  properties: Property[];
  initialItemsPerPage?: number;
}

interface UseSearchAndFiltersReturn {
  // Estado
  searchQuery: string;
  filters: FilterState;
  currentPage: number;
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'newest';
  
  // Resultados procesados
  filteredProperties: Property[];
  paginatedProperties: Property[];
  totalPages: number;
  totalResults: number;
  
  // Acciones
  setSearchQuery: (query: string) => void;
  setFilters: (filters: FilterState) => void;
  setCurrentPage: (page: number) => void;
  setSortBy: (sort: 'relevance' | 'price-asc' | 'price-desc' | 'newest') => void;
  clearAllFilters: () => void;
  
  // Datos para filtros
  availableCities: string[];
  availableTypes: string[];
  priceRange: { min: number; max: number };
  
  // Estados de UI
  hasActiveFilters: boolean;
  loading: boolean;
}

export function useSearchAndFilters({ 
  properties, 
  initialItemsPerPage = 12 
}: UseSearchAndFiltersProps): UseSearchAndFiltersReturn {
  const [state, setState] = useState<SearchAndFiltersState>({
    searchQuery: '',
    filters: {
      ciudad: [],
      tipo: [],
      precioMin: null,
      precioMax: null
    },
    currentPage: 1,
    itemsPerPage: initialItemsPerPage,
    sortBy: 'relevance'
  });

  const [loading, setLoading] = useState(false);
  const isInitialMount = useRef(true);

  // Datos estáticos extraídos de propiedades
  const { availableCities, availableTypes, priceRange } = useMemo(() => {
    const cities = [...new Set(properties.map(p => p.ciudad))].sort();
    const types = [...new Set(properties.map(p => p.tipo))].sort();
    const prices = properties.map(p => p.precio);
    
    return {
      availableCities: cities,
      availableTypes: types,
      priceRange: {
        min: Math.min(...prices),
        max: Math.max(...prices)
      }
    };
  }, [properties]);

  // Función de filtrado y búsqueda
  const filteredProperties = useMemo(() => {
    let filtered = [...properties];

    // Filtro por búsqueda de texto
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(property => 
        property.titulo.toLowerCase().includes(query) ||
        property.ciudad.toLowerCase().includes(query) ||
        property.tipo.toLowerCase().includes(query)
      );
    }

    // Filtro por ciudad
    if (state.filters.ciudad.length > 0) {
      filtered = filtered.filter(property => 
        state.filters.ciudad.includes(property.ciudad)
      );
    }

    // Filtro por tipo
    if (state.filters.tipo.length > 0) {
      filtered = filtered.filter(property => 
        state.filters.tipo.includes(property.tipo)
      );
    }

    // Filtro por precio
    if (state.filters.precioMin !== null) {
      filtered = filtered.filter(property => 
        property.precio >= state.filters.precioMin!
      );
    }

    if (state.filters.precioMax !== null) {
      filtered = filtered.filter(property => 
        property.precio <= state.filters.precioMax!
      );
    }

    // Ordenamiento
    filtered.sort((a, b) => {
      switch (state.sortBy) {
        case 'price-asc':
          return a.precio - b.precio;
        case 'price-desc':
          return b.precio - a.precio;
        case 'newest':
          return b.id - a.id; // Asumiendo que ID mayor = más nuevo
        case 'relevance':
        default:
          // Para relevance, priorizamos coincidencias exactas en título
          if (state.searchQuery.trim()) {
            const query = state.searchQuery.toLowerCase();
            const aScore = a.titulo.toLowerCase().includes(query) ? 1 : 0;
            const bScore = b.titulo.toLowerCase().includes(query) ? 1 : 0;
            return bScore - aScore;
          }
          return 0;
      }
    });

    return filtered;
  }, [properties, state.searchQuery, state.filters, state.sortBy]);

  // Propiedades paginadas
  const { paginatedProperties, totalPages } = useMemo(() => {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    const paginated = filteredProperties.slice(startIndex, endIndex);
    const pages = Math.ceil(filteredProperties.length / state.itemsPerPage);

    return {
      paginatedProperties: paginated,
      totalPages: pages
    };
  }, [filteredProperties, state.currentPage, state.itemsPerPage]);

  // Reset página cuando cambian filtros o búsqueda
  useEffect(() => {
    setState(prev => ({ ...prev, currentPage: 1 }));
  }, [state.searchQuery, state.filters, state.sortBy]);

  // Manejar loading state
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // Delay para mostrar animación de carga

    return () => clearTimeout(timer);
  }, [state.searchQuery, state.filters, state.sortBy]);

  // Verificar si hay filtros activos
  const hasActiveFilters = useMemo(() => {
    return state.searchQuery.trim() !== '' ||
           state.filters.ciudad.length > 0 ||
           state.filters.tipo.length > 0 ||
           state.filters.precioMin !== null ||
           state.filters.precioMax !== null;
  }, [state.searchQuery, state.filters]);

  // Acciones
  const setSearchQuery = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  };

  const setFilters = (filters: FilterState) => {
    setState(prev => ({ ...prev, filters }));
  };

  const setCurrentPage = (page: number) => {
    setState(prev => ({ ...prev, currentPage: page }));
  };

  const setSortBy = (sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'newest') => {
    setState(prev => ({ ...prev, sortBy }));
  };

  const clearAllFilters = () => {
    setState(prev => ({
      ...prev,
      searchQuery: '',
      filters: {
        ciudad: [],
        tipo: [],
        precioMin: null,
        precioMax: null
      },
      currentPage: 1,
      sortBy: 'relevance'
    }));
  };

  return {
    // Estado
    searchQuery: state.searchQuery,
    filters: state.filters,
    currentPage: state.currentPage,
    sortBy: state.sortBy,
    
    // Resultados
    filteredProperties,
    paginatedProperties,
    totalPages,
    totalResults: filteredProperties.length,
    
    // Acciones
    setSearchQuery,
    setFilters,
    setCurrentPage,
    setSortBy,
    clearAllFilters,
    
    // Datos estáticos
    availableCities,
    availableTypes,
    priceRange,
    
    // Estados
    hasActiveFilters,
    loading
  };
} 