import { readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(path.join(repoRoot, 'site-data.js'), 'utf8');
const context = { window: {} };
vm.runInNewContext(source, context, { filename: 'site-data.js' });
const caseSource = readFileSync(path.join(repoRoot, 'projects', 'case-data.js'), 'utf8');
vm.runInNewContext(caseSource, context, { filename: 'projects/case-data.js' });

const data = context.window.LOKI_OS_SITE_DATA;
const errors = [];
if (!data || !Array.isArray(data.projects)) errors.push('site-data.js 必须提供 projects 数组');
if (!Array.isArray(data?.gearModules) || data.gearModules.length < 8) errors.push('site-data.js 必须提供至少 8 个 gearModules');
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
  for (const field of ['id', 'date', 'title', 'summary', 'tag', 'action', 'linkStatus', 'visibility']) {
    if (!project[field] || typeof project[field] !== 'string') errors.push(`${label}.${field} 缺失`);
  }
  if (ids.has(project.id)) errors.push(`${label}.id 重复：${project.id}`);
  ids.add(project.id);
  if (!/^\d{2}-\d{2}$/.test(project.date || '')) errors.push(`${label}.date 必须是 MM-DD`);
  if (!['public', 'private'].includes(project.visibility)) errors.push(`${label}.visibility 只能是 public/private`);
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

console.log(`站点数据校验通过：${data.projects.length} 个项目、${data.gearModules.length} 个器材模块、${people.length} 个人物案例，更新于 ${data.updatedAt}`);
