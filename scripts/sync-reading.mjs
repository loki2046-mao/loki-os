import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { readingSummary } from './reading-summary.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ctx = { window: {} };
for (const file of ['public-data.js', 'corpus-data.js', 'process-data.js']) vm.runInNewContext(readFileSync(path.join(root, file), 'utf8'), ctx);
const { bookData: data, lokiCorpus: corpus, lokiProcess: processData } = ctx.window;
const text = readingSummary(corpus.books);
const edits = new Map();
function update(file, object, changes) {
  let source = edits.get(file) || readFileSync(path.join(root, file), 'utf8');
  for (const [key, value] of Object.entries(changes)) {
    if (object[key] === value) continue;
    const before = JSON.stringify(object[key]);
    if (!source.includes(before)) throw new Error(`Cannot locate ${file}: ${key}`);
    source = source.replace(before, JSON.stringify(value));
    object[key] = value;
  }
  edits.set(file, source);
}
const project = data.projects.find(p => p.id === 'daily-insight');
update('public-data.js', project, { summary: text.summary, proof: text.proof, status: text.status });
update('public-data.js', project.systemEvidence.find(x => x.label === '留下记录'), { value: text.saved });
// Verification notes describe reviewed evidence; never advance checkedAt during generation.
update('corpus-data.js', corpus.reading, { scope: text.scope });
const step = processData.book.steps.find(x => x[0] === '连跑本身成了方法的一部分');
update('process-data.js', step, { 1: text.progress });
let html = readFileSync(path.join(root, 'projects/daily-insight.html'), 'utf8');
const escape = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
for (const [key, value] of Object.entries({intro:text.intro,range:`Day 01—${text.latest.day} · 按拆书顺序翻阅`,history:text.history})) {
  const regex = new RegExp(`(data-reading-meta="${key}"[^>]*>)[\\s\\S]*?(</(?:p|i)>)`);
  if (!regex.test(html)) throw new Error('Missing reading slot: ' + key);
  html = html.replace(regex, (_, open, close) => open + escape(value) + close);
}
edits.set('projects/daily-insight.html', html);
const stale = [...edits].filter(([file, source]) => readFileSync(path.join(root, file), 'utf8') !== source);
if (process.argv.includes('--check')) {
  if (stale.length) throw new Error('Reading metadata stale: ' + stale.map(([f])=>f).join(', ') + '; run npm run render:works');
} else for (const [file, source] of stale) writeFileSync(path.join(root,file), source);
console.log(`Reading metadata ${process.argv.includes('--check')?'checked':'generated'}: ${text.count} books, Day ${text.latest.day}.`);
