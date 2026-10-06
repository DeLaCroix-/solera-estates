import { defineConfig } from 'astro/config';
import { origin } from './src/lib/site.mjs';

export default defineConfig({
  site: origin,
  output: 'static',
  trailingSlash: 'always',
  server: { host: '127.0.0.1', port: 4179 },
  build: { inlineStylesheets: 'never' },
});
