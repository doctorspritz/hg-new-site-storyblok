import { describe, it, expect } from 'vitest';
import * as fs from 'fs';

const source = fs.readFileSync('src/components/organisms/Hero.astro', 'utf8');

describe('Hero source', () => {
  it('uses design tokens for colors', () => {
    expect(source).toMatch(/--color-background/);
  });
  it('includes a Button for CTA', () => {
    expect(source).toMatch(/Button/);
  });
});
