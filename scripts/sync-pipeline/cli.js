#!/usr/bin/env node

/**
 * Sync Pipeline CLI
 * Command-line interface for managing the design system sync pipeline
 */

import { program } from 'commander';
import { StoryblokSync } from './storyblok-sync.js';
import { ComponentGenerator } from './component-generator.js';
import { FigmaSync } from './figma-sync.js';
import { MonitoringSystem } from './monitoring.js';
import { syncConfig, validateConfig } from './config.js';

// Initialize CLI
program
  .name('sync-pipeline')
  .description('Hunter Galloway Design System Sync Pipeline')
  .version('1.0.0');

// Storyblok commands
const storyblokCmd = program
  .command('storyblok')
  .description('Storyblok sync operations');

storyblokCmd
  .command('components')
  .description('Fetch all components from Storyblok')
  .action(async () => {
    try {
      validateConfig();
      const sync = new StoryblokSync();
      const components = await sync.getAllComponents();
      console.log(`📦 Found ${components.length} components:`);
      components.forEach(comp => {
        console.log(`  - ${comp.name} (${comp.display_name || 'No display name'})`);
      });
    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  });

storyblokCmd
  .command('generate')
  .description('Generate Astro components from Storyblok schemas')
  .option('-c, --component <name>', 'Generate specific component')
  .option('--stories', 'Also generate Storybook stories')
  .action(async (options) => {
    try {
      validateConfig();
      const generator = new ComponentGenerator();
      
      if (options.component) {
        // Generate specific component
        const sync = new StoryblokSync();
        const components = await sync.getAllComponents();
        const component = components.find(c => c.name === options.component);
        
        if (!component) {
          console.error(`❌ Component "${options.component}" not found`);
          process.exit(1);
        }
        
        await generator.generateComponent(component);
        console.log(`✅ Generated component: ${options.component}`);
      } else {
        // Generate all components
        await generator.generateAllComponents();
        console.log('✅ Generated all components');
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  });

// Figma commands
const figmaCmd = program
  .command('figma')
  .description('Figma sync operations');

figmaCmd
  .command('tokens')
  .description('Sync design tokens from Figma')
  .action(async () => {
    try {
      if (!syncConfig.figma.accessToken) {
        console.error('❌ Figma access token not configured');
        process.exit(1);
      }
      
      const figmaSync = new FigmaSync();
      await figmaSync.syncDesignTokens();
      console.log('✅ Design tokens synced from Figma');
    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  });

figmaCmd
  .command('components')
  .description('Export components from Figma')
  .action(async () => {
    try {
      if (!syncConfig.figma.accessToken) {
        console.error('❌ Figma access token not configured');
        process.exit(1);
      }
      
      const figmaSync = new FigmaSync();
      await figmaSync.exportComponents();
      console.log('✅ Components exported from Figma');
    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  });

// Monitoring commands
const monitorCmd = program
  .command('monitor')
  .description('Monitoring and validation operations');

monitorCmd
  .command('validate')
  .description('Validate all components and design tokens')
  .action(async () => {
    try {
      const monitoring = new MonitoringSystem();
      await monitoring.initialize();
      const results = await monitoring.validateComponents();
      
      const issues = monitoring.getValidationIssues(results);
      if (issues.length === 0) {
        console.log('✅ All components valid');
      } else {
        console.log(`⚠️ Found ${issues.length} issues`);
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  });

monitorCmd
  .command('health')
  .description('Generate system health report')
  .action(async () => {
    try {
      const monitoring = new MonitoringSystem();
      await monitoring.initialize();
      const report = await monitoring.generateHealthReport();
      
      console.log('📊 System Health Report');
      console.log('======================');
      console.log(`Components: ${report.metrics.components.astro} Astro, ${report.metrics.components.storybook} Storybook`);
      console.log(`Design Tokens: ${report.metrics.designTokens.colors} colors, ${report.metrics.designTokens.spacing} spacing`);
      
      if (report.recommendations.length > 0) {
        console.log('\n📋 Recommendations:');
        report.recommendations.forEach(rec => {
          const icon = rec.type === 'error' ? '❌' : rec.type === 'warning' ? '⚠️' : 'ℹ️';
          console.log(`${icon} ${rec.message}`);
          console.log(`   → ${rec.action}`);
        });
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  });

// Deployment commands
const deployCmd = program
  .command('deploy')
  .description('Deployment operations');

deployCmd
  .command('storybook')
  .description('Build and deploy Storybook to Chromatic')
  .action(async () => {
    try {
      console.log('📚 Building and deploying Storybook...');
      
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);
      
      // Build Storybook
      console.log('🔨 Building Storybook...');
      await execAsync('npm run build-storybook');
      
      // Deploy to Chromatic
      console.log('🚀 Deploying to Chromatic...');
      const { stdout } = await execAsync(`npx chromatic --project-token=${syncConfig.chromatic.projectToken} --exit-zero-on-changes`);
      
      // Extract Storybook URL from output
      const urlMatch = stdout.match(/https:\/\/[^\/]+\.chromatic\.com/);
      if (urlMatch) {
        console.log(`✅ Storybook deployed: ${urlMatch[0]}`);
      } else {
        console.log('✅ Storybook deployed to Chromatic');
      }
    } catch (error) {
      console.error('❌ Deployment failed:', error.message);
      process.exit(1);
    }
  });

deployCmd
  .command('site')
  .description('Trigger site deployment')
  .action(async () => {
    try {
      if (!syncConfig.netlify.buildHook) {
        console.error('❌ Netlify build hook not configured');
        process.exit(1);
      }
      
      console.log('🚀 Triggering site deployment...');
      
      const response = await fetch(syncConfig.netlify.buildHook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        console.log('✅ Site deployment triggered');
      } else {
        console.error('❌ Failed to trigger deployment');
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  });

// Full sync command
program
  .command('sync')
  .description('Run full sync pipeline')
  .option('--skip-figma', 'Skip Figma sync')
  .option('--skip-storybook', 'Skip Storybook deployment')
  .option('--skip-validation', 'Skip validation')
  .action(async (options) => {
    try {
      console.log('🔄 Starting full sync pipeline...');
      
      validateConfig();
      
      // 1. Sync design tokens from Figma
      if (!options.skipFigma && syncConfig.figma.accessToken) {
        console.log('🎨 Syncing design tokens from Figma...');
        const figmaSync = new FigmaSync();
        await figmaSync.syncDesignTokens();
      }
      
      // 2. Generate components from Storyblok
      console.log('🔧 Generating components from Storyblok...');
      const generator = new ComponentGenerator();
      await generator.generateAllComponents();
      
      // 3. Validate everything
      if (!options.skipValidation) {
        console.log('🔍 Validating components...');
        const monitoring = new MonitoringSystem();
        await monitoring.initialize();
        const results = await monitoring.validateComponents();
        
        const issues = monitoring.getValidationIssues(results);
        if (issues.length > 0) {
          console.warn(`⚠️ Found ${issues.length} validation issues`);
          issues.forEach(issue => console.warn(`  - ${issue}`));
        }
      }
      
      // 4. Deploy Storybook
      if (!options.skipStorybook) {
        console.log('📚 Deploying Storybook...');
        const { exec } = await import('child_process');
        const { promisify } = await import('util');
        const execAsync = promisify(exec);
        
        await execAsync('npm run build-storybook');
        await execAsync(`npx chromatic --project-token=${syncConfig.chromatic.projectToken} --exit-zero-on-changes`);
      }
      
      console.log('✅ Full sync pipeline completed successfully!');
    } catch (error) {
      console.error('❌ Sync pipeline failed:', error.message);
      process.exit(1);
    }
  });

// Configuration commands
program
  .command('config')
  .description('Show current configuration')
  .action(() => {
    console.log('🔧 Current Configuration:');
    console.log('========================');
    
    console.log('\nStoryblok:');
    console.log(`  Space ID: ${syncConfig.storyblok.spaceId || 'Not configured'}`);
    console.log(`  Management Token: ${syncConfig.storyblok.managementToken ? '✅ Set' : '❌ Not set'}`);
    console.log(`  Preview Token: ${syncConfig.storyblok.previewToken ? '✅ Set' : '❌ Not set'}`);
    
    console.log('\nFigma:');
    console.log(`  Access Token: ${syncConfig.figma.accessToken ? '✅ Set' : '❌ Not set'}`);
    console.log(`  File Key: ${syncConfig.figma.fileKey || 'Not configured'}`);
    
    console.log('\nChromatic:');
    console.log(`  Project Token: ${syncConfig.chromatic.projectToken ? '✅ Set' : '❌ Not set'}`);
    
    console.log('\nNetlify:');
    console.log(`  Build Hook: ${syncConfig.netlify.buildHook ? '✅ Set' : '❌ Not set'}`);
    
    console.log('\nPipeline Settings:');
    console.log(`  Auto Generate Components: ${syncConfig.pipeline.autoGenerateComponents}`);
    console.log(`  Auto Create Stories: ${syncConfig.pipeline.autoCreateStories}`);
    console.log(`  Auto Deploy: ${syncConfig.pipeline.autoDeploy}`);
  });

// Parse command line arguments
program.parse();

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}