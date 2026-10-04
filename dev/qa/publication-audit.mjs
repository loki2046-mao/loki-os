import fs from 'node:fs';
import path from 'node:path';
const root='/Users/kude/Projects/loki-os';
export async function audit(browser,base='http://127.0.0.1:54911'){
 const records=[];const paths=Object.keys(JSON.parse(fs.readFileSync(path.join(root,'publication-manifest.json'),'utf8'))).filter(x=>x.endsWith('.html'));
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:900}});
  for(let i=0;i<paths.length;i+=4){await Promise.all(paths.slice(i,i+4).map(async file=>{const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/'+file,{waitUntil:'load',timeout:15000});const state=await page.evaluate(()=>({title:document.title,overflow:document.documentElement.scrollWidth>innerWidth+1,broken:[...document.images].filter(x=>x.getClientRects().length&&x.complete&&!x.naturalWidth).map(x=>x.src),text:document.body.innerText.length}));records.push({file,width,...state,errors});await page.close();}));}
  const page=await context.newPage();
  for(const [url,name] of [['/','home'],['/methods/loki-writing/','method'],['/contact/','contact']]){await page.goto(base+url);await page.screenshot({path:root+'/output/playwright/publication-'+name+'-'+width+'.png',fullPage:true,timeout:15000,animations:'disabled'});}
  await context.close();
 }
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();const noJS=[];
 for(const file of ['index.html','methods/index.html','methods/loki-writing/index.html','notes/day-01/index.html','contact/index.html']){await page.goto(base+'/'+file);noJS.push({file,characters:(await page.locator('body').innerText()).length});}await context.close();
 const result={pages:records.length,issues:records.filter(x=>x.errors.length||x.overflow||x.broken.length),noJS};fs.writeFileSync(root+'/output/playwright/publication-audit.json',JSON.stringify({result,records},null,2));return result;
}
