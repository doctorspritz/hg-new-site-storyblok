/**
 * Image Atom Types
 * Hunter Galloway Design System
 */

export interface ImageProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Image width */
  width?: string | number;
  /** Image height */
  height?: string | number;
  /** Additional CSS classes */
  class?: string;
}