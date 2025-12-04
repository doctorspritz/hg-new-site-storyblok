/**
 * Webhook Handler for Storyblok Changes
 * Handles incoming webhooks and triggers appropriate sync actions
 */

import crypto from 'crypto';
import { StoryblokSync } from './storyblok-sync.js';
import { syncConfig } from './config.js';

class WebhookHandler {
  constructor() {
    this.storyblokSync = new StoryblokSync();
  }

  /**
   * Verify webhook signature from Storyblok
   */
  verifySignature(payload, signature) {
    if (!syncConfig.storyblok.webhookSecret) {
      console.warn('⚠️ No webhook secret configured - skipping signature verification');
      return true;
    }

    const expectedSignature = crypto
      .createHmac('sha1', syncConfig.storyblok.webhookSecret)
      .update(payload)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }

  /**
   * Handle incoming Storyblok webhook
   */
  async handleStoryblokWebhook(req, res) {
    try {
      const signature = req.headers['webhook-signature'];
      const payload = JSON.stringify(req.body);

      // Verify signature
      if (!this.verifySignature(payload, signature)) {
        console.error('❌ Invalid webhook signature');
        return res.status(401).json({ error: 'Invalid signature' });
      }

      const data = req.body;
      console.log(`📦 Received webhook: ${data.action} for ${data.story?.content_type || 'unknown'}`);

      // Process the webhook
      await this.processWebhook(data);

      res.status(200).json({ success: true, message: 'Webhook processed' });
    } catch (error) {
      console.error('Error handling webhook:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Process webhook data
   */
  async processWebhook(data) {
    const { action, story } = data;

    // Handle different webhook events
    switch (action) {
      case 'story.published':
      case 'story.updated':
        await this.handleStoryChange(story, action);
        break;
      
      case 'story.deleted':
        await this.handleStoryDeletion(story);
        break;
      
      case 'component.created':
      case 'component.updated':
      case 'component.deleted':
        await this.handleComponentChange(data);
        break;
      
      case 'datasource.entries_updated':
        await this.handleDatasourceUpdate(data);
        break;
      
      default:
        console.log(`ℹ️ Unhandled webhook action: ${action}`);
    }
  }

  /**
   * Handle story changes
   */
  async handleStoryChange(story, action) {
    console.log(`📄 Processing story ${action}: ${story.name} (${story.content_type})`);
    
    // Check if this is a component story that affects the design system
    if (this.isDesignSystemStory(story)) {
      await this.handleDesignSystemUpdate(story);
    }

    // Trigger rebuild for content changes
    if (syncConfig.pipeline.autoDeploy) {
      await this.triggerDeployment();
    }
  }

  /**
   * Handle story deletion
   */
  async handleStoryDeletion(story) {
    console.log(`🗑️ Processing story deletion: ${story.name}`);
    
    // Clean up any generated files if needed
    await this.cleanupGeneratedFiles(story);
    
    // Trigger rebuild
    if (syncConfig.pipeline.autoDeploy) {
      await this.triggerDeployment();
    }
  }

  /**
   * Handle component schema changes
   */
  async handleComponentChange(data) {
    await this.storyblokSync.processWebhook(data);
  }

  /**
   * Handle datasource updates (for global content like navigation, settings)
   */
  async handleDatasourceUpdate(data) {
    console.log('📊 Datasource updated, triggering rebuild...');
    
    if (syncConfig.pipeline.autoDeploy) {
      await this.triggerDeployment();
    }
  }

  /**
   * Check if story affects design system
   */
  isDesignSystemStory(story) {
    const designSystemTypes = [
      'design-token',
      'component-library',
      'style-guide'
    ];
    
    return designSystemTypes.includes(story.content_type);
  }

  /**
   * Handle design system updates
   */
  async handleDesignSystemUpdate(story) {
    console.log('🎨 Design system update detected');
    
    // Regenerate design tokens if needed
    if (story.content_type === 'design-token') {
      await this.regenerateDesignTokens(story);
    }
    
    // Update Storybook
    await this.updateStorybook();
  }

  /**
   * Regenerate design tokens
   */
  async regenerateDesignTokens(story) {
    console.log('🔄 Regenerating design tokens...');
    
    // This would extract design tokens from the story content
    // and update the tokens.js file
    const tokens = this.extractTokensFromStory(story);
    
    if (tokens) {
      await this.updateTokensFile(tokens);
    }
  }

  /**
   * Extract design tokens from story content
   */
  extractTokensFromStory(story) {
    // Implementation would depend on how you structure design tokens in Storyblok
    // For example, if you have a colors field with nested objects
    const content = story.content;
    
    return {
      colors: content.colors,
      typography: content.typography,
      spacing: content.spacing,
      // ... other token categories
    };
  }

  /**
   * Update tokens file
   */
  async updateTokensFile(tokens) {
    // This would merge new tokens with existing ones
    // and update the design-tokens/tokens.js file
    console.log('📝 Updating design tokens file...');
    
    // Implementation here would read current tokens,
    // merge with new ones, and write back to file
  }

  /**
   * Update Storybook
   */
  async updateStorybook() {
    console.log('📚 Updating Storybook...');
    
    // Rebuild and republish Storybook to Chromatic
    try {
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);
      
      // Build Storybook
      await execAsync('npm run build-storybook');
      
      // Publish to Chromatic
      await execAsync(`npx chromatic --project-token=${syncConfig.chromatic.projectToken} --exit-zero-on-changes`);
      
      console.log('✅ Storybook updated and published');
    } catch (error) {
      console.error('❌ Error updating Storybook:', error);
    }
  }

  /**
   * Clean up generated files
   */
  async cleanupGeneratedFiles(story) {
    // Remove any generated files associated with the deleted story
    console.log(`🧹 Cleaning up files for deleted story: ${story.name}`);
  }

  /**
   * Trigger deployment
   */
  async triggerDeployment() {
    console.log('🚀 Triggering deployment...');
    
    const promises = [];
    
    // Trigger Netlify build
    if (syncConfig.netlify.buildHook) {
      promises.push(this.triggerNetlifyBuild());
    }
    
    // Update Storybook
    if (syncConfig.pipeline.autoCreateStories) {
      promises.push(this.updateStorybook());
    }
    
    try {
      await Promise.all(promises);
      console.log('✅ All deployments triggered');
    } catch (error) {
      console.error('❌ Error triggering deployments:', error);
    }
  }

  /**
   * Trigger Netlify build
   */
  async triggerNetlifyBuild() {
    try {
      const response = await fetch(syncConfig.netlify.buildHook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        console.log('✅ Netlify build triggered');
      } else {
        console.error('❌ Failed to trigger Netlify build');
      }
    } catch (error) {
      console.error('Error triggering Netlify build:', error);
    }
  }
}

export { WebhookHandler };