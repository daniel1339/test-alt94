/**
 * Centralized formatting utilities
 */

/**
 * Formats a price in Argentine pesos
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

/**
 * Calculates and formats price per square meter
 */
export const formatPricePerM2 = (price: number, m2: number): string => {
  if (m2 === 0) return 'N/A';
  const pricePerM2 = price / m2;
  return formatPrice(pricePerM2);
};

/**
 * Calculates and formats price per room
 */
export const formatPricePerRoom = (price: number, rooms: number): string => {
  if (rooms === 0) return 'N/A';
  const pricePerRoom = price / rooms;
  return formatPrice(pricePerRoom);
};

/**
 * Formats numbers with thousands separators
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-AR').format(num);
};

/**
 * Formats area with unit
 */
export const formatArea = (area: number): string => {
  return `${formatNumber(area)} m²`;
};

/**
 * Formats number of rooms
 */
export const formatRooms = (rooms: number): string => {
  return `${rooms} amb.`;
}; 