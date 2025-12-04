import type { Meta, StoryObj } from '@storybook/astro';
import NavLink from './NavLink.astro';

const meta: Meta<typeof NavLink> = {
  title: 'Atoms/NavLink',
  component: NavLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'The URL the navigation link points to',
    },
    hasDropdown: {
      control: 'boolean',
      description: 'Whether this navigation link has a dropdown menu',
    },
    isActive: {
      control: 'boolean',
      description: 'Whether this navigation link is currently active/selected',
    },
    showChevron: {
      control: 'boolean',
      description: 'Whether to show a chevron indicator',
    },
    chevronDirection: {
      control: 'select',
      options: ['down', 'right'],
      description: 'Direction of the chevron indicator',
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
  args: {
    href: '#',
  },
  render: (args) => (
    <nav style="background: white; padding: 20px;">
      <NavLink {...args}>Navigation Link</NavLink>
    </nav>
  ),
};

export const WithDropdown: Story = {
  args: {
    href: '#',
    hasDropdown: true,
    showChevron: true,
    chevronDirection: 'down',
  },
  render: (args) => (
    <nav style="background: white; padding: 20px;">
      <NavLink {...args}>Dropdown Link</NavLink>
    </nav>
  ),
};

export const WithRightChevron: Story = {
  args: {
    href: '#',
    showChevron: true,
    chevronDirection: 'right',
  },
  render: (args) => (
    <nav style="background: white; padding: 20px;">
      <NavLink {...args}>Right Chevron Link</NavLink>
    </nav>
  ),
};

export const Active: Story = {
  args: {
    href: '#',
    isActive: true,
  },
  render: (args) => (
    <nav style="background: white; padding: 20px;">
      <NavLink {...args}>Active Link</NavLink>
    </nav>
  ),
};

export const MultipleLinks: Story = {
  render: () => (
    <nav style="background: white; padding: 20px; display: flex; gap: 24px;">
      <NavLink href="#" isActive={true}>Home</NavLink>
      <NavLink href="#" hasDropdown={true} showChevron={true}>Services</NavLink>
      <NavLink href="#" showChevron={true} chevronDirection="right">About</NavLink>
      <NavLink href="#">Contact</NavLink>
    </nav>
  ),
};
