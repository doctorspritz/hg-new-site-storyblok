import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/molecules/TabGroup.astro', 'utf8');

describe('TabGroup source', () => {
  it('includes proper ARIA attributes', () => {
    expect(source).toMatch(/role="tablist"/);
    expect(source).toMatch(/role="tab"/);
    expect(source).toMatch(/role="tabpanel"/);
    expect(source).toMatch(/aria-orientation/);
    expect(source).toMatch(/aria-selected/);
    expect(source).toMatch(/aria-controls/);
    expect(source).toMatch(/aria-disabled/);
    expect(source).toMatch(/aria-labelledby/);
  });

  it('includes accessibility features', () => {
    expect(source).toMatch(/tabindex/);
    expect(source).toMatch(/disabled/);
    expect(source).toMatch(/aria-hidden="true"/);
  });

  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--color-/);
    expect(source).toMatch(/var\(--space-/);
    expect(source).toMatch(/var\(--font-/);
    expect(source).toMatch(/var\(--radius-/);
    expect(source).toMatch(/var\(--border-/);
    expect(source).toMatch(/var\(--transition-/);
  });

  it('includes proper TypeScript interfaces', () => {
    expect(source).toMatch(/export interface TabItem/);
    expect(source).toMatch(/export interface Props/);
  });

  it('handles all required props', () => {
    expect(source).toMatch(/tabs:/);
    expect(source).toMatch(/activeTab\?:/);
    expect(source).toMatch(/variant\?:/);
    expect(source).toMatch(/size\?:/);
    expect(source).toMatch(/orientation\?:/);
    expect(source).toMatch(/fullWidth\?:/);
  });

  it('includes tab variants and sizes', () => {
    expect(source).toMatch(/variant\?: 'default' \| 'pills' \| 'underline'/);
    expect(source).toMatch(/size\?: 'sm' \| 'md' \| 'lg'/);
    expect(source).toMatch(/orientation\?: 'horizontal' \| 'vertical'/);
  });

  it('supports full width option', () => {
    expect(source).toMatch(/fullWidth\?: boolean/);
    expect(source).toMatch(/data-full-width/);
  });

  it('includes helper functions', () => {
    expect(source).toMatch(/getTabClasses/);
    expect(source).toMatch(/getTabPanelClasses/);
  });

  it('generates unique IDs for accessibility', () => {
    expect(source).toMatch(/tabGroupId = `tab-group-/);
    expect(source).toMatch(/id={`\${tabGroupId}-tab-\${tab\.id}`}/);
    expect(source).toMatch(/id={`\${tabGroupId}-panel-\${tab\.id}`}/);
  });

  it('handles tab states properly', () => {
    expect(source).toMatch(/isActive = tab\.id === activeTabId/);
    expect(source).toMatch(/isDisabled = tab\.disabled/);
    expect(source).toMatch(/\.active/);
    expect(source).toMatch(/\.disabled/);
  });

  it('supports tab icons', () => {
    expect(source).toMatch(/icon\?: string/);
    expect(source).toMatch(/tab\.icon/);
    expect(source).toMatch(/tab-icon/);
  });

  it('includes proper event handling', () => {
    expect(source).toMatch(/onTabChange\?:/);
    expect(source).toMatch(/onclick=/);
  });

  it('supports responsive design', () => {
    expect(source).toMatch(/@media \(width <= 48rem\)/);
    expect(source).toMatch(/flex-wrap: wrap/);
  });

  it('handles orientation changes', () => {
    expect(source).toMatch(/data-orientation/);
    expect(source).toMatch(/\.tab-group\[data-orientation="vertical"\]/);
  });

  it('includes variant-specific styling', () => {
    expect(source).toMatch(/\.tab-group\[data-variant="pills"\]/);
    expect(source).toMatch(/\.tab-group\[data-variant="underline"\]/);
  });
});
