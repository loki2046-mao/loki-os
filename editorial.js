/* Reference-based editorial spreads; original user-provided sticker sheet, cropped in CSS. */
(()=>{
const reading=!!document.querySelector('#app'), prefix=reading?'../':'', data=window.bookData;
const kinds={visual:['VISUAL LAB','视觉试印室','把画面打开，把想法看清。',6,'#dffa4a'],writing:['WRITER’S ROOM','文字排练室','一句一句，找到表达的重心。',1,'#ffa6ca'],knowledge:['READING FILE','阅读资料室','把材料摊开，让判断有来处。',13,'#becbff'],building:['BACKSTAGE TOOLS','后台工作台','从输入到输出，把路径接起来。',5,'#69dcea'],personal:['PERSONAL COLLECTION','私人收藏册','喜欢的东西，值得留下一页。',4,'#ffac73'],works:['ON THE WORKBENCH','作品制作档案','成品之外，也翻翻制作的背面。',8,'#72dfde']};
function sticker(n){const x=[0,265,530,795][n%4],y=[185,480,765,1060][Math.floor(n/4)];return `<span class="reference-sticker" aria-hidden="true" style="--sprite-x:${x/(1055-250)*100}%;--sprite-y:${y/(1491-210)*100}%"></span>`}
function readSaved(){try{return JSON.parse(localStorage.getItem('loki-ticket-collection')||'[]')}catch{return []}}
function bindSave(button,item){const refresh=()=>{const on=readSaved().includes(item.id);button.setAttribute('aria-pressed',String(on));button.textContent=on?'✓ 已夹进我的票夹':'＋ 收藏这张票根'};refresh();button.onclick=()=>{const saved=readSaved(),next=saved.includes(item.id)?saved.filter(x=>x!==item.id):[...saved,item.id];try{localStorage.setItem('loki-ticket-collection',JSON.stringify(next));refresh()}catch{button.textContent='当前浏览器无法保存'}}}
function dress(){
 if(reading){const parts=location.hash.slice(1).split('/'),cat=parts[1],item=(cat==='works'?data.projects:data.skills).find(x=>x.id===parts[2]);const panel=document.querySelector('.directory-insert');
 document.querySelectorAll('.lineup-link').forEach((a,i)=>{if(!a.querySelector('.act-thumbnail')){const p=data.projects.find(p=>a.hash.endsWith('/'+p.id));if(p?.image)a.insertAdjacentHTML('beforeend',`<span class="act-thumbnail"><img src="${prefix+p.image}" alt=""><i>0${i+1} / 看成品</i></span>`)}});
 if(!panel||!item||panel.querySelector('.editorial-opener'))return;
 const workEditions={'interface-system':['building','界面改造工作台',5],'perspective-distillation':['knowledge','人物视角资料夹',13],'inkpanda':['writing','长篇创作排练室',1],'daily-insight':['knowledge','每日洞见档案',0],'loki-health':['building','日常健康仪表台',8],'loki-ebook-converter':['building','电子书转换工坊',5],'lian':['personal','恋之签收藏册',9]};
 const edition=cat==='works'?workEditions[item.id]:null;const k=[...(kinds[edition?.[0]||cat]||kinds.works)];if(edition){k[1]=edition[1];k[3]=edition[2]}panel.dataset.edition=edition?.[0]||cat;panel.style.setProperty('--edition-accent',k[4]);
 const opener=document.createElement('div');opener.className='editorial-opener';opener.innerHTML=`<div><span class="editorial-kicker">${k[0]} / LOKI</span><p>${k[1]}</p><small>${k[2]}</small></div>${sticker(k[3])}<span class="edition-seal" aria-hidden="true">LOKI<br>翻阅留念<br>✳</span>`;panel.querySelector('.detail-topline')?.after(opener);
 const title=panel.querySelector(':scope>h2');if(title)title.classList.add('editorial-title');
 const preview=panel.querySelector('.detail-preview');if(preview){const frame=document.createElement('figure');frame.className='artifact-frame';preview.before(frame);frame.innerHTML=`<figcaption><span>${cat==='works'?'作品实景 / ORIGINAL SCREEN':'资料展开 / MATERIAL'}</span><span>＋ 放大查看</span></figcaption>`;frame.append(preview)}
 const notes=panel.querySelector('.making-notes');if(notes){notes.insertAdjacentHTML('beforeend','<p class="pencil-note">↳ 从真实材料出发，再把它做成自己的。</p>');}
 const details=panel.querySelector(':scope>details');if(details)details.classList.add('file-envelope');
 const nav=panel.querySelector('.item-navigation');const ticket=document.createElement('aside');ticket.className='collectible-ticket';ticket.innerHTML=`<div><small>LOKI / TAKE THIS IDEA</small><b>${item.title}</b><span>把这页留给下次有需要的自己。</span></div><button type="button" aria-pressed="false"></button><i aria-hidden="true"></i>`;nav?.before(ticket);bindSave(ticket.querySelector('button'),item);
 const steps=panel.querySelectorAll('.method-path li');steps.forEach((li,i)=>{li.insertAdjacentHTML('beforeend',`<button class="step-check" aria-label="标记第 ${i+1} 步已读" aria-pressed="false">已读 □</button>`);li.querySelector('button').onclick=e=>{const on=e.currentTarget.getAttribute('aria-pressed')!=='true';e.currentTarget.setAttribute('aria-pressed',on);e.currentTarget.textContent=on?'已读 ✓':'已读 □'}});
 }else{
 const about=document.querySelector('#about-page');if(about&&!about.querySelector('.personal-pass')){about.insertAdjacentHTML('beforeend',`<aside class="personal-pass"><div>${sticker(6)}</div><section><span class="editorial-kicker">AUDIENCE ↔ CREATOR</span><h3>台下收集喜欢，<br>台后继续创作。</h3><p>演出、图像、文字与工具，都在这本场刊里相遇。</p><a href="detail-study/index.html#catalogue/personal">翻开私人收藏册 ↗</a></section></aside>`)}
 const rest=document.querySelector('#break-page');if(rest&&!rest.querySelector('.intermission-collage')){rest.insertAdjacentHTML('afterbegin',`<div class="intermission-collage"><span class="rest-sign">暂时离开工作台<br><b>INTERMISSION</b></span>${sticker(14)}<span class="rest-note">先歇一会儿，<br>好点子会来的。</span></div>`);rest.insertAdjacentHTML('beforeend','<div class="ticket-wallet"><h3>我的随身票夹</h3><p>在作品与方法内页收藏的票根，会放在这里。</p><div class="wallet-items"></div></div>')}
 const wallet=document.querySelector('.wallet-items');if(wallet){const saved=readSaved();wallet.innerHTML=[...data.projects,...data.skills].filter(x=>saved.includes(x.id)).map(x=>`<a href="detail-study/index.html#catalogue/${x.category||'works'}/${x.id}">${x.title} ↗</a>`).join('')||'<span>票夹还是空的。翻到喜欢的内页，夹一张回来。</span>'}
 }
}
addEventListener('hashchange',dress);dress();
})();
