/**
 * Calculator Result Component Types
 * Hunter Galloway Design System - Molecular Component
 */

export interface CalculatorResultProps {
  /** Result title */
  title: string;
  
  /** Calculated amount to display */
  amount: string;
  
  /** Optional description text */
  description?: string;
  
  /** Call-to-action button text */
  ctaText?: string;
  
  /** Call-to-action button link */
  ctaHref?: string;
  
  /** Whether the result is visible */
  visible?: boolean;
  
  /** Visual variant */
  variant?: 'default' | 'highlighted' | 'compact';
  
  /** Additional CSS classes */
  class?: string;
}
