# Sistema de Diseño - PropiedadesApp

## 📋 Colores

### Primarios
- `--color-primary-500`: #3b82f6 (Azul principal)
- `--color-primary-600`: #2563eb (Azul botones)
- `--color-primary-700`: #1d4ed8 (Azul hover)

### Grises Neutros
- `--color-gray-50`: #f9fafb (Fondo claro)
- `--color-gray-200`: #e5e7eb (Bordes)
- `--color-gray-600`: #4b5563 (Texto secundario)
- `--color-gray-900`: #111827 (Texto principal)

### Estados
- **Success**: `--color-success-600`: #16a34a
- **Warning**: `--color-warning-600`: #d97706  
- **Error**: `--color-error-600`: #dc2626
- **Info**: `--color-info-600`: #0891b2

### Semánticos
- `--color-text-primary`: Texto principal
- `--color-text-secondary`: Texto secundario
- `--color-surface`: Fondo de tarjetas
- `--color-border`: Bordes por defecto

## 🎨 Componentes

### Button
```jsx
<Button variant="primary" size="md">Primario</Button>
<Button variant="outline" size="sm">Outline</Button>
<Button variant="success" loading>Cargando</Button>
```

**Variantes**: primary, secondary, outline, ghost, success, warning, error
**Tamaños**: sm, md, lg

### Card
```jsx
<Card padding="lg" shadow="md" hover>
  Contenido de la tarjeta
</Card>
```

**Props**: padding, shadow, rounded, border, hover, as

### Loading
```jsx
<LoadingSpinner size="lg" color="primary" />
<LoadingCard rows={4} />
<LoadingPage message="Cargando propiedades..." />
<TextSkeleton lines={3} />
```

## 📏 Espaciados

- `--spacing-xs`: 4px
- `--spacing-sm`: 8px  
- `--spacing-md`: 12px
- `--spacing-lg`: 16px
- `--spacing-xl`: 24px
- `--spacing-2xl`: 32px

## 🔤 Tipografía

- `--font-size-sm`: 14px
- `--font-size-md`: 16px
- `--font-size-lg`: 18px
- `--font-size-xl`: 20px
- `--font-size-2xl`: 24px

## 🎭 Efectos

### Sombras
- `--shadow-sm`: Sombra sutil
- `--shadow-md`: Sombra media (tarjetas)
- `--shadow-lg`: Sombra fuerte (hover)

### Transiciones
- `--transition-fast`: 150ms (hover rápido)
- `--transition-normal`: 200ms (transiciones generales)
- `--transition-slow`: 300ms (animaciones complejas)

## 🛠️ Clases de Utilidad Centralizadas

### **🎨 Colores de Texto**
```css
.text-primary         /* Color de texto principal */
.text-secondary       /* Color de texto secundario */
.text-muted          /* Color de texto atenuado */
.text-light          /* Color de texto muy claro */
.text-inverse        /* Color de texto inverso (blanco) */

/* Colores de estado */
.text-primary-600    /* Texto azul */
.text-primary-700    /* Texto azul oscuro */
.text-success-600    /* Texto verde */
.text-warning-500    /* Texto amarillo */
.text-warning-600    /* Texto naranja */
.text-error-500      /* Texto rojo */
.text-info-600       /* Texto celeste */
```

### **🎨 Colores de Fondo**
```css
.bg-surface          /* Fondo principal (blanco) */
.bg-surface-gray     /* Fondo gris claro */
.bg-surface-secondary /* Fondo gris secundario */

/* Fondos de estado con variantes 50 y 100 */
.bg-primary-50       /* Fondo azul muy claro */
.bg-primary-100      /* Fondo azul claro */
.bg-success-50       /* Fondo verde muy claro */
.bg-success-100      /* Fondo verde claro */
.bg-warning-50       /* Fondo amarillo muy claro */
.bg-warning-100      /* Fondo amarillo claro */
.bg-info-50          /* Fondo celeste muy claro */
.bg-info-100         /* Fondo celeste claro */
.bg-error-50         /* Fondo rojo muy claro */
.bg-error-100        /* Fondo rojo claro */
```

### **🔲 Bordes**
```css
.border-default      /* Borde por defecto */
.border-light        /* Borde claro */
.border-strong       /* Borde fuerte */
.border-primary-200  /* Borde azul claro */
```

### **📐 Layouts de Grid Específicos**
```css
/* Grid para propiedades responsive */
.grid-properties {
  /* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols, Large: 4 cols */
}

/* Grid para estadísticas */
.grid-stats {
  /* Mobile: 1 col, Desktop: 4 cols */
}

/* Grid para página de detalle */
.grid-detail {
  /* Mobile: 1 col, Desktop: 3 cols */
}
```

### **💀 Skeletons Reutilizables**
```css
.skeleton            /* Skeleton base con animación pulse */
.skeleton-text       /* Skeleton para texto (1rem altura) */
.skeleton-title      /* Skeleton para títulos (2rem altura) */
.skeleton-image      /* Skeleton para imágenes (12rem altura) */
.skeleton-button     /* Skeleton para botones (2.5rem altura) */
```

### **✨ Estados de Hover y Focus**
```css
.hover-lift          /* Efecto elevación en hover */
.focus-ring          /* Anillo de enfoque consistente */
```

### **🎯 Componentes de Diseño Específicos**
```css
/* Tarjeta de estadística */
.stat-card {
  border-radius: var(--radius-lg);
  padding: 1rem;
  text-align: center;
}

/* Precio destacado */
.price-display {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
}

/* Badge de tipo de propiedad */
.badge-type {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
}

/* Fila de características */
.feature-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) 0;
}

/* Label de característica */
.feature-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  color: var(--color-text-secondary);
}

/* Valor de característica */
.feature-value {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}
```

## 🎯 Buenas Prácticas

1. **Usa clases utilitarias** en lugar de estilos inline repetitivos
2. **Mantén contraste** mínimo 4.5:1 para accesibilidad
3. **Usa transiciones** para interacciones suaves
4. **Aplica focus-ring** para navegación por teclado
5. **Sigue la jerarquía** de espaciados y tipografía
6. **Reutiliza componentes** de diseño específicos (.stat-card, .price-display, etc.)

## 📱 Responsive

- Mobile first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Usa flexbox y grid para layouts
- Componentes adaptativos por defecto 
- Grids específicos para diferentes contextos

## 🎨 Animaciones

### Pulse (Skeletons)
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

## 📊 Variables de Layout

### Z-indexes
- `--z-dropdown`: 10
- `--z-sticky`: 20  
- `--z-fixed`: 30
- `--z-modal`: 40
- `--z-tooltip`: 50

### Radios
- `--radius-sm`: 6px
- `--radius-md`: 8px
- `--radius-lg`: 12px
- `--radius-xl`: 16px

---

**📝 Notas de Actualización:**
- ✅ Agregadas 30+ clases de utilidad centralizadas
- ✅ Componentes específicos para design consistency
- ✅ Grids responsivos reutilizables
- ✅ Sistema de skeleton completo
- ✅ Estados hover/focus mejorados 