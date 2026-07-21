# Fluid Typography Implementation

## Overview
All card text across the Balaji Online Service app now uses **CSS `clamp()`** for automatic responsive scaling. Text automatically adjusts size between minimum and maximum values based on viewport width, eliminating the need for media queries.

## Benefits
✓ **Auto-scaling**: Text scales smoothly from mobile to desktop without discrete breakpoints
✓ **Perfect fit**: Content always fits within card boundaries regardless of screen size
✓ **Performance**: No JavaScript required, pure CSS solution
✓ **Maintainability**: Single class applies responsive typography
✓ **Accessibility**: Respects user font-size preferences

## Fluid Typography Classes

### `.text-fluid-heading`
- **Usage**: Main section titles (e.g., "Essential Helplines")
- **Range**: 1.25rem (20px) → 1.875rem (30px)
- **Line Height**: 1.3
- **Formula**: `clamp(1.25rem, 3vw, 1.875rem)`

### `.text-fluid-title`
- **Usage**: Card titles (e.g., banner titles, service names)
- **Range**: 1rem (16px) → 1.5rem (24px)
- **Line Height**: 1.35
- **Formula**: `clamp(1rem, 2.5vw, 1.5rem)`

### `.text-fluid-subtitle`
- **Usage**: Service card names
- **Range**: 0.875rem (14px) → 1.125rem (18px)
- **Line Height**: 1.4
- **Formula**: `clamp(0.875rem, 2vw, 1.125rem)`

### `.text-fluid-body`
- **Usage**: Descriptions, body text, button labels
- **Range**: 0.75rem (12px) → 0.875rem (14px)
- **Line Height**: 1.5
- **Formula**: `clamp(0.75rem, 1.5vw, 0.875rem)`

### `.text-fluid-small`
- **Usage**: Category badges, small text
- **Range**: 0.65rem (10.4px) → 0.75rem (12px)
- **Line Height**: 1.6
- **Formula**: `clamp(0.65rem, 1vw, 0.75rem)`

## Component Updates

### Featured Banner Cards (banner-3d-card.tsx)
```tsx
// Title - scales with viewport
<h3 className="text-fluid-title font-semibold text-white">{title}</h3>

// Description - optimized for fit
<p className="text-fluid-body text-white/90">{description}</p>

// Button label - maintains readability
<div className="text-fluid-body font-medium text-white">{label}</div>
```

### Service Grid Cards (service-grid.tsx)
```tsx
// Service name - responsive sizing
<h3 className="text-fluid-subtitle font-semibold">{service.name}</h3>

// Description - scales proportionally
<p className="text-fluid-body">{service.description}</p>

// Category badge - small but readable
<span className="text-fluid-small font-medium">{service.category}</span>
```

### Helpline Section (helpline-section.tsx)
```tsx
// Section heading
<h2 className="text-fluid-heading font-semibold">Essential Helplines</h2>

// Card names - fits in grid
<p className="text-fluid-small font-medium">{helpline.name}</p>
```

## How It Works

The `clamp()` CSS function takes three parameters:
```css
font-size: clamp(MIN, PREFERRED, MAX);
```

- **MIN**: Minimum font size (e.g., 0.75rem)
- **PREFERRED**: Scales based on viewport width (e.g., 1.5vw)
- **MAX**: Maximum font size (e.g., 0.875rem)

The browser automatically picks the middle value if it falls between min and max, ensuring perfect fit.

## Examples

### On Mobile (375px viewport)
- `.text-fluid-title`: ~10px × 2.5% = 9.4px → clamped to 1rem (16px)
- `.text-fluid-body`: ~375px × 1.5% = 5.6px → clamped to 0.75rem (12px)

### On Desktop (1200px viewport)
- `.text-fluid-title`: ~1200px × 2.5% = 30px → clamped to 1.5rem (24px)
- `.text-fluid-body`: ~1200px × 1.5% = 18px → clamped to 0.875rem (14px)

### In Between
- Text smoothly scales between min and max values
- No jarring jumps at breakpoints
- Always perfectly optimized for container

## Browser Support
✓ Chrome/Edge 79+
✓ Firefox 75+
✓ Safari 13.1+
✓ All modern mobile browsers

## Future Enhancements
- Container queries: `clamp()` with container width for more precise scaling
- Dynamic scaling: Adjust min/max based on content complexity
- User preferences: Respect `prefers-reduced-text` media query
