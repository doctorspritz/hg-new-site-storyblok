/**
 * Automated Storyblok Page Creation from WordPress Content
 * 
 * This script takes your WordPress export data and automatically creates
 * pages in Storyblok with proper block structure.
 * 
 * Usage:
 * STORYBLOK_MANAGEMENT_TOKEN=your_token node scripts/create-storyblok-pages.js
 */

import fs from 'fs';
import path from 'path';

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const SPACE_ID = '286142863933168';
const MANAGEMENT_TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN;

if (!MANAGEMENT_TOKEN) {
  console.error('❌ Please set STORYBLOK_MANAGEMENT_TOKEN environment variable');
  process.exit(1);
}

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
 * Convert WordPress content to Storyblok blocks
 */
function convertToStoryblokBlocks(wordpressPage) {
  const blocks = [];
  const title = wordpressPage.data?.title || wordpressPage.name || 'Untitled';
  const url = wordpressPage.data?.url || '';
  
  // Add Hero block for key pages
  const isKeyPage = [
    'mortgage-broker-brisbane',
    'first-home-buyer-loans', 
    'refinance-home-loan',
    'home-loans-for-doctors'
  ].some(key => url.includes(key));
  
  if (isKeyPage) {
    blocks.push({
      component: 'hero',
      title: title,
      subtitle: wordpressPage.data?.description || 'Award-winning mortgage brokers with expert guidance',
      cta_text: 'Get Free Assessment',
      cta_link: {
        linktype: 'story',
        story: '',
        url: '/free-assessment'
      }
    });
  }
  
  // Convert content to Rich Text blocks
  const content = extractContentFromBlocks(wordpressPage.blocks);
  if (content && content.trim()) {
    // Split content into logical sections
    const sections = splitContentIntoSections(content);
    
    sections.forEach(section => {
      if (section.trim()) {
        blocks.push({
          component: 'text',
          text: {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: cleanHtmlContent(section)
                  }
                ]
              }
            ]
          }
        });
      }
    });
  }
  
  // Add CTA block for service pages
  const isServicePage = [
    'home-loan', 'mortgage', 'loan', 'broker', 'refinance', 'first-home'
  ].some(keyword => url.includes(keyword));
  
  if (isServicePage) {
    blocks.push({
      component: 'cta',
      title: 'Ready to get started?',
      subtitle: 'Get your free home loan assessment today',
      button_text: 'Get Free Assessment',
      button_link: {
        linktype: 'story',
        story: '',
        url: '/free-assessment'
      },
      variant: 'primary'
    });
  }
  
  return blocks;
}

/**
 * Extract content from Builder.io blocks
 */
function extractContentFromBlocks(blocks) {
  if (!blocks || !Array.isArray(blocks)) return '';
  
  return blocks
    .map(block => {
      if (block.component?.options?.text) {
        return block.component.options.text;
      }
      return '';
    })
    .filter(text => text.trim())
    .join('\n\n');
}

/**
 * Split content into logical sections
 */
function splitContentIntoSections(content) {
  // Remove HTML tags and clean up
  let cleanContent = content
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Split by paragraphs or logical breaks
  const sections = cleanContent
    .split(/\n\s*\n|\.\s{2,}/)
    .filter(section => section.trim().length > 50); // Only keep substantial sections
  
  return sections.length > 0 ? sections : [cleanContent];
}

/**
 * Clean HTML content for Storyblok
 */
function cleanHtmlContent(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Generate slug from title
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Create a single page in Storyblok
 */
async function createStoryblokPage(wordpressPage, parentFolder = null) {
  const title = wordpressPage.data?.title || wordpressPage.name || 'Untitled';
  const url = wordpressPage.data?.url || '';
  const slug = url.replace(/^\//, '') || generateSlug(title);
  const blocks = convertToStoryblokBlocks(wordpressPage);
  
  const storyData = {
    name: title,
    slug: slug,
    content: {
      component: 'page',
      title: title,
      seo_title: title,
      seo_description: wordpressPage.data?.description || '',
      body: blocks
    },
    is_startpage: slug === 'home' || slug === '',
    parent_id: parentFolder || 0,
    is_folder: false
  };
  
  try {
    const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories`, {
      method: 'POST',
      headers: {
        'Authorization': MANAGEMENT_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ story: storyData })
    });
    
    if (response.ok) {
      const result = await response.json();
      return {
        success: true,
        story: result.story,
        slug: slug,
        title: wordpressPage.title
      };
    } else {
      const error = await response.text();
      return {
        success: false,
        error: error,
        slug: slug,
        title: wordpressPage.title
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      slug: slug,
      title: wordpressPage.title
    };
  }
}

/**
 * Create folders for organizing pages
 */
async function createFolder(name, slug) {
  const folderData = {
    name: name,
    slug: slug,
    is_folder: true,
    content: {
      component: 'page'
    }
  };
  
  try {
    const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories`, {
      method: 'POST',
      headers: {
        'Authorization': MANAGEMENT_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ story: folderData })
    });
    
    if (response.ok) {
      const result = await response.json();
      return result.story.id;
    } else {
      console.log(`⚠️  Could not create folder ${name}`);
      return null;
    }
  } catch (error) {
    console.log(`⚠️  Error creating folder ${name}:`, error.message);
    return null;
  }
}

/**
 * Main page creation function
 */
async function createPages() {
  console.log('🚀 Starting automated Storyblok page creation...\n');
  
  // Create folder structure
  console.log('📁 Creating folder structure...');
  const folders = {
    'home-loans': await createFolder('Home Loans', 'home-loans'),
    'mortgage-brokers': await createFolder('Mortgage Brokers', 'mortgage-brokers'),
    'calculators': await createFolder('Calculators', 'calculators'),
    'resources': await createFolder('Resources', 'resources')
  };
  
  // Filter and categorize pages
  const pagesToCreate = wordpressData
    .filter(page => (page.data?.title || page.name) && (page.data?.title || page.name).trim())
    .slice(0, 10); // Start with first 10 pages to avoid rate limits
  
  console.log(`\n📄 Creating ${pagesToCreate.length} pages...\n`);
  
  const results = {
    success: [],
    failed: [],
    total: pagesToCreate.length
  };
  
  // Create pages with delay to avoid rate limiting
  for (let i = 0; i < pagesToCreate.length; i++) {
    const page = pagesToCreate[i];
    const progress = `[${i + 1}/${pagesToCreate.length}]`;
    const title = page.data?.title || page.name || '';
    const url = page.data?.url || '';
    const slug = url.replace(/^\//, '') || generateSlug(title);
    
    console.log(`${progress} Creating: ${title}`);
    
    // Determine parent folder based on slug
    let parentFolder = null;
    
    if (slug.includes('home-loan') || slug.includes('first-home') || slug.includes('refinance')) {
      parentFolder = folders['home-loans'];
    } else if (slug.includes('mortgage-broker')) {
      parentFolder = folders['mortgage-brokers'];
    } else if (slug.includes('calculator')) {
      parentFolder = folders['calculators'];
    } else if (slug.includes('guide') || slug.includes('resource')) {
      parentFolder = folders['resources'];
    }
    
    const result = await createStoryblokPage(page, parentFolder);
    
    if (result.success) {
      console.log(`  ✅ Success: /${result.slug}`);
      results.success.push(result);
    } else {
      console.log(`  ❌ Failed: ${result.error}`);
      results.failed.push(result);
    }
    
    // Add delay to avoid rate limiting
    if (i < pagesToCreate.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  // Summary
  console.log('\n📊 Page Creation Summary:');
  console.log(`✅ Successfully created: ${results.success.length} pages`);
  console.log(`❌ Failed to create: ${results.failed.length} pages`);
  console.log(`📄 Total processed: ${results.total} pages`);
  
  if (results.success.length > 0) {
    console.log('\n🎉 Pages created successfully! Next steps:');
    console.log('1. Go to your Storyblok space to see the pages');
    console.log('2. Edit pages in the visual editor');
    console.log('3. Start your dev server: npm run dev');
    console.log('4. Test at http://localhost:4321');
  }
  
  if (results.failed.length > 0) {
    console.log('\n⚠️  Failed pages:');
    results.failed.forEach(fail => {
      console.log(`  - ${fail.title}: ${fail.error}`);
    });
  }
}

// Run the script
createPages().catch(console.error);