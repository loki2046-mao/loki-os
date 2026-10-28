# Cloudflare 操作步骤（hiloki.ai / blog.hiloki.ai / wechat-layout）

日期：2026-10-28。需在 Cloudflare Dashboard 由有权限账号手动完成；本文件不可替代实际点击。

适用范围：`hiloki.ai`、`blog.hiloki.ai`、以及 `wechat-layout.hiloki.ai`（若该主机在同一账号下）。

## 1. 放行 Baiduspider 与 Googlebot

对每个域名（Zone）重复：

1. 打开 Cloudflare Dashboard → 选中对应域名 → **Security** → **Bots**（或 **Security** → **Settings**，以控制台实际菜单为准）。
2. 确认 Bot Fight Mode / Super Bot Fight Mode **不要**把已验证搜索引擎一并拦截。若开启了 Super Bot Fight Mode：
   - 将 **Verified bots** / 已验证爬虫设为 **Allow**（允许）；
   - 或对搜索引擎爬虫使用「Definitely automated」以外的更宽松策略，避免误伤 Googlebot / Baiduspider。
3. 打开 **Security** → **WAF** → **Tools / Custom rules**（或旧版 Firewall Rules）：
   - 新建规则，名称例如：`Allow search crawlers`；
   - 表达式示例（字段名以控制台自动补全为准）：

```
(cf.client.bot) or (http.user_agent contains "Googlebot") or (http.user_agent contains "Baiduspider")
```

   - 动作：**Skip**（跳过）相关 Bot / Managed Challenge / JS Challenge；或 **Allow**。
4. 若使用 **AI Crawl Control / robots.txt 托管**（Cloudflare Managed robots）：
   - 确认未对 Googlebot、Baiduspider 设为 Block；
   - `Content-Signal` 中 search 保持允许（当前线上 robots 已见 `search=yes`）。
5. 保存后，用无 Cookie 环境抽查：

```bash
curl -sI -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://hiloki.ai/
curl -sI -A "Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)" https://hiloki.ai/
curl -sI -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://blog.hiloki.ai/
curl -sI -A "Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)" https://wechat-layout.hiloki.ai/
```

期望：HTTP 200（或正常 3xx 到 https），**不是** 403/429/挑战页 HTML。

## 2. robots.txt 增加 Sitemap 行

每个站点的最终 `robots.txt`（源站文件或 Cloudflare 托管规则合并结果）应包含：

```
Sitemap: https://hiloki.ai/sitemap.xml
```

blog / wechat-layout 若有独立 sitemap，各自写自己的绝对地址，例如：

```
Sitemap: https://blog.hiloki.ai/sitemap.xml
```

注意：

- 线上曾出现 `https://hiloki.ai/sitemap.xml` 返回首页 HTML 的情况；部署静态 `sitemap.xml` 后需再 `curl -sI` 确认 `content-type` 为 XML（如 `application/xml` 或 `text/xml`），不是 `text/html`。
- 若使用 Cloudflare Managed robots，在托管内容中追加 Sitemap 行，或关闭托管、改由源站 `dist/robots.txt` 提供（本仓库构建已含 `Sitemap:` 行）。

## 3. llms.txt（可选）

- **不是**收录或 AI 引用的必要条件；Google 官方说明 AI 功能仍依赖常规可抓取正文与基础 SEO。
- 若要做：在站点根路径提供 `https://hiloki.ai/llms.txt`（纯文本，简述站点是谁、主要栏目与规范链接），并可选在 robots 中不加限制即可被抓取。
- 不做也不会阻塞本轮必改项。

## 4. HTTPS

- `http://hiloki.ai/` 实测已 301 到 `https://hiloki.ai/`；保持 **Always Use HTTPS** 开启即可，无需额外改源码。

## 5. 验收清单

- [ ] 三域名 Googlebot UA 200
- [ ] 三域名 Baiduspider UA 200
- [ ] hiloki.ai/robots.txt 含 Sitemap 行且不被托管规则冲掉
- [ ] hiloki.ai/sitemap.xml 为 XML，条目可解析
- [ ] （可选）llms.txt 200
