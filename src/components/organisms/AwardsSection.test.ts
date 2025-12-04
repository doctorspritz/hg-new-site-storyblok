/**
 * Awards Section Organism Tests
 * Hunter Galloway Design System - Component Tests
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync(
  'src/components/organisms/AwardsSection.astro',
  'utf8',
);

describe('AwardsSection source', () => {
  it('has proper TypeScript interfaces', () => {
    expect(source).toMatch(/export interface AwardSpec/);
    expect(source).toMatch(/export interface Props/);
    expect(source).toMatch(/awards: AwardSpec\[\]/);
    expect(source).toMatch(/background\?: 'white' \| 'gray' \| 'transparent'/);
    expect(source).toMatch(/class\?: string/);
  });

  it('imports required atomic components', () => {
    expect(source).toMatch(
      /import Container from '\.\.\/atoms\/Container\.astro'/,
    );
    expect(source).toMatch(
      /import AwardItem from '\.\.\/molecules\/AwardItem\.astro'/,
    );
  });

  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--space-xl/);
    expect(source).toMatch(/var\(--space-lg/);
    expect(source).toMatch(/var\(--space-md/);
    expect(source).toMatch(/var\(--space-sm/);
    expect(source).toMatch(/var\(--color-background-primary/);
    expect(source).toMatch(/var\(--color-background-secondary/);
  });

  it('builds CSS classes dynamically', () => {
    expect(source).toMatch(/sectionClasses/);
    expect(source).toMatch(/filter\(Boolean\)/);
    expect(source).toMatch(/join\(' '\)/);
    expect(source).toMatch(/hg-awards-section--bg-\$\{background\}/);
  });

  it('has responsive grid system', () => {
    expect(source).toMatch(/grid-template-columns: repeat\(6, 1fr\)/);
    expect(source).toMatch(/@media \(width <= 1024px\)/);
    expect(source).toMatch(/@media \(width <= 768px\)/);
    expect(source).toMatch(/@media \(width <= 480px\)/);
    expect(source).toMatch(/grid-template-columns: repeat\(4, 1fr\)/);
    expect(source).toMatch(/grid-template-columns: repeat\(3, 1fr\)/);
    expect(source).toMatch(/grid-template-columns: repeat\(2, 1fr\)/);
  });

  it('has background variant styles', () => {
    expect(source).toMatch(/\.hg-awards-section--bg-white/);
    expect(source).toMatch(/\.hg-awards-section--bg-gray/);
    expect(source).toMatch(/\.hg-awards-section--bg-transparent/);
  });

  it('maps award data to AwardItem components', () => {
    expect(source).toMatch(/awards\.map\(/);
    expect(source).toMatch(/<AwardItem/);
    expect(source).toMatch(/src=\{award\.src\}/);
    expect(source).toMatch(/alt=\{award\.alt\}/);
    expect(source).toMatch(/tooltip=\{award\.tooltip\}/);
    expect(source).toMatch(/id=\{award\.id\}/);
  });

  it('uses semantic section element', () => {
    expect(source).toMatch(/<section/);
    expect(source).toMatch(/class=\{sectionClasses\}/);
  });

  it('includes Container for layout consistency', () => {
    expect(source).toMatch(/<Container>/);
    expect(source).toMatch(/<\/Container>/);
  });
});
