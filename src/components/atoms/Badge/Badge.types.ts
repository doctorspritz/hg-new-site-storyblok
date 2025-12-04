/**
 * Badge Component Types
 * Hunter Galloway Design System
 */

export interface BadgeProps {
  /** Badge text content - atoms should not use slots */
  text: string;
  /** Badge visual variant */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  class?: string;
}