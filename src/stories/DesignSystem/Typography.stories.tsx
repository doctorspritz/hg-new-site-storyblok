import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { designTokens } from '../../design-tokens/tokens.js';

const Typography = () => {
  return (
    <div className="p-6 space-y-12">
      {/* Font Families */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Font Families</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Primary (Gotham Pro)</h3>
            <p className="font-sans text-2xl">The quick brown fox jumps over the lazy dog</p>
            <p className="font-mono text-sm text-gray-500 mt-1">font-family: {designTokens.typography.fontFamily.primary.join(', ')}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Secondary (Open Sans)</h3>
            <p className="font-secondary text-2xl">The quick brown fox jumps over the lazy dog</p>
            <p className="font-mono text-sm text-gray-500 mt-1">font-family: {designTokens.typography.fontFamily.secondary.join(', ')}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Monospace</h3>
            <p className="font-mono text-xl">The quick brown fox jumps over the lazy dog</p>
            <p className="font-mono text-sm text-gray-500 mt-1">font-family: {designTokens.typography.fontFamily.mono.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Heading Hierarchy */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Heading Hierarchy</h2>
        <div className="space-y-6">
          <div>
            <h1 className="heading-hg-1">H1 Heading - Main Page Title</h1>
            <p className="font-mono text-sm text-gray-500 mt-1">
              {designTokens.typography.heading.h1.size} / {designTokens.typography.heading.h1.lineHeight}, weight {designTokens.typography.heading.h1.weight}
            </p>
          </div>
          <div>
            <h2 className="heading-hg-2">H2 Heading - Section Title</h2>
            <p className="font-mono text-sm text-gray-500 mt-1">
              {designTokens.typography.heading.h2.size} / {designTokens.typography.heading.h2.lineHeight}, weight {designTokens.typography.heading.h2.weight}
            </p>
          </div>
          <div>
            <h3 className="heading-hg-3">H3 Heading - Subsection Title</h3>
            <p className="font-mono text-sm text-gray-500 mt-1">
              {designTokens.typography.heading.h3.size} / {designTokens.typography.heading.h3.lineHeight}, weight {designTokens.typography.heading.h3.weight}
            </p>
          </div>
          <div>
            <h4 className="text-h4 font-semibold text-gray-900">H4 Heading - Component Title</h4>
            <p className="font-mono text-sm text-gray-500 mt-1">
              {designTokens.typography.heading.h4.size} / {designTokens.typography.heading.h4.lineHeight}, weight {designTokens.typography.heading.h4.weight}
            </p>
          </div>
          <div>
            <h5 className="text-h5 font-semibold text-gray-900">H5 Heading - Small Section</h5>
            <p className="font-mono text-sm text-gray-500 mt-1">
              {designTokens.typography.heading.h5.size} / {designTokens.typography.heading.h5.lineHeight}, weight {designTokens.typography.heading.h5.weight}
            </p>
          </div>
          <div>
            <h6 className="text-h6 font-semibold text-gray-900">H6 Heading - Label</h6>
            <p className="font-mono text-sm text-gray-500 mt-1">
              {designTokens.typography.heading.h6.size} / {designTokens.typography.heading.h6.lineHeight}, weight {designTokens.typography.heading.h6.weight}
            </p>
          </div>
        </div>
      </div>

      {/* Body Text Sizes */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Body Text Sizes</h2>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-600">Extra small text (12px) - Used for captions and fine print</p>
            <p className="font-mono text-sm text-gray-500 mt-1">text-xs: {designTokens.typography.fontSize.xs.size}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Small text (14px) - Used for secondary information</p>
            <p className="font-mono text-sm text-gray-500 mt-1">text-sm: {designTokens.typography.fontSize.sm.size}</p>
          </div>
          <div>
            <p className="text-base text-gray-600">Base text (16px) - Default body text size</p>
            <p className="font-mono text-sm text-gray-500 mt-1">text-base: {designTokens.typography.fontSize.base.size}</p>
          </div>
          <div>
            <p className="text-lg text-gray-600">Large text (18px) - Used for important body text</p>
            <p className="font-mono text-sm text-gray-500 mt-1">text-lg: {designTokens.typography.fontSize.lg.size}</p>
          </div>
          <div>
            <p className="text-xl text-gray-600">Extra large text (20px) - Used for lead paragraphs</p>
            <p className="font-mono text-sm text-gray-500 mt-1">text-xl: {designTokens.typography.fontSize.xl.size}</p>
          </div>
        </div>
      </div>

      {/* Font Weights */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Font Weights</h2>
        <div className="space-y-2">
          {Object.entries(designTokens.typography.fontWeight).map(([name, weight]) => (
            <div key={name} className="flex items-center space-x-4">
              <span 
                className="text-xl text-gray-800" 
                style={{ fontWeight: weight }}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)} Text
              </span>
              <span className="font-mono text-sm text-gray-500">
                font-{name}: {weight}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Text Colors */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Text Color Hierarchy</h2>
        <div className="space-y-3">
          <p className="text-gray-900 text-lg">Primary text color - Main content (gray-900)</p>
          <p className="text-gray-800 text-lg">Secondary text color - Important content (gray-800)</p>
          <p className="text-gray-600 text-lg">Body text color - Regular content (gray-600)</p>
          <p className="text-gray-500 text-lg">Muted text color - Less important content (gray-500)</p>
          <p className="text-gray-400 text-lg">Subtle text color - Captions and hints (gray-400)</p>
        </div>
      </div>

      {/* Sample Content */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sample Content</h2>
        <div className="max-w-2xl space-y-4">
          <h1 className="heading-hg-1">Expert Mortgage Broker Services</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Get professional guidance from award-winning mortgage brokers with one of Queensland's highest loan approval rates.
          </p>
          <h2 className="heading-hg-2 mt-8">Why Choose Hunter Galloway</h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Our experienced team provides personalized mortgage solutions tailored to your unique financial situation. 
            With access to over 30 lenders and a proven track record of success, we're committed to helping you 
            achieve your property ownership goals.
          </p>
          <h3 className="heading-hg-3 mt-6">Our Services Include</h3>
          <ul className="text-base text-gray-600 space-y-2 ml-6 list-disc">
            <li>First home buyer assistance</li>
            <li>Investment property loans</li>
            <li>Refinancing solutions</li>
            <li>Construction loans</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Design System/Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete typography system including font families, heading hierarchy, body text sizes, and color usage guidelines.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTypography: Story = {};