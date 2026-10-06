import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const assetDir=path.resolve('public/assets');
await fs.mkdir(assetDir,{recursive:true});
const images=[['hero','solera-hero-courtyard.png'],['staircase','solera-staircase.png'],['living','solera-living-vignette.png']];
for(const [name,file] of images){
 const input=path.resolve('../../work/assets-source',file);
 for(const width of [640,960,1440,1920]){
  await sharp(input).resize({width,withoutEnlargement:true}).webp({quality:82}).toFile(path.join(assetDir,`${name}-${width}.webp`));
  await sharp(input).resize({width,withoutEnlargement:true}).avif({quality:57,effort:4}).toFile(path.join(assetDir,`${name}-${width}.avif`));
 }
}
const fonts=[['serif','https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2'],['sans','https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSg.woff2']];
for(const [name,url] of fonts){const response=await fetch(url);if(!response.ok)throw new Error('Font request failed');await fs.writeFile(path.join(assetDir,`${name}.woff2`),Buffer.from(await response.arrayBuffer()));}
await fs.copyFile('../../work/assets-source/magnific-assets.json','content/magnific-assets.json');
console.log('Three images optimised in AVIF/WebP; two fonts self-hosted.');
