import fs from 'node:fs';
export const source = fs.readFileSync('content/editorial-source.md', 'utf8').replace(/\r/g, '');
export function parseContent() {
  const pages = [];
  const chunks = [...source.matchAll(/^### ([45])\.(\d+)\. (.+)\n([\s\S]*?)(?=^### [45]\.\d+\.|^## [56]\.|$(?![\s\S]))/gm)];
  for (const [, section, index, name, raw] of chunks) {
    const lang = section === '4' ? 'es' : 'en';
    const meta = raw.split(/^#### /m)[0];
    const route = meta.match(/\*\*(?:URL|Ruta de error|Error route):\*\*[^\n]*?`([^`]+)`/)?.[1];
    const title = meta.match(/\*\*(?:Title SEO|SEO title):\*\* (.+)/)?.[1].trim();
    const description = meta.match(/\*\*(?:Metadescripción|Meta description):\*\* (.+)/)?.[1].trim();
    const blocks = [];
    for (const [, id, label, body] of raw.matchAll(/^#### ([A-Z]+-\d+) · (.+)\n([\s\S]*?)(?=^#### |$(?![\s\S]))/gm)) {
      const block = {id,label,anchor:null,eyebrow:null,nodes:[]};
      for (let para of body.trim().split(/\n\s*\n/)) {
        para = para.trim();
        if (/^\*\*(?:Nota para el equipo|Team note|Regla de tarjetas|Card rule|Contenido de interfaz|Interface content|Botón|Button):/.test(para)) continue;
        if (/^\*\*(?:Ancla|Anchor):/.test(para)) {block.anchor = para.match(/`([^`]+)`/)[1];continue;}
        if (/^\*\*(?:Antetítulo|Eyebrow):/.test(para)) {block.eyebrow=para.replace(/^\*\*[^*]+\*\*\s*/, '');continue;}
        const heading=para.match(/^\*\*H([123]): (.+)\*\*$/);
        if(heading) {block.nodes.push({type:'h'+heading[1],text:heading[2]});continue;}
        if (/^\*\*(?:CTA|Enlace|Primary CTA|Secondary CTA|Card link|Link|Empty-state links|Jump CTA)/.test(para)) {
          for(const line of para.split('\n')) {
            const kind=line.match(/^\*\*([^*]+):\*\*/)?.[1]??'CTA';
            const content=line.replace(/^\*\*[^*]+\*\*\s*/, '');
            for(const [,text,href] of content.matchAll(/([^→]+?)\s*→\s*`([^`]+)`/g)) block.nodes.push({type:'link',text:text.replace(/^\s*·\s*/, '').trim(),href,kind});
          }
          continue;
        }
        para=para.replace(/^\*\*(?:Estado sin artículos publicados — texto exacto|Exact empty-state copy):\*\*\s*/, '');
        para=para.replace(/\*\*(?:Etiqueta de categoría|Category label):\s*/g,'**');
        if(para) block.nodes.push({type:'p',text:para});
      }
      blocks.push(block);
    }
    if(!route||!title||!description||!blocks.length) throw new Error('Incomplete page '+name);
    pages.push({id:blocks[0].id.split('-')[0],index:Number(index),name,lang,route,title,description,blocks});
  }
  if(pages.length!==20) throw new Error('Expected 20 editorial pages, got '+pages.length);
  return pages;
}
