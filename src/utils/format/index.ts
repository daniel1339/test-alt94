/**
 * Utilidades de formateo centralizadas
 */

/**
 * Formatea un precio en pesos argentinos
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
 * Calcula y formatea el precio por metro cuadrado
 */
export const formatPricePerM2 = (price: number, m2: number): string => {
  if (m2 === 0) return 'N/A';
  const pricePerM2 = price / m2;
  return formatPrice(pricePerM2);
};

/**
 * Calcula y formatea el precio por ambiente
 */
export const formatPricePerRoom = (price: number, rooms: number): string => {
  if (rooms === 0) return 'N/A';
  const pricePerRoom = price / rooms;
  return formatPrice(pricePerRoom);
};

/**
 * Formatea números con separadores de miles
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-AR').format(num);
};

/**
 * Formatea superficie con unidad
 */
export const formatArea = (area: number): string => {
  return `${formatNumber(area)} m²`;
};

/**
 * Formatea cantidad de ambientes
 */
export const formatRooms = (rooms: number): string => {
  return `${rooms} amb.`;
}; 