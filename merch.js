/* Local editorial objects. Illustrations are labels, never counterfeit outputs. */
(()=>{
const assetRoot=document.querySelector('#app')?'../':'';
const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const motifs={visual:['视觉','一眼，留下来。','海报折页'],writing:['写作','这句话，我来写。','歌词内页'],knowledge:['研究','先别急着下结论。','注解册'],building:['构建','想要的，自己做。','后台通行证'],personal:['个人','偏爱，有回声。','收藏唱片']};
const hooks={ 'interface-system':['工具天天用，为什么不能长成我喜欢的样子？','换肤'], 'perspective-distillation':['换一道没见过的题，还能认出这个人的判断吗？','判断'],inkpanda:['写到后面，前面的伏笔谁来记？','长篇'], 'daily-insight':['读完以后，我究竟留下了什么？','洞见'],'loki-health':['记录自己的身体，也得守住自己的隐私。','节律'],'loki-ebook-converter':['我只想转一本书，不想先学会一个复杂工具。','转换'],lian:['喜欢的歌，能不能在刚好的时候回你一句？','偏爱'],'qichi-life-os':['不想靠意志力坚持的事，怎么让它每天发生？','复盘'],'edu-content-line':['一门课的讲法，能不能搬进另一门课？','骨架'],'ai-career-compass':['不贩卖焦虑，只回答下一步做什么。','行动'],'loki-assistant':['记忆怎么存、存成什么样，我想自己说了算。','助手']};
function readingArt(){return '<div class="reading-art" role="img" aria-label="每日洞见阅读方法示意，非成果截图"><span>每天留下一点</span><b>冲突<br>边界<br><i>问题</i></b><small>阅读方法示意 / 非运行成果</small></div>'}
const fanPhotos={
 bibi:['bibi-2005.jpg','周笔畅 · 2005 超女杭州巡演','https://ent.sina.com.cn/y/p/2005-10-23/1222873195.html'],
 chris:['chris-2005.jpg','李宇春 · 2005 超女北京巡演','https://ent.sina.com.cn/y/2005-10-10/0050860527.html'],
 wanqian:['wanqian-stage.jpg','万茜 · 浪姐第一季舞台照','https://wenhui.whb.cn/zhuzhan/yingshi/20200825/367617.html'],
 liulian:['liulian-white-glasses.jpg','刘恋 · 白西装与金丝眼镜','https://www.duitang.com/blog/?id=1410340191'],
 chenhaoyu:['chenhaoyu-stage.jpg','陈昊宇 · 乘风2024舞台照','https://www.tkww.hk/epaper/view/newsDetail/1808923872091836416.html'],
 heyan:['heyan-poster.jpg','周也 饰 禾晏 · 锦月如歌','https://www.sohu.com/a/919055985_120853688'],
 gusheng:['gusheng-poster.jpg','周也 饰 顾声 · 很想很想你','https://gs.ifeng.com/c/8VEhNnQZjTX'],
 yanhui:['yanhui-still.jpg','周也 饰 雁回 · 护心','https://cj.sina.com.cn/articles/view/5522810625/p1492f6701027016qmq'],
 yue:['yueqianling-poster.jpg','周也 饰 岳千灵 · 别对我动心','https://x.com/SimplyZhouYezi/status/1761915580297408920']
};
function photoPocket(node,kind){
 node.classList.add('with-real-photos');
 const imageFor=(key)=>{const img=document.createElement('img');img.className='fan-real-photo';img.src=assetRoot+'assets/'+fanPhotos[key][0];img.alt=fanPhotos[key][1];return img};
 const credit=document.createElement('div');credit.className='fan-photo-credit';
 const update=(key)=>{const v=fanPhotos[key];credit.innerHTML='<span>'+esc(v[1])+'</span><a href="assets/'+esc(v[0])+'" target="_blank" rel="noopener">查看完整图片 ↗</a><a href="'+esc(v[2])+'" target="_blank" rel="noopener">图片出处 ↗</a>'};
 if(kind==='supergirl'){
  node.querySelectorAll('[data-fan-choice]').forEach(b=>{const key=b.dataset.artist;b.prepend(imageFor(key));b.querySelector('i').remove();b.querySelector('small').textContent='选这一张 ↗';b.addEventListener('click',()=>update(key))});update('bibi');
 }else if(kind==='sisters'){
  const stage=node.querySelector('.season-stage'),keys=['wanqian','liulian','chenhaoyu'];stage.prepend(imageFor(keys[0]));stage.querySelector('.stage-beam').remove();stage.querySelector('small').remove();
  node.querySelectorAll('.season-tabs button').forEach((b,i)=>b.addEventListener('click',()=>{const v=fanPhotos[keys[i]],img=stage.querySelector('img');img.src=assetRoot+'assets/'+v[0];img.alt=v[1];update(keys[i])}));update(keys[0]);
 }else{
  const front=node.querySelector('.character-front'),keys=['heyan','gusheng','yanhui','yue'];front.prepend(imageFor(keys[0]));front.querySelector('em').style.display='none';
  node.querySelectorAll('[data-character]').forEach((b,i)=>b.addEventListener('click',()=>{const v=fanPhotos[keys[i]],img=front.querySelector('img');img.src=assetRoot+'assets/'+v[0];img.alt=v[1];update(keys[i])}));update(keys[0]);
  node.querySelector('.role-note').textContent='这一页，留给喜欢的角色。';
 }
 node.append(credit);
}
function pocket(kind){
 const node=$('#'+kind);if(!node)return;node.querySelectorAll(':scope>:not(.pocket-close)').forEach(x=>x.remove());node.classList.remove('record-pocket');node.classList.add('fan-object',kind+'-object');
 if(kind==='supergirl'){
  node.innerHTML+='<small>LOKI / 这份偏爱从 05 超女说起</small><h3><em>05</em> 超女</h3><div class="duo-passes"><button data-fan-choice data-artist="bibi" aria-pressed="true"><span>周笔畅</span><i aria-hidden="true">B</i><small>翻开这一面 ↗</small></button><button data-fan-choice data-artist="chris" aria-pressed="false"><span>李宇春</span><i aria-hidden="true">C</i><small>翻开这一面 ↗</small></button></div><div class="fan-stamp"><img src="assets/panda-audience-card-v2.png" alt="Loki 小熊猫举着粉色票根和冰美式的原创插画"><div><small>这枚票签，留给</small><p class="record-caption" aria-live="polite">周笔畅</p><b class="kept-stamp">我的偏爱</b></div></div>';
  node.querySelectorAll('[data-fan-choice]').forEach(b=>b.onclick=()=>{node.querySelectorAll('[data-fan-choice]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));node.querySelector('.record-caption').textContent=b.querySelector('span').textContent;celebrate(node.querySelector('.fan-stamp'))});
 }else if(kind==='sisters'){
  node.innerHTML+='<small>LOKI / 浪姐里的三份偏爱</small><h3>乘风，各有一面。</h3><div class="season-tabs" aria-label="选择浪姐季数"><button aria-pressed="true" data-season="0">第一季</button><button aria-pressed="false" data-season="1">第三季</button><button aria-pressed="false" data-season="2">第五季</button></div><div class="season-stage" data-season="0"><span class="stage-season">01</span><div class="stage-beam"></div><strong aria-live="polite">万茜</strong><span class="season-program">乘风破浪的姐姐 · 第一季</span><small>我喜欢的她 / 非观演记录</small></div><p class="season-list">第一季 · 万茜　/　第三季 · 刘恋　/　第五季 · 陈昊宇</p>';
  const seasons=[['01','万茜','乘风破浪的姐姐 · 第一季'],['03','刘恋','乘风破浪的姐姐 · 第三季'],['05','陈昊宇','乘风2024 · 第五季']];
  node.querySelectorAll('[data-season]').forEach(b=>{if(b.tagName!=='BUTTON')return;b.onclick=()=>{const n=Number(b.dataset.season),v=seasons[n];node.querySelectorAll('.season-tabs button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));const stage=node.querySelector('.season-stage');stage.dataset.season=n;stage.querySelector('strong').textContent=v[1];stage.querySelector('.stage-season').textContent=v[0];stage.querySelector('.season-program').textContent=v[2];celebrate(stage)}});
 }else{
  node.innerHTML+='<small>LOKI / 最近的一点偏心</small><h3>周也，角色收藏夹。</h3><div class="role-bookmarks" aria-label="选择周也角色"><button data-character="0" aria-pressed="true">禾晏</button><button data-character="1" aria-pressed="false">顾声</button><button data-character="2" aria-pressed="false">雁回</button><button data-character="3" aria-pressed="false">岳千灵</button></div><button class="character-card" data-role="0" aria-expanded="false"><span class="character-front"><small>01 / 锦月如歌</small><strong>禾晏</strong><em aria-hidden="true">锦</em><span>翻到背面 ↗</span></span><span class="character-back" hidden><small>我感兴趣的荧幕角色</small><strong>禾晏</strong><span>周也 饰 · 《锦月如歌》</span><small>收回书签 ↶</small></span></button><p class="role-note">四个角色，四枚书签。<br>这是我的角色收藏，不是剧情评分。</p>';
  const roles=[['禾晏','锦月如歌','锦'],['顾声','很想很想你','声'],['雁回','护心','心'],['岳千灵','别对我动心','灵']];const card=node.querySelector('.character-card');function select(n){const v=roles[n];card.dataset.role=n;card.setAttribute('aria-expanded','false');card.querySelector('.character-front').hidden=false;card.querySelector('.character-back').hidden=true;card.querySelector('.character-front>small').textContent=String(n+1).padStart(2,'0')+' / '+v[1];card.querySelectorAll('strong').forEach(e=>e.textContent=v[0]);card.querySelector('em').textContent=v[2];card.querySelector('.character-back>span').textContent='周也 饰 · 《'+v[1]+'》';celebrate(card)}
  node.querySelectorAll('[data-character]').forEach(b=>b.onclick=()=>{node.querySelectorAll('[data-character]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));select(Number(b.dataset.character))});card.onclick=()=>{const on=card.getAttribute('aria-expanded')!=='true';card.setAttribute('aria-expanded',String(on));card.querySelector('.character-front').hidden=on;card.querySelector('.character-back').hidden=!on;celebrate(card)};
 }
 photoPocket(node,kind);
 window.lokiFanLetters?.(node,kind,assetRoot);
}
function celebrate(el){el.classList.remove('object-awake');void el.getBoundingClientRect();el.classList.add('object-awake')}
function stamp(kind){const node=document.createElement('span');node.className='corner-surprise';
const skill=bookData.skills.find(s=>'#skill-'+s.id===location.hash);
const squash=kind==='squash'||(!kind&&skill?.category==='building'),tea=kind==='tea'||(!kind&&skill?.category==='writing');
const court='<span class="squash-court" role="img" aria-label="戴橙色护目镜的小熊猫，在薄荷色壁球场挥拍"><img class="squash-frames" src="assets/panda-squash-frames.png" alt="" decoding="async"><i class="squash-ball" aria-hidden="true"></i><i class="squash-impact" aria-hidden="true"></i></span>';
const teaArt='<span class="mini-tea" aria-hidden="true"><i></i><b class="tea-leaf leaf-one"></b><b class="tea-leaf leaf-two"></b><b class="tea-leaf leaf-three"></b><em></em></span>';
const stageArt='<svg class="concert-mini" viewBox="0 0 240 130" aria-hidden="true"><defs><linearGradient id="concert-light" x2="0" y2="1"><stop stop-color="#fa80b7" stop-opacity=".8"/><stop offset="1" stop-color="#fa80b7" stop-opacity="0"/></linearGradient></defs><path d="M15 16H225" stroke="#b6bdcf"/><path d="M48 20L18 110H168Z" fill="url(#concert-light)"/><path d="M189 20L80 110H229Z" fill="#66d2e92b"/><g fill="#f7e8ea"><rect x="37" y="12" width="19" height="12" rx="3"/><rect x="181" y="12" width="19" height="12" rx="3"/></g><path d="M30 105H213" stroke="#fb72aa" stroke-width="3"/><g fill="#83dce9"><circle cx="72" cy="108" r="6"/><circle cx="108" cy="110" r="6"/><circle cx="154" cy="108" r="6"/><path d="M63 130V117Q72 111 81 117V130M99 130V118Q108 113 117 118V130M145 130V116Q154 112 163 116V130"/></g></svg>';
node.innerHTML=`<button class="wristband" aria-expanded="false">${squash?'↗ 壁球菜鸟':tea?'♧ 夹一枚茶签':'♫ 台下的我'}</button><span class="wristband-reveal ${squash?'squash-pocket':tea?'tea-pocket':'concert-pocket'}" hidden><small class="object-serial">LOKI / ${squash?'下班换一拍':tea?'随身茶签':'观众这一面'}</small>${squash?'<b>接住，再回一拍。</b>'+court+'<button class="squash-shot">回一拍 ↗</button><small class="squash-result" aria-live="polite">壁球页角小游戏。</small>':tea?'<b>这一杯，慢慢品。</b>'+teaArt+'<button class="tea-steep">泡一杯乌龙茶</button><small>冰美式续命。品茶是爱好。</small>':'<b>演唱会 / Livehouse</b>'+stageArt+'<small>台下的时间，也很重要。</small>'}<a href="#break">去中场休息 ↗</a></span>`;
node.querySelector('.wristband').onclick=e=>{const b=e.currentTarget,on=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(on));node.querySelector('.wristband-reveal').hidden=!on};
node.querySelector('.squash-shot')?.addEventListener('click',()=>{const court=node.querySelector('.squash-court');court.classList.remove('playing');void court.getBoundingClientRect();court.classList.add('playing');node.querySelector('.squash-result').textContent='碰到前墙，再弹回来。';});
node.querySelector('.tea-steep')?.addEventListener('click',e=>{const cup=node.querySelector('.mini-tea');cup.classList.toggle('steeped');e.currentTarget.textContent=cup.classList.contains('steeped')?'倒空，再泡一杯 ↶':'泡一杯乌龙茶'});return node}
function makeSkill(s){const insert=$('#insert');if(insert.querySelector('.merch-jacket'))return;const [name,headline,object]=motifs[s.category];const stage=insert.querySelector('.detail-stage'),photo=stage?.querySelector('figure');
const jacket=document.createElement('div');jacket.className='merch-jacket '+s.category;jacket.innerHTML=`<div class="jacket-graphic"><span class="edition-stamp">LOKI / ${object}</span><strong>${name}</strong><i aria-hidden="true">${{visual:'✳',writing:'”',knowledge:'?',building:'↗',personal:'◎'}[s.category]}</i><span class="jacket-hook">${headline}</span><small>方法封套 / 非生成成果</small></div><div class="jacket-side"><span class="jacket-number">${String(bookData.skills.indexOf(s)+1).padStart(2,'0')}<small>/ 22</small></span><p>${esc(s.summary)}</p><button class="pull-leaf" aria-expanded="false" aria-controls="method-leaf">${{visual:'展开海报背页',writing:'抽出写作内页',knowledge:'打开注解册',building:'翻看制作说明',personal:'抽出唱片内页'}[s.category]} <b>↗</b></button></div>`;
const short={'film-poster':'字报','loki-social':'卡片','visual-directions':'多面','cover-system':'封面','image-kit':'造图','slides':'开讲','loki-writing':'语气','weixin-outline':'选题','deep-night':'深夜','weixin-layout':'排版','headline':'标题','feishu-weixin':'发稿','book':'拆书','notes':'批注','judgment':'判断','debate':'分歧','self-mirror':'镜像','ai-radar':'雷达','codex-theme':'换肤','hatch-pet':'宠物','skill-builder':'蒸馏','prompt-spec':'说清','ebook-workflow':'转书','cyber-red-panda':'小熊猫','lian-curation':'上上签','collage-poem':'拼贴诗'};
jacket.dataset.skill=s.id;jacket.querySelector('.jacket-graphic>strong').textContent=short[s.id]||name;jacket.querySelector('.jacket-hook').textContent=bookData.flows[s.id][2];
const top=insert.querySelector('.insert-top');top.querySelector('p').hidden=true;top.after(jacket);
const leaf=document.createElement('section');leaf.id='method-leaf';leaf.className='method-leaf';leaf.hidden=true;
// Existing evidence, caveats and links are retained verbatim inside the insert.
let next=jacket.nextElementSibling;while(next){const following=next.nextElementSibling;if(!next.matches('.github-pass,.method-turn'))leaf.append(next);next=following}jacket.after(leaf);
if(photo&&s.category==='visual'){const graphic=jacket.querySelector('.jacket-graphic');graphic.classList.add('with-image');graphic.replaceChildren(photo);const tag=document.createElement('small');tag.textContent='收录展示 / 点击查看完整图片';graphic.append(tag)}
const pass=insert.querySelector('.github-pass');if(pass)jacket.querySelector('.jacket-side').append(pass);
const leafHeader=document.createElement('header');leafHeader.className='insert-running-head';leafHeader.innerHTML=`<span>制作侧 / ${esc(s.title)}</span><b>${String(bookData.skills.indexOf(s)+1).padStart(2,'0')}</b>`;leaf.prepend(leafHeader);
const workflow=leaf.querySelector('.cue-sheet');if(workflow){workflow.querySelector('small').textContent='使用路线';workflow.querySelectorAll('li').forEach((li,i)=>{const no=document.createElement('em');no.className='route-number';no.textContent=String(i+1).padStart(2,'0');li.prepend(no)})}
const result=leaf.querySelector('.result-note');if(result){const strip=document.createElement('section');strip.className='takeaway-slip';strip.innerHTML='<h3>实际留下什么</h3>';result.before(strip);strip.append(result)}
const boundary=document.createElement('details');boundary.className='evidence-envelope';boundary.innerHTML='<summary>来源与使用边界 <span>＋</span></summary>';leaf.querySelectorAll(':scope>.boundary').forEach(p=>boundary.append(p));if(boundary.children.length>1)leaf.append(boundary);
const close=document.createElement('button');close.className='close-leaf';close.textContent='收好这一页 ↑';leaf.append(close);close.onclick=()=>{jacket.querySelector('.pull-leaf').click();jacket.querySelector('.pull-leaf').focus()};
jacket.querySelector('.pull-leaf').onclick=e=>{const b=e.currentTarget,on=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(on));leaf.hidden=!on;insert.classList.toggle('leaf-out',on)};
insert.querySelector('.method-turn')?.before(stamp());
}
function draw(){const r=location.hash.slice(1);const skill=bookData.skills.find(s=>'skill-'+s.id===r);if(skill)makeSkill(skill);
const p=bookData.projects.find(p=>'project-'+p.id===r);if(p){const page=$('#works-page'),h=page.querySelector('.project-heading');const hook=document.createElement('p');hook.className='audience-question';hook.textContent=hooks[p.id][0];h.before(hook);if(p.id==='daily-insight'){const figure=page.querySelector('.case-display figure');figure.outerHTML=readingArt()}
const details=document.createElement('details');details.className='production-notes';details.innerHTML='<summary>翻到背面 · 制作记录与公开边界 <span>＋</span></summary>';for(const el of [...page.children]){if(el.matches('.case-evidence,.status-slip,.related-methods,.link-station'))details.append(el)}page.querySelector('.leaf-nav').before(details,stamp());}
if(r==='works'){document.querySelectorAll('.show-bill').forEach((a,i)=>{const p=bookData.projects[i];if(p.id==='daily-insight')a.querySelector('.bill-picture').innerHTML=readingArt();const note=document.createElement('p');note.className='bill-invitation';note.textContent=hooks[p.id][0];a.querySelector('.bill-caption').after(note)});pocket('sisters')}
pocket('supergirl');pocket('favorites');
document.querySelectorAll('[popovertarget="favorites"]:not(.pocket-close)').forEach(b=>b.textContent='周也 / 角色收藏 ＋');
document.querySelectorAll('.concert-pocket').forEach(box=>{const art=box.querySelector('.concert-mini');if(art){const button=document.createElement('button');button.className='panda-ticket';button.setAttribute('aria-label','让小熊猫举起票根');button.innerHTML='<img src="assets/panda-audience-card-v2.png" alt="Loki 小熊猫拿着冰美式举票"><span>点一下，举起偏爱 ↗</span>';button.onclick=()=>{celebrate(button);button.querySelector('span').textContent='这一枚，留给现场。'};art.replaceWith(button)}});
}
window.lokiPocketLegacy={pocket,stamp,celebrate};
if(!document.querySelector('#app')){window.addEventListener('hashchange',draw);draw();}
})();
