export const defaultRawInput = `各位家长晚上好，今日10月18日作业：
1. 语文：完成第15课《少年闰土》生字抄写各2遍，重点古诗默写，大声朗读课文1-3自然段。
2. 数学：校内已完成练习册当天题型；回家完成奥数拓展专门册第14页工程问题，试卷错题订正红笔分析思路。
3. 英语：Unit 4单词抄写两英一汉，四线三格规范书写；听读Unit 4课文录音15分钟。
4. 综合小四门：地理填充图册第12页（课堂作业）。
5. 拓展：多邻国2单元打卡，阅读《童年》30分钟。`;

export const defaultExtractedItems = [
  {
    id: 'qk_1',
    subject: 'chinese',
    subjectName: '语文',
    subjectIcon: '📖',
    title: '《少年闰土》生字规范抄写',
    xp: 20,
    highlightBadge: '核心夯实',
    scenario: 'home',
    originalText: '完成第15课《少年闰土》生字抄写各2遍，要求汉字成语带注音与部首结构。',
    metadata: [
      { label: '课次', value: '第15课《少年闰土》' },
      { label: '规格', value: '生字抄写各2遍' },
      { label: '重点', value: '看顿笔与间架结构' }
    ],
    targetSlot: {
      islandName: '【语文关卡·汉字与文学大营】',
      slotIndex: 1,
      slotNote: '首位新增'
    },
    estimatedMinutes: 20,
    isSchoolCompleted: false
  },
  {
    id: 'qk_2',
    subject: 'math',
    subjectName: '数学',
    subjectIcon: '📐',
    title: '奥数专门册 P14 工程问题攻坚',
    xp: 35,
    highlightBadge: '🔥 重点题型',
    scenario: 'home',
    originalText: '回家完成奥数拓展专门册第14页工程问题，包含试卷错题订正红笔分析思路。',
    metadata: [
      { label: '册子', value: '奥数拓展专门册' },
      { label: '页码', value: '第14页全页 (工程问题)' },
      { label: '附加要求', value: '红笔校准思路错题笔记' }
    ],
    targetSlot: {
      islandName: '【数学关卡·逻辑运算迷宫】',
      slotIndex: 2,
      slotNote: '与原错题本智能合流',
      isMerge: true
    },
    estimatedMinutes: 30,
    isSchoolCompleted: false
  },
  {
    id: 'qk_3',
    subject: 'math',
    subjectName: '数学·校内',
    subjectIcon: '📐',
    title: '练习册当天对应单元练习',
    xp: 15,
    highlightBadge: '已在校完成',
    scenario: 'school',
    originalText: '校内已完成练习册当天题型。根据老师指令，已在下午辅导课面批订正。',
    metadata: [
      { label: '册子', value: '课堂配套练习册' },
      { label: '状态', value: '校内面批订正无返工' }
    ],
    targetSlot: {
      islandName: '【数学关卡·已归档项】',
      slotIndex: 4,
      slotNote: '免做标记完成，待家长打卡盖印'
    },
    estimatedMinutes: 0,
    isSchoolCompleted: true
  },
  {
    id: 'qk_4',
    subject: 'english',
    subjectName: '英语',
    subjectIcon: '🧭',
    title: 'Unit 4 单词抄写(两英一汉) + 听读15分钟',
    xp: 25,
    highlightBadge: '双轨达标',
    scenario: 'home',
    originalText: 'Unit 4单词抄写两英一汉，四线三格规范书写；听读Unit 4课文录音15分钟。',
    metadata: [
      { label: '规范', value: 'Unit 4 Core Vocabulary' },
      { label: '格式', value: '抄写 + 语音听读双项' },
      { label: '要求', value: '四线三格本 & 课文同步原音' }
    ],
    targetSlot: {
      islandName: '【英语关卡·环球声韵岛】',
      slotIndex: 1,
      slotNote: '拆分为书写与音频两个子任务'
    },
    estimatedMinutes: 25,
    isSchoolCompleted: false
  },
  {
    id: 'qk_5',
    subject: 'general',
    subjectName: '地理 (小四门)',
    subjectIcon: '🌍',
    title: '填充图册第12页《地形与地势》',
    xp: 15,
    highlightBadge: '课堂作业',
    scenario: 'school',
    originalText: '地理填充图册第12页（课堂作业）。',
    metadata: [
      { label: '科别', value: '地理填充图册' },
      { label: '页码', value: '第12页三大阶梯图' }
    ],
    targetSlot: {
      islandName: '【综合小四门·智慧探索馆】',
      slotIndex: 1,
      slotNote: '新建专属关卡槽位'
    },
    estimatedMinutes: 15,
    isSchoolCompleted: true
  },
  {
    id: 'qk_6',
    subject: 'extra',
    subjectName: '课外拓展',
    subjectIcon: '🚀',
    title: '多邻国双单元打卡 + 《童年》自主阅读30分钟',
    xp: 30,
    highlightBadge: '习惯连胜',
    scenario: 'home',
    originalText: '拓展：多邻国2单元打卡，阅读《童年》30分钟。',
    metadata: [
      { label: '语言', value: '多邻国 2 单元冲刺' },
      { label: '整本书', value: '高尔基《童年》精读批注' }
    ],
    targetSlot: {
      islandName: '【拓展训练·博雅航海日志】',
      slotIndex: 1,
      slotNote: '语言与阅读双模打卡'
    },
    estimatedMinutes: 45,
    isSchoolCompleted: false
  }
];
