import fetch from 'node-fetch';

const PUBLIC_TOKEN = '2M8tuQ6eLmpwuw7WUhMccAtt';

async function showStoryblokContent() {
  const response = await fetch(`https://api.storyblok.com/v2/cdn/stories?token=${PUBLIC_TOKEN}&version=published&per_page=100`);
  const data = await response.json();
  const stories = data.stories || [];
  
  console.log('📘 STORYBLOK CONTENT (' + stories.length + ' pages total)\n');
  console.log('='.repeat(60));
  
  stories.forEach((story, index) => {
    console.log('\n' + (index + 1) + '. ' + story.name);
    console.log('   Slug: /' + story.slug + '/');
    console.log('   ID: ' + story.id);
    console.log('   Component: ' + story.content.component);
    console.log('   Created: ' + new Date(story.created_at).toLocaleDateString());
    console.log('   Published: ' + new Date(story.published_at).toLocaleDateString());
    
    // Show content blocks
    if (story.content.body && story.content.body.length > 0) {
      console.log('   Content blocks:');
      story.content.body.forEach(block => {
        let blockInfo = '     - ' + block.component;
        if (block.title) blockInfo += ': "' + block.title + '"';
        else if (block.headline) blockInfo += ': "' + block.headline + '"';
        else if (block.name) blockInfo += ': "' + block.name + '"';
        console.log(blockInfo);
      });
    } else {
      console.log('   Content blocks: (none)');
    }
    
    // Show SEO fields if present
    if (story.content.seo_title || story.content.seo_description) {
      console.log('   SEO:');
      if (story.content.seo_title) console.log('     - Title: ' + story.content.seo_title);
      if (story.content.seo_description) console.log('     - Description: ' + story.content.seo_description);
    }
  });
  
  // Summary by type
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 SUMMARY:\n');
  
  const mortgageBroker = stories.filter(s => s.slug.startsWith('mortgage-broker-'));
  const home = stories.filter(s => s.slug === 'home');
  const other = stories.filter(s => !s.slug.startsWith('mortgage-broker-') && s.slug !== 'home');
  
  console.log('   🏘️  Mortgage Broker Pages: ' + mortgageBroker.length);
  if (mortgageBroker.length > 0) {
    const locations = mortgageBroker
      .map(s => s.slug.replace('mortgage-broker-', ''))
      .map(loc => loc.charAt(0).toUpperCase() + loc.slice(1).replace(/-/g, ' '));
    console.log('      Locations: ' + locations.join(', '));
  }
  
  console.log('\n   🏠 Home Page: ' + (home.length > 0 ? 'Yes' : 'No'));
  
  if (other.length > 0) {
    console.log('\n   📄 Other Pages: ' + other.length);
    other.forEach(s => console.log('      - ' + s.name + ' (/' + s.slug + '/)'));
  }
  
  // Check content completeness
  console.log('\n⚠️  CONTENT STATUS:\n');
  let issueCount = 0;
  
  stories.forEach(story => {
    const issues = [];
    
    if (!story.content.body || story.content.body.length === 0) {
      issues.push('No content blocks');
    }
    
    if (story.slug.startsWith('mortgage-broker-')) {
      const hasHero = story.content.body?.some(b => b.component === 'hero');
      if (!hasHero) {
        issues.push('Missing hero section');
      }
    }
    
    if (issues.length > 0) {
      issueCount++;
      console.log('   /' + story.slug + '/:');
      issues.forEach(issue => console.log('     - ' + issue));
    }
  });
  
  if (issueCount === 0) {
    console.log('   ✅ All pages have content!');
  }
}

showStoryblokContent().catch(console.error);