import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Atoms/Input',
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    variant: { control: { type: 'select' }, options: ['default', 'filled', 'outlined'] },
    state: { control: { type: 'select' }, options: ['default', 'success', 'warning', 'error'] },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { placeholder: 'Type here...', size: 'md', variant: 'default', state: 'default', fullWidth: false },
  render: (args) => `
    <input 
      class="hg-input hg-input--${args.size} hg-input--${args.variant} hg-input--${args.state} ${args.fullWidth ? 'hg-input--full-width' : ''}"
      placeholder="${args.placeholder}"
      ${args.disabled ? 'disabled' : ''}
      ${args.readonly ? 'readonly' : ''}
    />
  `
};

