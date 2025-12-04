/**
 * Hunter Galloway Tailwind Configuration
 * Updated to use the comprehensive design system tokens
 */

const { designTokens } = require('./src/design-tokens/tokens.js');

module.exports = {
  content: ['./src/**/*.{astro,mdx,jsx,tsx,html}'],
  theme: {
    extend: {
      // === COLORS ===
      colors: {
        // Brand colors
        brand: designTokens.colors.brand,
        
        // Extended neutral palette
        gray: designTokens.colors.neutral,
        
        // Semantic colors
        success: designTokens.colors.semantic.success,
        'success-light': designTokens.colors.semantic.successLight,
        warning: designTokens.colors.semantic.warning,
        'warning-light': designTokens.colors.semantic.warningLight,
        error: designTokens.colors.semantic.error,
        'error-light': designTokens.colors.semantic.errorLight,
        info: designTokens.colors.semantic.info,
        'info-light': designTokens.colors.semantic.infoLight,

        // Legacy colors for backward compatibility
        primary: designTokens.colors.neutral.gray800,
        accent: designTokens.colors.brand.primary,
        accent2: designTokens.colors.brand.secondary,
        neutral: designTokens.colors.neutral.gray100,
        border: designTokens.colors.neutral.gray200,
        yellow: designTokens.colors.brand.primary,
      },

      // === TYPOGRAPHY ===
      fontFamily: {
        sans: designTokens.typography.fontFamily.primary,
        secondary: designTokens.typography.fontFamily.secondary,
        mono: designTokens.typography.fontFamily.mono,
      },

      fontWeight: designTokens.typography.fontWeight,

      fontSize: {
        xs: [designTokens.typography.fontSize.xs.size, designTokens.typography.fontSize.xs.lineHeight],
        sm: [designTokens.typography.fontSize.sm.size, designTokens.typography.fontSize.sm.lineHeight],
        base: [designTokens.typography.fontSize.base.size, designTokens.typography.fontSize.base.lineHeight],
        lg: [designTokens.typography.fontSize.lg.size, designTokens.typography.fontSize.lg.lineHeight],
        xl: [designTokens.typography.fontSize.xl.size, designTokens.typography.fontSize.xl.lineHeight],
        '2xl': [designTokens.typography.fontSize['2xl'].size, designTokens.typography.fontSize['2xl'].lineHeight],
        '3xl': [designTokens.typography.fontSize['3xl'].size, designTokens.typography.fontSize['3xl'].lineHeight],
        '4xl': [designTokens.typography.fontSize['4xl'].size, designTokens.typography.fontSize['4xl'].lineHeight],
        '5xl': [designTokens.typography.fontSize['5xl'].size, designTokens.typography.fontSize['5xl'].lineHeight],
        '6xl': [designTokens.typography.fontSize['6xl'].size, designTokens.typography.fontSize['6xl'].lineHeight],
        
        // Heading-specific sizes
        'h1': [designTokens.typography.heading.h1.size, designTokens.typography.heading.h1.lineHeight],
        'h2': [designTokens.typography.heading.h2.size, designTokens.typography.heading.h2.lineHeight],
        'h3': [designTokens.typography.heading.h3.size, designTokens.typography.heading.h3.lineHeight],
        'h4': [designTokens.typography.heading.h4.size, designTokens.typography.heading.h4.lineHeight],
        'h5': [designTokens.typography.heading.h5.size, designTokens.typography.heading.h5.lineHeight],
        'h6': [designTokens.typography.heading.h6.size, designTokens.typography.heading.h6.lineHeight],
      },

      // === SPACING ===
      spacing: {
        ...designTokens.spacing,
        // Legacy spacing for backward compatibility
        section: designTokens.spacing.section.md,
      },

      // === BORDER RADIUS ===
      borderRadius: {
        ...designTokens.borderRadius,
        // Legacy radius for backward compatibility
        pill: designTokens.borderRadius.pill,
      },

      // === SHADOWS ===
      boxShadow: {
        ...designTokens.boxShadow,
        // Hunter Galloway specific shadows
        'hg-subtle': designTokens.boxShadow.hg.subtle,
        'hg-card': designTokens.boxShadow.hg.card,
        'hg-button': designTokens.boxShadow.hg.button,
        'hg-focus': designTokens.boxShadow.hg.focus,
      },

      // === ANIMATIONS ===
      transitionDuration: designTokens.animation.duration,
      transitionTimingFunction: designTokens.animation.timing,

      // === BREAKPOINTS ===
      screens: {
        xs: designTokens.breakpoints.xs,
        sm: designTokens.breakpoints.sm,
        md: designTokens.breakpoints.md,
        lg: designTokens.breakpoints.lg,
        xl: designTokens.breakpoints.xl,
        '2xl': designTokens.breakpoints['2xl'],
        
        // Hunter Galloway specific breakpoints
        'hg-mobile': designTokens.breakpoints.hg.mobile,
        'hg-tablet': designTokens.breakpoints.hg.tablet,
        'hg-desktop': designTokens.breakpoints.hg.desktop,
      },

      // === Z-INDEX ===
      zIndex: designTokens.zIndex,

      // === CUSTOM PROPERTIES ===
      // Add any custom utilities here
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    
    // Custom plugin for Hunter Galloway components
    function({ addComponents, theme }) {
      addComponents({
        // Button Components
        '.btn-hg-primary': {
          backgroundColor: theme('colors.brand.primary'),
          color: theme('colors.gray.black'),
          fontWeight: theme('fontWeight.bold'),
          padding: `${theme('spacing.3')} ${theme('spacing.8')}`,
          borderRadius: theme('borderRadius.pill'),
          boxShadow: theme('boxShadow.hg-button'),
          transition: theme('transitionDuration.base'),
          '&:hover': {
            backgroundColor: theme('colors.brand.primaryHover'),
            transform: 'translateY(-2px)',
            boxShadow: theme('boxShadow.lg'),
          },
          '&:focus': {
            outline: 'none',
            boxShadow: theme('boxShadow.hg-focus'),
          },
        },
        
        '.btn-hg-secondary': {
          backgroundColor: theme('colors.brand.secondary'),
          color: theme('colors.gray.white'),
          fontWeight: theme('fontWeight.bold'),
          padding: `${theme('spacing.3')} ${theme('spacing.8')}`,
          borderRadius: theme('borderRadius.pill'),
          boxShadow: theme('boxShadow.hg-button'),
          transition: theme('transitionDuration.base'),
          '&:hover': {
            backgroundColor: theme('colors.brand.secondaryHover'),
            transform: 'translateY(-2px)',
            boxShadow: theme('boxShadow.lg'),
          },
          '&:focus': {
            outline: 'none',
            boxShadow: theme('boxShadow.hg-focus'),
          },
        },

        // Card Components
        '.card-hg': {
          backgroundColor: theme('colors.gray.white'),
          border: `1px solid ${theme('colors.gray.200')}`,
          borderRadius: theme('borderRadius.xl'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.hg-card'),
          transition: theme('transitionDuration.base'),
          '&:hover': {
            boxShadow: theme('boxShadow.lg'),
            transform: 'translateY(-2px)',
          },
        },

        // Form Components
        '.input-hg': {
          backgroundColor: theme('colors.gray.white'),
          border: `1px solid ${theme('colors.gray.200')}`,
          borderRadius: theme('borderRadius.md'),
          padding: `${theme('spacing.3')} ${theme('spacing.4')}`,
          fontSize: theme('fontSize.base[0]'),
          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
          transition: theme('transitionDuration.base'),
          '&:focus': {
            outline: 'none',
            borderColor: theme('colors.brand.primary'),
            boxShadow: theme('boxShadow.hg-focus'),
          },
        },

        // Typography Components
        '.heading-hg-1': {
          fontSize: theme('fontSize.h1[0]'),
          lineHeight: theme('fontSize.h1[1]'),
          fontWeight: theme('fontWeight.bold'),
          letterSpacing: '-0.025em',
          color: theme('colors.gray.900'),
        },
        
        '.heading-hg-2': {
          fontSize: theme('fontSize.h2[0]'),
          lineHeight: theme('fontSize.h2[1]'),
          fontWeight: theme('fontWeight.bold'),
          letterSpacing: '-0.025em',
          color: theme('colors.gray.900'),
        },
        
        '.heading-hg-3': {
          fontSize: theme('fontSize.h3[0]'),
          lineHeight: theme('fontSize.h3[1]'),
          fontWeight: theme('fontWeight.semibold'),
          letterSpacing: '-0.025em',
          color: theme('colors.gray.900'),
        },

        // Section spacing
        '.section-hg': {
          paddingTop: theme('spacing.section.md'),
          paddingBottom: theme('spacing.section.md'),
        },
      });
    },
  ],
};