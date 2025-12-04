/**
 * Image Atom Stories
 * Hunter Galloway Design System
 */

import type { Meta, StoryObj } from '@storybook/html';
import type { ImageProps } from './Image.types';

const meta: Meta<ImageProps> = {
  title: 'Atoms/Image',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Self-contained image atom with responsive behavior and consistent styling.',
      },
    },
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alt text for accessibility',
    },
    width: {
      control: 'text',
      description: 'Image width',
    },
    height: {
      control: 'text',
      description: 'Image height',
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;

type Story = StoryObj<ImageProps>;

export const Default: Story = {
  args: {
    src: 'https://via.placeholder.com/400x300/FDB948/000000?text=Hunter+Galloway',
    alt: 'Hunter Galloway placeholder image',
    width: '400',
    height: '300',
  },
};

export const Small: Story = {
  args: {
    src: 'https://via.placeholder.com/200x150/FDB948/000000?text=Small',
    alt: 'Small image example',
    width: '200',
    height: '150',
  },
};

export const Large: Story = {
  args: {
    src: 'https://via.placeholder.com/800x600/FDB948/000000?text=Large',
    alt: 'Large image example',
    width: '800',
    height: '600',
  },
};