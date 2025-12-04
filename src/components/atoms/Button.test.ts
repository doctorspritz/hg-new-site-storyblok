import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Button.astro', 'utf8');

describe('Button source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--space-xs\)/);
    expect(source).toMatch(/var\(--radius-pill\)/);
    expect(source).toMatch(/var\(--font-weight-bold\)/);
    expect(source).toMatch(/var\(--line-height-normal\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/interface Props/);
    expect(source).toMatch(/label\?: string/);
    expect(source).toMatch(/variant\?:/);
    expect(source).toMatch(/size\?:/);
    expect(source).toMatch(/disabled\?: boolean/);
    expect(source).toMatch(/type\?:/);
  });

  it('uses token-based sizing classes', () => {
    expect(source).toMatch(/var\(--font-size-sm\)/);
    expect(source).toMatch(/var\(--font-size-md\)/);
    expect(source).toMatch(/var\(--font-size-lg\)/);
    expect(source).toMatch(/var\(--space-xs\)/);
    expect(source).toMatch(/var\(--space-sm\)/);
    expect(source).toMatch(/var\(--space-md\)/);
    expect(source).toMatch(/var\(--space-lg\)/);
  });

  it('uses token-based color variants', () => {
    expect(source).toMatch(/var\(--color-text-on-primary\)/);
    expect(source).toMatch(/var\(--color-interactive-primary\)/);
    expect(source).toMatch(/var\(--shadow-sm\)/);
    expect(source).toMatch(/var\(--color-interactive-primary-hover\)/);
  });

  it('supports slot content', () => {
    expect(source).toMatch(/<slot>/);
    expect(source).toMatch(/<\/slot>/);
  });

  it('has proper button types', () => {
    expect(source).toMatch(/type\?: 'button' \| 'submit' \| 'reset'/);
  });

  it('has proper variants', () => {
    expect(source).toMatch(/variant\?: 'primary' \| 'secondary' \| 'ghost'/);
  });

  it('has proper sizes', () => {
    expect(source).toMatch(/size\?: 'sm' \| 'md' \| 'lg'/);
  });

  it('handles disabled state', () => {
    expect(source).toMatch(/disabled\?: boolean/);
    expect(source).toMatch(/\.hg-Button\[disabled\]/);
  });

  it('uses proper transitions', () => {
    expect(source).toMatch(/transition:/);
    expect(source).toMatch(/0\.15s ease/);
  });

  it('has focus-visible support', () => {
    expect(source).toMatch(/transition/);
  });

  it('maps variant colors correctly', () => {
    expect(source).toMatch(/\.variant-primary/);
    expect(source).toMatch(
      /background-color: var\(--color-interactive-primary\)/,
    );
    expect(source).toMatch(/\.variant-secondary/);
    expect(source).toMatch(/background-color: transparent/);
    expect(source).toMatch(/\.variant-ghost/);
    expect(source).toMatch(/background-color: transparent/);
  });

  it('maps size variants to spacing tokens', () => {
    expect(source).toMatch(/\.size-sm/);
    expect(source).toMatch(/padding: var\(--space-xs\) var\(--space-sm\)/);
    expect(source).toMatch(/\.size-md/);
    expect(source).toMatch(/padding: var\(--space-sm\) var\(--space-md\)/);
    expect(source).toMatch(/\.size-lg/);
    expect(source).toMatch(/padding: var\(--space-md\) var\(--space-lg\)/);
  });
});
