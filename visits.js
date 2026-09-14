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
function send(count){const headers=count?{'X-Loki-Visit':'1'}:{};if(!LOCAL){const id=visitor();if(id)headers['X-Loki-Visitor']=id}
 return fetch(endpoint,{method:count?'POST':'GET',credentials:'include',cache:'no-store',headers});}
/* 网络层失败（DNS/离线）与 HTTP 失败都要能触发退回，所以统一在这里兜住。 */
async function attempt(count){try{return await send(count)}catch{return null}}
async function request(count){try{
 let r=await attempt(count);
 if((!r||!r.ok)&&!LOCAL&&!degraded&&endpoint===PRIMARY){degraded=true;endpoint=FALLBACK;r=await attempt(count)}
 if(!r||!r.ok)throw Error();
 const d=await r.json();
 if(!['todayUV','todayPV','totalUV','totalPV'].every(k=>Number.isSafeInteger(d[k])&&d[k]>=0))throw Error();
 paint(d);
}catch{const scope=document.querySelector('.visit-scope');if(scope&&!latest)scope.textContent='统计暂不可用';}}
function navigate(){mount();const route=location.pathname+location.search+location.hash;if(route===last)return;last=route;pending=pending.then(()=>request(true));}
addEventListener('hashchange',navigate);navigate();
// Reading totals never generates another pageview; avoid counting tab switches.
addEventListener('visibilitychange',()=>{if(!document.hidden)pending=pending.then(()=>request(false))});
})();
