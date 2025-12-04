import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Atoms/Container',
  tags: ['autodocs'],
  argTypes: {
    padding: { control: 'boolean' },
    maxWidth: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { padding: true, maxWidth: '1229px' },
  render: (args) => `
    <div class="hg-container ${args.padding ? '' : 'hg-container--no-padding'}" style="--maxWidth:${args.maxWidth}">
      <div style="background:#f4f4f4;border:1px dashed #ddd;padding:16px;text-align:center">Content</div>
    </div>
  `
};

