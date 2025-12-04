import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Organisms/Header',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <header class="hg-header" style="padding:16px;border-bottom:1px solid #eee;display:flex;gap:16px;align-items:center">
      <img src="/images/hunter_logo_black_.svg" alt="Hunter Galloway" style="height:32px" />
      <nav style="margin-left:auto;display:flex;gap:12px">
        <a href="#">Home</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </nav>
    </header>
  `
};

