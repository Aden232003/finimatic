# UI Kit Usage Guide

This guide shows how to use the new Tailwind CSS-based UI components alongside your existing Finimatic styling system.

## Setup

1. **CSS Files**: Include both stylesheets in your HTML:
   ```html
   <!-- Your existing styles -->
   <link rel="stylesheet" href="styles/main.css">
   
   <!-- UI Kit styles (Tailwind-based) -->
   <link rel="stylesheet" href="styles/ui-components.css">
   ```

2. **UI Kit Container**: Wrap UI components in a `.ui-kit` class:
   ```html
   <div class="ui-kit">
     <!-- UI components go here -->
   </div>
   ```

## Available Components

### Buttons

```html
<!-- Primary Button -->
<button class="ui-button ui-button-primary tw-px-4 tw-py-2">Primary</button>

<!-- Secondary Button -->
<button class="ui-button ui-button-secondary tw-px-4 tw-py-2">Secondary</button>

<!-- Outline Button -->
<button class="ui-button tw-border tw-border-primary tw-bg-transparent tw-text-primary hover:tw-bg-primary hover:tw-text-primary-foreground tw-px-4 tw-py-2">Outline</button>

<!-- Ghost Button -->
<button class="ui-button hover:tw-bg-accent hover:tw-text-accent-foreground tw-px-4 tw-py-2">Ghost</button>
```

### Cards

```html
<div class="ui-card tw-p-6">
  <div class="tw-mb-4">
    <h3 class="tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight">Card Title</h3>
  </div>
  <div class="tw-text-sm tw-text-muted-foreground tw-mb-4">
    Card content goes here.
  </div>
  <div class="tw-mt-4 tw-pt-4 tw-border-t">
    <button class="ui-button ui-button-primary tw-px-3 tw-py-1 tw-text-sm">Action</button>
  </div>
</div>
```

### Form Inputs

```html
<input type="text" class="ui-input" placeholder="Enter text...">
<textarea class="ui-input tw-min-h-20 tw-resize-none" placeholder="Enter message..."></textarea>
```

## Programmatic Components

Use the JavaScript helper functions:

```javascript
import { createButton } from './components/ui/button.js';
import { createCard } from './components/ui/card.js';

// Create a button
const button = createButton({
  text: 'Click me',
  variant: 'primary',
  size: 'lg',
  onClick: () => console.log('Clicked!')
});

// Create a card
const card = createCard({
  title: 'My Card',
  content: 'Card content here',
  className: 'tw-max-w-sm'
});
```

## Layout Classes

The UI kit includes common Tailwind utility classes with `tw-` prefix:

### Spacing
- `tw-p-6`, `tw-px-4`, `tw-py-2`, `tw-m-4`, `tw-mb-6`, etc.

### Sizing
- `tw-w-full`, `tw-h-9`, `tw-max-w-sm`, `tw-min-h-20`, etc.

### Layout
- `tw-flex`, `tw-grid`, `tw-grid-cols-1`, `tw-gap-4`, etc.

### Typography
- `tw-text-sm`, `tw-text-lg`, `tw-font-semibold`, `tw-font-bold`, etc.

### Colors
- `tw-text-primary`, `tw-bg-card`, `tw-border-primary`, etc.

## Responsive Design

Use responsive prefixes:
- `md:tw-grid-cols-2` (tablet and up)
- `lg:tw-grid-cols-3` (desktop and up)

## Integration with Existing Styles

The UI kit is designed to work alongside your existing Finimatic styles:

```html
<!-- Mixed styling example -->
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
  
  <!-- Existing Finimatic style -->
  <div style="background: var(--color-bg-secondary); padding: var(--space-6);">
    <h3 style="color: var(--color-text-primary);">Existing Style</h3>
    <button class="btn btn--primary">Existing Button</button>
  </div>
  
  <!-- UI Kit style -->
  <div class="ui-kit">
    <div class="ui-card tw-p-6">
      <h3 class="tw-text-lg tw-font-semibold">UI Kit Style</h3>
      <button class="ui-button ui-button-primary tw-px-4 tw-py-2">UI Button</button>
    </div>
  </div>
  
</div>
```

## Theme Variables

The UI kit uses CSS custom properties that integrate with your brand colors:

```css
.ui-kit {
  --primary: 16 84% 60%; /* Your orange #FF6B35 */
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  /* ... other variables */
}
```

## Demo Page

View the complete demo at `/ui-demo.html` to see all components in action.

## Building

To rebuild the UI components CSS:

```bash
npm run build:ui
```

This will process the Tailwind CSS and output to `public/styles/ui-components.min.css`. 