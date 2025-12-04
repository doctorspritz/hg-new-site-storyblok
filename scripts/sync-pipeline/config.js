/**
 * Sync Pipeline Configuration
 * Manages syncing between Figma, Storybook, Storyblok, and Astro
 */

export const syncConfig = {
  // Figma Configuration
  figma: {
    // Get from Figma Account Settings > Personal Access Tokens
    accessToken: process.env.FIGMA_ACCESS_TOKEN,
    // Your Figma file key (from the URL)
    fileKey: process.env.FIGMA_FILE_KEY,
    // Node IDs for design system components
    designSystemNodeIds: {
      colors: process.env.FIGMA_COLORS_NODE_ID,
      typography: process.env.FIGMA_TYPOGRAPHY_NODE_ID,
      components: process.env.FIGMA_COMPONENTS_NODE_ID
    }
  },

  // Storyblok Configuration
  storyblok: {
    // Management API token (from Settings > Access Tokens)
    managementToken: process.env.STORYBLOK_MANAGEMENT_TOKEN,
    // Content Delivery API token
    previewToken: process.env.STORYBLOK_PREVIEW_TOKEN,
    spaceId: process.env.STORYBLOK_SPACE_ID,
    webhookSecret: process.env.STORYBLOK_WEBHOOK_SECRET,
    // Webhook URL for your deployment
    webhookUrl: process.env.STORYBLOK_WEBHOOK_URL || 'https://your-domain.com/api/webhooks/storyblok'
  },

  // GitHub/CI Configuration
  github: {
    token: process.env.GITHUB_TOKEN,
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    branch: 'main'
  },

  // Netlify Configuration
  netlify: {
    siteId: process.env.NETLIFY_SITE_ID,
    accessToken: process.env.NETLIFY_ACCESS_TOKEN,
    buildHook: process.env.NETLIFY_BUILD_HOOK
  },

  // Chromatic Configuration
  chromatic: {
    projectToken: process.env.CHROMATIC_PROJECT_TOKEN || 'chpt_9f9bfd00c5d7358'
  },

  // Pipeline Settings
  pipeline: {
    // Auto-generate Astro components from new Storyblok components
    autoGenerateComponents: true,
    // Auto-create Storybook stories for new components
    autoCreateStories: true,
    // Auto-sync design tokens from Figma
    autoSyncTokens: true,
    // Auto-deploy on successful sync
    autoDeploy: true,
    // Validation checks before deployment
    runValidation: true
  },

  // File Paths
  paths: {
    components: 'src/components/storyblok',
    stories: 'src/stories',
    tokens: 'src/design-tokens',
    schemas: 'scripts/storyblok-schemas',
    generated: 'scripts/generated'
  }
};

// Environment validation
export function validateConfig() {
  const required = [
    'STORYBLOK_MANAGEMENT_TOKEN',
    'STORYBLOK_PREVIEW_TOKEN',
    'STORYBLOK_SPACE_ID'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return true;
}