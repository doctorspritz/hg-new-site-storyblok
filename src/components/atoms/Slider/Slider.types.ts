/**
 * Slider Component Types
 * Hunter Galloway Design System - Atomic Component
 */

export interface SliderProps {
  /** Minimum value */
  min?: number;
  
  /** Maximum value */
  max?: number;
  
  /** Step size */
  step?: number;
  
  /** Current value */
  value?: number;
  
  /** Input name attribute */
  name?: string;
  
  /** Input id attribute */
  id?: string;
  
  /** Whether the slider is disabled */
  disabled?: boolean;
  
  /** Whether to show the current value */
  showValue?: boolean;
  
  /** Whether to show min/max labels */
  showLabels?: boolean;
  
  /** Function to format the value display */
  formatValue?: (value: number) => string;
  
  /** Additional CSS classes */
  class?: string;
  
  /** Event handler for value changes */
  onChange?: (event: Event) => void;
  
  /** Event handler for input events */
  onInput?: (event: Event) => void;
}
