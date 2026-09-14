(() => {
  const visuals = {
  "loki-writing": {
    "kind": "process",
    "motif": "writing",
    "caption": "真实材料、规则与输出仍需要分开核对"
  },
  "weixin-outline": {
    "kind": "process",
    "motif": "writing",
    "caption": "先展开选择，再落到真正能写的结构"
  },
  "deep-night": {
    "kind": "process",
    "motif": "writing",
    "caption": "双平台格式是真实能力，正文仍保留私密边界"
  },
  "loki-social": {
    "image": "./projects/assets/real/skills/social-card-pair.png",
    "imageAlt": "同一主题的 Loki 社交卡片 21:9 与 1:1 真实成品",
    "caption": "同一内容 / 两种平台比例 / 真实输出",
    "imageWidth": 2400,
    "imageHeight": 1260,
    "imageFit": "contain"
  },
  "visual-directions": {
    "image": "./projects/assets/exhibition/hub-ui-collage.webp",
    "imageAlt": "Loki Hub 多套真实界面方向拼贴",
    "caption": "同一批真实内容 / 多种结构并排比较",
    "imageWidth": 1440,
    "imageHeight": 1100,
    "imageFit": "contain"
  },
  "notes": {
    "kind": "process",
    "motif": "research",
    "caption": "先留下划线、反对和疑问，再整理为可复习笔记"
  },
  "judgment": {
    "image": "./projects/assets/real/perspective/liulian-evidence-sheet-01.png",
    "imageAlt": "刘恋公开节目材料的时间帧采样证据表",
    "caption": "公开材料先回到具体时间帧，再讨论判断",
    "imageWidth": 1940,
    "imageHeight": 1186,
    "imageFit": "contain"
  },
  "codex-theme": {
    "kind": "process",
    "motif": "building",
    "caption": "真实主题预览正在脱敏；不再以人物剪影代替主题界面"
  }
};
  for (const section of document.querySelectorAll('.skill-view')) {
    const skillId = section.id.replace('skill-view-', '');
    const visual = visuals[skillId];
    const heading = section.querySelector('.skill-view-heading');
    if (!visual || !heading || section.querySelector('.skill-view-media')) continue;
    const intro = document.createElement('div');
    intro.className = 'skill-view-intro';
    heading.before(intro);
    intro.append(heading);
    const figure = document.createElement('figure');
    const isProcess = visual.kind === 'process';
    figure.className = isProcess ? 'skill-view-media is-process motif-' + visual.motif : 'skill-view-media is-' + visual.imageFit;
    if (isProcess) {
      figure.setAttribute('aria-label', visual.caption);
      const diagram = document.createElement('div');
      diagram.className = 'skill-view-process';
      const route = Array.from(section.querySelectorAll('.skill-view-facts dd'), (node) => node.textContent.trim()).slice(0, 3);
      route.forEach((text, index) => {
        const card = document.createElement('div');
        const no = document.createElement('i');
        no.textContent = '0' + (index + 1);
        const value = document.createElement('span');
        value.textContent = text;
        card.append(no, value);
        diagram.append(card);
      });
      figure.append(diagram);
    } else {
      const imageLink = document.createElement('a');
      imageLink.className = 'skill-view-media-open';
      imageLink.href = visual.image;
      imageLink.target = '_blank';
      imageLink.rel = 'noopener';
      imageLink.setAttribute('aria-label', '查看完整图片：' + visual.imageAlt);
      const image = document.createElement('img');
      image.src = visual.image;
      image.alt = visual.imageAlt;
      image.width = visual.imageWidth;
      image.height = visual.imageHeight;
      image.loading = 'lazy';
      image.decoding = 'async';
      imageLink.append(image);
      figure.append(imageLink);
    }
    const caption = document.createElement('figcaption');
    caption.textContent = isProcess ? visual.caption + ' · 过程示意，不是运行截图' : visual.caption;
    figure.append(caption);
    intro.append(figure);
  }
})();
