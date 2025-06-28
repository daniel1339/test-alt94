'use client';

import { useState } from 'react';
import { Button, Card } from './';
import { HiAdjustments, HiLocationMarker, HiHome, HiCurrencyDollar, HiX, HiChevronDown, HiChevronUp } from 'react-icons/hi';

export interface FilterState {
  ciudad: string[];
  tipo: string[];
  precioMin: number | null;
  precioMax: number | null;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableCities: string[];
  availableTypes: string[];
  priceRange: { min: number; max: number };
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  availableCities,
  availableTypes,
  priceRange,
  isOpen,
  onToggle,
  className = ""
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    ciudad: true,
    tipo: true,
    precio: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCityChange = (city: string, checked: boolean) => {
    const newCities = checked 
      ? [...filters.ciudad, city]
      : filters.ciudad.filter(c => c !== city);
    
    onFiltersChange({ ...filters, ciudad: newCities });
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked 
      ? [...filters.tipo, type]
      : filters.tipo.filter(t => t !== type);
    
    onFiltersChange({ ...filters, tipo: newTypes });
  };

  const handlePriceChange = (field: 'precioMin' | 'precioMax', value: string) => {
    const numValue = value ? parseInt(value) : null;
    onFiltersChange({ ...filters, [field]: numValue });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      ciudad: [],
      tipo: [],
      precioMin: null,
      precioMax: null
    });
  };

  const hasActiveFilters = filters.ciudad.length > 0 || 
                          filters.tipo.length > 0 || 
                          filters.precioMin !== null || 
                          filters.precioMax !== null;

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div className={`
        ${className}
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:static top-0 left-0 h-full lg:h-auto
        w-80 lg:w-full
        transition-all duration-500 ease-out
        z-40 lg:z-auto
        ${isOpen ? 'shadow-2xl' : 'shadow-none'}
      `}>
        <Card padding="lg" className="h-full lg:h-auto overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <HiAdjustments 
                className="w-5 h-5"
                style={{ color: 'var(--color-primary-600)' }}
              />
              <h3 
                className="font-semibold text-lg"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Filtros
              </h3>
            </div>
            
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllFilters}
                  className="text-error-600"
                >
                  Limpiar
                </Button>
              )}
              <button 
                onClick={onToggle}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus-ring"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filtro por Ciudad */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('ciudad')}
              className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-50 focus-ring"
            >
              <div className="flex items-center space-x-2">
                <HiLocationMarker className="w-4 h-4 text-gray-500" />
                <span 
                  className="font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Ciudad
                </span>
                {filters.ciudad.length > 0 && (
                  <span 
                    className="px-2 py-1 text-xs rounded-full"
                    style={{ 
                      backgroundColor: 'var(--color-primary-100)',
                      color: 'var(--color-primary-700)'
                    }}
                  >
                    {filters.ciudad.length}
                  </span>
                )}
              </div>
              {expandedSections.ciudad ? (
                <HiChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <HiChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>

            <div className={`
              overflow-hidden transition-all duration-300 ease-out
              ${expandedSections.ciudad ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}>
              <div className="mt-3 pl-6 space-y-2 transform transition-transform duration-200">
                {availableCities.map(city => (
                  <label key={city} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.ciudad.includes(city)}
                      onChange={(e) => handleCityChange(city, e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span 
                      className="text-sm"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {city}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Filtro por Tipo */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('tipo')}
              className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-50 focus-ring"
            >
              <div className="flex items-center space-x-2">
                <HiHome className="w-4 h-4 text-gray-500" />
                <span 
                  className="font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Tipo de Propiedad
                </span>
                {filters.tipo.length > 0 && (
                  <span 
                    className="px-2 py-1 text-xs rounded-full"
                    style={{ 
                      backgroundColor: 'var(--color-primary-100)',
                      color: 'var(--color-primary-700)'
                    }}
                  >
                    {filters.tipo.length}
                  </span>
                )}
              </div>
              {expandedSections.tipo ? (
                <HiChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <HiChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>

            <div className={`
              overflow-hidden transition-all duration-300 ease-out
              ${expandedSections.tipo ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}>
              <div className="mt-3 pl-6 space-y-2 transform transition-transform duration-200">
                {availableTypes.map(type => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.tipo.includes(type)}
                      onChange={(e) => handleTypeChange(type, e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span 
                      className="text-sm"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Filtro por Precio */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('precio')}
              className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-50 focus-ring"
            >
              <div className="flex items-center space-x-2">
                <HiCurrencyDollar className="w-4 h-4 text-gray-500" />
                <span 
                  className="font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Rango de Precio
                </span>
                {(filters.precioMin !== null || filters.precioMax !== null) && (
                  <span 
                    className="px-2 py-1 text-xs rounded-full"
                    style={{ 
                      backgroundColor: 'var(--color-success-100)',
                      color: 'var(--color-success-700)'
                    }}
                  >
                    Activo
                  </span>
                )}
              </div>
              {expandedSections.precio ? (
                <HiChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <HiChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>

            <div className={`
              overflow-hidden transition-all duration-300 ease-out
              ${expandedSections.precio ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}>
              <div className="mt-3 pl-6 space-y-3 transform transition-transform duration-200">
                <div>
                  <label 
                    className="block text-sm font-medium mb-1"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Precio mínimo
                  </label>
                  <input
                    type="number"
                    placeholder={`Desde $${priceRange.min.toLocaleString()}`}
                    value={filters.precioMin || ''}
                    onChange={(e) => handlePriceChange('precioMin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label 
                    className="block text-sm font-medium mb-1"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Precio máximo
                  </label>
                  <input
                    type="number"
                    placeholder={`Hasta $${priceRange.max.toLocaleString()}`}
                    value={filters.precioMax || ''}
                    onChange={(e) => handlePriceChange('precioMax', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Resumen de filtros activos */}
          {hasActiveFilters && (
            <div 
              className="p-3 rounded-lg border-l-4"
              style={{ 
                backgroundColor: 'var(--color-info-50)',
                borderColor: 'var(--color-info-500)'
              }}
            >
              <h4 
                className="text-sm font-medium mb-2"
                style={{ color: 'var(--color-info-700)' }}
              >
                Filtros activos
              </h4>
              <div className="space-y-1 text-xs" style={{ color: 'var(--color-info-600)' }}>
                {filters.ciudad.length > 0 && (
                  <div>Ciudades: {filters.ciudad.join(', ')}</div>
                )}
                {filters.tipo.length > 0 && (
                  <div>Tipos: {filters.tipo.join(', ')}</div>
                )}
                {(filters.precioMin !== null || filters.precioMax !== null) && (
                  <div>
                    Precio: ${filters.precioMin?.toLocaleString() || priceRange.min.toLocaleString()} - 
                    ${filters.precioMax?.toLocaleString() || priceRange.max.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
} 