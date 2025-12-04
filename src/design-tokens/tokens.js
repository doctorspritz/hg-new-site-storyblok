/**
 * Hunter Galloway Design System Tokens
 * 
 * Comprehensive design tokens extracted from huntergalloway.com.au
 * These tokens define the visual foundation of the brand.
 */

export const designTokens = {
  // === COLORS ===
  colors: {
    // Primary Brand Colors
    brand: {
      primary: '#FDB948',      // Hunter Galloway Yellow
      primaryHover: '#F5B83D',  // Slightly darker yellow for hover states
      primaryLight: '#FFF5E2',  // Light yellow background
      secondary: '#318EC3',     // Blue accent for links/secondary actions
      secondaryHover: '#287CAA', // Darker blue for hover
    },

    // Neutral Colors
    neutral: {
      black: '#000000',
      gray900: '#1A1A1A',      // Darkest gray for headings
      gray800: '#262626',      // Dark gray for primary text
      gray700: '#404040',      // Medium-dark gray
      gray600: '#666666',      // Medium gray for secondary text
      gray500: '#808080',      // Mid-tone gray
      gray400: '#AAAAAA',      // Light-medium gray
      gray300: '#CCCCCC',      // Light gray
      gray200: '#E2E2E2',      // Very light gray
      gray100: '#F4F4F4',      // Off-white background
      gray50: '#FAFAFA',       // Almost white
      white: '#FFFFFF',
    },

    // Semantic Colors
    semantic: {
      success: '#28A745',
      successLight: '#D4EDDA',
      warning: '#FFC107',
      warningLight: '#FFF3CD',
      error: '#DC3545',
      errorLight: '#F8D7DA',
      info: '#17A2B8',
      infoLight: '#D1ECF1',
    },

    // Interactive States
    interactive: {
      link: '#318EC3',
      linkHover: '#287CAA',
      linkVisited: '#6C757D',
      focus: '#FDB948',
      disabled: '#CCCCCC',
    }
  },

  // === TYPOGRAPHY ===
  typography: {
    // Font Families
    fontFamily: {
      primary: ['"Gotham Pro"', '"Open Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      secondary: ['"Open Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      mono: ['Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
    },

    // Font Weights
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },

    // Font Sizes & Line Heights
    fontSize: {
      xs: { size: '0.75rem', lineHeight: '1rem' },     // 12px
      sm: { size: '0.875rem', lineHeight: '1.25rem' }, // 14px
      base: { size: '1rem', lineHeight: '1.5rem' },    // 16px
      lg: { size: '1.125rem', lineHeight: '1.75rem' }, // 18px
      xl: { size: '1.25rem', lineHeight: '1.75rem' },  // 20px
      '2xl': { size: '1.5rem', lineHeight: '2rem' },   // 24px
      '3xl': { size: '1.875rem', lineHeight: '2.25rem' }, // 30px
      '4xl': { size: '2.25rem', lineHeight: '2.5rem' },   // 36px
      '5xl': { size: '3rem', lineHeight: '3rem' },        // 48px
      '6xl': { size: '3.75rem', lineHeight: '3.75rem' },  // 60px
    },

    // Typography Scale for Headings
    heading: {
      h1: { 
        size: '2.5rem',      // 40px
        lineHeight: '3rem',  // 48px
        weight: 700,
        letterSpacing: '-0.025em'
      },
      h2: { 
        size: '2rem',        // 32px
        lineHeight: '2.5rem', // 40px
        weight: 700,
        letterSpacing: '-0.025em'
      },
      h3: { 
        size: '1.5rem',      // 24px
        lineHeight: '2rem',  // 32px
        weight: 600,
        letterSpacing: '-0.025em'
      },
      h4: { 
        size: '1.25rem',     // 20px
        lineHeight: '1.75rem', // 28px
        weight: 600,
        letterSpacing: '-0.025em'
      },
      h5: { 
        size: '1.125rem',    // 18px
        lineHeight: '1.5rem', // 24px
        weight: 600,
        letterSpacing: '-0.025em'
      },
      h6: { 
        size: '1rem',        // 16px
        lineHeight: '1.5rem', // 24px
        weight: 600,
        letterSpacing: '-0.025em'
      },
    }
  },

  // === SPACING ===
  spacing: {
    // Base spacing scale (rem)
    0: '0',
    1: '0.25rem',    // 4px
    2: '0.5rem',     // 8px
    3: '0.75rem',    // 12px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    8: '2rem',       // 32px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
    32: '8rem',      // 128px

    // Semantic spacing
    section: {
      xs: '2rem',      // 32px
      sm: '3rem',      // 48px
      md: '4.375rem',  // 70px - Hunter Galloway standard
      lg: '6rem',      // 96px
      xl: '8rem',      // 128px
    },

    component: {
      xs: '0.5rem',    // 8px
      sm: '1rem',      // 16px
      md: '1.5rem',    // 24px
      lg: '2rem',      // 32px
      xl: '3rem',      // 48px
    }
  },

  // === BORDER RADIUS ===
  borderRadius: {
    none: '0',
    xs: '0.125rem',   // 2px
    sm: '0.25rem',    // 4px
    base: '0.375rem', // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    pill: '50rem',    // 800px - effectively full rounding
    full: '9999px',   // Tailwind's full rounding
  },

  // === SHADOWS ===
  boxShadow: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 4px 8px -2px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    
    // Hunter Galloway specific shadows
    hg: {
      subtle: '0 6px 12px rgba(43, 43, 43, 0.15)',
      card: '0 4px 12px rgba(0, 0, 0, 0.1)',
      button: '0 2px 8px rgba(253, 185, 72, 0.3)',
      focus: '0 0 0 3px rgba(253, 185, 72, 0.3)',
    }
  },

  // === TRANSITIONS & ANIMATIONS ===
  animation: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    timing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
    // Hunter Galloway specific transitions
    hg: {
      button: 'all 200ms ease-in-out',
      hover: 'transform 200ms ease-in-out',
      fade: 'opacity 300ms ease-in-out',
    }
  },

  // === BREAKPOINTS ===
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    
    // Hunter Galloway specific breakpoints
    hg: {
      mobile: '992px',
      tablet: '1200px',
      desktop: '1500px',
    }
  },

  // === Z-INDEX ===
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
    toast: 1070,
  },

  // === COMPONENT TOKENS ===
  components: {
    // Button variants
    button: {
      primary: {
        bg: '#FDB948',
        bgHover: '#F5B83D',
        text: '#000000',
        border: 'transparent',
        borderRadius: '50rem',
        padding: '0.75rem 2rem',
        fontSize: '1rem',
        fontWeight: 700,
        shadow: '0 2px 8px rgba(253, 185, 72, 0.3)',
      },
      secondary: {
        bg: '#318EC3',
        bgHover: '#287CAA',
        text: '#FFFFFF',
        border: 'transparent',
        borderRadius: '50rem',
        padding: '0.75rem 2rem',
        fontSize: '1rem',
        fontWeight: 700,
        shadow: '0 2px 8px rgba(49, 142, 195, 0.3)',
      },
      outline: {
        bg: 'transparent',
        bgHover: '#FDB948',
        text: '#FDB948',
        textHover: '#000000',
        border: '#FDB948',
        borderRadius: '50rem',
        padding: '0.75rem 2rem',
        fontSize: '1rem',
        fontWeight: 700,
      }
    },

    // Form elements
    form: {
      input: {
        bg: '#FFFFFF',
        border: '#E2E2E2',
        borderFocus: '#FDB948',
        borderRadius: '0.5rem',
        padding: '0.75rem 1rem',
        fontSize: '1rem',
        shadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
      }
    },

    // Cards
    card: {
      bg: '#FFFFFF',
      border: '#E2E2E2',
      borderRadius: '1rem',
      padding: '1.5rem',
      shadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    }
  }
};

export default designTokens;