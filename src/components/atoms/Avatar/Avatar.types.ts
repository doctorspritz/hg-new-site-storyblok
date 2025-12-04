/**
 * Avatar Atom Types
 * Hunter Galloway Design System
 */

export interface AvatarProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Size variant for the avatar */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to show a border around avatar */
  bordered?: boolean;
  /** Additional CSS classes */
  class?: string;
}