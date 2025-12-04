/**
 * RiskWidget Component Types
 * Hunter Galloway Design System
 * 
 * A widget for displaying risk mitigation content with list items and background image.
 * Used across 7+ pages for trust-building and risk explanation content.
 * Built to match the WordPress risk_widget pattern exactly.
 */

export interface RiskItem {
  /** Unique identifier for the risk item */
  id: string;
  
  /** Title/heading for this risk item */
  title: string;
  
  /** Array of text content blocks for this item */
  content: string[];
  
  /** Icon type for this risk item */
  icon: 'scheme' | 'umbrella' | 'video-conference' | 'arrow' | 'puzzle' | 'dollar' | 'custom';
  
  /** Custom icon URL if icon type is 'custom' */
  customIcon?: string;
}

export interface MarketStatistic {
  /** The statistical value (e.g., "40%") */
  value: string;
  
  /** Tooltip content explaining the statistic */
  tooltip: {
    content: string;
    link?: {
      url: string;
      text: string;
    };
  };
}

export interface RiskWidgetProps {
  /** Main title for the risk widget */
  title: string;
  
  /** Description text content - supports HTML */
  description?: string;
  
  /** Market statistic with tooltip (e.g., "40%" rejection rate) */
  marketStatistic?: MarketStatistic;
  
  /** Array of risk items to display */
  riskItems: RiskItem[];
  
  /** Background image for the right side */
  backgroundImage?: string;
  
  /** Alt text for background image */
  backgroundImageAlt?: string;
  
  /** Widget variant for different styling */
  variant?: 'default' | 'light' | 'reversed' | 'refinance' | 'doctor' | 'nurse';
  
  /** Additional CSS classes */
  class?: string;
  
  /** Custom ID for the section */
  id?: string;
}

export interface RiskWidgetVariants {
  /** Default gray background variant */
  default: {
    background: '#eeeeee';
    layout: 'horizontal';
    contentWidth: '45%';
    imageWidth: '55%';
  };
  
  /** Light variant with different background */
  light: {
    background: '#f8f8f8';
    layout: 'horizontal';
  };
  
  /** Reversed layout variant */
  reversed: {
    layout: 'reversed';
    imagePosition: 'left';
  };
  
  /** Refinance-specific styling */
  refinance: {
    background: '#eeeeee';
    contentWidth: '60%';
    specialIcons: true;
  };
  
  /** Doctor page specific styling */
  doctor: {
    layout: 'specialized';
    titleSize: '38px';
    listSpacing: '64px';
  };
  
  /** Nurse page specific styling */
  nurse: {
    layout: 'specialized';
    marginBottom: '80px';
  };
}

export default RiskWidgetProps;
