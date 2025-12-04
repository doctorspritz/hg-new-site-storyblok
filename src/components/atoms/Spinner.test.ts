import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Spinner.astro', 'utf8');

describe('Spinner source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--radius-pill\)/);
    expect(source).toMatch(/var\(--space-sm\)/);
    expect(source).toMatch(/var\(--space-md\)/);
    expect(source).toMatch(/var\(--space-lg\)/);
    expect(source).toMatch(/var\(--border-width-sm\)/);
    expect(source).toMatch(/var\(--border-width-md\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/interface Props/);
    expect(source).toMatch(/size\?:/);
    expect(source).toMatch(/variant\?:/);
    expect(source).toMatch(/ariaLabel\?: string/);
  });

  it('uses token-based colors', () => {
    expect(source).toMatch(/var\(--color-interactive-primary\)/);
    expect(source).toMatch(/var\(--color-background-body\)/);
    expect(source).toMatch(/var\(--color-text-inverse\)/);
    expect(source).toMatch(/var\(--color-background-primary\)/);
  });

  it('has proper size variants', () => {
    expect(source).toMatch(/size\?: 'sm' \| 'md' \| 'lg'/);
  });

  it('has proper variant options', () => {
    expect(source).toMatch(/variant\?: 'primary' \| 'inverse'/);
  });

  it('has proper default values', () => {
    expect(source).toMatch(/size = 'md'/);
    expect(source).toMatch(/variant = 'primary'/);
  });

  it('builds CSS classes dynamically', () => {
    expect(source).toMatch(/class:list/);
    expect(source).toMatch(/size-\${size}/);
    expect(source).toMatch(/variant-\${variant}/);
  });

  it('uses semantic HTML div tag', () => {
    expect(source).toMatch(/<div/);
    expect(source).toMatch(/<\/div>/);
  });

  it('has proper accessibility attributes', () => {
    expect(source).toMatch(/role: 'status'/);
    expect(source).toMatch(/aria-label/);
    expect(source).toMatch(/aria-hidden/);
  });

  it('handles accessibility props conditionally', () => {
    expect(source).toMatch(/a11yProps/);
    expect(source).toMatch(/ariaLabel/);
    expect(source).toMatch(/role: 'status'/);
    expect(source).toMatch(/'aria-label': ariaLabel/);
  });

  it('maps size variants to spacing tokens', () => {
    expect(source).toMatch(/\.size-sm/);
    expect(source).toMatch(/width: var\(--space-sm\)/);
    expect(source).toMatch(/height: var\(--space-sm\)/);
    expect(source).toMatch(/\.size-md/);
    expect(source).toMatch(/width: var\(--space-md\)/);
    expect(source).toMatch(/height: var\(--space-md\)/);
    expect(source).toMatch(/\.size-lg/);
    expect(source).toMatch(/width: var\(--space-lg\)/);
    expect(source).toMatch(/height: var\(--space-lg\)/);
  });

  it('maps size variants to border width tokens', () => {
    expect(source).toMatch(/\.size-sm/);
    expect(source).toMatch(/border-width: var\(--border-width-sm\)/);
    expect(source).toMatch(/\.size-md/);
    expect(source).toMatch(/border-width: var\(--border-width-md\)/);
    expect(source).toMatch(/\.size-lg/);
    expect(source).toMatch(/border-width: var\(--border-width-md\)/);
  });

  it('has proper CSS properties', () => {
    expect(source).toMatch(/border-radius:/);
    expect(source).toMatch(/border-style: solid/);
    expect(source).toMatch(/animation:/);
  });

  it('uses proper animation', () => {
    expect(source).toMatch(/var\(--transition-duration-base\)/);
    expect(source).toMatch(/linear infinite/);
    expect(source).toMatch(/@keyframes spin/);
    expect(source).toMatch(/transform: rotate\(360deg\)/);
  });

  it('includes reduced motion support', () => {
    expect(source).toMatch(/@media \(prefers-reduced-motion: reduce\)/);
    expect(source).toMatch(/animation: none/);
  });

  it('maps variant colors correctly', () => {
    expect(source).toMatch(/\.variant-primary/);
    expect(source).toMatch(/border-color: var\(--color-interactive-primary\)/);
    expect(source).toMatch(/border-top-color: var\(--color-background-body\)/);
    expect(source).toMatch(/\.variant-inverse/);
    expect(source).toMatch(/border-color: var\(--color-text-inverse\)/);
    expect(source).toMatch(
      /border-top-color: var\(--color-background-primary\)/,
    );
  });

  it('has proper JSDoc documentation', () => {
    expect(source).toMatch(/Atom: Spinner/);
    expect(source).toMatch(
      /Loading indicator component with accessible labeling/,
    );
  });

  it('follows accessibility best practices', () => {
    expect(source).toMatch(/role: 'status'/);
    expect(source).toMatch(/aria-label/);
    expect(source).toMatch(/aria-hidden/);
  });

  it('handles animation gracefully', () => {
    expect(source).toMatch(/@keyframes spin/);
    expect(source).toMatch(/prefers-reduced-motion/);
  });

  it('uses proper border styling', () => {
    expect(source).toMatch(/border-style: solid/);
    expect(source).toMatch(/border-width:/);
    expect(source).toMatch(/border-color:/);
  });
});
