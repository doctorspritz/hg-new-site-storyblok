import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { designTokens } from '../../design-tokens/tokens.js';

const ColorPalette = () => {
  const ColorSwatch = ({ color, name, value }: { color: string; name: string; value: string }) => (
    <div className="flex flex-col items-center space-y-2">
      <div 
        className="w-20 h-20 rounded-lg shadow-md border border-gray-200"
        style={{ backgroundColor: color }}
      />
      <div className="text-center">
        <div className="font-semibold text-sm text-gray-900">{name}</div>
        <div className="font-mono text-xs text-gray-600">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      {/* Brand Colors */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Brand Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <ColorSwatch 
            color={designTokens.colors.brand.primary} 
            name="Primary" 
            value={designTokens.colors.brand.primary} 
          />
          <ColorSwatch 
            color={designTokens.colors.brand.primaryHover} 
            name="Primary Hover" 
            value={designTokens.colors.brand.primaryHover} 
          />
          <ColorSwatch 
            color={designTokens.colors.brand.primaryLight} 
            name="Primary Light" 
            value={designTokens.colors.brand.primaryLight} 
          />
          <ColorSwatch 
            color={designTokens.colors.brand.secondary} 
            name="Secondary" 
            value={designTokens.colors.brand.secondary} 
          />
          <ColorSwatch 
            color={designTokens.colors.brand.secondaryHover} 
            name="Secondary Hover" 
            value={designTokens.colors.brand.secondaryHover} 
          />
        </div>
      </div>

      {/* Neutral Colors */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Neutral Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Object.entries(designTokens.colors.neutral).map(([name, value]) => (
            <ColorSwatch 
              key={name}
              color={value} 
              name={name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} 
              value={value} 
            />
          ))}
        </div>
      </div>

      {/* Semantic Colors */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Semantic Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(designTokens.colors.semantic).map(([name, value]) => (
            <ColorSwatch 
              key={name}
              color={value} 
              name={name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} 
              value={value} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Design System/Colors',
  component: ColorPalette,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete color palette for the Hunter Galloway design system. Includes brand colors, neutral grays, and semantic colors for various UI states.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllColors: Story = {};