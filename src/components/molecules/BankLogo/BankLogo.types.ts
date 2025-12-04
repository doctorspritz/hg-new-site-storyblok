/**
 * BankLogo Molecule Types
 * Hunter Galloway Design System
 */

export interface BankLogoProps {
  /** Bank logo image source URL */
  src: string;
  /** Alt text for the bank logo */
  alt: string;
  /** Additional CSS classes for special styling (e.g., icon_macq_logo) */
  class?: string;
}

export interface BankData {
  /** Bank logo image source URL */
  src: string;
  /** Alt text for the bank logo */
  alt: string;
  /** Optional CSS class for special styling */
  class?: string;
}