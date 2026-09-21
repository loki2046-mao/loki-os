/* One PV per rendered URL, unique visitors counted by the same-origin service. */
(()=>{
const LOCAL=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
/* 正式环境走同站子域 stats.hiloki.ai，Cookie 才是第一方；未就绪时退回 Pages 域名。 */
const PRIMARY='https://stats.hiloki.ai/api/visits',FALLBACK='https://loki-os-stats.pages.dev/api/visits';
let endpoint=LOCAL?'/api/visits':PRIMARY,degraded=false,last='',pending=Promise.resolve(),latest;
function visitor(){
 /* 同站子域时服务端用 HttpOnly Cookie 识别访客；跨站退回时用本地随机标识，只用于去重。 */
 try{let id=localStorage.getItem('loki-visitor');if(!/^[a-f0-9]{64}$/.test(id||'')){const b=new Uint8Array(32);crypto.getRandomValues(b);id=[...b].map(x=>x.toString(16).padStart(2,'0')).join('');localStorage.setItem('loki-visitor',id)}return id}catch{return''}
}
function mount(){const anchor=document.querySelector('#cover .cover-exits');if(!anchor||document.querySelector('.visit-ledger'))return;
 const node=document.createElement('section');node.className='visit-ledger';node.setAttribute('aria-label','网站访问统计');
 node.innerHTML='<div class="visit-heading"><span class="visit-dot" aria-hidden="true"></span><small>HOUSE RECORD / 入场记录</small><b>谢谢你，来过这里。</b><span class="visit-scope">正在读取</span></div><dl>'+[['todayUV','今日访客','UV'],['todayPV','今日浏览','PV'],['totalUV','累计访客','UV'],['totalPV','累计浏览','PV']].map(([key,label,unit])=>'<div><dt>'+label+' <small>'+unit+'</small></dt><dd data-visit="'+key+'">—</dd></div>').join('')+'</dl><p class="visit-note">UV 为去重访客，PV 为页面浏览次数。今日按北京时间计算。</p>';
 anchor.before(node);if(latest)paint(latest);
}
function paint(data){latest=data;document.querySelectorAll('[data-visit]').forEach(x=>x.textContent=new Intl.NumberFormat('zh-CN').format(data[x.dataset.visit]));const scope=document.querySelector('.visit-scope');if(scope)scope.textContent=data.scope==='local'?'本地预览统计':'访问统计';}
async function send(count){
 const headers=count?{'X-Loki-Visit':'1'}:{};
 if(!LOCAL){const id=visitor();if(id)headers['X-Loki-Visitor']=id}
 const controller=new AbortController();
 const timeout=setTimeout(()=>controller.abort(),8000);
 try{
  const response=await fetch(endpoint,{method:count?'POST':'GET',credentials:'include',cache:'no-store',headers,signal:controller.signal});
  if(!response.ok)throw new Error('Statistics request failed');
  const data=await response.json();
  if(!['todayUV','todayPV','totalUV','totalPV'].every(k=>Number.isSafeInteger(data[k])&&data[k]>=0))throw new Error('Invalid statistics');
  return data;
 }finally{clearTimeout(timeout)}
}
async function attempt(count){try{return await send(count)}catch{return null}}
async function request(count){
 let data=await attempt(count);
 if(!data&&!LOCAL&&!degraded&&endpoint===PRIMARY){
  degraded=true;endpoint=FALLBACK;
  // A timed-out POST may already have counted. Read totals; never replay that write.
  data=await attempt(false);
 }
 if(data){paint(data);return}
 const scope=document.querySelector('.visit-scope');
 if(scope)scope.textContent=latest?'统计暂不可用 · 显示上次记录':'统计暂不可用';
}
function navigate(){mount();const route=location.pathname+location.search+location.hash;if(route===last)return;last=route;pending=pending.then(()=>request(true));}
addEventListener('hashchange',navigate);navigate();
// Reading totals never generates another pageview; avoid counting tab switches.
addEventListener('visibilitychange',()=>{if(!document.hidden)pending=pending.then(()=>request(false))});
})();
