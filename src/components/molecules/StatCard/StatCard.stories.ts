import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/StatCard',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    helper: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { label: 'Customers helped', value: '4,300+', helper: 'Since 2015' },
  render: (args) => `
    <div class="hg-statcard">
      <div class="hg-statcard__value">${args.value}</div>
      <div class="hg-statcard__label">${args.label}</div>
      <div class="hg-statcard__helper">${args.helper}</div>
    </div>
  `
};

