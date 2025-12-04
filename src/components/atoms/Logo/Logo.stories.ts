import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Atoms/Logo',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: ['default', 'white', 'dark'] },
    size: { control: { type: 'select' }, options: ['header', 'sm', 'md', 'lg'] },
    showBrisbane: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { variant: 'default', size: 'header', showBrisbane: true },
  render: (args) => `
    <a class="hg-logo hg-logo--${args.size}" href="#">
      <img class="hg-logo__image" src="${args.variant === 'white' ? '/images/logo-white.svg' : (args.showBrisbane ? '/images/hunter_logo_black_.svg' : '/images/no_brisbane_variants/hg_logo_black.svg')}" alt="Hunter Galloway" />
    </a>
  `
};

