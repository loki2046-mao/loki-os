(() => {
  const frame = document.querySelector('[data-proof-frame]');
  const image = document.querySelector('[data-proof-image]');
  const title = document.querySelector('[data-proof-title]');
  const detail = document.querySelector('[data-proof-detail]');
  const tabs = [...document.querySelectorAll('[data-proof-src]')];
  if (!frame || !image || tabs.length === 0) return;

  const select = (tab) => {
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    frame.classList.add('is-switching');
    window.setTimeout(() => {
      image.src = tab.dataset.proofSrc;
      image.alt = tab.dataset.proofAlt || '';
      if (title) title.textContent = tab.dataset.proofTitle || '';
      if (detail) detail.textContent = tab.dataset.proofDetail || '';
      frame.classList.remove('is-switching');
    }, 120);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const next = tabs[(index + direction + tabs.length) % tabs.length];
      select(next);
      next.focus();
    });
  });

  const tour = document.querySelector('[data-proof-tour]');
  if (tour) {
    tour.addEventListener('click', () => {
      const previewTab = tabs.find((tab) => tab.dataset.proofTitle === tour.dataset.proofTargetTitle) || tabs[0];
      select(previewTab);
      window.setTimeout(() => {
        frame.closest('.story-proof')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        previewTab.focus({ preventScroll: true });
      }, 140);
    });
  }
})();
