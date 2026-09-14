# GitHub 公开入口复核 · 2026-09-08

## 范围与结论

通过 GitHub 连接器检索 user:loki2046-mao is:public，第 1 页返回 21 个公开仓库，第 2 页为空。核对 cola-skills 完整递归目录（未截断，commit 4c9e8175cf953fc32d3f53408144a5e4520a651c）、相关独立仓库 README 和公开网页标题，以及缺失项的精确名称代码检索。未读取私有仓库，也未发布任何文件。

此前“23 个只有主页入口”只反映旧网站映射，不代表 GitHub 没有公开。本轮为其中 15 个接入具体地址，余下 8 个暂未找到可确认映射。页面现有 27 项中：9 个直接源码/模块入口，10 个相关或上游入口，8 个仍是个人主页。

“相关”不等于一一对应；尤其旧 Loki 写作助手、前端幻灯片、生图套件的版本关系仍待确认。所有地址由公开目录或 README 支持，不依据名字猜 URL。

## 本轮替换的 15 个入口

| 条目 | 去向 | 类型与边界 |
| --- | --- | --- |
| Loki 写作助手 | [公开入口](https://github.com/loki2046-mao/cola-skills/tree/main/loki-wechat-pipeline/references/writing) | 找到公开公众号写作层；并非旧写作助手原型的独立源码。 |
| 公众号排版 | [公开入口](https://github.com/loki2046-mao/wechat-layout-editor) | 独立公开仓库包含 SKILL.md、排版引擎和编辑器。 |
| 微信标题生成 | [公开入口](https://github.com/loki2046-mao/cola-skills/blob/main/loki-wechat-pipeline/references/cover/cover-design-rules.md) | 标题规则位于公众号全链路的封面模块，非独立仓库。 |
| 飞书转公众号 | [公开入口](https://github.com/loki2046-mao/cola-skills/tree/main/loki-wechat-pipeline/scripts) | 公开脚本目录包含飞书文档提取、格式转换与发布管线。 |
| 电影字报生成器 | [公开入口](https://github.com/loki2046-mao/cine-type-poster-generator-skill) | 独立仓库的用途与电影字报条目一致。 |
| 封面设计系统 | [公开入口](https://github.com/loki2046-mao/cola-skills/blob/main/loki-wechat-pipeline/references/cover/cover-design-rules.md) | 公开封面模块，包含构图、标题和比例规则。 |
| 生图套件 | [公开入口](https://github.com/loki2046-mao/cola-skills/tree/main/nb-image-prompt) | 找到多模型图像提示词管理方法；生图套件的完整一对一名称映射仍待确认。 |
| 前端幻灯片 | [公开入口](https://github.com/loki2046-mao/cola-skills/tree/main/loki-deck) | 公开个人风格 HTML PPT 方法；现有“前端幻灯片”亦可能指 README 中注明改造的 frontend-slides，暂不合并两者。 |
| 辩论思维提取 | [公开入口](https://github.com/loki2046-mao/debate-thinking-distiller) | 独立公开仓库含拆解与陪练两种模式。 |
| 自我镜像 | [公开入口](https://github.com/loki2046-mao/self-mirror-skill) | 独立公开仓库，与文本证据、画像和复盘方法对应；不代表从零原创。 |
| 电子书转换工作流 | [公开入口](https://github.com/loki2046-mao/loki-ebook-converter) | 对应公开产品源码，工作流沉淀于产品，并非独立 Skill 包。 |
| 赛博小熊猫 Loki | [公开入口](https://github.com/loki2046-mao/cola-skills/tree/main/loki-design-system) | 公开品牌、IP 及场景规则；不把整个人格条目称为单个可安装 Skill。 |
| 歌词答案书构建 | [公开入口](https://github.com/loki2046-mao/lian-shang-shang-qian) | 对应歌词答案书公开产品仓库；抽签交互核验状态保持待复核。 |
| 每日拼贴诗 | [公开入口](https://github.com/loki2046-mao/cola-skills/tree/main/daily-collage-poem) | 公开目录包含 SKILL.md、视觉样式库与交互模板。 |
| AI 新闻雷达 | [公开入口](https://github.com/LearnPrompt/ai-news-radar) | 个人公开合集明确注明基于 LearnPrompt 改造；这里是上游，不是 Loki 修改版源码。 |

## 暂未找到可确认的对应源码：8 个

- 长篇写作记忆检查
- 洞见型拆书
- 阅读笔记整理
- 工作判断蒸馏
- Codex 主题皮肤
- Hatch Pet
- Skill 构建与审阅
- 需求与提示词结构化

这些条目继续保留，不删除。精确名称未检出、公开合集也无对应目录，不足以证明未公开：它们可能使用了其他名称、在其他账号或未索引的目录里。请用户提供这些条目的别名、合集位置或另一个 GitHub 账号即可继续查找。

## 需要区分的关系

- AI 新闻雷达：[合集 README](https://github.com/loki2046-mao/cola-skills)明确列为 LearnPrompt 上游的改造，未找到 Loki 修改版公开目录。已链接上游并注明，不声称上游是本人原创。
- 前端幻灯片：公开 Loki Deck 可用作相关入口；README 还列了第三方 frontend-slides 的本地改造，两者不强行合并。
- 生图套件：nb-image-prompt 为相关公开方法，但原“生图套件”是否就是它仍待用户确认。
- 赛博小熊猫：链接公开品牌/IP 系统，不把整个人格品牌称为独立安装包。
- 电子书与上上签：链接对应产品仓库，不把产品源码改称独立 Skill 包。
- 公众号二维码仍沿用原站文件；没有添加过期 Hello Loki 主站入口。

本次 GitHub 连接器已成功读取公开仓库；上一轮 curl 超时不再作为 GitHub 无法核验的结论。产品完整功能核验状态没有升级。
