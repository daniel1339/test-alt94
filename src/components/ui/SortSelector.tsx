'use client';

import { useState } from 'react';
import { HiChevronDown, HiSortAscending, HiSortDescending } from 'react-icons/hi';

interface SortOption {
  value: 'relevance' | 'price-asc' | 'price-desc' | 'newest';
  label: string;
  icon?: React.ReactNode;
}

interface SortSelectorProps {
  value: 'relevance' | 'price-asc' | 'price-desc' | 'newest';
  onChange: (value: 'relevance' | 'price-asc' | 'price-desc' | 'newest') => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  totalResults?: number;
}

export function SortSelector({
  value,
  onChange,
  className = "",
  size = 'md',
  totalResults
}: SortSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions: SortOption[] = [
    { 
      value: 'relevance', 
      label: 'Más relevantes',
      icon: <HiSortAscending className="w-4 h-4" />
    },
    { 
      value: 'price-asc', 
      label: 'Precio: menor a mayor',
      icon: <HiSortAscending className="w-4 h-4" />
    },
    { 
      value: 'price-desc', 
      label: 'Precio: mayor a menor',
      icon: <HiSortDescending className="w-4 h-4" />
    },
    { 
      value: 'newest', 
      label: 'Más recientes',
      icon: <HiSortDescending className="w-4 h-4" />
    }
  ];

  const currentOption = sortOptions.find(option => option.value === value);

  const sizeClasses = {
    sm: 'text-sm px-3 py-2',
    md: 'text-md px-4 py-2',
    lg: 'text-lg px-5 py-3'
  };

  const handleSelect = (optionValue: typeof value) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Información de resultados */}
      {totalResults !== undefined && (
        <div 
          className="text-sm mb-2"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {totalResults === 0 ? (
            'No se encontraron propiedades'
          ) : (
            <>
              {totalResults} {totalResults === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
            </>
          )}
        </div>
      )}

      {/* Selector */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            ${sizeClasses[size]}
            w-full flex items-center justify-between
            border border-default rounded-lg
            transition-colors duration-200
            hover:border-primary-400 focus:border-primary-600 focus:ring-2 focus:ring-primary-100
            ${isOpen ? 'border-primary-600 ring-2 ring-primary-100' : ''}
          `}
          style={{ 
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text-primary)'
          }}
        >
          <div className="flex items-center space-x-2">
            {currentOption?.icon}
            <span className="font-medium">
              Ordenar por: {currentOption?.label}
            </span>
          </div>
          
          <HiChevronDown 
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            style={{ color: 'var(--color-text-secondary)' }}
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <div 
              className="absolute top-full mt-1 left-0 right-0 z-20 py-1 rounded-lg shadow-lg border border-default"
              style={{ 
                backgroundColor: 'var(--color-surface)',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`
                    w-full px-4 py-2 text-left
                    flex items-center space-x-2
                    transition-colors duration-200
                    hover:bg-gray-50
                    ${option.value === value ? 'bg-primary-50 text-primary-700' : ''}
                  `}
                  style={{
                    color: option.value === value 
                      ? 'var(--color-primary-700)' 
                      : 'var(--color-text-primary)'
                  }}
                >
                  <span 
                    className={`
                      ${option.value === value ? 'text-primary-600' : 'text-gray-400'}
                    `}
                  >
                    {option.icon}
                  </span>
                  <span className={option.value === value ? 'font-medium' : ''}>
                    {option.label}
                  </span>
                  
                  {/* Checkmark para opción seleccionada */}
                  {option.value === value && (
                    <div className="ml-auto">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: 'var(--color-primary-600)' }}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 