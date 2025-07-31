/**
 * Fix Block Schema Issues in Storyblok
 * 
 * Updates all mortgage broker pages to use correct field names
 * that match the Storyblok Block Library schema
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const SPACE_ID = '286142863933168';
const MANAGEMENT_TOKEN = 'hDoTbFJT0rY5EWSHzwWaugtt-227701-hPzELRvDFqyCsKCe2i1V';

/**
 * Create blocks with correct schema field names
 */
function createCorrectSchemaBlocks(location) {
  const blocks = [];
  
  // 1. Hero Section - Using correct schema
  blocks.push({
    component: 'hero',
    title: `Expert Mortgage Broker in ${location}`,
    subtitle: `Award-winning mortgage brokers serving ${location} and surrounding Brisbane areas. Get expert guidance with one of Queensland's highest loan approval rates.`,
    cta_text: 'Get Free Assessment',
    cta_link: {
      linktype: 'url',
      url: '#contact'
    }
  });
  
  // 2. About the Area section - Using 'text' field instead of 'content'
  blocks.push({
    component: 'text',
    text: `<h2>About ${location}</h2><p>${location} is a vibrant Brisbane suburb offering excellent opportunities for homebuyers and property investors. Our local mortgage brokers understand the ${location} property market and can help you secure the best home loan for your situation.</p><p>Whether you're a first home buyer, looking to refinance, or investing in ${location} property, our expert team provides personalized guidance tailored to your financial goals.</p>`
  });
  
  // 3. Services section
  blocks.push({
    component: 'text',
    text: `<h2>Our Mortgage Services in ${location}</h2>
    <h3>First Home Buyers</h3>
    <p>Get expert guidance navigating the property market as a first-time buyer. We help maximize your borrowing capacity and find the right loan for your ${location} purchase.</p>
    
    <h3>Refinancing</h3>
    <p>Already own property in ${location}? We can help you secure better rates and terms with our refinancing expertise, potentially saving you thousands.</p>
    
    <h3>Investment Loans</h3>
    <p>Looking to invest in ${location}? Our investment loan specialists help structure your loan for maximum tax benefits and positive cash flow.</p>
    
    <h3>Construction Loans</h3>
    <p>Building your dream home in ${location}? We handle the complexity of construction financing from land purchase to completion.</p>`
  });
  
  // 4. Why Choose Us section
  blocks.push({
    component: 'text',
    text: `<h2>Why Choose Hunter Galloway in ${location}</h2>
    <ul>
    <li><strong>Local Market Expertise</strong>: Deep understanding of the ${location} property market trends and values</li>
    <li><strong>40+ Lender Network</strong>: Access to competitive rates from major banks, credit unions, and specialist lenders</li>
    <li><strong>No Upfront Fees</strong>: Our mortgage broking service is completely free for borrowers - lenders pay us</li>
    <li><strong>Award Winning Service</strong>: Recognized as one of Australia's top mortgage broking firms with 5-star reviews</li>
    <li><strong>End-to-End Support</strong>: From pre-approval to settlement, we handle everything so you don't have to</li>
    <li><strong>Same Day Pre-Approvals</strong>: Get conditional approval within 24 hours on most applications</li>
    <li><strong>Ongoing Support</strong>: We're here for the life of your loan with annual reviews and refinancing advice</li>
    </ul>`
  });
  
  // 5. Process section
  blocks.push({
    component: 'text',
    text: `<h2>Our Simple 4-Step Process</h2>
    <h3>1. Free Consultation</h3>
    <p>We discuss your goals, assess your financial situation, and explain your ${location} property options.</p>
    
    <h3>2. Loan Comparison</h3>
    <p>We compare loans from 40+ lenders to find the best rates and features for your needs.</p>
    
    <h3>3. Application Management</h3>
    <p>We handle all the paperwork, liaising with lenders and keeping you updated throughout.</p>
    
    <h3>4. Settlement Support</h3>
    <p>We guide you through settlement and provide ongoing support for the life of your loan.</p>`
  });
  
  // 6. CTA Section - Using correct schema with subtitle instead of description
  blocks.push({
    component: 'cta',
    title: 'Ready to get started?',
    subtitle: `Get expert mortgage advice from our award-winning brokers serving ${location}. Book your free consultation today and discover how much you could save.`,
    button_text: 'Book Free Consultation',
    button_link: {
      linktype: 'url',
      url: '/contact'
    }
  });
  
  return blocks;
}

/**
 * Get existing mortgage broker stories
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

async function fixBlockSchema() {
  console.log('🔧 Fixing block schema issues in mortgage broker pages...\n');
  
  try {
    const existingStories = await getExistingStories();
    console.log(`📄 Found ${existingStories.length} mortgage broker pages to fix`);
    
    let fixed = 0;
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
        
        // Create blocks with correct schema
        const correctBlocks = createCorrectSchemaBlocks(location);
        
        const updatedStoryData = {
          name: story.name,
          slug: story.slug,
          content: {
            component: 'page',
            body: correctBlocks
          },
          tag_list: ['mortgage-broker', 'location-page'],
          published: true
        };
        
        const result = await updateStory(story.id, updatedStoryData);
        
        if (result.story) {
          // Publish the updated story
          const published = await publishStory(result.story.id);
          console.log(`✅ Fixed schema for: ${location}`);
          fixed++;
        }
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 300));
        
      } catch (error) {
        console.log(`❌ Failed to fix ${story.name}: ${error.message}`);
        failed++;
      }
    }
    
    console.log(`\n📊 Schema Fix Summary:`);
    console.log(`✅ Successfully fixed: ${fixed} pages`);
    console.log(`❌ Failed to fix: ${failed} pages`);
    
    if (fixed > 0) {
      console.log('\n🎉 Schema issues fixed!');
      console.log('Changes made:');
      console.log('✅ Hero blocks now use proper link objects for cta_link');
      console.log('✅ Text blocks now use "text" field instead of "content"');
      console.log('✅ CTA blocks now use "subtitle" instead of "description"');
      console.log('✅ All link fields now use proper Storyblok link format');
      console.log('\nThe "out of schema" errors should now be resolved!');
    }
    
  } catch (error) {
    console.error('❌ Schema fix failed:', error.message);
  }
}

fixBlockSchema();