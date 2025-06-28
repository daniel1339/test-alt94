'use client';

import { useState, useEffect } from 'react';
import { HiSearch, HiX } from 'react-icons/hi';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  autoFocus?: boolean;
}

export function SearchInput({
  placeholder = "Buscar propiedades...",
  value = "",
  onChange,
  onClear,
  className = "",
  size = 'md',
  autoFocus = false
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setInternalValue("");
    onChange?.("");
    onClear?.();
  };

  const sizeClasses = {
    sm: 'h-8 text-sm px-3',
    md: 'h-10 text-md px-4',
    lg: 'h-12 text-lg px-5'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`
          relative flex items-center
          ${sizeClasses[size]}
          border border-default rounded-lg
          transition-all duration-200
          ${isFocused 
            ? 'border-primary-600 ring-2 ring-primary-100' 
            : 'hover:border-primary-400'
          }
        `}
        style={{
          backgroundColor: 'var(--color-surface)',
          transition: 'all var(--transition-fast)'
        }}
      >
        {/* Icono de búsqueda */}
        <HiSearch 
          className={`
            ${iconSizes[size]} 
            ${isFocused ? 'text-primary-600' : 'text-gray-400'}
            transition-colors duration-200 flex-shrink-0
          `}
        />

        {/* Input */}
        <input
          type="text"
          value={internalValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`
            flex-1 outline-none bg-transparent
            ml-3 mr-2
            placeholder-gray-400
            transition-colors duration-200
          `}
          style={{
            color: 'var(--color-text-primary)',
            fontSize: size === 'sm' ? 'var(--font-size-sm)' : 
                     size === 'lg' ? 'var(--font-size-lg)' : 'var(--font-size-md)'
          }}
        />

        {/* Botón limpiar */}
        {internalValue && (
          <button
            onClick={handleClear}
            className={`
              ${iconSizes[size]}
              text-gray-400 hover:text-gray-600
              transition-colors duration-200
              rounded-full hover:bg-gray-100
              p-1 flex-shrink-0
            `}
            aria-label="Limpiar búsqueda"
          >
            <HiX className="w-full h-full" />
          </button>
        )}
      </div>

      {/* Indicador de resultados (opcional) */}
      {internalValue && (
        <div 
          className="absolute top-full mt-1 left-0 text-xs opacity-75"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Buscando "{internalValue}"...
        </div>
      )}
    </div>
  );
} 