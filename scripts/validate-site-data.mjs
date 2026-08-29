import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(path.join(repoRoot, 'site-data.js'), 'utf8');
const worksSource = readFileSync(path.join(repoRoot, 'works.html'), 'utf8');
const context = { window: {} };
vm.runInNewContext(source, context, { filename: 'site-data.js' });
const caseSource = readFileSync(path.join(repoRoot, 'projects', 'case-data.js'), 'utf8');
vm.runInNewContext(caseSource, context, { filename: 'projects/case-data.js' });

const data = context.window.LOKI_OS_SITE_DATA;
const errors = [];
const htmlEscaped = (value) => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const allowedGroups = new Set(['flagship', 'workflow', 'productization', 'personal-practice']);
const allowedVerificationStatuses = new Set(['verified', 'pending', 'not-applicable']);
const generatedRegion = (name) => {
  const start = `<!-- GENERATED:${name}:START -->`;
  const end = `<!-- GENERATED:${name}:END -->`;
  const startAt = worksSource.indexOf(start);
  const endAt = worksSource.indexOf(end);
  if (startAt < 0 || endAt < 0 || endAt < startAt) {
    errors.push(`works.html 缺少或破坏生成区：${name}`);
    return '';
  }
  return worksSource.slice(startAt, endAt + end.length);
};
if (!data || !Array.isArray(data.projects)) errors.push('site-data.js 必须提供 projects 数组');
if (!Array.isArray(data?.gearModules) || data.gearModules.length < 8) errors.push('site-data.js 必须提供至少 8 个 gearModules');
if (!Array.isArray(data?.pillars) || data.pillars.length !== 3) errors.push('site-data.js 必须提供 3 条长期主线');
if (!Array.isArray(data?.featuredProjectIds) || data.featuredProjectIds.length !== 3) errors.push('featuredProjectIds 必须提供 3 个旗舰项目');
if (!Array.isArray(data?.proofStrip) || data.proofStrip.length !== 3) errors.push('proofStrip 必须提供 3 条旗舰证据');
if (!['unverified', 'verified'].includes(data?.publicationStatus)) errors.push('publicationStatus 必须是 unverified/verified');
if (!/^\d{4}-\d{2}-\d{2}$/.test(data?.updatedAt || '')) errors.push('updatedAt 必须是 YYYY-MM-DD');

const ids = new Set();
const gearIds = new Set();
for (const [index, module] of (data?.gearModules || []).entries()) {
  const label = `gearModules[${index}]`;
  for (const field of ['id', 'code', 'title', 'readout', 'proof', 'href', 'action', 'image']) {
    if (!module[field] || typeof module[field] !== 'string') errors.push(`${label}.${field} 缺失`);
  }
  if (!Array.isArray(module.tags) || module.tags.length < 2) errors.push(`${label}.tags 至少需要 2 项`);
  if (gearIds.has(module.id)) errors.push(`${label}.id 重复：${module.id}`);
  gearIds.add(module.id);
}
for (const [index, project] of (data?.projects || []).entries()) {
  const label = `projects[${index}]`;
  for (const field of ['id', 'date', 'title', 'summary', 'tag', 'href', 'action', 'linkStatus', 'visibility', 'group', 'accent', 'eyebrow', 'image', 'imageAlt', 'proof', 'status']) {
    if (!project[field] || typeof project[field] !== 'string') errors.push(`${label}.${field} 缺失`);
  }
  if (!Number.isInteger(project.order) || project.order < 1) errors.push(`${label}.order 必须是正整数`);
  if (!Number.isInteger(project.imageWidth) || project.imageWidth < 1) errors.push(`${label}.imageWidth 必须是正整数`);
  if (!Number.isInteger(project.imageHeight) || project.imageHeight < 1) errors.push(`${label}.imageHeight 必须是正整数`);
  if (!['cover', 'contain'].includes(project.imageFit)) errors.push(`${label}.imageFit 只能是 cover/contain`);
  if (ids.has(project.id)) errors.push(`${label}.id 重复：${project.id}`);
  ids.add(project.id);
  if (!/^\d{2}-\d{2}$/.test(project.date || '')) errors.push(`${label}.date 必须是 MM-DD`);
  if (!['public', 'private'].includes(project.visibility)) errors.push(`${label}.visibility 只能是 public/private`);
  if (!allowedGroups.has(project.group)) errors.push(`${label}.group 无效：${project.group}`);
  if (!['external', 'internal', 'pending'].includes(project.linkStatus)) {
    errors.push(`${label}.linkStatus 只能是 external/internal/pending`);
  }
  if (project.linkStatus === 'external') {
    try {
      const url = new URL(project.href);
      if (url.protocol !== 'https:') errors.push(`${label}.href 必须使用 https`);
    } catch {
      errors.push(`${label}.href 不是有效网址`);
    }
  }
  if (project.linkStatus === 'internal' && !/^\.\/projects\/[a-z0-9-]+\.html$/.test(project.href || '')) {
    errors.push(`${label}.href 必须指向 ./projects/ 下的 HTML 页面`);
  }
  if (project.linkStatus === 'pending' && project.href) errors.push(`${label}.pending 项目不得配置 href`);
  if (project.image && !existsSync(path.resolve(repoRoot, project.image))) errors.push(`${label}.image 文件不存在：${project.image}`);
  if (!project.verification || typeof project.verification !== 'object') {
    errors.push(`${label}.verification 缺失`);
  } else {
    for (const field of ['status', 'checkedAt', 'scope', 'note']) {
      if (!project.verification[field] || typeof project.verification[field] !== 'string') errors.push(`${label}.verification.${field} 缺失`);
    }
    if (!allowedVerificationStatuses.has(project.verification.status)) errors.push(`${label}.verification.status 无效：${project.verification.status}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(project.verification.checkedAt || '')) errors.push(`${label}.verification.checkedAt 必须是 YYYY-MM-DD`);
    if (project.verification.status === 'pending' && !/(待|补充|复核)/.test(project.verification.note)) {
      errors.push(`${label}.verification.note 必须记录尚待完成的核验边界`);
    }
    if (project.verification.status === 'pending' && /(已上线|已核验)/.test(`${project.status} ${project.proof}`)) {
      errors.push(`${label} 尚待核验，却仍声明“已上线/已核验”`);
    }
    if (/(已复核|核验：)/.test(`${project.status} ${project.proof}`)) {
      errors.push(`${label} 的访客文案不得直接暴露内部核验术语`);
    }
  }
  if (project.publicLink) {
    for (const field of ['href', 'label', 'status', 'checkedAt']) {
      if (!project.publicLink[field] || typeof project.publicLink[field] !== 'string') errors.push(`${label}.publicLink.${field} 缺失`);
    }
    if (!['verified', 'pending'].includes(project.publicLink.status)) errors.push(`${label}.publicLink.status 只能是 verified/pending`);
    if (!/^https:\/\//.test(project.publicLink.href || '')) errors.push(`${label}.publicLink.href 必须使用 https`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(project.publicLink.checkedAt || '')) errors.push(`${label}.publicLink.checkedAt 必须是 YYYY-MM-DD`);
    if (project.publicLink.status === 'pending' && !/(暂未|尚未|等待|不可用)/.test(project.publicLink.label)) errors.push(`${label}.publicLink.label 必须用访客语言说明尚不可用`);
    if (/(已复核|待复核|核验)/.test(project.publicLink.label)) errors.push(`${label}.publicLink.label 不得使用内部核验术语`);
    const casePath = path.resolve(repoRoot, project.href.replace(/^\.\//, ''));
    const casePage = existsSync(casePath) ? readFileSync(casePath, 'utf8') : '';
    if (!casePage.includes(project.publicLink.href)) errors.push(`${label} 案例页缺少登记的 publicLink.href`);
    if (!casePage.includes(project.publicLink.label)) errors.push(`${label} 案例页缺少登记的公开入口标签：${project.publicLink.label}`);
  }
  if (project.group === 'workflow') {
    if (!project.systemKind) errors.push(`${label}.systemKind 缺失，无法说明属于哪类系统`);
    if (!Array.isArray(project.systemEvidence) || project.systemEvidence.length < 3) errors.push(`${label}.systemEvidence 至少需要 3 条可见证据`);
  }

  const marker = `data-project-id="${project.id}"`;
  const expectedMarkerCount = project.visibility === 'public' ? 1 : 0;
  const markerCount = worksSource.split(marker).length - 1;
  if (markerCount !== expectedMarkerCount) {
    errors.push(`works.html 中 ${project.id} 的项目卡片应出现 ${expectedMarkerCount} 次，当前 ${markerCount} 次`);
  } else if (project.visibility === 'public') {
    const markerAt = worksSource.indexOf(marker);
    const cardStart = worksSource.lastIndexOf('<a class="work-ticket"', markerAt);
    const cardEnd = worksSource.indexOf('</a>', markerAt);
    const card = worksSource.slice(cardStart, cardEnd + 4);
    for (const [field, value] of [['href', project.href], ['title', project.title], ['summary', project.summary], ['image', project.image], ['proof', project.proof], ['status', project.status]]) {
      if (!card.includes(value) && !card.includes(htmlEscaped(value))) errors.push(`works.html 的 ${project.id} 与 site-data.js 的 ${field} 不一致`);
    }
  }
  const groupRegionName = `WORKS_${project.group.replaceAll('-', '_').toUpperCase()}`;
  const isInGroupRegion = generatedRegion(groupRegionName).includes(marker);
  if (project.visibility === 'public' && !isInGroupRegion) errors.push(`${label}.group=${project.group} 与 works.html 实际区块不一致`);
  if (project.visibility === 'private' && isInGroupRegion) errors.push(`${label} 已设为 private，仍出现在 works.html 项目卡片中`);
  if (project.id === 'daily-insight' && /证明/.test(project.proof)) errors.push(`${label}.proof 为展览导览图，不得使用“证明”口径`);
}

const registeredIds = new Set((data?.projects || []).map((project) => project.id));
const projectById = new Map((data?.projects || []).map((project) => [project.id, project]));
const pillarAnchorProjects = (projects, pillar) => {
  const anchor = pillar.href?.startsWith('#') ? pillar.href.slice(1) : '';
  const directOwners = projects.filter((project) => project.anchor === anchor);
  return directOwners.length ? directOwners : projects.filter((project) => project.group === anchor);
};
const publicPillarAnchorProjects = (projects, pillar) => {
  const referencedIds = new Set(pillar.projectIds || []);
  return pillarAnchorProjects(projects, pillar)
    .filter((project) => project.visibility === 'public' && referencedIds.has(project.id));
};
for (const match of worksSource.matchAll(/data-project-id="([^"]+)"/g)) {
  if (!registeredIds.has(match[1])) errors.push(`works.html 出现未登记的 data-project-id：${match[1]}`);
}
for (const projectId of (data?.featuredProjectIds || [])) {
  const project = projectById.get(projectId);
  if (!project) errors.push(`featuredProjectIds 引用了不存在的项目：${projectId}`);
  else {
    if (project.group !== 'flagship') errors.push(`featuredProjectIds 的 ${projectId} 不属于 flagship`);
    if (project.visibility !== 'public') errors.push(`featuredProjectIds 的 ${projectId} 必须是 public`);
  }
}
const expectedPillarHrefs = ['#case-inkpanda', '#case-interface-system', '#workflow'];
const routesRegion = generatedRegion('WORKS_ROUTES');
for (const [index, pillar] of (data?.pillars || []).entries()) {
  const label = `pillars[${index}]`;
  for (const field of ['id', 'href', 'title', 'summary']) {
    if (!pillar[field] || typeof pillar[field] !== 'string') errors.push(`${label}.${field} 缺失`);
  }
  if (pillar.href !== expectedPillarHrefs[index]) errors.push(`pillars[${index}].href 应为 ${expectedPillarHrefs[index]}，当前为 ${pillar.href}`);
  if (!Array.isArray(pillar.projectIds) || !pillar.projectIds.length) {
    errors.push(`${label}.projectIds 至少需要 1 个项目`);
    continue;
  }
  const referencedProjects = pillar.projectIds.map((projectId) => projectById.get(projectId));
  for (const [projectIndex, project] of referencedProjects.entries()) {
    if (!project) errors.push(`${label}.projectIds[${projectIndex}] 引用了不存在的项目：${pillar.projectIds[projectIndex]}`);
  }
  const anchor = pillar.href.startsWith('#') ? pillar.href.slice(1) : '';
  const anchorProjects = pillarAnchorProjects(data?.projects || [], pillar);
  if (!anchorProjects.length) errors.push(`${label}.href 没有对应的项目锚点或公开分组：${pillar.href}`);
  const publicAnchorProjects = publicPillarAnchorProjects(data?.projects || [], pillar);
  const shouldRender = publicAnchorProjects.length > 0;
  const routeMarker = `href="${pillar.href}"`;
  const markerCount = routesRegion.split(routeMarker).length - 1;
  const expectedCount = shouldRender ? 1 : 0;
  if (markerCount !== expectedCount) errors.push(`${label} 的公开主线入口应出现 ${expectedCount} 次，当前 ${markerCount} 次`);
  if (markerCount > 0 && !worksSource.includes(`id="${anchor}"`)) errors.push(`${label}.href 对应的公开锚点不存在：${pillar.href}`);
  if (markerCount > 0 && !publicAnchorProjects.length) errors.push(`${label}.href 必须属于当前 public 项目：${pillar.href}`);
}

let mixedPillarScenarioCount = 0;
for (const pillar of (data?.pillars || [])) {
  const directOwners = (data?.projects || []).filter((project) => project.anchor && pillar.href === `#${project.anchor}`);
  const privateTarget = directOwners[0];
  const otherPublicProject = (data?.projects || []).find((project) => project.visibility === 'public' && project.id !== privateTarget?.id);
  if (!privateTarget || !otherPublicProject) continue;
  const simulatedProjects = (data?.projects || []).map((project) => project.id === privateTarget.id
    ? { ...project, visibility: 'private' }
    : project);
  const mixedPillar = { ...pillar, projectIds: [privateTarget.id, otherPublicProject.id] };
  mixedPillarScenarioCount += 1;
  if (publicPillarAnchorProjects(simulatedProjects, mixedPillar).length) {
    errors.push(`混合 pillar 场景失败：${pillar.href} 指向 private 项目 ${privateTarget.id}，不得被其他 public 项目带回公开入口`);
  }
}
if (!mixedPillarScenarioCount) errors.push('缺少可执行的 public/private 混合 pillar 场景');

const proofProjectIds = new Set();
const proofImages = new Set();
const proofRegion = generatedRegion('WORKS_PROOF_STRIP');
for (const [index, item] of (data?.proofStrip || []).entries()) {
  const label = `proofStrip[${index}]`;
  for (const field of ['projectId', 'href', 'title', 'image', 'imageAlt', 'caption', 'imageFit']) {
    if (!item[field] || typeof item[field] !== 'string') errors.push(`${label}.${field} 缺失`);
  }
  if (!Number.isInteger(item.imageWidth) || item.imageWidth < 1) errors.push(`${label}.imageWidth 必须是正整数`);
  if (!Number.isInteger(item.imageHeight) || item.imageHeight < 1) errors.push(`${label}.imageHeight 必须是正整数`);
  if (!existsSync(path.resolve(repoRoot, item.image || ''))) errors.push(`${label}.image 文件不存在：${item.image}`);
  if (proofProjectIds.has(item.projectId)) errors.push(`${label}.projectId 重复：${item.projectId}`);
  if (proofImages.has(item.image)) errors.push(`${label}.image 重复：${item.image}`);
  proofProjectIds.add(item.projectId);
  proofImages.add(item.image);
  const project = projectById.get(item.projectId);
  if (!project) {
    errors.push(`${label}.projectId 引用了不存在的项目：${item.projectId}`);
  } else {
    if (project.group !== 'flagship') errors.push(`${label}.projectId 必须属于 flagship：${item.projectId}`);
    if (project.visibility !== 'public') errors.push(`${label}.projectId 必须是 public：${item.projectId}`);
    if (project.image === item.image) errors.push(`${label}.image 与 ${item.projectId} 旗舰卡片重复`);
    if (item.href !== project.href) errors.push(`${label}.href 必须与 ${item.projectId} 的站内案例页一致`);
    const proofMarker = `data-proof-project="${item.projectId}"`;
    const markerCount = proofRegion.split(proofMarker).length - 1;
    const expectedCount = project.visibility === 'public' ? 1 : 0;
    if (markerCount !== expectedCount) errors.push(`${label} 的公开证据条应出现 ${expectedCount} 次，当前 ${markerCount} 次`);
  }
}
for (const projectId of (data?.featuredProjectIds || [])) {
  if (!proofProjectIds.has(projectId)) errors.push(`proofStrip 缺少旗舰项目：${projectId}`);
}

const jsonLdRegion = generatedRegion('WORKS_JSON_LD');
const jsonLdMatch = jsonLdRegion.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!jsonLdMatch) {
  errors.push('works.html 缺少 CollectionPage JSON-LD');
} else {
  try {
    const jsonLd = JSON.parse(jsonLdMatch[1]);
    const publicProjects = (data?.projects || []).filter((project) => project.visibility === 'public');
    const privateProjects = (data?.projects || []).filter((project) => project.visibility === 'private');
    if (!Array.isArray(jsonLd.hasPart) || jsonLd.hasPart.length !== publicProjects.length) errors.push(`works.html JSON-LD hasPart 应有 ${publicProjects.length} 项`);
    for (const project of publicProjects) {
      if (!jsonLd.hasPart?.some((part) => part.name === project.title)) errors.push(`works.html JSON-LD hasPart 缺少：${project.id}`);
    }
    for (const project of privateProjects) {
      if (jsonLd.hasPart?.some((part) => part.name === project.title)) errors.push(`works.html JSON-LD 不得包含 private 项目：${project.id}`);
    }
  } catch (error) {
    errors.push(`works.html JSON-LD 无法解析：${error.message}`);
  }
}

const caseData = context.window.LOKI_CASE_DATA;
const people = caseData?.perspectiveDistillation?.people;
if (!Array.isArray(people) || people.length < 4) errors.push('case-data.js 至少需要 4 个人物蒸馏案例');
const personIds = new Set();
for (const [index, person] of (people || []).entries()) {
  const label = `perspectiveDistillation.people[${index}]`;
  for (const field of ['id', 'name', 'role', 'version', 'score', 'scoreLabel', 'headline', 'description', 'state', 'tone']) {
    if (!person[field] || typeof person[field] !== 'string') errors.push(`${label}.${field} 缺失`);
  }
  if (!Array.isArray(person.facts) || person.facts.length < 3) errors.push(`${label}.facts 至少需要 3 项`);
  if (personIds.has(person.id)) errors.push(`${label}.id 重复：${person.id}`);
  personIds.add(person.id);
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`站点数据校验通过：${data.projects.length} 个项目、${data.gearModules.length} 个器材模块、${people.length} 个人物案例、${mixedPillarScenarioCount} 个混合 pillar 场景，更新于 ${data.updatedAt}`);
