# Loki OS 日常维护

线上项目与 Skill 不再直接散写在页面里，统一维护在 `site-data.js`。`works.html` 只收公开作品；`skills.html` 按领域收可复用能力，两者不能混成同一套产品卡。

## 日常流程

1. 扫描本机最近项目：`npm run scan`。
2. 查看 `.loki-os-local/project-candidates.json`。
3. 只把确认适合公开、已有可访问站内案例页的候选写入 `site-data.js`；外部产品入口按实际核验状态单独登记。
   - 新产品或完整案例写入 `projects`。
   - 新 Skill 写入 `skills`，所属领域写入 `skillCategories`；用 `form` 区分“正式 Skill / 长期使用 / 作品中沉淀”。
   - 本职工作中的私有流程，不因为已经做成 Skill 就自动进入公开索引。
4. Loki 确认整批内容后，才把 `publicationStatus` 从 `unverified` 改为 `verified`。
5. 运行 `npm run render:works`，把项目数据同步到静态作品页。
6. 运行 `npm run check`。
7. 启动本地静态服务器，用真实浏览器验收桌面端和移动端。
8. 提交代码；只有 Loki 明确确认发布后才推送到 GitHub。

## 公开边界

- 扫描结果永远是 `review-required`，不会自动出现在网站上。
- 公司、团队、内部项目、客户资料、本机路径和没有公开意图的个人内容不得进入 `site-data.js`。
- **站内案例页可访问**：`href` 指向 `./projects/*.html`，且案例页及其本地资源已经在真实浏览器中打开检查。这个状态只说明站内公开案例成立。
- **外部产品 HTTPS 入口已验证**：`publicLink.href` 使用 `https://`，`publicLink.status` 为 `verified`，并记录本次真实访问的 `checkedAt`。只有这种状态才可以把外部入口写成已验证可用。
- **外部入口待复核**：历史产品域名或 Release 可以保留在 `publicLink`，但 `publicLink.status` 必须为 `pending`，标签和项目状态必须明确写出“待复核”或“待复验”，不得声称当前已上线或已核验。
- `verification` 只描述已经实际完成的核验范围。站内案例页或本地截图通过，不等于外部产品入口已验证。
- 下线项目可保留数据并把 `visibility` 改为 `private`；项目卡片、证据条、主线入口与 JSON-LD 都只能读取 `public` 项目。

## 文件职责

- `site-data.js`：公开项目、Skill 分类与 Skill 条目的唯一维护源，也是作品卡片、三条主线、证据条、核验状态与外部入口口径的来源。
- `scripts/render-works.mjs`：从 `site-data.js` 生成 `works.html` 中的项目卡片、主线入口和结构化数据；`--check` 只校验、不写文件。
- `scripts/render-skills.mjs`：从 `site-data.js` 生成 `skills.html` 的分类目录、条目与结构化数据；`--check` 只校验、不写文件。
- `scripts/scan-local-projects.mjs`：扫描 Cola/Codex 最近操作过的本地项目，生成私有候选。
- `scripts/validate-site-data.mjs`：检查日期、重复 ID、站内案例页、外部入口状态、公开可见性和必填字段。
- `.loki-os-local/`：本机候选与审计结果，不进入 Git。
