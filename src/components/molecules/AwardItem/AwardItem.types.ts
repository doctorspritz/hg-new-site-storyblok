/**
 * AwardItem Component Types
 * Hunter Galloway Design System
 */

export interface AwardItemProps {
  /** Award image source */
  image: string;
  /** Alt text for the image */
  alt: string;
  /** Tooltip text to display on hover */
  tooltip: string;
  /** Award ID for tracking */
  id?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  class?: string;
}

export interface AwardItemConfig {
  sizes: Record<AwardItemProps['size'], {
    container: string;
    image: string;
  }>;
}