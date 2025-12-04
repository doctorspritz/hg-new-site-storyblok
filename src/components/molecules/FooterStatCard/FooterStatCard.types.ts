/**
 * FooterStatCard Component Types
 * Hunter Galloway Design System
 */

export interface FooterStatCardProps {
  /** The main statistic number/value to display */
  number: string;
  /** Description text below the number */
  description: string;
  /** Additional CSS classes */
  class?: string;
}