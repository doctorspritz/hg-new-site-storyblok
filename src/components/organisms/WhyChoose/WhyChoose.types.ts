/**
 * WhyChoose Organism Types
 * Hunter Galloway Design System - Organism Component
 * 
 * High-level organism that composes multiple why-choose related sections
 * with optional statistics and flexible layouts.
 */

import type { BenefitCardProps } from '../../molecules/BenefitCard/BenefitCard.types';
import type { StatCardProps } from '../../molecules/StatCard/StatCard.types';

export interface WhyChooseProps {
  /** Main heading for the organism */
  title: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Benefits to display */
  benefits: Omit<BenefitCardProps, 'class'>[];
  /** Optional statistics to show above benefits */
  statistics?: Omit<StatCardProps, 'class'>[];
  /** Call-to-action button text */
  buttonText?: string;
  /** Call-to-action button URL */
  buttonHref?: string;
  /** Organism layout variant */
  variant?: 'default' | 'with-stats' | 'compact';
  /** Background style variant */
  background?: 'light' | 'dark' | 'accent';
  /** Additional CSS classes */
  class?: string;
}

export interface WhyChooseConfig {
  variants: Record<WhyChooseProps['variant'], {
    layout: string;
    spacing: string;
    benefitColumns: number;
  }>;
  backgrounds: Record<WhyChooseProps['background'], {
    surface: string;
    text: string;
  }>;
}