import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

const source = readFileSync(
  'src/components/organisms/BorrowingCalculator.astro',
  'utf8',
);

describe('BorrowingCalculator source', () => {
  // Props Interface Tests
  it('defines Props interface with required configuration options', () => {
    expect(source).toMatch(/export interface Props/);
    expect(source).toMatch(/class\?: string/);
    expect(source).toMatch(/id\?: string/);
    expect(source).toMatch(/title\?: string/);
    expect(source).toMatch(/description\?: string/);
    expect(source).toMatch(/submitText\?: string/);
    expect(source).toMatch(/showResults\?: boolean/);
  });

  it('has proper default prop values', () => {
    expect(source).toMatch(/title = 'Borrowing Calculator'/);
    expect(source).toMatch(/submitText = 'Calculate'/);
    expect(source).toMatch(/showResults = false/);
  });

  // Atomic Composition Tests - Verify Required Atoms Are Imported
  it('imports required InputField atom for form inputs', () => {
    expect(source).toMatch(
      /import InputField from ['"]\.\.\/atoms\/InputField\.astro['"]/,
    );
  });

  it('imports required Select atom for dropdown fields', () => {
    expect(source).toMatch(
      /import Select from ['"]\.\.\/atoms\/Select\.astro['"]/,
    );
  });

  it('imports required Button atom for form submission', () => {
    expect(source).toMatch(
      /import Button from ['"]\.\.\/atoms\/Button\.astro['"]/,
    );
  });

  it('does not import unused RadioButton atom (uses RadioGroup instead)', () => {
    expect(source).not.toMatch(
      /import RadioButton from ['"]\.\.\/atoms\/RadioButton\.astro['"]/,
    );
  });

  it('imports required RadioGroup molecule for grouped radio buttons', () => {
    expect(source).toMatch(
      /import RadioGroup from ['"]\.\.\/molecules\/RadioGroup\.astro['"]/,
    );
  });

  it('imports required Heading atom for section titles', () => {
    expect(source).toMatch(
      /import Heading from ['"]\.\.\/atoms\/Heading\.astro['"]/,
    );
  });

  // Form Structure Tests
  it('uses semantic form element for proper form structure', () => {
    expect(source).toMatch(/<form/);
    expect(source).toMatch(/<\/form>/);
  });

  it('has proper form attributes for accessibility and functionality', () => {
    expect(source).toMatch(/method="post"/);
    expect(source).toMatch(/novalidate/);
    expect(source).toMatch(/class:list=/);
  });

  // Marital Status Radio Group Tests
  it('includes marital status RadioGroup with proper configuration', () => {
    expect(source).toMatch(/name="maritalStatus"/);
    expect(source).toMatch(/label="Marital Status"/);
    expect(source).toMatch(/required/);
    expect(source).toMatch(/Single/);
    expect(source).toMatch(/Married/);
    expect(source).toMatch(/De facto/);
  });

  // First Home Buyer Radio Group Tests
  it('includes first home buyer RadioGroup with proper options', () => {
    expect(source).toMatch(/name="firstHomeBuyer"/);
    expect(source).toMatch(/label="First Home Buyer"/);
    expect(source).toMatch(/Yes/);
    expect(source).toMatch(/No/);
  });

  // Income Input Field Tests
  it('includes income InputField with proper configuration', () => {
    expect(source).toMatch(/name="income"/);
    expect(source).toMatch(/label="Annual Income"/);
    expect(source).toMatch(/type="number"/);
    expect(source).toMatch(/required/);
    expect(source).toMatch(/placeholder="Enter your annual income"/);
  });

  // Deposit Input Field Tests
  it('includes deposit InputField with proper configuration', () => {
    expect(source).toMatch(/name="deposit"/);
    expect(source).toMatch(/label="Available Deposit"/);
    expect(source).toMatch(/type="number"/);
    expect(source).toMatch(/placeholder="Enter your available deposit"/);
  });

  // State Select Dropdown Tests
  it('includes state Select dropdown with Australian states', () => {
    expect(source).toMatch(/name="state"/);
    expect(source).toMatch(/label="State"/);
    expect(source).toMatch(/NSW/);
    expect(source).toMatch(/VIC/);
    expect(source).toMatch(/QLD/);
    expect(source).toMatch(/WA/);
    expect(source).toMatch(/SA/);
    expect(source).toMatch(/TAS/);
    expect(source).toMatch(/NT/);
    expect(source).toMatch(/ACT/);
  });

  // Dependents Radio Group Tests
  it('includes dependents RadioGroup with count options', () => {
    expect(source).toMatch(/name="dependents"/);
    expect(source).toMatch(/label="Number of Dependents"/);
    expect(source).toMatch(/0/);
    expect(source).toMatch(/1/);
    expect(source).toMatch(/2/);
    expect(source).toMatch(/3/);
    expect(source).toMatch(/4\+/);
  });

  // Submit Button Tests
  it('includes submit Button with proper configuration', () => {
    expect(source).toMatch(/type="submit"/);
    expect(source).toMatch(/variant="primary"/);
    expect(source).toMatch(/size="lg"/);
    expect(source).toMatch(/{submitText}/);
  });

  // Results Display Section Tests
  it('includes conditional results display section', () => {
    expect(source).toMatch(/showResults &&/);
    expect(source).toMatch(/class="results"/);
    expect(source).toMatch(/Borrowing Capacity/);
  });

  // Design Token Compliance Tests
  it('uses design tokens for all spacing without hardcoded values', () => {
    expect(source).toMatch(/var\(--space-xs\)/);
    expect(source).toMatch(/var\(--space-sm\)/);
    expect(source).toMatch(/var\(--space-md\)/);
    expect(source).toMatch(/var\(--space-lg\)/);
    expect(source).toMatch(/var\(--space-xl\)/);
    expect(source).not.toMatch(/margin: \d+px/);
    expect(source).not.toMatch(/padding: \d+px/);
  });

  it('uses design tokens for colors with no hardcoded values', () => {
    expect(source).toMatch(/var\(--color-background-surface\)/);
    expect(source).toMatch(/var\(--color-text-heading\)/);
    expect(source).toMatch(/var\(--color-text-body\)/);
    expect(source).toMatch(/var\(--color-border-default\)/);
    expect(source).not.toMatch(/#[0-9a-fA-F]{3,6}/);
    expect(source).not.toMatch(/rgb\(/);
    expect(source).not.toMatch(/rgba\(/);
    expect(source).not.toMatch(/hsl\(/);
  });

  it('uses design tokens for border radius and borders', () => {
    expect(source).toMatch(/var\(--radius-md\)/);
    expect(source).toMatch(/var\(--border-width-sm\)/);
  });

  it('uses design tokens for typography without hardcoded values', () => {
    expect(source).toMatch(/var\(--font-size-lg\)/);
    expect(source).toMatch(/var\(--font-size-md\)/);
    expect(source).toMatch(/var\(--font-weight-bold\)/);
    expect(source).toMatch(/var\(--line-height-normal\)/);
  });

  it('uses REM units for all measurements except borders and shadows', () => {
    expect(source).toMatch(/\d+\.?\d*rem/);
    expect(source).not.toMatch(/\d+px(?!.*border|.*shadow)/);
  });

  it('avoids Tier-1 tokens and uses only Tier-2 tokens', () => {
    expect(source).not.toMatch(/var\(--[^-]+-value-/);
    expect(source).not.toMatch(/!important/);
  });

  // Accessibility Tests
  it('has proper ARIA attributes for form accessibility', () => {
    expect(source).toMatch(/aria-label/);
    expect(source).toMatch(/role="form"/);
  });

  it('uses semantic fieldset for grouped form elements', () => {
    expect(source).toMatch(/<fieldset/);
    expect(source).toMatch(/<legend/);
    expect(source).toMatch(/<\/fieldset>/);
  });

  it('has proper labels associated with form controls', () => {
    expect(source).toMatch(/for=/);
    expect(source).toMatch(/id=/);
  });

  it('includes helper text and error messaging support', () => {
    expect(source).toMatch(/helper=/);
    expect(source).toMatch(/error=/);
    expect(source).toMatch(/aria-describedby/);
  });

  it('has proper focus management and keyboard navigation', () => {
    expect(source).toMatch(/tabindex/);
    expect(source).toMatch(/:focus/);
    expect(source).toMatch(/focus-visible/);
  });

  // Slot Support Tests
  it('supports slots for custom content injection', () => {
    expect(source).toMatch(/<slot name="header"/);
    expect(source).toMatch(/<slot name="footer"/);
    expect(source).toMatch(/<slot name="description"/);
    expect(source).toMatch(/Astro\.slots\.has/);
  });

  // CSS Class Structure Tests
  it('builds CSS classes dynamically with proper naming', () => {
    expect(source).toMatch(/class:list/);
    expect(source).toMatch(/hg-BorrowingCalculator/);
    expect(source).toMatch(/form-group/);
    expect(source).toMatch(/form-actions/);
    expect(source).toMatch(/results-section/);
  });

  it('uses consistent CSS naming conventions', () => {
    expect(source).toMatch(/\.hg-BorrowingCalculator/);
    expect(source).toMatch(/\.form-/);
    expect(source).toMatch(/\.results/);
    expect(source).toMatch(/\.calculator-/);
  });

  // State Management Tests
  it('handles form state and validation properly', () => {
    expect(source).toMatch(/invalid/);
    expect(source).toMatch(/disabled/);
    expect(source).toMatch(/required/);
  });

  it('includes proper form field grouping', () => {
    expect(source).toMatch(/personal-details/);
    expect(source).toMatch(/financial-details/);
    expect(source).toMatch(/location-details/);
  });

  // JavaScript Integration Tests
  it('includes form submission handling', () => {
    expect(source).toMatch(/onsubmit/);
    expect(source).toMatch(/preventDefault/);
  });

  it('includes client-side calculation logic preparation', () => {
    expect(source).toMatch(/calculate/);
    expect(source).toMatch(/borrowingCapacity/);
  });

  // Responsive Design Tests
  it('includes responsive grid layout classes', () => {
    expect(source).toMatch(/grid/);
    expect(source).toMatch(/grid-cols/);
    expect(source).toMatch(/gap-/);
  });

  it('uses responsive spacing tokens', () => {
    expect(source).toMatch(/var\(--space-responsive-/);
  });

  // Component Documentation Tests
  it('has proper JSDoc documentation', () => {
    expect(source).toMatch(/Organism: BorrowingCalculator/);
    expect(source).toMatch(/Interactive borrowing capacity calculator/);
    expect(source).toMatch(/@param/);
  });

  // Error Handling Tests
  it('includes proper error states and messaging', () => {
    expect(source).toMatch(/error-message/);
    expect(source).toMatch(/is-invalid/);
    expect(source).toMatch(/aria-invalid/);
  });

  // Loading States Tests
  it('includes loading state handling for form submission', () => {
    expect(source).toMatch(/loading/);
    expect(source).toMatch(/is-loading/);
    expect(source).toMatch(/disabled={loading}/);
  });

  // Form Validation Tests
  it('includes comprehensive form validation attributes', () => {
    expect(source).toMatch(/min=/);
    expect(source).toMatch(/max=/);
    expect(source).toMatch(/step=/);
    expect(source).toMatch(/pattern=/);
  });

  // Results Display Tests
  it('formats calculated results properly', () => {
    expect(source).toMatch(/\$\{.*\.toLocaleString/);
    expect(source).toMatch(/currency/);
    expect(source).toMatch(/AUD/);
  });

  it('includes result breakdown sections', () => {
    expect(source).toMatch(/maximum-borrowing/);
    expect(source).toMatch(/estimated-repayment/);
    expect(source).toMatch(/loan-details/);
  });
});
