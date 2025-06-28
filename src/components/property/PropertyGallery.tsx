'use client';

import Image from 'next/image';
import { useState } from 'react';
import { HiChevronLeft, HiChevronRight, HiPhotograph } from 'react-icons/hi';

interface PropertyGalleryProps {
  images: string[];
  title: string;
  className?: string;
}

export function PropertyGallery({ images, title, className = '' }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Si no hay imágenes, mostrar placeholder
  if (!images || images.length === 0) {
    return (
      <div className={`aspect-video bg-surface-secondary rounded-xl flex items-center justify-center ${className}`}>
        <div className="text-center">
          <HiPhotograph className="w-12 h-12 mx-auto mb-2 text-muted" />
          <p className="text-sm text-muted">
            Sin imágenes disponibles
          </p>
        </div>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
    setImageLoaded(false); // Reset loading state when changing image
    setImageError(false);
  };

  const goToNext = () => {
    setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
    setImageLoaded(false); // Reset loading state when changing image
    setImageError(false);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setImageLoaded(false); // Reset loading state when changing image
    setImageError(false);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Imagen principal */}
      <div className="relative aspect-video rounded-xl overflow-hidden group bg-gray-200">
        {/* Skeleton mientras carga la imagen */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse">
            <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
          </div>
        )}

        {/* Imagen principal */}
        {!imageError && (
          <Image
            src={images[currentIndex]}
            alt={`${title} - Imagen ${currentIndex + 1}`}
            fill
            className={`object-cover transition-all duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        {/* Fallback si la imagen falla */}
        {imageError && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <HiPhotograph className="w-12 h-12 mx-auto mb-2" />
              <span className="text-sm">Error al cargar imagen</span>
            </div>
          </div>
        )}
        
        {/* Controles de navegación - solo visible cuando hay múltiples imágenes y la imagen está cargada */}
        {images.length > 1 && (imageLoaded || imageError) && (
          <>
            {/* Botón anterior */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Imagen anterior"
            >
              <HiChevronLeft className="w-5 h-5 text-white" />
            </button>
            
            {/* Botón siguiente */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Imagen siguiente"
            >
              <HiChevronRight className="w-5 h-5 text-white" />
            </button>
            
            {/* Indicador de posición */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 rounded-full">
              <span className="text-white text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </>
        )}
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex 
                  ? 'border-primary-500 ring-2 ring-primary-200' 
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 