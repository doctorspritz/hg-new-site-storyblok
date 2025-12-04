import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/ProgressBar.astro', 'utf8');

describe('ProgressBar source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--color-background-surface\)/);
    expect(source).toMatch(/var\(--color-interactive-primary\)/);
    expect(source).toMatch(/var\(--radius-pill\)/);
    expect(source).toMatch(/var\(--space-xs\)/);
    expect(source).toMatch(/var\(--space-sm\)/);
    expect(source).toMatch(/var\(--space-md\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/export interface Props/);
    expect(source).toMatch(/value: number/);
    expect(source).toMatch(/label\?: string/);
    expect(source).toMatch(/size\?:/);
    expect(source).toMatch(/class\?: string/);
  });

  it('uses token-based sizing classes', () => {
    expect(source).toMatch(/\.size-sm/);
    expect(source).toMatch(/\.size-md/);
    expect(source).toMatch(/\.size-lg/);
  });

  it('has proper size variants', () => {
    expect(source).toMatch(/size\?: 'sm' \| 'md' \| 'lg'/);
  });

  it('has proper default values', () => {
    expect(source).toMatch(/value = 50/);
    expect(source).toMatch(/size = 'md'/);
    expect(source).toMatch(/className = ''/);
  });

  it('builds CSS classes dynamically', () => {
    expect(source).toMatch(/class:list/);
    expect(source).toMatch(/size-\${size}/);
  });

  it('supports slot content', () => {
    expect(source).toMatch(/<span id=/);
    expect(source).toMatch(/class="sr-only"/);
  });

  it('uses semantic HTML structure', () => {
    expect(source).toMatch(/<div/);
    expect(source).toMatch(/role="progressbar"/);
  });

  it('has proper accessibility attributes', () => {
    expect(source).toMatch(/aria-valuenow/);
    expect(source).toMatch(/aria-valuemin="0"/);
    expect(source).toMatch(/aria-valuemax="100"/);
    expect(source).toMatch(/aria-labelledby/);
  });

  it('clamps progress value', () => {
    expect(source).toMatch(/Math\.max\(0, Math\.min\(100, value\)\)/);
    expect(source).toMatch(/clamped/);
  });

  it('generates unique label IDs', () => {
    expect(source).toMatch(/labelId/);
    expect(source).toMatch(/Math\.random/);
    expect(source).toMatch(/toString\(36\)/);
  });

  it('handles label conditionally', () => {
    expect(source).toMatch(/label \?/);
    expect(source).toMatch(/labelId : undefined/);
  });

  it('includes all size variants', () => {
    expect(source).toMatch(/\.size-sm .track/);
    expect(source).toMatch(/\.size-md .track/);
    expect(source).toMatch(/\.size-lg .track/);
  });

  it('maps size variants to spacing tokens', () => {
    expect(source).toMatch(/\.size-sm/);
    expect(source).toMatch(/height: var\(--space-xs\)/);
    expect(source).toMatch(/\.size-md/);
    expect(source).toMatch(/height: var\(--space-sm\)/);
    expect(source).toMatch(/\.size-lg/);
    expect(source).toMatch(/height: var\(--space-md\)/);
  });

  it('has proper CSS properties', () => {
    expect(source).toMatch(/width: 100%/);
    expect(source).toMatch(/height: 100%/);
    expect(source).toMatch(/background-color:/);
    expect(source).toMatch(/border-radius:/);
    expect(source).toMatch(/overflow: hidden/);
  });

  it('uses proper transitions', () => {
    expect(source).toMatch(/var\(--transition-duration-base\)/);
    expect(source).toMatch(/var\(--transition-timing-function-ease\)/);
  });

  it('applies progress width dynamically', () => {
    expect(source).toMatch(/style=\{`width:\${clamped}%`\}/);
  });

  it('has proper JSDoc documentation', () => {
    expect(source).toMatch(/Atom: ProgressBar/);
    expect(source).toMatch(/Accessible progress indicator using design tokens/);
  });

  it('follows accessibility best practices', () => {
    expect(source).toMatch(/role="progressbar"/);
    expect(source).toMatch(/aria-valuenow/);
    expect(source).toMatch(/aria-valuemin/);
    expect(source).toMatch(/aria-valuemax/);
    expect(source).toMatch(/aria-labelledby/);
  });

  it('handles edge cases', () => {
    expect(source).toMatch(/Math\.max\(0, Math\.min\(100, value\)\)/);
  });
});
