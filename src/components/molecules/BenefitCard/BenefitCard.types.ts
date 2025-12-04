/**
 * BenefitCard Molecule Types
 * Hunter Galloway Design System
 */

export interface BenefitCardProps {
  /** Icon name to display */
  icon: string;
  /** Title text */
  title: string;
  /** Description text */
  description: string;
  /** Visual variant */
  variant?: 'default' | 'light' | 'featured';
  /** Additional CSS classes */
  class?: string;
}