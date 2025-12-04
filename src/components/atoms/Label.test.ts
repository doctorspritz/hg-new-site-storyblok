import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Label.astro', 'utf8');

describe('Label source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--font-weight-bold\)/);
    expect(source).toMatch(/var\(--color-text-heading\)/);
    expect(source).toMatch(/var\(--color-text-inverse\)/);
    expect(source).toMatch(/var\(--font-size-sm\)/);
    expect(source).toMatch(/var\(--font-size-md\)/);
    expect(source).toMatch(/var\(--font-size-lg\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/interface Props/);
    expect(source).toMatch(/forId\?: string/);
    expect(source).toMatch(/text\?: string/);
    expect(source).toMatch(/required\?: boolean/);
    expect(source).toMatch(/size\?:/);
    expect(source).toMatch(/variant\?:/);
  });

  it('has proper size variants', () => {
    expect(source).toMatch(/size\?: 'sm' \| 'md' \| 'lg'/);
  });

  it('has proper variant options', () => {
    expect(source).toMatch(/variant\?: 'default' \| 'inverse'/);
  });

  it('has proper default values', () => {
    expect(source).toMatch(/text = ''/);
    expect(source).toMatch(/required = false/);
    expect(source).toMatch(/size = 'md'/);
    expect(source).toMatch(/variant = 'default'/);
  });

  it('builds CSS classes dynamically', () => {
    expect(source).toMatch(/class:list/);
    expect(source).toMatch(/size-\${size}/);
    expect(source).toMatch(/variant-\${variant}/);
  });

  it('supports slot content', () => {
    expect(source).toMatch(/<slot>/);
    expect(source).toMatch(/<\/slot>/);
  });

  it('handles required state', () => {
    expect(source).toMatch(/required \? ' \*'/);
    expect(source).toMatch(
      /required && <span class="sr-only"> required<\/span>/,
    );
  });

  it('uses semantic HTML label tag', () => {
    expect(source).toMatch(/<label/);
    expect(source).toMatch(/for=/);
  });

  it('includes accessibility features', () => {
    expect(source).toMatch(/sr-only/);
    expect(source).toMatch(/required/);
  });

  it('has proper CSS properties', () => {
    expect(source).toMatch(/display: inline-block/);
    expect(source).toMatch(/font-weight:/);
    expect(source).toMatch(/color:/);
  });

  it('includes size-specific styling', () => {
    expect(source).toMatch(/\.size-sm/);
    expect(source).toMatch(/\.size-md/);
    expect(source).toMatch(/\.size-lg/);
  });

  it('includes variant-specific styling', () => {
    expect(source).toMatch(/\.variant-inverse/);
  });

  it('maps size variants to font tokens', () => {
    expect(source).toMatch(/\.size-sm/);
    expect(source).toMatch(/font-size: var\(--font-size-sm\)/);
    expect(source).toMatch(/\.size-md/);
    expect(source).toMatch(/font-size: var\(--font-size-md\)/);
    expect(source).toMatch(/\.size-lg/);
    expect(source).toMatch(/font-size: var\(--font-size-lg\)/);
  });

  it('maps variant variants to color tokens', () => {
    expect(source).toMatch(/\.variant-inverse/);
    expect(source).toMatch(/color: var\(--color-text-inverse\)/);
  });

  it('has proper JSDoc documentation', () => {
    expect(source).toMatch(/Atom: Label/);
    expect(source).toMatch(/Semantic label text for form controls/);
  });

  it('references global sr-only utility', () => {
    expect(source).toMatch(/uses global \.sr-only utility/);
  });
});
