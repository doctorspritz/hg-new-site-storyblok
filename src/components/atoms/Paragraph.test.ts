import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Paragraph.astro', 'utf8');

describe('Paragraph source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--font-family-base\)/);
    expect(source).toMatch(/var\(--line-height-normal\)/);
    expect(source).toMatch(/var\(--font-size-sm\)/);
    expect(source).toMatch(/var\(--font-size-md\)/);
    expect(source).toMatch(/var\(--font-size-lg\)/);
    expect(source).toMatch(/var\(--font-weight-regular\)/);
    expect(source).toMatch(/var\(--font-weight-bold\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/export interface Props/);
    expect(source).toMatch(/size\?:/);
    expect(source).toMatch(/color\?:/);
    expect(source).toMatch(/weight\?:/);
    expect(source).toMatch(/class\?: string/);
  });

  it('uses token-based color variants', () => {
    expect(source).toMatch(/var\(--color-text-body\)/);
    expect(source).toMatch(/var\(--color-text-heading\)/);
    expect(source).toMatch(/var\(--color-text-subtle\)/);
    expect(source).toMatch(/var\(--color-text-inverse\)/);
    expect(source).toMatch(/var\(--color-text-link\)/);
  });

  it('has proper size variants', () => {
    expect(source).toMatch(/size\?: 'sm' \| 'md' \| 'lg'/);
  });

  it('has proper color variants', () => {
    expect(source).toMatch(
      /color\?: 'body' \| 'heading' \| 'subtle' \| 'inverse' \| 'link'/,
    );
  });

  it('has proper weight variants', () => {
    expect(source).toMatch(/weight\?: 'regular' \| 'bold'/);
  });

  it('has proper default values', () => {
    expect(source).toMatch(/size = 'md'/);
    expect(source).toMatch(/color = 'body'/);
    expect(source).toMatch(/weight = 'regular'/);
    expect(source).toMatch(/className = ''/);
  });

  it('builds CSS classes dynamically', () => {
    expect(source).toMatch(/paragraphClasses/);
    expect(source).toMatch(/filter\(Boolean\)/);
  });

  it('supports slot content', () => {
    expect(source).toMatch(/<slot \/>/);
  });

  it('uses semantic HTML paragraph tag', () => {
    expect(source).toMatch(/<p/);
    expect(source).toMatch(/<\/p>/);
  });

  it('includes all size variants', () => {
    expect(source).toMatch(/\.hg-paragraph--sm/);
    expect(source).toMatch(/\.hg-paragraph--md/);
    expect(source).toMatch(/\.hg-paragraph--lg/);
  });

  it('includes all weight variants', () => {
    expect(source).toMatch(/\.hg-paragraph--regular/);
    expect(source).toMatch(/\.hg-paragraph--bold/);
  });

  it('includes all color variants', () => {
    expect(source).toMatch(/\.hg-paragraph--body/);
    expect(source).toMatch(/\.hg-paragraph--heading/);
    expect(source).toMatch(/\.hg-paragraph--subtle/);
    expect(source).toMatch(/\.hg-paragraph--inverse/);
    expect(source).toMatch(/\.hg-paragraph--link/);
  });

  it('maps size variants to font tokens', () => {
    expect(source).toMatch(/\.hg-paragraph--sm/);
    expect(source).toMatch(/font-size: var\(--font-size-sm\)/);
    expect(source).toMatch(/\.hg-paragraph--md/);
    expect(source).toMatch(/font-size: var\(--font-size-md\)/);
    expect(source).toMatch(/\.hg-paragraph--lg/);
    expect(source).toMatch(/font-size: var\(--font-size-lg\)/);
  });

  it('maps weight variants to font tokens', () => {
    expect(source).toMatch(/\.hg-paragraph--regular/);
    expect(source).toMatch(/font-weight: var\(--font-weight-regular\)/);
    expect(source).toMatch(/\.hg-paragraph--bold/);
    expect(source).toMatch(/font-weight: var\(--font-weight-bold\)/);
  });

  it('maps color variants to color tokens', () => {
    expect(source).toMatch(/\.hg-paragraph--body/);
    expect(source).toMatch(/color: var\(--color-text-body\)/);
    expect(source).toMatch(/\.hg-paragraph--heading/);
    expect(source).toMatch(/color: var\(--color-text-heading\)/);
    expect(source).toMatch(/\.hg-paragraph--subtle/);
    expect(source).toMatch(/color: var\(--color-text-subtle\)/);
    expect(source).toMatch(/\.hg-paragraph--inverse/);
    expect(source).toMatch(/color: var\(--color-text-inverse\)/);
    expect(source).toMatch(/\.hg-paragraph--link/);
    expect(source).toMatch(/color: var\(--color-text-link\)/);
  });

  it('resets browser defaults', () => {
    expect(source).toMatch(/margin: 0/);
    expect(source).toMatch(/Reset browser defaults/);
  });

  it('has proper CSS properties', () => {
    expect(source).toMatch(/font-family:/);
    expect(source).toMatch(/line-height:/);
    expect(source).toMatch(/font-size:/);
    expect(source).toMatch(/font-weight:/);
    expect(source).toMatch(/color:/);
  });

  it('has proper JSDoc documentation', () => {
    expect(source).toMatch(/Paragraph Atom/);
    expect(source).toMatch(/Hunter Galloway Design System/);
    expect(source).toMatch(/Atomic Component/);
    expect(source).toMatch(
      /A self-contained paragraph component for body text/,
    );
    expect(source).toMatch(
      /Uses design tokens for all typography and color values/,
    );
  });

  it('follows single responsibility principle', () => {
    expect(source).toMatch(
      /A self-contained paragraph component for body text/,
    );
  });
});
