import { readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export function loadSiteData() {
  const context = { window: {} };
  for (const name of ['public-data.js', 'site-data.js']) {
    vm.runInNewContext(readFileSync(path.join(root, name), 'utf8'), context, { filename: name });
  }
  return context.window.LOKI_OS_SITE_DATA;
}
