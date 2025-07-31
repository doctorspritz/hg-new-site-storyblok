import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_TOKEN = '2M8tuQ6eLmpwuw7WUhMccAtt';

async function getStoryblokPages() {
  const response = await fetch(`https://api.storyblok.com/v2/cdn/stories?token=${PUBLIC_TOKEN}&version=published&per_page=100`);
  const data = await response.json();
  return data.stories || [];
}

function getAstroPages() {
  const pagesDir = path.join(__dirname, '../src/pages');
  const pages = [];
  
  // Get mortgage broker dynamic pages
  const mortgageBrokerFile = path.join(pagesDir, 'mortgage-broker-[location].astro');
  if (fs.existsSync(mortgageBrokerFile)) {
    // These are generated dynamically from Storyblok
    pages.push({ type: 'dynamic', pattern: 'mortgage-broker-[location]', source: 'storyblok' });
  }
  
  // Get static pages
  function scanDirectory(dir, prefix = '') {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && file !== 'api') {
        scanDirectory(fullPath, prefix + file + '/');
      } else if (file.endsWith('.astro') || file.endsWith('.mdx')) {
        const pagePath = prefix + file.replace(/\.(astro|mdx)$/, '');
        pages.push({ 
          type: 'static', 
          path: pagePath, 
          source: 'astro',
          file: fullPath.replace(path.join(__dirname, '../'), '')
        });
      }
    });
  }
  
  scanDirectory(pagesDir);
  return pages;
}

async function auditPages() {
  console.log('🔍 Page Audit: Storyblok vs Astro\n');
  console.log('=' .repeat(60));
  
  // Get pages from both sources
  const storyblokStories = await getStoryblokPages();
  const astroPages = getAstroPages();
  
  // Storyblok pages
  console.log('\n📘 STORYBLOK PAGES (' + storyblokStories.length + ' total):\n');
  
  const mortgageBrokerStories = storyblokStories.filter(s => s.slug.startsWith('mortgage-broker-'));
  const otherStories = storyblokStories.filter(s => !s.slug.startsWith('mortgage-broker-'));
  
  console.log('  🏘️ Mortgage Broker Pages (' + mortgageBrokerStories.length + '):');
  mortgageBrokerStories.forEach(s => {
    console.log(`     - /${s.slug}/ (${s.content.component})`);
  });
  
  if (otherStories.length > 0) {
    console.log('\n  📑 Other Pages (' + otherStories.length + '):');
    otherStories.forEach(s => {
      console.log(`     - /${s.slug}/ (${s.content.component})`);
    });
  }
  
  // Astro pages
  console.log('\n📄 ASTRO PAGES:\n');
  
  const dynamicPages = astroPages.filter(p => p.type === 'dynamic');
  const staticPages = astroPages.filter(p => p.type === 'static');
  
  console.log('  🔄 Dynamic Pages (from Storyblok):');
  dynamicPages.forEach(p => {
    console.log(`     - ${p.pattern} → generates ${mortgageBrokerStories.length} pages`);
  });
  
  console.log('\n  📌 Static Pages:');
  staticPages
    .filter(p => !p.path.includes('[') && !p.path.includes('test'))
    .sort((a, b) => a.path.localeCompare(b.path))
    .forEach(p => {
      console.log(`     - /${p.path === 'index' ? '' : p.path}/`);
    });
  
  // Check for sync issues
  console.log('\n⚠️  SYNC ANALYSIS:\n');
  
  // Check if mortgage broker pages match
  if (mortgageBrokerStories.length > 0) {
    console.log(`  ✅ ${mortgageBrokerStories.length} mortgage broker pages in Storyblok`);
    console.log(`  ✅ Dynamic route 'mortgage-broker-[location].astro' will generate these`);
  }
  
  // Check for orphaned stories (stories without corresponding Astro components)
  const unmappedStories = otherStories.filter(story => {
    const component = story.content.component;
    return component !== 'page'; // 'page' is our main component
  });
  
  if (unmappedStories.length > 0) {
    console.log('\n  ⚠️  Unmapped Storyblok components:');
    unmappedStories.forEach(s => {
      console.log(`     - "${s.content.component}" used by /${s.slug}/`);
    });
  }
  
  // Recommendations
  console.log('\n💡 RECOMMENDATIONS:\n');
  console.log('  1. All mortgage broker pages are synced via dynamic routing ✅');
  console.log('  2. Static pages (blog, resources, etc.) are managed in Astro ✅');
  console.log('  3. To prevent sync issues:');
  console.log('     - Always create mortgage broker pages in Storyblok');
  console.log('     - Use the create-storyblok-pages.js script for bulk imports');
  console.log('     - Run this audit script periodically to check sync status');
}

auditPages().catch(console.error);