/**
 * Hunter Galloway Design System - Typography Tokens
 * Font families, sizes, weights, and line heights
 */

export const typography = {
  // Font Families
  fontFamily: {
    primary: ['Open Sans', 'system-ui', 'sans-serif'],
    fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
  },

  // Font Sizes (extracted from existing components)
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px - Used in tooltips, badges
    base: '1rem',       // 16px - Base body text
    lg: '1.125rem',     // 18px - Used in descriptions
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px - Used in card titles
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px - Used in stat numbers
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },

  // Font Weights
  fontWeight: {
    normal: '400',
    medium: '500',      // Used in list items
    semibold: '600',    // Used in buttons
    bold: '700',        // Used in headings
    extrabold: '800',   // Used in stat numbers
  },

  // Line Heights
  lineHeight: {
    tight: '1.25',      // 1.25
    snug: '1.375',      // 1.375
    normal: '1.5',      // 1.5 - Used in descriptions
    relaxed: '1.625',   // 1.625
    loose: '2',         // 2 - Used in some descriptions (32px)
  },

  // Letter Spacing
  letterSpacing: {
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
  },

  // Text Styles (commonly used combinations)
  textStyles: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: '700',
      lineHeight: '1.25',
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: '700',
      lineHeight: '1.25',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: '700',
      lineHeight: '1.375',
    },
    bodyLarge: {
      fontSize: '1.125rem',
      fontWeight: '400',
      lineHeight: '1.5',
    },
    body: {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5',
    },
    bodySmall: {
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '1.5',
    },
    button: {
      fontSize: '1rem',
      fontWeight: '600',
      lineHeight: '1.25',
    },
    statNumber: {
      fontSize: '3rem',
      fontWeight: '800',
      lineHeight: '1',
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      lineHeight: '1.375',
    },
    tooltip: {
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '1.4',
    },
  },
} as const;

// Export individual typography groups
export const { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, textStyles } = typography;

// CSS Custom Properties for typography
export const cssVariables = {
  '--hg-font-family': fontFamily.primary.join(', '),
  '--hg-font-size-base': fontSize.base,
  '--hg-font-weight-normal': fontWeight.normal,
  '--hg-font-weight-medium': fontWeight.medium,
  '--hg-font-weight-semibold': fontWeight.semibold,
  '--hg-font-weight-bold': fontWeight.bold,
  '--hg-font-weight-extrabold': fontWeight.extrabold,
  '--hg-line-height-normal': lineHeight.normal,
  '--hg-line-height-tight': lineHeight.tight,
} as const;

export default typography;