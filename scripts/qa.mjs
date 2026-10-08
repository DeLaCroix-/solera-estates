import fs from 'node:fs/promises';
import path from 'node:path';
import {parseHTML} from 'linkedom';
import {marked} from 'marked';
import * as csstree from 'css-tree';
import {source,parseContent} from './content.mjs';
const root=path.resolve(process.env.OUTPUT_DIR||'dist');
const routes=JSON.parse(await fs.readFile('qa-output/routes.json','utf8'));
const editorial=parseContent();
const failures=[];let checks=0;const check=(ok,message)=>{checks++;if(!ok)failures.push(message);};
const css=(await Promise.all(['src/style.css','src/interiors.css','src/blog.css'].map(file=>fs.readFile(file,'utf8')))).join('\n');
const ast=csstree.parse(css,{onParseError:error=>check(false,'CSS syntax: '+error.message)});
check(Boolean(ast),'CSS parses');
csstree.walk(ast,{visit:'Declaration',enter(node){if(node.property.startsWith('--')||this.atrule?.name==='font-face')return;const value=csstree.generate(node.value);if(value.includes('var('))return;const result=csstree.lexer.matchProperty(node.property,node.value);check(!result.error,'CSS value '+node.property+': '+value);}});
const norm=s=>s.replace(/\s+/g,' ').trim();
const text=s=>norm(parseHTML('<main>'+marked.parse(s)+'</main>').document.querySelector('main').textContent);
const pages=new Map();
for(const p of routes){const html=await fs.readFile(path.join(root,p.route,'index.html'),'utf8');const {document}=parseHTML(html);pages.set(p.route,{p,html,document});}
for(const route of ['/la-firma/','/en/the-firm/','/journal/','/en/journal/'])check(!pages.has(route),'retired route removed '+route);
const titleSet=new Set(),descriptionSet=new Set();
for(const {p,html,document:d} of pages.values()){
 const h1=[...d.querySelectorAll('main h1')].filter(n=>!n.closest('template'));
 check(h1.length===1,p.route+' has exactly one visible H1');
 check(d.documentElement.lang===p.lang,p.route+' lang');
 check(d.title===p.title,p.route+' exact editorial title');
 check(!titleSet.has(d.title),p.route+' unique title');titleSet.add(d.title);
 const description=d.querySelector('meta[name="description"]')?.getAttribute('content');
 check(description===p.description,p.route+' exact description');
 check(!descriptionSet.has(description),p.route+' unique description');descriptionSet.add(description);
 const canonical=d.querySelector('link[rel="canonical"]')?.getAttribute('href');
 check(canonical?.endsWith(p.route),p.route+' canonical');
 const alternates=[...d.querySelectorAll('link[rel="alternate"][hreflang]')];
 check(alternates.length===(p.alternates ? Object.keys(p.alternates).length+1 : 3),p.route+' actual language annotations');
 for(const a of alternates){const url=new URL(a.getAttribute('href'));const other=pages.get(url.pathname);check(Boolean(other),p.route+' alternate resolves: '+url.pathname);if(other&&a.getAttribute('hreflang')!=='x-default')check(other.document.querySelector(`link[hreflang="${p.lang}"]`)?.getAttribute('href')===canonical,p.route+' reciprocal hreflang');}
 const ids=[...d.querySelectorAll('[id]')].map(n=>n.id);check(ids.length===new Set(ids).size,p.route+' unique IDs');
 check(!/Nota para el equipo|Team note|Regla de tarjetas|Card rule|GLOBAL-FORM|P0[1-9]|\[S\d+\]/.test(d.querySelector('main').textContent),p.route+' no internal instructions');
 for(const img of d.querySelectorAll('img')){check(img.hasAttribute('alt')&&img.hasAttribute('width')&&img.hasAttribute('height'),p.route+' image dimensions and alt');check(img.hasAttribute('srcset'),p.route+' responsive image');}
 for(const script of d.querySelectorAll('script[type="application/ld+json"]')){try{const json=JSON.parse(script.textContent);check(json['@context']==='https://schema.org',p.route+' schema');check(!script.textContent.includes('AggregateRating'),p.route+' no fabricated rating');}catch{check(false,p.route+' JSON-LD parses');}}
 let previous=0;for(const heading of d.querySelectorAll('main h1,main h2,main h3')){if(heading.closest('template'))continue;const level=Number(heading.tagName.slice(1));check(level<=previous+1,p.route+' hierarchy '+heading.textContent);previous=level;}
 for(const a of d.querySelectorAll('a[href]')){const href=a.getAttribute('href');if(/^(mailto:|https?:)/.test(href))continue;const url=new URL(href,'https://example.test'+p.route);const target=pages.get(url.pathname);check(Boolean(target),p.route+' link resolves '+href);if(target&&url.hash)check(Boolean(target.document.getElementById(decodeURIComponent(url.hash.slice(1)))),p.route+' anchor resolves '+href);}
 check(![...d.querySelectorAll('nav a')].some(a=>/^(La firma|The firm|Journal)$/.test(a.textContent.trim())),p.route+' retired navigation removed');
 const main=d.querySelector('main');const fulltext=norm(main.textContent);
 const ep=editorial.find(q=>q.route===p.route)||(p.id==='INVERSION'?p:null);
 if(ep){for(const block of ep.blocks){check(Boolean(main.querySelector(`[data-block="${block.id}"]`))||p.id==='GRACIAS',p.route+' block '+block.id);for(const n of block.nodes){if(['/la-firma/','/en/the-firm/'].includes(n.href))continue;check(fulltext.includes(text(n.text)),p.route+' preserves '+block.id+' '+n.text.slice(0,75));}}}
 for(const el of d.querySelectorAll('input:not([type="hidden"]),textarea,select'))check(Boolean(d.querySelector(`label[for="${el.id}"]`)),p.route+' label '+el.id);
 const form=d.querySelector('#enquiry-form');
 if(form){check(/^https:\/\/formspree\.io\/f\/[a-z0-9]+$/.test(form.getAttribute('action')),p.route+' dedicated Formspree endpoint');check(form.querySelector('[name="_gotcha"]')!==null,p.route+' honeypot');check(form.querySelector('[name="privacy"]').hasAttribute('required'),p.route+' privacy acknowledgement');}
 check(!html.includes('info@soleraestates.es'),p.route+' no previous email address');
 const robots=d.querySelector('meta[name="robots"]').getAttribute('content');
 if(['JOURNAL','ERROR','GRACIAS','LEGAL','PRIVACY','COOKIES'].includes(p.id))check(robots.includes('noindex'),p.route+' utility or empty journal excluded');
 check(!/https?:\/\/(fonts\.google|www\.googletagmanager|www\.google-analytics)/.test(html),p.route+' no remote fonts or eager Google tags');
}
// Independent count from the supplied master: no editorial headings lost in extraction.
const raw=source.slice(source.indexOf('## 4. Contenido completo'),source.indexOf('## 6. Textos globales'));
const sourceHeadings=[...raw.matchAll(/^\*\*H([123]): (.+)\*\*$/gm)];
const parsedHeadings=editorial.flatMap(p=>p.blocks.flatMap(b=>b.nodes.filter(n=>/^h[123]$/.test(n.type))));
check(sourceHeadings.length===parsedHeadings.length,`all ${sourceHeadings.length} source headings extracted`);
const sitemap=await fs.readFile(path.join(root,'sitemap.xml'),'utf8');
for(const [,loc] of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)){const route=new URL(loc).pathname;check(pages.has(route),'sitemap valid '+route);check(!pages.get(route)?.document.querySelector('meta[name="robots"]').getAttribute('content').includes('noindex'),'sitemap excludes noindex '+route);}
const expectedV2=JSON.parse(await fs.readFile('content/heading-update-v2.json','utf8')).expectedHeadings;
for(const expected of expectedV2){const page=editorial.find(p=>p.lang===expected.lang&&p.blocks.some(b=>b.id===expected.block));if(!pages.has(page.route))continue;const document=pages.get(page.route).document;const dom=page.id==='GRACIAS'?document.querySelector('template').content:document;const candidates=[...dom.querySelectorAll(`[data-block="${expected.block}"] ${expected.type}`)];check(candidates.some(heading=>norm(heading.textContent)===text(expected.text)),page.route+' exact v2 heading: '+expected.text);}
for(const {p,document:d} of pages.values())check(d.querySelector('meta[name="generator"]')?.getAttribute('content').startsWith('Astro v'),p.route+' generated by Astro');
const base=process.env.QA_BASE_URL||'http://127.0.0.1:4179';
if(!process.env.QA_OFFLINE&&!process.argv.includes('--offline')){for(const {p,document:local} of pages.values()){const response=await fetch(base+p.route);check(response.status===(p.id==='ERROR'?404:200),p.route+' HTTP status '+response.status);
 const {document:served}=parseHTML(await response.text());
 check(norm(served.querySelector('main')?.textContent||'')===norm(local.querySelector('main').textContent),p.route+' served content matches this build');
 for(const selector of ['link[rel="canonical"]','meta[name="robots"]','meta[name="generator"]']){const attr=selector.startsWith('link')?'href':'content';check(served.querySelector(selector)?.getAttribute(attr)===local.querySelector(selector)?.getAttribute(attr),p.route+' served '+selector);}
 if(local.querySelector('#enquiry-form'))check(served.querySelector('#enquiry-form')?.getAttribute('action')===local.querySelector('#enquiry-form').getAttribute('action'),p.route+' served form endpoint');
 }
 for(const route of ['/this-page-does-not-exist/','/en/this-page-does-not-exist/']){const response=await fetch(base+route);check(response.status===404,route+' true 404');const html=await response.text();check(html.includes(`lang="${route.startsWith('/en/')?'en':'es'}"`),route+' 404 language');}
 const assets=new Set([...pages.values()].flatMap(({document:d})=>[...d.querySelectorAll('img[src],script[src],link[rel="stylesheet"],link[rel="preload"],link[rel="icon"]')].map(n=>n.getAttribute('src')||n.getAttribute('href'))));
 for(const asset of assets){const r=await fetch(base+asset);check(r.status===200,'asset served '+asset);}
}
const report={at:new Date().toISOString(),checks,passed:checks-failures.length,failed:failures.length,routes:routes.length,editorialPages:editorial.length,editorialHeadings:sourceHeadings.length,failures};
await fs.writeFile(process.env.QA_REPORT||'qa-output/technical-audit.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));if(failures.length)process.exit(1);
