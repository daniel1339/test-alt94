import Link from 'next/link';
import { HiChevronRight, HiHome } from 'react-icons/hi';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav 
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <HiChevronRight 
              className="w-4 h-4 mx-2"
              style={{ color: 'var(--color-text-muted)' }}
              aria-hidden="true"
            />
          )}
          
          {item.href && !item.isActive ? (
            <Link 
              href={item.href}
              className="hover:text-primary-600 transition-colors focus-ring rounded-md px-1 py-0.5"
              style={{ 
                color: 'var(--color-text-secondary)',
                transition: 'color var(--transition-fast)'
              }}
            >
              {index === 0 && (
                <HiHome className="w-4 h-4 inline mr-1" aria-hidden="true" />
              )}
              {item.label}
            </Link>
          ) : (
            <span 
              className={`px-1 py-0.5 ${item.isActive ? 'font-medium' : ''}`}
              style={{ 
                color: item.isActive 
                  ? 'var(--color-text-primary)' 
                  : 'var(--color-text-secondary)' 
              }}
              aria-current={item.isActive ? 'page' : undefined}
            >
              {index === 0 && !item.href && (
                <HiHome className="w-4 h-4 inline mr-1" aria-hidden="true" />
              )}
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
} 