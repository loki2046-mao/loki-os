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
 document.querySelector('body>header').outerHTML=`<header class="site-masthead"><a class="site-wordmark" href="#cover" aria-label="Loki 场刊首页">LOKI<span>个人场刊</span></a><nav aria-label="主导航"><a href="#about">认识 Loki</a><a href="${detail}#catalogue/works">作品节目单</a><a href="${detail}#catalogue/visual">制作手册</a><a href="#break">中场休息</a></nav><button class="contact-stub" data-wechat>找到我 ↗</button></header>`;
 const cover=document.querySelector('#cover');
 cover.innerHTML=`<div class="cover-copy"><span class="cover-edition">PERSONAL SHOW <b>VOL. 01 / 随身这一册</b></span><p>散场以后，</p><h1>还有想做的事。</h1><strong aria-hidden="true">LOKI</strong><p class="cover-intro">台下看演出，台后做东西。<br>一些做出来的作品，一些用得上的方法，<br>还有那些让生活有意思的喜欢。</p><button id="open-book">入场，翻开场刊 <b>↗</b></button><span class="cover-role">AI 内容创作者 · Vibe coder · 现场爱好者</span></div><figure class="cover-character"><span class="character-caption">台下观众<br>台后制作</span><img src="assets/loki-ticket-welcome.webp" alt="Loki 小熊猫举起粉色票根，拿着冰美式迎接你" width="1024" height="1280"><figcaption><span>GOOD IDEAS</span><b>散场不散好奇心。</b></figcaption></figure><div class="cover-bottom"><span>CONCERT / LIVEHOUSE / THEATRE</span><span>把喜欢的，做成自己的。 ↗</span></div><nav class="cover-exits" aria-label="直接翻阅"><a href="${detail}#catalogue/works"><span class="entry-index">01</span><span><small>SELECTED WORKS</small><b>作品节目单</b><em>十一件作品，正在发生的想法。</em></span><i>↗</i></a><a href="${detail}#catalogue/visual"><span class="entry-index">02</span><span><small>THE MAKING OF</small><b>制作手册</b><em>22 个方法，翻开就能往里看。</em></span><i>↗</i></a><a href="#break"><span class="entry-index">03</span><span><small>INTERMISSION</small><b>中场休息</b><em>冰美式续命，茶慢慢品。</em></span><i>↗</i></a></nav>`;
 document.querySelector('#open-book').onclick=()=>location.hash='about';
 function connect(){
  const route=location.hash.slice(1),next=target(route);
  if(next){location.replace(detail+next);return;}
  document.querySelectorAll('a[href^="#"]').forEach(a=>{const next=target(a.hash.slice(1));if(next)a.href=detail+next;});
  document.querySelectorAll('.site-masthead nav a').forEach(a=>{if(a.hash==='#'+route)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 }
 addEventListener('hashchange',connect);connect();
})();
