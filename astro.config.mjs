// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://maxattwell.github.io',
  base: '/website/',
  integrations: [react()]
  output: 'static'
});
