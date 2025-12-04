import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Select.astro', 'utf8');

describe('Select source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--color-text-body\)/);
    expect(source).toMatch(/var\(--color-background-body\)/);
    expect(source).toMatch(/var\(--color-border-default\)/);
    expect(source).toMatch(/var\(--color-border-focus\)/);
    expect(source).toMatch(/var\(--color-interactive-disabled\)/);
    expect(source).toMatch(/var\(--color-text-subtle\)/);
    expect(source).toMatch(/var\(--color-feedback-error\)/);
  });

  it('has proper TypeScript interfaces', () => {
    expect(source).toMatch(/interface Option/);
    expect(source).toMatch(/interface Props/);
    expect(source).toMatch(/label: string/);
    expect(source).toMatch(/value: string/);
    expect(source).toMatch(/disabled\?: boolean/);
  });

  it('uses token-based sizing classes', () => {
    expect(source).toMatch(/var\(--font-size-sm\)/);
    expect(source).toMatch(/var\(--font-size-md\)/);
    expect(source).toMatch(/var\(--font-size-lg\)/);
    expect(source).toMatch(/var\(--space-xs\)/);
    expect(source).toMatch(/var\(--space-sm\)/);
    expect(source).toMatch(/var\(--space-md\)/);
    expect(source).toMatch(/var\(--space-lg\)/);
    expect(source).toMatch(/var\(--space-xl\)/);
  });

  it('has proper size variants', () => {
    expect(source).toMatch(/size\?: 'sm' \| 'md' \| 'lg'/);
  });

  it('has proper variant options', () => {
    expect(source).toMatch(/variant\?: 'border' \| 'no-border'/);
  });

  it('has proper default values', () => {
    expect(source).toMatch(/options = \[\]/);
    expect(source).toMatch(/size = 'md'/);
    expect(source).toMatch(/variant = 'border'/);
    expect(source).toMatch(/disabled = false/);
    expect(source).toMatch(/required = false/);
    expect(source).toMatch(/invalid = false/);
  });

  it('builds CSS classes dynamically', () => {
    expect(source).toMatch(/class:list/);
    expect(source).toMatch(/size-\${size}/);
    expect(source).toMatch(/variant-\${variant}/);
  });

  it('uses semantic HTML select tag', () => {
    expect(source).toMatch(/<select/);
    expect(source).toMatch(/<\/select>/);
    expect(source).toMatch(/<option/);
  });

  it('has proper accessibility attributes', () => {
    expect(source).toMatch(/aria-invalid/);
    expect(source).toMatch(/aria-hidden="true"/);
  });

  it('generates computed IDs', () => {
    expect(source).toMatch(/computedId/);
    expect(source).toMatch(/id \?\? name \?\? 'select'/);
  });

  it('handles placeholder option', () => {
    expect(source).toMatch(/placeholder &&/);
    expect(source).toMatch(/value=""/);
    expect(source).toMatch(/disabled/);
    expect(source).toMatch(/hidden/);
  });

  it('maps options dynamically', () => {
    expect(source).toMatch(/options\.map/);
    expect(source).toMatch(/opt\.value/);
    expect(source).toMatch(/opt\.label/);
    expect(source).toMatch(/opt\.disabled/);
  });

  it('handles disabled state', () => {
    expect(source).toMatch(/disabled={disabled}/);
    expect(source).toMatch(/cursor: not-allowed/);
  });

  it('handles invalid state', () => {
    expect(source).toMatch(/\.is-invalid/);
    expect(source).toMatch(/border-color: var\(--color-feedback-error\)/);
  });

  it('includes all size variants', () => {
    expect(source).toMatch(/\.size-sm/);
    expect(source).toMatch(/\.size-md/);
    expect(source).toMatch(/\.size-lg/);
  });

  it('includes variant styling', () => {
    expect(source).toMatch(/\.variant-no-border/);
  });

  it('uses proper transitions', () => {
    expect(source).toMatch(/var\(--transition-duration-fast\)/);
    expect(source).toMatch(/var\(--transition-timing-function-ease\)/);
  });

  it('has proper CSS properties', () => {
    expect(source).toMatch(/position: relative/);
    expect(source).toMatch(/display: inline-block/);
    expect(source).toMatch(/width: 100%/);
    expect(source).toMatch(/appearance: none/);
    expect(source).toMatch(/outline: none/);
  });

  it('handles hover and focus states', () => {
    expect(source).toMatch(/:hover/);
    expect(source).toMatch(/:focus/);
  });

  it('positions icon correctly', () => {
    expect(source).toMatch(/\.icon/);
    expect(source).toMatch(/position: absolute/);
    expect(source).toMatch(/right: var\(--space-md\)/);
    expect(source).toMatch(/top: 50%/);
    expect(source).toMatch(/transform: translateY\(-50%\)/);
  });

  it('includes custom dropdown icon', () => {
    expect(source).toMatch(/<span class="icon" aria-hidden="true">▾<\/span>/);
  });

  it('handles rest props', () => {
    expect(source).toMatch(/\.\.\.rest/);
    expect(source).toMatch(/\{\.\.\.rest\}/);
  });

  it('has proper JSDoc documentation', () => {
    expect(source).toMatch(/Atom: Select/);
    expect(source).toMatch(/Styled native select element with size variants/);
  });

  it('follows accessibility best practices', () => {
    expect(source).toMatch(/aria-invalid/);
    expect(source).toMatch(/aria-hidden="true"/);
    expect(source).toMatch(/disabled/);
    expect(source).toMatch(/required/);
  });

  it('handles edge cases', () => {
    expect(source).toMatch(/value == null \|\| value === ''/);
  });
});
