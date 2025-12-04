import { describe, it, expect } from 'vitest';
import * as fs from 'fs';

const source = fs.readFileSync(
  'src/components/molecules/Stepper.astro',
  'utf8',
);

describe('Stepper source', () => {
  it('includes aria-current for current step', () => {
    expect(source).toMatch(/aria-current/);
  });

  it('includes role="progressbar" when showProgress is enabled', () => {
    expect(source).toMatch(/role="progressbar"/);
  });

  it('includes aria-valuemin, aria-valuemax, and aria-valuenow for progress', () => {
    expect(source).toMatch(/aria-valuemin/);
    expect(source).toMatch(/aria-valuemax/);
    expect(source).toMatch(/aria-valuenow/);
  });

  it('uses semantic element ol for step list', () => {
    expect(source).toMatch(/<ol/);
  });

  it('uses only design tokens for styling', () => {
    // Check that no hardcoded values are used
    expect(source).not.toMatch(/\d+px/);
    expect(source).not.toMatch(/#[0-9a-fA-F]{3,6}/);
  });
});
