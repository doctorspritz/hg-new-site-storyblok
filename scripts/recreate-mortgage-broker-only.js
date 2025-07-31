/**
 * Re-create ONLY Mortgage Broker Location Pages with Full Content
 */

import fs from 'fs';
import path from 'path';

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const SPACE_ID = '286142863933168';
const MANAGEMENT_TOKEN = 'hDoTbFJT0rY5EWSHzwWaugtt-227701-hPzELRvDFqyCsKCe2i1V';

// Load WordPress export data
let wordpressData;
try {
  const dataPath = path.join(process.cwd(), 'wordpress-export.json');
  wordpressData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  
  // Filter only mortgage broker location pages
  wordpressData = wordpressData.filter(page => 
    page.data?.url?.startsWith('/mortgage-broker-') && 
    page.data.url.split('-').length >= 3 // Ensure it's a location page, not just '/mortgage-broker'
  );
  
  console.log(`📄 Found ${wordpressData.length} mortgage broker location pages`);
} catch (error) {
  console.error('❌ Could not load wordpress-export.json:', error.message);
  process.exit(1);
}

/**
 * Create Storyblok blocks with rich content
 */
function createRichMortgageBrokerBlocks(page) {
  const blocks = [];
  const location = page.data.url.replace('/mortgage-broker-', '').replace(/-/g, ' ')
    .split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  // 1. Hero Section
  blocks.push({
    component: 'hero',
    title: `Expert Mortgage Broker in ${location}`,
    subtitle: `Award-winning mortgage brokers serving ${location} and surrounding Brisbane areas. Get expert guidance with one of Queensland's highest loan approval rates.`,
    cta_text: 'Get Free Assessment',
    cta_link: '#contact'
  });
  
  // 2. About the Area section
  blocks.push({
    component: 'text',
    title: `About ${location}`,
    content: `${location} is a vibrant Brisbane suburb offering excellent opportunities for homebuyers and property investors. Our local mortgage brokers understand the ${location} property market and can help you secure the best home loan for your situation.`
  });
  
  // 3. Services section
  blocks.push({
    component: 'text',
    title: `Our Mortgage Services in ${location}`,
    content: `**First Home Buyers**
Get expert guidance navigating the property market as a first-time buyer. We help maximize your borrowing capacity and find the right loan.

**Refinancing**
Already own property in ${location}? We can help you secure better rates and terms with our refinancing expertise.

**Investment Loans**
Looking to invest in ${location}? Our investment loan specialists help structure your loan for maximum tax benefits and cash flow.

**Construction Loans**
Building your dream home in ${location}? We handle the complexity of construction financing from start to finish.`
  });
  
  // 4. Why Choose Us section
  blocks.push({
    component: 'text',
    title: 'Why Choose Hunter Galloway',
    content: `• **Local Expertise**: Deep understanding of the ${location} property market
• **40+ Lenders**: Access to competitive rates from major banks and specialist lenders
• **No Upfront Fees**: Our service is completely free for borrowers
• **Award Winning**: Recognized as one of Australia's top mortgage broking firms
• **End-to-End Support**: From pre-approval to settlement, we're with you every step`
  });
  
  // 5. CTA Section
  blocks.push({
    component: 'cta',
    title: 'Ready to get started?',
    description: `Get expert mortgage advice from our award-winning brokers serving ${location}. Book your free consultation today.`,
    button_text: 'Book Free Consultation',
    button_link: '/contact'
  });
  
  return blocks;
}

/**
 * Create new Storyblok story
 */
async function createStory(storyData) {
  const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories`, {
    method: 'POST',
    headers: {
      'Authorization': MANAGEMENT_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ story: storyData })
  });
  
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.text();
    throw new Error(`Failed to create story: ${error}`);
  }
}

/**
 * Publish story
 */
async function publishStory(storyId) {
  const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories/${storyId}/publish`, {
    method: 'GET',
    headers: {
      'Authorization': MANAGEMENT_TOKEN,
      'Content-Type': 'application/json'
    }
  });
  
  return response.ok;
}

async function recreateMortgageBrokerPages() {
  console.log(`🔄 Creating ${wordpressData.length} mortgage broker pages with rich content...\n`);
  
  let created = 0;
  let failed = 0;
  
  for (const page of wordpressData) {
    try {
      const location = page.data.url.replace('/mortgage-broker-', '').replace(/-/g, ' ')
        .split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
      // Create rich Storyblok blocks
      const storyblokBlocks = createRichMortgageBrokerBlocks(page);
      
      const storyData = {
        name: `Award Winning Mortgage Broker in ${location}`,
        slug: page.data.url.substring(1), // Remove leading slash
        content: {
          component: 'page',
          body: storyblokBlocks
        },
        tag_list: ['mortgage-broker', 'location-page'],
        published: false
      };
      
      const result = await createStory(storyData);
      
      if (result.story) {
        // Publish the story
        const published = await publishStory(result.story.id);
        console.log(`✅ Created & ${published ? 'published' : 'saved'}: ${location}`);
        created++;
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.log(`❌ Failed to create ${page.name}: ${error.message}`);
      failed++;
    }
  }
  
  console.log(`\n📊 Creation Summary:`);
  console.log(`✅ Successfully created: ${created} pages`);
  console.log(`❌ Failed to create: ${failed} pages`);
  
  if (created > 0) {
    console.log('\n🎉 Mortgage broker pages recreated successfully!');
    console.log('Features added:');
    console.log('✅ Hero sections with location-specific content');
    console.log('✅ About the area information');
    console.log('✅ Comprehensive service descriptions');
    console.log('✅ Why choose us section');
    console.log('✅ Clear call-to-action sections');
  }
}

recreateMortgageBrokerPages();