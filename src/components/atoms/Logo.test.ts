import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Logo.astro', 'utf8');

describe('Logo source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--space-sm\)/);
    expect(source).toMatch(/var\(--space-md\)/);
    expect(source).toMatch(/var\(--space-lg\)/);
    expect(source).toMatch(/var\(--space-xl\)/);
    expect(source).toMatch(/var\(--color-text-heading\)/);
    expect(source).toMatch(/var\(--color-text-inverse\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/interface Props/);
    expect(source).toMatch(/href\?: string/);
    expect(source).toMatch(/src\?: string/);
    expect(source).toMatch(/alt\?: string/);
    expect(source).toMatch(/size\?:/);
    expect(source).toMatch(/variant\?:/);
  });

  it('has proper size variants', () => {
    expect(source).toMatch(/size\?: 'sm' \| 'md' \| 'lg' \| 'xl'/);
  });

  it('has proper variant options', () => {
    expect(source).toMatch(/variant\?: 'default' \| 'inverse'/);
  });

  it('has proper default values', () => {
    expect(source).toMatch(/alt = 'Hunter Galloway'/);
    expect(source).toMatch(/size = 'md'/);
    expect(source).toMatch(/variant = 'default'/);
  });

  it('builds CSS classes dynamically', () => {
    expect(source).toMatch(/class:list/);
    expect(source).toMatch(/size-\${size}/);
    expect(source).toMatch(/variant-\${variant}/);
  });

  it('supports slot content', () => {
    expect(source).toMatch(/<slot \/>/);
    expect(source).toMatch(/<slot>/);
    expect(source).toMatch(/<\/slot>/);
  });

  it('renders as link when href is provided', () => {
    expect(source).toMatch(/href \?/);
    expect(source).toMatch(/<a/);
    expect(source).toMatch(/aria-label/);
  });

  it('renders as span when no href is provided', () => {
    expect(source).toMatch(/<span/);
  });

  it('handles image source conditionally', () => {
    expect(source).toMatch(/src \?/);
    expect(source).toMatch(/<img/);
    expect(source).toMatch(/class="logo"/);
  });

  it('uses semantic HTML elements', () => {
    expect(source).toMatch(/<a/);
    expect(source).toMatch(/<span/);
    expect(source).toMatch(/<img/);
  });

  it('has proper accessibility attributes', () => {
    expect(source).toMatch(/aria-label/);
    expect(source).toMatch(/alt=/);
  });

  it('includes all size variants', () => {
    expect(source).toMatch(/\.size-sm/);
    expect(source).toMatch(/\.size-md/);
    expect(source).toMatch(/\.size-lg/);
    expect(source).toMatch(/\.size-xl/);
  });

  it('includes variant styling', () => {
    expect(source).toMatch(/\.variant-inverse/);
    expect(source).toMatch(/filter: invert/);
  });

  it('maps size variants to spacing tokens', () => {
    expect(source).toMatch(/\.size-sm/);
    expect(source).toMatch(/height: var\(--space-sm\)/);
    expect(source).toMatch(/\.size-md/);
    expect(source).toMatch(/height: var\(--space-md\)/);
    expect(source).toMatch(/\.size-lg/);
    expect(source).toMatch(/height: var\(--space-lg\)/);
    expect(source).toMatch(/\.size-xl/);
    expect(source).toMatch(/height: var\(--space-xl\)/);
  });

  it('has proper CSS properties', () => {
    expect(source).toMatch(/display: inline-flex/);
    expect(source).toMatch(/align-items: center/);
    expect(source).toMatch(/gap:/);
    expect(source).toMatch(/color:/);
  });

  it('handles logo image sizing', () => {
    expect(source).toMatch(/height: var\(--space-md\)/);
    expect(source).toMatch(/width: auto/);
    expect(source).toMatch(/display: block/);
  });

  it('removes text decoration for link variant', () => {
    expect(source).toMatch(/a\.hg-Logo/);
    expect(source).toMatch(/text-decoration: none/);
  });

  it('applies inverse filter for inverse variant', () => {
    expect(source).toMatch(/filter: invert\(1\) contrast\(1\.05\)/);
  });

  it('has proper JSDoc documentation', () => {
    expect(source).toMatch(/Atom: Logo/);
    expect(source).toMatch(/Displays the brand mark as an image or via slot/);
    expect(source).toMatch(/Supports size and inverse variants/);
  });

  it('handles conditional rendering', () => {
    expect(source).toMatch(/href \?/);
    expect(source).toMatch(/src \?/);
  });
});
