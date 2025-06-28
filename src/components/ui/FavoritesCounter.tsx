'use client';

import { useFavorites } from '@/contexts';
import { HiHeart } from 'react-icons/hi';
import Link from 'next/link';

interface FavoritesCounterProps {
  className?: string;
}

export function FavoritesCounter({ className = '' }: FavoritesCounterProps) {
  const { favoriteCount, isLoading } = useFavorites();

  if (isLoading) {
    return (
      <div className={`flex items-center space-x-1 ${className}`}>
        <HiHeart className="w-5 h-5 text-gray-300 animate-pulse" />
        <span className="text-sm text-gray-300">...</span>
      </div>
    );
  }

  return (
    <Link 
      href="/favorites" 
      className={`
        flex items-center space-x-2 px-3 py-2 rounded-lg
        transition-colors focus-ring relative
        hover:bg-gray-50 text-secondary hover:text-primary
        ${className}
      `}
      style={{ transition: 'all var(--transition-fast)' }}
    >
      <div className="relative">
        <HiHeart 
          className={`w-5 h-5 ${favoriteCount > 0 ? 'text-error-500' : 'text-gray-400'}`} 
        />
        {favoriteCount > 0 && (
          <div 
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse"
            style={{ 
              backgroundColor: 'var(--color-error-600)',
              fontSize: '10px',
              minWidth: '20px'
            }}
          >
            {favoriteCount > 99 ? '99+' : favoriteCount}
          </div>
        )}
      </div>
      
      <span className="hidden sm:inline text-sm font-medium">
        Favoritos
        {favoriteCount > 0 && (
          <span className="ml-1 text-xs opacity-75">
            ({favoriteCount})
          </span>
        )}
      </span>
    </Link>
  );
} 