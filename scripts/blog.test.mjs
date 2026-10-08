import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { stringify } from 'yaml';
import { parseHTML } from 'linkedom';
import { loadBlog, renderBlogBody, optimizeBlogImage } from './blog-content.mjs';

test('NAT CRM publication contract: bilingual articles, translations, dates, safe HTML and local images', async () => {
  const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'solera-blog-test-'));
  const directory = path.join(temporary, 'content');
  const publicRoot = path.join(temporary, 'public');
  try {
    await fs.mkdir(path.join(directory, 'en'), { recursive: true });
    await fs.mkdir(path.join(publicRoot, 'images/blog'), { recursive: true });
    await sharp({ create: { width: 1200, height: 800, channels: 3, background: '#263e36' } }).webp().toFile(path.join(publicRoot, 'images/blog/test.webp'));
    const base = { title: 'Una propiedad con perspectiva', description: 'Una descripción de prueba para comprobar el contrato del CRM.', publishDate: '2026-01-01T12:00:00Z', updatedDate: '2026-01-02T12:00:00Z', author: 'Solera Estates', category: 'Propiedad', image: '/images/blog/test.webp', imageAlt: 'Imagen de comprobación', language: 'es', sourceLanguage: 'es', translationGroup: 'test-article', draft: false, natSeoArticleId: 'test-article', translations: { es: 'https://soleraestates.eu/blog/propiedad/', en: 'https://soleraestates.eu/en/blog/property/' } };
    const body = '<p>Texto introductorio.</p><h1>Contexto</h1><p>Una explicación <strong>útil</strong>.</p><h2>Contexto</h2><h4>Detalle</h4><img src="/images/blog/test.webp" alt="Detalle" onerror="alert(1)"><script>alert(1)</script><a href="javascript:alert(1)">No ejecutar</a><table><tr><th>Concepto</th></tr><tr><td>Valor</td></tr></table>';
    const write = (file, data, text = body) => fs.writeFile(path.join(directory, file), `---\n${stringify(data)}---\n${text}`);
    await write('propiedad.md', base);
    await write('en/property.md', { ...base, title: 'Property & perspective', language: 'en-GB', description: 'An English test description.' });
    await write('borrador.md', { ...base, draft: true });
    await write('futuro.md', { ...base, publishDate: '2099-01-01T00:00:00Z' });
    const options = { directory, publicRoot, now: new Date('2026-10-08T12:00:00Z') };
    const posts = await loadBlog(options);
    assert.equal(posts.length, 2);
    assert.equal(posts.find(a => a.lang === 'en').heading, 'Property & perspective');
    const es = posts.find(a => a.lang === 'es');
    assert.equal(es.route, '/blog/propiedad/');
    assert.deepEqual(es.alternates, { es: '/blog/propiedad/', en: '/en/blog/property/' });
    assert.match(es.image.srcset, /600w/);
    assert.match(es.image.srcset, /1200w/);
    const { document } = parseHTML(es.html);
    assert.equal(document.querySelectorAll('h1,script,[onerror]').length, 0);
    assert.equal(document.querySelector('a').hasAttribute('href'), false);
    assert.equal(document.querySelector('h3').textContent, 'Detalle');
    assert.equal(new Set(es.toc.map(h => h.id)).size, es.toc.length);
    assert.equal(document.querySelector('img').getAttribute('width'), '1200');
    assert.equal(document.querySelector('img').getAttribute('loading'), 'lazy');
    assert.ok(document.querySelector('.article-table table'));
    await fs.unlink(path.join(directory, 'en/property.md'));
    const [single] = await loadBlog(options);
    assert.deepEqual(single.alternates, { es: '/blog/propiedad/' }, 'unpublished translations must not produce broken hreflang');
    await write('invalido.md', { ...base, publishDate: 'not a date' });
    await assert.rejects(loadBlog(options), /Invalid publishDate/);
    await assert.rejects(optimizeBlogImage('/images/../../private.jpg', 'x', publicRoot));
    await assert.rejects(renderBlogBody('<img src="https://external.test/tracker.jpg">', { publicRoot }), /local raster/);
  } finally {
    if (!temporary.startsWith(path.join(os.tmpdir(), 'solera-blog-test-'))) throw new Error('Unsafe fixture cleanup');
    await fs.rm(temporary, { recursive: true, force: true });
  }
});
