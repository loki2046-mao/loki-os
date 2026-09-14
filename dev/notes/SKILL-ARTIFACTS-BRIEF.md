# 场刊「成品图补齐」作业说明

目标：把 `program-book/` 里目前只有「方法示意」占位的 Skill 条目，换成**真实产物**的图片。

## 背景

- 场刊首页 → 制作手册（26 个 Skill）／detail-study 全量目录。
- 每个条目在 `public-data.js` 的 `bookData.skillImages[id]` 或 `bookData.profiles[id].visual.image` 里取图。
- 没有图的条目，UI 会显示「方法示意」灰底占位（见 `spread-design.js`、`edition.js`）。
- 现在 26 个里有 20 个没图。

## 铁律

1. **只能是真实产物**。允许：
   - 硬盘上已保存的真实成果文件，原样复制；
   - 用本机 Chrome 无头渲染真实产物文件（HTML / 已保存页面）得到的截图；
   - 真实运行中的工具界面截图（如果本机能跑起来）。
2. **禁止**：AI 现画一张图冒充成品、手写 HTML 假装是产品界面、用别的作品的图顶替、把示意图说成截图。
3. 找不到真实产物的条目，**不要硬凑**，在报告里标 `missing` 并写清原因。
4. **隐私红线**：不得收录含个人聊天记录、健康数据、人际关系分析、薪资/工作评价、身份证件、订单/地址、真实姓名的私人姓名（本人除外）。涉及真人的第三方材料只使用已公开发布的。
5. 不改 `public-data.js`、不改 CSS。只产出图片 + 报告。

## 产出

### 1. 图片文件

`/Users/kude/cola/outputs/01-长期项目/Loki OS与个人站点/program-book/assets/skills/<skill-id>.<png|jpg|webp>`

要求：

- 宽度 ≤ 1600px（超了等比缩小），单文件 < 1.2MB，优先 png（截图）/ jpg（照片）。
- 内容可辨：不要糊、不要只截到空白、不要带浏览器地址栏以外的桌面杂物。
- 若一个条目有多张，用 `<skill-id>-2.png`、`-3.png`。

### 2. 来源记录

追加到 `/Users/kude/cola/outputs/01-长期项目/Loki OS与个人站点/program-book/SKILL-ARTIFACT-SOURCES.md`（不存在就新建，保留已有内容）：

| skill id | 产出文件 | 原始来源绝对路径 | 产出方式 | 是否公开安全 |
| --- | --- | --- | --- | --- |

「产出方式」只能写：`原样复制` / `无头渲染` / `实机截图` / `missing`。

### 3. 回传给主 agent 的 JSON

```
[
  {"id":"weixin-layout","file":"assets/skills/weixin-layout.png","caption":"真实成品 / XXX","status":"ok","source":"/abs/path"},
  {"id":"...","status":"missing","reason":"..."}
]
```

`caption` 是给页面用的一句话，格式参考已有条目：`真实成品 / 恋之上上签`、`相关产品 / InkPanda 真实编辑器`。

## 工具

- 无头渲染：`node` + playwright（已装）
  `const {chromium}=require('/Users/kude/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')`
  启动参数：`chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'})`
  截图前 `page.setViewportSize({width:1440,height:900})`，必要时 `page.screenshot({fullPage:true})`。
- 本机长期项目根：`/Users/kude/cola/outputs/01-长期项目/`
- 阶段快照：`/Users/kude/cola/outputs/02-项目快照/项目/`
- 资源：`/Users/kude/cola/outputs/03-资源/{文档,图片,代码}/`
- 自动化产物：`/Users/kude/cola/outputs/04-自动化/`
- 用户下载夹：`/Users/kude/Downloads/`

## 待补清单（20 条）

| skill id | 标题 | 分类 | 找图的线索 |
| --- | --- | --- | --- |
| loki-writing | Loki 写作助手 | writing | 旧稿/新稿对比的真实文章；写作 Skill 的实际改稿前后 |
| weixin-outline | 公众号选题与大纲 | writing | 真实选题表、大纲文档、公众号数据分析结果 |
| deep-night | 深夜清醒 Writer | writing | 草稿→成稿的真实产物 |
| weixin-layout | 公众号排版 | writing | `outputs/03-资源/代码/排版Skill*`、本机排版编辑器产物 |
| headline | 微信标题生成 | writing | 真实标题候选输出 |
| feishu-weixin | 飞书转公众号 | writing | `恋之上上签公众号文章-→-飞书文档排版+截图` |
| cover-system | 封面设计系统 | visual | `outputs/03-资源/图片/🎨 图片/Cola推文封面`、公众号封面成品 |
| image-kit | 生图套件 | visual | 本机真实生成并保存的图片 |
| slides | 前端幻灯片 | visual | `loki-deck` / PPT / HTML slides 真实渲染 |
| book | 洞见型拆书 | knowledge | `outputs/03-资源/文档/📝 文章草稿/每日拼贴诗` 之外的拆书文稿 |
| notes | 阅读笔记整理 | knowledge | 真实笔记导出 |
| debate | 辩论思维提取 | knowledge | 真实提取结果文档 |
| self-mirror | 自我镜像 | knowledge | ⚠️ 隐私高风险，需脱敏或跳过 |
| ai-radar | AI 新闻雷达 | knowledge | `outputs/04-自动化/` 真实日报产物 |
| codex-theme | 个人主题系统 | building | `/Users/kude/.cola/skills/loki-theme-kit/previews/cola/*.png` |
| hatch-pet | Hatch Pet | building | 本机宠物图集；`program-book/assets/process/coconut.webp` |
| skill-builder | 工作经验蒸馏成 Skill | building | 真实 Skill 目录结构 / GitHub 仓库页 |
| prompt-spec | 需求与提示词结构化 | building | 真实需求文档前后对比 |
| collage-poem | 每日拼贴诗 | personal | `program-book/assets/collages/*.png`（已有 6 张，需选一张作条目图） |
| film-poster | 电影字报生成器 | visual | `program-book/assets/process/holiday-v1.png`、`holiday-v4.png`（已有） |

后 2 条基本只需从既有资产里挑图并登记来源，不必重新找。
