'use client';

import Link from 'next/link';
import { PropertyWithScore } from '@/types/property';
import { PropertyCard } from './PropertyCard';
import { LoadingCard, LoadingPage } from '@/components/ui';
import { useRecommendations } from '@/hooks/useRecommendations';
import { HiExclamationCircle, HiSparkles, HiHome } from 'react-icons/hi';

interface RecommendationsListProps {
  propertyId: string;
  initialRecommendations?: PropertyWithScore[];
  className?: string;
}

export function RecommendationsList({ 
  propertyId,
  initialRecommendations,
  className = ''
}: RecommendationsListProps) {
  const { recommendations, loading, error, refetch } = useRecommendations(propertyId);

  // Use initial data if available
  const displayRecommendations = initialRecommendations || recommendations;

  // State of loading
  if (loading && !initialRecommendations) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center">
          <LoadingPage message="Loading recommendations..." size="md" />
        </div>
        
        {/* Skeleton grid */}
        <div className="grid-properties">
          {Array.from({ length: 6 }).map((_, index) => (
            <LoadingCard key={index} rows={3} />
          ))}
        </div>
      </div>
    );
  }

  // State of error
  if (error) {
    return (
      <div className={`text-center space-y-4 ${className}`}>
        <HiExclamationCircle className="mx-auto text-6xl mb-4 text-error-500" />
        <h3 className="text-xl font-semibold text-primary">
          Error loading recommendations
        </h3>
        <p className="text-sm max-w-md mx-auto text-secondary">
          {error}
        </p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (displayRecommendations.length === 0) {
    return (
      <div className={`text-center space-y-4 py-12 ${className}`}>
        <HiSparkles className="mx-auto text-6xl mb-4 text-muted" />
        <h3 className="text-xl font-semibold text-primary">
          No recommendations available
        </h3>
        <p className="text-sm max-w-md mx-auto text-secondary">
          No properties found similar at this time. 
          Try exploring other options in the catalog.
        </p>
      </div>
    );
  }

  // List of recommendations with scores
  return (
    <div className={className}>
      {/* Header with information */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <HiSparkles className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-primary">
            Similar Properties
          </h2>
        </div>
        <p className="text-sm text-secondary">
          Found <span className="font-medium">{displayRecommendations.length}</span> properties 
          similar ordered by compatibility
        </p>
      </div>

      {/* Grid of recommendations */}
      <div className="grid-properties">
        {displayRecommendations.map((recommendation) => (
          <div key={recommendation.id} className="relative">
                         {/* Badge of similarity score */}
             <div className="absolute top-2 right-2 z-10 px-2 py-1 rounded-full text-xs font-bold bg-success-100 text-success-700 border border-success-200">
               {Math.round(recommendation.similarityScore * 100)}% similar
             </div>
            
            <PropertyCard
              property={recommendation}
              showRecommendations={false} // Don&apos;t show "Similar" button in recommendations
            />
          </div>
        ))}
      </div>

      {/* Footer with CTA */}
      <div className="text-center mt-8 p-6 bg-surface-gray rounded-lg">
        <HiHome className="mx-auto text-3xl mb-2 text-primary-600" />
        <h3 className="font-semibold mb-2 text-primary">
          Didn&apos;t find what you were looking for?
        </h3>
        <p className="text-sm text-secondary mb-4">
          Explore all our property catalog
        </p>
        <Link 
          href="/properties"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
        >
          View All Properties
        </Link>
      </div>
    </div>
  );
} 