window.LOKI_OS_SITE_DATA = Object.freeze({
  publicationStatus: 'verified',
  edition: 'seo-geo-local-review-v2',
  updatedAt: '2026-08-29',
  featuredProjectIds: Object.freeze(['interface-system', 'perspective-distillation', 'inkpanda']),
  pillars: Object.freeze([
    Object.freeze({ id: 'ai-writing', projectIds: Object.freeze(['inkpanda']), href: '#case-inkpanda', title: 'AI 写小说', summary: '我怎么让 AI 记住一部长篇' }),
    Object.freeze({ id: 'ai-products', projectIds: Object.freeze(['interface-system']), href: '#case-interface-system', title: '文科生用 AI 做项目', summary: '从想法、界面到真机上跑起来' }),
    Object.freeze({ id: 'ai-workflows', projectIds: Object.freeze(['daily-insight', 'loki-health']), href: '#workflow', title: 'AI 工作流 / 个人系统', summary: '我怎么把每天的事留下来' }),
  ]),
  proofStrip: Object.freeze([
    Object.freeze({ projectId: 'interface-system', href: './projects/interface-system.html', title: '界面系统', image: './projects/assets/real/cola/cola-9skins-v5-overview.png', imageAlt: 'Cola 九套真实运行时皮肤总览', caption: '从三种方向试起，后来做到九套', imageWidth: 1112, imageHeight: 1190, imageFit: 'contain' }),
    Object.freeze({ projectId: 'perspective-distillation', href: './projects/perspective-distillation.html', title: '人物视角蒸馏', image: './projects/assets/real/perspective/liuyang-stage.jpg', imageAlt: '人物视角蒸馏使用的刘旸公开节目材料样本', caption: '每个判断都要能回到公开来源', imageWidth: 1080, imageHeight: 604, imageFit: 'cover' }),
    Object.freeze({ projectId: 'inkpanda', href: './projects/inkpanda.html', title: 'InkPanda', image: './projects/assets/real/inkpanda/outline.png', imageAlt: 'InkPanda 真实章节纲要界面', caption: '一部长篇被拆成小说、卷、章节和场景', imageWidth: 2000, imageHeight: 1114, imageFit: 'cover' }),
  ]),
  gearModules: Object.freeze([
    Object.freeze({ id: 'cola-skins', code: 'CASE-01', title: 'Cola 九套皮肤', readout: '我每天都要看它很久，就从三套代表方向试起，后来做到了九套，也让它记住上次的选择。', proof: '九套原型与真机运行画面', href: './projects/interface-system.html?room=cola', action: '看真实界面', image: './projects/assets/real/cola/inject-shot-1.png', tags: Object.freeze(['9 套原型', '真机运行', '选择记忆']) }),
    Object.freeze({ id: 'hub-skins', code: 'CASE-02', title: 'Loki Hub 十二套界面', readout: '同一批真实内容换了十二种界面。我逐套检查桌面阅读、手机顺序和切换动作。', proof: '十二套真实界面与桌面、移动端验收', href: './projects/interface-system.html?room=hub', action: '看真实页面', image: './projects/assets/real/hub/ui-selection-board.png', tags: Object.freeze(['12 套界面', '真实内容', '双端验收']) }),
    Object.freeze({ id: 'codex-theme', code: 'CASE-03', title: 'Codex 刘恋拼贴主题', readout: '背景图很快就能换。菜单、弹窗、任务卡、输入区和透明宠物，才是后来真正费工夫的地方。', proof: '四类核心组件与真实人物资产', href: './projects/interface-system.html?room=codex', action: '看完整改造', image: './projects/assets/exhibition/codex-liulian-cutout.webp', tags: Object.freeze(['任务卡', '对话框', '宠物分离']) }),
    Object.freeze({ id: 'daily-insight', code: 'CASE-04', title: '每日洞见 · unbook', readout: '我想先了解一本书讲了什么，再留下自己的洞见、疑问和可以试一试的行动。', proof: '当前文稿书目与四天早期互动样例', href: './projects/daily-insight.html', action: '翻看文稿与早期样例', image: './projects/assets/exhibition/hub-real-verify-ui-body.webp', tags: Object.freeze(['Day 01—04', '洞见卡', '复习入口']) }),
    Object.freeze({ id: 'perspective', code: 'CASE-05', title: '人物视角蒸馏', readout: '我把公开材料拆开，看四个人遇到问题时先看什么、会怎么改，也把不知道的地方留着。', proof: '四个人物、公开证据与隔离留出评测', href: './projects/perspective-distillation.html', action: '进入四人工作区', image: './projects/assets/real/perspective/liulian-evidence-sheet-01.png', tags: Object.freeze(['刘恋', '刘旸', '鲁豫', 'Papi酱']) }),
    Object.freeze({ id: 'ebook', code: 'CASE-06', title: 'Loki 电子书转换器', readout: '把 Calibre 的复杂转换能力，做成不需要命令行的拖拽桌面工具。', proof: 'macOS 与 Windows 真实安装包', href: './projects/ebook-converter.html', action: '看产品怎么把复杂度藏起来', image: './projects/assets/real/ebook/app-home.png', tags: Object.freeze(['macOS 1.1.2', 'Windows 1.1.1', '批量转换']) }),
    Object.freeze({ id: 'inkpanda', code: 'CASE-07', title: 'InkPanda 长篇写作', readout: '写到第八十章，人物受过的伤和前面埋的伏笔很容易丢。我做了一个能替作者照看这些事的工作台。', proof: '首页、编辑器、纲要与发现页真实界面', href: './projects/inkpanda.html', action: '看真实产品与长篇判断', image: './projects/assets/real/inkpanda/editor.png', tags: Object.freeze(['长篇结构', '上下文记忆', '一致性检查']) }),
    Object.freeze({ id: 'lian', code: 'CASE-08', title: '恋之上上签', readout: '我从 44 首歌里手工挑了 147 条短句，还先给自己定下版权边界，再做抽签和卡片。', proof: '44 首歌、147 条精选短句与 16 套卡片视觉', href: './projects/lian.html', action: '看喜欢怎样变成作品', image: './projects/assets/real/lian/draw-result.jpg', tags: Object.freeze(['44 首歌', '147 条短句', '16 套视觉']) }),
    Object.freeze({ id: 'qichi-life-os', code: 'CASE-09', title: '栖迟人生系统', readout: '这个站的站名就是从它来的。cron 每天凌晨自己跑，从日记和任务记录里认情绪、行为、思维、人格四层反复出现的东西，写进我的 Obsidian 库。', proof: '日复盘 50 次、周复盘 7 次运行记录与 173 篇库内文档', href: './projects/qichi-life-os.html', action: '看系统怎么自动跑', image: './projects/assets/real/qichi-life-os/cron-config.png', tags: Object.freeze(['cron 自动复盘', '四维模式', 'Obsidian 输出']) }),
    Object.freeze({ id: 'edu-content-line', code: 'CASE-10', title: '教育内容生产线', readout: '我在教育这行，课件是天天要出的东西。数学课件里冒出【作者生平】那天我才知道，骨架不能跨学科硬套；后来把课件提示词拆成七套学科骨架，再延伸出古诗词教研母稿和 15 秒视频分镜。', proof: '公开仓库 MIT + 真实生成的课件包与《咏鹅》母稿 V4', href: './projects/edu-content-line.html', action: '看一条生产线怎么长出来', image: './projects/assets/real/edu-content-line/yongge.png', tags: Object.freeze(['七套学科骨架', '批量 30—500 主题', '教研母稿']) }),
    Object.freeze({ id: 'ai-career-compass', code: 'CASE-11', title: 'AI 求职教练', readout: '在岗的人盘上周实际做了什么，三维评分判该动该挪该加固；求职的人拆 JD 拿简历改写和 7 天行动计划。', proof: '公开仓库 v1→v2 与两份真实完整报告', href: './projects/ai-career-compass.html', action: '看真实报告怎么给下一步', image: './projects/assets/real/ai-career-compass/eval-scoring-table.png', tags: Object.freeze(['三维评分', '四类判决', '7 天行动']) }),
    Object.freeze({ id: 'loki-assistant', code: 'CASE-12', title: '雾尼 Munin（Loki Assistant）', readout: 'Cola 记得我，Codex 也记得我，但记忆怎么存、存成什么样都归它们管，所以我给自己写了一份自己说了算的：四类记忆可视化可编辑，Obsidian 两千多篇笔记直接检索，模型随时可换。', proof: '273 条 commit、99 条记忆与 2237 篇笔记索引的本机真实运行', href: './projects/loki-assistant.html', action: '看私有产品的脱敏界面', image: './projects/assets/real/loki-assistant/workspace-welcome.png', tags: Object.freeze(['四类记忆', '本地优先', '多模型可插拔']) }),
  ]),
  projects: [
  {
    "id": "interface-system",
    "date": "08-24",
    "title": "个人化界面系统",
    "summary": "我天天都要打开 Cola、Codex 这些工具，就想把它们改成自己喜欢的样子。颜色换完才发现，菜单、弹窗、输入区也得跟着改，关掉重开还不能给我变回去。",
    "tag": "COLA × HUB × CODEX",
    "href": "./projects/interface-system.html",
    "action": "看我怎么一套一套改到真机上",
    "linkStatus": "internal",
    "visibility": "public",
    "group": "flagship",
    "order": 1,
    "accent": "#ff6508",
    "eyebrow": "COLA × LOKI HUB × CODEX / 我每天在用的这三个工具",
    "anchor": "case-interface-system",
    "image": "assets/cola-inject-shot-1.png",
    "imageAlt": "Cola 个性化界面真机运行截图",
    "imageWidth": 2560,
    "imageHeight": 1600,
    "imageFit": "cover",
    "proof": "九套皮肤真的装进了工具里；关掉再打开，它还记着我上次选的那套。",
    "status": "九套都在真机上跑过，每一套我自己点过一遍",
    "verification": {
      "status": "verified",
      "checkedAt": "2026-08-28",
      "scope": "local-browser",
      "note": "页面里的图都是真机上截的，不是设计稿。"
    }
  },
  {
    "id": "perspective-distillation",
    "date": "08-25",
    "title": "人物视角蒸馏",
    "summary": "有些人的访谈和作品，我会反复看。看多了就想知道，遇到一个新问题，她会先想什么？于是我把公开材料整理成方法，再让模型换道题试试，目前已经攒了 13 个人物档案。",
    "tag": "NUWA 改造",
    "href": "./projects/perspective-distillation.html",
    "action": "浏览人物研究与四人实验",
    "linkStatus": "internal",
    "visibility": "public",
    "group": "flagship",
    "order": 2,
    "accent": "#d7f43c",
    "eyebrow": "公开材料 × 隔离出题 / 看判断能不能搬到新问题上",
    "image": "assets/perspective-liulian-evidence-sheet-01.png",
    "imageAlt": "刘恋公开节目材料的时间帧采样",
    "imageWidth": 1940,
    "imageHeight": 1186,
    "imageFit": "contain",
    "proof": "这里先选六个人给你看，完整案例还留着四人实验。刘恋、鲁豫和 Papi 酱的后续测试也补进来了，每一轮的题和分数分开说。",
    "status": "只在我自己机器上跑，还没给别人用过",
    "verification": {
      "status": "verified",
      "checkedAt": "2026-08-28",
      "scope": "local-browser",
      "note": "材料表对应的都是公开节目，我用的时候没改动原话。"
    }
  },
  {
    "id": "inkpanda",
    "date": "06-28",
    "title": "InkPanda · AI 长篇写作",
    "summary": "我用 AI 写长篇，最烦写到后面把前面忘了，人物受过的伤、埋过的伏笔又得我提醒。所以我把正文、人物和前情放在一起，接着写之前，先把该记得的找回来。",
    "tag": "写作平台",
    "href": "./projects/inkpanda.html",
    "action": "看真的产品界面",
    "linkStatus": "internal",
    "visibility": "public",
    "group": "flagship",
    "order": 3,
    "accent": "#d69a55",
    "eyebrow": "上下文 × 记忆 × 一致性 / 写第八十章的时候，别忘了第八章",
    "anchor": "case-inkpanda",
    "image": "assets/inkpanda-editor.png",
    "imageAlt": "InkPanda 真实编辑器界面",
    "imageWidth": 2000,
    "imageHeight": 1114,
    "imageFit": "cover",
    "proof": "图是真编辑器的截图，正文、人物、前情和写作工具在同一块工作区里；要看全部功能得登录。",
    "status": "已经开放，看完整功能要登录",
    "publicLink": {
      "href": "https://inkxiaoxiongmao.hiloki.ai/",
      "label": "打开 InkPanda",
      "status": "verified",
      "checkedAt": "2026-08-29"
    },
    "verification": {
      "status": "pending",
      "checkedAt": "2026-08-29",
      "scope": "local-browser",
      "note": "界面截图来自本机，公开入口能打开；登录之后的交互待逐页试用。"
    },
    "systemEvidence": [
      {
        "label": "继续写之前",
        "value": "动笔之前先把人物、世界观、伏笔和时间线找回来。这套记忆检查是产品里的一部分，我把它算进这件作品，没单列成一个 Skill。"
      }
    ]
  },
  {
    "id": "daily-insight",
    "date": "08-25",
    "title": "每日洞见系统",
    "summary": "我让 Cola 每天拆一本书，但光给我几句金句肯定不够。我想先知道它讲了什么，再看看跟我有什么关系。现在已经存了 28 篇，最新的是《禅与摩托车维修艺术》。",
    "tag": "阅读系统",
    "href": "./projects/daily-insight.html",
    "action": "翻看拆书文稿与早期样例",
    "linkStatus": "internal",
    "visibility": "public",
    "group": "workflow",
    "order": 4,
    "accent": "#eee5d5",
    "eyebrow": "阅读 × 回看 / 每天留一张卡，过几个月回来找自己",
    "image": "assets/exhibition-reading-desk-v1.webp",
    "imageAlt": "每日洞见系统公开展台的视觉导览图",
    "imageWidth": 1915,
    "imageHeight": 821,
    "imageFit": "cover",
    "proof": "28 篇文稿都能在这里翻，最新到 2026 年 9 月 19 日。案例里还留着最早四天的互动卡片，方便看看当初做成了什么样。",
    "status": "文稿更新到 Day 28 · 2026-09-19",
    "systemKind": "AI 阅读工作流",
    "systemEvidence": [
      {
        "label": "每日动作",
        "value": "从一本书留下一个冲突、边界和问题"
      },
      {
        "label": "留下记录",
        "value": "28 篇文稿保存在 Obsidian，最早四天另有互动样例"
      },
      {
        "label": "未来调用",
        "value": "按日期回看，过一阵子它会回来找我"
      }
    ],
    "verification": {
      "status": "pending",
      "checkedAt": "2026-08-29",
      "scope": "local-browser",
      "note": "我核对了本地 28 篇文稿；导读内容还待逐页对照原书，文稿日期也不代替自动任务的运行日志。"
    }
  },
  {
    "id": "loki-health",
    "date": "08-22",
    "title": "Loki's Health",
    "summary": "睡眠、运动在 Apple 健康里，吃了什么、喝了多少水、药有没有忘，又得去别处找。我想把这些放到一起，记录先存在自己的设备上，哪天想回头看也能找得到。",
    "tag": "我的身体节律",
    "href": "./projects/loki-health.html",
    "action": "看脱敏后的界面",
    "linkStatus": "internal",
    "visibility": "public",
    "group": "workflow",
    "order": 5,
    "accent": "#94d668",
    "eyebrow": "本地优先 × 脱敏 / 身体的事，数据不出我这台电脑",
    "image": "assets/health-today-desktop-redacted.png",
    "imageAlt": "Loki's Health 本地真实产品的脱敏桌面截图",
    "imageWidth": 1440,
    "imageHeight": 1172,
    "imageFit": "contain",
    "proof": "界面是真的，图上的数字都改过；功能就照实际打开的样子算。",
    "status": "真实产品，截图里的数值都脱敏了",
    "publicLink": {
      "href": "https://lokihealthy.hiloki.ai/",
      "label": "打开 Loki's Health",
      "status": "verified",
      "checkedAt": "2026-08-29"
    },
    "systemKind": "个人记录系统（非 AI 核心）",
    "systemEvidence": [
      {
        "label": "持续入口",
        "value": "喝没喝水、吃了什么、动没动，都记在一处"
      },
      {
        "label": "留下记录",
        "value": "同步来的数据和我自己手填的分开存，也分开看"
      },
      {
        "label": "公开边界",
        "value": "只放脱敏截图，真实数值不公开"
      }
    ],
    "verification": {
      "status": "pending",
      "checkedAt": "2026-08-29",
      "scope": "local-browser",
      "note": "截的是本机真实界面，数值做过处理；交互细节待逐项试用。"
    }
  },
  {
    "id": "loki-ebook-converter",
    "date": "08-11",
    "title": "Loki 电子书转换器",
    "summary": "我就想给电子书换个格式，每次还得重新熟悉 Calibre 那个界面。干脆给它做个壳，拖进去、选格式、等它转完，常用的几步放在面前就够了。",
    "tag": "MACOS 1.1.2 · WIN 1.1.1",
    "href": "./projects/ebook-converter.html",
    "action": "看它长什么样",
    "linkStatus": "internal",
    "visibility": "public",
    "group": "productization",
    "order": 6,
    "accent": "#ff397f",
    "eyebrow": "MACOS 1.1.2 × WINDOWS 1.1.1 / 把 Calibre 的命令行藏起来",
    "image": "assets/ebook-app-home.png",
    "imageAlt": "Loki 电子书转换器真实桌面界面",
    "imageWidth": 1280,
    "imageHeight": 900,
    "imageFit": "cover",
    "proof": "这是真桌面应用。macOS 和 Windows 两个版本都能下载安装。",
    "status": "已经发版，能下载",
    "publicLink": {
      "href": "https://github.com/loki2046-mao/loki-ebook-converter/releases/tag/v1.1.2",
      "label": "前往下载页",
      "status": "verified",
      "checkedAt": "2026-08-29"
    },
    "verification": {
      "status": "verified",
      "checkedAt": "2026-08-29",
      "scope": "release-page",
      "note": "Release 页面和 DMG 我核对过；那两个安装包我这次没有下载下来实际装一遍。"
    }
  },
  {
    "id": "lian",
    "date": "06-17",
    "title": "恋之上上签",
    "summary": "我喜欢刘恋，也喜欢她的词，就想让更多人看到。答案之书大家都知道嘛，我做了个歌词版，从 44 首歌里挑了 147 条短句，写下心情就能抽一张。",
    "tag": "歌词答案书",
    "href": "./projects/lian.html",
    "action": "看它怎么抽",
    "linkStatus": "internal",
    "visibility": "public",
    "group": "personal-practice",
    "order": 7,
    "accent": "#ffb53e",
    "eyebrow": "私人喜欢 × 版权边界 / 44 首歌、147 条我自己挑的短句",
    "image": "assets/lian-draw-result.jpg",
    "imageAlt": "恋之上上签真实抽签结果页",
    "imageWidth": 2000,
    "imageHeight": 1407,
    "imageFit": "cover",
    "proof": "抽签结果和 16 套卡片都是当时真的用出来的样子，不是做出来的示意图。",
    "status": "入口能打开，抽签那一步我还没逐个验过",
    "publicLink": {
      "href": "https://lian.hiloki.ai/",
      "label": "打开恋之上上签",
      "status": "verified",
      "checkedAt": "2026-08-29"
    },
    "verification": {
      "status": "pending",
      "checkedAt": "2026-08-29",
      "scope": "local-browser",
      "note": "截图是当时留下来的，公开入口能打开；抽签交互待逐项试用。"
    }
  },
  {
    "id": "qichi-life-os",
    "date": "07-05",
    "title": "栖迟人生系统",
    "summary": "我跟 AI 聊得挺多，但它要是一直顺着我、一直哄，我聊完也没解决什么。后来就把情绪、行为、思维、人格分开，让它每天回头看我的记录，把反复出现的问题写进 Obsidian。",
    "tag": "个人复盘系统",
    "href": "./projects/qichi-life-os.html",
    "action": "看它怎么自动跑",
    "linkStatus": "internal",
    "visibility": "public",
    "group": "workflow",
    "order": 8,
    "accent": "#9bdde9",
    "eyebrow": "CRON 复盘 × 模式识别 / 这个站的站名就是从它来的",
    "image": "projects/assets/real/qichi-life-os/cron-config.png",
    "imageAlt": "栖迟人生系统本机 cron 任务配置与运行记录渲染图",
    "imageWidth": 1200,
    "imageHeight": 1308,
    "imageFit": "cover",
    "proof": "我本机的 cron 跑过 50 次日复盘、7 次周复盘，结果写进 Obsidian 栖迟系统库（173 篇文档）。结构可以公开，正文是我的私人记录。",
    "status": "一直在跑，复盘正文不公开",
    "verification": {
      "status": "verified",
      "checkedAt": "2026-09-14",
      "scope": "local-cron",
      "note": "cron 配置、运行记录和输出目录都对过；复盘正文是私人内容，我不做公开的核对。"
    },
    "systemKind": "个人复盘工作流",
    "systemEvidence": [
      {
        "label": "输入",
        "value": "从日记和任务记录里回看一天"
      },
      {
        "label": "处理",
        "value": "按情绪、行为、思维、人格四层整理"
      },
      {
        "label": "输出",
        "value": "复盘保存到 Obsidian，正文不公开"
      }
    ]
  },
  {
    "id": "edu-content-line",
    "date": "04-13",
    "title": "教育内容生产线",
    "summary": "我做教育内容，经常要出课件。结果语文那套一换到数学，居然冒出【作者生平】……那肯定不行啊。后来我把学科分开做，又接着做古诗词母稿和视频分镜。",
    "tag": "教研提示词系统",
    "href": "./projects/edu-content-line.html",
    "action": "看这条线怎么长出来",
    "linkStatus": "internal",
    "visibility": "public",
    "group": "workflow",
    "order": 9,
    "accent": "#d7f43c",
    "eyebrow": "PPT DNA 迁移 × 教研母稿 / 骨架拆一次，别的学科接上去",
    "image": "projects/assets/real/edu-content-line/yongge.png",
    "imageAlt": "《咏鹅》教研完整母稿 V4 真实文稿渲染",
    "imageWidth": 1100,
    "imageHeight": 1500,
    "imageFit": "cover",
    "proof": "公开仓库 edu-ppt-prompt-migrator（MIT），加上我本机真的生成出来的课件包和教研母稿；里面的 English courseware generator 有 27 种教学组件。",
    "status": "仓库公开，教研这条线还在继续做",
    "publicLink": {
      "href": "https://github.com/loki2046-mao/edu-ppt-prompt-migrator",
      "label": "查看公开仓库",
      "status": "verified",
      "checkedAt": "2026-09-14"
    },
    "verification": {
      "status": "verified",
      "checkedAt": "2026-09-14",
      "scope": "local-repo",
      "note": "仓库署名、MIT 许可、本机生成的课件包和母稿都对过；成片动画我没做，这里也没写有。"
    },
    "systemKind": "教育内容制作工作流",
    "systemEvidence": [
      {
        "label": "课件",
        "value": "提示词拆成七套学科骨架"
      },
      {
        "label": "教研",
        "value": "古诗词教学先形成教研母稿"
      },
      {
        "label": "分镜",
        "value": "从母稿继续拆成 15 秒视频分镜，尚无成片"
      }
    ]
  },
  {
    "id": "ai-career-compass",
    "date": "07-02",
    "title": "AI 求职教练",
    "summary": "我招人的时候看简历，很多人写得都差不多，套个模板也看不出他做过什么。我就想做个工具，把岗位要求和手上的经历拆开看，最后落到简历怎么改、接下来七天能做什么。",
    "tag": "CAREER COMPASS",
    "href": "./projects/ai-career-compass.html",
    "action": "看报告给了什么下一步",
    "linkStatus": "internal",
    "visibility": "public",
    "group": "workflow",
    "order": 10,
    "accent": "#7f9df7",
    "eyebrow": "三维评分 × 四类判决 / 回答下一步，不贩卖焦虑",
    "image": "projects/assets/real/ai-career-compass/eval-scoring-table.png",
    "imageAlt": "AI 求职教练真实报告的岗位任务评分表节选",
    "imageWidth": 1600,
    "imageHeight": 1125,
    "imageFit": "cover",
    "proof": "公开仓库里躺着 v1 到 v2 的全过程（2026-07-02 到 09-10）；两份报告（广告学、社会学）是真的跑完的，截图也是从这两份里截的。",
    "status": "代码开源，两份真报告就放在站上",
    "publicLink": {
      "href": "https://github.com/loki2046-mao/ai-career-compass",
      "label": "查看公开仓库",
      "status": "verified",
      "checkedAt": "2026-09-14"
    },
    "verification": {
      "status": "verified",
      "checkedAt": "2026-09-14",
      "scope": "local-repo",
      "note": "仓库时间线和报告原文都对过；这两份是个案样本，不能当统计结论看。"
    },
    "systemKind": "求职与职业分析工作流",
    "systemEvidence": [
      {
        "label": "输入",
        "value": "在岗工作记录或求职 JD"
      },
      {
        "label": "分析",
        "value": "可替代性、人类必要性、资产性三维评分"
      },
      {
        "label": "输出",
        "value": "简历修改与七天行动计划，案例页展示报告样本"
      }
    ]
  },
  {
    "id": "loki-assistant",
    "date": "06-17",
    "title": "雾尼 Munin",
    "summary": "Cola 记得我，Codex 也记得我，可它们怎么记、记了什么，我不一定看得清。所以我给自己做了雾尼，接上 Obsidian，能找笔记、能看记忆，也能看它到底调了哪些工具。",
    "tag": "个人 AI 助手",
    "href": "./projects/loki-assistant.html",
    "action": "看脱敏后的界面",
    "linkStatus": "internal",
    "visibility": "public",
    "group": "productization",
    "order": 11,
    "accent": "#8fd0c9",
    "eyebrow": "本地优先 × 记忆库 / 记住我，也让我看得见它干了什么",
    "image": "projects/assets/real/loki-assistant/workspace-welcome.png",
    "imageAlt": "雾尼 Munin（Loki Assistant）本地运行的对话工作台空状态截图",
    "imageWidth": 1600,
    "imageHeight": 1000,
    "imageFit": "cover",
    "proof": "在我本机上真跑：2026-05-23 到 09-13 一共 273 条 commit，99 条记忆、318 个会话、2237 篇笔记索引都在本地。这个页面只放脱敏界面。",
    "status": "我自己的产品，页面只放脱敏后的界面",
    "systemEvidence": [
      {
        "label": "记住你",
        "value": "事实、模式、历史、碎片四类记忆它自己提炼，对话前把相关的捞出来"
      },
      {
        "label": "能干活",
        "value": "它调了哪些工具都留痕，能回头翻；产物落到磁盘上验过才算完成"
      },
      {
        "label": "公开边界",
        "value": "代码不开源，记忆和笔记都是私人的，页面上只放脱敏界面"
      }
    ],
    "verification": {
      "status": "verified",
      "checkedAt": "2026-09-14",
      "scope": "local-run",
      "note": "截图来自本机运行，页面里没有私人内容；记忆和笔记正文我不公开。"
    }
  }
]
});
