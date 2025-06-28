// Hook de utilidad para acciones de favoritos
// No usa 'use client' para permitir importación desde componentes server

export interface FavoritesActions {
  // IDs de propiedades favoritas para usar en SSR si fuera necesario
  getFavoriteIds: () => number[];
  
  // Información básica para mostrar en componentes server
  getFavoritesCount: () => number;
  
  // Helpers para componentes que no pueden usar el contexto directamente
  isPropertyFavorite: (propertyId: number) => boolean;
}

// Este es un hook placeholder que podría expandirse en el futuro
// para funcionalidades como obtener favoritos desde el servidor
export function useFavoritesActions(): FavoritesActions {
  
  const getFavoriteIds = (): number[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        return Array.isArray(parsedFavorites) 
          ? parsedFavorites.map((fav: any) => fav.id).filter(Boolean)
          : [];
      }
    } catch (error) {
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