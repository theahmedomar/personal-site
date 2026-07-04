import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://theahmedomar.com',
  integrations: [mdx(), sitemap()],
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
