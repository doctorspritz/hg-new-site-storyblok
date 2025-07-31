const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const SPACE_ID = '286142863933168';
const MANAGEMENT_TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN;

async function checkAPI() {
  console.log('🔍 Checking Storyblok API endpoints...');
  
  const endpoints = [
    `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`,
    `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/components`,
    `https://api.storyblok.com/v1/spaces/${SPACE_ID}`,
  ];
  
  const authFormats = [
    MANAGEMENT_TOKEN,
    `Bearer ${MANAGEMENT_TOKEN}`,
    `Token ${MANAGEMENT_TOKEN}`
  ];
  
  for (const endpoint of endpoints) {
    console.log(`\n📡 Testing: ${endpoint}`);
    
    for (const auth of authFormats) {
      try {
        const response = await fetch(endpoint, {
          headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'
          }
        });
        
        console.log(`  Auth format "${auth.substring(0, 20)}...": ${response.status}`);
        
        if (response.ok) {
          console.log(`  ✅ SUCCESS with this format!`);
          const data = await response.json();
          console.log(`  Response keys: ${Object.keys(data).join(', ')}`);
          return;
        }
      } catch (error) {
        console.log(`  ❌ Error: ${error.message}`);
      }
    }
  }
}

checkAPI();