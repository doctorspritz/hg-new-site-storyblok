/**
 * Typography Component Types
 * Hunter Galloway Design System - Atomic Component
 * 
 * Type definitions that ensure consistency and type safety
 * across the typography system.
 */

export interface TypographyProps {
  /** HTML element to render - semantic HTML for accessibility */
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label' | 'legend';
  
  /** Font size using design system scale */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '4.5xl' | '5xl';
  
  /** Text color using semantic color tokens */
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse';
  
  /** Text alignment for layout control */
  align?: 'left' | 'center' | 'right' | 'justify';
  
  /** Font weight using design system weights */
  weight?: 'body' | 'emphasis' | 'strong' | 'heading' | 'bold' | 'display';
  
  /** Whether text should not wrap */
  noWrap?: boolean;
  
  /** Additional CSS classes for composition */
  class?: string;
}

/**
 * Typography variant styles for design system documentation
 * These represent the computed styles for each variant
 */
export interface TypographyVariantStyles {
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing?: string;
}

/**
 * Typography component variants for Storybook and testing
 */
export type TypographyVariant = {
  [K in TypographyProps['size']]: {
    [W in TypographyProps['weight']]: TypographyVariantStyles;
  };
};

/**
 * Typography color variants for design system documentation
 */
export type TypographyColorVariant = {
  [K in NonNullable<TypographyProps['color']>]: {
    hex: string;
    contrast: string;
    usage: string;
  };
};