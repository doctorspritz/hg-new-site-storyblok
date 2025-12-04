import type { Meta, StoryObj } from '@storybook/astro';
import MortgageRentCalculator from './MortgageRentCalculator.astro';

const meta: Meta<typeof MortgageRentCalculator> = {
  title: 'Organisms/MortgageRentCalculator',
  component: MortgageRentCalculator,
  parameters: {
    docs: {
      description: {
        component: 'Complete calculator that allows users to compare mortgage payments with rent. Built using atomic components following the design system.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The complete mortgage vs rent calculator as it appears on the homepage. Users can adjust their weekly rent using the slider and see potential mortgage savings.',
      },
    },
  },
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive calculator. Try moving the slider to see how different rent amounts affect potential mortgage payments. Click "Calculate" to see the results.',
      },
    },
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
    docs: {
      description: {
        story: 'Mobile responsive view of the calculator showing how it adapts to smaller screens.',
      },
    },
  },
};
