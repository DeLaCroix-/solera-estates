import type { APIRoute } from 'astro';
import { properties } from '../data/properties';
import { blogPosts } from '../data/blog';

export const GET: APIRoute = () => {
  const siteUrl = 'https://soleraestates.com';
  const today = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/propiedades', priority: '0.9', changefreq: 'daily' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/equipo', priority: '0.7', changefreq: 'monthly' },
    { url: '/contacto', priority: '0.7', changefreq: 'monthly' },
  ];

  const propertyPages = properties.map(p => ({
    url: `/propiedades/${p.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
  }));

  const blogPages = blogPosts.map(p => ({
    url: `/blog/${p.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: p.date,
  }));

  const allPages = [...staticPages, ...propertyPages, ...blogPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${(page as any).lastmod ?? today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
