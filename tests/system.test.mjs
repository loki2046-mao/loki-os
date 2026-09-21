import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { readingSummary } from '../scripts/reading-summary.mjs';
const read = name => readFileSync(new URL('../' + name, import.meta.url), 'utf8');
test('new manuscript updates every generated current-reading field', () => {
  const ctx = {window:{}}; vm.runInNewContext(read('corpus-data.js'),ctx);
  const books = [...ctx.window.lokiCorpus.books, {day:29,title:'回归测试用书',date:'2026-09-20'}];
  const result = readingSummary(books);
  assert.equal(result.count,29);assert.equal(result.latest.day,29);
  for(const key of ['scope','summary','progress']) assert(result[key].includes('回归测试用书'));
  assert(result.status.includes('2026-09-20'));assert(result.saved.includes('29 篇'));
});
test('route stages run once in dependency order, regardless of registration order', () => {
  const order=['study','catalogue','material','directory','perspective','publication','editorial','venue','corpus','process','pockets'];
  const calls=[],listeners=[];
  const location={hash:'#catalogue/knowledge/book',replace(value){this.hash=value}};
  const ctx={window:{},location,document:{dispatchEvent(){}},CustomEvent:class{},addEventListener:(name,fn)=>listeners.push([name,fn])};
  vm.runInNewContext(read('detail-study/router.js'),ctx);
  for(const name of [...order].reverse())ctx.window.lokiRoutes.register(name,()=>calls.push(name));
  ctx.window.lokiRoutes.start();ctx.window.lokiRoutes.start();
  assert.deepEqual(calls,order);assert.equal(listeners.length,1);
  calls.length=0;listeners[0][1]();assert.deepEqual(calls,order);
  calls.length=0;location.hash='#catalogue/not-a-category';listeners[0][1]();assert.equal(location.hash,'#catalogue/works');assert.equal(calls.length,0);
});
test('method links follow the actual target category and are reciprocal for uses edges',()=>{
 const ctx={window:{}};vm.runInNewContext(read('public-data.js'),ctx);vm.runInNewContext(read('relations.js'),ctx);
 assert(ctx.window.lokiRelations.forItem('book').some(x=>x.href==='#catalogue/works/daily-insight'));
 assert(ctx.window.lokiRelations.forItem('daily-insight').some(x=>x.href==='#catalogue/knowledge/book'));
 assert(!ctx.window.lokiRelations.forItem('daily-insight').some(x=>x.id==='notes'));
 const book=ctx.window.bookData.skills.find(x=>x.id==='book');book.category='writing';
 assert(ctx.window.lokiRelations.forItem('daily-insight').some(x=>x.href==='#catalogue/writing/book'));
});
async function statsHarness(mode){
 const requests=[],events={},scope={textContent:''},cells=[{dataset:{visit:'totalPV'},textContent:''}];
 const hanging=signal=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(new Error('timeout'))));
 const ctx={window:{},location:{hostname:'loki-os.hiloki.ai',pathname:'/',search:'',hash:'#cover'},localStorage:{getItem:()=> 'a'.repeat(64)},crypto:{},AbortController,
  setTimeout:fn=>setTimeout(fn,5),clearTimeout,Intl,Uint8Array,
  document:{hidden:false,querySelector:s=>s==='.visit-scope'?scope:null,querySelectorAll:()=>cells},
  addEventListener:(name,fn)=>events[name]=fn,
  fetch:async(url,options)=>{requests.push({url,method:options.method});if(requests.length===1){if(mode==='body')return {ok:true,json:()=>hanging(options.signal)};return hanging(options.signal)}return {ok:true,json:async()=>({todayUV:1,todayPV:2,totalUV:1,totalPV:2})}}
 };
 vm.runInNewContext(read('visits.js'),ctx);
 ctx.location.hash='#works';events.hashchange();
 await new Promise(resolve=>setTimeout(resolve,50));
 assert.deepEqual(requests.map(r=>r.method),['POST','GET','POST']);assert.equal(cells[0].textContent,'2');
 events.visibilitychange();await new Promise(resolve=>setTimeout(resolve,10));assert.equal(requests.at(-1).method,'GET');
}
test('statistics timeout releases the queue without replaying the failed POST',()=>statsHarness('request'));
test('statistics body timeout is bounded too',()=>statsHarness('body'));

test('reading sync updates real source slots and remains idempotent', async () => {
  const { mkdtempSync, mkdirSync, writeFileSync, rmSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const { execFileSync } = await import('node:child_process');
  const root = mkdtempSync(join(tmpdir(), 'loki-reading-'));
  try {
    mkdirSync(join(root, 'scripts')); mkdirSync(join(root, 'projects'));
    for (const file of ['scripts/sync-reading.mjs', 'scripts/reading-summary.mjs', 'public-data.js', 'corpus-data.js', 'process-data.js', 'projects/daily-insight.html']) {
      writeFileSync(join(root, file), read(file));
    }
    const corpusPath = join(root, 'corpus-data.js');
    writeFileSync(corpusPath, read('corpus-data.js') + '\nwindow.lokiCorpus.books.push({day:29,title:"新增测试文稿",date:"2026-09-20"});\n');
    const run = (...args) => execFileSync(process.execPath, [join(root, 'scripts/sync-reading.mjs'), ...args], {stdio:'pipe'});
    assert.throws(() => run('--check'));
    run(); run('--check');
    const ctx = {window:{}};
    for (const file of ['public-data.js','corpus-data.js','process-data.js']) vm.runInNewContext(readFileSync(join(root,file),'utf8'),ctx);
    const project = ctx.window.bookData.projects.find(p=>p.id==='daily-insight');
    const original = {window:{}}; vm.runInNewContext(read('public-data.js'),original);
    assert.deepEqual(JSON.parse(JSON.stringify(project.verification)), JSON.parse(JSON.stringify(original.window.bookData.projects.find(p=>p.id==='daily-insight').verification)));
    assert(project.summary.includes('新增测试文稿'));
    assert(project.proof.includes('29 篇'));
    assert(ctx.window.lokiCorpus.reading.scope.includes('Day 29'));
    assert(ctx.window.lokiProcess.book.steps.some(step=>step[1].includes('Day 29')));
    const html = readFileSync(join(root,'projects/daily-insight.html'),'utf8');
    assert(html.includes('Day 01—29'));
    assert(html.includes('9 月 20 日'));
    run(); assert.equal(readFileSync(join(root,'projects/daily-insight.html'),'utf8'),html);
  } finally { rmSync(root,{recursive:true,force:true}); }
});
