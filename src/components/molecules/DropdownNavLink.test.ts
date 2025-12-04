import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync(
  'src/components/molecules/DropdownNavLink.astro',
  'utf8',
);

describe('DropdownNavLink', () => {
  it('combines Link and Icon atoms', () => {
    expect(source).toMatch(/import Link from/);
    expect(source).toMatch(/import Icon from/);
  });

  it('uses design tokens', () => {
    expect(source).toMatch(/var\(--/);
  });

  it('has proper component structure', () => {
    expect(source).toMatch(/class:list=/);
    expect(source).toMatch(/interface Props/);
  });

  it('includes dropdown chevron icon', () => {
    expect(source).toMatch(/chevron-down/);
    expect(source).toMatch(/hasDropdown/);
  });

  it('uses navigation variant and dashed underline', () => {
    expect(source).toMatch(/variant="navigation"/);
    expect(source).toMatch(/underline="dashed"/);
  });
});
