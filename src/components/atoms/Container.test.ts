import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Container.astro', 'utf8');

describe('Container source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--size-container-wide\)/);
    expect(source).toMatch(/var\(--size-container-content\)/);
    expect(source).toMatch(/var\(--size-container-narrow\)/);
    expect(source).toMatch(/var\(--size-container-grid\)/);
    expect(source).toMatch(/var\(--size-content-max-width-xl\)/);
    expect(source).toMatch(/var\(--space-md\)/);
    expect(source).toMatch(/var\(--space-sm\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/interface Props/);
    expect(source).toMatch(/maxWidth\?:/);
    expect(source).toMatch(/class\?: string/);
  });

  it('has proper size variants', () => {
    expect(source).toMatch(
      /maxWidth\?: 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| 'narrow' \| 'content' \| 'wide'/,
    );
  });

  it('supports slot content', () => {
    expect(source).toMatch(/<slot \/>/);
  });

  it('has responsive behavior', () => {
    expect(source).toMatch(/@media/);
    expect(source).toMatch(/width <= 48rem/);
  });

  it('uses proper CSS classes', () => {
    expect(source).toMatch(/\.hg-Container/);
    expect(source).toMatch(/max-width-\${maxWidth}/);
  });

  it('has proper default values', () => {
    expect(source).toMatch(/maxWidth = 'xl'/);
    expect(source).toMatch(/className = ''/);
  });

  it('builds class list dynamically', () => {
    expect(source).toMatch(/class:list/);
  });

  it('centers content horizontally', () => {
    expect(source).toMatch(/margin: 0 auto/);
  });

  it('applies padding consistently', () => {
    expect(source).toMatch(/padding: 0 var\(--space-md\)/);
    expect(source).toMatch(/padding: 0 var\(--space-sm\)/);
  });
});
