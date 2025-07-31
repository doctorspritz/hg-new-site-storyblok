// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import storyblok from '@storyblok/astro';
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
			accessToken: env.STORYBLOK_TOKEN,
			components: {
				// Map Storyblok components to Astro components
				'page': 'storyblok/Page',
				'hero': 'storyblok/Hero',
				'text': 'storyblok/Text',
				'image': 'storyblok/Image',
				'cta': 'storyblok/CTA',
				'lead-form': 'storyblok/LeadForm',
				'awards': 'storyblok/Awards',
				'rating': 'storyblok/Rating',
				'stats': 'storyblok/Stats',
				'reviews': 'storyblok/Reviews',
				'calculator': 'storyblok/Calculator',
				'service-grid': 'storyblok/ServiceGrid',
				'testimonials': 'storyblok/Testimonials',
				'why-choose': 'storyblok/WhyChoose',
				'contact-form': 'storyblok/ContactForm'
			},
			apiOptions: {
				region: 'us'
			}
		})
	],
});
