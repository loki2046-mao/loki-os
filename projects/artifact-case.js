(()=>{
  const daily={
    '01':{title:'《人类群星闪耀时》',author:'斯蒂芬·茨威格',date:'2026-08-23',type:'传记 · 金句日',tone:'#44cfff',day:'DAY 01',insight:'准备不是为了保证成功；准备是为了在不可预告的门打开时，你不至于缺席。',tool:'双账本复盘',toolRows:[['投入账','我持续练了什么、积累了什么？'],['窗口账','本周出现了什么窗口？我为什么没看见或没接住？']],personal:'把“成功路径由偶然叠加”从一句人生判断，变成一套可使用的注意力模型。',question:'哪一扇门值得你守，哪一扇门只是让你显得很忙？'},
    '02':{title:'《乡土中国》',author:'费孝通',date:'2026-08-24',type:'人文社科 · 行动挑战日',tone:'#ff7a22',day:'DAY 02',insight:'差序格局不是“重关系”的文化标签，而是一套随关系距离分配信任、责任和资源的算法。',tool:'关系距离地图',toolRows:[['外圈','他为什么愿意停下来？'],['内圈','你是否把信任当作可无限调用的资源？']],personal:'把抽象的“用户”重新看成距离不同、责任也不同的具体的人。',question:'你今天的一次内容触达，是在扩大关系，还是只在对最外圈喊话？'},
    '03':{title:'《82年生的金智英》',author:'赵南柱',date:'2026-08-25',type:'女性主义 · 行动挑战日',tone:'#ff3e8a',day:'DAY 03',insight:'不平等最顽固的形态，往往不是明显恶意，而是无数次“正常选择”叠加后的复利。',tool:'默认债主标注',toolRows:[['隐形劳动','谁做了，却没有被命名？'],['选择权','谁能拒绝，谁拒绝就要付更高代价？']],personal:'不把“独立”和“成长”继续写成一份需要女性独自完成的新任务清单。',question:'你今天说的哪一句“这很正常”，让某个人继续承担了没有被命名的劳动？'},
    '04':{title:'《长安的荔枝》',author:'马伯庸',date:'2026-08-26',type:'文学 · 行动挑战日',tone:'#d8f044',day:'DAY 04',insight:'完成一个“不可能”任务的真正难关，不在开始时的难度，而在成功之后，如何面对为此交出去的东西。',tool:'给“不可能”开三本账',toolRows:[['拆解账','真正卡住的是哪个变量？'],['代价账','谁在替我付代价？'],['完成账','做到了以后，我还认不认现在的自己？']],personal:'把熟悉的“再拼一点就能成”，从执行问题翻转成一个价值观问题。',question:'你最近拼下来的那件事，是在运荔枝，还是在决定你成为谁？'}
  };
  const people={
  "liulian": {
    "name": "刘恋",
    "version": "v0.3",
    "state": "内容通过，格式修复后通过",
    "score": "48 / 48",
    "scoreLabel": "v0.3：内容 40/40，最终格式 8/8",
    "lens": "把复杂压力压成一个中心命题，再变成能交付的表达。",
    "reason": "我会反复看刘恋的访谈、舞台和文字。她做广告时用的办法，换到写词、做舞台时还能看到一些影子，我就想把这些具体怎么做的留住。",
    "entry": "作品要给谁看、入口在哪里、最后要交付什么",
    "action": "先找中心句，再把压力翻译成提案、排练或版本",
    "refusal": "不拿创作意图要求观众“必须看懂”",
    "boundary": "这是公开表达与工作动作的组织方式，不是性格本质；广告职业创作、歌词署名和私人经历必须分层。",
    "photo": "./assets/real/perspective/liulian-evidence-sheet-01.png",
    "photoAlt": "刘恋公开节目材料真实帧采样表",
    "photoCaption": "刘恋 / 近期公开节目材料帧采样",
    "files": [
      "可执行的人物视角 Skill",
      "四条材料线与证据分级档案",
      "隔离留出题与评分键",
      "失分、反例与回归报告"
    ],
    "layers": {
      "why": {
        "kicker": "WHY I CARE",
        "title": "我为什么会一直看她",
        "copy": "我喜欢她的表达，又不想只停在【好会说】。能不能从材料里看清楚她怎么把一个想法讲明白，再换个问题试试，这件事我挺想做的。",
        "items": [
          "喜欢她在不同媒介里仍然保留同一套交付意识",
          "想学的是把模糊压力变成清楚中心句的方法",
          "不复制声音、外貌或私人性格"
        ]
      },
      "media": {
        "kicker": "WHAT I STUDIED",
        "title": "广告提案、歌词、舞台表达与长访谈必须分开看。",
        "copy": "我把本人怎么说、节目里发生了什么、别人怎么评价分开记。材料不完整的地方也标着，免得把我自己的推测写成了她的原话。",
        "items": [
          "节目帧逐段取样，观察她如何进入问题和收束表达",
          "把广告职业方法与音乐创作分别建证据线",
          "用新题检验判断是否能跨媒介迁移"
        ]
      },
      "output": {
        "kicker": "WHAT REMAINS",
        "title": "留下来的不是一句刘恋式文案，而是一套“中心命题—入口—交付”的判断链。",
        "copy": "这里留了整理出来的方法，也留了答错、重跑和还不知道的地方。想试它有没有用，可以从一个具体问题开始。",
        "items": [
          "先确认给谁看，再决定第一入口",
          "把压力翻译成可交付的版本",
          "明确记录反例、失分与不知道"
        ]
      }
    }
  },
  "liuyang": {
    "name": "刘旸",
    "version": "v0.4",
    "state": "两轮留出盲测通过",
    "score": "36 / 42",
    "scoreLabel": "全新留出材料；85.7% 通过",
    "lens": "把痛苦拆出荒谬结构，再把一次失败放回更长的时间线。",
    "reason": "他把创作技术、职业转向、持续训练和自我叙事放在同一个工作系统里。这个样本用来测试：幽默能否保留真实问题，而不是把问题轻轻消解。",
    "entry": "事件里真正的痛点、荒谬结构与人物之间的“受力”",
    "action": "把真实经验变成结构，再用不同媒介训练不同肌肉",
    "refusal": "不让励志话术覆盖生计、健康或结构性困难",
    "boundary": "理解不等于认同，幽默也不等于问题已经解决；舞台人设不能覆盖完整人格。",
    "photo": "./assets/real/perspective/liuyang-stage.jpg",
    "photoAlt": "刘旸在喜人奇妙夜舞台的公开节目画面",
    "photoCaption": "刘旸 / 喜人奇妙夜舞台",
    "photoCredit": "https://www.thepaper.cn/newsDetail_forward_28679892",
    "files": [
      "7 个核心心智模型",
      "13 条可执行决策启发式",
      "两轮独立留出评测",
      "隔离检查与回归记录"
    ],
    "layers": {
      "why": {
        "kicker": "WHY I CARE",
        "title": "我为什么会一直看他",
        "copy": "他怎么把失利和低谷写进创作里，是我愿意继续看的部分。我想留下具体的写法和选择，光给他贴个励志标签太省事了。",
        "items": [
          "想学荒谬结构如何从真实痛点里长出来",
          "想看一次挫败如何被放回更长的创作时间线",
          "不把乐观误写成轻飘飘的励志"
        ]
      },
      "media": {
        "kicker": "WHAT I STUDIED",
        "title": "专场、播客、职业访谈和作品复盘给出的是不同切面。",
        "copy": "我把本人怎么说、节目里发生了什么、别人怎么评价分开记。材料不完整的地方也标着，免得把我自己的推测写成了他的原话。",
        "items": [
          "从专场与节目观察结构和节奏",
          "从长访谈与播客校对职业判断",
          "用全新材料做第二轮留出，避免背答案"
        ]
      },
      "output": {
        "kicker": "WHAT REMAINS",
        "title": "留下来的是“痛点—荒谬结构—长期在场”的工作方法。",
        "copy": "这里留了整理出来的方法，也留了答错、重跑和还不知道的地方。想试它有没有用，可以从一个具体问题开始。",
        "items": [
          "先找到事情真正疼在哪里",
          "用结构制造距离，而不是抹掉现实",
          "把一次得失放回长期创作系统"
        ]
      }
    }
  },
  "luyu": {
    "name": "鲁豫",
    "version": "Skill v0.2",
    "state": "已完成 v0.3 新题验证",
    "score": "60 / 60",
    "scoreLabel": "v0.3 题组：内容 40/40，格式 20/20",
    "lens": "提问只是下游表现；上游是媒体人的职业判断与边界。",
    "reason": "我想看她什么时候追问、什么时候停，也想知道这些选择跟她做媒体的经历有什么关系。所以材料里既有采访，也留着她自己的职业判断。",
    "entry": "对方是否愿意谈、问题是否成立、什么载体能留下完整语境",
    "action": "从具体细节进入，允许修正，收尾时把未问出口的问题也交还现场",
    "refusal": "不把“挖到隐私”当赢，也不替嘉宾开人生处方",
    "boundary": "只建模公开工作场景中的职业判断；机器转写、节目剪辑和她本人原话必须分开。",
    "photo": "./assets/real/perspective/luyu-slow-conversation.jpg",
    "photoAlt": "陈鲁豫慢谈第一期公开节目封面",
    "photoCaption": "陈鲁豫·慢谈 / 首期节目封面",
    "photoCredit": "https://www.bilibili.com/video/BV1jCpizuEPg/",
    "files": [
      "8 个职业判断心智模型",
      "22 条决策启发式",
      "四路公开材料档案",
      "严格与修正两套评分口径"
    ],
    "layers": {
      "why": {
        "kicker": "WHY I CARE",
        "title": "我为什么会一直看她",
        "copy": "我会看她怎么听，也会看她决定不再追问的那一下。问题问得好当然重要，但有些地方为什么停，我也想知道。",
        "items": [
          "喜欢她从具体细节进入，而不是先贴标签",
          "想学如何允许嘉宾修正主持人的预设",
          "把“不追问”也看成一种判断"
        ]
      },
      "media": {
        "kicker": "WHAT I STUDIED",
        "title": "长访谈、本人文字、职业复盘和他者视角被放在不同证据层。",
        "copy": "我把本人怎么说、节目里发生了什么、别人怎么评价分开记。材料不完整的地方也标着，免得把我自己的推测写成了她的原话。",
        "items": [
          "长对话节目观察进入、追问与收尾",
          "本人文章和访谈校对职业观",
          "用严格与修正两套口径处理转写误差"
        ]
      },
      "output": {
        "kicker": "WHAT REMAINS",
        "title": "留下来的是一套“成立性—愿意度—完整语境—边界”的采访判断。",
        "copy": "这里留了整理出来的方法，也留了答错、重跑和还不知道的地方。想试它有没有用，可以从一个具体问题开始。",
        "items": [
          "先判断问题是否成立",
          "从细节追问但允许被修正",
          "收尾时保留未问出口的部分"
        ]
      }
    }
  },
  "papi": {
    "name": "Papi酱",
    "version": "v0.2",
    "state": "8 道新题已完成",
    "score": "32 / 32",
    "scoreLabel": "v0.2：内容 16/16，格式 16/16",
    "lens": "先让场景、人物和动作成立，再由观众自己提取议题。",
    "reason": "我想拆开看看，一个生活里的观察，怎么被她做成了能演出来的视频。后面又补了《续航》访谈，继续看兴趣、受众和商业收入放在一起时怎么选。",
    "entry": "具体场景里谁在做什么，角色与本人有没有被混在一起",
    "action": "用脚本、重拍、剪辑和角色并置完成质量控制",
    "refusal": "不把早期变声、跳剪和角色台词冒充现实中的姜逸磊",
    "boundary": "近期节目字幕和早期逐字逐帧仍有缺口；因此只到可观察的制作机制，不补新原话。",
    "photo": "./assets/real/perspective/papi-welcome.png",
    "photoAlt": "Papi酱热烈欢迎公开节目画面",
    "photoCaption": "Papi酱 /《热烈欢迎》节目画面",
    "photoCredit": "https://pangjing.cn/6104401-2/",
    "files": [
      "v0.1 人物视角 Skill",
      "本人表达与近期节目档案",
      "早期作品制作机制补采",
      "待建立的独立留出评测"
    ],
    "layers": {
      "why": {
        "kicker": "WHY I CARE",
        "title": "我为什么会一直看她",
        "copy": "我想看的有她怎么写、怎么演、怎么剪，也有她在什么地方会说不行。镜头里的角色和现实中的她得分开，不能混着学。",
        "items": [
          "想学场景如何自己生产观点",
          "想分清角色表达、本人判断和制作人决策",
          "关注爆款之后仍然存在的长期生产能力"
        ]
      },
      "media": {
        "kicker": "WHAT I STUDIED",
        "title": "早期短视频、近期节目、制作复盘与本人表达必须互相校正。",
        "copy": "我把本人怎么说、节目里发生了什么、别人怎么评价分开记。材料不完整的地方也标着，免得把我自己的推测写成了她的原话。",
        "items": [
          "逐段观察场景、角色、动作和剪辑关系",
          "把本人表达与角色台词严格分开",
          "对缺失字幕和早期材料明确留白"
        ]
      },
      "output": {
        "kicker": "WHAT REMAINS",
        "title": "目前留下的是“场景先行—角色分层—制作闭环”的一轮初步判断。",
        "copy": "这里留了整理出来的方法，也留了答错、重跑和还不知道的地方。想试它有没有用，可以从一个具体问题开始。",
        "items": [
          "先判断场景是否真实成立",
          "通过角色并置让议题自然出现",
          "用重拍与剪辑完成质量控制"
        ]
      }
    },
    "visualSummary": "这里留的是研究文件的入口，后续的新题和答卷已经补到 v0.2。截图拍得早，当前进度看旁边的文字。"
  }
};
  const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
  qa('[data-day]').forEach(btn=>btn.addEventListener('click',()=>{const d=daily[btn.dataset.day];if(!d)return;qa('[data-day]').forEach(x=>x.classList.toggle('is-active',x===btn));const root=q('[data-daily-stage]');if(root)root.style.setProperty('--daily-tone',d.tone);const write=(s,v)=>{const el=q(s);if(el)el.textContent=v};write('[data-daily-title]',d.title);write('[data-daily-author]',d.author);write('[data-daily-date]',d.date);write('[data-daily-type]',d.type);write('[data-daily-day]',d.day);write('[data-daily-insight]',d.insight);write('[data-daily-tool]',d.tool);write('[data-daily-personal]',d.personal);write('[data-daily-question]',d.question);const rows=q('[data-daily-tool-rows]');if(rows)rows.replaceChildren(...d.toolRows.map(([a,b])=>{const li=document.createElement('li');const strong=document.createElement('strong');strong.textContent=a;const span=document.createElement('span');span.textContent=b;li.append(strong,span);return li;}));}));
  let activePerson='liulian';
  const renderPersonLayer=(key)=>{const layer=people[activePerson]?.layers?.[key];if(!layer)return;qa('[data-person-layer]').forEach(x=>x.classList.toggle('is-active',x.dataset.personLayer===key));const write=(s,v)=>{const el=q(s);if(el)el.textContent=v};write('[data-person-layer-kicker]',layer.kicker);write('[data-person-layer-title]',layer.title);write('[data-person-layer-copy]',layer.copy);const list=q('[data-person-layer-items]');if(list)list.replaceChildren(...layer.items.map(x=>{const li=document.createElement('li');li.textContent=x;return li;}));};
  qa('[data-person]').forEach(btn=>btn.addEventListener('click',()=>{const p=people[btn.dataset.person];if(!p)return;activePerson=btn.dataset.person;qa('[data-person]').forEach(x=>x.classList.toggle('is-active',x===btn));const write=(s,v)=>{const el=q(s);if(el)el.textContent=v};write('[data-person-name]',p.name);write('[data-person-version]',p.version);write('[data-person-state]',p.state);write('[data-person-score]',p.score);write('[data-person-score-label]',p.scoreLabel);write('[data-person-lens]',p.lens);write('[data-person-reason]',p.reason);write('[data-person-entry]',p.entry);write('[data-person-action]',p.action);write('[data-person-refusal]',p.refusal);write('[data-person-boundary]',p.boundary);const photo=q('[data-evidence-photo]'),doc=q('[data-evidence-document]');if(p.photo){photo.hidden=false;doc.hidden=true;const img=q('img',photo);img.src=p.photo;img.alt=p.photoAlt;write('[data-evidence-caption]',p.photoCaption);const credit=q('[data-evidence-credit]');if(credit){credit.hidden=!p.photoCredit;if(p.photoCredit)credit.href=p.photoCredit}}else{photo.hidden=true;doc.hidden=false;write('[data-evidence-kicker]',p.visualKicker);write('[data-evidence-title]',p.visualTitle);write('[data-evidence-summary]',p.visualSummary)}const list=q('[data-person-files]');if(list)list.replaceChildren(...p.files.map(x=>{const li=document.createElement('li');li.textContent=x;return li;}));renderPersonLayer('why');}));
  qa('[data-person-layer]').forEach(btn=>btn.addEventListener('click',()=>renderPersonLayer(btn.dataset.personLayer)));
  q('[data-person="liulian"]')?.click();
  const talks={work:{aName:'鲁豫 · 主持',aTitle:'从一个具体时刻追问代价',aCopy:'不先给结论，而是把“八个观众的夜晚”“第一次把失败讲成段子”单独拎出来，追问当时的人有没有真的翻篇。',bName:'刘旸 × 刘恋 · 嘉宾',bTitle:'同样谈“账”，却保留两套算法',bCopy:'刘旸把低谷改记为创作成本，刘恋把爱好与工作改成平等关系。它们自然汇流，但没有被整理成唯一答案。'},data:{aName:'刘恋 · 作品与交付',aTitle:'给它一个时间，再看入口和前五秒',aCopy:'她把“数据差”拆成已经发布之后删不删、作品入口是否成立、自己选择不改要不要诚实承认。',bName:'Papi酱 · 场景与制作',bTitle:'换个地方、换个人，看它还能不能动',bCopy:'她不急着解释数据，而是回到重看、挪镜头、换场景和再做几条。两个人最终没有得出同一个继续方式。'}};
  qa('[data-talk]').forEach(btn=>btn.addEventListener('click',()=>{const t=talks[btn.dataset.talk];if(!t)return;qa('[data-talk]').forEach(x=>x.classList.toggle('is-active',x===btn));Object.entries({aName:'[data-talk-a-name]',aTitle:'[data-talk-a-title]',aCopy:'[data-talk-a-copy]',bName:'[data-talk-b-name]',bTitle:'[data-talk-b-title]',bCopy:'[data-talk-b-copy]'}).forEach(([key,sel])=>{const el=q(sel);if(el)el.textContent=t[key]})}));
})();
