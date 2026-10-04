import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { buildPublication, loadContent, itemUrl, bookUrl, root, personId, run } from '../scripts/render-publication.mjs';
const content=loadContent();
const files=buildPublication(content);
test('every public method and book has indexable text, unique metadata, and a stable URL',()=>{
 const titles=new Set();
 for(const item of content.data.skills.filter(x=>x.visibility==='public')){
  const html=files.get(itemUrl(item).slice(1)+'index.html');
  assert(html.includes('<h1>'+item.title+'</h1>'));
  assert(html.includes('来源与使用边界'));
  assert(html.includes('rel="canonical" href="https://loki-os.hiloki.ai'+itemUrl(item)+'"'));
  const title=html.match(/<title>(.*?)<\/title>/)[1];assert(!titles.has(title));titles.add(title);
 }
 for(const book of content.corpus.books){const html=files.get(bookUrl(book).slice(1)+'index.html');assert(html.includes(book.title));assert(html.includes('尚未逐页对照原书'));assert(html.includes(book.date));}
});
test('publication graph uses the same author and all local resources resolve',()=>{
 for(const [file,html] of files){
  if(!file.endsWith('.html'))continue;
  assert(html.includes(personId),file);
  for(const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){
   const target=decodeURI(match[1]);const rel=(target.endsWith('/')?target+'index.html':target).slice(1);
   assert(files.has(rel)||existsSync(path.join(root,rel)),file+' missing '+target);
  }
 }
});
test('private methods are absent from standalone pages, home, index and related links',()=>{
 const copy=loadContent();copy.data.skills.find(x=>x.id==='book').visibility='private';
 const output=buildPublication(copy);
 assert(!output.has('methods/book/index.html'));
 assert(!output.get('methods/index.html').includes('href="/methods/book/"'));
 assert(!output.get('projects/daily-insight.html').includes('href="/methods/book/"'));
});
test('the checked-in publication is reproducible without touching its dates',()=>{
 assert.doesNotThrow(()=>run(true));
 const sitemap=readFileSync(path.join(root,'sitemap.xml'),'utf8');
 for(const skill of content.data.skills.filter(x=>x.visibility==='public'))assert(sitemap.includes(itemUrl(skill)));
 for(const book of content.corpus.books)assert(sitemap.includes(bookUrl(book)));
 assert(!sitemap.includes('#catalogue/'));
});
