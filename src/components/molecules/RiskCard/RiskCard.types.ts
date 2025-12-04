/**
 * RiskCard Component Types
 * Hunter Galloway Design System - Molecular Component
 * 
 * Individual risk item card for use within RiskWidget sections.
 * Displays icon, title, and content blocks with WordPress-exact styling.
 */

export interface RiskCardProps {
  /** Unique identifier for the risk card */
  id?: string;
  
  /** Title/heading for this risk item */
  title: string;
  
  /** Array of text content blocks for this item */
  content: string[];
  
  /** Icon type for this risk item */
  icon: 'scheme' | 'umbrella' | 'video-conference' | 'arrow' | 'puzzle' | 'dollar' | 'custom';
  
  /** Custom icon URL if icon type is 'custom' */
  customIcon?: string;
  
  /** Visual variant for the card */
  variant?: 'default' | 'compact' | 'highlighted';
  
  /** Additional CSS classes */
  class?: string;
}

export interface IconMapping {
  scheme: string;
  umbrella: string;
  'video-conference': string;
  arrow: string;
  puzzle: string;
  dollar: string;
  custom?: string;
}

export default RiskCardProps;
