import fs from 'node:fs';
import { parseContent } from '../../scripts/content.mjs';

export const config = JSON.parse(fs.readFileSync('src/site-config.json', 'utf8'));
export const origin = (process.env.PUBLIC_SITE_URL || config.origin).replace(/\/$/, '');
export const indexable = process.env.PUBLIC_SITE_INDEXABLE ? process.env.PUBLIC_SITE_INDEXABLE === 'true' : config.indexable;
export const tx = (lang, es, en) => lang === 'es' ? es : en;
/** @type {import('./types').EditorialPage[]} */
export const pages = parseContent();
pages.push(...JSON.parse(fs.readFileSync('content/investment.json', 'utf8')));
for (const page of pages) if (page.id === 'LLEGADA') page.name = tx(page.lang, 'Vivir en Barcelona', 'Moving to Barcelona');
const legal = JSON.parse(fs.readFileSync('content/legal.json', 'utf8'));
for (const [lang, entries] of Object.entries(legal)) {
  for (const entry of entries) pages.push({
    ...entry, lang, isLegal: true,
    blocks: [
      { id: entry.id + '-01', label: entry.name, nodes: [{ type: 'h1', text: entry.name }] },
      ...entry.sections.map(([title, text], i) => ({
        id: entry.id + '-' + String(i + 2).padStart(2, '0'), label: title,
        nodes: [{ type: 'h2', text: title }, { type: 'p', text }],
      })),
    ],
  });
}
export const pageFor = (id, lang) => {
  const page = pages.find(page => page.id === id && page.lang === lang);
  if (!page) throw new Error(`Unknown page: ${id}/${lang}`);
  return page;
};
export const excludedFromIndex = page => !indexable || page.isLegal || ['JOURNAL', 'ERROR', 'GRACIAS'].includes(page.id);
/** @param {import('./types').ContentBlock} block */
export function groupNodes(block) {
  /** @type {import('./types').ContentNode[]} */
  const intro = [];
  /** @type {{title: string, nodes: import('./types').ContentNode[]}[]} */
  const groups = [];
  let current;
  for (const node of block.nodes) {
    if (node.type === 'h3') { current = { title: node.text, nodes: [] }; groups.push(current); }
    else if (current) current.nodes.push(node);
    else intro.push(node);
  }
  return { intro, groups };
}
