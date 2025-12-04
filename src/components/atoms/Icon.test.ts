import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Icon.astro', 'utf8');

describe('Icon source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--space-xs\)/);
    expect(source).toMatch(/var\(--space-sm\)/);
    expect(source).toMatch(/var\(--space-md\)/);
    expect(source).toMatch(/var\(--space-lg\)/);
    expect(source).toMatch(/var\(--space-xl\)/);
  });

  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/export interface Props/);
    expect(source).toMatch(/name: string/);
    expect(source).toMatch(/size\?:/);
    expect(source).toMatch(/color\?:/);
    expect(source).toMatch(/alt\?: string/);
    expect(source).toMatch(/class\?: string/);
  });

  it('uses token-based sizing classes', () => {
    expect(source).toMatch(/\.hg-icon--xs/);
    expect(source).toMatch(/\.hg-icon--sm/);
    expect(source).toMatch(/\.hg-icon--md/);
    expect(source).toMatch(/\.hg-icon--lg/);
    expect(source).toMatch(/\.hg-icon--xl/);
  });

  it('uses token-based color variants', () => {
    expect(source).toMatch(/var\(--color-interactive-primary\)/);
    expect(source).toMatch(/var\(--color-text-subtle\)/);
    expect(source).toMatch(/var\(--color-feedback-success\)/);
    expect(source).toMatch(/var\(--color-feedback-warning\)/);
    expect(source).toMatch(/var\(--color-feedback-error\)/);
  });

  it('has proper size variants', () => {
    expect(source).toMatch(/size\?: 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'/);
  });

  it('has proper color variants', () => {
    expect(source).toMatch(
      /color\?: 'inherit' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'/,
    );
  });

  it('has proper default values', () => {
    expect(source).toMatch(/size = 'md'/);
    expect(source).toMatch(/color = 'inherit'/);
    expect(source).toMatch(/className = ''/);
  });

  it('builds CSS classes dynamically', () => {
    expect(source).toMatch(/iconClasses/);
    expect(source).toMatch(/filter\(Boolean\)/);
  });

  it('includes comprehensive icon library', () => {
    expect(source).toMatch(/inlineIcons/);
    expect(source).toMatch(/phone/);
    expect(source).toMatch(/menu/);
    expect(source).toMatch(/search/);
    expect(source).toMatch(/close/);
    expect(source).toMatch(/chevron-down/);
    expect(source).toMatch(/chevron-right/);
    expect(source).toMatch(/chevron-left/);
    expect(source).toMatch(/arrow-left/);
    expect(source).toMatch(/checkmark/);
    expect(source).toMatch(/star/);
    expect(source).toMatch(/star-outline/);
  });

  it('has proper accessibility attributes', () => {
    expect(source).toMatch(/role=/);
    expect(source).toMatch(/aria-label/);
    expect(source).toMatch(/aria-hidden/);
  });

  it('handles missing icons gracefully', () => {
    expect(source).toMatch(/console\.warn/);
    expect(source).toMatch(/Missing icon/);
    expect(source).toMatch(/❌/);
  });

  it('uses inline SVG definitions', () => {
    expect(source).toMatch(/viewBox="0 0 24 24"/);
    expect(source).toMatch(/fill="currentColor"/);
  });

  it('has proper SVG sizing', () => {
    expect(source).toMatch(/width: 100%/);
    expect(source).toMatch(/height: 100%/);
  });

  it('includes proper CSS properties', () => {
    expect(source).toMatch(/display: inline-flex/);
    expect(source).toMatch(/align-items: center/);
    expect(source).toMatch(/justify-content: center/);
    expect(source).toMatch(/flex-shrink: 0/);
    expect(source).toMatch(/user-select: none/);
    expect(source).toMatch(/vertical-align: middle/);
  });

  it('maps size variants to spacing tokens', () => {
    expect(source).toMatch(/width: var\(--space-xs\)/);
    expect(source).toMatch(/height: var\(--space-xs\)/);
    expect(source).toMatch(/width: var\(--space-sm\)/);
    expect(source).toMatch(/height: var\(--space-sm\)/);
    expect(source).toMatch(/width: var\(--space-md\)/);
    expect(source).toMatch(/height: var\(--space-md\)/);
    expect(source).toMatch(/width: var\(--space-lg\)/);
    expect(source).toMatch(/height: var\(--space-lg\)/);
    expect(source).toMatch(/width: var\(--space-xl\)/);
    expect(source).toMatch(/height: var\(--space-xl\)/);
  });

  it('includes size comments for reference', () => {
    expect(source).toMatch(/0\.25rem \/ 4px/);
    expect(source).toMatch(/0\.5rem \/ 8px/);
    expect(source).toMatch(/1rem \/ 16px/);
    expect(source).toMatch(/2rem \/ 32px/);
    expect(source).toMatch(/3rem \/ 48px/);
  });
});
