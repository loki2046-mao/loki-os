import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = { window: {} };
for (const name of ['public-data.js', 'process-data.js', 'corpus-data.js']) {
  vm.runInNewContext(readFileSync(path.join(root, name), 'utf8'), context, { filename: name });
}
const { bookData: data, lokiProcess: processes, lokiCorpus: corpus } = context.window;
const entries = [...data.projects, ...data.skills];
const ids = new Set(entries.map(item => item.id));
assert.equal(ids.size, entries.length, '作品和方法 ID 必须唯一');
for (const item of entries) {
  if (item.visibility !== 'public') continue;
  if (data.skills.includes(item)) {
    assert(processes[item.id]?.intro && processes[item.id]?.steps?.length, `缺少方法详情：${item.id}`);
  }
  if (item.href?.startsWith('./')) {
    assert(existsSync(path.join(root, item.href.split(/[?#]/)[0])), `失效详情入口：${item.id}`);
  }
  const record = processes[item.id];
  for (const [src] of record?.gallery || []) {
    assert(existsSync(path.join(root, src)), `缺少案例图片：${src}`);
  }
  for (const [href] of record?.related || []) {
    if (href.startsWith('#catalogue/')) {
      const [, category, id] = href.split('/');
      const target = entries.find(item => item.id === id && item.visibility === 'public');
      assert(target, `失效关联入口：${href}`);
      assert(category === (data.projects.includes(target) ? 'works' : target.category), `关联分类错误：${href}`);
    }
  }
}
const pairs = new Set();
for (const edge of data.relations || []) {
  const source = entries.find(item => item.id === edge.from && item.visibility === 'public');
  const target = entries.find(item => item.id === edge.to && item.visibility === 'public');
  assert(source && target, `Invalid relationship: ${edge.from} -> ${edge.to}`);
  assert(['related','uses','same-method'].includes(edge.kind), 'Unknown relationship type');
  const pair = `${edge.from}:${edge.to}`;
  assert(!pairs.has(pair), `Duplicate relationship: ${pair}`); pairs.add(pair);
  if (edge.kind === 'uses') assert(data.projects.includes(source) && data.skills.includes(target), 'uses must connect a project to a method');
}
assert(corpus.books.length > 0, '书库不能为空');
assert.equal(new Set(corpus.books.map(book => book.title)).size, corpus.books.length, '书名重复');
corpus.books.forEach((book, index) => {
  assert.equal(book.day, index + 1, `Day 顺序错误：${book.title}`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(book.date), `缺少日期：${book.title}`);
  assert(book.insight && book.excerpt && book.contents?.length, `文稿缺损：${book.title}`);
  if (index) assert(book.date >= corpus.books[index - 1].date, `日期倒序：${book.title}`);
});
console.log(`公开内容检查通过：${data.projects.length} 件作品、${data.skills.length} 项方法、${corpus.books.length} 篇文稿；入口、关联、图片与 Day 顺序有效。`);
