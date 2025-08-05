/**
 * Create Homepage Hero Block in Storyblok
 * 
 * Creates a complex nestable "homepage-hero" block with bullet points, CTAs, and stats
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const SPACE_ID = '286142863933168';
const MANAGEMENT_TOKEN = 'hDoTbFJT0rY5EWSHzwWaugtt-227701-hPzELRvDFqyCsKCe2i1V';

/**
 * Create bullet point component
 */
async function createBulletPointComponent() {
  const componentData = {
    component: {
      name: 'bullet_point',
      display_name: 'Bullet Point',
      schema: {
        prefix_bold: {
          type: 'text',
          display_name: 'Prefix (Bold)',
          description: 'Bold text prefix (optional)'
        },
        body: {
          type: 'text',
          display_name: 'Body Text',
          required: true
        },
        tooltip: {
          type: 'text',
          display_name: 'Tooltip Text',
          description: 'Optional tooltip text'
        }
      },
      is_root: false,
      is_nestable: true,
      component_group_uuid: null
    }
  };

  const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/components`, {
    method: 'POST',
    headers: {
      'Authorization': MANAGEMENT_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(componentData)
  });

  if (response.ok) {
    const result = await response.json();
    console.log('✅ Created bullet_point component');
    return result.component;
  } else {
    const error = await response.text();
    console.log('❌ Failed to create bullet_point component:', error);
    return null;
  }
}

/**
 * Create CTA button component
 */
async function createCTAButtonComponent() {
  const componentData = {
    component: {
      name: 'cta_button',
      display_name: 'CTA Button',
      schema: {
        label: {
          type: 'text',
          display_name: 'Button Text',
          required: true
        },
        url: {
          type: 'multilink',
          display_name: 'Button URL',
          required: true
        },
        style: {
          type: 'option',
          display_name: 'Button Style',
          options: [
            { name: 'Primary', value: 'primary' },
            { name: 'Secondary', value: 'secondary' },
            { name: 'Yellow', value: 'yellow' }
          ],
          default_value: 'yellow'
        }
      },
      is_root: false,
      is_nestable: true,
      component_group_uuid: null
    }
  };

  const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/components`, {
    method: 'POST',
    headers: {
      'Authorization': MANAGEMENT_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(componentData)
  });

  if (response.ok) {
    const result = await response.json();
    console.log('✅ Created cta_button component');
    return result.component;
  } else {
    const error = await response.text();
    console.log('❌ Failed to create cta_button component:', error);
    return null;
  }
}

/**
 * Create stat item component
 */
async function createStatItemComponent() {
  const componentData = {
    component: {
      name: 'stat_item',
      display_name: 'Stat Item',
      schema: {
        icon_or_number: {
          type: 'richtext',
          display_name: 'Icon or Number',
          description: 'Can be text, number, or HTML for icons',
          required: true
        },
        line_1: {
          type: 'text',
          display_name: 'Line 1',
          required: true
        },
        line_2: {
          type: 'text',
          display_name: 'Line 2',
          required: true
        }
      },
      is_root: false,
      is_nestable: true,
      component_group_uuid: null
    }
  };

  const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/components`, {
    method: 'POST',
    headers: {
      'Authorization': MANAGEMENT_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(componentData)
  });

  if (response.ok) {
    const result = await response.json();
    console.log('✅ Created stat_item component');
    return result.component;
  } else {
    const error = await response.text();
    console.log('❌ Failed to create stat_item component:', error);
    return null;
  }
}

/**
 * Create hero with bullets component
 */
async function createHeroWithBulletsComponent() {
  const componentData = {
    component: {
      name: 'hero_with_bullets',
      display_name: 'Hero with Bullets',
      schema: {
        headline_bold: {
          type: 'text',
          display_name: 'Headline (Bold)',
          description: 'Bold part of the headline'
        },
        headline: {
          type: 'text',
          display_name: 'Headline (Regular)',
          description: 'Regular part of the headline'
        },
        bullet_items: {
          type: 'bloks',
          display_name: 'Bullet Points',
          restrict_components: true,
          component_whitelist: ['bullet_point']
        },
        cta: {
          type: 'bloks',
          display_name: 'Call to Action Buttons',
          restrict_components: true,
          component_whitelist: ['cta_button']
        },
        stats: {
          type: 'bloks',
          display_name: 'Statistics',
          restrict_components: true,
          component_whitelist: ['stat_item']
        },
        image_desktop: {
          type: 'asset',
          display_name: 'Desktop Image',
          description: 'Hero image for desktop view'
        },
        image_mobile: {
          type: 'asset',
          display_name: 'Mobile Image',
          description: 'Hero image for mobile view'
        },
        layout: {
          type: 'option',
          display_name: 'Layout',
          options: [
            { name: 'Image Left', value: 'left' },
            { name: 'Image Right', value: 'right' }
          ],
          default_value: 'right'
        }
      },
      is_root: false,
      is_nestable: true,
      component_group_uuid: null
    }
  };

  const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/components`, {
    method: 'POST',
    headers: {
      'Authorization': MANAGEMENT_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(componentData)
  });

  if (response.ok) {
    const result = await response.json();
    console.log('✅ Created hero_with_bullets component');
    return result.component;
  } else {
    const error = await response.text();
    console.log('❌ Failed to create hero_with_bullets component:', error);
    return null;
  }
}

/**
 * Create homepage hero story with sample content
 */
async function createHomepageHeroStory() {
  const storyData = {
    name: 'Homepage Hero Example',
    slug: 'homepage-hero-example',
    content: {
      component: 'page',
      body: [
        {
          _uid: '123abc',
          component: 'hero_with_bullets',
          headline_bold: 'Get a home loan',
          headline: 'with full guidance and expert assistance',
          bullet_items: [
            {
              _uid: 'b1',
              component: 'bullet_point',
              prefix_bold: 'Market-leading',
              body: 'loan approval rate in Australia of 97%',
              tooltip: 'Approx 40 % of applications were rejected … our rejection rate is 2.33 %.'
            },
            {
              _uid: 'b2',
              component: 'bullet_point',
              body: 'Variety of options due to direct access to 30+ Australian banks & lenders'
            },
            {
              _uid: 'b3',
              component: 'bullet_point',
              prefix_bold: '#1 rated',
              body: 'Mortgage Broker in Brisbane',
              tooltip: '5-star rating based on 2000+ Google reviews.'
            }
          ],
          cta: [
            {
              _uid: 'c1',
              component: 'cta_button',
              label: 'Calculate my borrowing capacity',
              url: {
                linktype: 'url',
                url: '/mortgage-calculator/'
              },
              style: 'yellow'
            }
          ],
          stats: [
            {
              _uid: 's1',
              component: 'stat_item',
              icon_or_number: {
                type: 'doc',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: '14'
                      }
                    ]
                  }
                ]
              },
              line_1: 'Years',
              line_2: 'of experience'
            },
            {
              _uid: 's2',
              component: 'stat_item',
              icon_or_number: {
                type: 'doc',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'Google',
                        marks: [
                          {
                            type: 'bold'
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              line_1: 'Based on',
              line_2: '2000+ reviews'
            }
          ],
          layout: 'right'
        }
      ]
    },
    tag_list: ['homepage', 'hero', 'example'],
    published: false
  };

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
    console.log('✅ Created homepage hero example story');
    return result.story;
  } else {
    const error = await response.text();
    console.log('❌ Failed to create homepage hero story:', error);
    return null;
  }
}

async function createHomepageHeroBlock() {
  console.log('🚀 Creating Homepage Hero Block Structure in Storyblok...\n');

  try {
    // Create nested components first
    console.log('📝 Creating nested components...');
    const bulletPoint = await createBulletPointComponent();
    const ctaButton = await createCTAButtonComponent();
    const statItem = await createStatItemComponent();

    // Small delay to ensure components are registered
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create main hero component
    console.log('\n📝 Creating main hero component...');
    const heroComponent = await createHeroWithBulletsComponent();

    // Small delay before creating story
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create example story
    console.log('\n📄 Creating example story...');
    const story = await createHomepageHeroStory();

    console.log('\n🎉 Homepage Hero Block Structure Created Successfully!');
    console.log('\n📋 Summary:');
    console.log('✅ bullet_point component - for individual bullet points');
    console.log('✅ cta_button component - for call-to-action buttons');
    console.log('✅ stat_item component - for statistics display');
    console.log('✅ hero_with_bullets component - main hero block');
    console.log('✅ homepage-hero-example story - example implementation');

    console.log('\n🔧 Next Steps:');
    console.log('1. Go to Storyblok Block Library to see your new components');
    console.log('2. Check the "homepage-hero-example" story to see the structure');
    console.log('3. Use "hero_with_bullets" in your page components');
    console.log('4. Upload images to Storyblok assets for image_desktop and image_mobile fields');

  } catch (error) {
    console.error('❌ Failed to create homepage hero block:', error.message);
  }
}

createHomepageHeroBlock();