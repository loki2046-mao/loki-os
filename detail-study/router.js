/* One route transaction: render the page, then attach its content and interactions. */
(() => {
  const order = ['study', 'catalogue', 'material', 'directory', 'perspective', 'publication', 'editorial', 'venue', 'corpus', 'process', 'pockets'];
  const handlers = new Map();
  let started = false;
  function render() {
    const parts = location.hash.slice(1).split('/');
    if (parts[0] === 'catalogue' && parts[1] && !['works', 'visual', 'writing', 'knowledge', 'building', 'personal'].includes(parts[1])) {
      location.replace('#catalogue/works');
      return;
    }
    for (const name of order) handlers.get(name)?.();
    document.dispatchEvent(new CustomEvent('loki:route-rendered', { detail: { hash: location.hash } }));
  }
  window.lokiRoutes = {
    register(name, handler) {
      if (!order.includes(name) || handlers.has(name)) throw new Error('Invalid or duplicate route stage: ' + name);
      handlers.set(name, handler);
    },
    start() {
      if (started) return;
      for (const name of order) if (!handlers.has(name)) throw new Error('Missing route stage: ' + name);
      started = true;
      addEventListener('hashchange', render);
      render();
    }
  };
})();
