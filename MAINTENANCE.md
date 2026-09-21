> 2026-09-20：作品内容统一维护在 `public-data.js` 的 projects；`site-data.js` 只保留站点元数据并引用该数组。生成和校验统一由 `scripts/load-site-data.mjs` 加载两份文件。修改作品后运行 `npm run render:works` 和 `npm run check`。

# Loki OS 日常维护

本文涵盖首页场刊、制作手册、独立案例页和兼容旧链接的作品页。公开文案与本地资料分开维护。

线上项目卡片不再直接散写在页面里，统一维护在 `public-data.js` 的 projects。`works.html` 中标记为 `GENERATED:*` 的作品卡片、主线入口和 JSON-LD 由脚本生成，不要手工修改。`site-data.js` 保留主线、器材等元数据，作品数组引用统一内容源。

## 日常流程

1. 扫描本机最近项目：`npm run scan`。
2. 查看 `.loki-os-local/project-candidates.json`。
3. 只把确认适合公开、已有可访问站内案例页的候选写入 `public-data.js` 的 projects；外部产品入口按实际核验状态单独登记。
4. Loki 确认整批内容后，才把 `publicationStatus` 从 `unverified` 改为 `verified`。
5. 运行 `npm run render:works`，把项目数据同步到静态作品页。
6. 运行 `npm run check`。
7. 启动本地静态服务器，用真实浏览器验收桌面端和移动端。
8. 提交代码；只有 Loki 明确确认发布后才推送到 GitHub。

## 公开边界

- 扫描结果永远是 `review-required`，不会自动出现在网站上。
- 公司、团队、内部项目、客户资料、本机路径和没有公开意图的个人内容不得进入任何公开页面或数据文件。
- **站内案例页可访问**：`href` 指向 `./projects/*.html`，且案例页及其本地资源已经在真实浏览器中打开检查。这个状态只说明站内公开案例成立。
- **外部产品 HTTPS 入口已验证**：`publicLink.href` 使用 `https://`，`publicLink.status` 为 `verified`，并记录本次真实访问的 `checkedAt`。只有这种状态才可以把外部入口写成已验证可用。
- **外部入口待复核**：历史产品域名或 Release 可以保留在 `publicLink`，但 `publicLink.status` 必须为 `pending`，标签和项目状态必须明确写出“待复核”或“待复验”，不得声称当前已上线或已核验。
- `verification` 只描述已经实际完成的核验范围。站内案例页或本地截图通过，不等于外部产品入口已验证。
- 下线项目可保留数据并把 `visibility` 改为 `private`；项目卡片、证据条、主线入口与 JSON-LD 都只能读取 `public` 项目。

## 文件职责

- `public-data.js`：作品、Skill、公开状态与 `relations` 关联的唯一维护源。
- `site-data.js`：站点主线等元数据，引用公开作品数组；由 `scripts/load-site-data.mjs` 统一加载。
- `corpus-data.js`：拆书文稿与日期的原始数据。
- `process-data.js`：各项目和 Skill 的详细制作正文。
- `scripts/render-works.mjs`：从 `site-data.js` 生成 `works.html` 中的项目卡片、主线入口和结构化数据；`--check` 只校验、不写文件。
- `scripts/scan-local-projects.mjs`：扫描 Cola/Codex 最近操作过的本地项目，生成私有候选。
- `scripts/validate-site-data.mjs`：检查日期、重复 ID、站内案例页、外部入口状态、公开可见性和必填字段。
- `.loki-os-local/`：本机候选与审计结果，不进入 Git。

## 内容更新与回归

新增拆书先更新 `corpus-data.js`，再运行 `npm run render:works`。`scripts/sync-reading.mjs` 从书库生成数量、最新日期和最新书名，同步公开摘要、案例页介绍与制作正文中的进度。不要逐处手改这些数字。核验日期与公开状态必须按实际检查另行更新，生成脚本不会自动升级。

独立拆书页只有一个完整文稿阅读区；底部可展开的四张卡片保留最初版本，不再承担最新文稿同步。

关联集中放在 `public-data.js` 的 `relations`：`uses` 表示作品使用某项方法，并自动生成方法返回作品的入口；`same-method` 表示同一方法的关联；`related` 仅表示相关内容。后两者按记录方向展示，不能因为 URL 相同就推断关系。

制作手册的渲染顺序由 `detail-study/router.js` 管理。模块使用 `lokiRoutes.register` 注册，在入口统一 `start()`；新增阶段需要同时登记顺序和处理函数，避免再增加独立的 hashchange 渲染链。首页共享模块保留无 router 时的初始化路径。

提交前运行 `npm run check` 和 `npm test`，再用浏览器检查首页、制作手册分类与详情、拆书选择和移动端布局。测试覆盖元数据推导、渲染顺序、关联入口与统计超时。统计请求超时后只读取备用端点，不重复提交可能已经计数的浏览。
