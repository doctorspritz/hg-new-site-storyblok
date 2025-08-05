import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Import sub-components
import { CtaButton } from './CtaButton.stories';
import { BulletPoint } from './BulletPoint.stories';

const HeroWithBullets = ({ 
  headlineBold, 
  headline, 
  bulletItems,
  ctaButtons,
  stats,
  layout = 'right'
}: {
  headlineBold?: string;
  headline?: string;
  bulletItems?: Array<{ prefixBold?: string; body: string; tooltip?: string }>;
  ctaButtons?: Array<{ label: string; href: string; style?: 'primary' | 'secondary' | 'yellow' }>;
  stats?: Array<{ iconOrNumber: string; line1: string; line2: string }>;
  layout?: 'left' | 'right';
}) => {
  return (
    <section className="hero_widget widget bg-gradient-to-br from-gray-50 to-gray-100 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="inner_widget max-w-6xl mx-auto">
          <div className={`grid lg:grid-cols-2 gap-12 items-center ${layout === 'left' ? 'lg:flex-row-reverse' : ''}`}>
            <div className="text-center lg:text-left">
              {(headlineBold || headline) && (
                <h1 className="hero_title text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-6 leading-tight">
                  {headlineBold && (
                    <span className="font-black">{headlineBold} </span>
                  )}
                  {headline && (
                    <span className="font-normal">{headline}</span>
                  )}
                </h1>
              )}
              
              {bulletItems && bulletItems.length > 0 && (
                <ul className="hero_points text-left mb-8 space-y-3 list-none">
                  {bulletItems.map((item, index) => (
                    <BulletPoint key={index} {...item} />
                  ))}
                </ul>
              )}
              
              {ctaButtons && ctaButtons.length > 0 && (
                <div className="btn_wrap mb-6 flex flex-wrap gap-4 justify-center lg:justify-start">
                  {ctaButtons.map((button, index) => (
                    <CtaButton key={index} {...button} />
                  ))}
                </div>
              )}
              
              {stats && stats.length > 0 && (
                <div className="stats_wrap flex gap-8 justify-center lg:justify-start mt-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="stat_item text-center lg:text-left">
                      <div className="icon_or_number text-3xl font-black text-gray-900 mb-2">
                        {stat.iconOrNumber}
                      </div>
                      <div className="stat_lines">
                        <p className="line_1 text-sm font-semibold text-gray-700">{stat.line1}</p>
                        <p className="line_2 text-sm text-gray-600">{stat.line2}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="hidden lg:block">
              <img 
                className="hero_img rounded-lg shadow-2xl w-full" 
                src="/images/img_new/what-you-see-when-you-look-up-full-length-shot-affectionate-family-four-holding-cardboard-roof-their-heads-while-sitting-living-room-home.jpg" 
                alt="Hero image" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const meta = {
  title: 'Components/HeroWithBullets',
  component: HeroWithBullets,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'radio',
      options: ['left', 'right']
    }
  },
} satisfies Meta<typeof HeroWithBullets>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headlineBold: 'Get a home loan',
    headline: 'with full guidance and expert assistance',
    bulletItems: [
      {
        prefixBold: 'Market-leading',
        body: 'loan approval rate in Australia of 97%',
        tooltip: 'Approx 40 % of applications were rejected … our rejection rate is 2.33 %.'
      },
      {
        body: 'Variety of options due to direct access to 30+ Australian banks & lenders'
      },
      {
        prefixBold: '#1 rated',
        body: 'Mortgage Broker in Brisbane',
        tooltip: '5-star rating based on 2000+ Google reviews.'
      }
    ],
    ctaButtons: [
      {
        label: 'Calculate my borrowing capacity',
        href: '/mortgage-calculator/',
        style: 'yellow'
      }
    ],
    stats: [
      {
        iconOrNumber: '14',
        line1: 'Years',
        line2: 'of experience'
      },
      {
        iconOrNumber: 'Google',
        line1: 'Based on',
        line2: '2000+ reviews'
      }
    ],
    layout: 'right'
  },
};

export const MinimalHero: Story = {
  args: {
    headlineBold: 'Simple Hero',
    headline: 'with just a headline',
    ctaButtons: [
      {
        label: 'Get Started',
        href: '#',
        style: 'yellow'
      }
    ]
  },
};

export const MultipleCTAs: Story = {
  args: {
    headlineBold: 'Choose your path',
    headline: 'multiple options available',
    ctaButtons: [
      {
        label: 'Primary Action',
        href: '#',
        style: 'yellow'
      },
      {
        label: 'Secondary Action',
        href: '#',
        style: 'secondary'
      }
    ]
  },
};

