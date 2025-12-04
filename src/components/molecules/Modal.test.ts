import { describe, it, expect } from 'vitest';
import * as fs from 'fs';

const source = fs.readFileSync('src/components/molecules/Modal.astro', 'utf8');

describe('Modal source', () => {
  it('includes proper ARIA attributes', () => {
    expect(source).toMatch(/role="dialog"/);
    expect(source).toMatch(/aria-modal="true"/);
    expect(source).toMatch(/aria-labelledby/);
    expect(source).toMatch(/aria-label="Close modal"/);
  });

  it('includes modal structure classes', () => {
    expect(source).toMatch(/'modal'/); // Matches the class:list array
    expect(source).toMatch(/modal-backdrop/);
    expect(source).toMatch(/modal-dialog/);
    expect(source).toMatch(/modal-content/);
    expect(source).toMatch(/modal-header/);
    expect(source).toMatch(/modal-body/);
    expect(source).toMatch(/modal-footer/);
  });

  it('includes size variants', () => {
    expect(source).toMatch(/modal-sm/);
    expect(source).toMatch(/modal-md/);
    expect(source).toMatch(/modal-lg/);
    expect(source).toMatch(/modal-xl/);
    expect(source).toMatch(/modal-full/);
  });

  it('includes close functionality', () => {
    expect(source).toMatch(/data-close-on-backdrop/);
    expect(source).toMatch(/data-close-on-escape/);
    expect(source).toMatch(/data-modal-close/);
  });

  it('includes modal controller script', () => {
    expect(source).toMatch(/class ModalController/);
    expect(source).toMatch(/openModal/);
    expect(source).toMatch(/closeModal/);
    expect(source).toMatch(/modal:open/);
    expect(source).toMatch(/modal:close/);
  });

  it('includes keyboard event handling', () => {
    expect(source).toMatch(/keydown/);
    expect(source).toMatch(/Escape/);
  });

  it('includes focus management', () => {
    expect(source).toMatch(/focus\(\)/);
    expect(source).toMatch(/focusableElements/);
  });

  it('uses design system tokens', () => {
    expect(source).toMatch(/var\(--color-background-surface/);
    expect(source).toMatch(/var\(--color-border-subtle/);
    expect(source).toMatch(/var\(--color-text-heading/);
    expect(source).toMatch(/var\(--space-lg/);
    expect(source).toMatch(/var\(--radius-lg/);
  });
});
