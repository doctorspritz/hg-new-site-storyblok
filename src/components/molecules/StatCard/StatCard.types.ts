/**
 * StatCard Molecule Types
 * Hunter Galloway Design System
 */

export interface StatCardProps {
  /** The main statistic number/value to display */
  number: string;
  /** Description text below the number */
  description: string;
  /** Style variant for the card */
  variant?: 'default' | 'compact' | 'featured';
  /** Additional CSS classes */
  class?: string;
}