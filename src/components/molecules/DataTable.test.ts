import { describe, it, expect } from 'vitest';
import * as fs from 'fs';

const source = fs.readFileSync(
  'src/components/molecules/DataTable.astro',
  'utf8',
);

describe('DataTable source', () => {
  it('uses semantic table elements', () => {
    expect(source).toMatch(/<table/);
    expect(source).toMatch(/<caption/);
    expect(source).toMatch(/<th/);
  });

  it('supports responsive stack via data-label', () => {
    expect(source).toMatch(/data-label/);
  });

  it('uses design tokens for styling', () => {
    expect(source).not.toMatch(/\d+px/);
    expect(source).not.toMatch(/#[0-9a-fA-F]{3,6}/);
  });
});
