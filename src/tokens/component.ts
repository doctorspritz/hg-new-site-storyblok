/**
 * Hunter Galloway Design System - Component Tokens
 * Tokens specific to individual components
 * These reference semantic tokens and tie them to specific component properties
 */

import { semantic } from './semantic';
import { primitive } from './primitive';

export const component = {
  // Button component tokens
  button: {
    // Primary button variant
    primary: {
      background: semantic.color.interactive.primary,
      backgroundHover: semantic.color.interactive.primaryHover,
      text: semantic.color.text.primary,
      borderRadius: semantic.radius.pill,
      paddingX: semantic.spacing.button.x,
      paddingY: semantic.spacing.button.y,
      fontSize: semantic.typography.size.md,
      fontWeight: semantic.typography.weight.strong,
      transition: semantic.duration.normal,
    },

    // Secondary button variant
    secondary: {
      background: semantic.color.interactive.secondary,
      backgroundHover: semantic.color.surface.tertiary,
      text: semantic.color.text.primary,
      borderRadius: semantic.radius.pill,
      paddingX: semantic.spacing.button.x,
      paddingY: semantic.spacing.button.y,
      fontSize: semantic.typography.size.md,
      fontWeight: semantic.typography.weight.strong,
      transition: semantic.duration.normal,
    },

    // Ghost button variant
    ghost: {
      background: semantic.color.interactive.ghost,
      backgroundHover: semantic.color.surface.secondary,
      text: semantic.color.brand.primary,
      borderRadius: semantic.radius.pill,
      paddingX: semantic.spacing.button.x,
      paddingY: semantic.spacing.button.y,
      fontSize: semantic.typography.size.md,
      fontWeight: semantic.typography.weight.strong,
      transition: semantic.duration.normal,
    },

    // Outline button variant
    outline: {
      background: semantic.color.interactive.ghost,
      backgroundHover: semantic.color.surface.secondary,
      text: semantic.color.brand.primary,
      border: semantic.color.brand.primary,
      borderRadius: semantic.radius.pill,
      paddingX: semantic.spacing.button.x,
      paddingY: semantic.spacing.button.y,
      fontSize: semantic.typography.size.md,
      fontWeight: semantic.typography.weight.strong,
      transition: semantic.duration.normal,
    },
  },

  // HeroWidget component tokens
  heroWidget: {
    content: {
      maxWidth: '680px',
      titleFontSize: semantic.typography.size['5xl'],
      titleLineHeight: semantic.typography.lineHeight.tight,
      titleWeight: semantic.typography.weight.display,
    },
    media: {
      maxWidth: '500px',
    },
    checkmark: {
      size: '24px',
      marginTop: '2px',
    },
    tooltip: {
      width: '300px',
      fontSize: semantic.typography.size.sm,
    },
    breakpoint: {
      tablet: semantic.breakpoint.tablet,
    },
    title: {
      fontSize: semantic.typography.size['5xl'],
      lineHeight: semantic.typography.lineHeight.tight,
      weight: primitive.fontWeight.extrabold,
      color: semantic.color.text.primary,
    },
    // Live site exact values
    layout: {
      containerMaxWidth: '1272px',
      contentMaxWidth: '680px',
      checkmarkContainerMaxWidth: '688px',
      mediaMaxWidth: '1240px',
      mediaWidth: '560px',
      minHeight: '500px',
    },
    spacing: {
      paddingX: '5rem', // px-80
      paddingTop: '0.75rem', // pt-3
      paddingBottom: '3rem', // pb-12
      paddingBottomSmall: '0.5rem', // pb-2
      paddingBottomMedium: '0.625rem', // pb-2.5
      paddingTopLarge: '2.5rem', // pt-10
      paddingRight: '0.5rem', // pr-2
      paddingContainer: '1rem', // px-4
      paddingPixel: '1px', // p-px
      // Live site exact padding values
      paddingExact: '12px 0 50px 0',
      paddingContainerExact: '0 16px',
      paddingBottomTitle: '10px',
      paddingBottomBenefits: '8px',
      paddingTopFeatures: '40px',
      paddingMobile: '12px 32px 50px 32px',
    },
    gaps: {
      small: '0.5rem', // gap-2
      medium: '1.25rem', // gap-5
      large: '1.5rem', // gap-6
      extraLarge: '4rem', // gap-16
      // Live site exact gap values
      gapExact: '64px',
      gapSmallExact: '8px',
      gapMediumExact: '20px',
      gapMobile: '32px',
    },
    dimensions: {
      checkmark: {
        width: '1.5rem', // w-6
        height: '1.5rem', // h-6
        innerWidth: '1.25rem', // w-5
        innerHeight: '1.25rem', // h-5
        checkWidth: '0.625rem', // w-2.5
        checkHeight: '0.5rem', // h-2
        leftOffset: '2px',
        topOffset: '2px',
        checkLeftOffset: '7px',
        checkTopOffset: '8px',
        // Live site exact values
        widthExact: '24px',
        heightExact: '24px',
        innerWidthExact: '20px',
        innerHeightExact: '20px',
      },
      button: {
        width: '24rem', // w-96
        minHeight: '3rem', // min-h-12
        borderRadius: '33px',
        // Live site exact values
        widthExact: '384px',
        minHeightExact: '48px',
        paddingHorizontal: '32px',
      },
      experience: {
        width: '3.5rem', // w-14
        height: '3.5rem', // h-14
        fontSize: '1.875rem', // text-3xl
        lineHeight: '52px',
        borderRadius: '27px',
        outlineWidth: '1px',
        outlineOffset: '-1px',
        // Live site exact values
        widthExact: '54px',
        heightExact: '54px',
      },
      logo: {
        width: '7rem', // w-28
        height: '2.5rem', // h-10
        maxWidth: '15rem', // max-w-60
        // Live site exact values
        widthExact: '108px',
        heightExact: '40px',
      },
      media: {
        widthExact: '560px',
        borderRadius: '8px',
      },
      tooltip: {
        widthExact: '300px',
        paddingExact: '16px',
        borderRadius: '8px',
      },
    },
    colors: {
      grey27: '#444444',
      grey15: '#262626',
      chartreuseGreen52: '#77B255',
      whiteSolid: 'white',
      orange64: '#FDB948',
    },
    typography: {
      title: {
        fontSize: '2.25rem', // text-4xl
        lineHeight: '48px',
        weightExtrabold: '800',
        weightNormal: '400',
        // Live site exact values
        fontSizeExact: '40px',
        lineHeightExact: '48px',
      },
      body: {
        fontSize: '1rem', // text-base
        lineHeight: '1.5',
        weightNormal: '400',
        weightSemibold: '600',
        // Live site exact values
        fontSizeExact: '16px',
        lineHeightExact: '24px',
      },
      button: {
        fontSize: '1.125rem', // text-lg
        lineHeight: '48px',
        weightSemibold: '600',
        // Live site exact values
        fontSizeExact: '18px',
        lineHeightExact: '48px',
      },
      experience: {
        fontSize: '1.875rem', // text-3xl
        lineHeight: '52px',
        weightExtrabold: '800',
        // Live site exact values
        fontSizeExact: '29px',
        lineHeightExact: '52px',
      },
      tooltip: {
        fontSizeExact: '14px',
      },
    },
    shadows: {
      tooltip: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    responsive: {
      breakpoint: '1024px',
      mobilePadding: '2rem',
      mobileGap: '2rem',
      mobileMediaWidth: '100%',
    },
  },

  // Card component tokens
  card: {
    // Stat card variant
    stat: {
      background: semantic.color.surface.accent,
      borderRadius: semantic.radius.md,
      padding: semantic.spacing.card,
      shadow: 'none', // Per requirements
      minWidth: '200px',
      maxWidth: '250px',
      maxWidthMobile: '300px',
      numberColor: semantic.color.text.primary,
      numberSize: semantic.typography.size['5xl'],
      numberSizeTablet: semantic.typography.size['4xl'],
      numberSizeMobile: semantic.typography.size['3xl'],
      numberWeight: semantic.typography.weight.display,
      descriptionColor: semantic.color.text.secondary,
      descriptionSize: semantic.typography.size.md,
      descriptionWeight: semantic.typography.weight.emphasis,
      transition: semantic.duration.normal,
      hoverTransform: 'translateY(-4px)',
      paddingMobile: `${semantic.space.md} ${semantic.space.sm}`,
    },

    // Purpose card variant  
    purpose: {
      background: semantic.color.surface.tertiary,
      backgroundPeach: semantic.color.surface.highlight,
      borderRadius: semantic.radius.lg,
      padding: semantic.spacing.card,
      border: semantic.color.border.primary,
      shadow: semantic.shadow.subtle,
      shadowHover: semantic.shadow.prominent,
      titleColor: semantic.color.text.primary,
      titleSize: semantic.typography.size['2xl'],
      titleWeight: semantic.typography.weight.heading,
      descriptionColor: semantic.color.text.secondary,
      descriptionSize: semantic.typography.size.md,
      descriptionLineHeight: semantic.typography.lineHeight.relaxed,
      transition: semantic.duration.normal,
      hoverTransform: 'translateY(-4px)',
    },
  },

  // Input component tokens
  input: {
    background: semantic.color.surface.primary,
    border: semantic.color.border.primary,
    borderFocus: semantic.color.border.focus,
    borderRadius: semantic.radius.sm,
    padding: semantic.space.md,
    fontSize: semantic.typography.size.md,
    textColor: semantic.color.text.primary,
    placeholderColor: semantic.color.text.tertiary,
    transition: semantic.duration.fast,
  },

  // Badge component tokens
  badge: {
    background: 'rgba(253, 185, 72, 0.5)', // Semi-transparent brand color
    text: semantic.color.text.primary,
    borderRadius: semantic.radius.lg,
    paddingX: semantic.space.md,
    paddingY: semantic.space.sm,
    fontSize: semantic.typography.size.sm,
    fontWeight: semantic.typography.weight.strong,
  },

  // Tooltip component tokens
  tooltip: {
    background: primitive.color.gray[800],
    text: semantic.color.text.inverse,
    borderRadius: semantic.radius.sm,
    padding: semantic.space.sm,
    fontSize: semantic.typography.size.sm,
    fontWeight: semantic.typography.weight.body,
    shadow: semantic.shadow.card,
    maxWidth: '200px',
  },

  // Navigation/Header component tokens
  navigation: {
    background: semantic.color.surface.primary,
    border: semantic.color.border.primary,
    linkColor: semantic.color.text.primary,
    linkHoverColor: semantic.color.brand.primary,
    padding: semantic.space.sm,

    dropdown: {
      background: semantic.color.surface.white,
      borderRadius: semantic.radius.dropdown,
      shadow: semantic.shadow.dropdown,
      padding: '30px 30px 17px', // WordPress dropdown padding
      width: '735px',            // Default dropdown width
      widthCalc: '770px',        // Calculator dropdown width
      gap: semantic.space.lg,
      columnMinWidth: '200px',
      report: {
        maxWidth: '220px',
        paddingLeft: semantic.space.lg,
        borderLeft: semantic.color.border.primary,
      },
      mobile: {
        top: '57px',
        padding: semantic.space.md,
      },
    },
  },

  // Section component tokens
  section: {
    paddingY: semantic.spacing.section,
    paddingX: semantic.spacing.container,
    headingColor: semantic.color.text.primary,
    headingSize: semantic.typography.size['4xl'],
    headingWeight: semantic.typography.weight.heading,
    headingLineHeight: semantic.typography.lineHeight.tight,
    headingMarginBottom: semantic.space.xl,
  },
  checkmarkIcon: {
    sizes: {
      sm: '16px',
      md: '24px',
      lg: '32px',
    },
    colors: {
      fill: '#77B255',
      stroke: 'white',
    },
    dimensions: {
      rectWidth: '20px',
      rectHeight: '20px',
      strokeWidth: '2px',
    },
  },
  benefitItem: {
    colors: {
      text: '#262626',
    },
    typography: {
      fontSize: '16px',
      lineHeight: '24px',
      weightNormal: '400',
      weightSemibold: '600',
    },
    spacing: {
      gap: '8px',
    },
    tooltip: {
      width: '300px',
      padding: '16px',
      borderRadius: '8px',
      fontSize: '14px',
      lineHeight: '1.4',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
  },
  experienceBadge: {
    colors: {
      number: '#FDB948',
      text: '#262626',
      border: '#FDB948',
    },
    typography: {
      numberFontSize: '29px',
      numberLineHeight: '52px',
      numberWeight: '800',
      textFontSize: '16px',
      textLineHeight: '24px',
      textWeight: '400',
    },
    dimensions: {
      circleWidth: '54px',
      circleHeight: '54px',
      borderRadius: '27px',
      borderWidth: '1px',
    },
    spacing: {
      gap: '20px',
    },
  },
  reviewBadge: {
    colors: {
      text: '#262626',
    },
    typography: {
      fontSize: '16px',
      lineHeight: '24px',
      weight: '400',
    },
    dimensions: {
      logoWidth: '108px',
      logoHeight: '40px',
    },
    spacing: {
      gap: '20px',
    },
  },
  
  // Hero organism tokens
  hero: {
    layout: {
      maxWidth: '1272px',
      contentMaxWidth: '50%',
      imageMaxWidth: '50%',
      gap: '64px',
      gapMobile: '32px',
    },
    typography: {
      titleSize: '2.5rem', // 40px from live site
      titleSizeMobile: '2rem', // 32px mobile
      titleWeight: '700',
      titleLineHeight: '1.2',
      titleColor: '#000',
    },
    spacing: {
      paddingY: '50px',
      paddingYMobile: '32px',
      listGap: '16px',
      itemGap: '12px',
      featuresGap: '24px',
      buttonMarginTop: '32px',
    },
    colors: {
      background: '#fff',
      checkmarkColor: '#77B255', // From live site
      accentColor: '#EC9B16', // Orange from experience badge
    },
    experience: {
      numberSize: '29px',
      numberWeight: '800',
      numberColor: '#EC9B16',
      labelSize: '16px',
      labelWeight: '400',
      labelColor: '#262626',
      borderColor: '#EC9B16',
      borderRadius: '27px',
      width: '54px',
      height: '54px',
    },
  },
  
  // BankLogos organism tokens
  bankLogos: {
    layout: {
      maxWidth: '1000px',
      gap: '2rem',
      gapMobile: '1rem',
    },
    spacing: {
      paddingY: '50px',
      titleMarginBottom: '5rem',
    },
    title: {
      maxWidth: '800px',
      textAlign: 'center',
    },
    colors: {
      background: '#ffffff',
    },
  },
  
  // BankLogo molecule tokens
  bankLogo: {
    dimensions: {
      // Fixed dimensions for uniform sizing
      maxHeight: '50px',
      maxHeightMobile: '40px',
      maxHeightSmall: '35px',
      maxWidth: '120px',
      maxWidthMobile: '100px',
      maxWidthSmall: '80px',
      // Aspect ratio for consistent proportions
      aspectRatio: '2.4', // 120px / 50px = 2.4:1
    },
    opacity: {
      default: '0.7',
      hover: '1',
    },
    transition: 'opacity 0.3s ease',
    container: {
      backgroundColor: 'transparent',
      borderRadius: '4px',
      padding: '8px',
    },
  },
  
  // Awards organism tokens
  awards: {
    layout: {
      gap: '3rem',
      gapTablet: '2rem',
      gapMobile: '1.5rem',
      maxWidth: '100%',
    },
    spacing: {
      paddingY: '3rem',
      paddingYMobile: '2rem',
    },
    colors: {
      background: '#f8f9fa',
    },
  },
  
  // Statistics organism tokens
  statistics: {
    layout: {
      gap: '2rem',
      gapMobile: '1rem',
      maxWidth: '1200px',
    },
    spacing: {
      paddingY: '4rem',
      paddingYMobile: '2rem',
      titleMarginBottom: '3rem',
    },
    colors: {
      background: '#ffffff',
    },
  },
  
  // Reviews organism tokens
  reviews: {
    layout: {
      gap: '24px',
      gapMobile: '20px',
      cardWidth: '480px', // Better proportions with constrained text content
      cardWidthMobile: '100%',
      maxWidth: '1272px',
    },
    spacing: {
      paddingY: '50px',
      paddingYMobile: '40px',
      titleMarginBottom: '16px',
      subtitleMarginBottom: '48px',
    },
    colors: {
      background: semantic.color.surface.highlight, // Peach background
    },
    navigation: {
      buttonSize: '40px',
      buttonOffset: '20px',
    },
  },

  // Accordion molecule tokens
  accordion: {
    colors: {
      background: semantic.color.surface.primary,
      backgroundHover: semantic.color.surface.secondary,
      border: '#000000',
      text: '#262626',
      textSecondary: '#262626',
      icon: semantic.color.text.tertiary,
      focus: semantic.color.border.focus,
      iconOpenBg: '#ffba3a',
    },
    spacing: {
      paddingY: semantic.space.md,
      paddingX: semantic.space.lg,
      gap: semantic.space.sm,
      panelPaddingY: semantic.space.md,
      panelPaddingX: semantic.space.lg,
    },
    typography: {
      titleSize: '24px',
      titleWeight: semantic.typography.weight.heading,
      bodySize: semantic.typography.size.md,
      lineHeight: semantic.typography.lineHeight.body,
      titleSizeMobile: '20px',
      lineHeightMobile: '27px',
    },
    radius: semantic.radius.md,
    shadow: semantic.shadow.card,
    dimensions: {
      iconSize: '30px',
      iconSizeOpen: '32px',
      iconRadius: '4px',
      iconBorderWidth: '1px',
      leftPadding: '56px',
    },
    duration: semantic.duration.normal,
  },
} as const;

export default component;