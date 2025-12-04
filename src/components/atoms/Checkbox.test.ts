import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Checkbox.astro', 'utf8');

describe('Checkbox source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--space-sm\)/);
    expect(source).toMatch(/var\(--space-md\)/);

    expect(source).toMatch(/var\(--border-width-md\)/);
    expect(source).toMatch(/var\(--radius-sm\)/);
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
  });

  it('uses token-based colors', () => {
    expect(source).toMatch(/var\(--color-text-body\)/);
    expect(source).toMatch(/var\(--color-background-body\)/);
    expect(source).toMatch(/var\(--color-border-default\)/);
    expect(source).toMatch(/var\(--color-border-subtle\)/);
    expect(source).toMatch(/var\(--color-interactive-primary\)/);
    expect(source).toMatch(/var\(--color-interactive-disabled\)/);
    expect(source).toMatch(/var\(--color-interactive-selection-background\)/);
  });

  it('uses token-based transitions', () => {
    expect(source).toMatch(/var\(--transition-duration-fast\)/);
    expect(source).toMatch(/var\(--transition-timing-function-ease\)/);
  });

  it('supports slot content', () => {
    expect(source).toMatch(/<slot>/);
    expect(source).toMatch(/<\/slot>/);
  });

  it('has proper accessibility', () => {
    expect(source).toMatch(/aria-label/);
    expect(source).toMatch(/aria-hidden="true"/);
  });

  it('handles disabled state', () => {
    expect(source).toMatch(/\.is-disabled/);
    expect(source).toMatch(/cursor: not-allowed/);
  });

  it('has proper focus states', () => {
    expect(source).toMatch(/focus-visible/);
    expect(source).toMatch(/outline:/);
  });

  it('generates computed id', () => {
    expect(source).toMatch(/computedId/);
    expect(source).toMatch(/id \?\?/);
  });

  it('has proper checkbox structure', () => {
    expect(source).toMatch(/type="checkbox"/);
    expect(source).toMatch(/for=/);
    expect(source).toMatch(/\.box/);
    expect(source).toMatch(/\.text/);
  });

  it('maps variant colors correctly', () => {
    expect(source).toMatch(/\.hg-Checkbox/);
    expect(source).toMatch(/border-color: var\(--color-interactive-primary\)/);
    expect(source).toMatch(
      /background-color: var\(--color-interactive-selection-background\)/,
    );
  });

  it('maps spacing tokens correctly', () => {
    expect(source).toMatch(/width: var\(--space-md\)/);
    expect(source).toMatch(/height: var\(--space-md\)/);
    expect(source).toMatch(/gap: var\(--space-sm\)/);
  });
});
