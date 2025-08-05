import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Since we're using Astro components, we'll create a React wrapper
export const CtaButton = ({ label, href, style = 'yellow' }: {
  label: string;
  href: string;
  style?: 'primary' | 'secondary' | 'yellow';
}) => {
  const styleClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    yellow: 'bg-yellow hover:bg-accent text-gray-900'
  };

  const buttonClass = `${styleClasses[style]} inline-block font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`;

  return (
    <a href={href} className={buttonClass}>
      {label}
    </a>
  );
};

const meta = {
  title: 'Components/CtaButton',
  component: CtaButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: ['primary', 'secondary', 'yellow']
    },
    href: {
      control: 'text',
      defaultValue: '#'
    }
  },
} satisfies Meta<typeof CtaButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Yellow: Story = {
  args: {
    label: 'Calculate my borrowing capacity',
    href: '/mortgage-calculator/',
    style: 'yellow'
  },
};

export const Primary: Story = {
  args: {
    label: 'Get Started',
    href: '#',
    style: 'primary'
  },
};

export const Secondary: Story = {
  args: {
    label: 'Learn More',
    href: '#',
    style: 'secondary'
  },
};

export const LongText: Story = {
  args: {
    label: 'This is a really long button text to test how it handles',
    href: '#',
    style: 'yellow'
  },
};