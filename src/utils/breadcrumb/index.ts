/**
 * Utilidades para construcción de breadcrumbs
 */

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

/**
 * Breadcrumb base para todas las páginas
 */
export const baseBreadcrumb: BreadcrumbItem[] = [
  { label: 'Inicio', href: '/' }
];

/**
 * Breadcrumb para páginas de propiedades
 */
export const propertiesBreadcrumb: BreadcrumbItem[] = [
  ...baseBreadcrumb,
  { label: 'Propiedades', href: '/properties' }
];

/**
 * Crea breadcrumb para detalle de propiedad
 */
export const createPropertyDetailBreadcrumb = (title: string): BreadcrumbItem[] => [
  ...propertiesBreadcrumb,
  { label: title, isActive: true }
];

/**
 * Crea breadcrumb para recomendaciones
 */
export const createRecommendationsBreadcrumb = (title: string): BreadcrumbItem[] => [
  ...propertiesBreadcrumb,
  { label: title, href: `/properties/${extractIdFromTitle(title)}` },
  { label: 'Similares', isActive: true }
];

/**
 * Crea breadcrumb para favoritos
 */
export const createFavoritesBreadcrumb = (): BreadcrumbItem[] => [
  ...baseBreadcrumb,
  { label: 'Favoritos', isActive: true }
];

/**
 * Crea breadcrumb para not found
 */
export const createNotFoundBreadcrumb = (section: string): BreadcrumbItem[] => [
  ...baseBreadcrumb,
  { label: section, href: `/${section.toLowerCase()}` },
  { label: 'No encontrada', isActive: true }
];

/**
 * Crea breadcrumb para loading states
 */
export const createLoadingBreadcrumb = (section: string): BreadcrumbItem[] => [
  ...baseBreadcrumb,
  { label: section, href: `/${section.toLowerCase()}` },
  { label: 'Cargando...', isActive: true }
];

/**
 * Extrae ID del título (helper function)
 */
function extractIdFromTitle(_title: string): string {
  // Esta función se puede mejorar según el patrón de títulos
  return '1'; // placeholder
} 