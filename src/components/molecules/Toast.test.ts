import { describe, it, expect } from 'vitest';
import * as fs from 'fs';

const source = fs.readFileSync('src/components/molecules/Toast.astro', 'utf8');

describe('Toast source', () => {
  it('includes variant-based aria-live region', () => {
    expect(source).toMatch(/aria-live={ariaLive}/);
    expect(source).toMatch(/const ariaLive =/);
  });

  it('includes variant-based status role', () => {
    expect(source).toMatch(/role={statusRole}/);
    expect(source).toMatch(/const statusRole =/);
  });

  it('uses only design tokens for styling', () => {
    expect(source).not.toMatch(/\d+px/);
    expect(source).not.toMatch(/#[0-9a-fA-F]{3,6}/);
  });
});
