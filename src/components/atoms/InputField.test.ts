import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/InputField.astro', 'utf8');

describe('InputField source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--space-xs\)/);
    expect(source).toMatch(/var\(--space-sm\)/);
    expect(source).toMatch(/var\(--space-md\)/);
    expect(source).toMatch(/var\(--space-lg\)/);
    expect(source).toMatch(/var\(--border-width-sm\)/);
    expect(source).toMatch(/var\(--radius-md\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/interface Props/);
    expect(source).toMatch(/id\?: string/);
    expect(source).toMatch(/name\?: string/);
    expect(source).toMatch(/type\?:/);
    expect(source).toMatch(/value\?: string/);
    expect(source).toMatch(/placeholder\?: string/);
    expect(source).toMatch(/label\?: string/);
    expect(source).toMatch(/size\?:/);
    expect(source).toMatch(/variant\?:/);
    expect(source).toMatch(/disabled\?: boolean/);
    expect(source).toMatch(/required\?: boolean/);
    expect(source).toMatch(/invalid\?: boolean/);
    expect(source).toMatch(/error\?: string/);
    expect(source).toMatch(/helper\?: string/);
  });

  it('uses token-based sizing classes', () => {
    expect(source).toMatch(/var\(--font-size-sm\)/);
    expect(source).toMatch(/var\(--font-size-md\)/);
    expect(source).toMatch(/var\(--font-size-lg\)/);
  });

  it('uses token-based colors', () => {
    expect(source).toMatch(/var\(--color-text-heading\)/);
    expect(source).toMatch(/var\(--color-text-body\)/);
    expect(source).toMatch(/var\(--color-text-subtle\)/);
    expect(source).toMatch(/var\(--color-background-body\)/);
    expect(source).toMatch(/var\(--color-border-default\)/);
    expect(source).toMatch(/var\(--color-border-focus\)/);
    expect(source).toMatch(/var\(--color-border-subtle\)/);
    expect(source).toMatch(/var\(--color-interactive-disabled\)/);
    expect(source).toMatch(/var\(--color-feedback-error\)/);
  });

  it('has proper type variants', () => {
    expect(source).toMatch(
      /type\?: 'text' \| 'email' \| 'password' \| 'tel' \| 'url' \| 'search' \| 'number'/,
    );
  });

  it('has proper size variants', () => {
    expect(source).toMatch(/size\?: 'sm' \| 'md' \| 'lg'/);
  });

  it('has proper variant options', () => {
    expect(source).toMatch(/variant\?: 'border' \| 'no-border'/);
  });

  it('has proper default values', () => {
    expect(source).toMatch(/type = 'text'/);
    expect(source).toMatch(/value = ''/);
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

  it('supports prefix and suffix adornments', () => {
    expect(source).toMatch(/prefixIcon\?: string/);
    expect(source).toMatch(/suffixIcon\?: string/);
    expect(source).toMatch(/prefixText\?: string/);
    expect(source).toMatch(/suffixText\?: string/);
  });

  it('integrates with other atoms', () => {
    expect(source).toMatch(/import Icon from '\.\/Icon\.astro'/);
    expect(source).toMatch(
      /import FieldMessage from '\.\/FieldMessage\.astro'/,
    );
  });

  it('has proper accessibility attributes', () => {
    expect(source).toMatch(/aria-invalid/);
    expect(source).toMatch(/aria-describedby/);
    expect(source).toMatch(/for=/);
  });

  it('handles helper and error messages', () => {
    expect(source).toMatch(/helper\?: string/);
    expect(source).toMatch(/error\?: string/);
    expect(source).toMatch(/FieldMessage/);
  });

  it('supports autocomplete', () => {
    expect(source).toMatch(/autocomplete\?: string/);
  });

  it('has proper disabled states', () => {
    expect(source).toMatch(/\.is-disabled/);
    expect(source).toMatch(/cursor: not-allowed/);
  });

  it('has proper invalid states', () => {
    expect(source).toMatch(/\.is-invalid/);
  });

  it('uses proper transitions', () => {
    expect(source).toMatch(/var\(--transition-duration-fast\)/);
    expect(source).toMatch(/var\(--transition-timing-function-ease\)/);
  });

  it('supports slots', () => {
    expect(source).toMatch(/Astro\.slots\.has/);
    expect(source).toMatch(/<slot name="prefix" \/>/);
    expect(source).toMatch(/<slot name="suffix" \/>/);
    expect(source).toMatch(/<slot name="hint" \/>/);
  });

  it('generates computed IDs', () => {
    expect(source).toMatch(/computedId/);
    expect(source).toMatch(/id \?\? name \?\?/);
  });

  it('handles focus states', () => {
    expect(source).toMatch(/:focus/);
    expect(source).toMatch(/:focus-within/);
  });

  it('supports placeholder styling', () => {
    expect(source).toMatch(/::placeholder/);
  });

  it('maps variant colors correctly', () => {
    expect(source).toMatch(/\.variant-no-border/);
    expect(source).toMatch(/border: none/);
    expect(source).toMatch(/\.variant-no-border\.is-invalid/);
    expect(source).toMatch(
      /border: var\(--border-width-sm\) solid var\(--color-feedback-error\)/,
    );
  });

  it('maps size variants to spacing tokens', () => {
    expect(source).toMatch(/\.size-sm/);
    expect(source).toMatch(/padding: var\(--space-xs\) var\(--space-sm\)/);
    expect(source).toMatch(/\.size-md/);
    expect(source).toMatch(/padding: var\(--space-sm\) var\(--space-md\)/);
    expect(source).toMatch(/\.size-lg/);
    expect(source).toMatch(/padding: var\(--space-md\) var\(--space-lg\)/);
  });
});
