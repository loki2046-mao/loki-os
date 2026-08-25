# Loki OS 日常维护

线上项目卡片不再直接散写在 `index.html`，统一维护在 `site-data.js`。

## 日常流程

1. 扫描本机最近项目：`npm run scan`。
2. 查看 `.loki-os-local/project-candidates.json`。
3. 只把确认适合公开、已有公开链接的候选写入 `site-data.js`。
4. 运行 `npm run check`。
5. 启动本地静态服务器，用真实浏览器验收桌面端和移动端。
6. 提交代码；只有 Loki 明确确认发布后才推送到 GitHub。

## 公开边界

- 扫描结果永远是 `review-required`，不会自动出现在网站上。
- 公司、团队、内部项目、客户资料、本机路径和没有公开意图的个人内容不得进入 `site-data.js`。
- 项目必须有可访问的 `https://` 链接；只有本地文件时保留为候选，等有公开地址再上站。
- 下线项目可保留数据并把 `visibility` 改为 `private`，页面只渲染 `public`。

## 文件职责

- `site-data.js`：允许发布到公开网站的项目清单。
- `scripts/scan-local-projects.mjs`：扫描 Cola/Codex 最近操作过的本地项目，生成私有候选。
- `scripts/validate-site-data.mjs`：检查日期、重复 ID、公开链接和必填字段。
- `.loki-os-local/`：本机候选与审计结果，不进入 Git。
