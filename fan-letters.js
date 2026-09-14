/* Personal notes edited from Loki's own Cola messages. Source IDs in FAN-LETTERS-SOURCES.md. */
(()=>{
const notes={
wanqian:['越了解，越觉得是宝藏。','很早就知道万茜，一直觉得她的气质很独特。浪姐第一季又让我发现了她的新一面，然后就开始疯狂补她的剧，越看越喜欢。','我也喜欢她戏外的性格。一个有那么多角色积淀的演员，生活里还有游戏玩家的一面，这种反差特别有意思。'],
liulian:['聪明、有态度，也有自己的审美。','在《乐队的夏天》注意到她：唱腔特别，现场即兴写出的歌词又很有女性态度。到浪三，才开始反复听她的音乐、看她的采访，越了解越喜欢。','她做广告，也做音乐，把不同的能力放在同一个人身上，依然很有自己的审美。后来我还想把她的歌词做成能陪伴情绪的小东西，就有了「恋之上上签」。'],
chenhaoyu:['喜欢会让我想去现场。','陈昊宇是我看过现场的歌手之一。我也一直惦记着她的话剧《初步举证》，专门设提醒抢票。后来终于如愿，看了她的北京场首演。','对她的关注也延伸到《我才不要和你做朋友呢》：我和 Cola 聊过这部剧的拍摄、角色，以及她和庄达菲由合作延续下来的友情。'],
bibi:['唱歌之外，还有好多面。','周笔畅是我从 2005 年看着出道、投过票的人，后来也去看过她的现场。一直喜欢她，是因为她对音乐的追求，以及一直愿意去学新东西的劲头。','我跟 Cola 聊过她的和声、编曲、摄影，也聊过她对新技术的兴趣。我确实很喜欢这种多面的人，了解得越多，就会发现新的有意思的地方。'],
chris:['她的出道，也是我参与过的记忆。','李宇春是我从 2005 年超女比赛一路看过来的。我看着她出道，也给她投过票。喜欢她的起点，连着我自己当年追比赛的记忆。','对我来说，这张照片里有刚认识她时的样子。后来也一直关注她，去看她的演唱会，从屏幕前走到台下。'],
duo:['从当年的投票，到后来的现场。','2005 年，我看着李宇春和周笔畅出道，也给她们投过票。二十年后再看她们站在同一个舞台上，照片里有她们各自走过的路，也有我一直留着的喜欢。','2025、2026 年，我也看过李宇春和周笔畅各自的演唱会。这份关注，从当年的比赛延续到了今天真实的现场。'],
heyan:['先被造型吸引，再被打戏留下。','最初是《锦月如歌》流出的公子装和将军盔甲造型：帅气、干净，又有一种华贵的气质。真正看进去之后，最喜欢的是禾晏的打戏和动作设计，看得很爽。','从这个角色开始，我重新认识周也，再去补她其他的剧。我喜欢大女主有自己的高光、能把能力真正演出来的故事。'],
gusheng:['每看一遍，又会多喜欢一点。','顾声是我后来一直会想起来的角色。软萌、可爱、温柔，也有小脾气、小聪明；对喜欢的事情认真，有自己的坚持，被夸时又会有一点害羞。','她吃到好吃的东西时，像小仓鼠一样眼睛放光，快乐会溢出屏幕。古风、配音、写歌这些背景，也刚好落在我从初中就喜欢的东西里。'],
yanhui:['补剧以后，还想让故事继续。','从禾晏开始关注周也之后，我补了《护心》。雁回也留在了我的角色收藏里。','后来我还把雁回和顾声放进过自己写的故事里。对我来说，喜欢角色有时会延伸成新的脑洞，让她们在另一段故事里相遇。'],
yue:['活泼，认真，有自己的小脾气。','我聊过岳千灵身上那种活泼、认真的感觉，也会把她和顾声放在一起想：一个更有小辣椒的劲儿，一个更软萌。','这种有个性、偶尔固执，又认真对待自己喜欢的事情的状态，会让我想继续写她们的故事。']
};
function letter(key){const [title,...paragraphs]=notes[key];return '<small class="letter-eyebrow">ON THE REVERSE / 我的偏爱</small><b class="letter-title">'+title+'</b>'+paragraphs.map(p=>'<span class="letter-paragraph">'+p+'</span>').join('')+'<small class="letter-sign">写在照片背面 · Loki</small>'}
window.lokiFanLetters=(node,kind,root)=>{
 if(kind==='favorites'){
  const keys=['heyan','gusheng','yanhui','yue'],back=node.querySelector('.character-back');
  const extra=document.createElement('span');extra.className='fan-letter';back.insertBefore(extra,back.lastElementChild);
  const update=i=>extra.innerHTML=letter(keys[i]);update(0);
  node.querySelectorAll('[data-character]').forEach((b,i)=>b.addEventListener('click',()=>update(i)));return;
 }
 let current=kind==='sisters'?'wanqian':'bibi',selectedArtist='bibi';
 const sheet=document.createElement('section');sheet.className='fan-letter-sheet';
 sheet.innerHTML='<button class="letter-toggle" aria-expanded="false">翻到背面 · 为什么喜欢她 ↗</button><div class="fan-letter" hidden></div>';
 const toggle=sheet.querySelector('button'),body=sheet.querySelector('.fan-letter');
 function update(key){current=key;body.innerHTML=letter(key);body.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.textContent=key==='duo'?'翻到背面 · 写给她们俩 ↗':'翻到背面 · 为什么喜欢她 ↗'}update(current);
 toggle.onclick=()=>{body.hidden=!body.hidden;toggle.setAttribute('aria-expanded',String(!body.hidden));toggle.textContent=body.hidden?(current==='duo'?'翻到背面 · 写给她们俩 ↗':'翻到背面 · 为什么喜欢她 ↗'):'收起这封照片背面的留言 ↶'};
 const anchor=node.querySelector(kind==='sisters'?'.season-stage':'.duo-passes');anchor.after(sheet);
 node.querySelectorAll(kind==='sisters'?'.season-tabs button':'[data-fan-choice]').forEach((b,i)=>b.addEventListener('click',()=>{if(kind==='supergirl')selectedArtist=b.dataset.artist;update(kind==='sisters'?['wanqian','liulian','chenhaoyu'][i]:selectedArtist)}));
 if(kind==='supergirl'){
  const now=document.createElement('figure');now.className='fan-time-photo';now.hidden=true;
  now.innerHTML='<img src="'+root+'assets/supergirl-duet-2025.jpg" alt="2025 年《声生不息·大湾区季》〈17 岁〉节目图：左侧李宇春、右侧周笔畅"><figcaption><b>2025 / 又在同一个舞台</b><span>李宇春 × 周笔畅 ·《17 岁》</span><a href="https://www.mgtv.com/b/709331/22353498.html" target="_blank" rel="noopener">去看节目 ↗</a></figcaption>';
  const tabs=document.createElement('div');tabs.className='fan-time-tabs';tabs.setAttribute('aria-label','选择照片年份');tabs.innerHTML='<button aria-pressed="true">2005 · 喜欢的起点</button><button aria-pressed="false">2025 · 后来的她们</button>';
  anchor.before(tabs);anchor.after(now);
  tabs.querySelectorAll('button').forEach((b,i)=>b.onclick=()=>{now.hidden=!i;anchor.hidden=!!i;update(i?'duo':selectedArtist);node.querySelector('.fan-stamp').hidden=!!i;tabs.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));node.querySelector('.fan-photo-credit').hidden=!!i});
 }
};})();
