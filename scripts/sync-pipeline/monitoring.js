/**
 * Monitoring and Validation System
 * Tracks sync pipeline health, validates components, and reports issues
 */

import fs from 'fs/promises';
import path from 'path';
import { syncConfig } from './config.js';

class MonitoringSystem {
  constructor() {
    this.logPath = path.join(syncConfig.paths.generated, 'logs');
    this.metricsPath = path.join(syncConfig.paths.generated, 'metrics');
  }

  /**
   * Initialize monitoring system
   */
  async initialize() {
    await Promise.all([
      fs.mkdir(this.logPath, { recursive: true }),
      fs.mkdir(this.metricsPath, { recursive: true })
    ]);
  }

  /**
   * Log sync operation
   */
  async logOperation(operation, status, details = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      operation,
      status,
      details,
      id: this.generateId()
    };

    const logFile = path.join(this.logPath, `${timestamp.split('T')[0]}.json`);
    
    try {
      let logs = [];
      try {
        const existingLogs = await fs.readFile(logFile, 'utf-8');
        logs = JSON.parse(existingLogs);
      } catch (error) {
        // File doesn't exist yet, start with empty array
      }

      logs.push(logEntry);
      await fs.writeFile(logFile, JSON.stringify(logs, null, 2));
      
      console.log(`📊 Logged ${operation}: ${status}`);
    } catch (error) {
      console.error('Error logging operation:', error);
    }
  }

  /**
   * Validate component integrity
   */
  async validateComponents() {
    console.log('🔍 Validating component integrity...');
    
    const validationResults = {
      timestamp: new Date().toISOString(),
      astroComponents: await this.validateAstroComponents(),
      storyblokComponents: await this.validateStoryblokComponents(),
      storybookStories: await this.validateStorybookStories(),
      designTokens: await this.validateDesignTokens()
    };

    await this.saveValidationResults(validationResults);
    
    const issues = this.getValidationIssues(validationResults);
    
    if (issues.length > 0) {
      console.warn(`⚠️ Found ${issues.length} validation issues:`);
      issues.forEach(issue => console.warn(`  - ${issue}`));
      
      await this.logOperation('validation', 'warning', { issues });
    } else {
      console.log('✅ All components valid');
      await this.logOperation('validation', 'success');
    }

    return validationResults;
  }

  /**
   * Validate Astro components
   */
  async validateAstroComponents() {
    const results = { valid: [], invalid: [], missing: [] };
    
    try {
      const componentsDir = syncConfig.paths.components;
      const files = await fs.readdir(componentsDir);
      const astroFiles = files.filter(f => f.endsWith('.astro'));

      for (const file of astroFiles) {
        const filePath = path.join(componentsDir, file);
        const validation = await this.validateAstroComponent(filePath);
        
        if (validation.isValid) {
          results.valid.push({ file, ...validation });
        } else {
          results.invalid.push({ file, ...validation });
        }
      }
    } catch (error) {
      console.error('Error validating Astro components:', error);
    }

    return results;
  }

  /**
   * Validate single Astro component
   */
  async validateAstroComponent(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const issues = [];

      // Check for basic Astro structure
      if (!content.includes('---')) {
        issues.push('Missing frontmatter');
      }

      // Check for TypeScript interface
      if (!content.includes('interface Props')) {
        issues.push('Missing Props interface');
      }

      // Check for proper destructuring
      if (!content.includes('= Astro.props')) {
        issues.push('Missing props destructuring');
      }

      // Check for CSS classes using design system
      const hasDesignSystemClasses = /class="[^"]*(?:btn-hg|card-hg|heading-hg|section-hg|input-hg)/.test(content);
      if (!hasDesignSystemClasses) {
        issues.push('Not using design system classes');
      }

      return {
        isValid: issues.length === 0,
        issues,
        lastModified: (await fs.stat(filePath)).mtime
      };
    } catch (error) {
      return {
        isValid: false,
        issues: [`File read error: ${error.message}`],
        lastModified: null
      };
    }
  }

  /**
   * Validate Storyblok components exist and are in sync
   */
  async validateStoryblokComponents() {
    const results = { synced: [], unsynced: [], missing: [] };
    
    try {
      // This would check against Storyblok API
      // For now, we'll check local component files
      const componentsDir = syncConfig.paths.components;
      const files = await fs.readdir(componentsDir);
      const astroFiles = files.filter(f => f.endsWith('.astro'));

      // Check if each Astro component has a corresponding Storybook story
      for (const file of astroFiles) {
        const componentName = path.basename(file, '.astro');
        const storyPath = path.join(syncConfig.paths.stories, 'Storyblok', `${componentName}.stories.tsx`);
        
        try {
          await fs.access(storyPath);
          results.synced.push({ component: componentName, hasStory: true });
        } catch {
          results.unsynced.push({ component: componentName, hasStory: false });
        }
      }
    } catch (error) {
      console.error('Error validating Storyblok components:', error);
    }

    return results;
  }

  /**
   * Validate Storybook stories
   */
  async validateStorybookStories() {
    const results = { valid: [], invalid: [] };
    
    try {
      const storiesDir = path.join(syncConfig.paths.stories, 'Storyblok');
      
      try {
        const files = await fs.readdir(storiesDir);
        const storyFiles = files.filter(f => f.endsWith('.stories.tsx'));

        for (const file of storyFiles) {
          const filePath = path.join(storiesDir, file);
          const validation = await this.validateStoryFile(filePath);
          
          if (validation.isValid) {
            results.valid.push({ file, ...validation });
          } else {
            results.invalid.push({ file, ...validation });
          }
        }
      } catch (error) {
        // Stories directory might not exist
        console.warn('Storybook stories directory not found');
      }
    } catch (error) {
      console.error('Error validating Storybook stories:', error);
    }

    return results;
  }

  /**
   * Validate single story file
   */
  async validateStoryFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const issues = [];

      // Check for required imports
      if (!content.includes("import type { Meta, StoryObj }")) {
        issues.push('Missing Storybook type imports');
      }

      // Check for meta export
      if (!content.includes('export default meta')) {
        issues.push('Missing meta export');
      }

      // Check for story export
      if (!content.includes('export const')) {
        issues.push('Missing story export');
      }

      return {
        isValid: issues.length === 0,
        issues,
        lastModified: (await fs.stat(filePath)).mtime
      };
    } catch (error) {
      return {
        isValid: false,
        issues: [`File read error: ${error.message}`],
        lastModified: null
      };
    }
  }

  /**
   * Validate design tokens
   */
  async validateDesignTokens() {
    const results = { valid: true, issues: [] };
    
    try {
      const tokensPath = path.join(syncConfig.paths.tokens, 'tokens.js');
      const { designTokens } = await import(path.resolve(tokensPath));

      // Check required token categories
      const requiredCategories = ['colors', 'typography', 'spacing'];
      
      for (const category of requiredCategories) {
        if (!designTokens[category]) {
          results.issues.push(`Missing ${category} tokens`);
          results.valid = false;
        }
      }

      // Validate color format
      if (designTokens.colors) {
        for (const [category, colors] of Object.entries(designTokens.colors)) {
          for (const [name, value] of Object.entries(colors)) {
            if (typeof value === 'string' && !value.match(/^#[0-9a-fA-F]{6}$/)) {
              results.issues.push(`Invalid color format: ${category}.${name} = ${value}`);
              results.valid = false;
            }
          }
        }
      }

      // Validate spacing units
      if (designTokens.spacing) {
        for (const [name, value] of Object.entries(designTokens.spacing)) {
          if (typeof value === 'string' && !value.match(/^\d+(\.\d+)?(px|rem|em)$/)) {
            results.issues.push(`Invalid spacing format: ${name} = ${value}`);
            results.valid = false;
          }
        }
      }

    } catch (error) {
      results.valid = false;
      results.issues.push(`Error loading design tokens: ${error.message}`);
    }

    return results;
  }

  /**
   * Get validation issues summary
   */
  getValidationIssues(validationResults) {
    const issues = [];

    // Astro component issues
    validationResults.astroComponents.invalid.forEach(comp => {
      comp.issues.forEach(issue => {
        issues.push(`Astro ${comp.file}: ${issue}`);
      });
    });

    // Storyblok sync issues
    validationResults.storyblokComponents.unsynced.forEach(comp => {
      issues.push(`${comp.component}: Missing Storybook story`);
    });

    // Storybook issues
    validationResults.storybookStories.invalid.forEach(story => {
      story.issues.forEach(issue => {
        issues.push(`Story ${story.file}: ${issue}`);
      });
    });

    // Design token issues
    if (!validationResults.designTokens.valid) {
      validationResults.designTokens.issues.forEach(issue => {
        issues.push(`Design tokens: ${issue}`);
      });
    }

    return issues;
  }

  /**
   * Save validation results
   */
  async saveValidationResults(results) {
    const timestamp = new Date().toISOString().split('T')[0];
    const filePath = path.join(this.metricsPath, `validation-${timestamp}.json`);
    
    try {
      await fs.writeFile(filePath, JSON.stringify(results, null, 2));
      console.log(`📊 Validation results saved to ${filePath}`);
    } catch (error) {
      console.error('Error saving validation results:', error);
    }
  }

  /**
   * Generate health report
   */
  async generateHealthReport() {
    console.log('📊 Generating system health report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      validation: await this.validateComponents(),
      metrics: await this.collectMetrics(),
      recommendations: await this.generateRecommendations()
    };

    await this.saveHealthReport(report);
    return report;
  }

  /**
   * Collect system metrics
   */
  async collectMetrics() {
    const metrics = {
      components: {
        astro: 0,
        storybook: 0,
        storyblok: 0
      },
      designTokens: {
        colors: 0,
        typography: 0,
        spacing: 0
      },
      lastSync: null,
      uptime: process.uptime()
    };

    try {
      // Count Astro components
      const astroFiles = await fs.readdir(syncConfig.paths.components);
      metrics.components.astro = astroFiles.filter(f => f.endsWith('.astro')).length;

      // Count Storybook stories
      try {
        const storyFiles = await fs.readdir(path.join(syncConfig.paths.stories, 'Storyblok'));
        metrics.components.storybook = storyFiles.filter(f => f.endsWith('.stories.tsx')).length;
      } catch {
        // Directory might not exist
      }

      // Count design tokens
      const tokensPath = path.join(syncConfig.paths.tokens, 'tokens.js');
      const { designTokens } = await import(path.resolve(tokensPath));
      
      if (designTokens.colors) {
        metrics.designTokens.colors = Object.keys(designTokens.colors).reduce((count, category) => {
          return count + Object.keys(designTokens.colors[category]).length;
        }, 0);
      }

      if (designTokens.typography) {
        metrics.designTokens.typography = Object.keys(designTokens.typography).length;
      }

      if (designTokens.spacing) {
        metrics.designTokens.spacing = Object.keys(designTokens.spacing).length;
      }

    } catch (error) {
      console.error('Error collecting metrics:', error);
    }

    return metrics;
  }

  /**
   * Generate recommendations
   */
  async generateRecommendations() {
    const recommendations = [];
    
    // Check component count balance
    const validation = await this.validateComponents();
    
    if (validation.astroComponents.invalid.length > 0) {
      recommendations.push({
        type: 'warning',
        message: `${validation.astroComponents.invalid.length} Astro components have validation issues`,
        action: 'Review and fix component validation errors'
      });
    }

    if (validation.storyblokComponents.unsynced.length > 0) {
      recommendations.push({
        type: 'info',
        message: `${validation.storyblokComponents.unsynced.length} components missing Storybook stories`,
        action: 'Run component generator to create missing stories'
      });
    }

    if (!validation.designTokens.valid) {
      recommendations.push({
        type: 'error',
        message: 'Design tokens have validation issues',
        action: 'Fix design token format and structure'
      });
    }

    // Performance recommendations
    const metrics = await this.collectMetrics();
    
    if (metrics.components.astro > 50) {
      recommendations.push({
        type: 'info',
        message: 'Large number of components detected',
        action: 'Consider implementing component lazy loading'
      });
    }

    return recommendations;
  }

  /**
   * Save health report
   */
  async saveHealthReport(report) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = path.join(this.metricsPath, `health-report-${timestamp}.json`);
    
    try {
      await fs.writeFile(filePath, JSON.stringify(report, null, 2));
      console.log(`📊 Health report saved to ${filePath}`);
    } catch (error) {
      console.error('Error saving health report:', error);
    }
  }

  /**
   * Generate unique ID
   */
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  /**
   * Monitor file changes
   */
  async startFileWatcher() {
    console.log('👀 Starting file watcher...');
    
    const watchPaths = [
      syncConfig.paths.components,
      syncConfig.paths.stories,
      syncConfig.paths.tokens
    ];

    // This would implement file watching
    // Using fs.watch or chokidar for production
    console.log(`Watching paths: ${watchPaths.join(', ')}`);
  }
}

export { MonitoringSystem };