# Hunter Galloway Sync Pipeline

A comprehensive sync pipeline that keeps Figma, Storybook, Storyblok, and Astro components in sync. This system automatically generates components, syncs design tokens, and manages deployments.

## Architecture Overview

```
┌─────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Figma  │───▶│  Storybook  │───▶│  Storyblok  │───▶│    Astro    │
│ Design  │    │   Stories   │    │    CMS      │    │ Components  │
│ Tokens  │    │             │    │             │    │             │
└─────────┘    └─────────────┘    └─────────────┘    └─────────────┘
     │               │                    │                   │
     │               │                    │                   │
     ▼               ▼                    ▼                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Sync Pipeline                                │
│  • Webhooks • CI/CD • Monitoring • Validation • Deployment     │
└─────────────────────────────────────────────────────────────────┘
```

## Features

### 🎨 **Design Token Sync**
- Automatically extracts colors, typography, spacing from Figma
- Updates design tokens file and Tailwind config
- Validates token formats and consistency

### 🧩 **Component Generation**
- Auto-generates Astro components from Storyblok schemas
- Creates TypeScript types and validation schemas
- Generates Storybook stories for each component
- Maintains documentation and component relationships

### 🚀 **Automated Deployment**
- GitHub Actions workflow for continuous integration
- Webhook handling for real-time updates
- Automated Storybook publishing to Chromatic
- Netlify deployment triggers

### 📊 **Monitoring & Validation**
- Component integrity validation
- Design token compliance checking
- Health reports and metrics collection
- Issue detection and recommendations

## Quick Start

### 1. Environment Setup

Create `.env` file with required tokens:

```bash
# Storyblok
STORYBLOK_MANAGEMENT_TOKEN=your_management_token
STORYBLOK_PREVIEW_TOKEN=your_preview_token
STORYBLOK_SPACE_ID=your_space_id
STORYBLOK_WEBHOOK_SECRET=your_webhook_secret

# Figma (optional)
FIGMA_ACCESS_TOKEN=your_figma_token
FIGMA_FILE_KEY=your_figma_file_key

# GitHub
GITHUB_TOKEN=your_github_token
GITHUB_OWNER=your_username
GITHUB_REPO=your_repo

# Netlify
NETLIFY_BUILD_HOOK=your_netlify_build_hook
NETLIFY_SITE_ID=your_site_id

# Chromatic
CHROMATIC_PROJECT_TOKEN=chpt_9f9bfd00c5d7358
```

### 2. Install Dependencies

```bash
npm install commander storyblok-js-client
```

### 3. Make CLI Executable

```bash
chmod +x scripts/sync-pipeline/cli.js
```

### 4. Run Initial Sync

```bash
# Generate all components from Storyblok
node scripts/sync-pipeline/cli.js storyblok generate

# Or run full sync pipeline
node scripts/sync-pipeline/cli.js sync
```

## CLI Commands

### Storyblok Operations

```bash
# List all components in Storyblok
node scripts/sync-pipeline/cli.js storyblok components

# Generate all Astro components from Storyblok schemas
node scripts/sync-pipeline/cli.js storyblok generate

# Generate specific component
node scripts/sync-pipeline/cli.js storyblok generate -c hero_with_bullets

# Generate with Storybook stories
node scripts/sync-pipeline/cli.js storyblok generate --stories
```

### Figma Operations

```bash
# Sync design tokens from Figma
node scripts/sync-pipeline/cli.js figma tokens

# Export components from Figma
node scripts/sync-pipeline/cli.js figma components
```

### Monitoring & Validation

```bash
# Validate all components
node scripts/sync-pipeline/cli.js monitor validate

# Generate health report
node scripts/sync-pipeline/cli.js monitor health
```

### Deployment

```bash
# Deploy Storybook to Chromatic
node scripts/sync-pipeline/cli.js deploy storybook

# Trigger site deployment
node scripts/sync-pipeline/cli.js deploy site
```

### Full Sync

```bash
# Run complete sync pipeline
node scripts/sync-pipeline/cli.js sync

# Skip certain steps
node scripts/sync-pipeline/cli.js sync --skip-figma --skip-validation
```

### Configuration

```bash
# Show current configuration
node scripts/sync-pipeline/cli.js config
```

## Webhook Setup

### 1. Storyblok Webhooks

In your Storyblok space settings, create webhooks for:

- **Story published**: `https://your-domain.com/api/webhooks/storyblok`
- **Story updated**: `https://your-domain.com/api/webhooks/storyblok`
- **Component created**: `https://your-domain.com/api/webhooks/storyblok`
- **Component updated**: `https://your-domain.com/api/webhooks/storyblok`

### 2. GitHub Repository Webhooks

For manual triggers, you can dispatch events:

```bash
curl -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/OWNER/REPO/dispatches \
  -d '{"event_type":"storyblok-update"}'
```

## Generated Files Structure

```
src/
├── components/storyblok/
│   ├── HeroWithBullets.astro     # Generated Astro components
│   ├── BulletPoint.astro
│   └── CtaButton.astro
├── stories/Storyblok/
│   ├── HeroWithBullets.stories.tsx  # Generated Storybook stories
│   ├── BulletPoint.stories.tsx
│   └── CtaButton.stories.tsx
└── design-tokens/
    └── tokens.js                 # Updated design tokens

scripts/generated/
├── types/
│   ├── HeroWithBullets.ts        # TypeScript definitions
│   └── BulletPoint.ts
├── schemas/
│   ├── HeroWithBullets.schema.ts # Validation schemas
│   └── BulletPoint.schema.ts
├── docs/
│   ├── HeroWithBullets.md        # Component documentation
│   └── BulletPoint.md
├── logs/                         # Operation logs
└── metrics/                      # Health reports and metrics
```

## Component Generation Flow

### 1. Storyblok Schema → Astro Component

```javascript
// Storyblok schema
{
  "name": "hero_with_bullets",
  "schema": {
    "title": { "type": "text", "required": true },
    "description": { "type": "richtext" },
    "image": { "type": "asset" }
  }
}
```

```astro
<!-- Generated Astro component -->
---
interface Props {
  title: string;
  description?: string;
  image?: any;
}

const { title, description, image } = Astro.props;
---

<div class="hero-with-bullets-component">
  {title && <h1 class="heading-hg-1">{title}</h1>}
  {description && <div set:html={description} />}
  {image?.filename && <img src={image.filename} alt={image.alt || ''} />}
</div>
```

### 2. Auto-generated Storybook Story

```tsx
import type { Meta, StoryObj } from '@storybook/react';

const HeroWithBullets = ({ ...props }) => {
  return (
    <div className="storybook-astro-preview">
      <h3>HeroWithBullets Component</h3>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

export default {
  title: 'Storyblok/HeroWithBullets',
  component: HeroWithBullets,
} satisfies Meta<typeof HeroWithBullets>;

export const Default: StoryObj = {
  args: {
    title: 'Sample title',
    description: '<p>Sample rich text</p>',
    image: { filename: 'https://via.placeholder.com/300x200', alt: 'Placeholder' }
  },
};
```

## GitHub Actions Workflow

The pipeline includes a comprehensive GitHub Actions workflow that:

1. **Validates Configuration** - Checks environment variables and dependencies
2. **Syncs Components** - Generates Astro components from Storyblok schemas
3. **Updates Storybook** - Builds and publishes to Chromatic
4. **Syncs Design Tokens** - Updates tokens from Figma
5. **Validates Build** - Runs type checking, linting, and build tests
6. **Deploys** - Triggers Netlify deployment
7. **Notifies** - Reports success/failure status

### Workflow Triggers

- **Push to main** - Full sync when changes are pushed
- **Pull Request** - Validation-only for PRs
- **Manual Dispatch** - On-demand sync with options
- **Webhook** - Real-time updates from Storyblok/Figma

## Monitoring Dashboard

### Health Metrics

The system tracks:
- Component count (Astro, Storybook, Storyblok)
- Design token coverage
- Validation status
- Last sync timestamps
- Build success rates

### Validation Checks

- **Astro Components**: Props interface, destructuring, CSS classes
- **Storybook Stories**: Required imports, meta export, story exports
- **Design Tokens**: Format validation, required categories
- **Sync Status**: Component-story relationships, file existence

### Recommendations Engine

Automatically suggests:
- Missing Storybook stories
- Component validation fixes
- Performance optimizations
- Design token improvements

## Customization

### Adding New Field Types

To support additional Storyblok field types, update:

1. `getTypeScriptType()` method in `storyblok-sync.js`
2. `generateRenderLogic()` method for Astro template generation
3. `getZodType()` method in `component-generator.js` for validation

### Custom Validation Rules

Add validation rules in `monitoring.js`:

```javascript
// Custom validation for your specific requirements
async validateCustomRules(component) {
  const issues = [];
  
  // Your custom validation logic
  if (!component.includes('design-system-class')) {
    issues.push('Missing design system classes');
  }
  
  return issues;
}
```

### Extending Figma Sync

To sync additional data from Figma:

1. Add extraction methods in `figma-sync.js`
2. Update token structure in `extractTokensFromFigma()`
3. Add validation rules in `monitoring.js`

## Troubleshooting

### Common Issues

1. **"Missing required environment variables"**
   - Check `.env` file has all required tokens
   - Verify tokens are valid and have correct permissions

2. **"Component generation failed"**
   - Check Storyblok API access
   - Verify component schemas are valid
   - Check file write permissions

3. **"Validation issues found"**
   - Run `cli.js monitor validate` for detailed issues
   - Check component file formatting
   - Verify design token structure

4. **"Storybook build failed"**
   - Check for TypeScript errors
   - Verify all imports are correct
   - Check Storybook configuration

### Debug Mode

Enable detailed logging:

```bash
DEBUG=sync-pipeline node scripts/sync-pipeline/cli.js sync
```

### Manual Recovery

If sync gets out of sync:

```bash
# Reset and regenerate everything
rm -rf src/components/storyblok/*
rm -rf src/stories/Storyblok/*
node scripts/sync-pipeline/cli.js sync
```

## Best Practices

### Component Naming
- Use snake_case in Storyblok (e.g., `hero_with_bullets`)
- Components auto-convert to PascalCase in code (`HeroWithBullets`)

### Schema Design
- Mark required fields appropriately
- Use descriptive field names
- Group related fields logically
- Add field descriptions for documentation

### Design Tokens
- Follow consistent naming conventions
- Use semantic naming (primary, secondary vs red, blue)
- Maintain proper color contrast ratios
- Keep spacing values on 4px grid

### Deployment Strategy
- Test changes in feature branches
- Use manual sync for major updates
- Monitor health reports regularly
- Keep environment variables secure

## Contributing

When adding new features to the sync pipeline:

1. Add CLI commands for new functionality
2. Include proper error handling and validation
3. Update monitoring and health checks
4. Add documentation and examples
5. Test with different scenarios

## Security

- Never commit environment variables to git
- Use webhook secrets for validation
- Limit API token permissions to minimum required
- Regularly rotate access tokens
- Monitor for unusual sync activity

## Performance

The sync pipeline is optimized for:
- Parallel processing where possible
- Incremental updates (only changed components)
- Efficient file I/O operations
- Minimal API calls through caching
- Fast build times with selective triggers

## Support

For issues with the sync pipeline:

1. Check this documentation
2. Run health checks: `cli.js monitor health`
3. Review logs in `scripts/generated/logs/`
4. Validate configuration: `cli.js config`
5. Check GitHub Actions workflow logs