/**
 * Hunter Galloway Design System - Design Tokens
 * Modern 3-tier token structure following 2024 best practices
 */

// Import modern token tiers
import primitive from './primitive';
import semantic from './semantic';
import component from './component';

// Import legacy tokens for backwards compatibility
import colors, { cssVariables as colorVars } from './colors';
import typography, { cssVariables as typographyVars } from './typography';
import spacing, { cssVariables as spacingVars } from './spacing';
import effects, { cssVariables as effectVars } from './effects';

// Export modern token structure (recommended)
export { primitive } from './primitive';
export { semantic } from './semantic'; 
export { component } from './component';

// Export legacy tokens (backwards compatibility)
export { colors, typography, spacing, effects };

// Re-export individual token groups for convenience (legacy)
export { primary, neutral, semantic as colorSemantic, component as colorComponent } from './colors';
export { fontFamily, fontSize, fontWeight, textStyles } from './typography';
export { scale, section, component as spacingComponent, layout, gap, borderRadius } from './spacing';
export { shadow, transition, transform, opacity, zIndex } from './effects';

// Modern CSS variables from semantic tokens (recommended)
export const cssVariables = {
  // Brand colors
  '--hg-color-brand-primary': semantic.color.brand.primary,
  '--hg-color-brand-primary-hover': semantic.color.brand.primaryHover,
  '--hg-color-brand-primary-alt': semantic.color.brand.primaryAlt,

  // Text colors
  '--hg-color-text-primary': semantic.color.text.primary,
  '--hg-color-text-secondary': semantic.color.text.secondary,
  '--hg-color-text-tertiary': semantic.color.text.tertiary,
  '--hg-color-text-inverse': semantic.color.text.inverse,

  // Surface colors
  '--hg-color-surface-primary': semantic.color.surface.primary,
  '--hg-color-surface-secondary': semantic.color.surface.secondary,
  '--hg-color-surface-tertiary': semantic.color.surface.tertiary,
  '--hg-color-surface-accent': semantic.color.surface.accent,
  '--hg-color-surface-highlight': semantic.color.surface.highlight,

  // Border colors
  '--hg-color-border-primary': semantic.color.border.primary,
  '--hg-color-border-secondary': semantic.color.border.secondary,
  '--hg-color-border-focus': semantic.color.border.focus,

  // Interactive colors
  '--hg-color-interactive-primary': semantic.color.interactive.primary,
  '--hg-color-interactive-primary-hover': semantic.color.interactive.primaryHover,
  '--hg-color-interactive-secondary': semantic.color.interactive.secondary,

  // Typography
  '--hg-font-family-body': semantic.typography.fontFamily.body.join(', '),
  '--hg-font-family-heading': semantic.typography.fontFamily.heading.join(', '),
  '--hg-font-size-xs': semantic.typography.size.xs,
  '--hg-font-size-sm': semantic.typography.size.sm,
  '--hg-font-size-md': semantic.typography.size.md,
  '--hg-font-size-lg': semantic.typography.size.lg,
  '--hg-font-size-xl': semantic.typography.size.xl,
  '--hg-font-size-2xl': semantic.typography.size['2xl'],
  '--hg-font-size-3xl': semantic.typography.size['3xl'],
  '--hg-font-size-4xl': semantic.typography.size['4xl'],
  '--hg-font-size-4_5xl': semantic.typography.size['4.5xl'],
  '--hg-font-size-5xl': semantic.typography.size['5xl'],
  '--hg-font-weight-body': semantic.typography.weight.body,
  '--hg-font-weight-emphasis': semantic.typography.weight.emphasis,
  '--hg-font-weight-strong': semantic.typography.weight.strong,
  '--hg-font-weight-heading': semantic.typography.weight.heading,
  '--hg-font-weight-display': semantic.typography.weight.display,
  '--hg-line-height-tight': semantic.typography.lineHeight.tight,
  '--hg-line-height-body': semantic.typography.lineHeight.body,

  // Spacing (T-shirt sizing)
  '--hg-space-xs': semantic.space.xs,
  '--hg-space-sm': semantic.space.sm,
  '--hg-space-md': semantic.space.md,
  '--hg-space-lg': semantic.space.lg,
  '--hg-space-xl': semantic.space.xl,
  '--hg-space-2xl': semantic.space['2xl'],

  // Component spacing
  '--hg-spacing-section': semantic.spacing.section,
  '--hg-spacing-container': semantic.spacing.container,
  '--hg-spacing-card': semantic.spacing.card,

  // Radius
  '--hg-radius-sm': semantic.radius.sm,
  '--hg-radius-md': semantic.radius.md,
  '--hg-radius-lg': semantic.radius.lg,
  '--hg-radius-pill': semantic.radius.pill,

  // Shadows
  '--hg-shadow-subtle': semantic.shadow.subtle,
  '--hg-shadow-card': semantic.shadow.card,
  '--hg-shadow-prominent': semantic.shadow.prominent,

  // Animation
  '--hg-duration-fast': semantic.duration.fast,
  '--hg-duration-normal': semantic.duration.normal,

  // Legacy variables for backwards compatibility
  '--hg-yellow-primary': colors.primary.yellow,
  '--hg-yellow-dark': colors.primary.yellowDark,
  '--hg-gray-dark': colors.neutral.dark,
  '--hg-light-blue': colors.semantic.lightBlue,
  '--hg-section-padding': spacing.section.paddingY,
  '--hg-transition-normal': effects.transition.normal,
  '--hg-transform-hover': effects.transform.hover,
  '--hg-shadow-lg': effects.shadow.lg,
  '--hg-white': colors.neutral.white,
} as const;

// Legacy CSS variables (backwards compatibility)
export const legacyCssVariables = {
  ...colorVars,
  ...typographyVars,
  ...spacingVars,
  ...effectVars,
} as const;

// Helper function to generate CSS custom properties string
export const generateCSSVariables = (): string => {
  return Object.entries(cssVariables)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join('\n');
};

// Token metadata for documentation
export const tokenMetadata = {
  version: '2.0.0',
  description: 'Hunter Galloway Design System Tokens - Modern 3-tier structure',
  structure: {
    primitive: 'Raw values (colors, sizes, etc.) - foundation of the system',
    semantic: 'Role-based tokens referencing primitives - design decisions',
    component: 'Component-specific tokens referencing semantics - implementation',
  },
  categories: {
    colors: 'Brand colors, semantic colors, and component-specific color values',
    typography: 'Font families, sizes, weights, and text style combinations',
    spacing: 'Margins, padding, gaps, and layout dimensions (T-shirt sizing)',
    effects: 'Shadows, transitions, transforms, and visual effects',
  },
  usage: {
    modern: "import { semantic, component } from '@/tokens'; (recommended)",
    legacy: "import { colors, typography, spacing, effects } from '@/tokens';",
    css: "Use semantic CSS properties: var(--hg-color-brand-primary)",
    cssLegacy: "Legacy CSS properties: var(--hg-yellow-primary)",
  },
} as const;

// Modern tokens object (recommended)
export const tokens = {
  primitive,
  semantic,
  component,
} as const;

// Legacy tokens object (backwards compatibility)
export const legacyTokens = {
  colors,
  typography,
  spacing,
  effects,
  cssVariables: legacyCssVariables,
  generateCSSVariables,
  tokenMetadata,
} as const;

// Default export - modern structure
const modernTokens = {
  primitive,
  semantic,
  component,
  cssVariables,
  generateCSSVariables,
  tokenMetadata,
  // Include legacy for backwards compatibility
  legacy: legacyTokens,
} as const;

export default modernTokens;