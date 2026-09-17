/* 散场彩蛋 · 桌宠「椰子」：Hatch Pet 二创精灵图的可互动播放器。
   图集按实测行位裁成六条动作条（assets/skills/coconut/*.png，1200×154，每帧 150）。
   idle 7 帧 / left 8 / right 8 / wave 4 / jump 5 / sleep 8（后 4 帧是睡着循环）。
   位移与换帧全走 transform 合成层；换状态才换一次 background-image（已预加载）。 */
(() => {
 const PAGE = document.querySelector('#break-page');
 if (!PAGE) return;

 const CELL_W = 150, CELL_H = 154;
 const ACT = {
  idle:  { img: 'idle',  n: 7, fps: 6 },
  left:  { img: 'left',  n: 8, fps: 10 },
  right: { img: 'right', n: 8, fps: 10 },
  wave:  { img: 'wave',  n: 4, fps: 7 },
  jump:  { img: 'jump',  n: 5, fps: 8 },
  sleep: { img: 'sleep', n: 8, fps: 3, from: 4 }
 };
 const VER = '?v=20260917c'; // 换图必须带版本号，否则浏览器会拿缓存的旧图
 const BUBBLES = ['散场快乐！', '我是椰子，桌上看包的。', '耳机是我的，不外借。', '下次演出见。', '今天也辛苦啦。'];
 const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

 const style = document.createElement('style');
 style.textContent = `
  .coconut-desk{position:relative;flex:1 1 auto;width:100%;min-width:0;height:236px;margin:6px 0 4px;background:#fff9ed;border:1px solid #201c1933;border-radius:10px;overflow:hidden;cursor:pointer}
  .coconut-desk::after{content:'';position:absolute;left:0;right:0;bottom:0;height:26px;border-top:1px solid #201c1955;background:repeating-linear-gradient(90deg,#201c190d 0 2px,transparent 2px 14px)}
  #coconut-pet{position:absolute;bottom:22px;left:0;overflow:hidden;pointer-events:none;will-change:transform;transform:translate3d(40px,0,0)}
  #coconut-frames{width:1200px;height:154px;background-repeat:no-repeat;image-rendering:pixelated;will-change:transform;transform:translate3d(0,0,0)}
  #coconut-bubble{position:absolute;padding:7px 12px;background:#201c19;color:#fff9ed;font-size:12px;line-height:1.5;border-radius:8px;box-shadow:3px 3px 0 #ff650833;opacity:0;transform:translateY(4px);transition:opacity .18s,transform .18s;pointer-events:none;max-width:min(260px,calc(100% - 16px))}
  #coconut-bubble.show{opacity:1;transform:translateY(0)}
  #coconut-bubble::after{content:'';position:absolute;left:22px;bottom:-5px;width:9px;height:9px;background:#201c19;transform:rotate(45deg)}
  .coconut-heart{position:absolute;font-size:14px;pointer-events:none;animation:coconut-float 1.1s ease-out forwards}
  @keyframes coconut-float{to{transform:translateY(-46px);opacity:0}}
  @media(max-width:700px){.coconut-desk{height:206px}#coconut-pet{bottom:16px}}`;
 document.head.append(style);

 const desk = document.createElement('div');
 desk.className = 'coconut-desk';
 desk.setAttribute('role', 'img');
 desk.setAttribute('aria-label', '桌宠椰子：会在桌上走来走去的像素小熊猫，点它会挥手打招呼');
 desk.innerHTML = '<div id="coconut-pet" aria-hidden="true"><div id="coconut-frames"></div></div><div id="coconut-bubble" aria-live="polite"></div>';
 const egg = PAGE.querySelector('.easter-egg');
 if (!egg) return;
 egg.style.flexDirection = 'column';
 egg.insertBefore(desk, egg.firstChild);

 const pet = desk.querySelector('#coconut-pet');
 const framesEl = desk.querySelector('#coconut-frames');
 const bubble = desk.querySelector('#coconut-bubble');

 let scale = 1, deskW = 0;
 const BASE_BOTTOM = () => matchMedia('(max-width:700px)').matches ? 16 : 22;
 const fit = () => {
  const w = desk.clientWidth || PAGE.clientWidth || 390;
  deskW = w;
  scale = Math.max(0.4, Math.min(1, (w - 60) / 620));
  pet.style.width = CELL_W * scale + 'px';
  pet.style.height = CELL_H * scale + 'px';
  framesEl.style.backgroundSize = 1200 * scale + 'px ' + CELL_H * scale + 'px';
  framesEl.style.width = 1200 * scale + 'px';
  framesEl.style.height = CELL_H * scale + 'px';
  // 桌子高度跟着宠物尺寸走，给气泡留出头顶空间，避免被 overflow 切
  desk.style.height = Math.round(BASE_BOTTOM() + CELL_H * scale + 62) + 'px';
 };
 fit();
 addEventListener('resize', fit);

 // 预加载全部动作条，换状态不闪白
 Object.values(ACT).forEach(a => { const i = new Image(); i.src = 'assets/skills/coconut/' + a.img + '.png' + VER; });

 let act = 'idle', frame = 0, frameAcc = 0, lastT = 0;
 let x = 40, targetX = 40, moving = false;
 let state = 'idle', stateUntil = 0, sleeping = false, started = false;
 let walkThen = null;

 const clampX = v => Math.max(12, Math.min(v, deskW - CELL_W * scale - 14));

 function setAct(name) {
  const a = ACT[name];
  if (act !== name) { act = name; frame = 0; frameAcc = 0; framesEl.style.backgroundImage = `url('assets/skills/coconut/${a.img}.png${VER}')`; }
  else if (act === name && frame >= a.n) frame = 0;
 }

 function walkTo(tx, then) {
  targetX = clampX(tx);
  moving = true; walkThen = then || null;
  state = 'walk';
  setAct(targetX >= x ? 'right' : 'left');
 }

 function idleFor(ms) { state = 'idle'; sleeping = false; stateUntil = performance.now() + ms; setAct('idle'); }

 function greet() {
  if (state === 'wave' || state === 'jump') return;
  state = 'wave'; setAct('wave');
  stateUntil = performance.now() + 4 / 7 * 1000;
  bubble.textContent = BUBBLES[Math.floor(Math.random() * BUBBLES.length)];
  bubble.classList.add('show');
  const bw = bubble.offsetWidth;
  bubble.style.left = Math.max(8, Math.min(x + CELL_W * scale / 2 - bw / 2, deskW - bw - 8)) + 'px';
  bubble.style.bottom = (BASE_BOTTOM() + CELL_H * scale + 12) + 'px';
  clearTimeout(greet._b);
  greet._b = setTimeout(() => bubble.classList.remove('show'), 2200);
  const h = document.createElement('span');
  h.className = 'coconut-heart'; h.textContent = '♥'; h.style.color = '#ff6508';
  h.style.left = (x + CELL_W * scale / 2) + 'px'; h.style.bottom = (BASE_BOTTOM() + CELL_H * scale + 4) + 'px';
  desk.append(h); setTimeout(() => h.remove(), 1100);
 }

 const BASE_BOTTOM_UNUSED = null;
 function tick(t) {
  requestAnimationFrame(tick);
  if (!started) { lastT = t; return; }
  const dt = Math.min(64, t - (lastT || t)); lastT = t;
  const a = ACT[act];
  frameAcc += dt;
  const step = 1000 / a.fps;
  while (frameAcc >= step) {
   frameAcc -= step;
   frame++;
   if (frame >= a.n) {
    if (act === 'sleep') frame = ACT.sleep.from;
    else if (act === 'wave' || act === 'jump') { frame = a.n - 1; break; }
    else frame = 0;
   }
  }
  framesEl.style.transform = `translate3d(${-Math.round(frame * CELL_W * scale)}px,0,0)`;
  if (moving) {
   const dir = targetX > x ? 1 : -1;
   x += dir * 46 * scale * dt / 1000;
   if ((dir === 1 && x >= targetX) || (dir === -1 && x <= targetX)) {
    x = targetX; moving = false;
    const then = walkThen; walkThen = null;
    if (then) then();
   }
  }
  pet.style.transform = `translate3d(${Math.round(x)}px,0,0)`;
  const now = t;
  if (state === 'idle' && now >= stateUntil) {
   if (Math.random() < 0.3) { state = 'sleep'; sleeping = true; setAct('sleep'); }
   else walkTo(24 + Math.random() * Math.max(80, deskW - CELL_W * scale - 90), () => idleFor(1800 + Math.random() * 3200));
  } else if (state === 'wave' && now >= stateUntil) {
   state = 'jump'; setAct('jump'); stateUntil = now + 5 / 8 * 1000;
  } else if (state === 'jump' && now >= stateUntil) {
   idleFor(1500);
  } else if (state === 'sleep' && now >= stateUntil + 9000) {
   idleFor(2500);
  }
 }
 requestAnimationFrame(tick);

 desk.addEventListener('click', greet);
 if (reduced) {
  fit(); framesEl.style.backgroundImage = `url('assets/skills/coconut/idle.png${VER}')`;
  framesEl.style.transform = 'translate3d(0,0,0)';
 }
 const start = () => {
  if (started) return;
  started = true; fit();
  x = 40; pet.style.transform = 'translate3d(40px,0,0)';
  setAct('idle'); stateUntil = performance.now() + 2000;
 };
 if (!PAGE.hidden) start();
 new MutationObserver(() => { if (!PAGE.hidden) start(); }).observe(PAGE, { attributes: true, attributeFilter: ['hidden'] });
})();
