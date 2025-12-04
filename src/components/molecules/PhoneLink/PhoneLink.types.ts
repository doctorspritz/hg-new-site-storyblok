/**
 * PhoneLink Component Types
 * Hunter Galloway Design System - Type definitions
 */

export interface PhoneLinkProps {
  /** Phone number for tel: link */
  phoneNumber?: string;
  /** Display text shown to users */
  displayText?: string;
  /** Whether to show phone icon */
  showIcon?: boolean;
  /** Whether to show icon only (responsive) */
  iconOnly?: boolean;
  /** Additional CSS classes */
  class?: string;
}