/**
 * Hero Organism Types
 * Hunter Galloway Design System
 */

import type { BenefitItem } from '../../molecules/BenefitList/BenefitList.types';

export interface FeatureBadge {
  /** Badge type */
  type: 'experience' | 'reviews';
  /** Main text/number to display */
  text: string;
  /** Supporting label text */
  label: string;
  /** Optional icon for the badge */
  icon?: string;
  /** Logo source for review badges */
  logoSrc?: string;
}

export interface HeroProps {
  /** Main heading text */
  title: string;
  /** Array of benefit items with checkmarks */
  benefits: BenefitItem[];
  /** Call-to-action button text */
  ctaText: string;
  /** Call-to-action button URL */
  ctaUrl: string;
  /** Hero image source */
  imageUrl: string;
  /** Hero image alt text */
  imageAlt: string;
  /** Feature badges (experience, reviews, etc.) */
  features?: FeatureBadge[];
  /** Additional CSS classes */
  class?: string;
}