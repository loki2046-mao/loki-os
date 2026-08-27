(()=>{
  const actButtons=[...document.querySelectorAll('[data-act]')];
  const acts=[...document.querySelectorAll('.act[id]')];
  const progress=document.querySelector('.cue-progress i');
  const setActive=id=>actButtons.forEach(button=>button.classList.toggle('on',button.dataset.act===id));
  actButtons.forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.act)?.scrollIntoView({behavior:'smooth'})));
  document.querySelectorAll('[data-go]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.go)?.scrollIntoView({behavior:'smooth'})));
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(visible)setActive(visible.target.id);
    },{threshold:[.25,.5,.7]});
    acts.forEach(act=>observer.observe(act));
  }
  const updateProgress=()=>{
    const root=document.documentElement;
    const ratio=root.scrollHeight<=innerHeight?0:scrollY/(root.scrollHeight-innerHeight);
    if(progress){if(innerWidth<=900)progress.style.width=(ratio*100)+'%';else progress.style.height=(ratio*100)+'%';}
  };
  addEventListener('scroll',updateProgress,{passive:true});addEventListener('resize',updateProgress);updateProgress();
  let returnFocus=null;
  const syncModalState=()=>document.body.classList.toggle('modal-open',Boolean(document.querySelector('dialog[open]')));
  const openDialog=(dialog,trigger)=>{
    if(!dialog)return;
    returnFocus=trigger||returnFocus;
    dialog.showModal();
    dialog.querySelector('.dialog-body')?.scrollTo(0,0);
    syncModalState();
  };
  document.querySelectorAll('[data-dialog]').forEach(trigger=>trigger.addEventListener('click',()=>openDialog(document.getElementById(trigger.dataset.dialog),trigger)));
  document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog')?.close()));
  document.querySelectorAll('[data-dialog-switch]').forEach(button=>button.addEventListener('click',()=>{
    const current=button.closest('dialog');
    const next=document.getElementById(button.dataset.dialogSwitch);
    current?.close();
    requestAnimationFrame(()=>openDialog(next,null));
  }));
  document.querySelectorAll('dialog').forEach(dialog=>{
    dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
    dialog.addEventListener('close',()=>{
      syncModalState();
      if(!document.querySelector('dialog[open]')){returnFocus?.focus({preventScroll:true});returnFocus=null;}
    });
  });
  document.querySelectorAll('[data-reveal]').forEach(trigger=>trigger.addEventListener('click',()=>{
    const group=trigger.dataset.group;
    document.querySelectorAll('[data-reveal][data-group="'+group+'"]').forEach(item=>item.classList.toggle('on',item===trigger));
    document.querySelectorAll('[data-panel-group="'+group+'"]').forEach(panel=>{
      const active=panel.dataset.panel===trigger.dataset.reveal;
      panel.hidden=!active;
      if(active&&panel.animate)panel.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,easing:'cubic-bezier(.16,1,.3,1)'});
    });
  }));
})();
