import { describe, it, expect } from 'vitest';
import * as fs from 'fs';

const source = fs.readFileSync(
  'src/components/molecules/Timeline.astro',
  'utf8',
);

describe('Timeline source', () => {
  it('uses ordered list for items', () => {
    expect(source).toMatch(/<ol/);
    expect(source).toMatch(/<li/);
  });

  it('supports time element for dates', () => {
    expect(source).toMatch(/<time/);
  });

  it('uses only design tokens for styling', () => {
    expect(source).not.toMatch(/\d+px/);
    expect(source).not.toMatch(/#[0-9a-fA-F]{3,6}/);
  });
});
