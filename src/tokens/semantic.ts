/**
 * Hunter Galloway Design System - Semantic Tokens
 * Tokens that reference primitive values and describe intended use
 * These represent design decisions about when to use which primitive tokens
 */

import { primitive } from './primitive';

export const semantic = {
  // Color roles (semantic meaning)
  color: {
    // Brand colors
    brand: {
      primary: primitive.color.yellow[400],
      primaryHover: primitive.color.yellow[500],
      primaryAlt: primitive.color.yellow[600],
      legacyAccent: primitive.color.yellow[450],
    },

    // Text colors by role
    text: {
      primary: primitive.color.gray[800],      // Main text
      secondary: primitive.color.gray[600],    // Secondary text  
      tertiary: primitive.color.gray[500],     // Muted text
      inverse: primitive.color.neutral.white,  // White text on dark bg
    },

    // Surface/background colors by role
    surface: {
      primary: primitive.color.neutral.white,     // Main background
      white: primitive.color.neutral.white,       // White surfaces
      secondary: primitive.color.gray[50],        // Light gray sections
      tertiary: primitive.color.gray[100],        // Card backgrounds
      accent: primitive.color.blue[50],           // Light blue cards
      highlight: primitive.color.peach[50],       // Peach highlight
      propertyMap: primitive.color.gray[150],     // WordPress PropertyMap background (#eeeeee)
      footer: primitive.color.gray[850],          // Footer dark background
      footerNav: '#333333',                        // Footer nav bar background
      footerBottom: '#1a1a1a',                     // Footer bottom background
    },

    // Border colors by role  
    border: {
      primary: primitive.color.gray[200],         // Default borders
      secondary: primitive.color.gray[300],       // Stronger borders
      focus: primitive.color.yellow[400],         // Focus rings
      subtleOnDark: 'rgba(255,255,255,0.1)',      // Footer separators
    },

    // Interactive state colors
    interactive: {
      primary: primitive.color.yellow[400],       // Primary buttons
      primaryHover: primitive.color.yellow[500],  // Button hover
      secondary: primitive.color.gray[50],        // Secondary buttons
      ghost: 'transparent',                       // Ghost buttons
      phoneLink: primitive.color.peach.light,    // WordPress phone link background
      phoneLinkHover: primitive.color.peach.dark, // WordPress phone link hover
    },

    // Status/feedback colors
    status: {
      success: primitive.color.semantic.success,
      warning: primitive.color.semantic.warning,
      error: primitive.color.semantic.error,
      info: primitive.color.semantic.info,
    },
  },

  // Typography roles
  typography: {
    // Font families by role
    fontFamily: {
      body: ['Open Sans', 'system-ui', 'sans-serif'],
      heading: ['Open Sans', 'system-ui', 'sans-serif'],
    },

    // Text styles by size role (T-shirt sizing)
    size: {
      xs: primitive.fontSize.xs,        // Captions, fine print
      sm: primitive.fontSize.sm,        // Small text, badges
      md: primitive.fontSize.base,      // Body text (default)
      lg: primitive.fontSize.lg,        // Large body text
      xl: primitive.fontSize.xl,        // Small headings
      '2xl': primitive.fontSize['2xl'], // Medium headings
      '3xl': primitive.fontSize['3xl'], // Large headings (30px)
      '4xl': primitive.fontSize['4xl'], // Display text (36px)
      '4.5xl': primitive.fontSize['4.5xl'], // WordPress "ultimate choice" (40px)
      '5xl': primitive.fontSize['5xl'], // Hero text (48px)
    },

    // Text styles by role
    weight: {
      body: primitive.fontWeight.normal,
      emphasis: primitive.fontWeight.medium,
      strong: primitive.fontWeight.semibold, 
      heading: primitive.fontWeight.bold,
      display: primitive.fontWeight.extrabold,
    },

    lineHeight: {
      tight: primitive.lineHeight.tight,    // Headings
      body: primitive.lineHeight.normal,    // Body text
      relaxed: primitive.lineHeight.relaxed, // Longer text
    },
  },

  // Spacing roles (T-shirt sizing)
  space: {
    xs: primitive.space[2],       // 8px - Small gaps
    sm: primitive.space[4],       // 16px - Medium gaps  
    md: primitive.space[6],       // 24px - Large gaps
    lg: primitive.space[8],       // 32px - Section spacing
    xl: primitive.space[12],      // 48px - Large sections
    '2xl': primitive.space[16],   // 64px - Hero spacing
  },

  // Component spacing roles
  spacing: {
    section: primitive.space[12],         // Section padding
    container: primitive.space[4],        // Container padding
    card: primitive.space[8],             // Card padding
    button: {
      x: primitive.space[6],              // Button horizontal padding
      y: primitive.space[3],              // Button vertical padding
    },
  },

  // Border radius by role
  radius: {
    sm: primitive.borderRadius.sm,        // Tooltips, small elements
    md: primitive.borderRadius.md,        // Cards, inputs
    lg: primitive.borderRadius.lg,        // Large cards
    dropdown: primitive.borderRadius.dropdown, // WordPress dropdowns
    pill: primitive.borderRadius.full,    // Buttons, badges
  },

  // Shadow by role
  shadow: {
    sm: primitive.shadow.sm,              // Small shadows
    md: primitive.shadow.md,              // Medium shadows
    lg: primitive.shadow.lg,              // Large shadows
    subtle: primitive.shadow.sm,          // Subtle elevation
    card: primitive.shadow.md,            // Card elevation
    prominent: primitive.shadow.lg,       // Prominent elevation
    dropdown: primitive.shadow.dropdown,  // WordPress dropdowns
    header: '0px 6px 12px rgba(43,43,43,.06)',
    headerFixed: '0px 6px 18px rgba(43,43,43,.12)'
  },

  // Animation timing by role
  duration: {
    fast: primitive.duration.fast,        // Micro-interactions
    normal: primitive.duration.normal,    // Standard transitions
    slow: primitive.duration.slow,        // Complex animations
  },

  // Responsive breakpoints by role
  breakpoint: {
    mobile: '480px',                      // Small mobile devices
    tablet: '768px',                      // Tablets and small desktops
    desktop: '1024px',                    // Desktop and larger
  },
} as const;

export default semantic;