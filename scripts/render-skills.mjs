import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = { window: {} };
vm.runInNewContext(readFileSync(path.join(root, 'site-data.js'), 'utf8'), context, { filename: 'site-data.js' });
const data = context.window.LOKI_OS_SITE_DATA;
const pagePath = path.join(root, 'skills.html');
const visualsPath = path.join(root, 'skills-visuals.js');
if (!data || !Array.isArray(data.skills) || !Array.isArray(data.skillCategories)) {
  throw new Error('site-data.js 未提供 skills 或 skillCategories');
}

const esc = (value) => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const replaceRegion = (source, name, content) => {
  const start = `<!-- GENERATED:${name}:START -->`;
  const end = `<!-- GENERATED:${name}:END -->`;
  const pattern = new RegExp(`${start.replace(/[.*+?^$()|[\\]\\]/g, '\\$&')}[\\s\\S]*?${end.replace(/[.*+?^$()|[\\]\\]/g, '\\$&')}`);
  if (!pattern.test(source)) throw new Error(`skills.html 缺少生成区：${name}`);
  return source.replace(pattern, `${start}\n${content}\n${end}`);
};

const skillProfiles = data.skillProfiles || {};
const publicSkills = data.skills
  .filter((item) => item.visibility === 'public' && skillProfiles[item.id]?.showcase)
  .map((item) => ({ ...item, ...skillProfiles[item.id] }));
const categories = [...data.skillCategories]
  .filter((category) => publicSkills.some((item) => item.category === category.id))
  .sort((a, b) => a.order - b.order);
const categoryById = new Map(categories.map((category) => [category.id, category]));
const directory = categories.map((category) => {
  const count = publicSkills.filter((item) => item.category === category.id).length;
  return `      <a href="#skill-${esc(category.id)}"><i>${String(category.order).padStart(2, '0')}</i><span><b>${esc(category.title)}</b><small>${count} 项</small></span></a>`;
}).join('\n');
const sections = categories.map((category) => {
  const items = publicSkills
    .filter((item) => item.category === category.id)
    .sort((a, b) => a.order - b.order);
  const rows = items.map((item) => {
    const tags = item.tags.map((tag) => `<span>${esc(tag)}</span>`).join('');
    return `        <a class="skill-index-row" data-skill-id="${esc(item.id)}" href="#skill-view-${esc(item.id)}" aria-label="查看 ${esc(item.title)} 的真实 Skill 介绍"><i>${String(item.order).padStart(2, '0')}</i><div><header><h3>${esc(item.title)}</h3><em>${esc(item.maturity)}</em></header><p>${esc(item.summary)}</p><footer><div>${tags}</div><strong>看它从哪里长出来 →</strong></footer></div></a>`;
  }).join('\n');
  return `    <section class="skill-index-section" id="skill-${esc(category.id)}" style="--skill-no:'${String(category.order).padStart(2, '0')}'"><header><div><small>FIELD ${String(category.order).padStart(2, '0')}</small><h2>${esc(category.title)}</h2></div><p>${esc(category.note)}</p><strong>${items.length}</strong></header><div class="skill-index-list">\n${rows}\n      </div></section>`;
}).join('\n\n');
const details = publicSkills.map((item, itemIndex) => {
  const category = categoryById.get(item.category);
  const nextItem = publicSkills[(itemIndex + 1) % publicSkills.length];
  const github = data.skillGitHub?.[item.id];
  const facts = [
    ['为什么做', item.origin],
    ['什么时候会用', item.trigger],
    ['最难守住什么', item.judgment],
    ['现在真实留下什么', item.realResult],
    ['公开边界', item.limitations],
  ].map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('');
  const tags = item.tags.map((tag) => `<span>${esc(tag)}</span>`).join('');
  const githubLink = github
    ? `<a class="skill-view-github" href="${esc(github.href)}" target="_blank" rel="noopener"><small>GitHub / ${esc(github.kind)}</small><strong>${esc(github.label)} ↗</strong><span>${esc(github.note)}</span></a>`
    : '';
  const relatedLink = item.href
    ? `<a class="skill-view-project" href="${esc(item.href)}"><small>相关作品</small><span>${esc(item.action)} →</span></a>`
    : `<p class="skill-view-status"><small>公开状态</small><span>${esc(item.evidenceStatus)}</span></p>`;
  const nextLink = `<a class="skill-view-next" href="#skill-view-${esc(nextItem.id)}"><small>下一个 Skill</small><span>${esc(nextItem.title)} →</span></a>`;
  const actions = `<div class="skill-view-actions">${githubLink}${relatedLink}${nextLink}<a class="skill-view-return" href="#skill-${esc(item.category)}">返回 Skill 索引</a></div>`;
  return `  <section class="skill-view" id="skill-view-${esc(item.id)}" aria-label="${esc(item.title)} 的真实 Skill 介绍"><a class="skill-view-backdrop" href="#skill-${esc(item.category)}" aria-label="关闭 Skill 展示"></a><article><header><div><small>FIELD ${String(category?.order || 0).padStart(2, '0')} / ${esc(category?.title || '')} / ${esc(item.ownership)}</small><em>${esc(item.maturity)}</em></div><a class="skill-view-close" href="#skill-${esc(item.category)}" aria-label="返回 ${esc(category?.title || '')} Skill 索引">返回索引 ×</a></header><div class="skill-view-heading"><i>${String(item.order).padStart(2, '0')}</i><div><h2>${esc(item.title)}</h2><p>${esc(item.summary)}</p></div></div><dl class="skill-view-facts">${facts}</dl><footer><div class="skill-view-tags">${tags}</div>${actions}</footer></article></section>`;
}).join('\n');
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Loki 的 Skill 索引',
  url: 'https://loki-os.hiloki.ai/skills.html',
  numberOfItems: publicSkills.length,
  itemListElement: publicSkills.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.title,
    description: item.summary,
  })),
};
const publicVisuals = Object.fromEntries(publicSkills.map((item) => [item.id, item.visual || data.skillVisuals?.[item.id]]));
const visualsScript = [
  '(() => {',
  '  const visuals = ' + JSON.stringify(publicVisuals, null, 2) + ';',
  "  for (const section of document.querySelectorAll('.skill-view')) {",
  "    const skillId = section.id.replace('skill-view-', '');",
  '    const visual = visuals[skillId];',
  "    const heading = section.querySelector('.skill-view-heading');",
  "    if (!visual || !heading || section.querySelector('.skill-view-media')) continue;",
  "    const intro = document.createElement('div');",
  "    intro.className = 'skill-view-intro';",
  '    heading.before(intro);',
  '    intro.append(heading);',
  "    const figure = document.createElement('figure');",
  "    const isProcess = visual.kind === 'process';",
  "    figure.className = isProcess ? 'skill-view-media is-process motif-' + visual.motif : 'skill-view-media is-' + visual.imageFit;",
  "    if (isProcess) {",
  "      figure.setAttribute('aria-label', visual.caption);",
  "      const diagram = document.createElement('div');",
  "      diagram.className = 'skill-view-process';",
  "      const route = Array.from(section.querySelectorAll('.skill-view-facts dd'), (node) => node.textContent.trim()).slice(0, 3);",
  "      route.forEach((text, index) => {",
  "        const card = document.createElement('div');",
  "        const no = document.createElement('i');",
  "        no.textContent = '0' + (index + 1);",
  "        const value = document.createElement('span');",
  "        value.textContent = text;",
  "        card.append(no, value);",
  "        diagram.append(card);",
  "      });",
  "      figure.append(diagram);",
  "    } else {",
  "      const imageLink = document.createElement('a');",
  "      imageLink.className = 'skill-view-media-open';",
  '      imageLink.href = visual.image;',
  "      imageLink.target = '_blank';",
  "      imageLink.rel = 'noopener';",
  "      imageLink.setAttribute('aria-label', '查看完整图片：' + visual.imageAlt);",
  "      const image = document.createElement('img');",
  '      image.src = visual.image;',
  '      image.alt = visual.imageAlt;',
  '      image.width = visual.imageWidth;',
  '      image.height = visual.imageHeight;',
  "      image.loading = 'lazy';",
  "      image.decoding = 'async';",
  '      imageLink.append(image);',
  '      figure.append(imageLink);',
  '    }',
  "    const caption = document.createElement('figcaption');",
  "    caption.textContent = isProcess ? visual.caption + ' · 过程示意，不是运行截图' : visual.caption;",
  '    figure.append(caption);',
  '    intro.append(figure);',
  '  }',
  '})();',
  '',
].join('\n');

let source = readFileSync(pagePath, 'utf8');
let rendered = replaceRegion(source, 'SKILLS_META', `      <small>SKILL INDEX / ${publicSkills.length} 项 / ${categories.length} 个领域 / 更新于 ${esc(data.updatedAt)}</small>`);
rendered = replaceRegion(rendered, 'SKILLS_DIRECTORY', directory);
rendered = replaceRegion(rendered, 'SKILLS_SECTIONS', sections);
rendered = replaceRegion(rendered, 'SKILLS_DETAILS', details);
rendered = replaceRegion(rendered, 'SKILLS_JSON_LD', `  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`);

if (process.argv.includes('--check')) {
  const currentVisuals = existsSync(visualsPath) ? readFileSync(visualsPath, 'utf8') : '';
  if (rendered !== source || currentVisuals !== visualsScript) {
    console.error('skills.html 与 site-data.js 不一致，请运行 npm run render:skills');
    process.exit(1);
  }
  console.log(`Skill 索引同步检查通过：${publicSkills.length} 项，${categories.length} 个领域`);
} else {
  writeFileSync(pagePath, rendered);
  writeFileSync(visualsPath, visualsScript);
  console.log(`已更新 skills.html：${publicSkills.length} 项，${categories.length} 个领域`);
}
