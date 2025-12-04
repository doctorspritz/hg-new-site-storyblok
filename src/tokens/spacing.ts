/**
 * Hunter Galloway Design System - Spacing Tokens
 * Margins, padding, gaps, and layout dimensions
 */

export const spacing = {
  // Base Spacing Scale (rem units for consistency)
  scale: {
    0: '0',
    1: '0.25rem',      // 4px
    2: '0.5rem',       // 8px
    3: '0.75rem',      // 12px
    4: '1rem',         // 16px
    5: '1.25rem',      // 20px
    6: '1.5rem',       // 24px
    7: '1.75rem',      // 28px
    8: '2rem',         // 32px
    10: '2.5rem',      // 40px
    12: '3rem',        // 48px
    16: '4rem',        // 64px
    20: '5rem',        // 80px
    24: '6rem',        // 96px
  },

  // Section Spacing (extracted from existing components)
  section: {
    paddingY: '50px',          // Standard section vertical padding
    paddingYSmall: '25px',     // Awards section padding
    paddingYHero: '12px',      // Hero section top padding
    marginBottom: '3rem',      // Standard heading bottom margin
  },

  // Component Spacing
  component: {
    cardPadding: '2rem',       // Standard card padding
    cardPaddingSmall: '1.5rem', // Smaller card padding
    cardGap: '2rem',           // Gap between cards
    buttonPadding: '14px 28px', // Button padding
    buttonPaddingSmall: '12px 24px', // Small button padding
    tooltipPadding: '12px',    // Tooltip padding
    badgePadding: '0.5rem 1rem', // Badge padding
  },

  // Layout Dimensions
  layout: {
    containerMaxWidth: '1272px',  // Main container max-width
    containerPadding: '1rem',     // Container horizontal padding
    cardMaxWidth: '250px',        // Max width for stat cards
    cardMinWidth: '200px',        // Min width for stat cards
  },

  // Gaps and Spacing
  gap: {
    xs: '0.5rem',      // 8px
    sm: '1rem',        // 16px
    md: '1.5rem',      // 24px
    lg: '2rem',        // 32px
    xl: '3rem',        // 48px
    '2xl': '4rem',     // 64px
  },

  // Responsive Breakpoint Spacing
  responsive: {
    mobile: {
      sectionPadding: '25px 0',
      cardPadding: '1.5rem 1rem',
      gap: '1rem',
    },
    tablet: {
      sectionPadding: '40px 0',
      cardPadding: '2rem 1.5rem',
      gap: '1.5rem',
    },
    desktop: {
      sectionPadding: '50px 0',
      cardPadding: '2rem',
      gap: '2rem',
    },
  },

  // Border Radius (often used with spacing)
  borderRadius: {
    none: '0',
    sm: '4px',         // Small radius - tooltips
    md: '12px',        // Medium radius - cards, sections
    lg: '24px',        // Large radius - some cards
    full: '9999px',    // Full radius - badges, buttons
    pill: '25px',      // Pill shape - buttons
  },
} as const;

// Export individual spacing groups
export const { scale, section, component, layout, gap, responsive, borderRadius } = spacing;

// CSS Custom Properties for spacing
export const cssVariables = {
  '--hg-section-padding': section.paddingY,
  '--hg-container-max-width': layout.containerMaxWidth,
  '--hg-card-padding': component.cardPadding,
  '--hg-card-gap': component.cardGap,
  '--hg-border-radius-sm': borderRadius.sm,
  '--hg-border-radius-md': borderRadius.md,
  '--hg-border-radius-lg': borderRadius.lg,
  '--hg-border-radius-pill': borderRadius.pill,
  '--hg-gap-sm': gap.sm,
  '--hg-gap-md': gap.md,
  '--hg-gap-lg': gap.lg,
  '--hg-gap-xl': gap.xl,
} as const;

export default spacing;