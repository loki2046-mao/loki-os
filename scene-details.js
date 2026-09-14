(() => {
const $=s=>document.querySelector(s),cover=$('#cover'),cue=$('.light-cue'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
cover.insertAdjacentHTML('beforeend','<div class="rig" aria-hidden="true"><i class="beam left"></i><i class="beam right"></i><i class="footlights"></i></div>');
let timer;function stop(){clearTimeout(timer);cover.classList.remove('flash','showtime');cue.disabled=false;cue.removeAttribute('aria-busy');cue.textContent='再亮一次灯 ↗'}
cue.onclick=()=>{stop();void cover.offsetWidth;cover.classList.add('showtime');cue.disabled=true;cue.setAttribute('aria-busy','true');cue.textContent=reduce.matches?'灯光就位 ✓':'开场灯序中…';$('#live-feedback').textContent=reduce.matches?'灯光就位，已减少动态效果。':'侧灯亮起，聚光交汇。今晚的主角是 Loki。';timer=setTimeout(()=>{stop();$('#live-feedback').textContent='灯光收回。现在，可以入场了。'},reduce.matches?800:3200)};
window.addEventListener('hashchange',stop);
const page=$('.right-page');function drink(){page.dataset.drink=document.querySelector('[data-drink][aria-pressed="true"]').dataset.drink}document.querySelectorAll('[data-drink]').forEach(b=>b.addEventListener('click',drink));drink();
$('#cup-button').insertAdjacentHTML('beforebegin','<div class="drink-props" aria-hidden="true"><i></i><i></i><i></i><span></span></div>');
const motifs={'interface-system':['换一套界面','surface / accent','swatches'],'perspective-distillation':['回到证据','来源 → 判断 → 留出题','evidence'],inkpanda:['前情别丢','人物 / 伏笔 / 时间线','chapter'],'daily-insight':['今天先留一件事','冲突 / 边界 / 问题','reading'],'loki-health':['记录身体的节律','脱敏界面 / 本地优先','rhythm'],'loki-ebook-converter':['换个格式，继续读','EPUB → MOBI → PDF','spines'],lian:['把喜欢，夹进卡片','歌词答案书 / 历史成品','sleeve']};
function decorate(){const route=location.hash.slice(1);page.dataset.scene=route.split('-')[0];document.querySelectorAll('.show-bill').forEach((a,i)=>{const p=bookData.projects[i],m=motifs[p.id];a.dataset.motif=m[2];if(!a.querySelector('.bill-note'))a.insertAdjacentHTML('beforeend',`<div class="bill-note"><b>${m[0]}</b><span>${m[1]}</span></div>`)});const p=bookData.projects.find(p=>'project-'+p.id===route);if(p){page.dataset.work=p.id;const h=$('.project-heading');if(!h.querySelector('.case-cue'))h.insertAdjacentHTML('afterbegin',`<div class="case-cue" data-motif="${motifs[p.id][2]}">${motifs[p.id][0]}</div>`)}else delete page.dataset.work;}
window.addEventListener('hashchange',decorate);decorate();
})();
