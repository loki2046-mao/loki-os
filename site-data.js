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
  // Project content lives in public-data.js; load it before this metadata file.
  projects: Object.freeze(window.bookData.projects)
});
