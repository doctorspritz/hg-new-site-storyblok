import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Atoms/Icon',
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    size: { control: { type: 'select' }, options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    color: { control: { type: 'select' }, options: ['inherit', 'primary', 'secondary', 'success', 'warning', 'error'] },
    inline: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj;

export const InlinePhone: Story = {
  args: { name: 'phone', size: 'sm', inline: true },
  render: (args) => `
    <span class="hg-icon hg-icon--${args.size} hg-icon--${args.color ?? 'inherit'} ${args.inline ? 'hg-icon--inline' : 'hg-icon--block'}" aria-label="${args.name}">
      <!-- Inline icon is inserted by component in app; here we approximate with a circle as placeholder -->
      <svg width="16" height="16"><circle cx="8" cy="8" r="7" fill="currentColor"/></svg>
    </span>
  `
};

export const ExternalSvg: Story = {
  args: { name: 'facebook', size: 'lg', color: 'primary' },
  render: (args) => `
    <img src="/images/${args.name}.svg" class="hg-icon hg-icon--${args.size} hg-icon--${args.color}" alt="${args.name} icon" />
  `
};

