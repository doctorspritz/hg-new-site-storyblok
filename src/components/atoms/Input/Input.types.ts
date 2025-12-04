/**
 * Input Component Types
 * Hunter Galloway Design System
 */

export interface InputProps {
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Input variant/style */
  variant?: 'default' | 'filled' | 'outlined';
  /** Input state */
  state?: 'default' | 'error' | 'success' | 'warning';
  /** Placeholder text */
  placeholder?: string;
  /** Input value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Input name attribute */
  name?: string;
  /** Input ID */
  id?: string;
  /** Whether input is required */
  required?: boolean;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether input is readonly */
  readonly?: boolean;
  /** Full width input */
  fullWidth?: boolean;
  /** Additional CSS classes */
  class?: string;
  /** Autocomplete attribute */
  autocomplete?: string;
  /** Input pattern for validation */
  pattern?: string;
  /** Minimum value (for number inputs) */
  min?: number;
  /** Maximum value (for number inputs) */
  max?: number;
  /** Step value (for number inputs) */
  step?: number;
  /** Maximum length */
  maxlength?: number;
  /** Minimum length */
  minlength?: number;
}