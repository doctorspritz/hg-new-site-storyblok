import { describe, it, expect } from 'vitest';
import * as fs from 'fs';

const source = fs.readFileSync(
  'src/components/molecules/Tooltip.astro',
  'utf8',
);

describe('Tooltip Component', () => {
  describe('Accessibility', () => {
    it('includes proper ARIA attributes', () => {
      expect(source).toMatch(/role="tooltip"/);
      expect(source).toMatch(/aria-hidden="true"/);
    });

    it('supports keyboard navigation', () => {
      expect(source).toMatch(/key === 'Escape'/);
      expect(source).toMatch(/focus/);
      expect(source).toMatch(/blur/);
    });
  });

  describe('Props Interface', () => {
    it('defines required props', () => {
      expect(source).toMatch(/id: string/);
      expect(source).toMatch(/content: string/);
    });

    it('supports placement options', () => {
      expect(source).toMatch(
        /placement\?\s*:\s*'top'\s*\|\s*'bottom'\s*\|\s*'left'\s*\|\s*'right'/,
      );
    });

    it('supports trigger options', () => {
      expect(source).toMatch(
        /trigger\?\s*:\s*'hover'\s*\|\s*'click'\s*\|\s*'focus'/,
      );
    });

    it('supports custom delay', () => {
      expect(source).toMatch(/delay\?\s*:\s*number/);
    });
  });

  describe('Structure', () => {
    it('renders tooltip content', () => {
      expect(source).toMatch(/tooltip-content/);
      expect(source).toMatch(/{content}/);
    });

    it('includes tooltip arrow', () => {
      expect(source).toMatch(/tooltip-arrow/);
    });

    it('uses data attributes for configuration', () => {
      expect(source).toMatch(/data-tooltip-id/);
      expect(source).toMatch(/data-tooltip-trigger/);
      expect(source).toMatch(/data-tooltip-delay/);
    });
  });

  describe('CSS Classes', () => {
    it('applies placement classes', () => {
      expect(source).toMatch(/tooltip-top/);
      expect(source).toMatch(/tooltip-bottom/);
      expect(source).toMatch(/tooltip-left/);
      expect(source).toMatch(/tooltip-right/);
    });

    it('has visibility control', () => {
      expect(source).toMatch(/tooltip-visible/);
    });

    it('uses design tokens for styling', () => {
      expect(source).toMatch(/var\(--/);
      expect(source).toMatch(/--space-/);
      expect(source).toMatch(/--color-/);
      expect(source).toMatch(/--radius-/);
    });
  });

  describe('JavaScript Functionality', () => {
    it('implements tooltip controller', () => {
      expect(source).toMatch(/class TooltipController/);
      expect(source).toMatch(/showTooltip/);
      expect(source).toMatch(/hideTooltip/);
      expect(source).toMatch(/toggleTooltip/);
    });

    it('handles different trigger types', () => {
      expect(source).toMatch(/mouseenter/);
      expect(source).toMatch(/mouseleave/);
      expect(source).toMatch(/click/);
      expect(source).toMatch(/focus/);
      expect(source).toMatch(/blur/);
    });

    it('manages timeouts for delays', () => {
      expect(source).toMatch(/setTimeout/);
      expect(source).toMatch(/clearTimeout/);
    });
  });
});
