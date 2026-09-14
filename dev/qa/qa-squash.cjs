const {chromium}=require('/Users/kude/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});try{
for(const width of [1440,390])for(const reducedMotion of ['no-preference','reduce']){
const page=await browser.newPage({viewport:{width,height:width===390?844:900},reducedMotion});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(pathToFileURL(path.join(__dirname,'..','..','index.html')).href+'#skill-prompt-spec');
await page.locator('.wristband:visible').click();
const court=page.locator('.squash-court:visible');await court.locator('img').evaluate(i=>i.decode());assert.equal(await court.locator('svg').count(),0);
await court.scrollIntoViewIfNeeded();await court.screenshot({path:`/tmp/squash-${width}-${reducedMotion}.png`});
for(let i=0;i<2;i++){await page.locator('.squash-shot:visible').click();assert(await court.evaluate(e=>e.classList.contains('playing')));await page.waitForTimeout(320);if(reducedMotion==='no-preference')assert(await court.locator('img').evaluate(e=>e.getAnimations().length>0));await page.waitForTimeout(1000);}
await page.locator('.wristband:visible').click();assert(!await court.isVisible());await page.locator('.wristband:visible').click();assert(await court.isVisible());
assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);console.log(`${width} ${reducedMotion}: image, replay, toggle, overflow, console PASS`);await page.close();
}}finally{await browser.close()}})();
