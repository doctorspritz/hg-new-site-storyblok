import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Counter.astro', 'utf8');

describe('Counter source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--font-family-base\)/);
    expect(source).toMatch(/var\(--font-weight-bold\)/);
    expect(source).toMatch(/var\(--line-height-normal\)/);
    expect(source).toMatch(/var\(--color-text-heading\)/);
  });

  it('has proper TypeScript interfaces', () => {
    expect(source).toMatch(/export interface FormatOptions/);
    expect(source).toMatch(/export interface Props/);
    expect(source).toMatch(/value: number \| string/);
    expect(source).toMatch(/format\?: FormatOptions/);
    expect(source).toMatch(/animate\?: boolean/);
    expect(source).toMatch(/size\?:/);
    expect(source).toMatch(/class\?: string/);
  });

  it('uses token-based sizing classes', () => {
    expect(source).toMatch(/var\(--font-size-md\)/);
    expect(source).toMatch(/var\(--font-size-2xl\)/);
    expect(source).toMatch(/var\(--font-size-4xl\)/);
  });

  it('has proper size variants', () => {
    expect(source).toMatch(/size\?: 'sm' \| 'md' \| 'lg'/);
  });

  it('supports number formatting', () => {
    expect(source).toMatch(/Intl\.NumberFormat/);
    expect(source).toMatch(/notation:/);
    expect(source).toMatch(/compact/);
  });

  it('handles animation', () => {
    expect(source).toMatch(/animate\?: boolean/);
    expect(source).toMatch(/requestAnimationFrame/);
    expect(source).toMatch(/performance\.now/);
  });

  it('generates unique IDs', () => {
    expect(source).toMatch(/Math\.random/);
    expect(source).toMatch(/toString\(36\)/);
  });

  it('has proper accessibility', () => {
    expect(source).toMatch(/aria-label/);
  });

  it('uses data attributes for animation', () => {
    expect(source).toMatch(/data-value/);
    expect(source).toMatch(/data-prefix/);
    expect(source).toMatch(/data-suffix/);
    expect(source).toMatch(/data-decimals/);
    expect(source).toMatch(/data-compact/);
    expect(source).toMatch(/data-animate/);
  });

  it('handles format options', () => {
    expect(source).toMatch(/compact\?: boolean/);
    expect(source).toMatch(/prefix\?: string/);
    expect(source).toMatch(/suffix\?: string/);
    expect(source).toMatch(/decimals\?: number/);
  });

  it('has proper default values', () => {
    expect(source).toMatch(/animate = false/);
    expect(source).toMatch(/size = 'md'/);
    expect(source).toMatch(/className = ''/);
  });

  it('builds class list dynamically', () => {
    expect(source).toMatch(/counterClasses/);
    expect(source).toMatch(/filter\(Boolean\)/);
  });
});
