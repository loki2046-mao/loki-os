/* Local site wayfinding: each room leads to existing, real content. */
(()=>{
const reading=!!document.querySelector('#app'),root=reading?'../':'',detail=reading?'index.html':'detail-study/index.html',home=root+'index.html',d=window.bookData;
const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rooms=[['about','01','认识 Loki','主舞台',home+'#about'],['works','02','作品节目单','七件作品',detail+'#catalogue/works'],['visual','03','制作手册','五册方法',detail+'#catalogue/visual'],['break','04','中场休息','续杯与票夹',home+'#break'],['personal','05','私人收藏','喜欢的事',detail+'#catalogue/personal']];
// Paths follow the printed top faces in the original 1448 × 1086 artwork.
const outlines={
about:'M 558 451 C 558 423 608 407 666 407 C 728 407 779 425 779 452 C 779 481 728 501 668 501 C 608 501 558 481 558 451 Z',
works:'M 339 415 L 369 403 L 369 393 L 412 380 L 427 386 L 497 366 L 501 429 Q 477 441 500 460 L 500 491 L 395 520 L 339 465 Z',
visual:'M 390 557 L 412 525 L 499 496 L 526 523 L 578 543 L 575 573 L 538 612 L 474 618 L 386 574 Z',
break:'M 622 552 L 710 552 Q 722 600 766 648 L 733 668 L 601 668 L 569 648 Q 611 600 622 552 Z',
personal:'M 839 480 L 944 518 L 944 581 L 877 620 L 849 607 L 799 608 L 759 571 L 756 541 Q 808 526 839 480 Z',
more:'M 847 417 L 889 391 L 900 362 L 1005 401 L 1005 472 L 962 509 L 844 463 Z'
};
const dialog=document.createElement('dialog');dialog.className='venue-dialog';dialog.setAttribute('aria-labelledby','venue-title');dialog.innerHTML=`<div class="venue-top"><div><span>LOKI / FIND YOUR NEXT ROOM</span><h2 id="venue-title">散场地图</h2></div><button class="venue-close" aria-label="关闭场馆地图">×</button></div><p class="venue-intro">不同的门，通向不同的我。挑一处，接着逛。</p><div class="venue-layout"><nav class="venue-floor festival-original" aria-label="场馆分区"><svg class="festival-art" viewBox="190 210 825 560" role="group" aria-label="Loki 音乐节场馆地图"><image class="festival-source" href="${root}assets/reference/loki-festival-map-original.png" width="1448" height="1086"/>${[...rooms,['more','06','更多彩蛋：每日拼贴诗','',detail+'#catalogue/personal/collage-poem']].map(([id,n,title,sub,url])=>`<a class="festival-hotspot hotspot-${id}" data-room="${id}" href="${url}" aria-label="${title}"><title>${title} ↗</title><path d="${outlines[id]}"/></a>`).join('')}</svg></nav><section class="venue-index"><label for="venue-search">直接找作品或方法</label><div class="venue-searchbox"><input id="venue-search" type="search" placeholder="试试：写作、阅读、主题" autocomplete="off"><span aria-hidden="true">⌕</span></div><p class="venue-result-count" role="status"></p><div class="venue-results"></div><button class="venue-surprise" type="button"><span aria-hidden="true">⚄</span><b>不知道逛哪？抽一张入场券</b><small>RANDOM / 下一站</small></button><div class="venue-drawn-ticket" aria-live="polite"></div><p class="map-hint">点击区域跳页；按 Esc 收起地图。</p></section></div>`;document.body.append(dialog);
const all=[...d.projects.filter(x=>x.visibility==='public').map(x=>({...x,room:'works'})),...d.skills.filter(x=>x.visibility==='public').map(x=>({...x,room:x.category}))];
function search(){const q=dialog.querySelector('input').value.trim().toLowerCase(),matches=all.filter(x=>(x.title+' '+x.summary+' '+(x.tags||[]).join(' ')).toLowerCase().includes(q));dialog.querySelector('.venue-result-count').textContent=q?`${matches.length} 个相关入口`:'也可以从这几张内页开始';dialog.querySelector('.venue-results').innerHTML=(q?matches:all.slice(0,4)).map(x=>`<a href="${detail}#catalogue/${x.room}/${x.id}"><span>${e(x.title)}</span><b>↗</b></a>`).join('')||'<p class="venue-empty">这里暂时没有这个词。换个关键词，或从左边的分区进入。</p>'}
dialog.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();dialog.close()}});
let lastDraw='';
dialog.querySelector('.venue-surprise').onclick=()=>{
 const pool=all.filter(x=>x.id!==lastDraw&&x.id!==location.hash.split('/')[2]);
 const pick=pool[Math.floor(Math.random()*pool.length)];if(!pick)return;lastDraw=pick.id;
 dialog.querySelector('.venue-drawn-ticket').innerHTML=`<a href="${detail}#catalogue/${pick.room}/${pick.id}"><small>ADMIT ONE / 给好奇心留个位置</small><b>${e(pick.title)}</b><span>${e(pick.summary)}</span><strong>拿着票，去看看 ↗</strong></a>`;
};
dialog.querySelector('input').addEventListener('input',search);dialog.querySelector('.venue-close').onclick=()=>dialog.close();dialog.addEventListener('click',event=>{if(event.target===dialog||event.target.closest('a'))dialog.close()});
function openMap(){search();dialog.querySelectorAll('[data-room]').forEach(a=>{const current=reading?(location.hash.split('/')[1]||(['#visual','#build'].includes(location.hash)?'visual':'works')):location.hash.slice(1);a.toggleAttribute('data-here',a.dataset.room===current||(a.dataset.room==='visual'&&['writing','knowledge','building'].includes(current)))});dialog.showModal();dialog.querySelector('.venue-close').focus()}
const contact=document.querySelector('.site-masthead .contact-stub');if(contact){const tools=document.createElement('div');tools.className='masthead-tools';contact.before(tools);tools.append(contact);const button=document.createElement('button');button.className='map-trigger';button.innerHTML='<span aria-hidden="true">▧</span> 场馆地图';button.onclick=openMap;tools.prepend(button)}
function dress(){
const footer=document.querySelector('.publication-footer');if(footer&&!footer.querySelector('.encore-scene')){footer.classList.add('encore-footer');footer.insertAdjacentHTML('afterbegin',`<div class="encore-scene"><div><span class="encore-kicker">SAME STAGE / MORE STORIES</span><h2>这一页看完，<br>还有下一场。</h2><p>把做过的事留在这里，<br>也给还没发生的想法留个位置。</p><button class="encore-map">看看下一站 ↗</button></div><div class="goodbye-sticker" aria-hidden="true"></div><span class="encore-tag" aria-hidden="true">SEE YOU<br>NEXT TIME!</span></div>`);footer.querySelector('.encore-map').onclick=openMap}
if(!reading)return;
const sample=document.querySelector('.ink,.visual,.build');if(!sample||sample.querySelector('.full-edition-strip'))return;
const kind=sample.classList.contains('ink')?'ink':sample.classList.contains('visual')?'visual':'build';sample.classList.add('full-edition');sample.dataset.room=kind;
const words={ink:['WRITER’S ROOM','长篇创作 · 正文与前情','把人物带回来，把故事接下去。'],visual:['PRINT ROOM','视觉试印 · 正面与背面','一张样张，两面判断。'],build:['TOOL WORKSHOP','转换工坊 · 输入与带走','简单的入口，完整的制作路径。']}[kind];
sample.insertAdjacentHTML('afterbegin',`<div class="full-edition-strip"><span>${words[0]}</span><b>${words[1]}</b><span>LOKI / OPEN STUDIO</span></div>`);
if(kind==='ink'){const list=sample.querySelector('.scene-list');list.insertAdjacentHTML('afterbegin','<div class="script-binding" aria-hidden="true">✳<br>剧本在这里<br><small>STORY CONTINUES</small></div>');sample.querySelector('.title-row').insertAdjacentHTML('beforeend','<span class="margin-pencil">前情，<br>别落在上一页。↙</span>');sample.querySelector('.screen-area').insertAdjacentHTML('afterbegin','<div class="workbench-chrome"><span>● ● ●</span><b>INKPANDA / 创作桌面</b><span>↗</span></div>')}
if(kind==='visual'){sample.querySelector('.print-table').insertAdjacentHTML('beforeend','<div class="printer-swatches" aria-label="印刷色块装饰"><i></i><i></i><i></i><i></i><span>看构图 / 看层级 / 再看颜色</span></div>');sample.querySelector('.visual-caption').insertAdjacentHTML('beforeend','<div class="proof-seal" aria-hidden="true">LOKI<br>DESIGN<br>PROOF ✳</div>')}
if(kind==='build'){sample.querySelector('.build-heading').insertAdjacentHTML('beforeend','<div class="conversion-tag" aria-hidden="true">INPUT → PROCESS → OUTPUT<br><b>把复杂留在幕后。</b></div>');sample.querySelector('.conversion-front').insertAdjacentHTML('beforeend','<div class="packing-slip"><span>装箱清单 / 制作路径</span><b>01 输入电子书</b><b>02 后台处理</b><b>03 带走文件</b></div>')}
sample.insertAdjacentHTML('beforeend',`<div class="last-page-note"><span>↳ ${words[2]}</span><button>去下一间逛逛 ↗</button></div>`);sample.querySelector('.last-page-note button').onclick=openMap;
}
addEventListener('hashchange',dress);dress();
})();
