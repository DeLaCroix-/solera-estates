import fs from 'node:fs/promises';
import { pages, indexable } from '../src/lib/site.mjs';
await fs.mkdir('qa-output', { recursive: true });
await fs.writeFile('qa-output/routes.json', JSON.stringify(pages, null, 2));
await fs.writeFile('dist/_headers', `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  X-Frame-Options: DENY\n${!indexable ? '  X-Robots-Tag: noindex, follow\n' : ''}/assets/*\n  Cache-Control: public, max-age=3600\n/_astro/*\n  Cache-Control: public, max-age=31536000, immutable\n`);
const errors = pages.filter(page => page.id === 'ERROR');
await fs.mkdir('dist/404', { recursive: true });
await fs.copyFile('dist/404.html', 'dist/404/index.html');
await fs.writeFile('dist/_redirects', [
  ...errors.map(page => `${page.route} ${page.lang === 'en' ? page.route + 'index.html' : '/404.html'} 404!`),
  `/en/* ${errors.find(page => page.lang === 'en').route}index.html 404`,
  '/* /404.html 404',
].join('\n') + '\n');
console.log(`Astro: ${pages.length} ES/EN routes, localized 404s and Netlify headers ready.`);
