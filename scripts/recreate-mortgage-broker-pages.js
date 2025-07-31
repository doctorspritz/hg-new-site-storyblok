/**
 * Re-create Mortgage Broker Pages with Full WordPress Content
 * 
 * This script deletes and recreates all mortgage broker pages in Storyblok
 * with proper hero sections and rich content from WordPress export.
 */

import fs from 'fs';
import path from 'path';

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const SPACE_ID = '286142863933168';
const MANAGEMENT_TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN || 'hDoTbFJT0rY5EWSHzwWaugtt-227701-hPzELRvDFqyCsKCe2i1V';

// Load WordPress export data
let wordpressData;
try {
  const dataPath = path.join(process.cwd(), 'wordpress-export.json');
  wordpressData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  console.log(`📄 Loaded ${wordpressData.length} WordPress pages`);
} catch (error) {
  console.error('❌ Could not load wordpress-export.json:', error.message);
  process.exit(1);
}

/**
 * Extract clean text content from WordPress blocks
 */
function extractCleanContent(blocks) {
  if (!blocks || !Array.isArray(blocks)) return '';
  
  let content = '';
  blocks.forEach(block => {
    if (block.component && block.component.options && block.component.options.text) {
      content += block.component.options.text + '\n';
    }
  });
  
  return content;
}

/**
 * Clean HTML content and extract meaningful text
 */
function cleanAndStructureContent(htmlContent) {
  if (!htmlContent) return [];
  
  // Remove script tags and other unwanted elements
  let cleaned = htmlContent
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
  
  const sections = [];
  
  // Extract hero section content
  const heroMatch = cleaned.match(/<section class="hero-section"[^>]*>([\s\S]*?)<\/section>/);
  if (heroMatch) {
    const heroContent = heroMatch[1];
    const titleMatch = heroContent.match(/<h1[^>]*>(.*?)<\/h1>/);
    const subtitleMatch = heroContent.match(/<p class="lead"[^>]*>(.*?)<\/p>/);
    
    if (titleMatch) {
      sections.push({
        type: 'hero',
        title: titleMatch[1].replace(/<[^>]*>/g, '').trim(),
        subtitle: subtitleMatch ? subtitleMatch[1].replace(/<[^>]*>/g, '').trim() : 'Expert mortgage advice for homebuyers in Brisbane'
      });
    }
  }
  
  // Extract about section
  const aboutMatch = cleaned.match(/<section class="suburb-overview"[^>]*>([\s\S]*?)<\/section>/);
  if (aboutMatch) {
    const aboutContent = aboutMatch[1];
    const descMatch = aboutContent.match(/<div class="suburb-description"[^>]*>\s*<p[^>]*>([\s\S]*?)<\/p>/);
    if (descMatch) {
      sections.push({
        type: 'text',
        title: 'About the Area',
        content: descMatch[1].replace(/<[^>]*>/g, '').replace(/&#8217;/g, "'").trim()
      });
    }
  }
  
  // Extract services section
  const servicesMatch = cleaned.match(/<section class="mortgage-services"[^>]*>([\s\S]*?)<\/section>/);
  if (servicesMatch) {
    const servicesContent = servicesMatch[1];
    const serviceItems = servicesContent.match(/<div class="service-item"[^>]*>([\s\S]*?)<\/div>/g);
    
    if (serviceItems && serviceItems.length > 0) {
      let servicesText = '';
      serviceItems.forEach(item => {
        const titleMatch = item.match(/<h3[^>]*>(.*?)<\/h3>/);
        const descMatch = item.match(/<p[^>]*>(.*?)<\/p>/);
        if (titleMatch && descMatch) {
          servicesText += `**${titleMatch[1]}**\n${descMatch[1].replace(/<[^>]*>/g, '')}\n\n`;
        }
      });
      
      if (servicesText) {
        sections.push({
          type: 'text',
          title: 'Our Mortgage Services',
          content: servicesText.trim()
        });
      }
    }
  }
  
  // Extract living aspects
  const livingMatch = cleaned.match(/<section class="suburb-living"[^>]*>([\s\S]*?)<\/section>/);
  if (livingMatch) {
    const livingContent = livingMatch[1];
    const aspects = livingContent.match(/<div class="living-aspect"[^>]*>([\s\S]*?)<\/div>/g);
    
    if (aspects) {
      aspects.forEach(aspect => {
        const titleMatch = aspect.match(/<h3[^>]*>(.*?)<\/h3>/);
        const contentMatch = aspect.match(/<p[^>]*>([\s\S]*?)<\/p>/);
        if (titleMatch && contentMatch) {
          sections.push({
            type: 'text',
            title: titleMatch[1].trim(),
            content: contentMatch[1].replace(/<[^>]*>/g, '').replace(/&#8217;/g, "'").trim()
          });
        }
      });
    }
  }
  
  return sections;
}

/**
 * Create Storyblok blocks from structured content
 */
function createStoryblokBlocks(sections, location) {
  const blocks = [];
  
  sections.forEach(section => {
    if (section.type === 'hero') {
      blocks.push({
        component: 'hero',
        title: section.title.replace('Mortgage Broker', `Mortgage Broker in ${location}`),
        subtitle: section.subtitle,
        cta_text: 'Get Free Assessment',
        cta_link: '#contact'
      });
    } else if (section.type === 'text') {
      blocks.push({
        component: 'text',
        title: section.title,
        content: section.content
      });
    }
  });
  
  // Add CTA block
  blocks.push({
    component: 'cta',
    title: 'Ready to get started?',
    description: 'Get expert mortgage advice from our award-winning brokers.',
    button_text: 'Book Free Consultation',
    button_link: '/contact'
  });
  
  return blocks;
}

/**
 * Delete existing Storyblok story
 */
async function deleteStory(storyId) {
  const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories/${storyId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': MANAGEMENT_TOKEN,
      'Content-Type': 'application/json'
    }
  });
  
  return response.ok;
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
  console.log('🔄 Re-creating mortgage broker pages with full content...\n');
  
  try {
    // Get existing stories to delete
    const existingResponse = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories`, {
      headers: {
        'Authorization': MANAGEMENT_TOKEN,
        'Content-Type': 'application/json'
      }
    });
    
    if (!existingResponse.ok) {
      throw new Error(`Failed to fetch existing stories: ${existingResponse.status}`);
    }
    
    const existingData = await existingResponse.json();
    const mortgageBrokerStories = existingData.stories.filter(s => 
      s.slug.startsWith('mortgage-broker-')
    );
    
    console.log(`🗑️  Deleting ${mortgageBrokerStories.length} existing mortgage broker pages...`);
    
    // Delete existing pages
    for (const story of mortgageBrokerStories) {
      const deleted = await deleteStory(story.id);
      if (deleted) {
        console.log(`   ✅ Deleted: ${story.name}`);
      } else {
        console.log(`   ❌ Failed to delete: ${story.name}`);
      }
      await new Promise(resolve => setTimeout(resolve, 200)); // Rate limiting
    }
    
    console.log(`\n📝 Creating ${wordpressData.length} new pages with full content...`);
    
    let created = 0;
    let failed = 0;
    
    for (const page of wordpressData) {
      try {
        // Extract location from URL
        const location = page.data.url.replace('/mortgage-broker-', '').replace(/-/g, ' ')
          .split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        // Get content and structure it
        const rawContent = extractCleanContent(page.blocks);
        const sections = cleanAndStructureContent(rawContent);
        
        // Create Storyblok blocks
        const storyblokBlocks = createStoryblokBlocks(sections, location);
        
        const storyData = {
          name: page.data.title,
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
          console.log(`   ✅ Created & ${published ? 'published' : 'saved'}: ${page.data.title}`);
          created++;
        }
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 300));
        
      } catch (error) {
        console.log(`   ❌ Failed to create ${page.name}: ${error.message}`);
        failed++;
      }
    }
    
    console.log(`\n📊 Recreation Summary:`);
    console.log(`   ✅ Successfully created: ${created} pages`);
    console.log(`   ❌ Failed to create: ${failed} pages`);
    console.log(`   📄 Total processed: ${wordpressData.length} pages`);
    
    if (created > 0) {
      console.log('\n🎉 Mortgage broker pages recreated with full content!');
      console.log('   - Hero sections added');
      console.log('   - Rich content from WordPress included');
      console.log('   - Proper structure with titles and sections');
    }
    
  } catch (error) {
    console.error('❌ Recreation failed:', error.message);
  }
}

recreateMortgageBrokerPages();