/**
 * Tests for MortgageCalculatorSlider molecule
 * Validates structure, design token usage, and accessibility
 */
import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentPath = path.join(__dirname, 'MortgageCalculatorSlider.astro');
const componentSource = fs.readFileSync(componentPath, 'utf-8');

describe('MortgageCalculatorSlider', () => {
  it('should define proper TypeScript interface', () => {
    expect(componentSource).toContain('export interface Props');
    expect(componentSource).toContain('min?: number');
    expect(componentSource).toContain('max?: number');
    expect(componentSource).toContain('step?: number');
    expect(componentSource).toContain('value?: number');
    expect(componentSource).toContain('disabled?: boolean');
    expect(componentSource).toContain('label?: string');
    expect(componentSource).toContain('currency?: string');
  });

  it('should use design tokens for all styling values', () => {
    // Design tokens for colors
    expect(componentSource).toContain('var(--color-interactive-primary)');
    expect(componentSource).toContain('var(--color-background-body)');
    expect(componentSource).toContain('var(--color-border-subtle)');
    expect(componentSource).toContain('var(--color-text-body)');

    // Spacing tokens
    expect(componentSource).toMatch(/var\(--space-/);
    expect(componentSource).toContain('var(--space-xl)');
    expect(componentSource).toContain('var(--space-sm)');

    // Typography tokens (some)
    expect(componentSource).toMatch(/var\(--font-/);
    expect(componentSource).toContain('var(--font-size-xl)');
    expect(componentSource).toContain('var(--font-size-md)');
    expect(componentSource).toContain('var(--font-weight-semibold)');
    expect(componentSource).toContain('var(--font-weight-bold)');
    expect(componentSource).toContain('var(--line-height-normal)');

    // Design tokens for border and radius
    expect(componentSource).toContain('var(--radius-sm)');
    expect(componentSource).toContain('var(--border-width-sm)');
  });

  it('should implement proper accessibility features', () => {
    expect(componentSource).toContain('type="range"');
    expect(componentSource).toContain('aria-label');
    expect(componentSource).toContain('aria-valuemin');
    expect(componentSource).toContain('aria-valuemax');
    expect(componentSource).toContain('aria-valuenow');
    expect(componentSource).toContain('aria-valuetext');
    expect(componentSource).toContain('disabled={disabled}');
  });

  it('should have responsive design with mobile adjustments', () => {
    expect(componentSource).toContain('@media (max-width: 768px)');
    expect(componentSource).toContain('var(--font-size-md)');
    expect(componentSource).toContain('var(--font-size-sm)');
    expect(componentSource).toContain('var(--line-height-normal)');
  });

  it('should implement interactive JavaScript functionality', () => {
    expect(componentSource).toContain('<script>');
    expect(componentSource).toContain('function initializeSlider()');
    expect(componentSource).toContain('addEventListener');
    expect(componentSource).toContain('NodeListOf<HTMLInputElement>');
    expect(componentSource).toContain('updateSlider');
  });

  it('should use proper CSS class naming convention', () => {
    expect(componentSource).toContain('hg-mortgage-calculator-slider');
    expect(componentSource).toContain('slider-input');
    expect(componentSource).toContain('slider-line');
    expect(componentSource).toContain('slider-caption');
    expect(componentSource).toContain('slider-sides');
  });

  it('should handle default props correctly', () => {
    expect(componentSource).toContain('min = 100');
    expect(componentSource).toContain('max = 2500');
    expect(componentSource).toContain('step = 50');
    expect(componentSource).toContain('value = 100');
    expect(componentSource).toContain('disabled = false');
    expect(componentSource).toContain('currency = "$"');
  });

  it('should implement proper disabled state styling', () => {
    expect(componentSource).toContain('.is-disabled');
    expect(componentSource).toContain('opacity: 0.5');
    expect(componentSource).toContain('cursor: not-allowed');
    expect(componentSource).toContain('var(--color-interactive-disabled)');
  });

  it('should include legacy visual parity elements', () => {
    expect(componentSource).toContain('slider-line');
    expect(componentSource).toContain('slider-caption');
    expect(componentSource).toContain('calc(');
    expect(componentSource).toContain('transform: translate(-50%, -80%)');
    expect(componentSource).toContain('border-radius: 50%');
  });

  it('should use proper TypeScript types in script', () => {
    expect(componentSource).toContain('as NodeListOf<HTMLInputElement>');
    expect(componentSource).toContain('as HTMLElement');
    expect(componentSource).toContain('dataset.currency');
    expect(componentSource).toContain('parseInt(');
  });

  it('should implement smooth transitions', () => {
    expect(componentSource).toContain('transition:');
    expect(componentSource).toContain('0.2s');
  });

  it('should handle percentage calculations for slider positioning', () => {
    expect(componentSource).toContain('((value - min) / (max - min)) * 100');
    expect(componentSource).toContain('percentage === 100');
    expect(componentSource).toContain('calc(');
  });
});
