import fetch from 'node-fetch';

const PUBLIC_TOKEN = '2M8tuQ6eLmpwuw7WUhMccAtt';

async function validateSync() {
  console.log('🔄 Validating Storyblok-Astro Sync...\n');
  
  try {
    // Fetch all Storyblok stories
    const response = await fetch(`https://api.storyblok.com/v2/cdn/stories?token=${PUBLIC_TOKEN}&version=published&per_page=100`);
    
    if (!response.ok) {
      throw new Error(`Storyblok API error: ${response.status}`);
    }
    
    const data = await response.json();
    const stories = data.stories || [];
    
    // Categorize stories
    const mortgageBrokerPages = stories.filter(s => s.slug.startsWith('mortgage-broker-'));
    const otherPages = stories.filter(s => !s.slug.startsWith('mortgage-broker-'));
    
    // Validation checks
    const errors = [];
    const warnings = [];
    
    // Check 1: Ensure all mortgage broker pages have required fields
    mortgageBrokerPages.forEach(story => {
      if (!story.content.body || story.content.body.length === 0) {
        warnings.push(`⚠️  ${story.slug} has no content blocks`);
      }
      
      const hasHero = story.content.body?.some(b => b.component === 'hero');
      if (!hasHero) {
        warnings.push(`⚠️  ${story.slug} is missing a hero section`);
      }
    });
    
    // Check 2: Ensure all pages use the 'page' component
    stories.forEach(story => {
      if (story.content.component !== 'page') {
        errors.push(`❌ ${story.slug} uses '${story.content.component}' component instead of 'page'`);
      }
    });
    
    // Check 3: Look for duplicate slugs
    const slugs = stories.map(s => s.slug);
    const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
    if (duplicates.length > 0) {
      errors.push(`❌ Duplicate slugs found: ${duplicates.join(', ')}`);
    }
    
    // Check 4: Validate component usage
    const usedComponents = new Set();
    stories.forEach(story => {
      if (story.content.body) {
        story.content.body.forEach(block => {
          usedComponents.add(block.component);
        });
      }
    });
    
    const definedComponents = ['page', 'hero', 'text', 'image', 'cta', 'lead-form', 'awards', 'rating', 'service-grid', 'teaser', 'grid', 'feature'];
    const undefinedComponents = Array.from(usedComponents).filter(c => !definedComponents.includes(c));
    
    if (undefinedComponents.length > 0) {
      errors.push(`❌ Undefined components used: ${undefinedComponents.join(', ')}`);
    }
    
    // Report results
    console.log(`📊 Summary:`);
    console.log(`   - Total pages: ${stories.length}`);
    console.log(`   - Mortgage broker pages: ${mortgageBrokerPages.length}`);
    console.log(`   - Other pages: ${otherPages.length}`);
    console.log(`   - Components used: ${Array.from(usedComponents).join(', ')}`);
    
    if (errors.length === 0 && warnings.length === 0) {
      console.log('\n✅ All validation checks passed!');
      return true;
    }
    
    if (errors.length > 0) {
      console.log(`\n❌ Errors (${errors.length}):`);
      errors.forEach(e => console.log(`   ${e}`));
    }
    
    if (warnings.length > 0) {
      console.log(`\n⚠️  Warnings (${warnings.length}):`);
      warnings.forEach(w => console.log(`   ${w}`));
    }
    
    return errors.length === 0;
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    return false;
  }
}

// Run validation and exit with appropriate code
validateSync().then(success => {
  process.exit(success ? 0 : 1);
});