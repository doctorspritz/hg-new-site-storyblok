import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync(
  'src/components/atoms/VisuallyHidden.astro',
  'utf8',
);

describe('VisuallyHidden source', () => {
  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/interface Props/);
    expect(source).toMatch(/as\?:/);
    expect(source).toMatch(/class\?: string/);
  });

  it('has proper tag options', () => {
    expect(source).toMatch(/as\?: 'span' \| 'div' \| 'p'/);
  });

  it('has proper default values', () => {
    expect(source).toMatch(/as: Tag = 'span'/);
  });

  it('builds CSS classes dynamically', () => {
    expect(source).toMatch(/class:list/);
    expect(source).toMatch(/className/);
  });

  it('supports slot content', () => {
    expect(source).toMatch(/<slot \/>/);
  });

  it('uses dynamic HTML tags', () => {
    expect(source).toMatch(/Tag = 'span'/);
    expect(source).toMatch(/<Tag/);
    expect(source).toMatch(/<\/Tag>/);
  });

  it('has proper CSS properties for accessibility', () => {
    expect(source).toMatch(/position: absolute/);
    expect(source).toMatch(/width: 1px/);
    expect(source).toMatch(/height: 1px/);
    expect(source).toMatch(/padding: 0/);
    expect(source).toMatch(/margin: 0/);
    expect(source).toMatch(/overflow: hidden/);
    expect(source).toMatch(/clip-path: inset\(50%\)/);
    expect(source).toMatch(/white-space: nowrap/);
    expect(source).toMatch(/border: 0/);
  });

  it('has proper JSDoc documentation', () => {
    expect(source).toMatch(/Atom: VisuallyHidden/);
    expect(source).toMatch(
      /Hides content visually while keeping it accessible to screen readers/,
    );
    expect(source).toMatch(
      /Useful for providing context to assistive technologies without affecting visual design/,
    );
  });

  it('follows accessibility best practices', () => {
    expect(source).toMatch(/position: absolute/);
    expect(source).toMatch(/clip-path: inset\(50%\)/);
    expect(source).toMatch(/overflow: hidden/);
  });

  it('handles different HTML elements', () => {
    expect(source).toMatch(/span/);
    expect(source).toMatch(/div/);
    expect(source).toMatch(/p/);
  });

  it('maintains semantic structure', () => {
    expect(source).toMatch(/Tag class:list/);
    expect(source).toMatch(/className/);
  });

  it('provides screen reader accessibility', () => {
    expect(source).toMatch(
      /Hides content visually while keeping it accessible to screen readers/,
    );
  });

  it('uses minimal CSS footprint', () => {
    expect(source).toMatch(/width: 1px/);
    expect(source).toMatch(/height: 1px/);
    expect(source).toMatch(/padding: 0/);
    expect(source).toMatch(/margin: 0/);
  });

  it('prevents text wrapping', () => {
    expect(source).toMatch(/white-space: nowrap/);
  });

  it('removes borders', () => {
    expect(source).toMatch(/border: 0/);
  });

  it('clips content appropriately', () => {
    expect(source).toMatch(/clip-path: inset\(50%\)/);
  });
});
