import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Image.astro', 'utf8');

describe('Image source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--radius-sm\)/);
    expect(source).toMatch(/var\(--radius-md\)/);
    expect(source).toMatch(/var\(--radius-lg\)/);
    expect(source).toMatch(/var\(--radius-pill\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/export interface Props/);
    expect(source).toMatch(/src: string/);
    expect(source).toMatch(/alt: string/);
    expect(source).toMatch(/width\?: string \| number/);
    expect(source).toMatch(/height\?: string \| number/);
    expect(source).toMatch(/loading\?:/);
    expect(source).toMatch(/objectFit\?:/);
    expect(source).toMatch(/radius\?:/);
    expect(source).toMatch(/class\?: string/);
  });

  it('has proper loading variants', () => {
    expect(source).toMatch(/loading\?: 'lazy' \| 'eager'/);
  });

  it('has proper object-fit variants', () => {
    expect(source).toMatch(
      /objectFit\?: 'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down'/,
    );
  });

  it('has proper radius variants', () => {
    expect(source).toMatch(
      /radius\?: 'none' \| 'sm' \| 'md' \| 'lg' \| 'full'/,
    );
  });

  it('has proper default values', () => {
    expect(source).toMatch(/loading = 'lazy'/);
    expect(source).toMatch(/objectFit = 'cover'/);
    expect(source).toMatch(/radius = 'sm'/);
    expect(source).toMatch(/className = ''/);
  });

  it('builds CSS classes dynamically', () => {
    expect(source).toMatch(/imageClasses/);
    expect(source).toMatch(/filter\(Boolean\)/);
  });

  it('uses semantic HTML img tag', () => {
    expect(source).toMatch(/<img/);
    expect(source).toMatch(/src=/);
    expect(source).toMatch(/alt=/);
    expect(source).toMatch(/width=/);
    expect(source).toMatch(/height=/);
    expect(source).toMatch(/loading=/);
  });

  it('has proper CSS properties', () => {
    expect(source).toMatch(/display: block/);
    expect(source).toMatch(/max-width: 100%/);
    expect(source).toMatch(/height: auto/);
  });

  it('includes all radius variants', () => {
    expect(source).toMatch(/\.hg-image--radius-none/);
    expect(source).toMatch(/\.hg-image--radius-sm/);
    expect(source).toMatch(/\.hg-image--radius-md/);
    expect(source).toMatch(/\.hg-image--radius-lg/);
    expect(source).toMatch(/\.hg-image--radius-pill/);
  });

  it('includes all object-fit variants', () => {
    expect(source).toMatch(/\.hg-image--fit-cover/);
    expect(source).toMatch(/\.hg-image--fit-contain/);
    expect(source).toMatch(/\.hg-image--fit-fill/);
    expect(source).toMatch(/\.hg-image--fit-none/);
    expect(source).toMatch(/\.hg-image--fit-scale-down/);
  });

  it('maps radius variants to design tokens', () => {
    expect(source).toMatch(/border-radius: var\(--radius-sm\)/);
    expect(source).toMatch(/border-radius: var\(--radius-md\)/);
    expect(source).toMatch(/border-radius: var\(--radius-lg\)/);
    expect(source).toMatch(/border-radius: var\(--radius-pill\)/);
  });

  it('has proper object-fit CSS properties', () => {
    expect(source).toMatch(/object-fit: cover/);
    expect(source).toMatch(/object-fit: contain/);
    expect(source).toMatch(/object-fit: fill/);
    expect(source).toMatch(/object-fit: none/);
    expect(source).toMatch(/object-fit: scale-down/);
  });

  it('follows single responsibility principle', () => {
    expect(source).toMatch(/No slots, focused on single responsibility/);
  });

  it('has proper JSDoc documentation', () => {
    expect(source).toMatch(/Image Atom/);
    expect(source).toMatch(/Hunter Galloway Design System/);
    expect(source).toMatch(/Atomic Component/);
  });
});
