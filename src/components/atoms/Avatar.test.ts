import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Avatar.astro', 'utf8');

describe('Avatar source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--color-background-surface\)/);
    expect(source).toMatch(/var\(--color-text-heading\)/);
    expect(source).toMatch(/var\(--border-width-sm\)/);
    expect(source).toMatch(/var\(--color-border-subtle\)/);
  });

  it('has proper accessibility attributes', () => {
    expect(source).toMatch(/aria-label/);
  });

  it('uses token-based sizing classes', () => {
    expect(source).toMatch(/var\(--size-icon-sm\)/);
    expect(source).toMatch(/var\(--size-icon-md\)/);
    expect(source).toMatch(/var\(--size-icon-lg\)/);
    expect(source).toMatch(/var\(--size-icon-lg\)/);
  });

  it('uses token-based typography', () => {
    expect(source).toMatch(/var\(--font-size-sm\)/);
    expect(source).toMatch(/var\(--font-size-md\)/);
    expect(source).toMatch(/var\(--font-size-lg\)/);
    expect(source).toMatch(/var\(--font-size-xl\)/);
    expect(source).toMatch(/var\(--font-weight-bold\)/);
  });

  it('uses token-based spacing and radius', () => {
    expect(source).toMatch(/var\(--size-icon-sm\)/);
    expect(source).toMatch(/var\(--size-icon-md\)/);
    expect(source).toMatch(/var\(--size-icon-lg\)/);
    expect(source).toMatch(/var\(--radius-pill\)/);
    expect(source).toMatch(/var\(--radius-md\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/interface Props/);
    expect(source).toMatch(/src\?: string/);
    expect(source).toMatch(/alt\?: string/);
    expect(source).toMatch(/name\?: string/);
    expect(source).toMatch(/size\?:/);
    expect(source).toMatch(/shape\?:/);
  });

  it('handles both image and initials fallback', () => {
    expect(source).toMatch(/src \?/);
    expect(source).toMatch(/initials/);
  });

  it('generates initials from name', () => {
    expect(source).toMatch(/getInitials/);
    expect(source).toMatch(/toUpperCase/);
  });
});
