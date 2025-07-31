# Storyblok CMS Integration Setup

## Overview

The Hunter Galloway site now has Storyblok CMS integration, allowing for visual content editing and management. This provides:

- ✅ Visual content editing
- ✅ Real-time preview
- ✅ Content versioning
- ✅ Multi-language support (future)
- ✅ API-first content delivery

## Getting Started

### 1. Storyblok Account Setup

1. Go to [Storyblok](https://app.storyblok.com) and create an account
2. Create a new space for the Hunter Galloway website
3. Get your **Preview Token** from Settings > API Keys
4. The preview token is already configured: `YTFKgU8cDNy8UQBl3IQZxQtt-227701-MzZ4MPBmAaLjDw9HvSys`

### 2. Content Structure

Create these **Content Types** (Blocks) in your Storyblok space:

#### Page (Content Type)
- **Technical Name**: `page`
- **Display Name**: Page
- **Fields**:
  - `title` (Text) - Page title
  - `seo_title` (Text) - SEO title override
  - `seo_description` (Textarea) - Meta description
  - `seo_image` (Asset) - Social sharing image
  - `body` (Blocks) - Page content blocks

#### Hero Block
- **Technical Name**: `hero`
- **Display Name**: Hero Section
- **Fields**:
  - `title` (Text) - Main headline
  - `subtitle` (Textarea) - Subtitle text
  - `background_image` (Asset) - Background image
  - `cta_text` (Text) - Button text
  - `cta_link` (Link) - Button URL

#### Text Block
- **Technical Name**: `text`
- **Display Name**: Rich Text
- **Fields**:
  - `text` (Richtext) - Content
  - `class_name` (Text) - CSS classes

#### Lead Form Block
- **Technical Name**: `lead-form`
- **Display Name**: Lead Form
- **Fields**:
  - `title` (Text) - Form title
  - `subtitle` (Text) - Form subtitle
  - `button_text` (Text) - Submit button text
  - `variant` (Option) - Form style variant

#### Awards Block
- **Technical Name**: `awards`
- **Display Name**: Awards Section
- **Fields**:
  - `title` (Text) - Section title
  - `awards` (Blocks) - Award items
  - `show_background` (Boolean) - Show background

#### CTA Block
- **Technical Name**: `cta`
- **Display Name**: Call to Action
- **Fields**:
  - `title` (Text) - CTA title
  - `subtitle` (Text) - CTA subtitle
  - `button_text` (Text) - Button text
  - `button_link` (Link) - Button URL
  - `variant` (Option) - Style variant
  - `background_color` (Text) - Background color

### 3. Component Mapping

The following Storyblok components are mapped to Astro components:

```javascript
{
  'page': 'storyblok/Page',
  'hero': 'storyblok/Hero',
  'text': 'storyblok/Text',
  'image': 'storyblok/Image',
  'cta': 'storyblok/CTA',
  'lead-form': 'storyblok/LeadForm',
  'awards': 'storyblok/Awards',
  'rating': 'storyblok/Rating',
  'stats': 'storyblok/Stats',
  'reviews': 'storyblok/Reviews',
  'calculator': 'storyblok/Calculator',
  'service-grid': 'storyblok/ServiceGrid'
}
```

### 4. Creating Content

1. **Create Homepage**:
   - Go to Content in Storyblok dashboard
   - Create new story with slug `home`
   - Set content type to `page`
   - Add Hero, Text, Awards, and CTA blocks

2. **Create Service Pages**:
   - Create stories for different loan types
   - Use consistent URL structure: `/home-loans/first-home-buyers/`
   - Add relevant content blocks

3. **Create Location Pages**:
   - Create stories for mortgage broker locations
   - Use URL pattern: `/mortgage-brokers/brisbane/paddington/`

### 5. Development Workflow

#### Local Development
```bash
# Start development server
npm run dev

# Visit http://localhost:4321
# Edit content in Storyblok and see live changes
```

#### Visual Editor
1. Open Storyblok visual editor
2. Enter your local URL: `http://localhost:4321`
3. Edit content visually with real-time preview

#### Production Deployment
- Set `STORYBLOK_TOKEN` environment variable
- Build and deploy: `npm run build`
- Content updates in Storyblok automatically trigger rebuilds

### 6. Content Migration Strategy

#### Phase 1: Key Pages
1. Homepage (`/`)
2. Main service pages (`/home-loans/first-home-buyers/`)
3. Top converting pages (`/mortgage-broker-brisbane/`)

#### Phase 2: Location Pages
1. All Brisbane suburb pages
2. State-level pages
3. Calculator pages

#### Phase 3: Content Pages
1. Blog posts and guides
2. Resource pages
3. Company pages

### 7. SEO Considerations

- **URL Structure**: Maintain existing URLs for SEO
- **Meta Tags**: Use `seo_title` and `seo_description` fields
- **Redirects**: Set up redirects for any URL changes
- **Sitemap**: Automatic generation from Storyblok content

### 8. Performance Optimization

- **Static Generation**: Content is generated at build time
- **Image Optimization**: Storyblok images are automatically optimized
- **Caching**: API responses are cached during build
- **CDN**: Storyblok content is served from global CDN

## Usage Examples

### Creating a New Page
1. Go to Storyblok dashboard
2. Click "Create new" > "Story"
3. Choose "Page" content type
4. Set slug (e.g., `refinance-home-loan`)
5. Add content blocks (Hero, Text, CTA, etc.)
6. Publish and deploy

### Adding a Hero Section
1. In page editor, click "Add block"
2. Choose "Hero Section"
3. Fill in:
   - Title: "Get a stress-free first home loan"
   - Subtitle: "We'll guide you through every step"
   - Background image: Upload hero image
   - CTA text: "Get Free Assessment"
   - CTA link: "/free-assessment"

### Editing Existing Content
1. Find the story in Storyblok
2. Click "Edit"
3. Make changes in visual editor
4. Publish changes
5. Changes appear immediately on live site

## Troubleshooting

### Content Not Loading
- Check STORYBLOK_TOKEN is set correctly
- Verify story slug matches URL
- Check browser console for API errors

### Visual Editor Issues
- Ensure local server is running on port 4321
- Check browser console for JavaScript errors
- Verify component mapping in astro.config.mjs

### Build Failures
- Check all referenced assets exist in Storyblok
- Verify component imports are correct
- Check environment variables are set

## Next Steps

1. **Create initial content** in Storyblok dashboard
2. **Test visual editor** with local development
3. **Migrate key pages** from WordPress content
4. **Set up production deployment** with environment variables
5. **Train content editors** on Storyblok interface

---

**Status**: Ready for content creation and migration
**Documentation**: Complete setup guide
**Integration**: Fully functional with live editing