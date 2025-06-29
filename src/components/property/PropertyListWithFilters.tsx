'use client';

import { useState } from 'react';
import { Property } from '@/types/property';
import { PropertyCard } from './PropertyCard';
import { 
  SearchInput, 
  FilterSidebar, 
  SortSelector, 
  Pagination, 
  Button, 
  Card,
  LoadingCard 
} from '@/components/ui';
import { useSearchAndFilters } from '@/hooks';
import { HiAdjustments, HiViewGrid, HiViewList, HiX } from 'react-icons/hi';

interface PropertyListWithFiltersProps {
  initialProperties: Property[];
  showRecommendations?: boolean;
  emptyMessage?: string;
  className?: string;
  enableFilters?: boolean;
  enablePagination?: boolean;
  itemsPerPage?: number;
}

export function PropertyListWithFilters({
  initialProperties,
  showRecommendations = true,
  emptyMessage = "No se encontraron propiedades con los criterios seleccionados",
  className = "",
  enableFilters = true,
  enablePagination = true,
  itemsPerPage = 12
}: PropertyListWithFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const {
    searchQuery,
    filters,
    currentPage,
    sortBy,

    paginatedProperties,
    totalPages,
    totalResults,
    setSearchQuery,
    setFilters,
    setCurrentPage,
    setSortBy,
    clearAllFilters,
    availableCities,
    availableTypes,
    priceRange,
    hasActiveFilters,
    loading
  } = useSearchAndFilters({ 
    properties: initialProperties, 
    initialItemsPerPage: itemsPerPage 
  });

  return (
    <div className={`space-y-6 ${className}`}>
      
      {/* Header with search and controls */}
      <div className="space-y-4">
        
        {/* Main search */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Buscar por título, ciudad o tipo de propiedad..."
              size="lg"
              className="w-full"
            />
          </div>
          
          {/* View and filters controls */}
          <div className="flex items-center space-x-2">
            {/* View toggle */}
            <div className="hidden md:flex items-center border border-default rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-all duration-200 ease-out relative ${
                  viewMode === 'grid' 
                    ? 'bg-primary-600 text-white shadow-md scale-105' 
                    : 'hover:bg-gray-50 text-gray-600 hover:scale-110'
                }`}
                aria-label="Grid view"
              >
                <HiViewGrid className="w-5 h-5 transition-transform duration-200" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-all duration-200 ease-out relative ${
                  viewMode === 'list' 
                    ? 'bg-primary-600 text-white shadow-md scale-105' 
                    : 'hover:bg-gray-50 text-gray-600 hover:scale-110'
                }`}
                aria-label="List view"
              >
                <HiViewList className="w-5 h-5 transition-transform duration-200" />
              </button>
            </div>

            {/* Filters button */}
            {enableFilters && (
              <Button
                variant={hasActiveFilters ? "primary" : "outline"}
                size="md"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2"
              >
                <HiAdjustments className="w-4 h-4" />
                <span>Filtros</span>
                {hasActiveFilters && (
                  <span className="bg-white text-primary-600 text-xs px-1 py-0.5 rounded">
                    {Object.values(filters).flat().filter(Boolean).length}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Active filters bar */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between p-3 bg-info-50 border border-info-200 rounded-lg">
            <div className="flex items-center space-x-2 text-sm">
              <span style={{ color: 'var(--color-info-700)' }} className="font-medium">
                Active filters:
              </span>
              {searchQuery && (
                <span className="px-2 py-1 bg-info-100 text-info-800 rounded text-xs">
                  Search: &quot;{searchQuery}&quot;
                </span>
              )}
              {filters.ciudad.map(city => (
                <span key={city} className="px-2 py-1 bg-info-100 text-info-800 rounded text-xs">
                  {city}
                </span>
              ))}
              {filters.tipo.map(type => (
                <span key={type} className="px-2 py-1 bg-info-100 text-info-800 rounded text-xs">
                  {type}
                </span>
              ))}
              {(filters.precioMin || filters.precioMax) && (
                <span className="px-2 py-1 bg-info-100 text-info-800 rounded text-xs">
                  ${filters.precioMin?.toLocaleString() || '0'} - ${filters.precioMax?.toLocaleString() || '∞'}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-info-600 hover:text-info-800 flex items-center space-x-1"
            >
              <HiX className="w-4 h-4" />
              <span>Clear all</span>
            </Button>
          </div>
        )}

        {/* Sort and results controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <SortSelector
            value={sortBy}
            onChange={setSortBy}
            totalResults={totalResults}
            size="md"
            className="w-full sm:w-auto min-w-64"
          />
        </div>
      </div>

      {/* Layout with filters and content */}
      <div className="flex gap-6">
        
        {/* Filters sidebar */}
        {enableFilters && (
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              availableCities={availableCities}
              availableTypes={availableTypes}
              priceRange={priceRange}
              isOpen={true}
              onToggle={() => {}}
            />
          </div>
        )}

        {/* Mobile sidebar */}
        {enableFilters && (
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            availableCities={availableCities}
            availableTypes={availableTypes}
            priceRange={priceRange}
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden"
          />
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0" data-search-results>
          
          {/* Loading state */}
          <div className={`
            transition-all duration-500 ease-out
            ${loading ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
          `}>
            {loading && (
              <div className="grid-properties">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-80 animate-in fade-in-0 slide-in-from-bottom-4"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <LoadingCard rows={6} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Properties content */}
          <div className={`
            transition-all duration-500 ease-out
            ${!loading ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
          `}>
            {!loading && (
              <>
                {totalResults === 0 ? (
                /* Empty state */
                <Card padding="lg" className="text-center">
                  <div className="space-y-4">
                    <HiAdjustments 
                      className="mx-auto text-6xl"
                      style={{ color: 'var(--color-gray-400)' }}
                    />
                    <div className="space-y-2">
                      <h3 
                        className="text-xl font-semibold"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {emptyMessage}
                      </h3>
                      <p 
                        className="text-sm max-w-md mx-auto"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        Intenta ajustar los filtros de búsqueda o explora todas las propiedades disponibles.
                      </p>
                    </div>
                    {hasActiveFilters && (
                      <Button variant="primary" onClick={clearAllFilters}>
                        Limpiar todos los filtros
                      </Button>
                    )}
                  </div>
                </Card>
              ) : (
                /* Properties grid */
                <div 
                  className={viewMode === 'grid' ? 'grid-properties' : 'space-y-4'}
                  data-properties-grid
                >
                  {paginatedProperties.map((property, index) => (
                    <div
                      key={property.id}
                      className="animate-in fade-in-0 slide-in-from-bottom-4"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <PropertyCard
                        property={property}
                        showRecommendations={showRecommendations}
                        className={viewMode === 'list' ? 'w-full' : ''}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {enablePagination && totalResults > 0 && totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    size="md"
                    variant="numbers"
                  />
                </div>
              )}
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
} 