'use client';

import { Button } from './Button';
import { useFavorites } from '@/contexts';
import { Property } from '@/types/property';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { useState } from 'react';

interface FavoriteButtonProps {
  property: Property;
  variant?: 'icon' | 'button';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export function FavoriteButton({ 
  property, 
  variant = 'icon', 
  size = 'sm',
  className = '',
  showText = false
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const favorite = isFavorite(property.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAnimating(true);
    toggleFavorite(property);
    
    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 200);
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleToggle}
        className={`
          p-2 rounded-full transition-all duration-200 focus-ring
          ${favorite ? 'text-error-500 bg-error-50' : 'text-gray-400 bg-white'}
          hover:scale-110 active:scale-95
          ${isAnimating ? 'animate-pulse' : ''}
          ${className}
        `}
        style={{ 
          transition: 'all var(--transition-fast)',
          boxShadow: favorite ? 'var(--shadow-sm)' : 'none'
        }}
        aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        title={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        {favorite ? (
          <HiHeart className={`w-5 h-5 ${isAnimating ? 'animate-bounce' : ''}`} />
        ) : (
          <HiOutlineHeart className="w-5 h-5" />
        )}
      </button>
    );
  }

  return (
    <Button
      variant={favorite ? 'success' : 'outline'}
      size={size}
      onClick={handleToggle}
      className={`
        transition-all duration-200 
        ${isAnimating ? 'animate-pulse' : ''}
        ${className}
      `}
    >
      <div className="flex items-center gap-2">
        {favorite ? (
          <HiHeart className={`w-4 h-4 ${isAnimating ? 'animate-bounce' : ''}`} />
        ) : (
          <HiOutlineHeart className="w-4 h-4" />
        )}
        {showText && (
          <span>{favorite ? 'En Favoritos' : 'Agregar a Favoritos'}</span>
        )}
      </div>
    </Button>
  );
} 