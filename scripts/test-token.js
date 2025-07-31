const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const SPACE_ID = '286142863933168';
const MANAGEMENT_TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN;

async function testToken() {
  console.log('🔍 Testing Storyblok Management API token...');
  console.log(`Space ID: ${SPACE_ID}`);
  console.log(`Token: ${MANAGEMENT_TOKEN ? MANAGEMENT_TOKEN.substring(0, 10) + '...' : 'NOT SET'}`);
  
  try {
    // Test with getting space info
    const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`, {
      headers: {
        'Authorization': `Bearer ${MANAGEMENT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Response status: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Token is valid!');
      console.log(`Space name: ${data.space?.name || 'Unknown'}`);
    } else {
      const error = await response.text();
      console.log('❌ Token test failed:');
      console.log(error);
    }
  } catch (error) {
    console.error('❌ Error testing token:', error.message);
  }
}

testToken();