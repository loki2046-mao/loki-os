/* One local publication: the existing cover and the refined reading pages. */
(() => {
 const detail='detail-study/index.html';
 const target = hash => {
  if(hash==='works')return '#catalogue/works';
  if(hash.startsWith('project-'))return '#catalogue/works/'+hash.slice(8);
  if(hash==='skills')return '#catalogue/visual';
  if(hash.startsWith('skills-'))return '#catalogue/'+hash.slice(7);
  if(hash.startsWith('skill-')){const id=hash.slice(6),skill=bookData.skills.find(s=>s.id===id);if(skill)return '#catalogue/'+skill.category+'/'+id;}
  return null;
 };
 document.body.classList.add('loki-publication');
 document.querySelector('body>header').outerHTML=`<header class="site-masthead"><a class="site-wordmark" href="#cover" aria-label="Loki 场刊首页">LOKI<span>个人场刊</span></a><nav aria-label="主导航"><a href="about.html">认识 Loki</a><a href="${detail}#catalogue/works">作品节目单</a><a href="${detail}#catalogue/visual">制作手册</a><a href="/notes/">阅读档案</a><a href="#break">中场休息</a></nav><button class="contact-stub" data-wechat>找到我 ↗</button></header>`;
 const cover=document.querySelector('#cover');
 document.querySelector('#open-book').onclick=()=>document.querySelector('#home-discovery').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 document.querySelectorAll('[data-story-target]').forEach(button=>button.onclick=()=>document.getElementById(button.dataset.storyTarget).scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
 function connect(){
  const route=location.hash.slice(1),next=target(route);
  const discovery=document.querySelector('#home-discovery');if(discovery)discovery.hidden=!!route&&route!=='cover';
  if(next){location.replace(detail+next);return;}
  document.querySelectorAll('a[href^="#"]').forEach(a=>{const next=target(a.hash.slice(1));if(next)a.href=detail+next;});
  document.querySelectorAll('.site-masthead nav a').forEach(a=>{if(a.hash==='#'+route)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 }
 addEventListener('hashchange',connect);connect();
})();
