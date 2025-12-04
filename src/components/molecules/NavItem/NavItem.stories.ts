import type { Meta, StoryObj } from '@storybook/astro';
import NavItem from './NavItem.astro';

const meta: Meta<typeof NavItem> = {
  title: 'Atoms/NavItem',
  component: NavItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hasDropdown: {
      control: 'boolean',
      description: 'Whether this navigation item contains a dropdown menu',
    },
    isActive: {
      control: 'boolean',
      description: 'Whether this navigation item is currently active/selected',
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <ul style="list-style: none; padding: 0; margin: 0;">
      <NavItem {...args}>
        <a href="#" style="text-decoration: none; color: #333; padding: 8px 16px;">
          Navigation Item
        </a>
      </NavItem>
    </ul>
  ),
};

export const WithDropdown: Story = {
  args: {
    hasDropdown: true,
  },
  render: (args) => (
    <ul style="list-style: none; padding: 0; margin: 0;">
      <NavItem {...args}>
        <a href="#" style="text-decoration: none; color: #333; padding: 8px 16px;">
          Dropdown Item
        </a>
        <div style="position: absolute; top: 100%; left: 0; background: white; border: 1px solid #ccc; padding: 8px; min-width: 150px;">
          Dropdown Content
        </div>
      </NavItem>
    </ul>
  ),
};

export const Active: Story = {
  args: {
    isActive: true,
  },
  render: (args) => (
    <ul style="list-style: none; padding: 0; margin: 0;">
      <NavItem {...args}>
        <a href="#" style="text-decoration: none; color: #333; padding: 8px 16px;">
          Active Item
        </a>
      </NavItem>
    </ul>
  ),
};

export const MultipleItems: Story = {
  render: () => (
    <ul style="list-style: none; padding: 0; margin: 0; display: flex; gap: 16px;">
      <NavItem>
        <a href="#" style="text-decoration: none; color: #333; padding: 8px 16px;">
          Home
        </a>
      </NavItem>
      <NavItem hasDropdown={true}>
        <a href="#" style="text-decoration: none; color: #333; padding: 8px 16px;">
          Services
        </a>
      </NavItem>
      <NavItem isActive={true}>
        <a href="#" style="text-decoration: none; color: #333; padding: 8px 16px;">
          About
        </a>
      </NavItem>
    </ul>
  ),
};
