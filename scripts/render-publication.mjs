import { identity, threads } from './editorial-data.mjs';
import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const origin = 'https://loki-os.hiloki.ai';
export const personId = origin + '/about.html#loki';
export const categories = { visual:'图像与视觉', writing:'写作与表达', knowledge:'阅读与判断', building:'构建与工具', personal:'个人创作' };
export const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
export function loadContent() {
  const context = { window:{} };
  for (const file of ['public-data.js','process-data.js','corpus-data.js']) vm.runInNewContext(readFileSync(path.join(root,file),'utf8'),context);
  return { data:context.window.bookData, processes:context.window.lokiProcess, corpus:context.window.lokiCorpus };
}
export const itemUrl = item => item.category ? `/methods/${item.id}/` : '/' + item.href.replace(/^\.\//,'');
export const bookUrl = book => `/notes/day-${String(book.day).padStart(2,'0')}/`;
const person = {'@type':'Person','@id':personId,name:'Loki',alternateName:'赛博小熊猫 Loki',url:origin+'/about.html',image:origin+'/loki-ip-live.jpg',sameAs:['https://github.com/loki2046-mao','https://hiloki.ai'],description:identity};
const previewImage = src => { const small='assets/previews/'+path.basename(src).replace(/\.[^.]+$/,'.webp');return existsSync(path.join(root,small))?small:src; };
const imageUrl = src => new URL(src || '/assets/loki-ticket-welcome.webp', origin+'/').href;
export function metadata({title,description,url,image,type='WebPage',extra={}}) {
  const absolute = new URL(url,origin).href;
  return `<title>${escape(title)}</title>\n<meta name="description" content="${escape(description)}">\n<link rel="canonical" href="${absolute}">\n<meta property="og:type" content="${type==='Article'?'article':'website'}"><meta property="og:site_name" content="赛博小熊猫 Loki · 个人场刊"><meta property="og:locale" content="zh_CN"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${absolute}"><meta property="og:image" content="${escape(imageUrl(image))}"><meta property="og:image:alt" content="${escape(title)}"><meta name="twitter:card" content="summary_large_image">\n<link rel="icon" href="/loki-ip-live.jpg">\n<script type="application/ld+json">${json({'@context':'https://schema.org','@graph':[person,{'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'赛博小熊猫 Loki · 个人场刊',publisher:{'@id':personId}},{'@type':type,'@id':absolute+'#page',url:absolute,name:title,description,inLanguage:'zh-CN',isPartOf:{'@id':origin+'/#website'},about:{'@id':personId},...extra}]})}</script>`;
}
export const navigation = (active='') => `<a class="pub-skip" href="#main-content">跳到正文</a><header class="pub-nav"><a class="pub-brand" href="/">LOKI <span>个人场刊</span></a><nav aria-label="主导航">${[['/about.html','认识 Loki'],['/works.html','作品节目单'],['/methods/','制作手册'],['/notes/','阅读档案'],['/contact/','找到我']].map(([url,label])=>`<a href="${url}"${active===url?' aria-current="page"':''}>${label}</a>`).join('')}</nav></header>`;
const footer = `<footer class="pub-footer"><b>散场以后，还有想做的事。</b><p>赛博小熊猫 Loki · AI 内容创作者 / Vibe coder / 现场爱好者</p><a href="/contact/">继续关注，或者写信聊聊 ↗</a><a href="/index.html#break">中场歇一会儿 ↗</a></footer>`;
const contactContent = `<p class="pub-eyebrow">STAY IN TOUCH / 下一场见</p><h1>找到 Loki</h1><p class="pub-lead">想接着看我做什么，来公众号和小红书。想聊某件作品、交换想法，或者谈合作，可以直接写信。</p><div class="pub-contact-grid">${[['loki-wechat-official.jpg','公众号','赛博小熊猫 Loki'],['contact/qr-personal-wechat.webp','个人微信','加好友时说下怎么认识的'],['contact/qr-xiaohongshu.webp','小红书','赛博小熊猫 Loki']].map(([src,label,note])=>`<section><h2>${label}</h2><img src="/assets/${src}" alt="Loki ${label}二维码" width="300" height="300" loading="lazy"><p>${note}</p><a href="/assets/${src}" download>保存二维码 ↓</a></section>`).join('')}</div><div class="pub-contact-links"><p>邮箱 <a href="mailto:lokimao2046@gmail.com">lokimao2046@gmail.com</a> <button type="button" data-copy-mail>复制邮箱</button><span role="status" data-copy-status></span></p><p>GitHub <a href="https://github.com/loki2046-mao" target="_blank" rel="noopener noreferrer">loki2046-mao ↗</a></p><p>同一部手机上，可保存二维码后在微信或小红书中识别；也可以搜索「赛博小熊猫 Loki」。</p></div>`;
export function relatedItems(item,data) {
  const entries=[...data.projects,...data.skills].filter(x=>x.visibility==='public');
  const ids=new Set();
  for(const edge of data.relations||[]) {
    if(edge.from===item.id)ids.add(edge.to);
    if(edge.to===item.id&&edge.kind==='uses')ids.add(edge.from);
  }
  return entries.filter(x=>ids.has(x.id));
}
function related(item,data) {
 const links=relatedItems(item,data);return links.length?`<section class="pub-section"><p class="pub-eyebrow">KEEP EXPLORING</p><h2>这件事，还连着这些。</h2><ul class="pub-related">${links.map(x=>`<li><a href="${itemUrl(x)}">${escape(x.title)} ↗</a><p>${escape(x.summary)}</p></li>`).join('')}</ul></section>`:'';
}
const paragraphs = text => String(text||'').split(/\n\s*\n/).filter(x=>x.trim()&&x.trim()!=='---').map(x=>`<p>${escape(x.replace(/\*\*/g,'').replace(/`/g,''))}</p>`).join('');
function shell(meta,body,active='') {return `<!doctype html>\n<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${metadata(meta)}<link rel="stylesheet" href="/discovery.css"><script src="/contact.js" defer></script><script src="/publication-actions.js" defer></script></head><body class="pub-page">${navigation(active)}<main id="main-content" class="pub-main">${body}</main>${footer}</body></html>\n`;}
function methodPage(item,{data,processes}) {
 const p=data.profiles[item.id]||{},record=processes[item.id]||{},visual=p.visual?.image?p.visual:data.skillImages[item.id],gallery=record.gallery?.length?record.gallery:visual?.image?[[visual.image,visual.caption]]:[];
 const gh=data.github[item.id];
 const body=`<nav class="pub-crumb" aria-label="面包屑"><a href="/methods/">制作手册</a><span>/ ${escape(categories[item.category])}</span></nav><header class="pub-hero"><p class="pub-eyebrow">METHOD / ${escape(categories[item.category])}</p><h1>${escape(item.title)}</h1><p class="pub-lead">${escape(item.summary)}</p><p class="pub-byline">Loki · ${escape(p.ownership||item.form)}</p><div class="pub-actions"><a href="/detail-study/index.html#catalogue/${item.category}/${item.id}">在场刊里翻阅 ↗</a><button data-share-page>分享这项方法</button><span data-share-status role="status"></span></div></header><section class="pub-section pub-facts"><div><h2>什么时候用</h2><p>${escape(p.trigger||item.summary)}</p></div><div><h2>我会把关什么</h2><p>${escape(p.judgment||record.intro)}</p></div><div><h2>已经留下什么</h2><p>${escape(p.realResult||p.evidenceStatus||item.form)}</p></div></section>${gallery.length?`<div class="pub-gallery">${gallery.map(([src,caption])=>`<figure><a href="/${escape(src)}" target="_blank" rel="noopener"><img src="/${escape(src)}" alt="${escape(caption)}" loading="lazy" decoding="async"></a><figcaption>${escape(caption)} · 点图查看原图</figcaption></figure>`).join('')}</div>`:''}<section class="pub-section pub-prose"><p class="pub-eyebrow">THE MAKING OF</p><h2>${escape(record.title||'从哪里开始做')}</h2><p>${escape(record.intro||p.origin)}</p>${(record.steps||[]).map(([title,text],i)=>`<section id="step-${i+1}"><h3><small>${String(i+1).padStart(2,'0')}</small> ${escape(title)}</h3>${paragraphs(text)}</section>`).join('')}</section>${item.id==='book'?'<p class="pub-callout"><a href="/notes/">逐篇翻阅已有的 AI 辅助阅读档案 ↗</a></p>':''}<section class="pub-section pub-prose"><h2>来源与使用边界</h2><p>${escape(p.limitations)}</p><p>${escape(record.sourceLabel||p.evidenceStatus)}</p><p>${escape(record.note)}</p>${gh&&gh.kind!=='profile'?`<a href="${escape(gh.href)}" target="_blank" rel="noopener noreferrer">${escape(gh.label)} ↗</a><p>${escape(gh.note)}</p>`:''}</section>${related(item,data)}`;
 return shell({title:`${item.title}｜${categories[item.category]}方法｜赛博小熊猫 Loki`,description:item.summary,url:itemUrl(item),image:gallery[0]?.[0],type:'Article',extra:{author:{'@id':personId},articleSection:categories[item.category]}},body,'/methods/');
}
function bookPage(book,books) {
 const index=books.indexOf(book),url=bookUrl(book);
 return shell({title:`《${book.title}》阅读档案｜Day ${book.day}｜Loki`,description:`${book.level}。${book.insight}`,url,type:'Article',extra:{datePublished:book.date,author:{'@id':personId},creativeWorkStatus:'AI 辅助导读档案，未逐页核对原书'}},`<nav class="pub-crumb" aria-label="面包屑"><a href="/notes/">阅读档案</a><span>/ DAY ${String(book.day).padStart(2,'0')}</span></nav><header class="pub-hero"><p class="pub-eyebrow">READING FILE / ${book.date}</p><h1>《${escape(book.title)}》</h1><p class="pub-lead">${escape(book.insight)}</p><p class="pub-byline">Loki 整理 · ${escape(book.level)}</p><div class="pub-actions"><button data-share-page>分享这一篇</button><span data-share-status role="status"></span></div></header><aside class="pub-callout"><b>先说明这份材料的来历</b><p>这是我让 Cola 生成并保存的导读节选，尚未逐页对照原书。下文保留当时的表述；模型给出的判断与置信度不代表已经核实，也不当作原作者的直接引语。</p></aside><article class="pub-prose pub-section"><h2>当天保存的导读节选</h2>${paragraphs(book.excerpt)}<h2>这篇怎么展开</h2><ol>${book.contents.map(x=>`<li>${escape(x)}</li>`).join('')}</ol></article><section class="pub-section"><h2>我为什么留下这些文稿</h2><p>我不想读完只剩几句漂亮话。先看懂它讲什么，再看看和自己有什么关系；核对原书、补上自己的判断，是接下来仍要做的事。</p><a href="/projects/daily-insight.html">看这套阅读工作流的制作记录 ↗</a></section><nav class="pub-pagination" aria-label="相邻文稿">${index>0?`<a href="${bookUrl(books[index-1])}">← ${escape(books[index-1].title)}</a>`:'<a href="/notes/">全部文稿</a>'}${index<books.length-1?`<a href="${bookUrl(books[index+1])}">${escape(books[index+1].title)} →</a>`:'<a href="/notes/">返回阅读档案 →</a>'}</nav>`,'/notes/');
}
function story(t,p){return `<section class="editorial-thread" id="thread-${t.id}"><div class="editorial-context"><span class="pub-eyebrow">${escape(t.theme)}</span><h2>${escape(t.title)}</h2><dl><dt>从我自己出发</dt><dd>${escape(t.origin)}</dd><dt>我做的选择</dt><dd>${escape(t.decision)}</dd><dt>这件作品与我的关系</dt><dd>${escape(t.meaning)}</dd></dl></div><div class="editorial-evidence"><a href="${itemUrl(p)}"><img src="/${escape(previewImage(p.image))}" alt="${escape(p.imageAlt)}" width="${p.imageWidth}" height="${p.imageHeight}" loading="lazy"><h3>${escape(p.title)} ↗</h3></a><p>${escape(p.proof)}</p><a class="editorial-link" href="${itemUrl(p)}">看成品、制作过程与边界 ↗</a></div></section>`;}
function selected(data){return threads.flatMap(t=>{const p=data.projects.find(p=>p.id===t.id&&p.visibility==='public');return p?[{t,p}]:[]});}
function discovery(data){return `<section id="home-discovery" class="home-discovery"><header class="discovery-heading"><span class="pub-eyebrow">LOKI / 我的作品从哪里来</span><h2>喜欢的，往深处看。<br>不顺手的，动手改。</h2><p>${escape(identity)}</p><p>界面、人物研究和长篇写作，看起来做的是不同的事，起点都在我的生活里。</p><nav class="editorial-jumps" aria-label="三条创作主线">${selected(data).map(({t},i)=>`<button type="button" data-story-target="thread-${t.id}">0${i+1} / ${escape(t.theme)} ↓</button>`).join('')}</nav></header>${selected(data).map(({t,p})=>story(t,p)).join('')}<section class="editorial-next"><span class="pub-eyebrow">从作品里留下方法</span><h2>做完一个，下次怎么少绕一点路？</h2><p>把试过的步骤、需要判断的地方和使用边界写下来，变成制作手册。阅读档案则保留另一种过程：借助 AI 先读懂，再继续核对和判断。</p><div class="pub-actions"><a href="/works.html">继续看全部作品 ↗</a><a href="/methods/">翻制作手册 ↗</a><a href="/notes/">看 AI 辅助阅读档案 ↗</a></div><a href="/about.html">认识作品背后的我 ↗</a></section><footer class="pub-footer"><b>如果你也喜欢把想法做出来。</b><p>关注公众号和小红书，接着看我的制作记录；想交流作品、方法或合作，给我写信。</p><a href="/contact/">关注 / 交流 / 合作 ↗</a><a href="/index.html#break">演出、咖啡和日常 ↗</a></footer><div id="home-stats"></div></section>`;}

function replaceRegion(source,name,content,before) {
 const start=`<!-- GENERATED:${name}:START -->`,end=`<!-- GENERATED:${name}:END -->`,replacement=`${start}\n${content}\n${end}`;
 if(source.includes(start))return source.replace(new RegExp(`${start}[\\s\\S]*?${end}`),()=>replacement);
 if(!source.includes(before))throw new Error('Missing insertion point '+name);
 return source.replace(before,()=>replacement+'\n'+before);
}
function updateHead(source,meta) {
 if(source.includes('<!-- GENERATED:PUBLIC_META:START -->'))return replaceRegion(source,'PUBLIC_META',metadata(meta),'</head>');
 // Existing project-specific JSON-LD stays; the shared graph adds one consistent author identity.
 source=source.replace(/<!-- GENERATED:PUBLIC_META:START -->[\s\S]*?<!-- GENERATED:PUBLIC_META:END -->\s*/g,'');
 source=source.replace(/<title>[\s\S]*?<\/title>/g,'').replace(/<meta\b[^>]*(?:name=["'](?:description|twitter:[^"']+)["']|property=["']og:[^"']+["'])[^>]*>/g,'').replace(/<link\b[^>]*rel=["'](?:canonical|icon)["'][^>]*>/g,'');
 return replaceRegion(source,'PUBLIC_META',metadata(meta),'</head>');
}
export function buildPublication(content=loadContent()) {
 const {data,corpus}=content,files=new Map(),skills=data.skills.filter(x=>x.visibility==='public');
 for(const skill of skills) files.set(`methods/${skill.id}/index.html`,methodPage(skill,content));
 for(const book of corpus.books) files.set(bookUrl(book).slice(1)+'index.html',bookPage(book,corpus.books));
 files.set('methods/index.html',shell({title:'制作手册｜AI 创作与工作流方法｜赛博小熊猫 Loki',description:'Loki 实际制作与使用的视觉、写作、阅读、构建和个人创作方法，附真实材料、制作过程与使用边界。',url:'/methods/',type:'CollectionPage'},`<header class="pub-hero"><p class="pub-eyebrow">THE MAKING OF / ${skills.length} 项方法</p><h1>制作手册</h1><p class="pub-lead">反复做过的事，慢慢留下方法。先挑一个你现在用得上的。</p><a href="/detail-study/index.html#catalogue/visual">换成场刊翻阅 ↗</a></header><nav class="pub-category-nav" aria-label="方法分类">${Object.entries(categories).map(([key,name])=>`<a href="#${key}">${name}</a>`).join('')}</nav>${Object.entries(categories).map(([key,name])=>`<section class="pub-section" id="${key}"><h2>${name}</h2><div class="pub-index">${skills.filter(x=>x.category===key).map(x=>`<a href="${itemUrl(x)}"><h3>${escape(x.title)} ↗</h3><p>${escape(x.summary)}</p><small>${escape(x.form)}</small></a>`).join('')}</div></section>`).join('')}`,'/methods/'));
 files.set('notes/index.html',shell({title:'阅读档案｜AI 辅助导读与阅读工作流｜Loki',description:corpus.reading.scope,url:'/notes/',type:'CollectionPage'},`<header class="pub-hero"><p class="pub-eyebrow">READING FILE / ${corpus.books.length} 篇记录</p><h1>书读过，<br>留下什么？</h1><p class="pub-lead">${escape(corpus.reading.summary)}</p></header><aside class="pub-callout"><b>AI 辅助阅读档案</b><p>${escape(corpus.reading.scope)}</p></aside><div class="pub-reading-index">${[...corpus.books].reverse().map(b=>`<a href="${bookUrl(b)}"><span>DAY ${String(b.day).padStart(2,'0')} / ${b.date}</span><h2>《${escape(b.title)}》 ↗</h2><p>${escape(b.insight)}</p></a>`).join('')}</div>`,'/notes/'));
 files.set('contact/index.html',shell({title:'找到 Loki｜关注、交流与合作',description:'赛博小熊猫 Loki 的公众号、小红书、GitHub 与邮箱。继续关注作品，交流 AI 创作与产品实践。',url:'/contact/',type:'ContactPage'},`<section class="pub-hero" id="contact-content">${contactContent}</section>`,'/contact/'));
 let index=readFileSync(path.join(root,'index.html'),'utf8');
 if(!index.includes('rel="preload" as="image"'))index=index.replace('<meta name="viewport"', '<link rel="preload" as="image" href="/assets/loki-ticket-welcome.webp" fetchpriority="high"><meta name="viewport"');
 index=updateHead(index,{title:'赛博小熊猫 Loki｜AI 产品、创作方法与个人场刊',description:'我是 Loki，把喜欢、观察和判断做成 AI 产品、创作方法和日常工具。翻看真实作品、制作记录，也看看我的现场与日常。',url:'/'});
 index=index.replace('<body>','<body class="loki-publication">').replace(/<script\b([^>]*\bsrc=[^>]*)>/g,(tag,attrs)=>/\bdefer\b/.test(attrs)?tag:'<script'+attrs+' defer>');
 index=index.replace(/<section id="cover"[\s\S]*?<\/section>/,readFileSync(path.join(root,'scripts/home-cover.html'),'utf8').trim());
 index=index.replace('<link rel="stylesheet" href="home-desk.css">','');
 index=replaceRegion(index,'HOME_DISCOVERY',discovery(data),'</main>');
 if(!index.includes('href="discovery.css"'))index=index.replace('</head>','<link rel="stylesheet" href="discovery.css"><script src="contact.js" defer></script></head>');
 files.set('index.html',index);
 for(const file of ['about.html','works.html',...data.projects.filter(p=>p.visibility==='public').map(p=>p.href.replace(/^\.\//,''))]) {
   let source=readFileSync(path.join(root,file),'utf8');
   const p=data.projects.find(x=>x.href==='./'+file);
   const title=p?`${p.title}｜真实案例与制作记录｜赛博小熊猫 Loki`:file==='about.html'?'认识赛博小熊猫 Loki｜把喜欢、观察和判断做成作品':'作品节目单｜AI 产品、创作与个人工具｜赛博小熊猫 Loki';
   const description=p?p.summary:file==='about.html'?person.description:'Loki 的公开作品：个人化界面系统、人物视角蒸馏、InkPanda，以及阅读、教育与个人 AI 工具。';
   source=source.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,(block,raw)=>{const schema=JSON.parse(raw);if(schema.creator?.name==='Loki'){schema.creator={'@id':personId};return '<script type="application/ld+json">'+json(schema)+'</script>';}return block;});
   source=updateHead(source,{title,description,url:'/'+file,image:p?.image,type:p?'Article':file==='about.html'?'ProfilePage':'CollectionPage',extra:p?{author:{'@id':personId},creator:{'@id':personId},mentions:relatedItems(p,data).map(x=>({'@id':origin+itemUrl(x)+'#page'}))}:file==='about.html'?{mainEntity:{'@id':personId}}:{}});
   if(!source.includes('href="/discovery.css"'))source=source.replace('</head>','<link rel="stylesheet" href="/discovery.css"><script src="/contact.js" defer></script><script src="/publication-actions.js" defer></script></head>');
   source=source.replace(/<nav class="brand-nav"[\s\S]*?<\/nav>/,()=>navigation('/'+file));
   if(!source.includes('id="main-content"'))source=source.replace(/<main(\s[^>]*)?>/,m=>m.replace('<main','<main id="main-content"'));
   if(file==='about.html'||file==='works.html'){source=replaceRegion(source,'EDITORIAL_POSITION',`<section class="editorial-index"><p class="pub-eyebrow">${file==='about.html'?'我与这些作品':'三条创作主线'}</p><h2>从自己的生活里，找到要做的事。</h2><p>${escape(identity)}</p>${selected(data).map(({t,p})=>`<article><h3><a href="${itemUrl(p)}">${escape(t.theme)} / ${escape(p.title)} ↗</a></h3><p>${escape(t.origin)}</p><p>${escape(t.meaning)}</p></article>`).join('')}<a href="/contact/">继续关注，或找我聊聊 ↗</a></section>`,'</main>');}
   if(p){
     const thread=threads.find(t=>t.id===p.id);
     if(thread)source=replaceRegion(source,'AUTHOR_STORY',`<section class="editorial-index"><p class="pub-eyebrow">LOKI / ${escape(thread.theme)}</p><h2>为什么是我做这件事？</h2><p>${escape(thread.origin)}</p><p>${escape(thread.decision)}</p><p>${escape(thread.meaning)}</p><a href="/about.html">认识创作者 Loki ↗</a><p>沿着另外的起点继续看：${selected(data).filter(x=>x.t.id!==p.id).map(({t,p})=>`<a href="${itemUrl(p)}">${escape(t.theme)} · ${escape(p.title)} ↗</a>`).join(' / ')}</p></section>`,'</main>');
     source=replaceRegion(source,'CASE_CONNECTIONS',`<section class="pub-case-connections">${related(p,data)}<div class="pub-actions"><button data-share-page>分享这件作品</button><span data-share-status role="status"></span><a href="/contact/">找 Loki 聊聊 ↗</a><a href="/works.html">全部作品 ↗</a></div></section>`,'</main>');
   }
   files.set(file,source);
 }
 let detail=readFileSync(path.join(root,'detail-study/index.html'),'utf8');
 detail=updateHead(detail,{title:'作品与制作手册｜Loki 个人场刊',description:'翻阅 Loki 的作品、制作方法与真实过程，也可直接阅读每项内容的独立页面。',url:'/detail-study/'}).replace('LOKI<span>内页试装 / 本地设计样板</span>','LOKI<span>作品与制作手册</span>');
 detail=replaceRegion(detail,'STATIC_DIRECTORY',`<section id="static-directory"><h1>作品与制作手册</h1><p>选择一份内容，直接阅读。</p><a href="/works.html">作品节目单</a> · <a href="/methods/">制作手册</a> · <a href="/notes/">阅读档案</a><ul>${[...data.projects,...skills].filter(x=>x.visibility==='public').map(x=>`<li><a href="${itemUrl(x)}">${escape(x.title)}</a></li>`).join('')}</ul></section>`,'<main id="app">');
 if(!detail.includes('href="/discovery.css"'))detail=detail.replace('</head>','<link rel="stylesheet" href="/discovery.css"><script src="/contact.js" defer></script></head>');
 if(!detail.includes('name="robots"'))detail=detail.replace('</head>','<meta name="robots" content="noindex,follow"></head>');
 files.set('detail-study/index.html',detail);
 files.set('contact.js',`/* Generated by scripts/render-publication.mjs from the shared contact content. */\n(()=>{const wire=root=>{root.querySelectorAll('[data-copy-mail]').forEach(button=>button.onclick=async()=>{const status=root.querySelector('[data-copy-status]');try{await navigator.clipboard.writeText('lokimao2046@gmail.com');status.textContent=' 已复制';}catch{status.textContent=' 复制暂不可用，请长按或选中邮箱地址。';}});};let dialog;document.addEventListener('click',event=>{if(!event.target.closest('[data-wechat],#reading-contact'))return;if(!dialog){dialog=document.createElement('dialog');dialog.className='pub-contact-dialog';dialog.setAttribute('aria-label','找到 Loki');dialog.innerHTML='<button class="pub-dialog-close" aria-label="关闭联系卡">关闭 ×</button>'+${json(contactContent.replace('<h1>','<h2>').replace('</h1>','</h2>'))};document.body.append(dialog);dialog.querySelector('.pub-dialog-close').onclick=()=>dialog.close();dialog.onclick=e=>{if(e.target===dialog)dialog.close()};wire(dialog);}dialog.showModal();});wire(document);})();\n`);
 for(const [file,source] of files)files.set(file,source.replace(/[ \t]+\n/g,'\n'));
 return files;
}
export function run(check=false) {
 const files=buildPublication();
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const manifestPath=path.join(root,'publication-manifest.json');
 const previous=existsSync(manifestPath)?JSON.parse(readFileSync(manifestPath,'utf8')):{};
 const manifest={};
 for(const [file,source] of files) {
  if(!file.endsWith('.html'))continue;
  const hash=createHash('sha256').update(source).digest('hex');
  let date=previous[file]?.hash===hash?previous[file].modified:today;
  if(!previous[file]&&existsSync(path.join(root,file))&&readFileSync(path.join(root,file),'utf8')===source){try{date=execFileSync('git',['log','-1','--format=%cs','--',file],{cwd:root,encoding:'utf8'}).trim()||today}catch{}}
  manifest[file]={hash,modified:date};
 }
 files.set('publication-manifest.json',JSON.stringify(manifest,null,2)+'\n');
 files.set('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+Object.entries(manifest).filter(([file])=>file!=='detail-study/index.html').map(([file,m])=>`  <url><loc>${origin}/${file==='index.html'?'':file.replace(/index\.html$/,'')}</loc><lastmod>${m.modified}</lastmod></url>`).join('\n')+'\n</urlset>\n');
 const stale=[];
 for(const [file,source] of files){const target=path.join(root,file);if(!existsSync(target)||readFileSync(target,'utf8')!==source){stale.push(file);if(!check){mkdirSync(path.dirname(target),{recursive:true});writeFileSync(target,source);}}}
 // Delete only paths owned by this generator, when an entry is removed or made private.
 for(const file of Object.keys(previous)){if(/^(methods|notes)\/[a-z0-9-]+\/index\.html$/.test(file)&&!files.has(file)&&existsSync(path.join(root,file))){stale.push(file);if(!check)unlinkSync(path.join(root,file));}}
 if(check&&stale.length)throw new Error('Publication is stale: '+stale.join(', ')+'; run npm run build');
 console.log(`Publication ${check?'checked':'generated'}: ${Object.keys(manifest).length} HTML pages; ${stale.length} changed files.`);
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))run(process.argv.includes('--check'));
