import type { Meta, StoryObj } from '@storybook/html';

// Include the CSS from the Astro component
const sliderCSS = `
  <style>
    /* Slider wrapper */
    .hg-slider-wrapper {
      position: relative;
      width: 100%;
      padding: 2rem 0;
    }

    /* Range input styling */
    .hg-slider {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 6px;
      background: #e0e0e0;
      border-radius: 3px;
      outline: none;
      cursor: pointer;
      transition: all 0.35s ease;
    }

    .hg-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 28px;
      height: 28px;
      background: #FDB948;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.35s ease;
      box-shadow: 0px 6px 12px rgba(43, 43, 43, 0.15);
    }

    .hg-slider::-webkit-slider-thumb:hover {
      transform: scale(1.1);
      box-shadow: 0px 8px 16px rgba(43, 43, 43, 0.2);
    }

    .hg-slider::-moz-range-thumb {
      width: 28px;
      height: 28px;
      background: #FDB948;
      border-radius: 50%;
      cursor: pointer;
      border: none;
      transition: all 0.35s ease;
      box-shadow: 0px 6px 12px rgba(43, 43, 43, 0.15);
    }

    /* Value display */
    .hg-slider-value {
      position: absolute;
      top: -45px;
      left: 50%;
      transform: translateX(-50%);
      background: #FDB948;
      color: #2b2b2b;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
      pointer-events: none;
      font-family: 'Open Sans', system-ui, sans-serif;
    }

    .hg-slider-value::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-top-color: #FDB948;
    }

    /* Labels */
    .hg-slider-labels {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
    }

    .hg-slider-label {
      font-size: 14px;
      color: #666;
      font-weight: 600;
      font-family: 'Open Sans', system-ui, sans-serif;
    }
  </style>
`;

const meta: Meta = {
  title: 'Atoms/Slider',
  parameters: {
    docs: {
      description: {
        component: 'A flexible range slider component that supports custom styling and labels. Uses design tokens for consistent styling across the application.',
      },
    },
  },
  argTypes: {
    min: {
      control: { type: 'number' },
      description: 'Minimum value',
      table: { defaultValue: { summary: '0' } },
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value',
      table: { defaultValue: { summary: '100' } },
    },
    value: {
      control: { type: 'number' },
      description: 'Current value',
      table: { defaultValue: { summary: '50' } },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    value: 50,
  },
  render: (args) => `
    ${sliderCSS}
    <div class="hg-slider-wrapper">
      <input 
        type="range"
        class="hg-slider"
        min="${args.min}"
        max="${args.max}"
        value="${args.value}"
        oninput="document.getElementById('value-display').textContent = this.value"
      />
      <div class="hg-slider-value" id="value-display">${args.value}</div>
      <div class="hg-slider-labels">
        <span class="hg-slider-label">${args.min}</span>
        <span class="hg-slider-label">${args.max}</span>
      </div>
    </div>
  `,
};

export const MortgageRentRange: Story = {
  render: () => `
    ${sliderCSS}
    <div class="hg-slider-wrapper">
      <input 
        type="range"
        class="hg-slider"
        min="100"
        max="2500"
        value="500"
        step="50"
        oninput="document.getElementById('mortgage-value').textContent = '$' + this.value"
      />
      <div class="hg-slider-value" id="mortgage-value">$500</div>
      <div class="hg-slider-labels">
        <span class="hg-slider-label">$100</span>
        <span class="hg-slider-label">$2500</span>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Configured for the mortgage vs rent calculator with dollar formatting.',
      },
    },
  },
};

export const WithoutLabels: Story = {
  render: () => `
    ${sliderCSS}
    <div class="hg-slider-wrapper">
      <input 
        type="range"
        class="hg-slider"
        min="0"
        max="100"
        value="25"
        step="5"
        oninput="document.getElementById('no-labels-value').textContent = this.value"
      />
      <div class="hg-slider-value" id="no-labels-value">25</div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Slider without min/max labels.',
      },
    },
  },
};
