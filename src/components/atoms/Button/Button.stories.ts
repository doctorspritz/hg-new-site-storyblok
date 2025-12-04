// @ts-ignore Astro component import for Astrobook
import Button from './Button.astro';
import type { ButtonProps } from './Button.types';
// Astrobook default export typing
type StoryObj<T> = { args?: Partial<T & { default?: string }> };

export default {
  component: Button,
} satisfies { component: typeof Button };

type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', default: 'Learn More' }
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md', default: 'Learn More' }
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md', default: 'Cancel' }
};

export const Outline: Story = {
  args: { variant: 'outline', size: 'md', default: 'Details' }
};

export const Large: Story = {
  args: { variant: 'primary', size: 'lg', default: 'Get Started' }
};

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', default: 'Small' }
};
