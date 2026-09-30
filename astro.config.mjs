// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://creafter770.github.io',
  base: '/museo-web',
  integrations: [sitemap()],
});