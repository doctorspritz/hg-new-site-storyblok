import { describe, it, expect } from 'vitest';
import * as fs from 'fs';

const source = fs.readFileSync(
  'src/components/atoms/FieldMessage.astro',
  'utf8',
);

describe('FieldMessage source', () => {
  it('allows linking via id for aria-describedby', () => {
    expect(source).toMatch(/id={id}/);
  });

  it('sets role="alert" when variant is error', () => {
    expect(source).toMatch(/variant === 'error'\s*\? 'alert'/);
  });
});
