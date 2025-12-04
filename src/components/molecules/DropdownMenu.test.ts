import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync(
  'src/components/molecules/DropdownMenu.astro',
  'utf8',
);

describe('DropdownMenu source', () => {
  it('includes proper ARIA attributes', () => {
    expect(source).toMatch(/aria-haspopup="true"/);
    expect(source).toMatch(/aria-expanded/);
    expect(source).toMatch(/aria-controls/);
    expect(source).toMatch(/role="menu"/);
    expect(source).toMatch(/aria-labelledby/);
    expect(source).toMatch(/aria-orientation="vertical"/);
  });

  it('includes accessibility features', () => {
    expect(source).toMatch(/aria-label/);
    expect(source).toMatch(/aria-disabled/);
    expect(source).toMatch(/tabindex/);
    expect(source).toMatch(/role="menuitem"/);
    expect(source).toMatch(/role="separator"/);
    expect(source).toMatch(/role="presentation"/);
  });

  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--color-/);
    expect(source).toMatch(/var\(--space-/);
    expect(source).toMatch(/var\(--font-/);
    expect(source).toMatch(/var\(--radius-/);
    expect(source).toMatch(/var\(--shadow-/);
    expect(source).toMatch(/var\(--border-/);
  });

  it('includes proper TypeScript interfaces', () => {
    expect(source).toMatch(/export interface DropdownMenuItem/);
    expect(source).toMatch(/export interface DropdownMenuGroup/);
    expect(source).toMatch(/export interface Props/);
  });

  it('handles all required props', () => {
    expect(source).toMatch(/trigger: {/);
    expect(source).toMatch(/items:/);
    expect(source).toMatch(/placement\?:/);
    expect(source).toMatch(/variant\?:/);
    expect(source).toMatch(/size\?:/);
  });

  it('includes trigger variants and sizes', () => {
    expect(source).toMatch(/variant\?: 'button' \| 'link' \| 'icon'/);
    expect(source).toMatch(/size\?: 'sm' \| 'md' \| 'lg'/);
  });

  it('supports placement options', () => {
    expect(source).toMatch(
      /placement\?: 'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end'/,
    );
  });

  it('includes helper functions', () => {
    expect(source).toMatch(/isItemClickable/);
    expect(source).toMatch(/getItemClasses/);
    expect(source).toMatch(/isGrouped/);
  });

  it('generates unique IDs for accessibility', () => {
    expect(source).toMatch(/menuId = `dropdown-menu-/);
    expect(source).toMatch(/triggerId = `\${menuId}-trigger/);
  });

  it('handles both flat and grouped items', () => {
    expect(source).toMatch(/isGrouped \?/);
    expect(source).toMatch(/items as DropdownMenuGroup\[\]/);
    expect(source).toMatch(/items as DropdownMenuItem\[\]/);
  });

  it('includes proper state management', () => {
    expect(source).toMatch(/isOpen = open && !disabled/);
    expect(source).toMatch(/hasIcon = !!trigger\.icon/);
    expect(source).toMatch(/hasLabel = !!trigger\.label/);
  });

  it('supports disabled states', () => {
    expect(source).toMatch(/disabled\?: boolean/);
    expect(source).toMatch(/aria-disabled/);
    expect(source).toMatch(/\.disabled/);
  });

  it('includes proper event handling', () => {
    expect(source).toMatch(/onToggle\?:/);
    expect(source).toMatch(/onItemClick\?:/);
    expect(source).toMatch(/onclick=/);
  });
});
