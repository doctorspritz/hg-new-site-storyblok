/**
 * Button Component Types
 * Hunter Galloway Design System
 */

export interface ButtonProps {
  /** Text label (or provide children via slot) */
  text?: string;
  /** Optional alternative name, supported for compatibility */
  label?: string;
  /** Optional aria-label override for icon-only or contextual labeling */
  ariaLabel?: string;
  /** Button visual variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Link target: if provided, renders an <a> */
  href?: string;
  /** Anchor target */
  target?: '_self' | '_blank' | '_parent' | '_top';
  /** Anchor rel */
  rel?: string;
  /** Button type (when rendering a <button>) */
  type?: 'button' | 'submit' | 'reset';
  /** Additional CSS classes */
  class?: string;
}

export interface ButtonVariantStyles {
  base: string;
  variants: Record<ButtonProps['variant'], string>;
  sizes: Record<ButtonProps['size'], string>;
  states: {
    disabled: string;
    loading: string;
  };
}
