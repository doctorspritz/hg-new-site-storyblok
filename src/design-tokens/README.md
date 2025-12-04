# Hunter Galloway Design System

A comprehensive, token-based design system for the Hunter Galloway brand, extracted from huntergalloway.com.au and systematized for consistent digital experiences.

## Overview

This design system provides a foundation of design tokens that define colors, typography, spacing, and component patterns. These tokens ensure brand consistency across all Hunter Galloway digital touchpoints.

## Structure

```
src/design-tokens/
├── tokens.js          # Main design tokens definition
├── README.md          # This documentation
└── examples/          # Usage examples and patterns
```

## Design Tokens

### Colors

#### Brand Colors
```javascript
// Primary brand yellow
colors.brand.primary: '#FDB948'
colors.brand.primaryHover: '#F5B83D'
colors.brand.primaryLight: '#FFF5E2'

// Secondary brand blue
colors.brand.secondary: '#318EC3'
colors.brand.secondaryHover: '#287CAA'
```

#### Neutral Palette
```javascript
// Full grayscale from black to white
colors.neutral.black: '#000000'
colors.neutral.gray900: '#1A1A1A'  // Darkest gray for headings
colors.neutral.gray800: '#262626'  // Primary text
colors.neutral.gray600: '#666666'  // Secondary text
colors.neutral.gray200: '#E2E2E2'  // Borders
colors.neutral.gray100: '#F4F4F4'  // Background
colors.neutral.white: '#FFFFFF'
```

#### Semantic Colors
```javascript
// Success, warning, error, info states
colors.semantic.success: '#28A745'
colors.semantic.warning: '#FFC107'
colors.semantic.error: '#DC3545'
colors.semantic.info: '#17A2B8'
```

### Typography

#### Font Families
- **Primary**: Gotham Pro (headings, important text)
- **Secondary**: Open Sans (body text, general content)
- **Mono**: Monaco, Consolas (code, technical content)

#### Type Scale
```javascript
// Heading hierarchy
h1: 40px / 48px line-height, weight 700
h2: 32px / 40px line-height, weight 700
h3: 24px / 32px line-height, weight 600
h4: 20px / 28px line-height, weight 600
h5: 18px / 24px line-height, weight 600
h6: 16px / 24px line-height, weight 600

// Body text
base: 16px / 24px line-height
lg: 18px / 28px line-height
xl: 20px / 28px line-height
```

### Spacing

#### Base Scale
- **0**: 0px
- **1**: 4px
- **2**: 8px
- **3**: 12px
- **4**: 16px
- **5**: 20px
- **6**: 24px
- **8**: 32px
- **10**: 40px
- **12**: 48px
- **16**: 64px
- **20**: 80px
- **24**: 96px
- **32**: 128px

#### Semantic Spacing
```javascript
// Section spacing
section.xs: 32px
section.sm: 48px
section.md: 70px  // Hunter Galloway standard
section.lg: 96px
section.xl: 128px

// Component spacing
component.xs: 8px
component.sm: 16px
component.md: 24px
component.lg: 32px
component.xl: 48px
```

### Border Radius
- **xs**: 2px
- **sm**: 4px
- **base**: 6px
- **md**: 8px
- **lg**: 12px
- **xl**: 16px
- **2xl**: 24px
- **3xl**: 32px
- **pill**: Full rounding (800px)

### Shadows
```javascript
// Hunter Galloway specific shadows
hg.subtle: '0 6px 12px rgba(43, 43, 43, 0.15)'
hg.card: '0 4px 12px rgba(0, 0, 0, 0.1)'
hg.button: '0 2px 8px rgba(253, 185, 72, 0.3)'
hg.focus: '0 0 0 3px rgba(253, 185, 72, 0.3)'
```

## Using the Design System

### With Tailwind CSS

The design tokens are automatically integrated into Tailwind CSS. Use them directly in your classes:

```html
<!-- Brand colors -->
<div class="bg-brand-primary text-gray-black">
<div class="bg-brand-secondary text-gray-white">

<!-- Typography -->
<h1 class="text-h1 font-bold text-gray-900">
<p class="text-base text-gray-600">

<!-- Spacing -->
<section class="py-section-md">
<div class="p-component-lg">

<!-- Buttons -->
<button class="btn-hg-primary">Primary Action</button>
<button class="btn-hg-secondary">Secondary Action</button>

<!-- Cards -->
<div class="card-hg">
  <h3 class="heading-hg-3">Card Title</h3>
  <p>Card content...</p>
</div>
```

### Custom Component Classes

Pre-built component classes are available:

#### Buttons
- `.btn-hg-primary` - Yellow primary button
- `.btn-hg-secondary` - Blue secondary button

#### Cards
- `.card-hg` - Standard card with shadow and hover effects

#### Forms
- `.input-hg` - Standard form input with focus states

#### Typography
- `.heading-hg-1` - H1 heading with proper sizing and spacing
- `.heading-hg-2` - H2 heading with proper sizing and spacing
- `.heading-hg-3` - H3 heading with proper sizing and spacing

#### Layout
- `.section-hg` - Standard section spacing (70px top/bottom)

### In JavaScript/React

Import the tokens directly:

```javascript
import { designTokens } from '../design-tokens/tokens.js';

// Use in styled components or inline styles
const primaryColor = designTokens.colors.brand.primary;
const headingFont = designTokens.typography.fontFamily.primary;
const cardShadow = designTokens.boxShadow.hg.card;
```

## Component Patterns

### Buttons

Primary button pattern:
```html
<button class="btn-hg-primary">
  Get Free Assessment
</button>
```

Secondary button pattern:
```html
<button class="btn-hg-secondary">
  Learn More
</button>
```

### Hero Sections

Standard hero pattern:
```html
<section class="section-hg bg-gradient-to-br from-gray-50 to-gray-100">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="heading-hg-1 mb-6">
        <span class="font-black">Bold text</span>
        <span class="font-normal">regular text</span>
      </h1>
      <p class="text-xl text-gray-600 mb-8">Supporting description</p>
      <button class="btn-hg-primary">Primary Action</button>
    </div>
  </div>
</section>
```

### Cards

Standard card pattern:
```html
<div class="card-hg">
  <h3 class="heading-hg-3 mb-4">Card Title</h3>
  <p class="text-gray-600 mb-6">Card description content...</p>
  <button class="btn-hg-primary">Card Action</button>
</div>
```

### Forms

Standard form input pattern:
```html
<div class="mb-4">
  <label class="block text-sm font-semibold text-gray-700 mb-2">
    Label Text
  </label>
  <input type="text" class="input-hg w-full" placeholder="Enter text...">
</div>
```

## Breakpoints

### Standard Breakpoints
- **xs**: 475px
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Hunter Galloway Specific
- **hg-mobile**: 992px
- **hg-tablet**: 1200px
- **hg-desktop**: 1500px

## Best Practices

### Color Usage
1. Use `brand.primary` (#FDB948) for primary actions and key highlights
2. Use `brand.secondary` (#318EC3) for secondary actions and links
3. Use neutral grays for text hierarchy: `gray.900` for headings, `gray.600` for body text
4. Always ensure adequate contrast ratios for accessibility

### Typography
1. Use Gotham Pro for headings and important interface elements
2. Use Open Sans for body text and general content
3. Follow the type scale consistently across all designs
4. Maintain proper line heights for readability

### Spacing
1. Use the 4px base grid for all spacing decisions
2. Use semantic spacing tokens (section.md, component.lg) for consistency
3. Maintain consistent vertical rhythm with proper spacing between elements

### Components
1. Use pre-built component classes when available
2. Ensure all interactive elements have proper hover and focus states
3. Maintain consistent border radius and shadow usage
4. Follow the established patterns for similar components

## Migration Guide

### From Legacy Styles

Replace legacy color references:
```css
/* Old */
color: #fdb948;
background: #262626;

/* New */
color: theme('colors.brand.primary');
background: theme('colors.gray.800');
```

Replace legacy spacing:
```css
/* Old */
padding: 70px 0;
margin: 32px 0;

/* New */
padding: theme('spacing.section.md') 0;
margin: theme('spacing.8') 0;
```

### Updating Components

Use the new component classes:
```html
<!-- Old -->
<button class="bg-yellow hover:bg-accent text-black font-bold px-8 py-4 rounded-full">

<!-- New -->
<button class="btn-hg-primary">
```

## Browser Support

The design system supports all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

CSS custom properties and modern features are used throughout, with appropriate fallbacks where necessary.

## Contributing

When adding new tokens or patterns:

1. Follow the existing naming conventions
2. Ensure accessibility compliance
3. Test across all supported browsers
4. Update documentation and examples
5. Add Storybook stories for new components

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Hunter Galloway Brand Guidelines](https://www.huntergalloway.com.au)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Design Token Specification](https://design-tokens.github.io/community-group/format/)