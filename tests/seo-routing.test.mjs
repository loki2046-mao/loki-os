import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('indexable methods directory does not redirect to the noindex interactive catalogue',()=>{
 const html=readFileSync(new URL('../methods/index.html',import.meta.url),'utf8');
 assert.doesNotMatch(html,/location\.(replace|assign)\(/);
 assert.doesNotMatch(html,/<meta[^>]+content="[^"]*noindex/);
 assert.match(html,/href="\/methods\/travel-memory\/"/);
});
