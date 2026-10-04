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

## 2026-10-02：独立内容页与传播信息

- 统一运行 `npm run build`，随后 `npm run check` 和 `npm test`。旧 `render:works` 只负责作品卡片，不能替代完整构建。
- `scripts/render-publication.mjs` 从现有公开数据生成 `methods/`（方法）、`notes/`（AI 辅助导读）、`contact/`、首页精选及公共元信息。请修改生成器或数据，不手改生成区域。
- 作品主地址继续是 `projects/*.html`；`detail-study/` 保留交互场刊，并标记 noindex。独立阅读链接与站点地图指向正式内容页面。
- `publication-manifest.json` 记录页面内容哈希和实际修改日期。无内容变化的构建不推进日期。删除或改为私有的方法会移除生成器拥有的对应方法页。
- 阅读档案仍明确标注 AI 生成和未逐页核对原书，不能自动升级为本人审校文章。
- `contact.js` 由生成器输出，首页、场刊与独立联系页共用同一份联系内容。
- 首页三件代表作使用 `assets/previews/` 的 960px WebP 缩略图；完整案例保留原图。
- 统计暂以已可访问的 Pages 域名为主，自定义统计域名为备用。恢复 DNS 后再复核切换，超时仍不重复 POST。
- 未增加外部追踪服务或声称已获得搜索排名；Search Console、真实 AI 引用率及来源转化统计需另行接入与持续观察。
- 浏览器回归脚本为 `dev/qa/publication-audit.mjs`（导出 `audit(browser)`），覆盖生成清单的桌面/手机渲染及禁用 JS 的关键入口。

## 2026-10-03：个人定位与策展主线

- `scripts/editorial-data.mjs` 维护定位与三件代表作的动机、选择、个人判断；项目事实仍以 `public-data.js` 为准。首页、关于页、作品目录和案例页从同一份主线生成，禁止各页另写互相矛盾的身份表述。
- 原橙色封面保留，模板改名为 `scripts/home-cover.html`；已移除制作台、票根切换和首页截图对比试验。
- `tests/editorial.test.mjs` 校验静态正文的主线一致性、作者关系和关联页面可达性。结构化数据只是内容描述，不代表已经获得搜索收录或 AI 引用。

## 发布前检查与本地打包

运行 `npm run preflight` 检查正文、测试、链接及搜索元信息；浏览器检查另运行 dev/qa 脚本。运行 `node scripts/package-release.mjs` 得到 output/releases 下的静态发布包与文件哈希。发布包不包含开发资料；不要把源码备份 output/preflight 或整个工作目录上传。打包不会发布，也不会变更现有托管配置。

## 2026-10-04 正式发布与回退

源码分支 `main`，网站发布分支 `release/site`。Pages 从发布分支根目录构建；推送 main 不再直接部署。发布分支只包含受控静态包。

改版前的线上版本已验证首页字节与提交一致：`75f8f9435c67a002959ffe64984e3b028a8b05d2`。
远程标签：`pre-release-2026-10-03`；远程回退分支：`rollback/pre-release-2026-10-03`。

需要立即回退网站时（不改动源码工作区）：

```sh
gh api --method PUT repos/loki2046-mao/loki-os/pages -f 'source[branch]=rollback/pre-release-2026-10-03' -f 'source[path]=/'
gh api --method POST repos/loki2046-mao/loki-os/pages/builds
```

恢复新版则把上述 source[branch] 改为 `release/site`，再次请求构建。必须等 Pages build 返回 built 并核对 commit，再检查正式域名；设置成功不等于部署完成。旧版本回退沿用当时根目录发布形态。
