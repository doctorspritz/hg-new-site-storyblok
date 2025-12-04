/**
 * Hunter Galloway Design System - Color Tokens
 * Centralized color palette extracted from existing components
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    yellow: '#FDB948',        // Hunter Galloway primary yellow
    yellowDark: '#E5A43F',    // Darker yellow for hover states
    yellowAlt: '#EC9B16',     // Alternative yellow used in trust indicators
  },

  // Neutral Colors
  neutral: {
    dark: '#262626',          // Primary dark text color
    text: '#444444',          // Secondary text color
    textLight: '#1e1e1e',     // Light text variant
    background: '#f8f9fa',    // Light gray background
    backgroundAlt: '#f4f4f4', // Alternative gray background
    border: '#e8e8e8',        // Border color
    white: '#ffffff',         // Pure white
    black: '#000000',         // Pure black
  },

  // Semantic Colors
  semantic: {
    lightBlue: '#f0f8ff',     // Light blue for cards
    cream: '#FFF5E2',         // Light cream background
    success: '#28a745',       // Green for checkmarks and success states
    warning: '#ffc107',       // Yellow for warnings
    error: '#dc3545',         // Red for errors
    info: '#17a2b8',          // Blue for information
  },

  // Component-Specific Colors
  component: {
    tooltipBg: '#333333',     // Dark background for tooltips
    tooltipText: '#ffffff',   // White text for tooltips
    badgeBg: 'rgba(253, 185, 72, 0.5)', // Semi-transparent badge background
    overlayBg: 'rgba(255, 255, 255, 0.95)', // White overlay with opacity
  },

  // Gradient Colors (if needed)
  gradient: {
    yellowLight: 'linear-gradient(135deg, #FDB948 0%, #E5A43F 100%)',
  },
} as const;

// Export individual color groups for easier imports
export const { primary, neutral, semantic, component, gradient } = colors;

// CSS Custom Properties for runtime usage
export const cssVariables = {
  '--hg-yellow-primary': colors.primary.yellow,
  '--hg-yellow-dark': colors.primary.yellowDark,
  '--hg-yellow-alt': colors.primary.yellowAlt,
  '--hg-gray-dark': colors.neutral.dark,
  '--hg-gray-text': colors.neutral.text,
  '--hg-gray-light': colors.semantic.cream,
  '--hg-background': colors.neutral.background,
  '--hg-background-alt': colors.neutral.backgroundAlt,
  '--hg-light-blue': colors.semantic.lightBlue,
  '--hg-white': colors.neutral.white,
  '--hg-success': colors.semantic.success,
  '--hg-tooltip-bg': colors.component.tooltipBg,
  '--hg-tooltip-text': colors.component.tooltipText,
} as const;

export default colors;