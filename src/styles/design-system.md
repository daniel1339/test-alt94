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

## 🛠️ Clases de Utilidad

### Texto
- `.text-primary`: Texto principal
- `.text-secondary`: Texto secundario
- `.text-muted`: Texto atenuado

### Fondos
- `.bg-surface`: Fondo de superficie
- `.bg-surface-gray`: Fondo gris claro

### Efectos
- `.hover-lift`: Efecto elevación en hover
- `.focus-ring`: Anillo de enfoque consistente

## 🎯 Buenas Prácticas

1. **Usa variables CSS** en lugar de colores hardcodeados
2. **Mantén contraste** mínimo 4.5:1 para accesibilidad
3. **Usa transiciones** para interacciones suaves
4. **Aplica focus-ring** para navegación por teclado
5. **Sigue la jerarquía** de espaciados y tipografía

## 📱 Responsive

- Mobile first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Usa flexbox y grid para layouts
- Componentes adaptativos por defecto 