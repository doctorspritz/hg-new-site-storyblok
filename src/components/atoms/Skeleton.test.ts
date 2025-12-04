import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Skeleton.astro', 'utf8');

describe('Skeleton source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--color-border-subtle\)/);
    expect(source).toMatch(/var\(--color-border-default\)/);
    expect(source).toMatch(/var\(--radius-sm\)/);
    expect(source).toMatch(/var\(--radius-sm\)/);
    expect(source).toMatch(/var\(--radius-pill\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/interface Props/);
    expect(source).toMatch(/variant\?: 'text' \| 'rectangular' \| 'circular'/);
    expect(source).toMatch(/size\?: 'sm' \| 'md' \| 'lg'/);
    expect(source).toMatch(/width\?: string/);
    expect(source).toMatch(/height\?: string/);
    expect(source).toMatch(/class\?: string/);
  });

  it('uses token-based spacing for sizes', () => {
    expect(source).toMatch(/var\(--space-md\)/);
    expect(source).toMatch(/var\(--space-lg\)/);
    expect(source).toMatch(/var\(--space-xl\)/);
    expect(source).toMatch(/var\(--size-value-avatar-xl\)/);
  });

  it('uses token-based typography for text variant', () => {
    expect(source).toMatch(/var\(--line-height-normal\)/);
    expect(source).toMatch(/var\(--font-size-sm\)/);
    expect(source).toMatch(/var\(--font-size-md\)/);
    expect(source).toMatch(/var\(--font-size-lg\)/);
  });

  it('has proper accessibility attributes', () => {
    expect(source).toMatch(/role="img"/);
    expect(source).toMatch(/aria-label="Loading\.\.\."/);
  });

  it('has shimmer animation', () => {
    expect(source).toMatch(/animation: skeleton-shimmer/);
    expect(source).toMatch(/@keyframes skeleton-shimmer/);
    expect(source).toMatch(/background-size: 200% 100%/);
  });

  it('supports custom width and height', () => {
    expect(source).toMatch(/width\?: string/);
    expect(source).toMatch(/height\?: string/);
    expect(source).toMatch(/if \(width\) inlineStyles\.push/);
    expect(source).toMatch(/if \(height\) inlineStyles\.push/);
  });

  it('has proper variants', () => {
    expect(source).toMatch(/\.variant-text/);
    expect(source).toMatch(/\.variant-rectangular/);
    expect(source).toMatch(/\.variant-circular/);
  });

  it('has proper size variants', () => {
    expect(source).toMatch(/\.size-sm/);
    expect(source).toMatch(/\.size-md/);
    expect(source).toMatch(/\.size-lg/);
  });

  it('handles circular variant with aspect ratio', () => {
    expect(source).toMatch(/aspect-ratio: 1/);
    expect(source).toMatch(/border-radius: var\(--radius-pill\)/);
  });

  it('respects reduced motion preference', () => {
    expect(source).toMatch(/@media \(prefers-reduced-motion: reduce\)/);
    expect(source).toMatch(/animation: none/);
  });

  it('uses proper gradient for shimmer effect', () => {
    expect(source).toMatch(/linear-gradient\(/);
    expect(source).toMatch(/90deg/);
    expect(source).toMatch(/25%[\s\S]*50%[\s\S]*75%/);
  });

  it('has appropriate default values', () => {
    expect(source).toMatch(/variant = 'rectangular'/);
    expect(source).toMatch(/size = 'md'/);
  });
});
