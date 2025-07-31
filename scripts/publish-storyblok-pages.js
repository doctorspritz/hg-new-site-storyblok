/**
 * Publish all Storyblok pages
 * 
 * This script publishes all draft pages in Storyblok so they can be accessed
 * via the public API token.
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const SPACE_ID = '286142863933168';
const MANAGEMENT_TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN;

if (!MANAGEMENT_TOKEN) {
  console.error('❌ Please set STORYBLOK_MANAGEMENT_TOKEN environment variable');
  process.exit(1);
}

async function publishAllPages() {
  console.log('🚀 Publishing all Storyblok pages...');
  
  try {
    // Get all stories
    const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories`, {
      headers: {
        'Authorization': MANAGEMENT_TOKEN,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch stories: ${response.status}`);
    }
    
    const data = await response.json();
    const stories = data.stories || [];
    
    console.log(`📄 Found ${stories.length} stories to publish`);
    
    let published = 0;
    let failed = 0;
    
    for (const story of stories) {
      try {
        const publishResponse = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories/${story.id}/publish`, {
          method: 'GET',
          headers: {
            'Authorization': MANAGEMENT_TOKEN,
            'Content-Type': 'application/json'
          }
        });
        
        if (publishResponse.ok) {
          console.log(`✅ Published: ${story.name} (${story.slug})`);
          published++;
        } else {
          console.log(`❌ Failed to publish: ${story.name}`);
          failed++;
        }
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
        
      } catch (error) {
        console.log(`❌ Error publishing ${story.name}: ${error.message}`);
        failed++;
      }
    }
    
    console.log(`\n📊 Publishing Summary:`);
    console.log(`✅ Successfully published: ${published} pages`);
    console.log(`❌ Failed to publish: ${failed} pages`);
    console.log(`📄 Total processed: ${stories.length} pages`);
    
    if (published > 0) {
      console.log('\n🎉 Pages published! They should now be visible on your site.');
      console.log('Visit: http://localhost:4321/mortgage-broker-bracken-ridge');
    }
    
  } catch (error) {
    console.error('❌ Publishing failed:', error.message);
  }
}

publishAllPages();