/**
 * StarRating Atom Types
 * Hunter Galloway Design System
 */

export interface StarRatingProps {
  /** Number of stars to display (1-5) */
  rating: number;
  /** Maximum number of stars to show */
  max?: number;
  /** Size variant for the stars */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  class?: string;
}