#!/usr/bin/env node
/**
 * 把 dev/qa 产出的成品图登记表并入 public-data.js 的 skillImages。
 * 用法：node wire-skill-images.mjs <public-data.js> <skill-artifacts-*.json>...
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const [target, ...reports] = process.argv.slice(2);
if (!target || reports.length === 0) {
  console.error('用法：node wire-skill-images.mjs public-data.js report.json [report2.json ...]');
  process.exit(1);
}

const entries = {};
for (const report of reports) {
  if (!existsSync(report)) {
    console.error(`跳过（不存在）：${report}`);
    continue;
  }
  for (const item of JSON.parse(readFileSync(report, 'utf8'))) {
    if (item.status !== 'ok' || !item.file) continue;
    entries[item.id] = { image: item.file, caption: item.caption };
  }
}

let source = readFileSync(target, 'utf8');
const marker = '"skillImages": {';
const start = source.indexOf(marker);
if (start < 0) throw new Error('找不到 skillImages 区块');
const open = source.indexOf('{', start + marker.length - 1);
let depth = 0;
let end = -1;
for (let i = open; i < source.length; i += 1) {
  if (source[i] === '{') depth += 1;
  else if (source[i] === '}') {
    depth -= 1;
    if (depth === 0) {
      end = i;
      break;
    }
  }
}

const current = JSON.parse(source.slice(open, end + 1));
const merged = { ...current, ...entries };
const body = JSON.stringify(merged, null, 2)
  .split('\n')
  .map((line, i) => (i === 0 ? line : `  ${line}`))
  .join('\n');

writeFileSync(target, source.slice(0, open) + body + source.slice(end + 1));
console.log(`写入 ${Object.keys(entries).length} 条，skillImages 现共 ${Object.keys(merged).length} 条`);
