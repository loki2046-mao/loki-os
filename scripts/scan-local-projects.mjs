import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, lstatSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const defaultRoots = [
  '/Users/kude/Projects',
  '/Users/kude/cola/outputs/01-长期项目',
  '/Users/kude/cola/outputs/02-项目快照/项目',
];
const roots = (process.env.LOKI_SCAN_ROOTS || defaultRoots.join(path.delimiter))
  .split(path.delimiter)
  .filter(Boolean);
const ignoredNames = new Set(['.git', 'node_modules', 'dist', 'build', '.next', '.cache', 'fonts']);

function newestMtime(directory, depth = 0) {
  let newest = statSync(directory).mtimeMs;
  if (depth >= 2) return newest;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (ignoredNames.has(entry.name) || entry.name.startsWith('.')) continue;
    const entryPath = path.join(directory, entry.name);
    const info = lstatSync(entryPath);
    if (info.isSymbolicLink()) continue;
    newest = Math.max(newest, info.mtimeMs);
    if (info.isDirectory()) newest = Math.max(newest, newestMtime(entryPath, depth + 1));
  }
  return newest;
}

function gitRemote(directory) {
  try {
    return execFileSync('git', ['-C', directory, 'config', '--get', 'remote.origin.url'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim() || null;
  } catch {
    return null;
  }
}

const candidates = [];
for (const root of roots) {
  let entries = [];
  try {
    entries = readdirSync(root, { withFileTypes: true });
  } catch {
    continue;
  }
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
    const sourcePath = path.join(root, entry.name);
    const updatedAt = new Date(newestMtime(sourcePath));
    candidates.push({
      name: entry.name,
      sourcePath,
      sourceRoot: root,
      updatedAt: updatedAt.toISOString(),
      gitRemote: gitRemote(sourcePath),
      visibility: 'review-required',
      publishState: 'candidate',
    });
  }
}

candidates.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
const outputDir = path.join(repoRoot, '.loki-os-local');
mkdirSync(outputDir, { recursive: true });
const outputPath = path.join(outputDir, 'project-candidates.json');
writeFileSync(outputPath, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  notice: '本文件包含本机路径，只用于人工审核，不得发布。',
  roots,
  candidates: candidates.slice(0, 80),
}, null, 2)}\n`);

console.log(`已生成 ${Math.min(candidates.length, 80)} 个候选：${outputPath}`);
