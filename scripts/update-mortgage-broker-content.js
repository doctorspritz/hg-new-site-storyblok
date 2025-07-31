/**
 * Update existing Mortgage Broker Pages with Rich Content
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const SPACE_ID = '286142863933168';
const MANAGEMENT_TOKEN = 'hDoTbFJT0rY5EWSHzwWaugtt-227701-hPzELRvDFqyCsKCe2i1V';

/**
 * Create rich content blocks for mortgage broker pages
 */
function createRichMortgageBrokerBlocks(location) {
  const blocks = [];
  
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
    content: `${location} is a vibrant Brisbane suburb offering excellent opportunities for homebuyers and property investors. Our local mortgage brokers understand the ${location} property market and can help you secure the best home loan for your situation.

Whether you're a first home buyer, looking to refinance, or investing in ${location} property, our expert team provides personalized guidance tailored to your financial goals.`
  });
  
  // 3. Services section
  blocks.push({
    component: 'text',
    title: `Our Mortgage Services in ${location}`,
    content: `**First Home Buyers**
Get expert guidance navigating the property market as a first-time buyer. We help maximize your borrowing capacity and find the right loan for your ${location} purchase.

**Refinancing**
Already own property in ${location}? We can help you secure better rates and terms with our refinancing expertise, potentially saving you thousands.

**Investment Loans**
Looking to invest in ${location}? Our investment loan specialists help structure your loan for maximum tax benefits and positive cash flow.

**Construction Loans**
Building your dream home in ${location}? We handle the complexity of construction financing from land purchase to completion.`
  });
  
  // 4. Why Choose Us section
  blocks.push({
    component: 'text',
    title: `Why Choose Hunter Galloway in ${location}`,
    content: `✅ **Local Market Expertise**: Deep understanding of the ${location} property market trends and values

✅ **40+ Lender Network**: Access to competitive rates from major banks, credit unions, and specialist lenders

✅ **No Upfront Fees**: Our mortgage broking service is completely free for borrowers - lenders pay us

✅ **Award Winning Service**: Recognized as one of Australia's top mortgage broking firms with 5-star reviews

✅ **End-to-End Support**: From pre-approval to settlement, we handle everything so you don't have to

✅ **Same Day Pre-Approvals**: Get conditional approval within 24 hours on most applications

✅ **Ongoing Support**: We're here for the life of your loan with annual reviews and refinancing advice`
  });
  
  // 5. Process section
  blocks.push({
    component: 'text',
    title: 'Our Simple 4-Step Process',
    content: `**1. Free Consultation**
We discuss your goals, assess your financial situation, and explain your ${location} property options.

**2. Loan Comparison**
We compare loans from 40+ lenders to find the best rates and features for your needs.

**3. Application Management**
We handle all the paperwork, liaising with lenders and keeping you updated throughout.

**4. Settlement Support**
We guide you through settlement and provide ongoing support for the life of your loan.`
  });
  
  // 6. CTA Section
  blocks.push({
    component: 'cta',
    title: 'Ready to get started?',
    description: `Get expert mortgage advice from our award-winning brokers serving ${location}. Book your free consultation today and discover how much you could save.`,
    button_text: 'Book Free Consultation',
    button_link: '/contact'
  });
  
  return blocks;
}

/**
 * Get existing stories
 */
async function getExistingStories() {
  const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories?per_page=100`, {
    headers: {
      'Authorization': MANAGEMENT_TOKEN,
      'Content-Type': 'application/json'
    }
  });
  
  if (response.ok) {
    const data = await response.json();
    return data.stories.filter(s => s.slug.startsWith('mortgage-broker-'));
  } else {
    throw new Error(`Failed to fetch stories: ${response.status}`);
  }
}

/**
 * Update existing story
 */
async function updateStory(storyId, storyData) {
  const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories/${storyId}`, {
    method: 'PUT',
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
    throw new Error(`Failed to update story: ${error}`);
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

async function updateMortgageBrokerPages() {
  console.log('🔄 Updating existing mortgage broker pages with rich content...\n');
  
  try {
    const existingStories = await getExistingStories();
    console.log(`📄 Found ${existingStories.length} existing mortgage broker pages to update`);
    
    let updated = 0;
    let failed = 0;
    
    for (const story of existingStories) {
      try {
        // Extract location from slug
        const location = story.slug
          .replace('mortgage-broker-', '')
          .replace(/-/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        // Create rich content blocks
        const richBlocks = createRichMortgageBrokerBlocks(location);
        
        const updatedStoryData = {
          name: story.name,
          slug: story.slug,
          content: {
            component: 'page',
            body: richBlocks
          },
          tag_list: ['mortgage-broker', 'location-page'],
          published: true
        };
        
        const result = await updateStory(story.id, updatedStoryData);
        
        if (result.story) {
          // Publish the updated story
          const published = await publishStory(result.story.id);
          console.log(`✅ Updated & ${published ? 'published' : 'saved'}: ${location}`);
          updated++;
        }
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 300));
        
      } catch (error) {
        console.log(`❌ Failed to update ${story.name}: ${error.message}`);
        failed++;
      }
    }
    
    console.log(`\n📊 Update Summary:`);
    console.log(`✅ Successfully updated: ${updated} pages`);
    console.log(`❌ Failed to update: ${failed} pages`);
    
    if (updated > 0) {
      console.log('\n🎉 Mortgage broker pages updated successfully!');
      console.log('New content includes:');
      console.log('✅ Hero sections with location-specific messaging');
      console.log('✅ About the area information');
      console.log('✅ Comprehensive service descriptions');
      console.log('✅ Why choose us section with key benefits');
      console.log('✅ Clear 4-step process explanation');
      console.log('✅ Strong call-to-action sections');
      console.log('\nPages now have proper hero sections and rich content!');
    }
    
  } catch (error) {
    console.error('❌ Update failed:', error.message);
  }
}

updateMortgageBrokerPages();