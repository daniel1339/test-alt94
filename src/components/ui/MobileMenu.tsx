'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiMenu, HiX, HiHome, HiViewGrid, HiHeart } from 'react-icons/hi';
import { FavoritesCounter } from './FavoritesCounter';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Detect if we're on client to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close menu when screen resizes to desktop
  useEffect(() => {
    if (!isMounted) return;
    
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMounted]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (!isMounted) return;
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMounted]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Don't render until component is mounted on client
  if (!isMounted) {
    return (
      <button 
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Abrir menú"
        disabled
      >
        <HiMenu className="w-6 h-6 text-gray-700" />
      </button>
    );
  }

  return (
    <>
      {/* Hamburger button */}
      <button 
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Abrir menú"
      >
        <HiMenu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50" 
            onClick={closeMenu}
          />
          
          {/* Side panel */}
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl border-l border-gray-200">
            <div className="flex flex-col h-full">
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                <h2 className="text-xl font-bold text-gray-900">
                  Navegación
                </h2>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Cerrar menú"
                >
                  <HiX className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-6 bg-white">
                <div className="space-y-3">
                  
                  <Link 
                    href="/"
                    onClick={closeMenu}
                    className="flex items-center space-x-4 px-4 py-4 rounded-xl hover:bg-blue-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200">
                      <HiHome className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-lg font-medium text-gray-900">Inicio</span>
                  </Link>
                  
                  <Link 
                    href="/properties"
                    onClick={closeMenu}
                    className="flex items-center space-x-4 px-4 py-4 rounded-xl hover:bg-green-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200">
                      <HiViewGrid className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-lg font-medium text-gray-900">Propiedades</span>
                  </Link>
                  
                  <Link 
                    href="/favorites"
                    onClick={closeMenu}
                    className="flex items-center space-x-4 px-4 py-4 rounded-xl hover:bg-red-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200">
                      <HiHeart className="w-5 h-5 text-red-600" />
                    </div>
                    <span className="text-lg font-medium text-gray-900">Mis Favoritos</span>
                  </Link>
                </div>
                
                {/* Favorites counter */}
                <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Propiedades guardadas
                    </p>
                    <FavoritesCounter />
                  </div>
                </div>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    PropiedadesApp
                  </p>
                  <p className="text-xs text-gray-500">
                    Versión 1.0
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 