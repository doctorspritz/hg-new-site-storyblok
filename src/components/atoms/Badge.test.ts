import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Badge.astro', 'utf8');

describe('Badge source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--font-weight-semibold\)/);
    expect(source).toMatch(/var\(--line-height-normal\)/);
    expect(source).toMatch(/var\(--radius-md\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/export interface Props/);
    expect(source).toMatch(/text\?: string/);
    expect(source).toMatch(/size\?:/);
    expect(source).toMatch(/variant\?:/);
    expect(source).toMatch(/class\?: string/);
  });

  it('uses token-based sizing classes', () => {
    expect(source).toMatch(/var\(--font-size-xs\)/);
    expect(source).toMatch(/var\(--font-size-sm\)/);
    expect(source).toMatch(/var\(--font-size-md\)/);
    expect(source).toMatch(/var\(--space-xs\)/);
    expect(source).toMatch(/var\(--space-sm\)/);
    expect(source).toMatch(/var\(--space-md\)/);
  });

  it('uses token-based color variants', () => {
    expect(source).toMatch(/var\(--color-surface\)/);
    expect(source).toMatch(/var\(--color-text-body\)/);
    expect(source).toMatch(/var\(--color-interactive-primary\)/);
    expect(source).toMatch(/var\(--color-border-subtle\)/);
    expect(source).toMatch(/var\(--color-feedback-success\)/);
    expect(source).toMatch(/var\(--color-text-inverse\)/);
  });

  it('supports slot content', () => {
    expect(source).toMatch(/<slot>/);
    expect(source).toMatch(/<\/slot>/);
  });

  it('builds CSS classes dynamically', () => {
    expect(source).toMatch(/badgeClasses/);
    expect(source).toMatch(/filter\(Boolean\)/);
  });

  it('has proper size variants', () => {
    expect(source).toMatch(/size\?: 'sm' \| 'md' \| 'lg'/);
  });

  it('has proper color variants', () => {
    expect(source).toMatch(
      /variant\?: 'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info'/,
    );
  });
});
