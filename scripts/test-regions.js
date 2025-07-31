const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testRegions() {
  const token = '2M8tuQ6eLmpwuw7WUhMccAtt';
  
  console.log('🌍 Testing Storyblok API regions...\n');
  
  try {
    // Test EU region (default)
    console.log('Testing EU region (api.storyblok.com)...');
    const euResponse = await fetch(`https://api.storyblok.com/v2/cdn/stories?token=${token}&version=published`);
    console.log(`✅ EU region status: ${euResponse.status}`);
    if (euResponse.ok) {
      const euData = await euResponse.json();
      console.log(`📄 EU region found ${euData.stories?.length || 0} stories\n`);
    } else {
      console.log(`❌ EU region failed\n`);
    }
  } catch (error) {
    console.log(`❌ EU region error: ${error.message}\n`);
  }
  
  try {
    // Test US region
    console.log('Testing US region (api-us.storyblok.com)...');
    const usResponse = await fetch(`https://api-us.storyblok.com/v2/cdn/stories?token=${token}&version=published`);
    console.log(`✅ US region status: ${usResponse.status}`);
    if (usResponse.ok) {
      const usData = await usResponse.json();
      console.log(`📄 US region found ${usData.stories?.length || 0} stories\n`);
    } else {
      console.log(`❌ US region failed\n`);
    }
  } catch (error) {
    console.log(`❌ US region error: ${error.message}\n`);
  }
}

testRegions();