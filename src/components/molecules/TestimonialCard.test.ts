import { describe, it, expect } from 'vitest';
import * as fs from 'fs';

const source = fs.readFileSync(
  'src/components/molecules/TestimonialCard.astro',
  'utf8',
);

describe('TestimonialCard source', () => {
  it('uses semantic HTML elements', () => {
    expect(source).toMatch(/<figure/);
    expect(source).toMatch(/<figcaption/);
    expect(source).toMatch(/<blockquote/);
  });

  it('uses design tokens for styling', () => {
    expect(source).not.toMatch(/\d+px/);
    expect(source).not.toMatch(/#[0-9a-fA-F]{3,6}/);
  });
});
