/**
 * Create Storyblok blocks via Management API
 * 
 * Requirements:
 * 1. Get Management API token from Storyblok Settings > API Keys
 * 2. Set STORYBLOK_MANAGEMENT_TOKEN environment variable
 * 3. Run: node scripts/create-storyblok-blocks.js
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const SPACE_ID = '286142863933168'; // Your Storyblok space ID
const MANAGEMENT_TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN;

if (!MANAGEMENT_TOKEN) {
  console.error('❌ Please set STORYBLOK_MANAGEMENT_TOKEN environment variable');
  console.log('Get it from: https://app.storyblok.com/#!/me/account');
  process.exit(1);
}

const blocks = [
  // Page Content Type
  {
    name: 'Page',
    technical_name: 'page',
    is_root: true,
    is_nestable: false,
    component_group_uuid: null,
    schema: {
      title: {
        type: 'text',
        display_name: 'Title'
      },
      seo_title: {
        type: 'text',
        display_name: 'SEO Title'
      },
      seo_description: {
        type: 'textarea',
        display_name: 'SEO Description'
      },
      seo_image: {
        type: 'asset',
        display_name: 'SEO Image'
      },
      body: {
        type: 'bloks',
        display_name: 'Content Blocks',
        restrict_components: true,
        component_whitelist: ['hero', 'text', 'cta', 'lead-form', 'awards', 'rating', 'service-grid', 'image']
      }
    }
  },
  
  // Hero Block
  {
    name: 'Hero Section',
    technical_name: 'hero',
    is_root: false,
    is_nestable: true,
    schema: {
      title: {
        type: 'text',
        display_name: 'Title',
        required: true
      },
      subtitle: {
        type: 'textarea',
        display_name: 'Subtitle'
      },
      background_image: {
        type: 'asset',
        display_name: 'Background Image'
      },
      cta_text: {
        type: 'text',
        display_name: 'Button Text'
      },
      cta_link: {
        type: 'multilink',
        display_name: 'Button Link'
      }
    }
  },
  
  // Text Block
  {
    name: 'Rich Text',
    technical_name: 'text',
    is_root: false,
    is_nestable: true,
    schema: {
      text: {
        type: 'richtext',
        display_name: 'Text Content',
        required: true
      },
      class_name: {
        type: 'text',
        display_name: 'CSS Classes'
      }
    }
  },
  
  // CTA Block
  {
    name: 'Call to Action',
    technical_name: 'cta',
    is_root: false,
    is_nestable: true,
    schema: {
      title: {
        type: 'text',
        display_name: 'Title',
        required: true
      },
      subtitle: {
        type: 'text',
        display_name: 'Subtitle'
      },
      button_text: {
        type: 'text',
        display_name: 'Button Text'
      },
      button_link: {
        type: 'multilink',
        display_name: 'Button Link'
      },
      variant: {
        type: 'option',
        display_name: 'Style Variant',
        options: [
          { name: 'Primary', value: 'primary' },
          { name: 'Secondary', value: 'secondary' },
          { name: 'Dark', value: 'dark' }
        ]
      },
      background_color: {
        type: 'text',
        display_name: 'Background Color'
      }
    }
  },
  
  // Lead Form Block
  {
    name: 'Lead Form',
    technical_name: 'lead-form',
    is_root: false,
    is_nestable: true,
    schema: {
      title: {
        type: 'text',
        display_name: 'Form Title'
      },
      subtitle: {
        type: 'text',
        display_name: 'Form Subtitle'
      },
      button_text: {
        type: 'text',
        display_name: 'Submit Button Text',
        default_value: 'Get Free Assessment'
      },
      variant: {
        type: 'option',
        display_name: 'Form Variant',
        options: [
          { name: 'Default', value: 'default' },
          { name: 'Compact', value: 'compact' },
          { name: 'Sidebar', value: 'sidebar' }
        ]
      }
    }
  },
  
  // Awards Block
  {
    name: 'Awards Section',
    technical_name: 'awards',
    is_root: false,
    is_nestable: true,
    schema: {
      title: {
        type: 'text',
        display_name: 'Section Title'
      },
      show_background: {
        type: 'boolean',
        display_name: 'Show Background'
      }
    }
  },
  
  // Rating Block
  {
    name: 'Rating Display',
    technical_name: 'rating',
    is_root: false,
    is_nestable: true,
    schema: {
      rating: {
        type: 'number',
        display_name: 'Rating (1-5)',
        default_value: 5
      },
      review_count: {
        type: 'number',
        display_name: 'Number of Reviews'
      },
      source: {
        type: 'text',
        display_name: 'Review Source',
        default_value: 'Google'
      },
      show_stars: {
        type: 'boolean',
        display_name: 'Show Stars',
        default_value: true
      }
    }
  },
  
  // Service Grid Block
  {
    name: 'Service Grid',
    technical_name: 'service-grid',
    is_root: false,
    is_nestable: true,
    schema: {
      title: {
        type: 'text',
        display_name: 'Grid Title'
      },
      columns: {
        type: 'number',
        display_name: 'Number of Columns',
        default_value: 3
      },
      show_icons: {
        type: 'boolean',
        display_name: 'Show Icons',
        default_value: true
      }
    }
  },
  
  // Image Block
  {
    name: 'Image',
    technical_name: 'image',
    is_root: false,
    is_nestable: true,
    schema: {
      image: {
        type: 'asset',
        display_name: 'Image',
        required: true
      },
      alt_text: {
        type: 'text',
        display_name: 'Alt Text'
      },
      width: {
        type: 'number',
        display_name: 'Width'
      },
      height: {
        type: 'number',
        display_name: 'Height'
      },
      loading: {
        type: 'option',
        display_name: 'Loading',
        options: [
          { name: 'Lazy', value: 'lazy' },
          { name: 'Eager', value: 'eager' }
        ],
        default_value: 'lazy'
      },
      class_name: {
        type: 'text',
        display_name: 'CSS Classes'
      }
    }
  }
];

async function createBlocks() {
  console.log('🚀 Creating Storyblok blocks...');
  
  for (const block of blocks) {
    try {
      const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/components`, {
        method: 'POST',
        headers: {
          'Authorization': MANAGEMENT_TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ component: block })
      });
      
      if (response.ok) {
        console.log(`✅ Created block: ${block.name} (${block.technical_name})`);
      } else {
        const error = await response.text();
        console.error(`❌ Failed to create ${block.name}: ${error}`);
      }
    } catch (error) {
      console.error(`❌ Error creating ${block.name}:`, error.message);
    }
  }
  
  console.log('\n🎉 Block creation complete!');
  console.log('📝 Next steps:');
  console.log('1. Go to your Storyblok space');
  console.log('2. Create a new story with the "Page" content type');
  console.log('3. Add Hero, Text, CTA, and other blocks to build your page');
  console.log('4. Start your dev server: npm run dev');
  console.log('5. Test visual editing at http://localhost:4321');
}

// Run if called directly
createBlocks();

export { createBlocks };