# Storyblok-Astro Sync Management Guide

## Overview

This guide explains how to keep Storyblok content and Astro pages synchronized to prevent content mismatches.

## Current Architecture

### 1. **Storyblok-Managed Pages** (Dynamic)
- **Pattern**: `/mortgage-broker-[location]/`
- **Source**: Storyblok CMS
- **File**: `src/pages/mortgage-broker-[location].astro`
- **Count**: 10 pages currently

### 2. **Astro-Managed Pages** (Static)
- All other pages (blog, resources, calculators, etc.)
- Source: Astro `.astro` and `.mdx` files
- Managed directly in the codebase

## Page Sync Status

Run the audit script to check current sync status:
```bash
npm run audit:pages
```

## How Pages Work

### Storyblok → Astro Flow

1. **Content Creation in Storyblok**
   - Pages are created with the `page` component
   - Content blocks: `hero`, `text`, `cta`, etc.

2. **Build Time Generation**
   - `mortgage-broker-[location].astro` fetches all stories
   - Generates static pages for each location
   - No runtime API calls needed

3. **Component Mapping**
   ```javascript
   // astro.config.mjs
   components: {
     'page': 'components/storyblok/Page',
     'hero': 'components/storyblok/Hero',
     'text': 'components/storyblok/Text',
     // ... other components
   }
   ```

## Preventing Sync Issues

### 1. **Always Use Scripts for Bulk Operations**

```bash
# Create new pages
node scripts/create-storyblok-pages.js

# Publish all pages
node scripts/publish-storyblok-pages.js

# Validate sync
node scripts/validate-sync.js
```

### 2. **Component Guidelines**

✅ **DO:**
- Use only defined components (page, hero, text, cta, etc.)
- Always include a hero section for mortgage broker pages
- Use the `page` component as the root

❌ **DON'T:**
- Create components in Storyblok without corresponding Astro components
- Manually create pages without proper structure
- Mix content management approaches

### 3. **Adding New Components**

If you need a new component:

1. Define it in Storyblok's Block Library
2. Create the Astro component: `src/components/storyblok/NewComponent.astro`
3. Register in `astro.config.mjs`:
   ```javascript
   components: {
     'new-component': 'components/storyblok/NewComponent'
   }
   ```

### 4. **Regular Maintenance**

Add to your workflow:
- Run `npm run audit:pages` before deployments
- Check for undefined components
- Verify all pages have required content

## Troubleshooting

### Missing Components Error
```
❌ Undefined components used: teaser, grid
```
**Solution**: Either create the missing Astro components or update the Storyblok content to use defined components.

### Missing Hero Sections
```
⚠️ mortgage-broker-archerfield is missing a hero section
```
**Solution**: Edit the page in Storyblok and add a hero block at the top.

### Build Failures
If the build fails due to Storyblok issues:
1. Check API token is set in environment
2. Verify Storyblok API is accessible
3. Run validation script to identify issues

## NPM Scripts

Add these to `package.json`:
```json
{
  "scripts": {
    "audit:pages": "node scripts/audit-pages.js",
    "validate:sync": "node scripts/validate-sync.js",
    "storyblok:create": "node scripts/create-storyblok-pages.js",
    "storyblok:publish": "node scripts/publish-storyblok-pages.js"
  }
}
```

## Best Practices

1. **Single Source of Truth**
   - Mortgage broker pages: Storyblok only
   - Other pages: Astro files only

2. **Consistent Structure**
   - All Storyblok pages use the same component structure
   - Follow the existing mortgage broker page template

3. **Version Control**
   - Commit Storyblok scripts and configurations
   - Document any component changes

4. **Deployment Checks**
   - Run validation before pushing
   - Monitor Netlify build logs for Storyblok errors

## Emergency Procedures

If Storyblok API is down:
1. The site will use last successful build
2. Static pages will continue working
3. Consider implementing fallback content

If pages are out of sync:
1. Run `npm run audit:pages` to identify issues
2. Fix content in Storyblok or code as needed
3. Rebuild and deploy

---

Remember: The key to avoiding sync issues is consistency. Always use the defined components and follow the established patterns.