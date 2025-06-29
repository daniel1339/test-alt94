// Utility hook for favorites actions
// Doesn't use 'use client' to allow import from server components

export interface FavoritesActions {
  // Favorite property IDs for use in SSR if needed
  getFavoriteIds: () => number[];
  
  // Basic information to display in server components
  getFavoritesCount: () => number;
  
  // Helpers for components that can't use context directly
  isPropertyFavorite: (propertyId: number) => boolean;
}

// This is a placeholder hook that could be expanded in the future
// for functionalities like getting favorites from the server
export function useFavoritesActions(): FavoritesActions {
  
  const getFavoriteIds = (): number[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        return Array.isArray(parsedFavorites) 
          ? parsedFavorites.map((fav: { id: number }) => fav.id).filter(Boolean)
          : [];
      }
    } catch (error: unknown) {
      console.error('Error reading favorites from localStorage:', error);
    }
    
    return [];
  };

  const getFavoritesCount = (): number => {
    return getFavoriteIds().length;
  };

  const isPropertyFavorite = (propertyId: number): boolean => {
    return getFavoriteIds().includes(propertyId);
  };

  return {
    getFavoriteIds,
    getFavoritesCount,
    isPropertyFavorite
  };
} 