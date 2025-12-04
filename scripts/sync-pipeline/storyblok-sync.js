/**
 * Storyblok Sync Manager
 * Handles component creation, updates, and webhook processing
 */

import StoryblokClient from 'storyblok-js-client';
import fs from 'fs/promises';
import path from 'path';
import { syncConfig } from './config.js';

class StoryblokSync {
  constructor() {
    this.client = new StoryblokClient({
      oauthToken: syncConfig.storyblok.managementToken
    });
    this.spaceId = syncConfig.storyblok.spaceId;
  }

  /**
   * Get all components from Storyblok
   */
  async getAllComponents() {
    try {
      const response = await this.client.get(`spaces/${this.spaceId}/components`);
      return response.data.components;
    } catch (error) {
      console.error('Error fetching components:', error);
      throw error;
    }
  }

  /**
   * Create a new component in Storyblok
   */
  async createComponent(componentData) {
    try {
      const response = await this.client.post(`spaces/${this.spaceId}/components`, {
        component: componentData
      });
      console.log(`✅ Created component: ${componentData.name}`);
      return response.data.component;
    } catch (error) {
      console.error(`Error creating component ${componentData.name}:`, error);
      throw error;
    }
  }

  /**
   * Update existing component in Storyblok
   */
  async updateComponent(componentId, componentData) {
    try {
      const response = await this.client.put(`spaces/${this.spaceId}/components/${componentId}`, {
        component: componentData
      });
      console.log(`✅ Updated component: ${componentData.name}`);
      return response.data.component;
    } catch (error) {
      console.error(`Error updating component ${componentData.name}:`, error);
      throw error;
    }
  }

  /**
   * Generate Astro component from Storyblok schema
   */
  async generateAstroComponent(component) {
    const componentName = this.toPascalCase(component.name);
    const astroComponent = this.generateAstroTemplate(component);
    
    const filePath = path.join(
      syncConfig.paths.components,
      `${componentName}.astro`
    );

    try {
      await fs.writeFile(filePath, astroComponent);
      console.log(`✅ Generated Astro component: ${filePath}`);
      return filePath;
    } catch (error) {
      console.error(`Error writing Astro component ${componentName}:`, error);
      throw error;
    }
  }

  /**
   * Generate Storybook story from Storyblok component
   */
  async generateStorybook(component) {
    const componentName = this.toPascalCase(component.name);
    const story = this.generateStoryTemplate(component);
    
    const filePath = path.join(
      syncConfig.paths.stories,
      'Storyblok',
      `${componentName}.stories.tsx`
    );

    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, story);
      console.log(`✅ Generated Storybook story: ${filePath}`);
      return filePath;
    } catch (error) {
      console.error(`Error writing Storybook story ${componentName}:`, error);
      throw error;
    }
  }

  /**
   * Generate Astro component template
   */
  generateAstroTemplate(component) {
    const componentName = this.toPascalCase(component.name);
    const fields = component.schema || {};
    
    // Generate prop interface
    const props = Object.entries(fields).map(([key, field]) => {
      const type = this.getTypeScriptType(field.type);
      return `  ${key}${field.required === false ? '?' : ''}: ${type};`;
    }).join('\n');

    // Generate field destructuring
    const destructuring = Object.keys(fields).join(', ');

    // Generate render logic based on field types
    const renderLogic = this.generateRenderLogic(fields);

    return `---
/**
 * ${componentName} Component
 * Generated from Storyblok schema
 */

interface Props {
${props}
}

const { ${destructuring} } = Astro.props;
---

<div class="${component.name.replace(/_/g, '-')}-component">
${renderLogic}
</div>

<style>
  .${component.name.replace(/_/g, '-')}-component {
    /* Add component-specific styles here */
  }
</style>`;
  }

  /**
   * Generate Storybook story template
   */
  generateStoryTemplate(component) {
    const componentName = this.toPascalCase(component.name);
    const fields = component.schema || {};
    
    // Generate default args
    const defaultArgs = Object.entries(fields).map(([key, field]) => {
      const defaultValue = this.getDefaultValue(field);
      return `    ${key}: ${JSON.stringify(defaultValue)},`;
    }).join('\n');

    return `import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Note: This story shows the component structure
// Actual rendering happens in Astro
const ${componentName} = ({ ...props }) => {
  return (
    <div className="storybook-astro-preview">
      <h3>${componentName} Component</h3>
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <p><em>This component renders in Astro. Use the Astro dev server to see the actual output.</em></p>
    </div>
  );
};

const meta = {
  title: 'Storyblok/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Storyblok component: ${component.name}',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
${defaultArgs}
  },
};`;
  }

  /**
   * Generate render logic based on field types
   */
  generateRenderLogic(fields) {
    const logic = Object.entries(fields).map(([key, field]) => {
      switch (field.type) {
        case 'text':
        case 'textarea':
          return `  {${key} && <p>{${key}}</p>}`;
        case 'richtext':
          return `  {${key} && <div set:html={${key}} />}`;
        case 'asset':
          return `  {${key}?.filename && <img src={${key}.filename} alt={${key}.alt || ''} />}`;
        case 'boolean':
          return `  {${key} && <div class="active">Active</div>}`;
        case 'blocks':
          return `  {${key}?.map((block, index) => (
    <Fragment key={index}>
      <!-- Render nested blocks here -->
    </Fragment>
  ))}`;
        default:
          return `  {${key} && <div>{JSON.stringify(${key})}</div>}`;
      }
    }).join('\n');

    return logic || '  <!-- Component content -->';
  }

  /**
   * Get TypeScript type for Storyblok field type
   */
  getTypeScriptType(fieldType) {
    const typeMap = {
      'text': 'string',
      'textarea': 'string',
      'richtext': 'string',
      'number': 'number',
      'boolean': 'boolean',
      'asset': 'any',
      'blocks': 'any[]',
      'option': 'string',
      'options': 'string[]',
      'datetime': 'string'
    };
    return typeMap[fieldType] || 'any';
  }

  /**
   * Get default value for field type
   */
  getDefaultValue(field) {
    switch (field.type) {
      case 'text':
      case 'textarea':
        return 'Sample text';
      case 'richtext':
        return '<p>Sample rich text</p>';
      case 'number':
        return 0;
      case 'boolean':
        return false;
      case 'asset':
        return { filename: 'https://via.placeholder.com/300x200', alt: 'Placeholder' };
      case 'blocks':
        return [];
      case 'option':
        return field.options?.[0]?.value || '';
      case 'options':
        return [];
      default:
        return null;
    }
  }

  /**
   * Convert snake_case to PascalCase
   */
  toPascalCase(str) {
    return str
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  /**
   * Process webhook payload
   */
  async processWebhook(payload) {
    const { action, story_type, data } = payload;
    
    console.log(`📦 Processing ${action} for ${story_type}`);

    try {
      if (story_type === 'component') {
        switch (action) {
          case 'published':
          case 'updated':
            await this.handleComponentUpdate(data);
            break;
          case 'created':
            await this.handleComponentCreation(data);
            break;
          case 'deleted':
            await this.handleComponentDeletion(data);
            break;
        }
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
      throw error;
    }
  }

  /**
   * Handle component creation
   */
  async handleComponentCreation(componentData) {
    console.log(`🆕 Creating new component: ${componentData.name}`);
    
    if (syncConfig.pipeline.autoGenerateComponents) {
      await this.generateAstroComponent(componentData);
    }
    
    if (syncConfig.pipeline.autoCreateStories) {
      await this.generateStorybook(componentData);
    }

    // Trigger rebuild
    if (syncConfig.pipeline.autoDeploy) {
      await this.triggerBuild();
    }
  }

  /**
   * Handle component updates
   */
  async handleComponentUpdate(componentData) {
    console.log(`🔄 Updating component: ${componentData.name}`);
    
    // Regenerate Astro component and Storybook story
    await this.generateAstroComponent(componentData);
    await this.generateStorybook(componentData);

    // Trigger rebuild
    if (syncConfig.pipeline.autoDeploy) {
      await this.triggerBuild();
    }
  }

  /**
   * Handle component deletion
   */
  async handleComponentDeletion(componentData) {
    console.log(`🗑️ Deleting component: ${componentData.name}`);
    
    const componentName = this.toPascalCase(componentData.name);
    
    // Remove Astro component
    const astroPath = path.join(syncConfig.paths.components, `${componentName}.astro`);
    const storyPath = path.join(syncConfig.paths.stories, 'Storyblok', `${componentName}.stories.tsx`);
    
    try {
      await fs.unlink(astroPath);
      console.log(`🗑️ Removed Astro component: ${astroPath}`);
    } catch (error) {
      console.warn(`Warning: Could not remove ${astroPath}`);
    }
    
    try {
      await fs.unlink(storyPath);
      console.log(`🗑️ Removed Storybook story: ${storyPath}`);
    } catch (error) {
      console.warn(`Warning: Could not remove ${storyPath}`);
    }

    // Trigger rebuild
    if (syncConfig.pipeline.autoDeploy) {
      await this.triggerBuild();
    }
  }

  /**
   * Trigger build deployment
   */
  async triggerBuild() {
    console.log('🚀 Triggering deployment...');
    
    if (syncConfig.netlify.buildHook) {
      try {
        const response = await fetch(syncConfig.netlify.buildHook, {
          method: 'POST'
        });
        
        if (response.ok) {
          console.log('✅ Netlify build triggered');
        } else {
          console.error('❌ Failed to trigger Netlify build');
        }
      } catch (error) {
        console.error('Error triggering build:', error);
      }
    }
  }
}

export { StoryblokSync };