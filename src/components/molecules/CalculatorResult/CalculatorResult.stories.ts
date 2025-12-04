import type { Meta, StoryObj } from '@storybook/astro';
import CalculatorResult from './CalculatorResult.astro';

const meta: Meta<typeof CalculatorResult> = {
  title: 'Molecules/CalculatorResult',
  component: CalculatorResult,
  parameters: {
    docs: {
      description: {
        component: 'Displays calculation results with formatting and call-to-action. Used in various calculators throughout the application.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Result title',
    },
    amount: {
      control: { type: 'text' },
      description: 'Calculated amount to display',
    },
    description: {
      control: { type: 'text' },
      description: 'Optional description text',
    },
    ctaText: {
      control: { type: 'text' },
      description: 'Call-to-action button text',
      table: { defaultValue: { summary: 'Get Pre-Approved Now' } },
    },
    ctaHref: {
      control: { type: 'text' },
      description: 'Call-to-action button link',
      table: { defaultValue: { summary: '/get-free-assessment/' } },
    },
    visible: {
      control: { type: 'boolean' },
      description: 'Whether the result is visible',
      table: { defaultValue: { summary: 'true' } },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'highlighted', 'compact'],
      description: 'Visual variant',
      table: { defaultValue: { summary: 'default' } },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Your Potential Weekly Mortgage Payment',
    amount: '$425',
    description: 'Based on your weekly rent of $500, your potential mortgage payment could be around $425 per week.',
    ctaText: 'Get Pre-Approved Now',
    ctaHref: '/get-free-assessment/',
    visible: true,
    variant: 'default',
  },
};

export const MortgageCalculation: Story = {
  args: {
    title: 'Your Estimated Borrowing Capacity',
    amount: '$650,000',
    description: 'Based on your income and expenses, you could potentially borrow up to $650,000 for your home loan.',
    ctaText: 'Apply Now',
    ctaHref: '/apply/',
    visible: true,
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Used for mortgage borrowing capacity calculations.',
      },
    },
  },
};

export const Highlighted: Story = {
  args: {
    title: 'Congratulations!',
    amount: '$380',
    description: 'Your mortgage payment could be $120 less than your current rent of $500 per week.',
    ctaText: 'Start Your Application',
    ctaHref: '/get-free-assessment/',
    visible: true,
    variant: 'highlighted',
  },
  parameters: {
    docs: {
      description: {
        story: 'Highlighted variant for positive results.',
      },
    },
  },
};

export const Compact: Story = {
  args: {
    title: 'Monthly Payment',
    amount: '$1,840',
    description: 'Estimated monthly payment based on current rates.',
    ctaText: 'Learn More',
    ctaHref: '/mortgage-calculator/',
    visible: true,
    variant: 'compact',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact variant for smaller spaces.',
      },
    },
  },
};

export const WithoutCTA: Story = {
  args: {
    title: 'Calculation Result',
    amount: '$2,500',
    description: 'This is a calculation result without a call-to-action button.',
    visible: true,
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Result without call-to-action button.',
      },
    },
  },
};

export const Hidden: Story = {
  args: {
    title: 'This Should Not Be Visible',
    amount: '$0',
    description: 'This result is hidden and should not appear.',
    visible: false,
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hidden state for conditional display.',
      },
    },
  },
};
