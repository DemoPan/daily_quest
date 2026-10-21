export const statsData = {
  dabao: {
    childId: 'dabao',
    name: '大宝',
    avatar: '🦁',
    grade: '六年级 · 知识探险家',
    month: '2026年10月',
    totalDaysInMonth: 31,
    metrics: {
      activeDays: 24,
      totalDays: 31,
      streakDays: 12,
      avgMinutesPerDay: 105,
      diffLastMonthMinutes: -12, // 较上月节省12分钟（效率提升）
      completedTasks: 318,
      completionRate: 98.2,
      satisfactionRate: 96.5,
      goldStampsCount: 23
    },
    weeklyTrend: [
      { day: '周一', minutes: 95, target: 110, completedCount: 11 },
      { day: '周二', minutes: 105, target: 110, completedCount: 12 },
      { day: '周三', minutes: 100, target: 110, completedCount: 11 },
      { day: '周四', minutes: 95, target: 110, completedCount: 13 },
      { day: '周五', minutes: 140, target: 120, completedCount: 15 },
      { day: '周六', minutes: 110, target: 110, completedCount: 12 },
      { day: '周日', minutes: 165, target: 180, completedCount: 14 }
    ],
    subjectBreakdown: [
      { id: 'math', name: '数学', percent: 35, minutes: 38, color: '#3b82f6', icon: '📐' },
      { id: 'chinese', name: '语文', percent: 32, minutes: 34, color: '#f59e0b', icon: '📜' },
      { id: 'english', name: '英语', percent: 20, minutes: 22, color: '#10b981', icon: '🧭' },
      { id: 'science', name: '科学拓展', percent: 13, minutes: 14, color: '#8b5cf6', icon: '🚀' }
    ],
    taskTypesDistribution: {
      homeCount: 207,
      homePercent: 65,
      schoolCount: 111,
      schoolPercent: 35
    },
    frequentPraises: [
      { text: '✨ 专注力飞跃', count: 18, color: 'bg-amber-100 text-amber-800 border-amber-200' },
      { text: '✍️ 字迹工整整洁', count: 15, color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
      { text: '🎯 自主检查订正', count: 12, color: 'bg-blue-100 text-blue-800 border-blue-200' },
      { text: '🚀 告别作业拖拉', count: 9, color: 'bg-purple-100 text-purple-800 border-purple-200' }
    ],
    tutorTip: '大宝已连续两周达成全星评级，知识金币已达 380 枚，快去宝藏屋看看新的拼装模型吧！',
    historyDays: [
      {
        id: '20261018',
        dateStr: '10月18日',
        dayOfWeek: '周日',
        isToday: true,
        statusBadge: '完美通关 · 黄金复盘 🏆',
        statusType: 'gold', // 'gold', 'in_progress', 'verified', 'fast'
        progressPercent: 100,
        completedTasks: 14,
        totalTasks: 14,
        verifiedCount: 14,
        homeCount: 9,
        schoolCount: 5,
        estimatedMinutes: 180,
        actualMinutes: 165,
        coinsEarned: 120,
        rating: 4.8,
        focusScore: 92,
        pomodoroRounds: 5,
        summaryText: '当日任务全部清空，超前结项！奥数难题独立突破，字迹工整无拖拉。',
        parentSummaryComment: '大宝今天放学后主动按照计划把回家作业全部先做完，特别是数学最后一道压轴几何题有很详细的草稿独立思考过程，书写字迹也比上周大有进步！遵守了“做完作业再看书”的约定，特别奖励周末增加 30 分钟乐高拼装时间！',
        parentStamps: [
          { role: '爸爸核验章', time: '20:30', statusText: '已过关 ⭐⭐⭐⭐⭐' },
          { role: '妈妈点赞章', time: '20:35', statusText: '超赞！字迹工整' }
        ],
        childReflection: {
          mood: '😃 开心自主 · 很有底气',
          quote: '今天的奥数题我一个人做出来了！没有看任何提示！',
          logId: '#20261018-06'
        },
        subjectsSummary: [
          { name: '语文', done: 5, total: 5, color: 'text-amber-600 bg-amber-50' },
          { name: '数学', done: 4, total: 4, color: 'text-blue-600 bg-blue-50' },
          { name: '英语', done: 3, total: 3, color: 'text-emerald-600 bg-emerald-50' },
          { name: '科学拓展', done: 2, total: 2, color: 'text-purple-600 bg-purple-50' }
        ],
        tasksList: [
          {
            id: 't1',
            subject: '语文',
            title: '抄写本 (古诗重点生字)',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '基础精炼',
            estimatedMinutes: 15,
            actualMinutes: 14,
            requirement: '第 15 课《少年闰土》重点字词 2 遍，书写间架结构工整',
            completed: true,
            completedTime: '19:40',
            verified: true,
            verifiedStamp: '家长核验 ★★★★★ · 20:15 盖印通过',
            verifiedComment: '订正 1 处笔顺“拜”，其余字形整洁端正，好习惯保持！'
          },
          {
            id: 't2',
            subject: '语文',
            title: '练习册《少年闰土》阅读理解',
            type: 'school',
            typeLabel: '【课堂作业】',
            challengeTag: '核心重点',
            estimatedMinutes: 20,
            actualMinutes: 18,
            requirement: '完成第 24-27 页（重点完成第 26 页阅读理解主观题）',
            completed: true,
            completedTime: '16:10',
            verified: true,
            verifiedStamp: '家长核验 等级 A+ · 校内核验合格',
            verifiedComment: '校内已完成批阅，主观题提炼出 3 个核心论据，很准确。'
          },
          {
            id: 't3',
            subject: '数学',
            title: '选练奥数压轴题 (工程变式与辅助线)',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '挑战关卡 ★★★',
            estimatedMinutes: 30,
            actualMinutes: 28,
            requirement: '奥数专项思考题第 14 页第 2 题，在草稿本写出两种解法思路',
            completed: true,
            completedTime: '20:10',
            verified: true,
            verifiedStamp: '爸爸核验 尝试了 2 种辅助线做法，突破难关！ +30 XP 突破奖',
            verifiedComment: '自主演算草稿很规整，第二种几何割补法非常有灵气！'
          },
          {
            id: 't4',
            subject: '数学',
            title: '配套练习册 (分数乘除法综合应用)',
            type: 'school',
            typeLabel: '【课堂作业】',
            challengeTag: '当堂达标',
            estimatedMinutes: 25,
            actualMinutes: 22,
            requirement: '完成第 32-35 页应用题计算与列式',
            completed: true,
            completedTime: '15:30',
            verified: true,
            verifiedStamp: '家长核验 等级 A+ · 卷面整洁无涂改',
            verifiedComment: '草稿演算思路清晰，分数化简一步到位。'
          },
          {
            id: 't5',
            subject: '英语',
            title: 'Unit 4 核心词汇与课文朗读录音',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '口语冲刺',
            estimatedMinutes: 15,
            actualMinutes: 12,
            requirement: '跟读标准原音 3 遍，录制课文音频上传打卡群',
            completed: true,
            completedTime: '18:50',
            verified: true,
            verifiedStamp: '妈妈核验 全对 100 分 · 发音连读标准！',
            verifiedComment: 'AI 评分 98 分，连读和弱读掌握到位。'
          },
          {
            id: 't6',
            subject: '科学拓展',
            title: '《植物水培观察日记》第三期',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '科学探究',
            estimatedMinutes: 20,
            actualMinutes: 18,
            requirement: '测量绿萝气生根长度，拍摄照片并填写成长曲线表',
            completed: true,
            completedTime: '18:20',
            verified: true,
            verifiedStamp: '家庭核验 已上传实验照片至《植物成长册》',
            verifiedComment: '记录细致，已存档 2 张水培根系特写照片。'
          }
        ]
      },
      {
        id: '20261017',
        dateStr: '10月17日',
        dayOfWeek: '周六',
        isToday: false,
        statusBadge: '金牌探险日 🏆 +50金币',
        statusType: 'gold',
        progressPercent: 100,
        completedTasks: 12,
        totalTasks: 12,
        verifiedCount: 12,
        homeCount: 8,
        schoolCount: 4,
        estimatedMinutes: 140,
        actualMinutes: 110,
        coinsEarned: 50,
        rating: 5.0,
        focusScore: 96,
        pomodoroRounds: 4,
        summaryText: '完美通关 · 12项全部达成 · 20:25 全部结清 | 家长全星核验通过',
        parentSummaryComment: '妈妈：“今天奥数自主思考草稿纸写得很清晰，写生作文立意很有趣，无拖拉提前30分钟搞定，值得嘉奖！”',
        parentStamps: [
          { role: '全家总盖印', time: '20:25', statusText: '满星通关金印' }
        ],
        childReflection: {
          mood: '🥳 极其充实',
          quote: '提前把周日的作业也预习了一部分，周日可以多玩乐高！',
          logId: '#20261017-05'
        },
        subjectsSummary: [
          { name: '语文', done: 4, total: 4, color: 'text-amber-600 bg-amber-50' },
          { name: '数学', done: 4, total: 4, color: 'text-blue-600 bg-blue-50' },
          { name: '英语', done: 2, total: 2, color: 'text-emerald-600 bg-emerald-50' },
          { name: '科学拓展', done: 2, total: 2, color: 'text-purple-600 bg-purple-50' }
        ],
        tasksList: []
      },
      {
        id: '20261016',
        dateStr: '10月16日',
        dayOfWeek: '周五',
        isToday: false,
        statusBadge: '完成通关 · 1项订正通过 ✓',
        statusType: 'verified',
        progressPercent: 100,
        completedTasks: 15,
        totalTasks: 15,
        verifiedCount: 15,
        homeCount: 10,
        schoolCount: 5,
        estimatedMinutes: 150,
        actualMinutes: 140,
        coinsEarned: 40,
        rating: 4.6,
        focusScore: 88,
        pomodoroRounds: 5,
        summaryText: '15 项全部完成 · 包含 1 项数学二次订正已通过，归入错题宝库。',
        parentSummaryComment: '爸爸：“错题订正态度非常端正，自己主动去查了公式推导。继续保持这种钻研精神！”',
        parentStamps: [
          { role: '爸爸核验章', time: '21:05', statusText: '订正合格通过' }
        ],
        childReflection: {
          mood: '🤔 恍然大悟',
          quote: '原来工程问题要把工作总量看作单位 1，我终于弄懂了！',
          logId: '#20261016-04'
        },
        subjectsSummary: [
          { name: '语文', done: 5, total: 5, color: 'text-amber-600 bg-amber-50' },
          { name: '数学', done: 5, total: 5, color: 'text-blue-600 bg-blue-50' },
          { name: '英语', done: 3, total: 3, color: 'text-emerald-600 bg-emerald-50' },
          { name: '科学拓展', done: 2, total: 2, color: 'text-purple-600 bg-purple-50' }
        ],
        tasksList: []
      },
      {
        id: '20261015',
        dateStr: '10月15日',
        dayOfWeek: '周四',
        isToday: false,
        statusBadge: '神速专注星 🚀 +45金币',
        statusType: 'fast',
        progressPercent: 100,
        completedTasks: 13,
        totalTasks: 13,
        verifiedCount: 13,
        homeCount: 8,
        schoolCount: 5,
        estimatedMinutes: 115,
        actualMinutes: 95,
        coinsEarned: 45,
        rating: 4.9,
        focusScore: 98,
        pomodoroRounds: 3,
        summaryText: '比预估节省 20 分钟！耗时仅 95 分钟，爸爸核验满星。',
        parentSummaryComment: '“今天一放学就专注投入，番茄钟没有中断一次，效率典范！”',
        parentStamps: [
          { role: '爸爸核验章', time: '19:50', statusText: '神速专注印' }
        ],
        childReflection: {
          mood: '⚡ 能量满满',
          quote: '全神贯注的时候时间过得真快，写完还有时间看课外书！',
          logId: '#20261015-03'
        },
        subjectsSummary: [
          { name: '语文', done: 4, total: 4, color: 'text-amber-600 bg-amber-50' },
          { name: '数学', done: 4, total: 4, color: 'text-blue-600 bg-blue-50' },
          { name: '英语', done: 3, total: 3, color: 'text-emerald-600 bg-emerald-50' },
          { name: '科学拓展', done: 2, total: 2, color: 'text-purple-600 bg-purple-50' }
        ],
        tasksList: []
      },
      {
        id: '20261014',
        dateStr: '10月14日',
        dayOfWeek: '周三',
        isToday: false,
        statusBadge: '满星通关 ⭐ +40金币',
        statusType: 'verified',
        progressPercent: 100,
        completedTasks: 11,
        totalTasks: 11,
        verifiedCount: 11,
        homeCount: 7,
        schoolCount: 4,
        estimatedMinutes: 110,
        actualMinutes: 100,
        coinsEarned: 40,
        rating: 4.7,
        focusScore: 90,
        pomodoroRounds: 4,
        summaryText: '11 项作业稳扎稳打，耗时 100 分钟，字迹秀丽规范。',
        parentSummaryComment: '“字迹端正整洁，英语朗读很自信！”',
        parentStamps: [
          { role: '妈妈核验章', time: '20:10', statusText: '满星审核' }
        ],
        childReflection: {
          mood: '😊 平静踏实',
          quote: '每天按时完成打卡的感觉真好。',
          logId: '#20261014-02'
        },
        subjectsSummary: [
          { name: '语文', done: 4, total: 4, color: 'text-amber-600 bg-amber-50' },
          { name: '数学', done: 3, total: 3, color: 'text-blue-600 bg-blue-50' },
          { name: '英语', done: 2, total: 2, color: 'text-emerald-600 bg-emerald-50' },
          { name: '科学拓展', done: 2, total: 2, color: 'text-purple-600 bg-purple-50' }
        ],
        tasksList: []
      }
    ]
  },
  erbao: {
    childId: 'erbao',
    name: '二宝',
    avatar: '🐰',
    grade: '二年级 · 快乐小学徒',
    month: '2026年10月',
    totalDaysInMonth: 31,
    metrics: {
      activeDays: 22,
      totalDays: 31,
      streakDays: 9,
      avgMinutesPerDay: 50,
      diffLastMonthMinutes: -8,
      completedTasks: 186,
      completionRate: 97.4,
      satisfactionRate: 98.0,
      goldStampsCount: 20
    },
    weeklyTrend: [
      { day: '周一', minutes: 45, target: 55, completedCount: 6 },
      { day: '周二', minutes: 50, target: 55, completedCount: 7 },
      { day: '周三', minutes: 48, target: 55, completedCount: 6 },
      { day: '周四', minutes: 42, target: 55, completedCount: 6 },
      { day: '周五', minutes: 55, target: 55, completedCount: 8 },
      { day: '周六', minutes: 50, target: 55, completedCount: 7 },
      { day: '周日', minutes: 60, target: 65, completedCount: 8 }
    ],
    subjectBreakdown: [
      { id: 'chinese', name: '语文识字', percent: 45, minutes: 23, color: '#f59e0b', icon: '📖' },
      { id: 'math', name: '趣味数学', percent: 35, minutes: 18, color: '#3b82f6', icon: '🧮' },
      { id: 'art', name: '英语绘本与画画', percent: 20, minutes: 10, color: '#10b981', icon: '🎨' }
    ],
    taskTypesDistribution: {
      homeCount: 118,
      homePercent: 63,
      schoolCount: 68,
      schoolPercent: 37
    },
    frequentPraises: [
      { text: '🌟 坐姿端正棒', count: 16, color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
      { text: '🐰 识字大王', count: 14, color: 'bg-amber-100 text-amber-800 border-amber-200' },
      { text: '✍️ 握笔姿势标准', count: 11, color: 'bg-blue-100 text-blue-800 border-blue-200' },
      { text: '🌈 自主收拾书包', count: 9, color: 'bg-purple-100 text-purple-800 border-purple-200' }
    ],
    tutorTip: '二宝今天生字描红特别整洁，口算达标率100%，继续加油！',
    historyDays: [
      {
        id: '20261018',
        dateStr: '10月18日',
        dayOfWeek: '周日',
        isToday: true,
        statusBadge: '快乐小达人 🌟 +60金币',
        statusType: 'gold',
        progressPercent: 100,
        completedTasks: 8,
        totalTasks: 8,
        verifiedCount: 8,
        homeCount: 5,
        schoolCount: 3,
        estimatedMinutes: 60,
        actualMinutes: 52,
        coinsEarned: 60,
        rating: 5.0,
        focusScore: 95,
        pomodoroRounds: 3,
        summaryText: '8 项作业全部完成！生字田字格写得很工整，加减法口算零差错！',
        parentSummaryComment: '妈妈：“二宝今天写生字非常专心，坐姿特别端正！口算题卡全部做对，奖励一枚小红花印章！”',
        parentStamps: [
          { role: '妈妈核验章', time: '19:40', statusText: '超级棒 ⭐⭐⭐⭐⭐' }
        ],
        childReflection: {
          mood: '🥰 超级开心',
          quote: '我今天自己把铅笔和橡皮收拾到笔袋里了！',
          logId: '#20261018-02'
        },
        subjectsSummary: [
          { name: '语文', done: 4, total: 4, color: 'text-amber-600 bg-amber-50' },
          { name: '数学', done: 3, total: 3, color: 'text-blue-600 bg-blue-50' },
          { name: '绘本', done: 1, total: 1, color: 'text-emerald-600 bg-emerald-50' }
        ],
        tasksList: [
          {
            id: 'e_t1',
            subject: '语文',
            title: '生字描红本《秋天》重点生字',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '书写之星',
            estimatedMinutes: 15,
            actualMinutes: 12,
            requirement: '田字格规范描红 2 行，写 2 行，注意“横平竖直”',
            completed: true,
            completedTime: '18:30',
            verified: true,
            verifiedStamp: '妈妈核验 ★★★★★ · 19:10 盖印',
            verifiedComment: '笔画很有力量，间架结构居中，赞！'
          },
          {
            id: 'e_t2',
            subject: '数学',
            title: '20以内进位加法趣味算卡',
            type: 'school',
            typeLabel: '【课堂作业】',
            challengeTag: '算力小达人',
            estimatedMinutes: 15,
            actualMinutes: 14,
            requirement: '完成算卡 30 道题，用计时器测速并自查一遍',
            completed: true,
            completedTime: '16:00',
            verified: true,
            verifiedStamp: '爸爸核验 100分全对 · 盖印通过',
            verifiedComment: '没有咬笔头，心算反应很快！'
          }
        ]
      }
    ]
  }
};
