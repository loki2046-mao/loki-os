import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = { window: {} };
vm.runInNewContext(readFileSync(path.join(root, 'site-data.js'), 'utf8'), context, { filename: 'site-data.js' });
const data = context.window.LOKI_OS_SITE_DATA;
const worksPath = path.join(root, 'works.html');
if (!data || !Array.isArray(data.projects)) throw new Error('site-data.js 未提供 projects 数组');

const esc = (value) => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const scopeLabels = { 'local-browser': '本地浏览器', 'external-browser': '公开入口', 'release-page': '发布页' };

function systemEvidence(project) {
  if (!project.systemEvidence?.length) return '';
  const items = project.systemEvidence.map((item) => `<li><b>${esc(item.label)}</b><span>${esc(item.value)}</span></li>`).join('');
  return `<div class="system-evidence"><strong>${esc(project.systemKind)}</strong><ul>${items}</ul></div>`;
}

function card(project) {
  const anchor = project.anchor ? ` id="${esc(project.anchor)}"` : '';
  const verification = project.verification || {};
  const scope = scopeLabels[verification.scope] || verification.scope || '未记录';
  const pending = verification.status === 'pending' ? ' is-pending' : '';
  const imageClass = project.imageFit === 'contain' ? ' class="is-contain"' : '';
  return `      <a class="work-ticket"${anchor} data-project-id="${esc(project.id)}" data-status="${esc(project.status)}" style="--ticket:${esc(project.accent)}" href="${esc(project.href)}"><i>${String(project.order).padStart(2, '0')}</i><div><h2>${esc(project.title)}</h2><small>${esc(project.eyebrow)}</small></div><figure class="work-thumb"><img${imageClass} src="${esc(project.image)}" alt="${esc(project.imageAlt)}" width="${project.imageWidth}" height="${project.imageHeight}" loading="lazy"><figcaption>${esc(project.proof)}</figcaption></figure><div class="work-copy"><p>${esc(project.summary)}</p>${systemEvidence(project)}</div><div class="work-status${pending}"><span>${esc(project.status)}</span><small>核验：${esc(scope)} · ${esc(verification.checkedAt)}</small></div></a>`;
}

const publicProjectIds = (siteData) => new Set(siteData.projects
  .filter((project) => project.visibility === 'public')
  .map((project) => project.id));
const pillarAnchorProjects = (siteData, pillar) => {
  const anchor = pillar.href?.startsWith('#') ? pillar.href.slice(1) : '';
  const directOwners = siteData.projects.filter((project) => project.anchor === anchor);
  return directOwners.length ? directOwners : siteData.projects.filter((project) => project.group === anchor);
};
const pillarHasPublicAnchor = (siteData, pillar) => {
  const referencedIds = new Set(pillar.projectIds || []);
  return pillarAnchorProjects(siteData, pillar)
    .some((project) => project.visibility === 'public' && referencedIds.has(project.id));
};
const cards = (siteData, group) => siteData.projects
  .filter((project) => project.visibility === 'public' && project.group === group)
  .sort((a, b) => a.order - b.order).map(card).join('\n');
const routes = (siteData) => {
  return siteData.pillars
  .filter((pillar) => pillarHasPublicAnchor(siteData, pillar))
  .map((pillar) => `          <a href="${esc(pillar.href)}"><span>${esc(pillar.title)}<small>${esc(pillar.summary)}</small></span></a>`).join('\n');
};
const proofStrip = (siteData) => {
  const publicIds = publicProjectIds(siteData);
  return siteData.proofStrip.filter((item) => publicIds.has(item.projectId)).map((item) => {
  const imageClass = item.imageFit === 'contain' ? ' class="is-contain"' : '';
  return `      <a href="${esc(item.href)}" data-proof-project="${esc(item.projectId)}"><figure><img${imageClass} src="${esc(item.image)}" alt="${esc(item.imageAlt)}" width="${item.imageWidth}" height="${item.imageHeight}"><figcaption><b>${esc(item.title)}</b><span>${esc(item.caption)}</span></figcaption></figure></a>`;
  }).join('\n');
};
const jsonLdObject = (siteData) => {
  const hasPart = siteData.projects.filter((project) => project.visibility === 'public').sort((a, b) => a.order - b.order)
    .map((project) => ({ '@type': 'CreativeWork', name: project.title, url: new URL(project.href, 'https://loki-os.hiloki.ai/').href, description: project.summary }));
  return { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Loki 的代表项目', url: 'https://loki-os.hiloki.ai/works.html', inLanguage: 'zh-CN', dateModified: siteData.updatedAt, about: { '@type': 'Person', name: 'Loki' }, hasPart };
};
const jsonLd = (siteData) => `  <script type="application/ld+json">${JSON.stringify(jsonLdObject(siteData))}</script>`;

function replaceRegion(source, name, content) {
  const start = `<!-- GENERATED:${name}:START -->`;
  const end = `<!-- GENERATED:${name}:END -->`;
  const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
  if (!pattern.test(source)) throw new Error(`works.html 缺少生成标记：${name}`);
  return source.replace(pattern, `${start}\n${content}\n${end}`);
}

function buildRegions(siteData) {
  const publicIds = publicProjectIds(siteData);
  const publicCount = publicIds.size;
  const publicFeaturedCount = siteData.featuredProjectIds.filter((projectId) => publicIds.has(projectId)).length;
  return {
    WORKS_JSON_LD: jsonLd(siteData),
    WORKS_SETLIST: `        <small>PUBLIC SETLIST / ${publicCount} PUBLIC CASES / ${publicFeaturedCount} FLAGSHIP PROJECTS / UPDATED ${esc(siteData.updatedAt)}</small>`,
    WORKS_ROUTES: routes(siteData),
    WORKS_PROOF_STRIP: proofStrip(siteData),
    WORKS_FLAGSHIP: cards(siteData, 'flagship'),
    WORKS_WORKFLOW: cards(siteData, 'workflow'),
    WORKS_PRODUCTIZATION: cards(siteData, 'productization'),
    WORKS_PERSONAL_PRACTICE: cards(siteData, 'personal-practice'),
  };
}

const current = readFileSync(worksPath, 'utf8');
const regions = buildRegions(data);
const rendered = Object.entries(regions).reduce((source, [name, content]) => replaceRegion(source, name, content), current);
const publicCount = publicProjectIds(data).size;

function simulatePrivate(projectId) {
  const target = data.projects.find((project) => project.id === projectId);
  if (!target) throw new Error(`private 模拟找不到项目：${projectId}`);
  const simulatedData = {
    ...data,
    projects: data.projects.map((project) => project.id === projectId ? { ...project, visibility: 'private' } : project),
  };
  const simulatedRegions = buildRegions(simulatedData);
  const cardRegions = ['WORKS_FLAGSHIP', 'WORKS_WORKFLOW', 'WORKS_PRODUCTIZATION', 'WORKS_PERSONAL_PRACTICE']
    .map((name) => simulatedRegions[name]).join('\n');
  const leaked = [];
  if (cardRegions.includes(`data-project-id="${projectId}"`)) leaked.push('项目卡片');
  if (simulatedRegions.WORKS_PROOF_STRIP.includes(`data-proof-project="${projectId}"`)) leaked.push('证据条');
  if (jsonLdObject(simulatedData).hasPart.some((part) => part.name === target.title)) leaked.push('JSON-LD');
  for (const pillar of data.pillars.filter((item) => item.projectIds?.includes(projectId))) {
    if (!pillarHasPublicAnchor(simulatedData, pillar) && simulatedRegions.WORKS_ROUTES.includes(`href="${pillar.href}"`)) leaked.push(`主线入口 ${pillar.href}`);
  }

  let mixedPillarTests = 0;
  const targetAnchor = target.anchor ? `#${target.anchor}` : '';
  const directPillars = data.pillars.filter((pillar) => pillar.href === targetAnchor);
  const otherPublicProject = simulatedData.projects.find((project) => project.visibility === 'public' && project.id !== projectId);
  for (const pillar of directPillars) {
    if (!otherPublicProject) continue;
    const mixedData = {
      ...simulatedData,
      pillars: simulatedData.pillars.map((item) => item.id === pillar.id
        ? { ...item, projectIds: [projectId, otherPublicProject.id] }
        : item),
    };
    const mixedRoutes = buildRegions(mixedData).WORKS_ROUTES;
    mixedPillarTests += 1;
    if (mixedRoutes.includes(`href="${pillar.href}"`)) leaked.push(`混合场景主线入口 ${pillar.href}`);
  }
  if (leaked.length) throw new Error(`${projectId} 设为 private 后仍出现在：${leaked.join('、')}`);
  return { target, mixedPillarTests };
}

const simulateAt = process.argv.indexOf('--simulate-private');
if (simulateAt >= 0) {
  const projectId = process.argv[simulateAt + 1];
  if (!projectId) throw new Error('--simulate-private 需要项目 ID');
  const { target, mixedPillarTests } = simulatePrivate(projectId);
  console.log(`private 模拟通过：${target.id} 未出现在证据条、主线入口、JSON-LD 或项目卡片中；混合 pillar 场景 ${mixedPillarTests} 项通过；site-data.js 未改写`);
  process.exit(0);
}

if (process.argv.includes('--check-private-visibility')) {
  const publicProjects = data.projects.filter((project) => project.visibility === 'public');
  const mixedPillarTests = publicProjects.reduce((count, project) => count + simulatePrivate(project.id).mixedPillarTests, 0);
  console.log(`private 隔离回归通过：已模拟 ${publicProjects.length} 个公开项目逐一转为 private；混合 pillar 场景 ${mixedPillarTests} 项通过`);
  process.exit(0);
}

if (process.argv.includes('--check')) {
  if (rendered !== current) {
    console.error('works.html 与 site-data.js 不同步；请运行 npm run render:works');
    process.exit(1);
  }
  console.log(`作品页生成校验通过：${publicCount} 个公开案例均来自 site-data.js`);
} else {
  writeFileSync(worksPath, rendered);
  console.log(`已从 site-data.js 生成 works.html：${publicCount} 个公开案例`);
}
