import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Textarea.astro', 'utf8');

describe('Textarea source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--space-xs\)/);
    expect(source).toMatch(/var\(--font-weight-bold\)/);
    expect(source).toMatch(/var\(--color-text-heading\)/);
    expect(source).toMatch(/var\(--color-text-body\)/);
    expect(source).toMatch(/var\(--color-background-body\)/);
    expect(source).toMatch(/var\(--border-width-sm\)/);
    expect(source).toMatch(/var\(--radius-md\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/interface Props/);
    expect(source).toMatch(/id\?: string/);
    expect(source).toMatch(/name\?: string/);
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
    expect(source).toMatch(/rows\?: number/);
    expect(source).toMatch(/cols\?: number/);
    expect(source).toMatch(/resize\?:/);
  });

  it('uses token-based sizing classes', () => {
    expect(source).toMatch(/var\(--font-size-sm\)/);
    expect(source).toMatch(/var\(--font-size-md\)/);
    expect(source).toMatch(/var\(--font-size-lg\)/);
  });

  it('uses token-based colors', () => {
    expect(source).toMatch(/var\(--color-border-default\)/);
    expect(source).toMatch(/var\(--color-border-focus\)/);
    expect(source).toMatch(/var\(--color-text-subtle\)/);
    expect(source).toMatch(/var\(--color-interactive-disabled\)/);
    expect(source).toMatch(/var\(--color-feedback-error\)/);
  });

  it('has proper size variants', () => {
    expect(source).toMatch(/size\?: 'sm' \| 'md' \| 'lg'/);
  });

  it('has proper variant options', () => {
    expect(source).toMatch(/variant\?: 'border' \| 'no-border'/);
  });

  it('has proper resize options', () => {
    expect(source).toMatch(/resize\?: 'none' \| 'vertical' \| 'both'/);
  });

  it('has proper default values', () => {
    expect(source).toMatch(/value = ''/);
    expect(source).toMatch(/size = 'md'/);
    expect(source).toMatch(/variant = 'border'/);
    expect(source).toMatch(/disabled = false/);
    expect(source).toMatch(/required = false/);
    expect(source).toMatch(/invalid = false/);
    expect(source).toMatch(/rows = 4/);
    expect(source).toMatch(/resize = 'vertical'/);
  });

  it('builds CSS classes dynamically', () => {
    expect(source).toMatch(/class:list/);
    expect(source).toMatch(/size-\${size}/);
    expect(source).toMatch(/variant-\${variant}/);
  });

  it('integrates with other atoms', () => {
    expect(source).toMatch(
      /import FieldMessage from '\.\/FieldMessage\.astro'/,
    );
    expect(source).toMatch(/FieldMessage/);
  });

  it('uses semantic HTML structure', () => {
    expect(source).toMatch(/<div/);
    expect(source).toMatch(/<label/);
    expect(source).toMatch(/<textarea/);
  });

  it('has proper accessibility attributes', () => {
    expect(source).toMatch(/for=/);
    expect(source).toMatch(/aria-invalid/);
    expect(source).toMatch(/aria-describedby/);
  });

  it('generates computed IDs', () => {
    expect(source).toMatch(/computedId/);
    expect(source).toMatch(/id \?\? name \?\? `textarea`/);
  });

  it('handles helper and error messages', () => {
    expect(source).toMatch(/helper &&/);
    expect(source).toMatch(/error &&/);
    expect(source).toMatch(/describedBy/);
  });

  it('handles disabled state', () => {
    expect(source).toMatch(/\.is-disabled/);
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

  it('maps size variants to font tokens', () => {
    expect(source).toMatch(/\.size-sm/);
    expect(source).toMatch(/font-size: var\(--font-size-sm\)/);
    expect(source).toMatch(/\.size-md/);
    expect(source).toMatch(/font-size: var\(--font-size-md\)/);
    expect(source).toMatch(/\.size-lg/);
    expect(source).toMatch(/font-size: var\(--font-size-lg\)/);
  });

  it('maps size variants to spacing tokens', () => {
    expect(source).toMatch(/\.size-sm/);
    expect(source).toMatch(/padding: var\(--space-xs\) var\(--space-sm\)/);
    expect(source).toMatch(/\.size-md/);
    expect(source).toMatch(/padding: var\(--space-sm\) var\(--space-md\)/);
    expect(source).toMatch(/\.size-lg/);
    expect(source).toMatch(/padding: var\(--space-md\) var\(--space-lg\)/);
  });

  it('has proper CSS properties', () => {
    expect(source).toMatch(/display: grid/);
    expect(source).toMatch(/gap:/);
    expect(source).toMatch(/width: 100%/);
    expect(source).toMatch(/outline: none/);
    expect(source).toMatch(/transition:/);
  });

  it('handles focus states', () => {
    expect(source).toMatch(/:focus/);
    expect(source).toMatch(/border-color: var\(--color-border-focus\)/);
  });

  it('handles placeholder styling', () => {
    expect(source).toMatch(/::placeholder/);
    expect(source).toMatch(/color: var\(--color-text-subtle\)/);
  });

  it('applies resize style dynamically', () => {
    expect(source).toMatch(/style=\{\{ resize \}\}/);
  });

  it('has proper JSDoc documentation', () => {
    expect(source).toMatch(/Atom: Textarea/);
    expect(source).toMatch(
      /Accessible multiline input with size and variant options/,
    );
  });

  it('follows accessibility best practices', () => {
    expect(source).toMatch(/aria-invalid/);
    expect(source).toMatch(/aria-describedby/);
    expect(source).toMatch(/for=/);
    expect(source).toMatch(/required/);
    expect(source).toMatch(/disabled/);
  });

  it('handles edge cases', () => {
    expect(source).toMatch(/invalid \|\| !!error/);
  });
});
