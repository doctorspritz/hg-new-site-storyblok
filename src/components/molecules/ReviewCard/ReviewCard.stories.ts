import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/ReviewCard',
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    text: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { name: 'Jess', text: 'The team made the process smooth and stress-free.' },
  render: (args) => `
    <div class="hg-review-card">
      <div class="hg-review-card__text">${args.text}</div>
      <div class="hg-review-card__name">${args.name}</div>
    </div>
  `
};

