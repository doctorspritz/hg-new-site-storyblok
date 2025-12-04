/**
 * Tooltip Component Types
 * Hunter Galloway Design System
 */

export interface TooltipProps {
  /** Content to display in the tooltip */
  content: string;
  /** Tooltip position relative to trigger */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether tooltip is always visible */
  visible?: boolean;
  /** Delay before showing tooltip (in ms) */
  delay?: number;
  /** Additional CSS classes */
  class?: string;
}

export interface TooltipConfig {
  positions: Record<TooltipProps['position'], {
    tooltip: string;
    arrow: string;
  }>;
  sizes: Record<TooltipProps['size'], string>;
}