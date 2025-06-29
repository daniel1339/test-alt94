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
  // State
  searchQuery: string;
  filters: FilterState;
  currentPage: number;
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'newest';
  
  // Processed results
  filteredProperties: Property[];
  paginatedProperties: Property[];
  totalPages: number;
  totalResults: number;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setFilters: (filters: FilterState) => void;
  setCurrentPage: (page: number) => void;
  setSortBy: (sort: 'relevance' | 'price-asc' | 'price-desc' | 'newest') => void;
  clearAllFilters: () => void;
  
  // Filter data
  availableCities: string[];
  availableTypes: string[];
  priceRange: { min: number; max: number };
  
  // UI states
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

  // Static data extracted from properties
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

  // Filtering and search function
  const filteredProperties = useMemo(() => {
    let filtered = [...properties];

    // Text search filter
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(property => 
        property.titulo.toLowerCase().includes(query) ||
        property.ciudad.toLowerCase().includes(query) ||
        property.tipo.toLowerCase().includes(query)
      );
    }

    // City filter
    if (state.filters.ciudad.length > 0) {
      filtered = filtered.filter(property => 
        state.filters.ciudad.includes(property.ciudad)
      );
    }

    // Type filter
    if (state.filters.tipo.length > 0) {
      filtered = filtered.filter(property => 
        state.filters.tipo.includes(property.tipo)
      );
    }

    // Price filter
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

    // Sorting
    filtered.sort((a, b) => {
      switch (state.sortBy) {
        case 'price-asc':
          return a.precio - b.precio;
        case 'price-desc':
          return b.precio - a.precio;
        case 'newest':
          return b.id - a.id; // Assuming higher ID = newer
        case 'relevance':
        default:
          // For relevance, we prioritize exact matches in title
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

  // Paginated properties
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

  // Reset page when filters or search change
  useEffect(() => {
    setState(prev => ({ ...prev, currentPage: 1 }));
  }, [state.searchQuery, state.filters, state.sortBy]);

  // Handle loading state
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // Delay to show loading animation

    return () => clearTimeout(timer);
  }, [state.searchQuery, state.filters, state.sortBy]);

  // Check if there are active filters
  const hasActiveFilters = useMemo(() => {
    return state.searchQuery.trim() !== '' ||
           state.filters.ciudad.length > 0 ||
           state.filters.tipo.length > 0 ||
           state.filters.precioMin !== null ||
           state.filters.precioMax !== null;
  }, [state.searchQuery, state.filters]);

  // Actions
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
    // State
    searchQuery: state.searchQuery,
    filters: state.filters,
    currentPage: state.currentPage,
    sortBy: state.sortBy,
    
    // Results
    filteredProperties,
    paginatedProperties,
    totalPages,
    totalResults: filteredProperties.length,
    
    // Actions
    setSearchQuery,
    setFilters,
    setCurrentPage,
    setSortBy,
    clearAllFilters,
    
    // Static data
    availableCities,
    availableTypes,
    priceRange,
    
    // States
    hasActiveFilters,
    loading
  };
} 