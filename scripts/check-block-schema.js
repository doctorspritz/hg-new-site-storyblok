import fetch from 'node-fetch';

const PUBLIC_TOKEN = '2M8tuQ6eLmpwuw7WUhMccAtt';

async function checkBlockFields() {
  try {
    // Get a specific story to see the actual content structure
    const response = await fetch(`https://api.storyblok.com/v2/cdn/stories/mortgage-broker-bracken-ridge?token=${PUBLIC_TOKEN}&version=published`);
    const data = await response.json();
    const story = data.story;
    
    console.log('🔍 CHECKING BLOCK FIELDS vs SCHEMA:\n');
    console.log(`Story: ${story.name}`);
    console.log(`Blocks: ${story.content.body.length}\n`);
    
    story.content.body.forEach((block, i) => {
      console.log(`${i+1}. ${block.component.toUpperCase()} BLOCK:`);
      
      const fields = Object.keys(block).filter(k => k !== 'component' && k !== '_uid');
      console.log(`   Fields (${fields.length}):`, fields.join(', '));
      
      // Show field values (truncated)
      fields.forEach(field => {
        let value = block[field];
        if (typeof value === 'string' && value.length > 60) {
          value = value.substring(0, 60) + '...';
        } else if (typeof value === 'object') {
          value = '[object]';
        }
        console.log(`     ${field}: ${value}`);
      });
      console.log('');
    });
    
    console.log('🎯 COMMON FIELD ISSUES:\n');
    console.log('If you see "out of schema" errors, it means:');
    console.log('1. Field names in content don\'t match Storyblok block library definitions');
    console.log('2. Fields exist in content but not defined in the block schema');
    console.log('3. Field types don\'t match (text vs richtext vs link, etc.)\n');
    
    console.log('Expected field names for each component:');
    console.log('  HERO: title, subtitle, cta_text, cta_link');
    console.log('  TEXT: title, content (or text)');
    console.log('  CTA: title, description, button_text, button_link');
    
  } catch (error) {
    console.error('Error checking blocks:', error.message);
  }
}

checkBlockFields();