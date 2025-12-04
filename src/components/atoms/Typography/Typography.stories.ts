import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Atoms/Typography',
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    element: { control: { type: 'select' }, options: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5'] },
    size: { control: { type: 'select' }, options: ['xs','sm','md','lg','xl','2xl','3xl','4xl','4.5xl','5xl'] },
    color: { control: { type: 'select' }, options: ['primary','secondary','tertiary','inverse'] },
    align: { control: { type: 'select' }, options: ['left','center','right','justify'] },
    weight: { control: { type: 'select' }, options: ['body','emphasis','strong','heading','display'] }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { text: 'The quick brown fox jumps over the lazy dog.', element: 'p', size: 'md', color: 'primary', align: 'left', weight: 'body' },
  render: (args) => `
    <${args.element} class="hg-typography hg-typography--${args.size === '4.5xl' ? '4_5xl' : args.size} hg-typography--${args.weight} hg-typography--${args.color} hg-typography--${args.align}">
      ${args.text}
    </${args.element}>
  `
};

