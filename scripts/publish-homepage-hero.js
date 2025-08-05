const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const SPACE_ID = '286142863933168';
const MANAGEMENT_TOKEN = 'hDoTbFJT0rY5EWSHzwWaugtt-227701-hPzELRvDFqyCsKCe2i1V';

async function publishHomepageHeroExample() {
  try {
    // First, get the story to find its ID
    const searchResponse = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories?search=homepage-hero-example`, {
      headers: {
        'Authorization': MANAGEMENT_TOKEN,
        'Content-Type': 'application/json'
      }
    });

    if (!searchResponse.ok) {
      throw new Error(`Failed to search stories: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    const story = searchData.stories.find(s => s.slug === 'homepage-hero-example');

    if (!story) {
      console.log('❌ Story not found');
      return;
    }

    console.log(`📄 Found story: ${story.name} (ID: ${story.id})`);

    // Publish the story
    const publishResponse = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories/${story.id}/publish`, {
      method: 'GET',
      headers: {
        'Authorization': MANAGEMENT_TOKEN,
        'Content-Type': 'application/json'
      }
    });

    if (publishResponse.ok) {
      console.log('✅ Story published successfully!');
      console.log(`🌐 URL: https://hg-new-site.netlify.app/homepage-hero-example`);
    } else {
      const error = await publishResponse.text();
      console.log('❌ Failed to publish story:', error);
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

publishHomepageHeroExample();