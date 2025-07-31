const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testTokenDirect() {
  const PUBLIC_TOKEN = '2M8tuQ6eLmpwuw7WUhMccAtt';
  const SPACE_ID = '286142863933168';
  
  console.log('🔍 Testing Storyblok public token directly...');
  console.log(`Token: ${PUBLIC_TOKEN}`);
  console.log(`Space ID: ${SPACE_ID}`);
  
  try {
    const response = await fetch(`https://api.storyblok.com/v2/cdn/stories?token=${PUBLIC_TOKEN}&version=published`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Response status: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Token works!');
      console.log(`Found ${data.stories?.length || 0} stories`);
      
      if (data.stories?.length > 0) {
        console.log('\nFirst few stories:');
        data.stories.slice(0, 3).forEach(story => {
          console.log(`  - ${story.name} (/${story.slug})`);
        });
      }
    } else {
      const error = await response.text();
      console.log('❌ Token test failed:');
      console.log(error);
    }
  } catch (error) {
    console.error('❌ Error testing token:', error.message);
  }
}

testTokenDirect();