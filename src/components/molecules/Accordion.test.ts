import { describe, it, expect } from 'vitest';
import * as fs from 'fs';

const source = fs.readFileSync(
  'src/components/molecules/Accordion.astro',
  'utf8',
);

describe('Accordion source', () => {
  it('includes ARIA attributes', () => {
    expect(source).toMatch(/aria-expanded/);
    expect(source).toMatch(/aria-controls/);
    expect(source).toMatch(/role="region"/);
  });
});
