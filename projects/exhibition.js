(()=>{
  const qs=(selector,scope=document)=>scope.querySelector(selector);
  const qsa=(selector,scope=document)=>[...scope.querySelectorAll(selector)];

  const renderPerspectiveCases=()=>{
    const root=qs('[data-perspective-cases]');
    const data=window.LOKI_CASE_DATA?.perspectiveDistillation;
    if(!root||!Array.isArray(data?.people))return;
    const list=qs('[data-persona-list]',root);
    const screen=qs('[data-persona-screen]',root);
    list.textContent='';
    screen.textContent='';
    data.people.forEach((person,index)=>{
      const button=document.createElement('button');
      button.className=index===0?'is-active':'';
      button.dataset.switch='persona-case';
      button.dataset.value=person.id;
      button.innerHTML=`<span>${person.name} / ${person.role}</span><b>${person.score}</b>`;
      list.appendChild(button);

      const panel=document.createElement('div');
      panel.className='persona-panel';
      panel.dataset.panelGroup='persona-case';
      panel.dataset.panel=person.id;
      panel.dataset.tone=person.tone;
      panel.hidden=index!==0;
      const facts=person.facts.map(fact=>`<span>${fact}</span>`).join('');
      panel.innerHTML=`<div class="persona-status"><i></i>${person.state} · ${person.version}</div><div class="persona-score"><b>${person.score}</b><small>${person.scoreLabel}</small></div><h2>${person.headline}</h2><p>${person.description}</p><div class="persona-flags">${facts}</div>`;
      screen.appendChild(panel);
    });
  };
  renderPerspectiveCases();

  qsa('[data-scroll]').forEach(button=>button.addEventListener('click',()=>{
    qs(button.dataset.scroll)?.scrollIntoView({behavior:'smooth',block:'start'});
  }));

  qsa('[data-switch]').forEach(button=>button.addEventListener('click',()=>{
    const group=button.dataset.switch;
    const value=button.dataset.value;
    qsa(`[data-switch="${group}"]`).forEach(item=>item.classList.toggle('is-active',item===button));
    qsa(`[data-panel-group="${group}"]`).forEach(panel=>{
      const active=panel.dataset.panel===value;
      panel.hidden=!active;
      panel.classList.toggle('is-active',active);
    });
  }));

  qsa('[data-gallery-src]').forEach(button=>button.addEventListener('click',()=>{
    const gallery=button.closest('[data-gallery]');
    const image=qs('[data-gallery-image]',gallery);
    const label=qs('[data-gallery-label]',gallery);
    const note=qs('[data-gallery-note]',gallery);
    const frame=qs('[data-gallery-frame]',gallery);
    if(image){
      image.classList.add('is-changing');
      window.setTimeout(()=>{
        image.src=button.dataset.gallerySrc;
        image.alt=button.dataset.galleryAlt||'';
        image.classList.remove('is-changing');
      },130);
    }
    if(label)label.textContent=button.dataset.galleryLabel||'';
    if(note)note.textContent=button.dataset.galleryNote||'';
    if(frame)frame.classList.toggle('is-private',button.dataset.galleryPrivate==='true');
    qsa('[data-gallery-src]',gallery).forEach(item=>item.classList.toggle('is-active',item===button));
  }));

  qsa('[data-open]').forEach(button=>button.addEventListener('click',()=>{
    const dialog=qs(`#${button.dataset.open}`);
    if(!dialog)return;
    dialog.showModal();
    document.body.classList.add('has-dialog');
  }));
  const room=new URLSearchParams(location.search).get('room');
  if(['cola','hub','codex'].includes(room)){
    const dialog=qs(`#archive-${room}`);
    if(dialog){dialog.showModal();document.body.classList.add('has-dialog');}
  }
  qsa('dialog').forEach(dialog=>{
    qsa('[data-close]',dialog).forEach(button=>button.addEventListener('click',()=>dialog.close()));
    dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
    dialog.addEventListener('close',()=>{
      document.body.classList.toggle('has-dialog',Boolean(qs('dialog[open]')));
    });
  });

  qsa('[data-flip]').forEach(card=>card.addEventListener('click',()=>{
    card.classList.toggle('is-flipped');
    card.setAttribute('aria-pressed',String(card.classList.contains('is-flipped')));
  }));

  qsa('[data-reveal-answer]').forEach(button=>button.addEventListener('click',()=>{
    const answer=qs(button.dataset.revealAnswer);
    if(!answer)return;
    answer.hidden=false;
    button.hidden=true;
    answer.animate?.([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:340,easing:'cubic-bezier(.2,.8,.2,1)'});
  }));

  qsa('[data-health-action]').forEach(button=>button.addEventListener('click',()=>{
    const root=button.closest('[data-health-demo]');
    const panel=button.closest('[data-panel]');
    const output=qs('[data-health-output]',panel)||qs('[data-health-output]',root);
    if(!output)return;
    const messages={water:'演示记录：饮水 +250 ml（未写入任何真实数据）',voice:'演示识别：午饭后喝了 500 ml 水 · 等待确认',medicine:'演示核对：用药信息需按包装或医嘱再次确认',cycle:'演示记录：经期与周期只做个人节律估算'};
    output.textContent=messages[button.dataset.healthAction]||'演示动作已触发';
    output.classList.remove('is-pulsing');
    requestAnimationFrame(()=>output.classList.add('is-pulsing'));
  }));

  qsa('[data-channel]').forEach(button=>button.addEventListener('click',()=>{
    const channel=button.dataset.channel;
    const consoleRoot=button.closest('[data-channel-console]');
    qsa('[data-channel]',consoleRoot).forEach(item=>item.classList.toggle('is-active',item===button));
    qsa('[data-voice]',consoleRoot).forEach(item=>item.classList.toggle('is-muted',channel!=='all'&&item.dataset.voice!==channel));
  }));

  qsa('[data-hotspot]').forEach(button=>button.addEventListener('click',()=>{
    const stage=button.closest('[data-hotspot-stage]');
    const target=button.dataset.hotspot;
    qsa('[data-hotspot]',stage).forEach(item=>item.classList.toggle('is-active',item===button));
    qsa('[data-evidence]',stage).forEach(item=>item.classList.toggle('is-active',item.dataset.evidence===target));
  }));

  const progress=qs('[data-page-progress]');
  const updateProgress=()=>{
    if(!progress)return;
    const total=document.documentElement.scrollHeight-innerHeight;
    progress.style.transform=`scaleX(${total>0?Math.min(1,scrollY/total):0})`;
  };
  addEventListener('scroll',updateProgress,{passive:true});
  addEventListener('resize',updateProgress);
  updateProgress();
})();
