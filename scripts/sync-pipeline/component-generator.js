/**
 * Component Generator
 * Automatically generates Astro components from Storyblok schemas
 */

import fs from 'fs/promises';
import path from 'path';
import { StoryblokSync } from './storyblok-sync.js';
import { syncConfig } from './config.js';

class ComponentGenerator {
  constructor() {
    this.storyblokSync = new StoryblokSync();
  }

  /**
   * Generate all components from Storyblok schemas
   */
  async generateAllComponents() {
    console.log('🔄 Generating all components from Storyblok...');
    
    try {
      const components = await this.storyblokSync.getAllComponents();
      
      for (const component of components) {
        await this.generateComponent(component);
      }
      
      console.log(`✅ Generated ${components.length} components`);
    } catch (error) {
      console.error('Error generating components:', error);
      throw error;
    }
  }

  /**
   * Generate single component
   */
  async generateComponent(component) {
    console.log(`🔧 Generating component: ${component.name}`);
    
    const tasks = [];
    
    // Generate Astro component
    if (syncConfig.pipeline.autoGenerateComponents) {
      tasks.push(this.storyblokSync.generateAstroComponent(component));
    }
    
    // Generate Storybook story
    if (syncConfig.pipeline.autoCreateStories) {
      tasks.push(this.storyblokSync.generateStorybook(component));
    }
    
    // Generate TypeScript types
    tasks.push(this.generateComponentTypes(component));
    
    await Promise.all(tasks);
    
    console.log(`✅ Component ${component.name} generated successfully`);
  }

  /**
   * Generate TypeScript types for component
   */
  async generateComponentTypes(component) {
    const componentName = this.toPascalCase(component.name);
    const types = this.generateTypeDefinitions(component);
    
    const filePath = path.join(
      syncConfig.paths.generated,
      'types',
      `${componentName}.ts`
    );

    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, types);
      console.log(`✅ Generated types: ${filePath}`);
    } catch (error) {
      console.error(`Error generating types for ${componentName}:`, error);
      throw error;
    }
  }

  /**
   * Generate TypeScript type definitions
   */
  generateTypeDefinitions(component) {
    const componentName = this.toPascalCase(component.name);
    const fields = component.schema || {};
    
    // Generate interface for component props
    const propsInterface = this.generatePropsInterface(fields);
    
    // Generate field type definitions
    const fieldTypes = this.generateFieldTypes(fields);
    
    return `/**
 * TypeScript definitions for ${componentName} component
 * Generated from Storyblok schema
 */

${fieldTypes}

export interface ${componentName}Props {
${propsInterface}
}

export interface ${componentName}Story {
  content: ${componentName}Props;
  id: number;
  name: string;
  slug: string;
  full_slug: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  uuid: string;
}`;
  }

  /**
   * Generate props interface
   */
  generatePropsInterface(fields) {
    return Object.entries(fields).map(([key, field]) => {
      const type = this.getDetailedTypeScriptType(field);
      const optional = field.required === false ? '?' : '';
      const description = field.description ? `\n  /** ${field.description} */` : '';
      
      return `${description}
  ${key}${optional}: ${type};`;
    }).join('\n');
  }

  /**
   * Generate field type definitions
   */
  generateFieldTypes(fields) {
    const customTypes = [];
    
    Object.entries(fields).forEach(([key, field]) => {
      if (field.type === 'option' && field.options) {
        const typeName = `${this.toPascalCase(key)}Option`;
        const options = field.options.map(opt => `'${opt.value}'`).join(' | ');
        customTypes.push(`export type ${typeName} = ${options};`);
      }
      
      if (field.type === 'blocks' && field.restrict_components) {
        const typeName = `${this.toPascalCase(key)}Block`;
        const components = field.restrict_components?.map(comp => `'${comp}'`).join(' | ') || 'string';
        customTypes.push(`export type ${typeName} = ${components};`);
      }
    });
    
    return customTypes.join('\n\n');
  }

  /**
   * Get detailed TypeScript type
   */
  getDetailedTypeScriptType(field) {
    switch (field.type) {
      case 'text':
      case 'textarea':
      case 'richtext':
      case 'markdown':
        return 'string';
      
      case 'number':
        return 'number';
      
      case 'boolean':
        return 'boolean';
      
      case 'datetime':
        return 'string';
      
      case 'asset':
        return `{
    id: number;
    alt: string;
    name: string;
    focus: string;
    title: string;
    filename: string;
    copyright: string;
    fieldtype: 'asset';
  }`;
      
      case 'multiasset':
        return `Array<{
    id: number;
    alt: string;
    name: string;
    focus: string;
    title: string;
    filename: string;
    copyright: string;
    fieldtype: 'asset';
  }>`;
      
      case 'option':
        if (field.options) {
          return field.options.map(opt => `'${opt.value}'`).join(' | ');
        }
        return 'string';
      
      case 'options':
        if (field.options) {
          const optionType = field.options.map(opt => `'${opt.value}'`).join(' | ');
          return `Array<${optionType}>`;
        }
        return 'string[]';
      
      case 'blocks':
        return 'any[]';
      
      case 'link':
        return `{
    id: string;
    url: string;
    linktype: string;
    fieldtype: 'multilink';
    cached_url: string;
  }`;
      
      case 'table':
        return `{
    thead: Array<{ value: string }>;
    tbody: Array<Array<{ value: string }>>;
  }`;
      
      default:
        return 'any';
    }
  }

  /**
   * Generate component validation schema
   */
  async generateValidationSchema(component) {
    const componentName = this.toPascalCase(component.name);
    const schema = this.generateZodSchema(component);
    
    const filePath = path.join(
      syncConfig.paths.generated,
      'schemas',
      `${componentName}.schema.ts`
    );

    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, schema);
      console.log(`✅ Generated validation schema: ${filePath}`);
    } catch (error) {
      console.error(`Error generating schema for ${componentName}:`, error);
      throw error;
    }
  }

  /**
   * Generate Zod validation schema
   */
  generateZodSchema(component) {
    const componentName = this.toPascalCase(component.name);
    const fields = component.schema || {};
    
    const schemaFields = Object.entries(fields).map(([key, field]) => {
      const zodType = this.getZodType(field);
      const optional = field.required === false ? '.optional()' : '';
      
      return `  ${key}: ${zodType}${optional},`;
    }).join('\n');

    return `/**
 * Zod validation schema for ${componentName} component
 * Generated from Storyblok schema
 */

import { z } from 'zod';

export const ${componentName}Schema = z.object({
${schemaFields}
});

export type ${componentName} = z.infer<typeof ${componentName}Schema>;`;
  }

  /**
   * Get Zod type for field
   */
  getZodType(field) {
    switch (field.type) {
      case 'text':
      case 'textarea':
      case 'richtext':
      case 'markdown':
      case 'datetime':
        return 'z.string()';
      
      case 'number':
        return 'z.number()';
      
      case 'boolean':
        return 'z.boolean()';
      
      case 'asset':
        return 'z.object({ filename: z.string(), alt: z.string().optional() })';
      
      case 'multiasset':
        return 'z.array(z.object({ filename: z.string(), alt: z.string().optional() }))';
      
      case 'option':
        if (field.options) {
          const options = field.options.map(opt => `'${opt.value}'`).join(', ');
          return `z.enum([${options}])`;
        }
        return 'z.string()';
      
      case 'options':
        if (field.options) {
          const options = field.options.map(opt => `'${opt.value}'`).join(', ');
          return `z.array(z.enum([${options}]))`;
        }
        return 'z.array(z.string())';
      
      case 'blocks':
        return 'z.array(z.any())';
      
      case 'link':
        return 'z.object({ url: z.string(), cached_url: z.string().optional() })';
      
      default:
        return 'z.any()';
    }
  }

  /**
   * Generate component documentation
   */
  async generateComponentDocs(component) {
    const componentName = this.toPascalCase(component.name);
    const docs = this.generateMarkdownDocs(component);
    
    const filePath = path.join(
      syncConfig.paths.generated,
      'docs',
      `${componentName}.md`
    );

    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, docs);
      console.log(`✅ Generated documentation: ${filePath}`);
    } catch (error) {
      console.error(`Error generating docs for ${componentName}:`, error);
      throw error;
    }
  }

  /**
   * Generate Markdown documentation
   */
  generateMarkdownDocs(component) {
    const componentName = this.toPascalCase(component.name);
    const fields = component.schema || {};
    
    const fieldsTable = Object.entries(fields).map(([key, field]) => {
      const type = field.type;
      const required = field.required !== false ? 'Yes' : 'No';
      const description = field.description || '-';
      
      return `| ${key} | ${type} | ${required} | ${description} |`;
    }).join('\n');

    return `# ${componentName} Component

${component.display_name || componentName} component generated from Storyblok.

## Usage

\`\`\`astro
---
// Import the component
import ${componentName} from '../components/storyblok/${componentName}.astro';
---

<${componentName} 
  prop1="value1"
  prop2="value2"
/>
\`\`\`

## Props

| Property | Type | Required | Description |
|----------|------|----------|-------------|
${fieldsTable}

## Storyblok Configuration

- **Component Name**: \`${component.name}\`
- **Display Name**: ${component.display_name || 'N/A'}
- **Is Root**: ${component.is_root ? 'Yes' : 'No'}
- **Is Nestable**: ${component.is_nestable ? 'Yes' : 'No'}

## Generated Files

- **Astro Component**: \`src/components/storyblok/${componentName}.astro\`
- **Storybook Story**: \`src/stories/Storyblok/${componentName}.stories.tsx\`
- **TypeScript Types**: \`scripts/generated/types/${componentName}.ts\`
- **Validation Schema**: \`scripts/generated/schemas/${componentName}.schema.ts\`

## Last Updated

Generated on: ${new Date().toISOString()}
`;
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
}

export { ComponentGenerator };