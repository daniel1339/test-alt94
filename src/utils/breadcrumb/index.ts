/**
 * Utilities for breadcrumb construction
 */

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

/**
 * Base breadcrumb for all pages
 */
export const baseBreadcrumb: BreadcrumbItem[] = [
  { label: 'Inicio', href: '/' }
];

/**
 * Breadcrumb for properties pages
 */
export const propertiesBreadcrumb: BreadcrumbItem[] = [
  ...baseBreadcrumb,
  { label: 'Propiedades', href: '/properties' }
];

/**
 * Creates breadcrumb for property detail
 */
export const createPropertyDetailBreadcrumb = (title: string): BreadcrumbItem[] => [
  ...propertiesBreadcrumb,
  { label: title, isActive: true }
];

/**
 * Creates breadcrumb for recommendations
 */
export const createRecommendationsBreadcrumb = (title: string): BreadcrumbItem[] => [
  ...propertiesBreadcrumb,
  { label: title },
  { label: 'Similares', isActive: true }
];

/**
 * Creates breadcrumb for favorites
 */
export const createFavoritesBreadcrumb = (): BreadcrumbItem[] => [
  ...baseBreadcrumb,
  { label: 'Favoritos', isActive: true }
];

/**
 * Creates breadcrumb for not found
 */
export const createNotFoundBreadcrumb = (section: string): BreadcrumbItem[] => [
  ...baseBreadcrumb,
  { label: section, href: `/${section.toLowerCase()}` },
  { label: 'No encontrada', isActive: true }
];

/**
 * Creates breadcrumb for loading states
 */
export const createLoadingBreadcrumb = (section: string): BreadcrumbItem[] => [
  ...baseBreadcrumb,
  { label: section, href: `/${section.toLowerCase()}` },
  { label: 'Cargando...', isActive: true }
];