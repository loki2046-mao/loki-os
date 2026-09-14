const {chromium}=require('/Users/kude/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {pathToFileURL}=require('url'),path=require('path'),assert=require('assert/strict');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});try{
for(const width of [1440,390]){
 const p=await browser.newPage({viewport:{width,height:width===390?844:900},reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(pathToFileURL(path.join(__dirname,'..','..','index.html')).href+'#about');
 for(const [route,id,selector,names] of [['about','supergirl','[data-fan-choice]',['周笔畅','李宇春']],['works','sisters','.season-tabs button',['万茜','刘恋','陈昊宇']],['break','favorites','[data-character]',['禾晏','顾声','雁回','岳千灵']]]){
  await p.evaluate(r=>location.hash=r,route);await p.waitForTimeout(150);await p.locator('.egg[popovertarget='+id+']').click();const panel=p.locator('#'+id);
  for(const [i,name] of names.entries()){
   await panel.locator(selector).nth(i).click();await panel.locator('img').evaluateAll(xs=>Promise.all(xs.map(x=>x.decode())));
   assert((await panel.locator('.fan-photo-credit').textContent()).includes(name));
   const src=await panel.locator('.fan-photo-credit a').first().getAttribute('href');assert(src.startsWith('assets/'));
   assert(await panel.evaluate(el=>el.scrollWidth<=el.clientWidth+1));
   if(id==='favorites'){await panel.locator('.character-card').click();assert(await panel.locator('.character-back').isVisible());await panel.locator('.character-card').click();assert(await panel.locator('.character-front').isVisible())}
   await panel.screenshot({path:`/tmp/real-${id}-${i}-${width}.png`,animations:'disabled'});
  }
  const rect=await panel.boundingBox();assert(rect.width<=width);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.keyboard.press('Escape');assert(!await panel.isVisible());
 }
 assert.deepEqual(errors,[]);console.log(width+': 9 photo mappings, image decoding, source links, role flips, close, no overflow PASS');await p.close();
}
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
