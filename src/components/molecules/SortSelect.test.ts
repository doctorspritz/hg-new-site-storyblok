import { describe, it, expect } from 'vitest';
import * as fs from 'fs';

const source = fs.readFileSync(
  'src/components/molecules/SortSelect.astro',
  'utf8',
);

describe('SortSelect source', () => {
  it('includes label and select elements', () => {
    expect(source).toMatch(/<Label/);
    expect(source).toMatch(/<select/);
  });

  it('emits sort:change custom event', () => {
    expect(source).toMatch(/sort:change/);
  });

  it('uses only design tokens for styling', () => {
    expect(source).not.toMatch(/\d+px/);
    expect(source).not.toMatch(/#[0-9a-fA-F]{3,6}/);
  });
});
