import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Slider.astro', 'utf8');

describe('Slider source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--space-sm\)/);
    expect(source).toMatch(/var\(--space-xs\)/);
    expect(source).toMatch(/var\(--space-md\)/);
    expect(source).toMatch(/var\(--color-interactive-primary\)/);
    expect(source).toMatch(/var\(--color-interactive-disabled\)/);
    expect(source).toMatch(/var\(--color-border-focus\)/);
    expect(source).toMatch(/var\(--font-size-sm\)/);
    expect(source).toMatch(/var\(--color-text-subtle\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/interface Props/);
    expect(source).toMatch(/id\?: string/);
    expect(source).toMatch(/name\?: string/);
    expect(source).toMatch(/min: number/);
    expect(source).toMatch(/max: number/);
    expect(source).toMatch(/step\?: number/);
    expect(source).toMatch(/value\?: number/);
    expect(source).toMatch(/disabled\?: boolean/);
    expect(source).toMatch(/size\?: 'sm' \| 'md' \| 'lg'/);
    expect(source).toMatch(/showValue\?: boolean/);
    expect(source).toMatch(/label\?: string/);
  });

  it('has proper default values', () => {
    expect(source).toMatch(/step = 1/);
    expect(source).toMatch(/value = min/);
    expect(source).toMatch(/disabled = false/);
    expect(source).toMatch(/size = 'md'/);
    expect(source).toMatch(/showValue = false/);
  });

  it('builds CSS classes dynamically', () => {
    expect(source).toMatch(/class:list/);
    expect(source).toMatch(/size-\${size}/);
    expect(source).toMatch(/'is-disabled': disabled/);
  });

  it('renders label association when provided', () => {
    expect(source).toMatch(/import Label/);
    expect(source).toMatch(/<Label/);
    expect(source).toMatch(/aria-labelledby/);
  });

  it('includes value display toggle', () => {
    expect(source).toMatch(/showValue/);
    expect(source).toMatch(/class="value"/);
  });

  it('applies token-based sizes', () => {
    expect(source).toMatch(/\.size-sm/);
    expect(source).toMatch(/height: var\(--space-xs\)/);
    expect(source).toMatch(/\.size-md/);
    expect(source).toMatch(/height: var\(--space-sm\)/);
    expect(source).toMatch(/\.size-lg/);
    expect(source).toMatch(/height: var\(--space-md\)/);
  });

  it('uses semantic range input', () => {
    expect(source).toMatch(/type="range"/);
    expect(source).toMatch(/min={min}/);
    expect(source).toMatch(/max={max}/);
    expect(source).toMatch(/step={step}/);
    expect(source).toMatch(/value={value}/);
  });

  it('has proper JSDoc documentation', () => {
    expect(source).toMatch(/Atom: Slider/);
    expect(source).toMatch(/Accessible range input/);
  });
});
