import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync(
  'src/components/organisms/Calculator.astro',
  'utf8',
);

describe('Calculator source', () => {
  it('uses design tokens for styling', () => {
    expect(source).toMatch(/var\(--space-md\)/);
    expect(source).toMatch(/var\(--border-width-md\)/);
    expect(source).toMatch(/var\(--color-interactive-primary\)/);
    expect(source).toMatch(/var\(--radius-sm\)/);
  });

  it('defines Props interface', () => {
    expect(source).toMatch(/export interface Props/);
    expect(source).toMatch(/id\?: string/);
    expect(source).toMatch(/class\?: string/);
  });

  it('generates unique ids', () => {
    expect(source).toMatch(/Math\.random\(\)\.toString\(36\)\.slice/);
  });

  it('performs arithmetic', () => {
    expect(source).toMatch(/parseFloat/);
    expect(source).toMatch(/switch \(op\?\.value\)/);
    expect(source).toMatch(/case 'add'/);
    expect(source).toMatch(/result\.value = String\(r\)/);
  });
});
