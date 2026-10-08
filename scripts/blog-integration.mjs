import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { build } from 'astro';
import { stringify } from 'yaml';
import { parseHTML } from 'linkedom';

// Temporary CRM-shaped fixtures validate the actual Astro rendering, not just parsing.
// The preview is isolated from dist and never committed or deployed.
const directory = path.resolve('src/content/blog');
const output = path.resolve('qa-output/blog-preview');
const created = [];
const draft = { title: 'Comprobación privada de la plantilla', description: 'Contenido local de comprobación. No es una publicación editorial.', publishDate: '2026-01-01T12:00:00Z', author: 'Solera Estates', image: '/assets/living-1440.webp', imageAlt: 'Un interior mediterráneo luminoso', draft: false, language: 'es', translationGroup: 'solera-private-render-test', category: 'Propiedad' };
async function fixture(file, data, content) {
  const destination = path.join(directory, file);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, `---\n${stringify(data)}---\n${content}`, { flag: 'wx' });
  created.push(destination);
}
try {
  await fixture('solera-private-render-test.md', { ...draft, title: 'Una nueva mirada sobre tu propiedad en Barcelona' }, '<p>Esta es una vista previa local para comprobar el diseño de lectura. El contenido de prueba no se publicará en la web.</p><h2>Comprender el contexto</h2><p>Una propiedad forma parte de una historia. Comprender cómo se utiliza, qué necesita y qué objetivos tiene su propietario permite plantear las preguntas adecuadas.</p><blockquote><p>El valor de una decisión comienza por la calidad de las preguntas.</p></blockquote><h2>Una perspectiva completa</h2><p>Gestión, reforma y acompañamiento en venta requieren una visión compartida y una atención personal.</p><h3>Los detalles importan</h3><ul><li>Escuchar al propietario.</li><li>Estudiar las características del inmueble.</li><li>Definir un acompañamiento a medida.</li></ul><figure><img src="/assets/terrace-960.webp" alt="Una terraza mediterránea en Barcelona"><figcaption>Imagen utilizada para comprobar la plantilla.</figcaption></figure><h2>Dar el siguiente paso</h2><p>Conoce nuestro <a href="/inversion-inmobiliaria-cataluna/">asesoramiento para la inversión inmobiliaria en Cataluña</a>.</p>');
  await fixture('en/solera-private-render-test.md', { ...draft, language: 'en', title: 'A fresh perspective on your property in Barcelona', description: 'A private local preview for the English reading experience.', category: 'Property' }, '<p>This private preview checks the reading experience. Test content is never published to the live website.</p><h2>Understanding the context</h2><p>Every property is part of a story. Understanding the owner’s priorities makes it possible to ask the right questions.</p><h2>A considered next step</h2><p>Read about our <a href="/en/property-investment-catalonia/">property investment advice in Catalonia</a>.</p>');
  await fixture('solera-private-second-test.md', { ...draft, title: 'La importancia de cuidar cada detalle', description: 'Una segunda prueba local de tarjetas y artículos relacionados.', translationGroup: 'solera-private-second-test', publishDate: '2025-12-01T12:00:00Z', image: '/assets/staircase-960.webp' }, '<h2>Una mirada personal</h2><p>Contenido de prueba local para revisar las tarjetas del Blog.</p>');
  await fixture('solera-private-draft-test.md', { ...draft, draft: true }, 'Borrador invisible.');
  await fixture('solera-private-future-test.md', { ...draft, publishDate: '2099-01-01T00:00:00Z' }, 'Programado invisible.');
  await build({ outDir: './qa-output/blog-preview/' });
  for (const lang of ['es', 'en']) {
    const prefix = lang === 'es' ? '' : 'en/';
    const html = await fs.readFile(path.join(output, prefix, 'blog/solera-private-render-test/index.html'), 'utf8');
    const { document } = parseHTML(html);
    assert.equal(document.querySelectorAll('main h1').length, 1);
    assert.equal(document.documentElement.lang, lang);
    assert.equal(document.querySelector('link[rel="canonical"]').getAttribute('href'), `https://soleraestates.eu/${prefix}blog/solera-private-render-test/`);
    assert.equal(document.querySelectorAll('link[hreflang]').length, 3);
    assert.match(html, /BlogPosting/);
    assert.ok(document.querySelector('.article-prose h2[id]'));
    for (const img of document.querySelectorAll('main img')) assert.ok(img.hasAttribute('srcset') && img.hasAttribute('width') && img.hasAttribute('alt'));
    const index = await fs.readFile(path.join(output, prefix, 'blog/index.html'), 'utf8');
    assert.ok(index.includes('solera-private-render-test/'));
    assert.ok(!index.includes('solera-private-draft-test/') && !index.includes('solera-private-future-test/'));
    assert.ok(!index.includes('Estamos preparando nuestras primeras publicaciones'));
    const feed = await fs.readFile(path.join(output, prefix, 'blog/rss.xml'), 'utf8');
    assert.ok(feed.includes('solera-private-render-test/') && !feed.includes('solera-private-draft-test/'));
  }
  console.log('CRM → Astro integration passed: bilingual pages, covers, reading contents, cards, schema, RSS and draft exclusion.');
} finally {
  for (const file of created) {
    if (!file.startsWith(directory + path.sep)) throw new Error('Unsafe fixture cleanup');
    await fs.unlink(file);
  }
}
