/**
 * PurposeCard Component Types
 * Hunter Galloway Design System
 */

export interface PurposeCardProps {
  /** Card title */
  title: string;
  /** Card description text */
  description: string;
  /** Icon name for the card */
  icon: string;
  /** Background image for hover effect */
  image: string;
  /** URL to navigate to when clicked */
  href: string;
  /** Optional badge text (e.g., "Most Popular") */
  badge?: string;
  /** Card size variant */
  size?: 'md' | 'lg';
  /** Background color variant */
  variant?: 'default' | 'peach';
  /** Additional CSS classes */
  class?: string;
}

export interface PurposeCardConfig {
  sizes: Record<PurposeCardProps['size'], {
    container: string;
    content: string;
    title: string;
    description: string;
  }>;
}