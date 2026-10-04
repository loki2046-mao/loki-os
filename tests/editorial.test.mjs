import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {identity,threads} from '../scripts/editorial-data.mjs';
import {root,origin,personId} from '../scripts/render-publication.mjs';
const read=p=>readFileSync(root+'/'+p,'utf8');
test('positioning is readable without JS and each selected work connects its cause to the author',()=>{
 const home=read('index.html');assert.ok(home.includes(identity));assert.ok(home.includes('class="cover-character"'));assert.ok(!home.includes('data-interface-state'));assert.ok(!home.includes('data-fragment'));
 for(const t of threads){const page=read('projects/'+t.id+'.html');for(const text of [t.origin,t.decision,t.meaning]){assert.ok(home.includes(text));assert.ok(page.includes(text));}assert.ok(read('about.html').includes(t.origin));assert.ok(read('works.html').includes(t.origin));const graphs=[...page.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m=>JSON.parse(m[1]));const article=graphs.flatMap(g=>g['@graph']||[]).find(g=>g['@type']==='Article');assert.equal(article.author['@id'],personId);assert.equal(article.creator['@id'],personId);for(const link of article.mentions||[]){assert.ok(existsSync(root+link['@id'].replace(origin,'').replace(/#page$/,'').replace(/\/$/,'/index.html')));}}
});
