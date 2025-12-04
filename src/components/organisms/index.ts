/**
 * Organisms Index
 * Hunter Galloway Design System - Organism Components
 * 
 * Complex components that combine molecules and atoms into distinct interface sections.
 */

// Export all organism components
export { default as Header } from './Header.astro';
export { default as Footer } from './Footer.astro';
export { default as HeroWidget } from './HeroWidget/HeroWidget.astro';
export { default as Awards } from './Awards.astro';
export { default as BankLogos } from './BankLogos.astro';
export { default as LoanPurpose } from './LoanPurpose.astro';
export { default as PropertyMap } from './PropertyMap.astro';
export { default as Reviews } from './Reviews.astro';
export { default as Statistics } from './Statistics.astro';
export { default as MortgageRentCalculator } from './MortgageRentCalculator/MortgageRentCalculator.astro';
export { default as RiskWidget } from './RiskWidget/RiskWidget.astro';

// Type exports
export type { RiskWidgetProps } from './RiskWidget/RiskWidget.types';
