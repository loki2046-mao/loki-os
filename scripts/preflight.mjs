import {readFileSync,existsSync,statSync,mkdirSync,writeFileSync} from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {root,origin} from './render-publication.mjs';
const files=Object.keys(JSON.parse(readFileSync(path.join(root,'publication-manifest.json'),'utf8'))).filter(f=>f.endsWith('.html'));
const sitemap=readFileSync(path.join(root,'sitemap.xml'),'utf8');const issues=[],images=new Map(),titles=new Set();
for(const f of files){const html=readFileSync(path.join(root,f),'utf8');
 const canonical=html.match(/rel="canonical" href="([^"]+)"/)?.[1];
 if(!canonical?.startsWith(origin))issues.push(f+': canonical');
 const title=html.match(/<title>(.*?)<\/title>/s)?.[1];if(!title||titles.has(title))issues.push(f+': duplicate/missing title');titles.add(title);
 if(/\/Users\/|(?:sk-proj-|ghp_)[A-Za-z0-9]{20}/.test(html))issues.push(f+': private path or credential pattern');
 const noindex=/name="robots" content="[^"]*noindex/.test(html);
 if(!noindex&&!sitemap.includes('<loc>'+canonical+'</loc>'))issues.push(f+': sitemap missing');
 for(const m of html.matchAll(/(?:href|src)="([^"#]+)"/g)){let url;try{url=new URL(m[1],origin+'/'+f)}catch{continue}if(url.origin!==origin)continue;let target=decodeURIComponent(url.pathname);if(target.endsWith('/'))target+='index.html';const disk=path.join(root,target);if(!existsSync(disk))issues.push(f+': missing '+target);if(/\.(png|jpe?g|webp)$/i.test(target)&&existsSync(disk))images.set(target,statSync(disk).size);}
}
const result={date:'2026-10-03',pages:files.length,issues,largestImages:[...images].sort((a,b)=>b[1]-a[1]).slice(0,10)};
mkdirSync(path.join(root,'output/preflight'),{recursive:true});writeFileSync(path.join(root,'output/preflight/static.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));assert.equal(issues.length,0,'preflight failed');
