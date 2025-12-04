import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const DesignSystemComponents = () => {
  return (
    <div className="p-6 space-y-12">
      {/* Buttons */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Buttons</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Primary Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="btn-hg-primary">Get Free Assessment</button>
              <button className="btn-hg-primary">Calculate Borrowing</button>
              <button className="btn-hg-primary">Book Consultation</button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Use for primary actions and call-to-action buttons. Yellow background with hover effects.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Secondary Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="btn-hg-secondary">Learn More</button>
              <button className="btn-hg-secondary">View Details</button>
              <button className="btn-hg-secondary">Contact Us</button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Use for secondary actions. Blue background with hover effects.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Button States</h3>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-4">
                <button className="btn-hg-primary">Normal</button>
                <button className="btn-hg-primary opacity-80">Hover (simulated)</button>
                <button className="btn-hg-primary opacity-50" disabled>Disabled</button>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="btn-hg-secondary">Normal</button>
                <button className="btn-hg-secondary opacity-80">Hover (simulated)</button>
                <button className="btn-hg-secondary opacity-50" disabled>Disabled</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card-hg">
            <h3 className="heading-hg-3 mb-4">First Home Buyers</h3>
            <p className="text-gray-600 mb-6">
              Expert guidance for first-time homebuyers with access to special programs and grants.
            </p>
            <button className="btn-hg-primary">Learn More</button>
          </div>
          
          <div className="card-hg">
            <h3 className="heading-hg-3 mb-4">Refinancing</h3>
            <p className="text-gray-600 mb-6">
              Lower your rates and save money with our refinancing solutions.
            </p>
            <button className="btn-hg-secondary">Get Quote</button>
          </div>
          
          <div className="card-hg">
            <h3 className="heading-hg-3 mb-4">Investment Loans</h3>
            <p className="text-gray-600 mb-6">
              Specialized loans for property investors with competitive rates.
            </p>
            <button className="btn-hg-primary">Calculate Returns</button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Standard card component with subtle shadow and hover effects. Use for showcasing services or content blocks.
        </p>
      </div>

      {/* Form Elements */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Form Elements</h2>
        <div className="max-w-md space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input 
              type="text" 
              className="input-hg w-full" 
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              className="input-hg w-full" 
              placeholder="your.email@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input 
              type="tel" 
              className="input-hg w-full" 
              placeholder="(04) 1234 5678"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loan Amount
            </label>
            <select className="input-hg w-full">
              <option>Select loan amount</option>
              <option>$300,000 - $500,000</option>
              <option>$500,000 - $750,000</option>
              <option>$750,000 - $1,000,000</option>
              <option>$1,000,000+</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Additional Information
            </label>
            <textarea 
              className="input-hg w-full h-24 resize-none" 
              placeholder="Tell us about your requirements..."
            />
          </div>
          
          <button className="btn-hg-primary w-full">Submit Application</button>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Standard form inputs with focus states and consistent styling.
        </p>
      </div>

      {/* Typography Headings */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Typography Components</h2>
        <div className="space-y-6">
          <div>
            <h1 className="heading-hg-1">Main Page Heading (H1)</h1>
            <p className="text-sm text-gray-600 mt-1">heading-hg-1 class</p>
          </div>
          
          <div>
            <h2 className="heading-hg-2">Section Heading (H2)</h2>
            <p className="text-sm text-gray-600 mt-1">heading-hg-2 class</p>
          </div>
          
          <div>
            <h3 className="heading-hg-3">Subsection Heading (H3)</h3>
            <p className="text-sm text-gray-600 mt-1">heading-hg-3 class</p>
          </div>
        </div>
      </div>

      {/* Alerts/Messages */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Alert Messages</h2>
        <div className="space-y-4">
          <div className="bg-success-light border border-success text-success-dark p-4 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Success!</span>
              <span className="ml-2">Your application has been submitted successfully.</span>
            </div>
          </div>
          
          <div className="bg-warning-light border border-warning text-warning-dark p-4 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Warning:</span>
              <span className="ml-2">Please review your information before submitting.</span>
            </div>
          </div>
          
          <div className="bg-error-light border border-error text-error-dark p-4 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Error:</span>
              <span className="ml-2">There was a problem processing your request.</span>
            </div>
          </div>
          
          <div className="bg-info-light border border-info text-info-dark p-4 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Information:</span>
              <span className="ml-2">Pre-approval usually takes 24-48 hours to process.</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Alert messages using semantic colors for different states and contexts.
        </p>
      </div>

      {/* Layout Sections */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Layout Sections</h2>
        <div className="space-y-6">
          <div className="section-hg bg-gray-50 border-2 border-dashed border-gray-300">
            <div className="text-center">
              <h3 className="heading-hg-2 mb-4">Standard Section</h3>
              <p className="text-gray-600 mb-6">
                This section uses the standard section-hg class for consistent vertical spacing.
              </p>
              <button className="btn-hg-primary">Section CTA</button>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Use section-hg class for consistent 70px vertical padding between major page sections.
        </p>
      </div>
    </div>
  );
};

const meta = {
  title: 'Design System/Components',
  component: DesignSystemComponents,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Pre-built component classes and patterns ready to use. Includes buttons, cards, forms, alerts, and layout sections.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DesignSystemComponents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllComponents: Story = {};