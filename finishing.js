/* Small reading objects, not a second navigation system. */
(() => {
const $=s=>document.querySelector(s);
const stamps=$('.personal-stamps');
const roles=[
{id:'writer',title:'AI 内容创作',eyebrow:'撰稿人卡',icon:'Aa',color:'pink',body:`<span class="object-kicker">撰稿人 / 赛博小熊猫 Loki</span><h3>写下来，<br>也做出来。</h3><p>公众号「赛博小熊猫 Loki」主理人。写 AI，也把写作里反复遇到的问题做成方法。</p><div class="role-routes"><a href="#skills-writing">翻开写作方法 <span>6 个条目 →</span></a><button data-wechat>看看公众号 <span>展开二维码 ⤢</span></button></div><small>这里接回公众号本身，不跳转旧内容站。</small>`},
{id:'coder',title:'Vibe coder',eyebrow:'制作通行证',icon:'↗',color:'blue',body:`<span class="object-kicker">制作中 / 想法需要一个落点</span><h3>从「想要」，<br>到能打开。</h3><p>做 AI 产品、写小工具、把常用方法留成 Skill。作品节目单里，可以看到实际界面和当前进展。</p><div class="pass-strip">LOKI <span>想法 → 制作 → 检查</span></div><div class="role-routes"><a href="#works">看七件作品 <span>翻到节目单 →</span></a><a href="https://github.com/loki2046-mao" target="_blank" rel="noopener">Loki 的 GitHub <span>个人主页 ↗</span></a><a href="#skills-building">构建方法 <span>5 个条目 →</span></a></div>`},
{id:'audience',title:'线下演出爱好者',eyebrow:'观众票根',icon:'♫',color:'lime',body:`<span class="object-kicker">观众 / 这一面，先不聊工作</span><h3>喜欢坐在<br>现场的感觉。</h3><div class="show-types"><span>演唱会</span><span>Livehouse</span><span>话剧</span><span>舞剧</span><span>音乐剧</span></div><div class="ticket-preferences"><p><b>05 超女</b><span>周笔畅 · 李宇春</span></p><p><b>乘风破浪的姐姐</b><span>第一季 · 万茜<br>第三季 · 刘恋<br>第五季 · 陈昊宇</span></p><p><b>最近的偏爱</b><span>周也</span></p></div><div class="role-routes"><a href="#project-lian">喜欢也可以做成作品 <span>恋之上上签 →</span></a><a href="#break">中场喝点什么 <span>咖啡 / 茶 →</span></a></div>`}
];
for(const s of [...stamps.children].slice(0,3))s.remove();
stamps.insertAdjacentHTML('afterbegin',roles.map(r=>`<button class="identity-chip ${r.color}" popovertarget="role-${r.id}"><span class="chip-symbol" aria-hidden="true">${r.icon}</span><span><small>${r.eyebrow}</small><b>${r.title}</b></span><span aria-hidden="true">＋</span></button><article id="role-${r.id}" class="role-object ${r.color}" popover><button class="pocket-close" popovertarget="role-${r.id}" popovertargetaction="hide" aria-label="收回${r.eyebrow}">×</button>${r.body}</article>`).join(''));
const qr=document.createElement('dialog');qr.id='wechat-view';qr.innerHTML='<button class="return" id="close-wechat">收回公众号卡 ×</button><h2>赛博小熊猫 Loki</h2><img src="assets/loki-wechat-official.jpg" alt="赛博小熊猫 Loki 公众号二维码"><p>用微信扫一扫，或保存图片后在微信中识别。</p><a href="assets/loki-wechat-official.jpg" download="赛博小熊猫Loki-公众号.jpg">保存二维码 ↓</a>';document.body.append(qr);$('#close-wechat').onclick=()=>qr.close();qr.onclick=e=>{if(e.target===qr)qr.close()};document.addEventListener('click',e=>{if(e.target.closest('[data-wechat]'))qr.showModal()});
const kindName={source:'Skill 源码',related:'相关项目',profile:'个人主页'};
function decorate(){
 const route=location.hash.slice(1);const project=bookData.projects.find(p=>'project-'+p.id===route);
 if(project){const page=$('#works-page');page.dataset.project=project.id;const url=new URL(project.href,'https://loki-os.hiloki.ai/').href;const container=document.createElement('section');container.className='link-station';container.innerHTML=`<small>继续往里看 / 快速入口</small><a href="${url}" target="_blank" rel="noopener"><b>完整案例与更多记录</b><span>原站案例页 ↗</span></a>`;page.querySelector('.leaf-nav').before(container);}
 if(project){
  const page=$('#works-page'),figure=page.querySelector(':scope>figure'),proof=page.querySelector('.proof');
  const display=document.createElement('div');display.className='case-display';page.querySelector('.project-heading').after(display);
  if(figure)display.append(figure);if(proof){const note=document.createElement('aside');note.className='case-margin';const label=document.createElement('b');label.textContent='做到这里';note.append(label,proof);display.append(note)}
  const method=page.querySelector('.method');if(method){method.classList.add('case-evidence');for(const section of method.children){const fold=document.createElement('details');const title=document.createElement('summary');title.textContent=section.querySelector('b').textContent;fold.append(title,section.querySelector('p'));section.replaceChildren(fold)}}
 }
 const skill=bookData.skills.find(s=>'skill-'+s.id===route || route==='card-loki-social'&&s.id==='loki-social');
 if(skill){const insert=$('#insert');insert.dataset.category=skill.category;const gh=bookData.github[skill.id];const source=insert.querySelector('.source');if(source){source.classList.add('github-pass');source.dataset.kind=gh?.kind||'profile';source.querySelector('span').textContent=(kindName[gh?.kind||'profile'])+' ↗';}
// Each field has its own reading object; no simulated run buttons.
const figure=insert.querySelector(':scope>figure'), cue=insert.querySelector('.cue-sheet'), method=insert.querySelector('.method');
const stage=document.createElement('div');stage.className='detail-stage';insert.querySelector('.insert-top').after(stage);
if(skill.category==='visual'){
  if(figure)stage.append(figure);const rail=document.createElement('aside');rail.className='annotation-rail';if(cue)rail.append(cue);if(method)rail.append(method);stage.append(rail);
}else if(skill.category==='knowledge'){
  if(cue)stage.append(cue);if(figure)stage.append(figure);
  if(method){for(const section of [...method.children]){const fold=document.createElement('details');fold.className='evidence-fold';const title=document.createElement('summary');title.textContent=section.querySelector('b').textContent;fold.append(title,section.querySelector('p'));stage.append(fold)}method.remove()}
}else if(skill.category==='writing'){
  if(cue)stage.append(cue);if(method){method.classList.add('manuscript-notes');stage.append(method)}if(figure)stage.append(figure);
}else if(skill.category==='building'){
  if(figure)stage.append(figure);if(cue)stage.append(cue);if(method)stage.append(method);
}else{
  if(figure)stage.append(figure);if(method)stage.append(method);if(cue)stage.append(cue);
}
 const siblings=bookData.skills.filter(s=>s.category===skill.category),i=siblings.indexOf(skill);const nav=document.createElement('nav');nav.className='leaf-nav method-turn';nav.setAttribute('aria-label','翻看同领域方法');nav.innerHTML=`<a href="#skills-${skill.category}">收回目录</a><span>${i+1} / ${siblings.length}</span><a href="#skill-${siblings[(i+1)%siblings.length].id}">下一张方法卡 →</a>`;insert.append(nav);
 }
}
window.addEventListener('hashchange',decorate);decorate();
// Native popovers do not close themselves when an in-page link keeps the same hash.
document.addEventListener('click',e=>{if(e.target.closest('a[href^="#"]'))document.querySelectorAll(':popover-open').forEach(p=>p.hidePopover())});
})();
