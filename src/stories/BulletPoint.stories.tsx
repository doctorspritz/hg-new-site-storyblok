import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

// React wrapper for the BulletPoint component
const BulletPoint = ({ prefixBold, body, tooltip }: {
  prefixBold?: string;
  body: string;
  tooltip?: string;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <li 
      className="flex items-start text-gray-700 group relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <svg className="w-5 h-5 text-yellow mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
      </svg>
      <span>
        {prefixBold && (
          <strong className="font-bold text-gray-900">{prefixBold} </strong>
        )}
        {body}
      </span>
      {tooltip && (
        <>
          <svg className="w-4 h-4 text-gray-400 ml-2 cursor-help" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
          </svg>
          {showTooltip && (
            <div className="absolute left-0 bottom-full mb-2 z-10 p-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg max-w-xs">
              {tooltip}
              <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
            </div>
          )}
        </>
      )}
    </li>
  );
};

const meta = {
  title: 'Components/BulletPoint',
  component: BulletPoint,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ul className="list-none space-y-3">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof BulletPoint>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    body: 'Variety of options due to direct access to 30+ Australian banks & lenders'
  },
};

export const WithBoldPrefix: Story = {
  args: {
    prefixBold: 'Market-leading',
    body: 'loan approval rate in Australia of 97%'
  },
};

export const WithTooltip: Story = {
  args: {
    prefixBold: '#1 rated',
    body: 'Mortgage Broker in Brisbane',
    tooltip: '5-star rating based on 2000+ Google reviews.'
  },
};

export const LongText: Story = {
  args: {
    prefixBold: 'Important',
    body: 'This is a very long bullet point text that demonstrates how the component handles multiple lines of content when the text wraps around to the next line',
    tooltip: 'This tooltip also contains a longer explanation that might span multiple lines'
  },
};