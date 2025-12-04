/**
 * Tests for MortgageVsRentSection organism
 * Validates structure, layout, and design system compliance
 */
import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentPath = path.join(__dirname, 'MortgageVsRentSection.astro');
const componentSource = fs.readFileSync(componentPath, 'utf-8');

describe('MortgageVsRentSection', () => {
  it('should define proper TypeScript interface', () => {
    expect(componentSource).toContain('export interface Props');
    expect(componentSource).toContain("variant?: 'default' | 'centered'");
    expect(componentSource).toContain(
      "background?: 'white' | 'gray' | 'transparent'",
    );
    expect(componentSource).toContain('title?: string');
    expect(componentSource).toContain('description?: string');
    expect(componentSource).toContain('calculatorProps?:');
    expect(componentSource).toContain('id?: string');
  });

  it('should import and use MortgageVsRentCalculator', () => {
    expect(componentSource).toContain('import MortgageVsRentCalculator');
    expect(componentSource).toContain('<MortgageVsRentCalculator');
    expect(componentSource).toContain('{...calculatorProps}');
  });

  it('should use design tokens for all styling', () => {
    // Color tokens
    expect(componentSource).toContain('var(--color-text-heading)');
    expect(componentSource).toContain('var(--color-text-body)');
    expect(componentSource).toContain('var(--color-background-body)');
    expect(componentSource).toContain('var(--color-surface)');

    // Spacing tokens
    expect(componentSource).toMatch(/var\(--space-/);
    expect(componentSource).toContain('var(--space-xl)');
    expect(componentSource).toContain('var(--space-xl)');
    expect(componentSource).toContain('var(--space-xl)');
    expect(componentSource).toContain('var(--space-lg)');
    expect(componentSource).toContain('var(--space-md)');
    expect(componentSource).toContain('var(--space-sm)');

    // Typography tokens (mix of tokens and legacy values)
    expect(componentSource).toMatch(/var\(--font-/);
    expect(componentSource).toContain('var(--font-size-3xl)');
    expect(componentSource).toContain('var(--font-size-sm)');
    expect(componentSource).toContain('var(--font-size-sm)');
    expect(componentSource).toContain('var(--font-weight-semibold)');
    expect(componentSource).toContain('var(--line-height-normal)');
  });

  it('should implement proper semantic HTML structure', () => {
    expect(componentSource).toContain('<section');
    expect(componentSource).toContain('<header class="section-header">');
    expect(componentSource).toContain('<h2 class="section-title">');
    expect(componentSource).toContain('<p class="section-description">');
    expect(componentSource).toContain('<div class="container">');
    expect(componentSource).toContain('<div class="calculator-wrapper">');
  });

  it('should use proper CSS class naming convention', () => {
    expect(componentSource).toContain('hg-mortgage-vs-rent-section');
    expect(componentSource).toContain('section-content');
    expect(componentSource).toContain('section-header');
    expect(componentSource).toContain('section-title');
    expect(componentSource).toContain('section-description');
    expect(componentSource).toContain('calculator-wrapper');
  });

  it('should handle default props correctly', () => {
    expect(componentSource).toContain("variant = 'centered'");
    expect(componentSource).toContain("background = 'transparent'");
    expect(componentSource).toContain(
      "title = 'Compare your current rent with your mortgage payment'",
    );
    expect(componentSource).toContain(
      "description = 'Your mortgage payment could be lower than your current rent.'",
    );
    expect(componentSource).toContain('calculatorProps = {}');
    expect(componentSource).toContain("id = 'mortagevsrent'");
  });

  it('should implement variant system', () => {
    expect(componentSource).toContain('variant-${variant}');
    expect(componentSource).toContain('.variant-centered');
    expect(componentSource).toContain('.variant-default');
    expect(componentSource).toContain('text-align: center');
    expect(componentSource).toContain('text-align: left');
  });

  it('should implement background variant system', () => {
    expect(componentSource).toContain('background-${background}');
    expect(componentSource).toContain('.background-white');
    expect(componentSource).toContain('.background-gray');
    expect(componentSource).toContain('.background-transparent');
    expect(componentSource).toContain(
      'background-color: var(--color-background-body)',
    );
    expect(componentSource).toContain('background-color: var(--color-surface)');
    expect(componentSource).toContain('background-color: transparent');
  });

  it('should implement comprehensive responsive design', () => {
    // Mobile
    expect(componentSource).toContain('@media (max-width: 768px)');
    expect(componentSource).toContain('padding: var(--space-lg) 0');
    expect(componentSource).toContain('padding: 0 var(--space-sm)');
    expect(componentSource).toContain('var(--font-size-2xl)');
    expect(componentSource).toContain('var(--font-size-sm)');
    expect(componentSource).toContain('var(--line-height-normal)');

    // Large screens
    expect(componentSource).toContain('@media (min-width: 992px)');
    expect(componentSource).toContain('padding: var(--space-xl) 0');
    expect(componentSource).toContain('padding: 0 var(--space-lg)');

    // Extra large screens
    expect(componentSource).toContain('@media (min-width: 1200px)');
    expect(componentSource).toContain('padding: var(--space-xl) 0');
    expect(componentSource).toContain('margin: var(--space-xl) auto 0');
  });

  it('should use class:list for dynamic classes', () => {
    expect(componentSource).toContain('class:list={sectionClasses}');
    expect(componentSource).toContain('const sectionClasses = [');
    expect(componentSource).toContain("'hg-mortgage-vs-rent-section'");
    expect(componentSource).toContain('`variant-${variant}`');
    expect(componentSource).toContain('`background-${background}`');
  });

  it('should implement proper container constraints', () => {
    expect(componentSource).toContain('max-width: 800px');
    expect(componentSource).toContain('margin: 0 auto');
    expect(componentSource).toContain('/* Match legacy max-width */');
  });

  it('should handle calculator props passing', () => {
    expect(componentSource).toContain('variant={variant}');
    expect(componentSource).toContain('{...calculatorProps}');
  });

  it('should implement proper ID handling', () => {
    expect(componentSource).toContain('id={id}');
  });

  it('should include legacy-specific responsive adjustments', () => {
    expect(componentSource).toContain('var(--space-lg)');
    expect(componentSource).toContain('var(--space-md)');
    expect(componentSource).toContain('var(--line-height-normal)');
    expect(componentSource).toContain('var(--line-height-normal)');
  });

  it('should maintain semantic structure for accessibility', () => {
    expect(componentSource).toContain('<section');
    expect(componentSource).toContain('<header');
    expect(componentSource).toContain('<h2');
    expect(componentSource).toContain('{title}');
    expect(componentSource).toContain('{description}');
  });

  it('should use proper spacing hierarchy', () => {
    expect(componentSource).toContain('margin-bottom: var(--space-xl)');
    expect(componentSource).toContain('margin-bottom: var(--space-md)');
    expect(componentSource).toContain('margin: var(--space-xl) auto 0');
    expect(componentSource).toContain('margin: var(--space-lg) auto 0');
  });

  it('should implement progressive enhancement for large screens', () => {
    expect(componentSource).toContain('@media (min-width: 1200px)');
    expect(componentSource).toContain('var(--space-xl)');
  });
});
