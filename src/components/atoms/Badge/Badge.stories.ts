import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Atoms/Badge',
  parameters: {
    docs: {
      description: {
        component:
          'Semantic badge used for labels and status indicators. Mirrors the classes used by the Astro component.'
      }
    }
  },
  argTypes: {
    text: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    shape: {
      control: { type: 'select' },
      options: ['rounded', 'pill', 'square']
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    text: 'Badge',
    variant: 'primary',
    size: 'md',
    shape: 'rounded'
  },
  render: (args) => `
    <span class="hg-badge hg-badge--${args.variant} hg-badge--${args.size} hg-badge--${args.shape}">
      ${args.text}
    </span>
  `
};

