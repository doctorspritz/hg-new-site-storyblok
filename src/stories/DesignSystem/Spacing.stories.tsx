import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { designTokens } from '../../design-tokens/tokens.js';

const Spacing = () => {
  const SpacingBox = ({ size, label, value }: { size: string; label: string; value: string }) => (
    <div className="flex items-center space-x-4 mb-4">
      <div className="flex items-center space-x-2">
        <div 
          className="bg-brand-primary" 
          style={{ width: size, height: '20px' }}
        />
        <div className="text-sm">
          <div className="font-semibold text-gray-900">{label}</div>
          <div className="font-mono text-gray-500">{value}</div>
        </div>
      </div>
    </div>
  );

  const convertRemToPx = (remValue: string) => {
    const rem = parseFloat(remValue.replace('rem', ''));
    return `${rem * 16}px`;
  };

  return (
    <div className="p-6 space-y-12">
      {/* Base Spacing Scale */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Base Spacing Scale</h2>
        <p className="text-gray-600 mb-6">
          All spacing follows a 4px base grid. Each step maintains visual harmony and consistency.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(designTokens.spacing)
            .filter(([key]) => !isNaN(Number(key)))
            .map(([key, value]) => (
              <SpacingBox 
                key={key}
                size={value} 
                label={`spacing-${key}`} 
                value={`${value} (${convertRemToPx(value)})`}
              />
            ))}
        </div>
      </div>

      {/* Semantic Spacing */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Semantic Spacing</h2>
        <p className="text-gray-600 mb-6">
          Semantic spacing tokens provide meaningful names for common spacing patterns.
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Section Spacing</h3>
            <div className="space-y-3">
              {Object.entries(designTokens.spacing.section).map(([key, value]) => (
                <SpacingBox 
                  key={key}
                  size={value} 
                  label={`section-${key}`} 
                  value={`${value} (${convertRemToPx(value)})`}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Component Spacing</h3>
            <div className="space-y-3">
              {Object.entries(designTokens.spacing.component).map(([key, value]) => (
                <SpacingBox 
                  key={key}
                  size={value} 
                  label={`component-${key}`} 
                  value={`${value} (${convertRemToPx(value)})`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Examples */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Visual Examples</h2>
        
        <div className="space-y-8">
          {/* Section spacing example */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Section Spacing (70px)</h3>
            <div className="bg-gray-100 border-2 border-dashed border-gray-300">
              <div className="section-hg bg-white border border-gray-200">
                <div className="text-center">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Section Content</h4>
                  <p className="text-gray-600">This section uses the standard 70px vertical padding</p>
                </div>
              </div>
            </div>
          </div>

          {/* Component spacing example */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Component Spacing Examples</h3>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-component-sm">
                <h5 className="font-semibold text-gray-900">Small Component (16px)</h5>
                <p className="text-gray-600 text-sm">Uses component-sm spacing</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-component-md">
                <h5 className="font-semibold text-gray-900">Medium Component (24px)</h5>
                <p className="text-gray-600">Uses component-md spacing</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-component-lg">
                <h5 className="font-semibold text-gray-900">Large Component (32px)</h5>
                <p className="text-gray-600">Uses component-lg spacing</p>
              </div>
            </div>
          </div>

          {/* Margin examples */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Margin Examples</h3>
            <div className="bg-gray-100 p-6 space-y-0">
              <div className="bg-brand-primary text-black p-4 mb-2">Element with mb-2 (8px)</div>
              <div className="bg-brand-primary text-black p-4 mb-4">Element with mb-4 (16px)</div>
              <div className="bg-brand-primary text-black p-4 mb-6">Element with mb-6 (24px)</div>
              <div className="bg-brand-primary text-black p-4 mb-8">Element with mb-8 (32px)</div>
              <div className="bg-brand-primary text-black p-4">Final element</div>
            </div>
          </div>

          {/* Padding examples */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Padding Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-brand-primaryLight border border-brand-primary rounded-lg">
                <div className="bg-white p-2 m-2 rounded border border-gray-200">p-2 (8px)</div>
              </div>
              <div className="bg-brand-primaryLight border border-brand-primary rounded-lg">
                <div className="bg-white p-4 m-2 rounded border border-gray-200">p-4 (16px)</div>
              </div>
              <div className="bg-brand-primaryLight border border-brand-primary rounded-lg">
                <div className="bg-white p-6 m-2 rounded border border-gray-200">p-6 (24px)</div>
              </div>
              <div className="bg-brand-primaryLight border border-brand-primary rounded-lg">
                <div className="bg-white p-8 m-2 rounded border border-gray-200">p-8 (32px)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Guidelines */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Guidelines</h2>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Section Spacing</h4>
            <p className="text-gray-600 text-sm">
              Use <code className="bg-gray-200 px-1 rounded">section-hg</code> or <code className="bg-gray-200 px-1 rounded">py-section-md</code> for 
              consistent vertical spacing between major page sections.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Component Spacing</h4>
            <p className="text-gray-600 text-sm">
              Use component spacing tokens for internal component padding: 
              <code className="bg-gray-200 px-1 rounded ml-1">p-component-sm</code>, 
              <code className="bg-gray-200 px-1 rounded ml-1">p-component-md</code>, 
              <code className="bg-gray-200 px-1 rounded ml-1">p-component-lg</code>
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Base Grid</h4>
            <p className="text-gray-600 text-sm">
              All spacing values follow a 4px base grid. Use base spacing tokens 
              (<code className="bg-gray-200 px-1 rounded">spacing-4</code>, 
              <code className="bg-gray-200 px-1 rounded">spacing-8</code>, etc.) 
              for fine-tuned spacing control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Design System/Spacing',
  component: Spacing,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive spacing system built on a 4px base grid. Includes base spacing scale, semantic spacing tokens, and visual examples.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spacing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSpacing: Story = {};