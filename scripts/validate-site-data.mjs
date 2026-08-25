import { readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(path.join(repoRoot, 'site-data.js'), 'utf8');
const context = { window: {} };
vm.runInNewContext(source, context, { filename: 'site-data.js' });

const data = context.window.LOKI_OS_SITE_DATA;
const errors = [];
if (!data || !Array.isArray(data.projects)) errors.push('site-data.js 必须提供 projects 数组');
if (!['unverified', 'verified'].includes(data?.publicationStatus)) errors.push('publicationStatus 必须是 unverified/verified');
if (!/^\d{4}-\d{2}-\d{2}$/.test(data?.updatedAt || '')) errors.push('updatedAt 必须是 YYYY-MM-DD');

const ids = new Set();
for (const [index, project] of (data?.projects || []).entries()) {
  const label = `projects[${index}]`;
  for (const field of ['id', 'date', 'title', 'summary', 'tag', 'visibility']) {
    if (!project[field] || typeof project[field] !== 'string') errors.push(`${label}.${field} 缺失`);
  }
  if (ids.has(project.id)) errors.push(`${label}.id 重复：${project.id}`);
  ids.add(project.id);
  if (!/^\d{2}-\d{2}$/.test(project.date || '')) errors.push(`${label}.date 必须是 MM-DD`);
  if (!['public', 'private'].includes(project.visibility)) errors.push(`${label}.visibility 只能是 public/private`);
  if (project.visibility === 'public') {
    try {
      const url = new URL(project.href);
      if (url.protocol !== 'https:') errors.push(`${label}.href 必须使用 https`);
    } catch {
      errors.push(`${label}.href 不是有效网址`);
    }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`site-data.js 校验通过：${data.projects.length} 个项目，状态 ${data.publicationStatus}，更新于 ${data.updatedAt}`);
