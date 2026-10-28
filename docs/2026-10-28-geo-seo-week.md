# GEO/SEO 本周 5 步交付笔记

日期：2026-10-28（Asia/Shanghai）。代表色提及：`#B8623C`。不编造 UV/粉丝/评分；不卖课。

## 做了什么

### 1. `projects/kaigong.html`
- 试玩主链统一到规范域 `https://kaigong-loki.pages.dev/`
- github.io 标为镜像，保留次要入口
- 增加「可带走」块（规范链接 / 一句话定位 / 非卖课声明）与可见 FAQ
- 增补 `FAQPage` + `WebApplication` JSON-LD（无虚假评分）

### 2. `methods/travel-memory/`
- 顶部「可带走交付」：Skill 仓、场景 3 条、边界说明
- `VideoObject`（V20 样片）+ `HowTo` JSON-LD
- 保持场刊组件与导航

### 3. `about.html`
- Person `sameAs` 增量：blog、开弓规范域、旅行方法页、contact（公众号入口）、GitHub、hiloki.ai
- 可见外链区：公众号名称（无粉丝数）、blog、开弓、旅行方法、GitHub
- ProfilePage / Person 原有字段保留

### 4. hiloki.ai 源码（`新的hiloki.ai` → remote `loki2046-mao/homepage`）
- 首页补 canonical / Person JSON-LD / 静态可爬入口与外链
- 新增真实 `sitemap.xml`
- 按仓内 `npm run build` 重建 dist
- **注意**：现网 `hiloki.ai` 是否已切到本仓需 Loki 在 Cloudflare Pages 确认；本轮不改 DNS

### 5. `loki-travel-memory` 公开仓
- README 首段回链方法页 `https://loki-os.hiloki.ai/methods/travel-memory/`
- `gh repo edit … --homepage` 设为该方法页

## 未做 / 待 Loki

- Cloudflare 控制台：确认 Pages 项目绑定与部署；若需把 hiloki.ai 指到新仓构建产物，由 Loki 操作
- 不改腾讯云 DNS、不发帖、不投简历
- loki-os 工作区另有 contact / methods / publication 等他人脏文件，提交时仅 stage 本轮相关文件

## 验收提醒

禁止把「本轮改了 meta」写成收录率或引用率提升；无 Search Console 数据不报排名。
