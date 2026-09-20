/* Reading cards share the same dated corpus as every reading archive entrance. */
(()=>{
 const books=window.lokiCorpus?.books,stage=document.querySelector('[data-daily-stage]');if(!books||!stage)return;
 const nav=stage.querySelector('.daily-days'),original=stage.querySelector('.daily-card');
 const newer=document.createElement('article');newer.className='daily-card daily-manuscript';newer.hidden=true;stage.append(newer);
 const esc=s=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
 const existing=[...nav.querySelectorAll('[data-day]')].sort((a,b)=>Number(a.dataset.day)-Number(b.dataset.day));existing.forEach(b=>nav.append(b));
 books.filter(b=>b.day>4).forEach(b=>{const btn=document.createElement('button');btn.dataset.day=String(b.day).padStart(2,'0');btn.innerHTML=`<b>${btn.dataset.day}</b><span>${esc(b.title)}<i>${esc(b.date.slice(5).replace('-','.'))}</i></span>`;nav.append(btn)});
 nav.addEventListener('click',event=>{const btn=event.target.closest('[data-day]');if(!btn)return;const book=books.find(b=>b.day===Number(btn.dataset.day));if(!book)return;
 nav.querySelectorAll('[data-day]').forEach(b=>{b.classList.toggle('is-active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});
 const archiveButton=document.querySelector(`[data-book="${books.indexOf(book)}"]`);if(archiveButton?.getAttribute('aria-pressed')!=='true')archiveButton?.click();
 original.hidden=book.day>4;newer.hidden=book.day<=4;if(book.day<=4)return;
 stage.style.setProperty('--daily-tone','#d8f044');
 newer.innerHTML=`<header class="daily-card-head"><div><small>DAY ${String(book.day).padStart(2,'0')}</small><h2>《${esc(book.title)}》</h2><p>${esc(book.date)}</p></div><span>已保存的拆书文稿</span></header><section class="daily-insight-card"><small>当天文稿留下的核心洞见</small><blockquote>${esc(book.insight)}</blockquote></section><section class="daily-tool"><h3>这篇怎么展开</h3><ol>${book.contents.map(x=>`<li>${esc(x)}</li>`).join('')}</ol><details class="book-excerpt"><summary>展开当天文稿原文节选</summary><p>Cola 生成的导读节选，保留当时表述，未逐页核对原书。</p>${(book.excerpt||'').split(/\n\s*\n/).filter(x=>x.trim()!=='---').map(x=>`<p>${esc(x.replace(/\*\*/g,'').replace(/`/g,''))}</p>`).join('')}</details></section>`;
 });
 document.addEventListener('loki:reading-selected',event=>{const button=nav.querySelector(`[data-day="${String(event.detail.day).padStart(2,'0')}"]`);if(button&&!button.classList.contains('is-active'))button.click()});
 const selected=document.querySelector('[data-book][aria-pressed="true"]');const day=books[Number(selected?.dataset.book||0)]?.day||1;nav.querySelector(`[data-day="${String(day).padStart(2,'0')}"]`).click();
})();
