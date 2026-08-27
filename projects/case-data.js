window.LOKI_CASE_DATA = Object.freeze({
  updatedAt: '2026-08-26',
  perspectiveDistillation: Object.freeze({
    sourceLabel: '人物视角蒸馏工作区',
    people: Object.freeze([
      Object.freeze({
        id: 'liulian', name: '刘恋', role: '音乐 / 广告 / 综艺 / 写作', version: 'v0.2',
        score: '35/36', scoreLabel: 'v0.1 内部盲评',
        headline: '刘恋 Skill v0.1 内部盲评报告（r2）',
        description: '报告日期 2026-08-25；性质为执行者盲评的内部干跑，非独立外部验证。当前 README 状态为 v0.2。',
        facts: Object.freeze(['r2：35/36，通过', '无硬失败', '待 v0.3 合成与回归']),
        state: 'v0.2', tone: 'cyan',
      }),
      Object.freeze({
        id: 'liuyang', name: '刘旸', role: '创作机制 / 决策启发式', version: 'v0.4',
        score: '36/42', scoreLabel: '第二轮全新留出盲测',
        headline: '刘旸视角 Skill v0.4 全新留出盲测报告',
        description: '测试日期 2026-08-24；留出材料与训练集无重叠。报告定性为执行者盲评的内部干跑。',
        facts: Object.freeze(['36/42，通过', 'T5 必须通过项已通过', '无硬失败']),
        state: '已通过两轮', tone: 'acid',
      }),
      Object.freeze({
        id: 'luyu', name: '鲁豫', role: '职业判断 / 提问与倾听', version: 'v0.1',
        score: '32/36', scoreLabel: '修正口径留出评测',
        headline: '鲁豫视角 Skill v0.1 留出集盲测报告',
        description: '修正口径 32/36，通过；严格口径 28/36，未过线。两种口径均在原报告保留。',
        facts: Object.freeze(['修正口径 32/36', '严格口径 28/36', '无硬失败；T6 通过']),
        state: '可升级 v0.2', tone: 'orange',
      }),
      Object.freeze({
        id: 'papi', name: 'Papi酱', role: '短视频创作 / 商业化 / 转型', version: 'v0.1',
        score: '—', scoreLabel: '2026-08-26 建档 · 未盲测',
        headline: 'Papi酱视角蒸馏 v0.1',
        description: 'A—D 四路研究档案已经落盘；早期作品逐字/逐帧材料与近期节目字幕仍有缺口。',
        facts: Object.freeze(['四路研究档案已建', '不把角色台词当本人日常口语', '尚未盲测']),
        state: '采集中', tone: 'pink',
      }),
    ]),
  }),
});
