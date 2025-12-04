/**
 * Award Item Molecule Tests
 * Hunter Galloway Design System - Component Tests
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/molecules/AwardItem.astro', 'utf8');

describe('AwardItem source', () => {
  it('has proper TypeScript interface', () => {
    expect(source).toMatch(/export interface Props/);
    expect(source).toMatch(/src: string/);
    expect(source).toMatch(/alt: string/);
    expect(source).toMatch(/tooltip: string/);
    expect(source).toMatch(/id\?: string \| number/);
    expect(source).toMatch(/class\?: string/);
  });

  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--transition-duration-base/);
    expect(source).toMatch(/var\(--border-width-md/);
    expect(source).toMatch(/var\(--color-interactive-primary/);
    expect(source).toMatch(/var\(--space-xs/);
    expect(source).toMatch(/var\(--space-sm/);
    expect(source).toMatch(/var\(--radius-sm/);
  });

  it('imports required Image atom', () => {
    expect(source).toMatch(/import Image from '\.\.\/atoms\/Image\.astro'/);
  });

  it('builds CSS classes dynamically', () => {
    expect(source).toMatch(/itemClasses/);
    expect(source).toMatch(/filter\(Boolean\)/);
    expect(source).toMatch(/join\(' '\)/);
  });

  it('has proper accessibility attributes', () => {
    expect(source).toMatch(/title=\{tooltip\}/);
    expect(source).toMatch(/data-award=\{id\}/);
  });

  it('uses hover and focus states', () => {
    expect(source).toMatch(/\.hg-award-item:hover/);
    expect(source).toMatch(/\.hg-award-item:focus/);
    expect(source).toMatch(/transform: scale\(1\.05\)/);
  });

  it('has responsive design considerations', () => {
    expect(source).toMatch(/@media \(width <= 768px\)/);
    expect(source).toMatch(/min-height: 80px/);
    expect(source).toMatch(/max-width: 120px/);
  });

  it('applies grayscale filter effect', () => {
    expect(source).toMatch(/filter: grayscale/);
    expect(source).toMatch(/transition: filter/);
  });
});
