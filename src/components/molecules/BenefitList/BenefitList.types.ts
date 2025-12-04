/**
 * BenefitList Molecule Types
 * Hunter Galloway Design System
 */

export interface BenefitItem {
  /** Benefit text content */
  text: string;
  /** Optional tooltip text for additional context */
  tooltip?: string;
  /** Text that should show tooltip on hover */
  hoverText?: string;
}

export interface BenefitListProps {
  /** Array of benefit items to display */
  items: BenefitItem[];
  /** Additional CSS classes */
  class?: string;
}