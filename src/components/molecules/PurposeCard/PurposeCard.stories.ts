import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Molecules/PurposeCard',
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'text' },
    image: { control: 'text' },
    href: { control: 'text' },
    badge: { control: 'text' },
    variant: { control: { type: 'select' }, options: ['default', 'peach'] }
  }
};

export default meta;
type Story = StoryObj;

function renderCard({ title, description, icon, image, href, badge, variant }: any) {
  const iconSrc = icon?.endsWith('.svg') ? icon : `/images/${icon || 'home-icon'}.svg`;
  const bgSrc = image || '/images/upgrade.webp';
  const safeHref = href || '#';
  return `
  <a href="${safeHref}" class="hg-purpose-card load-purpose__block purpose-block purpose-block--${variant}" style="display:block;width:100%;max-width: 1100px;">
    ${badge ? `<div class="purpose-block__badge">${badge}</div>` : ''}
    <div class="purpose-block__content">
      <div class="purpose-block__title">
        <img src="${iconSrc}" alt="" width="20" height="20"/>
        ${title}
      </div>
      <div class="purpose-block__description">${description}</div>
      <div class="purpose-block__action">
        <button class="hg-button hg-button--primary hg-button--md">Learn More</button>
      </div>
    </div>
    <div class="purpose-block__img" aria-hidden="true">
      <img src="${bgSrc}" alt="${title} background" />
    </div>
  </a>`;
}

export const PeachWithBadge: Story = {
  args: {
    title: 'Buy My First Home',
    description: 'Navigate your first home purchase confidently and stress-free with full guidance on each step.',
    icon: 'home-icon',
    image: '/images/upgrade.webp',
    href: '#',
    badge: 'Most Popular',
    variant: 'peach'
  },
  render: (args) => renderCard(args)
};

export const Default: Story = {
  args: {
    title: 'Invest in Property',
    description: 'Get expert mortgage solutions with personalized service and exclusive options.',
    icon: 'invest-icon',
    image: '/images/what-you-see-when-you-look-up-full-length-shot-affectionate-family-four-holding-cardboard-roof-their-heads-while-sitting-living-room-home.jpg',
    href: '#',
    badge: '',
    variant: 'default'
  },
  render: (args) => renderCard(args)
};

