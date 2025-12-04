import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/RadioButton.astro', 'utf8');

describe('RadioButton source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--space-sm\)/);
    expect(source).toMatch(/var\(--space-md\)/);
    expect(source).toMatch(/var\(--space-xs\)/);
    expect(source).toMatch(/var\(--space-lg\)/);
    expect(source).toMatch(/var\(--border-width-md\)/);
    expect(source).toMatch(/var\(--radius-pill\)/);
    expect(source).toMatch(/var\(--radius-md\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/interface Props/);
    expect(source).toMatch(/id\?: string/);
    expect(source).toMatch(/name\?: string/);
    expect(source).toMatch(/value\?: string/);
    expect(source).toMatch(/label\?: string/);
    expect(source).toMatch(/checked\?: boolean/);
    expect(source).toMatch(/disabled\?: boolean/);
    expect(source).toMatch(/required\?: boolean/);
    expect(source).toMatch(/ariaLabel\?: string/);
    expect(source).toMatch(/variant\?:/);
    expect(source).toMatch(/size\?:/);
  });

  it('uses token-based colors', () => {
    expect(source).toMatch(/var\(--color-text-body\)/);
    expect(source).toMatch(/var\(--color-border-default\)/);
    expect(source).toMatch(/var\(--color-background-body\)/);
    expect(source).toMatch(/var\(--color-interactive-primary\)/);
    expect(source).toMatch(/var\(--color-text-subtle\)/);
    expect(source).toMatch(/var\(--color-interactive-disabled\)/);
    expect(source).toMatch(/var\(--color-border-subtle\)/);
    expect(source).toMatch(/var\(--color-border-focus\)/);
    expect(source).toMatch(/var\(--color-interactive-selection-background\)/);
  });

  it('has proper variant options', () => {
    expect(source).toMatch(/variant\?: 'button' \| 'plain'/);
  });

  it('has proper size variants', () => {
    expect(source).toMatch(/size\?: 'xs' \| 'sm' \| 'md' \| 'lg'/);
  });

  it('has proper default values', () => {
    expect(source).toMatch(/name = 'radio'/);
    expect(source).toMatch(/value = ''/);
    expect(source).toMatch(/label = ''/);
    expect(source).toMatch(/checked = false/);
    expect(source).toMatch(/disabled = false/);
    expect(source).toMatch(/required = false/);
    expect(source).toMatch(/variant = 'button'/);
    expect(source).toMatch(/size = 'md'/);
  });

  it('builds CSS classes dynamically', () => {
    expect(source).toMatch(/class:list/);
    expect(source).toMatch(/variant-\${variant}/);
    expect(source).toMatch(/size-\${size}/);
  });

  it('supports slot content', () => {
    expect(source).toMatch(/<slot>/);
    expect(source).toMatch(/<\/slot>/);
  });

  it('uses semantic HTML structure', () => {
    expect(source).toMatch(/<label/);
    expect(source).toMatch(/<input/);
    expect(source).toMatch(/type="radio"/);
  });

  it('has proper accessibility attributes', () => {
    expect(source).toMatch(/for=/);
    expect(source).toMatch(/aria-label/);
    expect(source).toMatch(/aria-hidden="true"/);
  });

  it('generates computed IDs', () => {
    expect(source).toMatch(/computedId/);
    expect(source).toMatch(/id \?\? `\${name}-\${value \|\| 'option'}`/);
  });

  it('handles disabled state', () => {
    expect(source).toMatch(/\.is-disabled/);
    expect(source).toMatch(/cursor: not-allowed/);
  });

  it('handles checked state', () => {
    expect(source).toMatch(/input:checked/);
    expect(source).toMatch(/transform: scale\(1\)/);
  });

  it('handles focus state', () => {
    expect(source).toMatch(/focus-visible/);
    expect(source).toMatch(/box-shadow:/);
  });

  it('includes all size variants', () => {
    expect(source).toMatch(/\.size-xs/);
    expect(source).toMatch(/\.size-sm/);
    expect(source).toMatch(/\.size-md/);
    expect(source).toMatch(/\.size-lg/);
  });

  it('includes variant styling', () => {
    expect(source).toMatch(/\.variant-button/);
    expect(source).toMatch(/\.variant-button .text/);
  });

  it('uses proper transitions', () => {
    expect(source).toMatch(/var\(--transition-duration-fast\)/);
    expect(source).toMatch(/var\(--transition-timing-function-ease\)/);
  });

  it('maps size variants to control minwidth tokens', () => {
    expect(source).toMatch(/var\(--control-minwidth-xs\)/);
    expect(source).toMatch(/var\(--control-minwidth-sm\)/);
    expect(source).toMatch(/var\(--control-minwidth-md\)/);
    expect(source).toMatch(/var\(--control-minwidth-lg\)/);
  });

  it('has proper CSS properties', () => {
    expect(source).toMatch(/display: inline-flex/);
    expect(source).toMatch(/align-items: center/);
    expect(source).toMatch(/gap:/);
    expect(source).toMatch(/cursor:/);
    expect(source).toMatch(/position: relative/);
    expect(source).toMatch(/border-radius:/);
    expect(source).toMatch(/background-color:/);
  });

  it('handles button variant styling', () => {
    expect(source).toMatch(/\.variant-button .text/);
    expect(source).toMatch(/padding:/);
    expect(source).toMatch(/border:/);
    expect(source).toMatch(/text-align: center/);
  });

  it('includes hover states', () => {
    expect(source).toMatch(/\.variant-button:hover/);
    expect(source).toMatch(/border-color: var\(--color-border-focus\)/);
  });

  it('applies shadow for checked button variant', () => {
    expect(source).toMatch(/var\(--shadow-sm\)/);
  });

  it('has proper JSDoc documentation', () => {
    expect(source).toMatch(/Atom: RadioButton/);
    expect(source).toMatch(/Single radio input with custom token-driven UI/);
  });

  it('follows accessibility best practices', () => {
    expect(source).toMatch(/aria-hidden="true"/);
    expect(source).toMatch(/for=/);
    expect(source).toMatch(/aria-label/);
  });

  it('handles edge cases', () => {
    expect(source).toMatch(/value \|\| 'option'/);
  });

  it('maps variant colors correctly', () => {
    expect(source).toMatch(/\.variant-button/);
    expect(source).toMatch(/border-color: var\(--color-interactive-primary\)/);
    expect(source).toMatch(/\.hg-Radio .control/);
    expect(source).toMatch(
      /border: var\(--border-width-md\) solid var\(--color-border-default\)/,
    );
  });

  it('maps size variants to spacing tokens', () => {
    expect(source).toMatch(/\.size-sm/);
    expect(source).toMatch(/min-width: var\(--control-minwidth-sm\)/);
    expect(source).toMatch(/\.size-md/);
    expect(source).toMatch(/min-width: var\(--control-minwidth-md\)/);
    expect(source).toMatch(/\.size-lg/);
    expect(source).toMatch(/min-width: var\(--control-minwidth-lg\)/);
  });
});
