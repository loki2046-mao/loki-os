(()=>{
 const home=document.querySelector('.map-home');if(!home)return;
 const svg=home.querySelector('.map-home-art svg'), ns='http://www.w3.org/2000/svg';
 // Keep the hit area stationary while lifting the visible roof and its shallow side.
 for(const entrance of svg.querySelectorAll('[data-entrance]')){
   const roof=entrance.querySelector('path'),id='lift-'+entrance.dataset.entrance;
   const clip=document.createElementNS(ns,'clipPath');clip.id=id;clip.append(roof.cloneNode());svg.querySelector('defs').append(clip);
   const shadow=roof.cloneNode();shadow.setAttribute('class','room-ground-shadow');entrance.prepend(shadow);
   const lift=document.createElementNS(ns,'g');lift.setAttribute('class','room-lift');
   const side=roof.cloneNode();side.setAttribute('class','room-lift-side');lift.append(side);
   const art=document.createElementNS(ns,'image');art.setAttribute('href','assets/reference/loki-festival-map-original.png');art.setAttribute('width','1448');art.setAttribute('height','1086');art.setAttribute('clip-path','url(#'+id+')');lift.append(art);
   const rim=roof.cloneNode();rim.setAttribute('class','room-lift-rim');lift.append(rim);entrance.append(lift);roof.setAttribute('class','room-hit-area');
 }
 const entrances=[...home.querySelectorAll('[data-entrance]')];
 const hint=home.querySelector('.map-door-hint');
 const panda=document.createElement('div');panda.className='venue-panda';panda.setAttribute('aria-hidden','true');panda.innerHTML='<div class="venue-panda-sprite"></div><span class="venue-panda-label"></span>';document.body.append(panda);
 const status=document.createElement('span');status.className='pub-skip';status.setAttribute('role','status');home.append(status);
 let motion,exitTimer;
 const land=(id,label)=>{clearTimeout(exitTimer);const roof=svg.querySelector('[data-entrance="'+id+'"] .room-hit-area');const box=roof.getBBox();const point=svg.createSVGPoint();point.x=box.x+box.width/2;point.y=box.y+box.height*.53;const target=point.matrixTransform(svg.getScreenCTM());panda.style.left=target.x+'px';panda.style.top=target.y+'px';panda.classList.add('visible');panda.querySelector('.venue-panda-label').textContent=label+' · 进入';status.textContent=label+'，按回车进入';motion?.cancel();if(!matchMedia('(prefers-reduced-motion: reduce)').matches)motion=panda.firstElementChild.animate([{backgroundPosition:'0px 0px'},{backgroundPosition:'-450px 0px'}],{duration:550,easing:'steps(5)',fill:'none'});};
 const leave=()=>{exitTimer=setTimeout(()=>panda.classList.remove('visible'),100)};
 for(const link of entrances){const label=home.querySelector('.map-room-tickets [data-entrance="'+link.dataset.entrance+'"] b').textContent;link.addEventListener('pointerenter',()=>land(link.dataset.entrance,label));link.addEventListener('focus',()=>land(link.dataset.entrance,label));link.addEventListener('pointerleave',leave);link.addEventListener('blur',leave);}
 addEventListener('scroll',()=>panda.classList.remove('visible'),{passive:true});addEventListener('resize',()=>panda.classList.remove('visible'));

 for(const link of entrances){const activate=on=>{entrances.filter(x=>x.dataset.entrance===link.dataset.entrance).forEach(x=>x.classList.toggle('is-active',on));home.classList.toggle('door-selected',on);const ticket=home.querySelector('.map-room-tickets [data-entrance="'+link.dataset.entrance+'"]');if(hint){hint.querySelector('small').textContent=on?'ENTRANCE / '+ticket.querySelector('span').textContent:'CHOOSE YOUR STAGE';hint.querySelector('b').textContent=on?ticket.querySelector('b').textContent+' · 进入 ↗':'六个场馆，随意串门。';hint.querySelector('span').textContent=on?ticket.querySelector('small').textContent:'把鼠标移到场馆上，挑一扇门进入 ↗';}};link.addEventListener('pointerenter',()=>activate(true));link.addEventListener('pointerleave',()=>activate(false));link.addEventListener('focus',()=>activate(true));link.addEventListener('blur',()=>activate(false));}

 const about=document.querySelector('#home-discovery');
 const open=document.querySelector('#open-book');if(open)open.onclick=()=>about?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
})();
