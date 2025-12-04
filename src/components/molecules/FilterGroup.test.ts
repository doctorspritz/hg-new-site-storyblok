import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync(
  'src/components/molecules/FilterGroup.astro',
  'utf8',
);

describe('FilterGroup source', () => {
  it('includes proper ARIA attributes', () => {
    expect(source).toMatch(/role="group"/);
    expect(source).toMatch(/aria-labelledby/);
    expect(source).toMatch(/aria-live="polite"/);
    expect(source).toMatch(/aria-live="assertive"/);
  });

  it('includes accessibility features', () => {
    expect(source).toMatch(/aria-pressed/);
    expect(source).toMatch(/role="alert"/);
  });

  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--color-/);
    expect(source).toMatch(/var\(--space-/);
    expect(source).toMatch(/var\(--font-/);
    expect(source).toMatch(/var\(--radius-/);
  });

  it('includes proper TypeScript interfaces', () => {
    expect(source).toMatch(/export interface FilterOption/);
    expect(source).toMatch(/export interface Props/);
  });

  it('handles all required props', () => {
    expect(source).toMatch(/name: string/);
    expect(source).toMatch(/options: FilterOption\[\]/);
    expect(source).toMatch(/selectedValues\?: string\[\]/);
  });

  it('includes variant and size support', () => {
    expect(source).toMatch(/variant\?: 'default' \| 'compact'/);
    expect(source).toMatch(/size\?: 'sm' \| 'md' \| 'lg'/);
  });

  it('includes error and helper text support', () => {
    expect(source).toMatch(/error\?: string/);
    expect(source).toMatch(/helperText\?: string/);
  });

  it('generates unique IDs for accessibility', () => {
    expect(source).toMatch(/filter-group-\${name}/);
    expect(source).toMatch(/options\.map/);
  });
});
