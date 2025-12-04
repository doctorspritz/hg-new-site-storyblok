/**
 * Tests for MortgageVsRentCalculator molecule
 * Validates structure, component integration, and functionality
 */
import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentPath = path.join(__dirname, 'MortgageVsRentCalculator.astro');
const componentSource = fs.readFileSync(componentPath, 'utf-8');

describe('MortgageVsRentCalculator', () => {
  it('should define proper TypeScript interface', () => {
    expect(componentSource).toContain('export interface Props');
    expect(componentSource).toContain("variant?: 'default' | 'centered'");
    expect(componentSource).toContain('buttonText?: string');
    expect(componentSource).toContain('buttonHref?: string');
    expect(componentSource).toContain('min?: number');
    expect(componentSource).toContain('max?: number');
    expect(componentSource).toContain('step?: number');
    expect(componentSource).toContain('defaultValue?: number');
    expect(componentSource).toContain('currency?: string');
    expect(componentSource).toContain('disabled?: boolean');
  });

  it('should import and use required components', () => {
    expect(componentSource).toContain('import MortgageCalculatorSlider');
    expect(componentSource).toContain('import ButtonWithIcon');
    expect(componentSource).toContain('<MortgageCalculatorSlider');
    expect(componentSource).toContain('<ButtonWithIcon');
  });

  it('should use design tokens for styling', () => {
    // Core component design tokens
    expect(componentSource).toContain('var(--color-surface)');
    expect(componentSource).toContain('var(--color-border-subtle)');

    // Spacing tokens
    expect(componentSource).toContain('var(--space-lg)');
    expect(componentSource).toContain('var(--space-md)');
    expect(componentSource).toContain('var(--space-sm)');

    // Border and radius tokens
    expect(componentSource).toContain('var(--radius-lg)');
    expect(componentSource).toContain('var(--border-width-sm)');
    expect(componentSource).toContain('var(--border-style-solid)');

    // Size tokens
    expect(componentSource).toContain('var(--size-form-width-sm)');
  });

  it('should implement proper CSS class naming', () => {
    expect(componentSource).toContain('hg-mortgage-vs-rent-calculator');
    expect(componentSource).toContain('calculator-content');
    expect(componentSource).toContain('calculator-actions');
    expect(componentSource).toContain('calculator-button');
  });

  it('should handle default props correctly', () => {
    expect(componentSource).toContain("variant = 'default'");
    expect(componentSource).toContain("buttonText = 'Calculate'");
    expect(componentSource).toContain(
      "buttonHref = '/mortgage-vs-rent-calculator/'",
    );
    expect(componentSource).toContain('min = 100');
    expect(componentSource).toContain('max = 2500');
    expect(componentSource).toContain('step = 50');
    expect(componentSource).toContain('defaultValue = 100');
    expect(componentSource).toContain("currency = '$'");
    expect(componentSource).toContain('disabled = false');
  });

  it('should implement variant system', () => {
    expect(componentSource).toContain('variant-${variant}');
    expect(componentSource).toContain('variant-centered');
    expect(componentSource).toContain('text-align: center');
  });

  it('should handle disabled state', () => {
    expect(componentSource).toContain("{ 'is-disabled': disabled }");
    expect(componentSource).toContain('.is-disabled');
    expect(componentSource).toContain('pointer-events: none');
    expect(componentSource).toContain('disabled={disabled}');
  });

  it('should implement responsive design', () => {
    expect(componentSource).toContain('@media (--bp-md)');
    expect(componentSource).toContain('width: 100%');
    expect(componentSource).toContain('max-width: 100%');
  });

  it('should include interactive JavaScript functionality', () => {
    expect(componentSource).toContain('<script>');
    expect(componentSource).toContain('function initializeCalculator()');
    expect(componentSource).toContain('addEventListener');
    expect(componentSource).toContain('NodeListOf<HTMLElement>');
    expect(componentSource).toContain('HTMLAnchorElement');
    expect(componentSource).toContain('HTMLInputElement');
    expect(componentSource).toContain('updateButtonHref');
  });

  it('should handle button href updates based on slider value', () => {
    expect(componentSource).toContain('?initPrice=${currentValue}');
    expect(componentSource).toContain("setAttribute('href', newHref)");
    expect(componentSource).toContain(
      "slider.addEventListener('input', updateButtonHref)",
    );
  });

  it('should not use global overrides or important flags', () => {
    // Verify no :global() overrides remain
    expect(componentSource).not.toContain(':global(');
    // Verify no !important declarations
    expect(componentSource).not.toContain('!important');
    // Should use proper component composition instead
    expect(componentSource).toContain('ButtonWithIcon');
  });

  it('should use ButtonWithIcon with proper props', () => {
    expect(componentSource).toContain('variant="primary"');
    expect(componentSource).toContain('size="lg"');
    expect(componentSource).toContain('iconPosition="right"');
    expect(componentSource).toContain('iconSrc=');
    expect(componentSource).toContain('iconAlt="arrow"');
    expect(componentSource).toContain('label={buttonText}');
  });

  it('should handle button click events with proper type safety', () => {
    expect(componentSource).toContain('function (e: Event)');
    expect(componentSource).toContain('e.preventDefault()');
    expect(componentSource).toContain("window.open(href, '_blank')");
    expect(componentSource).toContain('(e.target as HTMLAnchorElement)');
  });

  it('should pass props correctly to child components', () => {
    expect(componentSource).toContain('id={calculatorId}');
    expect(componentSource).toContain('name="weekly-rent"');
    expect(componentSource).toContain('min={min}');
    expect(componentSource).toContain('max={max}');
    expect(componentSource).toContain('step={step}');
    expect(componentSource).toContain('value={defaultValue}');
    expect(componentSource).toContain('currency={currency}');
    expect(componentSource).toContain('disabled={disabled}');
  });

  it('should include arrow icon via ButtonWithIcon', () => {
    expect(componentSource).toContain('16_arrow_r_black.svg');
    expect(componentSource).toContain('iconSrc=');
    expect(componentSource).toContain('iconAlt="arrow"');
  });

  it('should implement proper design token usage', () => {
    expect(componentSource).toContain('var(--radius-lg)');
    expect(componentSource).toContain('var(--space-md)');
    expect(componentSource).toContain('var(--size-form-width-sm)');
  });

  it('should generate unique calculator IDs', () => {
    expect(componentSource).toContain('Math.random().toString(36).slice(2, 8)');
    expect(componentSource).toContain('data-calculator-id={calculatorId}');
  });
});
