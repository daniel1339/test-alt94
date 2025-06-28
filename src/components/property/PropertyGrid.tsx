import { Property } from '@/types/property';
import { PropertyCard } from './PropertyCard';

interface PropertyGridProps {
  properties: Property[];
  showRecommendations?: boolean;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

export function PropertyGrid({ 
  properties, 
  showRecommendations = false,
  className = '',
  columns
}: PropertyGridProps) {
  // Determinar clase de grid basada en columnas
  const getGridClass = () => {
    if (columns) {
      const columnClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-properties'
      };
      return `grid gap-6 ${columnClasses[columns]}`;
    }
    return 'grid-properties';
  };

  return (
    <div className={`${getGridClass()} ${className}`}>
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          showRecommendations={showRecommendations}
        />
      ))}
    </div>
  );
} 