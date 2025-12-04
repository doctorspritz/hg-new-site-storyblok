import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Divider.astro', 'utf8');

describe('Divider source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--space-lg\)/);
    expect(source).toMatch(/var\(--border-width-sm\)/);
    expect(source).toMatch(/var\(--border-width-md\)/);
    expect(source).toMatch(/var\(--border-width-lg\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/export interface Props/);
    expect(source).toMatch(/orientation\?:/);
    expect(source).toMatch(/thickness\?:/);
    expect(source).toMatch(/variant\?:/);
    expect(source).toMatch(/class\?: string/);
  });

  it('has proper orientation variants', () => {
    expect(source).toMatch(/orientation\?: 'horizontal' \| 'vertical'/);
  });

  it('has proper thickness variants', () => {
    expect(source).toMatch(/thickness\?: 'thin' \| 'medium' \| 'thick'/);
  });

  it('has proper color variants', () => {
    expect(source).toMatch(/variant\?: 'default' \| 'subtle' \| 'focus'/);
  });

  it('uses token-based colors', () => {
    expect(source).toMatch(/var\(--color-border-default\)/);
    expect(source).toMatch(/var\(--color-border-subtle\)/);
    expect(source).toMatch(/var\(--color-border-focus\)/);
  });

  it('builds CSS classes dynamically', () => {
    expect(source).toMatch(/dividerClasses/);
    expect(source).toMatch(/filter\(Boolean\)/);
  });

  it('has proper default values', () => {
    expect(source).toMatch(/orientation = 'horizontal'/);
    expect(source).toMatch(/thickness = 'thin'/);
    expect(source).toMatch(/variant = 'default'/);
    expect(source).toMatch(/className = ''/);
  });

  it('uses semantic HTML', () => {
    expect(source).toMatch(/<hr/);
  });

  it('handles horizontal orientation', () => {
    expect(source).toMatch(/\.hg-divider--horizontal/);
    expect(source).toMatch(/width: 100%/);
    expect(source).toMatch(/height: 0/);
    expect(source).toMatch(/border-top-style: solid/);
  });

  it('handles vertical orientation', () => {
    expect(source).toMatch(/\.hg-divider--vertical/);
    expect(source).toMatch(/display: inline-block/);
    expect(source).toMatch(/width: 0/);
    expect(source).toMatch(/border-left-style: solid/);
  });

  it('applies thickness variants correctly', () => {
    expect(source).toMatch(/\.hg-divider--thin\.hg-divider--horizontal/);
    expect(source).toMatch(/\.hg-divider--thin\.hg-divider--vertical/);
    expect(source).toMatch(/\.hg-divider--medium\.hg-divider--horizontal/);
    expect(source).toMatch(/\.hg-divider--medium\.hg-divider--vertical/);
    expect(source).toMatch(/\.hg-divider--thick\.hg-divider--horizontal/);
    expect(source).toMatch(/\.hg-divider--thick\.hg-divider--vertical/);
  });

  it('applies color variants correctly', () => {
    expect(source).toMatch(/\.hg-divider--default\.hg-divider--horizontal/);
    expect(source).toMatch(/\.hg-divider--default\.hg-divider--vertical/);
    expect(source).toMatch(/\.hg-divider--subtle\.hg-divider--horizontal/);
    expect(source).toMatch(/\.hg-divider--subtle\.hg-divider--vertical/);
    expect(source).toMatch(/\.hg-divider--focus\.hg-divider--horizontal/);
    expect(source).toMatch(/\.hg-divider--focus\.hg-divider--vertical/);
  });
});
