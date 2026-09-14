# Loki OS · 个人场刊

线上地址：https://loki-os.hiloki.ai/

2026-09-14 起，站点根目录是「个人场刊」：封面 → 认识 Loki → 作品节目单（7 件）→ 制作手册（26 个方法）→ 中场休息。另有 `detail-study/` 是场刊的全量目录内页。

## 目录结构

| 路径 | 说明 |
| --- | --- |
| `index.html` | 场刊首页（单页切换）。 |
| `detail-study/` | 全量目录内页：作品 + 五类方法 + 完整案例。 |
| `assets/` | 场刊素材，另含内聚进来的 `lettering/`（角色与社交卡片图）和 `fonts/`（Noto Sans SC 子集、Barlow Condensed、得意黑）。 |
| `public-data.js` `process-data.js` `corpus-data.js` | 公开条目、制作档案、已有语料的展示数据。 |
| `dev/` | 开发工具与文档：`dev/preview-server.py`（本地预览 + 访客统计）、`dev/qa/`（Playwright 验收脚本）、`dev/notes/`（历次设计与内容审核记录）。 |
| `works.html` `about.html` `projects/` `brand-system.css` `site-data.js` | 2026-08 的旧版站点页面，保留在库里以便外部旧链接仍可访问；根路径不再使用。维护口径见 `MAINTENANCE.md`。 |

## 本地预览

```bash
python3 dev/preview-server.py --port 54911
# 打开 http://127.0.0.1:54911/index.html
```

预览服务同时提供同源 `/api/visits`（SQLite 本地计数），页面上会标注「本地预览统计」。

## 访客统计

线上统计走 Cloudflare Pages Function：`https://stats.hiloki.ai/api/visits`（源在 `~/Projects/loki-os-stats`），计数持久化在私有仓库 `loki2046-mao/loki-visits`。口径见 `dev/notes/VISIT-STATS.md`。

## 验收

```bash
node dev/qa/audit-content.cjs                        # 33 个条目的内容与来源完整性
node dev/qa/qa-visits.cjs                            # 统计接口：PV/UV、去重、故障占位、移动端
node dev/qa/qa-publication.cjs http://127.0.0.1:54911 # 需要先起预览服务的几支
```

## 发布与回滚

```bash
git push origin main                    # 发布（GitHub Pages 自动构建）
git push origin +loki-os-live-2026-08-29:main   # 回滚到 2026-08-29 的旧版站点
git push origin +ia-guided-stage-v1:main        # 切到未发布的 IA guided 版本
```

打包前的完整备份见标签 `loki-os-live-2026-08-29`（= 当时的线上内容）和分支 `ia-guided-stage-v1` 上的提交 `f9feabd`（未发布的后续改动）。
