import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync('src/components/atoms/Heading.astro', 'utf8');

describe('Heading source', () => {
  describe('Accessibility Tests', () => {
    it('uses semantic HTML tags', () => {
      expect(source).toMatch(/Tag = `h\${level}`/);
      expect(source).toMatch(/<Tag/);
    });

    it('supports slot content for proper heading text', () => {
      expect(source).toMatch(/<slot \/>/);
    });

    it('maps semantic levels correctly for screen readers', () => {
      expect(source).toMatch(/level: 1 \| 2 \| 3 \| 4 \| 5 \| 6/);
      expect(source).toMatch(/defaultSizes/);
      expect(source).toMatch(/1: '5xl'/);
      expect(source).toMatch(/2: '3xl'/);
      expect(source).toMatch(/3: '2xl'/);
      expect(source).toMatch(/4: 'xl'/);
      expect(source).toMatch(/5: 'lg'/);
      expect(source).toMatch(/6: 'md'/);
    });
  });

  describe('Token Compliance Tests', () => {
    it('uses design tokens for all typography styling', () => {
      expect(source).toMatch(/var\(--font-family-base\)/);
      expect(source).toMatch(/var\(--font-weight-bold\)/);
      expect(source).toMatch(/var\(--line-height-normal\)/);
    });

    it('uses token-based font sizes with no hardcoded values', () => {
      expect(source).toMatch(/var\(--font-size-sm\)/);
      expect(source).toMatch(/var\(--font-size-md\)/);
      expect(source).toMatch(/var\(--font-size-lg\)/);
      expect(source).toMatch(/var\(--font-size-xl\)/);
      expect(source).toMatch(/var\(--font-size-2xl\)/);
      expect(source).toMatch(/var\(--font-size-3xl\)/);
      expect(source).toMatch(/var\(--font-size-4xl\)/);
      expect(source).toMatch(/var\(--font-size-5xl\)/);
      // Ensure no hardcoded font sizes
      expect(source).not.toMatch(/font-size:\s*\d+px/);
      expect(source).not.toMatch(/font-size:\s*\d+rem/);
    });

    it('uses token-based colors with no hardcoded values', () => {
      expect(source).toMatch(/var\(--color-text-heading\)/);
      expect(source).toMatch(/var\(--color-text-subtle\)/);
      expect(source).toMatch(/var\(--color-text-inverse\)/);
      expect(source).toMatch(/var\(--color-interactive-primary\)/);
      // Ensure no hardcoded colors
      expect(source).not.toMatch(/#[0-9a-fA-F]{3,6}/);
      expect(source).not.toMatch(/rgb\(/);
      expect(source).not.toMatch(/rgba\(/);
    });

    it('uses token-based spacing for margins', () => {
      expect(source).toMatch(/var\(--space-xs\)/);
      expect(source).toMatch(/var\(--space-sm\)/);
      expect(source).toMatch(/var\(--space-md\)/);
      expect(source).toMatch(/var\(--space-lg\)/);
      expect(source).toMatch(/var\(--space-xl\)/);
      expect(source).toMatch(/var\(--space-2xl\)/);
    });

    it('uses token-based max-width values', () => {
      expect(source).toMatch(/var\(--size-content-max-width-sm\)/);
      expect(source).toMatch(/var\(--size-content-max-width-md\)/);
      expect(source).toMatch(/var\(--size-content-max-width-lg\)/);
      expect(source).toMatch(/var\(--size-content-max-width-xl\)/);
      expect(source).toMatch(/var\(--size-container-content\)/);
      expect(source).toMatch(/var\(--size-container-wide\)/);
      // Ensure no hardcoded max-width values
      expect(source).not.toMatch(/max-width:\s*\d+px/);
      expect(source).not.toMatch(/max-width:\s*\d+rem/);
    });

    it('avoids Tier 1 tokens and literals', () => {
      // Ensure no --*-value- tokens (Tier 1) are used
      expect(source).not.toMatch(/--[a-z-]+-value-/);
      // Ensure no !important declarations
      expect(source).not.toMatch(/!important/);
    });
  });

  describe('Props Interface Tests', () => {
    it('exports Props interface', () => {
      expect(source).toMatch(/export interface Props/);
    });

    it('has all required props with correct types', () => {
      expect(source).toMatch(/level: 1 \| 2 \| 3 \| 4 \| 5 \| 6/);
      expect(source).toMatch(
        /size\?: 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| '5xl'/,
      );
      expect(source).toMatch(
        /color\?: 'default' \| 'subtle' \| 'inverse' \| 'primary'/,
      );
      expect(source).toMatch(/align\?: 'left' \| 'center' \| 'right'/);
      expect(source).toMatch(/class\?: string/);
      expect(source).toMatch(
        /marginBottom\?: 'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'/,
      );
    });

    it('has new maxWidth prop with correct variants', () => {
      expect(source).toMatch(
        /maxWidth\?: 'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'content' \| 'full'/,
      );
    });

    it('has new centerBlock prop as boolean', () => {
      expect(source).toMatch(/centerBlock\?: boolean/);
    });

    it('has proper default values for backward compatibility', () => {
      expect(source).toMatch(/color = 'default'/);
      expect(source).toMatch(/className = ''/);
      expect(source).toMatch(/marginBottom = 'none'/);
      expect(source).toMatch(/maxWidth = 'none'/);
      expect(source).toMatch(/centerBlock = false/);
    });
  });

  describe('Max Width Feature Tests', () => {
    it('includes maxWidth in component destructuring', () => {
      expect(source).toMatch(/maxWidth\s*[=,]/);
    });

    it('applies correct CSS classes for maxWidth variants', () => {
      expect(source).toMatch(
        /maxWidth && maxWidth !== 'none' && `hg-heading--max-\${maxWidth}`/,
      );
    });

    it('has CSS rules for all maxWidth variants', () => {
      expect(source).toMatch(/\.hg-heading--max-sm/);
      expect(source).toMatch(/\.hg-heading--max-md/);
      expect(source).toMatch(/\.hg-heading--max-lg/);
      expect(source).toMatch(/\.hg-heading--max-xl/);
      expect(source).toMatch(/\.hg-heading--max-content/);
      expect(source).toMatch(/\.hg-heading--max-full/);
    });

    it('maps maxWidth variants to appropriate design tokens', () => {
      expect(source).toMatch(/max-width: var\(--size-content-max-width-sm\)/);
      expect(source).toMatch(/max-width: var\(--size-content-max-width-md\)/);
      expect(source).toMatch(/max-width: var\(--size-content-max-width-lg\)/);
      expect(source).toMatch(/max-width: var\(--size-content-max-width-xl\)/);
      expect(source).toMatch(/max-width: var\(--size-container-content\)/);
      expect(source).toMatch(/max-width: 100%/);
    });

    it('does not apply max-width class when maxWidth is none', () => {
      expect(source).toMatch(/maxWidth !== 'none'/);
    });
  });

  describe('Center Block Feature Tests', () => {
    it('includes centerBlock in component destructuring', () => {
      expect(source).toMatch(/centerBlock\s*[=,]/);
    });

    it('applies center-block class when centerBlock is true', () => {
      expect(source).toMatch(/centerBlock && `hg-heading--center-block`/);
    });

    it('has CSS rule for center-block functionality', () => {
      expect(source).toMatch(/\.hg-heading--center-block/);
    });

    it('uses margin auto for centering', () => {
      expect(source).toMatch(/margin-left: auto/);
      expect(source).toMatch(/margin-right: auto/);
    });

    it('sets display to block for center-block', () => {
      expect(source).toMatch(/display: block/);
    });
  });

  describe('Feature Combination Tests', () => {
    it('allows maxWidth and centerBlock to work together', () => {
      // Test that both classes can be applied simultaneously
      expect(source).toMatch(
        /maxWidth && maxWidth !== 'none' && `hg-heading--max-\${maxWidth}`/,
      );
      expect(source).toMatch(/centerBlock && `hg-heading--center-block`/);
      expect(source).toMatch(/filter\(Boolean\)/);
    });

    it('builds CSS classes dynamically with new props', () => {
      expect(source).toMatch(/headingClasses/);
      expect(source).toMatch(/\.join\(' '\)/);
    });
  });

  describe('Backward Compatibility Tests', () => {
    it('maintains existing prop functionality', () => {
      expect(source).toMatch(/align && `hg-heading--align-\${align}`/);
      expect(source).toMatch(
        /marginBottom && marginBottom !== 'none' && `hg-heading--mb-\${marginBottom}`/,
      );
    });

    it('preserves existing CSS class structure', () => {
      expect(source).toMatch(/'hg-heading'/);
      expect(source).toMatch(/`hg-heading--\${visualSize}`/);
      expect(source).toMatch(/`hg-heading--\${color}`/);
    });

    it('keeps all existing size and color variants', () => {
      expect(source).toMatch(/\.hg-heading--sm/);
      expect(source).toMatch(/\.hg-heading--md/);
      expect(source).toMatch(/\.hg-heading--lg/);
      expect(source).toMatch(/\.hg-heading--xl/);
      expect(source).toMatch(/\.hg-heading--2xl/);
      expect(source).toMatch(/\.hg-heading--3xl/);
      expect(source).toMatch(/\.hg-heading--4xl/);
      expect(source).toMatch(/\.hg-heading--5xl/);

      expect(source).toMatch(/\.hg-heading--default/);
      expect(source).toMatch(/\.hg-heading--subtle/);
      expect(source).toMatch(/\.hg-heading--inverse/);
      expect(source).toMatch(/\.hg-heading--primary/);
    });

    it('maintains alignment functionality', () => {
      expect(source).toMatch(/\.hg-heading--align-left/);
      expect(source).toMatch(/\.hg-heading--align-center/);
      expect(source).toMatch(/\.hg-heading--align-right/);
    });

    it('preserves margin-bottom functionality', () => {
      expect(source).toMatch(/\.hg-heading--mb-xs/);
      expect(source).toMatch(/\.hg-heading--mb-sm/);
      expect(source).toMatch(/\.hg-heading--mb-md/);
      expect(source).toMatch(/\.hg-heading--mb-lg/);
      expect(source).toMatch(/\.hg-heading--mb-xl/);
      expect(source).toMatch(/\.hg-heading--mb-2xl/);
    });

    it('resets browser defaults', () => {
      expect(source).toMatch(/margin: 0/);
    });
  });

  describe('Atomic Design Compliance Tests', () => {
    it('remains a pure atom component', () => {
      // Should not import other atoms or molecules
      expect(source).not.toMatch(/from.*atoms\//);
      expect(source).not.toMatch(/from.*molecules\//);
      expect(source).not.toMatch(/from.*organisms\//);
    });

    it('uses semantic HTML element', () => {
      expect(source).toMatch(/Tag = `h\${level}`/);
      expect(source).toMatch(/<Tag/);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('handles undefined maxWidth gracefully', () => {
      expect(source).toMatch(/maxWidth = 'none'/);
      expect(source).toMatch(/maxWidth !== 'none'/);
    });

    it('handles undefined centerBlock gracefully', () => {
      expect(source).toMatch(/centerBlock = false/);
    });

    it('filters out falsy class values', () => {
      expect(source).toMatch(/filter\(Boolean\)/);
    });
  });

  describe('Legacy Features Preservation', () => {
    it('includes WordPress typography scale comments', () => {
      expect(source).toMatch(/Based on WordPress typography scale/);
      expect(source).toMatch(/h1\(60px\)/);
      expect(source).toMatch(/h2\(30px\)/);
      expect(source).toMatch(/h3\(27px\)/);
      expect(source).toMatch(/h4\(23px\)/);
      expect(source).toMatch(/h5\(20px\)/);
      expect(source).toMatch(/h6\(16px\)/);
    });

    it('maintains default size mapping logic', () => {
      expect(source).toMatch(/visualSize = size \|\| defaultSizes\[level\]/);
    });
  });
});
