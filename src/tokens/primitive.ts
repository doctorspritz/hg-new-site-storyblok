/**
 * Hunter Galloway Design System - Primitive Tokens
 * Raw values that form the foundation of the design system
 * These tokens should never be used directly in components
 */

export const primitive = {
  // Color palette (raw values)
  color: {
    yellow: {
      400: '#FDB948',
      500: '#E5A43F', 
      600: '#EC9B16',
      450: '#F9A825',
    },
    gray: {
      25: '#FAFAFA',
      50: '#f8f9fa',
      100: '#f4f4f4',
      150: '#eeeeee',  // WordPress PropertyMap background - exact match
      200: '#e8e8e8',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      850: '#262626',
      900: '#111827',
      950: '#0b0f14',
    },
    neutral: {
      white: '#ffffff',
      black: '#000000',
    },
    blue: {
      50: '#f0f8ff',
      100: '#e1f5fe',
      200: '#b3e5fc',
    },
    peach: {
      50: '#fdf5e4',
      100: '#fff3e0',
      light: '#fff5e2',    // WordPress phone link background
      dark: '#ffc65b',     // WordPress phone link hover
    },
    semantic: {
      success: '#28a745',
      warning: '#ffc107', 
      error: '#dc3545',
      info: '#17a2b8',
    },
  },

  // Typography scale (raw values)
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '4.5xl': '2.5rem',  // 40px - WordPress "ultimate choice" heading
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  lineHeight: {
    tight: '1.25',
    snug: '1.375', 
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Spacing scale (raw values)
  space: {
    0: '0',
    1: '0.25rem',      // 4px
    2: '0.5rem',       // 8px
    3: '0.75rem',      // 12px
    4: '1rem',         // 16px
    5: '1.25rem',      // 20px
    6: '1.5rem',       // 24px
    8: '2rem',         // 32px
    10: '2.5rem',      // 40px
    12: '3rem',        // 48px
    16: '4rem',        // 64px
    20: '5rem',        // 80px
  },

  // Border radius scale
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '12px',
    lg: '24px',
    dropdown: '8px',
    full: '9999px',
  },

  // Shadow scale
  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 8px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 30px rgba(0, 0, 0, 0.15)',
    dropdown: '0px 2px 10px rgba(0, 0, 0, 0.15)',
  },

  // Timing values
  duration: {
    fast: '150ms',
    normal: '300ms', 
    slow: '500ms',
  },
} as const;

export default primitive;