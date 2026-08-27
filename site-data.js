window.LOKI_OS_SITE_DATA = Object.freeze({
  publicationStatus: 'verified',
  updatedAt: '2026-08-26',
  gearModules: Object.freeze([
    Object.freeze({ id: 'cola-skins', code: 'CASE-01', title: 'Cola 九套皮肤', readout: '把每天长时间使用的 AI 工具，改造成有个人视觉秩序、会记住选择的空间。', proof: '九套原型与真机运行画面', href: './projects/interface-system.html?room=cola', action: '看真实界面', image: './projects/assets/real/cola/inject-shot-1.png', tags: Object.freeze(['9 套原型', '真机运行', '选择记忆']) }),
    Object.freeze({ id: 'hub-skins', code: 'CASE-02', title: 'Loki Hub 十二套界面', readout: '同一个内容产品，做出十二套能够真正阅读、切换并适配移动端的界面。', proof: '十二套真实界面与桌面、移动端验收', href: './projects/interface-system.html?room=hub', action: '看真实页面', image: './projects/assets/real/hub/ui-selection-board.png', tags: Object.freeze(['12 套界面', '真实内容', '双端验收']) }),
    Object.freeze({ id: 'codex-theme', code: 'CASE-03', title: 'Codex 刘恋拼贴主题', readout: '不是贴一张背景图，而是把任务卡、菜单、对话框、输入区与透明宠物一起重做。', proof: '四类核心组件与真实人物资产', href: './projects/interface-system.html?room=codex', action: '看完整改造', image: './projects/assets/exhibition/codex-liulian-cutout.webp', tags: Object.freeze(['任务卡', '对话框', '宠物分离']) }),
    Object.freeze({ id: 'daily-insight', code: 'CASE-04', title: '每日洞见 · unbook', readout: '把“坚持读两年书”改造成每天留下一张能在未来被重新调用的问题卡。', proof: '四天真实洞见、四套工具与四个问题', href: './projects/daily-insight.html', action: '翻开四天记录', image: './projects/assets/exhibition/hub-real-verify-ui-body.webp', tags: Object.freeze(['Day 01—04', '洞见卡', '复习入口']) }),
    Object.freeze({ id: 'perspective', code: 'CASE-05', title: '人物视角蒸馏', readout: '从我真正喜欢的人身上，提取有证据、可评测、知道何时拒答的判断方式。', proof: '四个人物、公开证据与隔离留出评测', href: './projects/perspective-distillation.html', action: '进入四人工作区', image: './projects/assets/real/perspective/liulian-evidence-sheet-01.png', tags: Object.freeze(['刘恋', '刘旸', '鲁豫', 'Papi酱']) }),
    Object.freeze({ id: 'ebook', code: 'CASE-06', title: 'Loki 电子书转换器', readout: '把 Calibre 的复杂转换能力，做成不需要命令行的拖拽桌面工具。', proof: 'macOS 与 Windows 真实安装包', href: './projects/ebook-converter.html', action: '看产品怎么把复杂度藏起来', image: './projects/assets/real/ebook/app-home.png', tags: Object.freeze(['macOS 1.1.2', 'Windows 1.1.1', '批量转换']) }),
    Object.freeze({ id: 'inkpanda', code: 'CASE-07', title: 'InkPanda 长篇写作', readout: '不把长篇写作缩成一个聊天框，而是替作者照看人物、世界观、伏笔与远期记忆。', proof: '首页、编辑器、纲要与发现页真实界面', href: './projects/inkpanda.html', action: '看真实产品与核心判断', image: './projects/assets/real/inkpanda/editor.png', tags: Object.freeze(['长篇结构', '上下文记忆', '一致性检查']) }),
    Object.freeze({ id: 'lian', code: 'CASE-08', title: '恋之上上签', readout: '把对刘恋的喜欢，做成一件有版权边界、有审美判断、真的能陪人一晚的作品。', proof: '44 首歌、147 条精选短句与 16 套卡片视觉', href: './projects/lian.html', action: '看它为什么不是 AI 玩具', image: './projects/assets/real/lian/draw-result.jpg', tags: Object.freeze(['44 首歌', '147 条短句', '16 套视觉']) }),
  ]),
  projects: [
    {
      id: 'interface-system', date: '08-24', title: '个人化界面系统',
      summary: '展示我如何把体验诊断、视觉系统、前端实现和真实 UI 验收连成一次完整改造。',
      tag: 'COLA × HUB × CODEX', href: './projects/interface-system.html',
      action: '看我如何把审美做成产品', linkStatus: 'internal', visibility: 'public',
    },
    {
      id: 'loki-ebook-converter', date: '08-11', title: 'Loki 电子书转换器',
      summary: '把复杂的 Calibre 转换能力，做成可直接拖拽使用的桌面工具。',
      tag: 'MACOS 1.1.2 · WIN 1.1.1',
      href: './projects/ebook-converter.html',
      action: '看我如何把复杂能力做简单', linkStatus: 'internal', visibility: 'public',
    },
    {
      id: 'daily-insight', date: '08-25', title: '730 天每日洞见系统',
      summary: '展示我如何把一个长期愿望，拆成每天运行、持续产出并能被未来调用的内容系统。',
      tag: '阅读系统', href: './projects/daily-insight.html',
      action: '看我如何让长期目标运行', linkStatus: 'internal', visibility: 'public',
    },
    {
      id: 'perspective-distillation', date: '08-25', title: '人物视角蒸馏',
      summary: '展示我如何把难以言传的判断，做成有证据、可评测、知道何时拒答的 AI Skill。',
      tag: 'NUWA 改造', href: './projects/perspective-distillation.html',
      action: '看我如何蒸馏隐性判断', linkStatus: 'internal', visibility: 'public',
    },
    {
      id: 'loki-health', date: '08-22', title: "Loki's health",
      summary: '一个连接 HealthKit、围绕真实生活记录生长的本地优先健康 App。',
      tag: '我的身体节律', href: './projects/loki-health.html', action: '进入健康系统展台',
      linkStatus: 'internal', visibility: 'public',
    },
    {
      id: 'inkpanda', date: '06-28', title: 'InkPanda · 长篇写作平台',
      summary: '为长篇创作处理人物、上下文和连续写作负担的 AI 写作空间。',
      tag: '写作平台', href: './projects/inkpanda.html',
      action: '看真实产品与长篇判断', linkStatus: 'internal', visibility: 'public',
    },
    {
      id: 'lian', date: '06-17', title: '恋之上上签',
      summary: '把 44 首歌与 147 条歌词，做成一册可以随机翻开的答案书。',
      tag: '歌词答案书', href: './projects/lian.html',
      action: '看喜欢如何变成作品', linkStatus: 'internal', visibility: 'public',
    },
  ],
});
