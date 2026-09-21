/* Explicit content relationships. Links are derived from IDs and current categories. */
(() => {
  const data = window.bookData;
  const entries = new Map([...data.projects, ...data.skills].filter(x => x.visibility === 'public').map(x => [x.id, x]));
  const projectIds = new Set(data.projects.map(x => x.id));
  window.lokiRelations = {
    forItem(id) {
      return (data.relations || []).flatMap(edge => {
        const reverse = edge.kind === 'uses' && edge.to === id;
        if (edge.from !== id && !reverse) return [];
        const item = entries.get(reverse ? edge.from : edge.to);
        if (!item) return [];
        const category = projectIds.has(item.id) ? 'works' : item.category;
        const label = reverse ? `使用这项方法的作品：${item.title}` : edge.label || `用到的方法：${item.title}`;
        return [{ id: item.id, kind: edge.kind, label, href: `#catalogue/${category}/${item.id}` }];
      });
    }
  };
})();
