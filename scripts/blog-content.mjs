import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { parse as parseYaml } from 'yaml';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { parseHTML } from 'linkedom';
import sharp from 'sharp';

const safeSlug = value => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
const text = value => parseHTML(`<p>${sanitizeHtml(String(value || ''), { allowedTags: [], allowedAttributes: {} })}</p>`).document.querySelector('p').textContent.trim();
const headingId = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';

export async function optimizeBlogImage(src, alt, publicRoot = 'public') {
  if (typeof src !== 'string' || !/^\/(?:images|assets)\/[a-zA-Z0-9/_\-.]+\.(?:jpe?g|png|webp|avif)$/i.test(src)) throw new Error(`Blog image must be a local raster asset: ${src}`);
  const root = path.resolve(publicRoot);
  const file = path.resolve(root, '.' + src);
  if (!file.startsWith(root + path.sep)) throw new Error('Invalid blog image path');
  const buffer = await fs.readFile(file);
  const metadata = await sharp(buffer).rotate().metadata();
  const width = metadata.autoOrient?.width || metadata.width;
  const height = metadata.autoOrient?.height || metadata.height;
  if (!width || !height) throw new Error(`Invalid blog image: ${src}`);
  const hash = createHash('sha256').update(buffer).digest('hex').slice(0, 18);
  const directory = path.join(root, 'generated/blog');
  await fs.mkdir(directory, { recursive: true });
  const widths = [...new Set([Math.min(600, width), Math.min(1000, width), Math.min(1600, width)])];
  const sources = [];
  for (const size of widths) {
    const url = `/generated/blog/${hash}-${size}.webp`;
    const destination = path.join(root, url);
    try { await fs.access(destination); }
    catch { await sharp(buffer).rotate().resize({ width: size, withoutEnlargement: true }).webp({ quality: 83 }).toFile(destination); }
    sources.push({ url, size });
  }
  return { src: sources.at(-1).url, srcset: sources.map(s => `${s.url} ${s.size}w`).join(', '), width, height, alt: text(alt) };
}

export async function renderBlogBody(source, { publicRoot = 'public', title = '' } = {}) {
  const sanitized = sanitizeHtml(marked.parse(source), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'figure', 'figcaption'],
    allowedAttributes: { a: ['href', 'title'], img: ['src', 'alt', 'title'], th: ['colspan', 'rowspan', 'scope'], td: ['colspan', 'rowspan'] },
    allowedSchemes: ['https', 'http', 'mailto'],
    allowProtocolRelative: false,
    transformTags: { h1: 'h2' },
  });
  const { document } = parseHTML(`<div id="article-root">${sanitized}</div>`);
  const root = document.getElementById('article-root');
  const toc = [];
  const ids = new Set();
  let previousLevel = 1;
  for (let heading of root.querySelectorAll('h2,h3,h4,h5,h6')) {
    const level = Math.min(Number(heading.tagName.slice(1)), previousLevel + 1);
    if (Number(heading.tagName.slice(1)) !== level) {
      const replacement = document.createElement(`h${level}`);
      replacement.innerHTML = heading.innerHTML;
      heading.replaceWith(replacement);
      heading = replacement;
    }
    previousLevel = level;
    let id = 'read-' + headingId(heading.textContent);
    const base = id;
    let suffix = 2;
    while (ids.has(id)) id = `${base}-${suffix++}`;
    ids.add(id); heading.id = id;
    if (level === 2) toc.push({ id, text: heading.textContent });
  }
  for (const image of root.querySelectorAll('img')) {
    const asset = await optimizeBlogImage(image.getAttribute('src'), image.getAttribute('alt') || title, publicRoot);
    for (const [key, value] of Object.entries(asset)) image.setAttribute(key, String(value));
    image.setAttribute('sizes', '(max-width: 900px) 90vw, 760px');
    image.setAttribute('loading', 'lazy'); image.setAttribute('decoding', 'async');
  }
  for (const table of root.querySelectorAll('table')) {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'article-table'); wrapper.setAttribute('tabindex', '0');
    table.replaceWith(wrapper); wrapper.appendChild(table);
  }
  return { html: root.innerHTML, toc, readingMinutes: Math.max(1, Math.ceil(root.textContent.trim().split(/\s+/).length / 220)) };
}

// Matches the NAT CRM astro_standard_v1 contract; no browser-side database access.
export async function loadBlog({ directory = 'src/content/blog', publicRoot = 'public', now = new Date() } = {}) {
  let files;
  try { files = await fs.readdir(directory, { recursive: true, withFileTypes: true }); }
  catch (error) { if (error.code === 'ENOENT') return []; throw error; }
  const articles = [];
  for (const entry of files) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const file = path.join(entry.parentPath || entry.path, entry.name);
    const relative = path.relative(directory, file).replaceAll('\\', '/');
    const raw = (await fs.readFile(file, 'utf8')).replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
    const match = raw.match(/^---\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/);
    if (!match) throw new Error(`Missing YAML frontmatter: ${relative}`);
    const data = parseYaml(match[1], { maxAliasCount: 50 });
    const content = match[2];
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error(`Invalid frontmatter: ${relative}`);
    if (data.draft === true || data.draft === 'true') continue;
    const publishDate = new Date(data.publishDate);
    if (!data.publishDate || Number.isNaN(publishDate.getTime())) throw new Error(`Invalid publishDate: ${relative}`);
    if (publishDate > now) continue;
    const lang = String(data.language || (relative.startsWith('en/') ? 'en' : 'es')).split('-')[0].toLowerCase();
    if (!['es', 'en'].includes(lang)) throw new Error(`Unsupported article language: ${relative}`);
    const slug = entry.name.slice(0, -3);
    if (!safeSlug(slug) || relative !== (lang === 'en' ? 'en/' : '') + entry.name) throw new Error(`Invalid article path: ${relative}`);
    if (!text(data.title) || !text(data.description) || !content.trim()) throw new Error(`Missing article title, description or body: ${relative}`);
    const updatedDate = data.updatedDate ? new Date(data.updatedDate) : publishDate;
    if (Number.isNaN(updatedDate.getTime()) || updatedDate < publishDate) throw new Error(`Invalid updatedDate: ${relative}`);
    const title = text(data.title);
    const image = data.image ? await optimizeBlogImage(data.image, data.imageAlt || title, publicRoot) : null;
    const body = await renderBlogBody(content, { publicRoot, title });
    articles.push({
      id: `ARTICLE_${lang}_${slug}`, lang, slug, route: `${lang === 'en' ? '/en' : ''}/blog/${slug}/`,
      title: `${title} | Solera Estates`, heading: title, description: text(data.description), name: title, blocks: [], isArticle: true,
      publishDate: publishDate.toISOString(), updatedDate: updatedDate.toISOString(), author: text(data.author) || 'Solera Estates',
      category: text(data.category) && data.category !== 'SEO' ? text(data.category) : lang === 'es' ? 'Perspectivas' : 'Perspectives',
      translationGroup: text(data.translationGroup || data.natSeoArticleId) || null,
      image, ...body,
    });
  }
  const routes = new Set();
  for (const article of articles) {
    if (routes.has(article.route)) throw new Error(`Duplicate blog route: ${article.route}`);
    routes.add(article.route);
    const siblings = article.translationGroup ? articles.filter(a => a.translationGroup === article.translationGroup) : [article];
    if (new Set(siblings.map(a => a.lang)).size !== siblings.length) throw new Error(`Duplicate blog translation: ${article.translationGroup}`);
    article.alternates = Object.fromEntries(siblings.map(a => [a.lang, a.route]));
  }
  return articles.sort((a, b) => b.publishDate.localeCompare(a.publishDate) || a.route.localeCompare(b.route));
}
