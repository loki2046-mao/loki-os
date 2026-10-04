import {readdirSync,mkdirSync,copyFileSync,statSync,writeFileSync} from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {root} from './render-publication.mjs';
const out=path.join(root,'output/releases',new Date().toISOString().replace(/[:.]/g,'-'));mkdirSync(out,{recursive:true});const manifest=[];
const allowed=/\.(html|css|js|json|xml|txt|png|jpe?g|webp|gif|svg|ico|woff2?|ttf|otf|mp4|webm|mp3|wav|pdf)$/i;
function copy(dir,rel=''){for(const e of readdirSync(dir,{withFileTypes:true})){const name=path.join(rel,e.name);if(e.name.startsWith('.')&&!['.nojekyll'].includes(e.name))continue;if(e.isDirectory()){if(rel===''&&!['assets','projects','detail-study','methods','notes','contact'].includes(e.name))continue;copy(path.join(dir,e.name),name);}else if(allowed.test(name)||['CNAME','.nojekyll'].includes(name)){if(['package.json','publication-manifest.json'].includes(name))continue;const dest=path.join(out,name);mkdirSync(path.dirname(dest),{recursive:true});copyFileSync(path.join(dir,e.name),dest);manifest.push({path:name,bytes:statSync(dest).size,sha256:createHash('sha256').update(readFileSync(dest)).digest('hex')});}}}
copy(root);writeFileSync(path.join(out,'release-manifest.json'),JSON.stringify(manifest,null,2));console.log(JSON.stringify({directory:out,files:manifest.length,bytes:manifest.reduce((s,f)=>s+f.bytes,0)}));
