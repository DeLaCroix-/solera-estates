import { origin } from '../lib/site.mjs';
export const GET = () => new Response(`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain' } });
