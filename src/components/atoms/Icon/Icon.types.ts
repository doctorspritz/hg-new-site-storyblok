/**
 * Icon Component Types
 * Hunter Galloway Design System
 */

export interface IconProps {
  /** Icon name/identifier */
  name: string;
  /** Icon size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Icon color */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'inherit';
  /** Additional CSS classes */
  class?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Whether icon should be inline */
  inline?: boolean;
}

export interface IconConfig {
  sizes: Record<IconProps['size'], string>;
  colors: Record<IconProps['color'], string>;
}