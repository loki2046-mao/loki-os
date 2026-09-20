/* Shared publication shell and physical print details. Content stays in public-data. */
(() => {
 document.body.classList.add('loki-publication','reading-publication');
 document.querySelector('body>header').outerHTML=`<header class="site-masthead"><a class="site-wordmark" href="../index.html#cover" aria-label="Loki 场刊首页">LOKI<span>个人场刊</span></a><nav aria-label="主导航"><a href="../index.html#about">认识 Loki</a><a href="#catalogue/works">作品节目单</a><a href="#catalogue/visual">制作手册</a><a href="../index.html#break">中场休息</a></nav><button class="contact-stub" id="reading-contact">找到我 ↗</button></header>`;
 const contact=document.createElement('dialog');contact.className='publication-contact';contact.innerHTML='<button aria-label="关闭公众号卡">关闭 ×</button><h2>赛博小熊猫 Loki</h2><img src="../assets/loki-wechat-official.jpg" alt="赛博小熊猫 Loki 公众号二维码"><p>用微信扫一扫，在公众号接着聊。</p><a class="out" href="../assets/loki-wechat-official.jpg" download="赛博小熊猫Loki-公众号.jpg">保存二维码 ↓</a>';document.body.append(contact);
 document.querySelector('#reading-contact').onclick=()=>contact.showModal();contact.querySelector('button').onclick=()=>contact.close();contact.onclick=e=>{if(e.target===contact)contact.close()};
 const home='../index.html#cover';
 function dress(){
  const hash=location.hash;
  if(!hash||hash==='#index'){location.replace('../index.html#cover');return;}
  const isWorks=hash.startsWith('#catalogue/works')||hash==='#ink';
  document.title=isWorks?'Loki · 作品节目单':'Loki · 制作手册';
  document.querySelectorAll('.site-masthead nav a').forEach(a=>{
   const active=isWorks?a.hash==='#catalogue/works':a.hash==='#catalogue/visual';
   if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
  });
  const mast=document.querySelector('.directory-masthead');
  if(mast){
   mast.classList.add('print-masthead');
   mast.insertAdjacentHTML('beforeend',`<figure class="masthead-object"><img src="../assets/${isWorks?'loki-ticket-welcome.webp':'loki-method-volumes.webp'}" alt="${isWorks?'Loki 举起票根，欢迎翻看作品':'五本彩色制作手册与夹在其中的书签'}"><figcaption>${isWorks?'想法做出来了，就写在我手上这张票根上。':'平时顺手的方法，装订成了这五册。'}</figcaption></figure>`);
   const title=mast.querySelector('h1');
   title.innerHTML=isWorks?'作品<span>节目单</span>':'制作<span>手册</span>';
  }
  const route=document.querySelector('.route');
  if(route){const a=route.querySelector('a');a.href=home;a.textContent='← 合上场刊';
   if(!mast){const back=hash==='#ink'?'#catalogue/works/inkpanda':hash==='#build'?'#catalogue/building/ebook-workflow':'#catalogue/visual/visual-directions';a.href=back;a.textContent='← 收回内页 · 返回目录';}
  }
  document.querySelectorAll('.lineup-link').forEach((a,i)=>{
   a.style.setProperty('--ticket-color',['#42d6ec','#ff86b8','#dafa3a'][i%3]);
   const title=a.querySelector('.act-title');
   if(title)title.insertAdjacentHTML('beforeend',`<span class="ticket-micro" aria-hidden="true">LOKI / ${String(i+1).padStart(2,'0')} <i></i> OPEN THIS IDEA</span>`);
  });
  document.querySelectorAll('.volume-cover').forEach(a=>{
   a.insertAdjacentHTML('beforeend','<span class="binding-holes" aria-hidden="true"></span>');
  });
  const parts=hash.slice(1).split('/');
  const selected=parts[1]==='works'?projects.find(p=>p.id===parts[2]):skills.find(p=>p.id===parts[2]);
  const panel=document.querySelector('.directory-insert');
  if(selected&&panel&&!panel.querySelector('.perspective-story')){
   const profile=d.profiles[selected.id],flow=d.flows[selected.id];
   const section=document.createElement('section');section.className='making-notes';
   if(parts[1]==='works'&&selected.systemEvidence?.length){
    section.innerHTML='<div class="making-notes-title"><span>THE MAKING OF</span><h3>这件作品，我自己是这么做的。</h3></div><div class="making-evidence">'+selected.systemEvidence.map(e=>'<article><h4>'+esc(e.label)+'</h4><p>'+esc(e.value)+'</p></article>').join('')+'</div>';
   }else if(flow){
    section.innerHTML='<div class="making-notes-title"><span>METHOD / 工作路径</span><h3>从哪一步下手，最后带走什么。</h3></div><ol class="method-path">'+flow.map((v,i)=>'<li><span>0'+(i+1)+' / '+['输入','判断与处理','带走'][i]+'</span><b>'+esc(v)+'</b></li>').join('')+'</ol>'+(profile?'<div class="making-evidence"><article><h4>什么时候会用</h4><p>'+esc(profile.trigger)+'</p></article><article><h4>我会把关什么</h4><p>'+esc(profile.judgment)+'</p></article></div>':'');
    panel.querySelector('.no-sample')?.remove();
   }
   if(section.innerHTML)panel.querySelector('.detail-summary').after(section);
  }
  const sampleLink=document.querySelector('.directory-insert .out[href="#ink"],.directory-insert .out[href="#visual"],.directory-insert .out[href="#build"]');
  if(sampleLink)sampleLink.firstChild.textContent='打开完整内页 ';
  const intro=document.querySelector('.backstage-copy');
  if(intro&&!intro.querySelector('.case-pass'))intro.insertAdjacentHTML('afterbegin','<div class="case-pass" aria-hidden="true">LOKI <span>BACKSTAGE / 02</span></div>');
  if(!document.querySelector('.publication-footer')){
   document.querySelector('#app').insertAdjacentHTML('beforeend',`<footer class="publication-footer"><span class="footer-signature">LOKI</span><div><b>散场了，我手头还有想做的。</b><p>作品和方法都摆在这儿，下次接着聊。</p></div><a href="../index.html#break">中场歇一会儿 ↗</a><a href="../index.html#about">认识 Loki ↗</a></footer>`);
  }
 }
 addEventListener('hashchange',dress);dress();
})();
