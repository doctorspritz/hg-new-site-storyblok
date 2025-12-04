import { describe, it, expect } from 'vitest';
import * as fs from 'fs';

const source = fs.readFileSync(
  'src/components/molecules/TableOfContents.astro',
  'utf8',
);

describe('TableOfContents source', () => {
  it('has navigation semantics', () => {
    expect(source).toMatch(/nav aria-label="Table of contents"/);
    expect(source).toContain('href="#');
  });

  it('dispatches navigate event', () => {
    expect(source).toMatch(/toc:navigate/);
    expect(source).toMatch(/CustomEvent/);
  });
});
