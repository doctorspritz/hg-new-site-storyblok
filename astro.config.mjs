// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { storyblok } from '@storyblok/astro';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const env = loadEnv("", process.cwd(), 'STORYBLOK');

// https://astro.build/config
export default defineConfig({
	site: 'https://huntergalloway.com.au',
	integrations: [
		mdx(), 
		sitemap(), 
		tailwind({
			config: { path: './tailwind.config.js' }
		}),
		react(),
		storyblok({
			accessToken: env.STORYBLOK_DELIVERY_API_TOKEN,
			// No region specified = defaults to EU region (which is correct)
			components: {
				'page': 'components/storyblok/Page',
				'hero': 'components/storyblok/Hero',
				'text': 'components/storyblok/Text',
				'image': 'components/storyblok/Image',
				'cta': 'components/storyblok/CTA',
				'lead-form': 'components/storyblok/LeadForm',
				'awards': 'components/storyblok/Awards',
				'rating': 'components/storyblok/Rating',
				'service-grid': 'components/storyblok/ServiceGrid',
				'teaser': 'components/storyblok/Teaser',
				'grid': 'components/storyblok/Grid',
				'feature': 'components/storyblok/Feature'
			}
		})
	],
});
