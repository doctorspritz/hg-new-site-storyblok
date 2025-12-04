/**
 * Hunter Galloway Design System - Effects Tokens
 * Shadows, transitions, transforms, and visual effects
 */

export const effects = {
  // Box Shadows (extracted from existing components)
  shadow: {
    none: 'none',
    sm: '0 2px 4px rgba(0, 0, 0, 0.05)',
    md: '0 4px 20px rgba(0, 0, 0, 0.1)',      // Standard card shadow
    lg: '0 8px 30px rgba(0, 0, 0, 0.15)',     // Hover card shadow
    xl: '0 12px 40px rgba(0, 0, 0, 0.2)',
    tooltip: '0 4px 12px rgba(0, 0, 0, 0.15)', // Tooltip shadow
  },

  // Transitions (commonly used durations and easings)
  transition: {
    // Durations
    fast: '0.15s',
    normal: '0.3s',      // Most common transition duration
    slow: '0.5s',

    // Easing Functions
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    ease: 'ease',        // Default ease function

    // Common Transition Combinations
    all: 'all 0.3s ease',
    transform: 'transform 0.3s ease',
    opacity: 'opacity 0.3s ease',
    colors: 'background-color 0.3s ease, color 0.3s ease',
    shadow: 'box-shadow 0.3s ease',
  },

  // Transforms (commonly used transform values)
  transform: {
    // Translate
    translateYUp: 'translateY(-4px)',     // Hover effect for cards
    translateYDown: 'translateY(4px)',
    translateXLeft: 'translateX(-50%)',   // Centering tooltips
    translateXRight: 'translateX(50%)',

    // Scale
    scaleUp: 'scale(1.05)',
    scaleDown: 'scale(0.95)',
    scaleNone: 'scale(1)',

    // Rotate
    rotate45: 'rotate(45deg)',
    rotate90: 'rotate(90deg)',
    rotate180: 'rotate(180deg)',

    // Combined transforms for common use cases
    hoverLift: 'translateY(-4px)',        // Card hover effect
    centerTooltip: 'translateX(-50%)',    // Center tooltip horizontally
  },

  // Opacity Values
  opacity: {
    hidden: '0',
    low: '0.25',
    medium: '0.5',
    high: '0.75',
    visible: '1',
    overlay: '0.95',     // Used in card overlays
  },

  // Z-Index Scale
  zIndex: {
    hide: '-1',
    base: '0',
    low: '1',           // Card images
    medium: '10',       // Card content
    high: '100',        // Dropdowns, modals
    tooltip: '1000',    // Tooltips
    modal: '9999',      // Modals, overlays
  },

  // Backdrop Filters
  backdrop: {
    blur: 'blur(10px)',        // Used in card content overlays
    blurSm: 'blur(4px)',
    blurLg: 'blur(20px)',
  },

  // Common Effect Combinations
  combinations: {
    cardHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    tooltipShow: {
      opacity: '1',
      transform: 'translateX(-50%)',
      transition: 'opacity 0.3s ease',
    },
    fadeIn: {
      opacity: '1',
      transition: 'opacity 0.3s ease',
    },
    fadeOut: {
      opacity: '0',
      transition: 'opacity 0.3s ease',
    },
  },
} as const;

// Export individual effect groups
export const { shadow, transition, transform, opacity, zIndex, backdrop, combinations } = effects;

// CSS Custom Properties for effects
export const cssVariables = {
  '--hg-shadow-sm': shadow.sm,
  '--hg-shadow-md': shadow.md,
  '--hg-shadow-lg': shadow.lg,
  '--hg-shadow-tooltip': shadow.tooltip,
  '--hg-transition-normal': transition.normal,
  '--hg-transition-all': transition.all,
  '--hg-transform-hover': transform.hoverLift,
  '--hg-opacity-overlay': opacity.overlay,
  '--hg-z-tooltip': zIndex.tooltip,
  '--hg-backdrop-blur': backdrop.blur,
} as const;

export default effects;