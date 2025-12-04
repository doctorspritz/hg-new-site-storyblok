import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Link.astro', 'utf8');

describe('Link source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--color-text-link\)/);
    expect(source).toMatch(/var\(--color-text-link-hover\)/);
    expect(source).toMatch(/var\(--color-text-subtle\)/);
    expect(source).toMatch(/var\(--transition-duration-fast\)/);
    expect(source).toMatch(/var\(--transition-timing-function-ease\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/interface Props/);
    expect(source).toMatch(/href\?: string/);
    expect(source).toMatch(/label\?: string/);
    expect(source).toMatch(/variant\?:/);
    expect(source).toMatch(/underline\?:/);
    expect(source).toMatch(/external\?: boolean/);
    expect(source).toMatch(/rel\?: string/);
    expect(source).toMatch(/target\?:/);
    expect(source).toMatch(/ariaLabel\?: string/);
  });

  it('has proper variant options', () => {
    expect(source).toMatch(/variant\?: 'default' \| 'subtle'/);
  });

  it('has proper underline options', () => {
    expect(source).toMatch(/underline\?: 'always' \| 'hover' \| 'none'/);
  });

  it('has proper target options', () => {
    expect(source).toMatch(
      /target\?: '_self' \| '_blank' \| '_parent' \| '_top'/,
    );
  });

  it('has proper default values', () => {
    expect(source).toMatch(/href = '#'/);
    expect(source).toMatch(/label = ''/);
    expect(source).toMatch(/variant = 'default'/);
    expect(source).toMatch(/underline = 'always'/);
    expect(source).toMatch(/external = false/);
  });

  it('builds CSS classes dynamically', () => {
    expect(source).toMatch(/class:list/);
    expect(source).toMatch(/variant-\${variant}/);
    expect(source).toMatch(/underline-\${underline}/);
  });

  it('supports slot content', () => {
    expect(source).toMatch(/<slot>/);
    expect(source).toMatch(/<\/slot>/);
  });

  it('uses semantic HTML anchor tag', () => {
    expect(source).toMatch(/<a/);
    expect(source).toMatch(/href=/);
    expect(source).toMatch(/rel=/);
    expect(source).toMatch(/target=/);
  });

  it('handles external links properly', () => {
    expect(source).toMatch(/computedRel/);
    expect(source).toMatch(/computedTarget/);
    expect(source).toMatch(/noopener noreferrer/);
    expect(source).toMatch(/_blank/);
  });

  it('has proper accessibility attributes', () => {
    expect(source).toMatch(/aria-label/);
  });

  it('includes hover states', () => {
    expect(source).toMatch(/:hover/);
  });

  it('has proper transitions', () => {
    expect(source).toMatch(/transition:/);
    expect(source).toMatch(/color var\(--transition-duration-fast\)/);
  });

  it('includes all variant styles', () => {
    expect(source).toMatch(/\.variant-subtle/);
    expect(source).toMatch(/\.variant-subtle:hover/);
  });

  it('includes all underline styles', () => {
    expect(source).toMatch(/\.underline-always/);
    expect(source).toMatch(/\.underline-hover/);
    expect(source).toMatch(/\.underline-hover:hover/);
    expect(source).toMatch(/\.underline-none/);
  });

  it('maps variants to color tokens', () => {
    expect(source).toMatch(/\.variant-subtle/);
    expect(source).toMatch(/color: var\(--color-text-subtle\)/);
    expect(source).toMatch(/\.variant-subtle:hover/);
    expect(source).toMatch(/color: var\(--color-text-link\)/);
  });

  it('has proper CSS properties', () => {
    expect(source).toMatch(/color:/);
    expect(source).toMatch(/text-decoration:/);
  });

  it('handles computed attributes', () => {
    expect(source).toMatch(/computedRel = rel \?\?/);
    expect(source).toMatch(/computedTarget = target \?\?/);
  });

  it('has proper JSDoc documentation', () => {
    expect(source).toMatch(/Atom: Link/);
    expect(source).toMatch(/Accessible anchor with token-driven styles/);
  });
});
