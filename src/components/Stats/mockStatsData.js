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
      { day: '周日', minutes: 165, target: 180, completedCount: 14 },
      { day: '周一', minutes: 95, target: 110, completedCount: 15 },
      { day: '周二', minutes: 105, target: 110, completedCount: 12 },
      { day: '周三', minutes: 165, target: 180, completedCount: 14 },
      { day: '周四', minutes: 115, target: 120, completedCount: 13 },
      { day: '周五', minutes: 135, target: 130, completedCount: 15 },
      { day: '今天', minutes: 120, target: 130, completedCount: 11 }
    ],
    subjectBreakdown: [
      { id: 'math', name: '数学', percent: 35, minutes: 38, color: '#3b82f6', icon: '📐' },
      { id: 'chinese', name: '语文', percent: 32, minutes: 34, color: '#f59e0b', icon: '📜' },
      { id: 'english', name: '英语', percent: 20, minutes: 22, color: '#10b981', icon: '🧭' },
      { id: 'science', name: '科学与小四门', percent: 13, minutes: 14, color: '#8b5cf6', icon: '🚀' }
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
        id: '20261023',
        dateStr: '10月23日',
        dayOfWeek: '周五',
        isToday: false,
        statusBadge: '周五大通关 · 黄金结项 🏆',
        statusType: 'gold',
        progressPercent: 100,
        completedTasks: 15,
        totalTasks: 15,
        verifiedCount: 15,
        homeCount: 9,
        schoolCount: 6,
        estimatedMinutes: 160,
        actualMinutes: 135,
        coinsEarned: 115,
        rating: 5.0,
        focusScore: 96,
        pomodoroRounds: 5,
        summaryText: '周五全科任务超前结清！数学单元测试复习满分过关，无拖延开启周末。',
        parentSummaryComment: '大宝本周五表现尤其出色！放学后一鼓作气把各科作业全部完成，字迹工整，错题主动整理进笔记本，周末可以痛快玩了！',
        parentStamps: [
          { role: '爸爸核验章', time: '20:10', statusText: '已全过关 ⭐⭐⭐⭐⭐' },
          { role: '妈妈点赞章', time: '20:15', statusText: '超级棒！周末快乐' }
        ],
        childReflection: {
          mood: '🥳 轻松兴奋 · 迎接周末',
          quote: '今天周五作业全部写完了，周末完全不用赶作业！',
          logId: '#20261023-01'
        },
        subjectsSummary: [
          { name: '语文', done: 5, total: 5, color: 'text-amber-600 bg-amber-50' },
          { name: '数学', done: 4, total: 4, color: 'text-blue-600 bg-blue-50' },
          { name: '英语', done: 3, total: 3, color: 'text-emerald-600 bg-emerald-50' },
          { name: '科学拓展', done: 3, total: 3, color: 'text-purple-600 bg-purple-50' }
        ],
        tasksList: [
          {
            id: 't23_1',
            subject: '语文',
            title: '作文草稿修改与誊写',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '写作精进',
            estimatedMinutes: 30,
            actualMinutes: 26,
            requirement: '修改第5单元习作，结构完整，段落分明',
            completed: true,
            completedTime: '18:30',
            verified: true,
            verifiedStamp: '家长核验 ★★★★★ · 19:00 盖印通过',
            verifiedComment: '排比与细节描写非常生动，首尾呼应！'
          },
          {
            id: 't23_2',
            subject: '数学',
            title: '单元综合能力自测卷',
            type: 'school',
            typeLabel: '【课堂作业】',
            challengeTag: '满分挑战',
            estimatedMinutes: 30,
            actualMinutes: 25,
            requirement: '独立完成单元达标卷，草稿规范',
            completed: true,
            completedTime: '15:40',
            verified: true,
            verifiedStamp: '老师批阅 100分 · 爸爸复核',
            verifiedComment: '全对无失误，解题步骤极具条理！'
          },
          {
            id: 't23_3',
            subject: '英语',
            title: '课本单元重难点朗读与背诵',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '口语表达',
            estimatedMinutes: 15,
            actualMinutes: 12,
            requirement: '熟读Unit 4对话，语音语调自然',
            completed: true,
            completedTime: '19:20',
            verified: true,
            verifiedStamp: '妈妈核验 发音标准自然',
            verifiedComment: '流利度极高，背诵一气呵成。'
          },
          {
            id: 't23_4',
            subject: '综合拓展',
            title: '科学小制作心得记录',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '实践探究',
            estimatedMinutes: 20,
            actualMinutes: 18,
            requirement: '图文记录杠杆原理实验现象',
            completed: true,
            completedTime: '19:50',
            verified: true,
            verifiedStamp: '家庭核验 实验观察敏锐',
            verifiedComment: '画的杠杆示意图非常准确！'
          }
        ]
      },
      {
        id: '20261022',
        dateStr: '10月22日',
        dayOfWeek: '周四',
        isToday: false,
        statusBadge: '重点攻关 · 效率跃升 ⚡',
        statusType: 'fast',
        progressPercent: 100,
        completedTasks: 13,
        totalTasks: 13,
        verifiedCount: 13,
        homeCount: 8,
        schoolCount: 5,
        estimatedMinutes: 140,
        actualMinutes: 115,
        coinsEarned: 95,
        rating: 4.9,
        focusScore: 94,
        pomodoroRounds: 4,
        summaryText: '攻坚奥数行程难题与英语时态专项，提前 25 分钟通关！',
        parentSummaryComment: '今天英语短文复述发音标准连贯，行程问题线段图画得很专业，思路非常清楚！',
        parentStamps: [
          { role: '爸爸核验章', time: '20:40', statusText: '线段图非常规范 ⭐⭐⭐⭐⭐' },
          { role: '妈妈点赞章', time: '20:45', statusText: '发音很棒！' }
        ],
        childReflection: {
          mood: '🤓 思维火花 · 很有收获',
          quote: '行程问题画出相遇线段图后一下子就看懂了！',
          logId: '#20261022-01'
        },
        subjectsSummary: [
          { name: '语文', done: 4, total: 4, color: 'text-amber-600 bg-amber-50' },
          { name: '数学', done: 4, total: 4, color: 'text-blue-600 bg-blue-50' },
          { name: '英语', done: 3, total: 3, color: 'text-emerald-600 bg-emerald-50' },
          { name: '综合拓展', done: 2, total: 2, color: 'text-purple-600 bg-purple-50' }
        ],
        tasksList: [
          {
            id: 't22_1',
            subject: '数学',
            title: '奥数相遇与追及问题专项',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '思维进阶',
            estimatedMinutes: 25,
            actualMinutes: 20,
            requirement: '规范绘制线段示意图，写出等量关系式',
            completed: true,
            completedTime: '19:15',
            verified: true,
            verifiedStamp: '爸爸核验 线段图极其规范 +30 XP',
            verifiedComment: '自主发现了速度和与时间反比的规律，很出色！'
          },
          {
            id: 't22_2',
            subject: '语文',
            title: '生字词默写与古诗鉴赏',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '夯实基础',
            estimatedMinutes: 20,
            actualMinutes: 16,
            requirement: '满分默写《登鹳雀楼》及诗意理解',
            completed: true,
            completedTime: '18:40',
            verified: true,
            verifiedStamp: '妈妈核验 卷面无涂改 甲上',
            verifiedComment: '诗意理解深刻，字形间架结构优美。'
          },
          {
            id: 't22_3',
            subject: '英语',
            title: '一般现在时与现在进行时辨析',
            type: 'school',
            typeLabel: '【课堂作业】',
            challengeTag: '语法突破',
            estimatedMinutes: 20,
            actualMinutes: 18,
            requirement: '完成练习册语法专项巩固题',
            completed: true,
            completedTime: '16:20',
            verified: true,
            verifiedStamp: '家长核验 核心考点全掌握',
            verifiedComment: '动词 ing 变化规则全部正确。'
          }
        ]
      },
      {
        id: '20261021',
        dateStr: '10月21日',
        dayOfWeek: '周三',
        isToday: false,
        statusBadge: '周中攻坚 · 满星过关 🏆',
        statusType: 'gold',
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
          logId: '#20261021-06'
        },
        subjectsSummary: [
          { name: '语文', done: 5, total: 5, color: 'text-amber-600 bg-amber-50' },
          { name: '数学', done: 4, total: 4, color: 'text-blue-600 bg-blue-50' },
          { name: '英语', done: 3, total: 3, color: 'text-emerald-600 bg-emerald-50' },
          { name: '科学拓展', done: 2, total: 2, color: 'text-purple-600 bg-purple-50' }
        ],
        tasksList: [
          {
            id: 't21_1',
            subject: '语文',
            title: '抄写本 (古诗/重点生字)',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '基础精炼',
            estimatedMinutes: 15,
            actualMinutes: 14,
            requirement: '严格按固定格式抄写，看顿笔与间架结构',
            completed: true,
            completedTime: '19:40',
            verified: true,
            verifiedStamp: '家长核验 ★★★★★ · 20:15 盖印通过',
            verifiedComment: '订正 1 处笔顺“拜”，其余字形整洁端正，好习惯保持！'
          },
          {
            id: 't21_2',
            subject: '语文',
            title: '练习册 (课后阅读理解)',
            type: 'school',
            typeLabel: '【课堂作业】',
            challengeTag: '核心重点',
            estimatedMinutes: 20,
            actualMinutes: 18,
            requirement: '课后阅读理解，主观题完整作答禁留白',
            completed: true,
            completedTime: '16:10',
            verified: true,
            verifiedStamp: '家长核验 等级 A+ · 校内核验合格',
            verifiedComment: '校内已完成批阅，主观题提炼出 3 个核心论据，很准确。'
          },
          {
            id: 't21_3',
            subject: '数学',
            title: '选练奥数专项思考题',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '挑战关卡 ★★★',
            estimatedMinutes: 30,
            actualMinutes: 28,
            requirement: '学校思维题，草稿步骤清晰，禁猜答案',
            completed: true,
            completedTime: '20:10',
            verified: true,
            verifiedStamp: '爸爸核验 尝试了 2 种辅助线做法，突破难关！ +30 XP 突破奖',
            verifiedComment: '自主演算草稿很规整，第二种几何割补法非常有灵气！'
          },
          {
            id: 't21_4',
            subject: '数学',
            title: '练习册 (当天题型巩固)',
            type: 'school',
            typeLabel: '【课堂作业】',
            challengeTag: '当堂达标',
            estimatedMinutes: 25,
            actualMinutes: 22,
            requirement: '当天新课练习，卡壳题写明卡点放2层',
            completed: true,
            completedTime: '15:30',
            verified: true,
            verifiedStamp: '家长核验 等级 A+ · 卷面整洁无涂改',
            verifiedComment: '草稿演算思路清晰，分数化简一步到位。'
          },
          {
            id: 't21_5',
            subject: '英语',
            title: '抄写本 (单词/句型规范)',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '规范书写',
            estimatedMinutes: 15,
            actualMinutes: 12,
            requirement: '四线三格固定格式，单词/词组/句子规范',
            completed: true,
            completedTime: '18:50',
            verified: true,
            verifiedStamp: '妈妈核验 全对 100 分 · 发音连读标准！',
            verifiedComment: '书写规范，大写字母与标点无遗漏。'
          },
          {
            id: 't21_6',
            subject: '英语',
            title: '听力 / 课文长篇朗读',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '口语冲刺',
            estimatedMinutes: 15,
            actualMinutes: 13,
            requirement: '跟读音频听力，每周长课文分段背诵',
            completed: true,
            completedTime: '19:15',
            verified: true,
            verifiedStamp: '妈妈核验 语音语调自然流畅',
            verifiedComment: 'AI 评分 98 分，连读和弱读掌握到位。'
          },
          {
            id: 't21_7',
            subject: '小四门',
            title: '地理 / 道法练习册',
            type: 'school',
            typeLabel: '【课堂作业】',
            challengeTag: '巩固速通',
            estimatedMinutes: 15,
            actualMinutes: 14,
            requirement: '填图题准确，大题结合课本填空',
            completed: true,
            completedTime: '16:40',
            verified: true,
            verifiedStamp: '家长核验 地形图填图全对',
            verifiedComment: '等高线地形图关键判读准确无误。'
          },
          {
            id: 't21_8',
            subject: '课外',
            title: '多邻国语言打卡',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '习惯连胜',
            estimatedMinutes: 20,
            actualMinutes: 15,
            requirement: '完成今日任务，屏幕保留连胜绿勾界面',
            completed: true,
            completedTime: '20:45',
            verified: true,
            verifiedStamp: '家庭核验 连胜记录保持中 🔥',
            verifiedComment: '已完成今日 2 单元连胜冲刺。'
          }
        ]
      },
      {
        id: '20261020',
        dateStr: '10月20日',
        dayOfWeek: '周二',
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
          { role: '全家总盖印', time: '20:25', statusText: '满星通关金印 ⭐⭐⭐⭐⭐' }
        ],
        childReflection: {
          mood: '🥳 极其充实',
          quote: '提前把明天的预习也做了一部分，明天可以更从容！',
          logId: '#20261020-05'
        },
        subjectsSummary: [
          { name: '语文', done: 4, total: 4, color: 'text-amber-600 bg-amber-50' },
          { name: '数学', done: 4, total: 4, color: 'text-blue-600 bg-blue-50' },
          { name: '英语', done: 2, total: 2, color: 'text-emerald-600 bg-emerald-50' },
          { name: '科学拓展', done: 2, total: 2, color: 'text-purple-600 bg-purple-50' }
        ],
        tasksList: [
          {
            id: 't20_1',
            subject: '语文',
            title: '练字本 A / B 临摹',
            type: 'school',
            typeLabel: '【课堂作业】',
            challengeTag: '字迹规范',
            estimatedMinutes: 10,
            actualMinutes: 9,
            requirement: '书法写字本，看顿笔结构，潦草重写',
            completed: true,
            completedTime: '15:20',
            verified: true,
            verifiedStamp: '教师批改 甲上 · 妈妈复核通过',
            verifiedComment: '横平竖直，笔锋舒展有形！'
          },
          {
            id: 't20_2',
            subject: '数学',
            title: '选练 (学校专门册拓展)',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '思维进阶',
            estimatedMinutes: 20,
            actualMinutes: 18,
            requirement: '学校思维题，草稿步骤清晰，禁猜答案',
            completed: true,
            completedTime: '19:30',
            verified: true,
            verifiedStamp: '爸爸核验 解题思路清晰严谨',
            verifiedComment: '方程列式规范，草稿纸分区清晰。'
          },
          {
            id: 't20_3',
            subject: '英语',
            title: '选练 (专用拔高练习册)',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '完形突破',
            estimatedMinutes: 15,
            actualMinutes: 14,
            requirement: '专用拔高练习册，句型转换与完形',
            completed: true,
            completedTime: '18:40',
            verified: true,
            verifiedStamp: '家长核验 语法填空全对',
            verifiedComment: '第三人称单数与过去式变形无失误。'
          },
          {
            id: 't20_4',
            subject: '语文',
            title: '默写本 (订正+新词)',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '默写满分',
            estimatedMinutes: 15,
            actualMinutes: 12,
            requirement: '昨日错词红笔更改 + 今日新词默写',
            completed: true,
            completedTime: '20:10',
            verified: true,
            verifiedStamp: '妈妈核验 100分无错字',
            verifiedComment: '生词掌握扎实，红笔错因分析到位。'
          }
        ]
      },
      {
        id: '20261019',
        dateStr: '10月19日',
        dayOfWeek: '周一',
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
          { role: '爸爸核验章', time: '21:05', statusText: '订正合格通过 ⭐⭐⭐⭐' }
        ],
        childReflection: {
          mood: '🤔 恍然大悟',
          quote: '原来工程问题要把工作总量看作单位 1，我终于弄懂了！',
          logId: '#20261019-04'
        },
        subjectsSummary: [
          { name: '语文', done: 5, total: 5, color: 'text-amber-600 bg-amber-50' },
          { name: '数学', done: 5, total: 5, color: 'text-blue-600 bg-blue-50' },
          { name: '英语', done: 3, total: 3, color: 'text-emerald-600 bg-emerald-50' },
          { name: '科学拓展', done: 2, total: 2, color: 'text-purple-600 bg-purple-50' }
        ],
        tasksList: [
          {
            id: 't19_1',
            subject: '数学',
            title: '试卷订正 (工程问题错因分析)',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '错因扫雷',
            estimatedMinutes: 20,
            actualMinutes: 18,
            requirement: '错题红笔分析错因重算，备家长签字',
            completed: true,
            completedTime: '20:50',
            verified: true,
            verifiedStamp: '爸爸核验 订正过关，思路讲通了',
            verifiedComment: '用红笔画出了工作效率对比线段图，讲给爸爸听完全能讲明白！'
          },
          {
            id: 't19_2',
            subject: '语文',
            title: '课文朗读新课文 2 遍',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '朗读之星',
            estimatedMinutes: 10,
            actualMinutes: 9,
            requirement: '大声朗读新课文 2 遍，声音洪亮顺畅',
            completed: true,
            completedTime: '19:00',
            verified: true,
            verifiedStamp: '家长核验 朗诵情感饱满',
            verifiedComment: '节奏感把握很好，没有添字漏字。'
          },
          {
            id: 't19_3',
            subject: '英语',
            title: '练习册 (配书本专项填空)',
            type: 'school',
            typeLabel: '【课堂作业】',
            challengeTag: '核心句型',
            estimatedMinutes: 15,
            actualMinutes: 13,
            requirement: '课本配套练习，核对语法填空与词形',
            completed: true,
            completedTime: '16:00',
            verified: true,
            verifiedStamp: '教师已批 · 家长复签',
            verifiedComment: '全对无涂改。'
          }
        ]
      },
      {
        id: '20261018',
        dateStr: '10月18日',
        dayOfWeek: '周日',
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
          { role: '爸爸核验章', time: '19:50', statusText: '神速专注印 ⭐⭐⭐⭐⭐' }
        ],
        childReflection: {
          mood: '⚡ 能量满满',
          quote: '全神贯注的时候时间过得真快，写完还有时间看课外书！',
          logId: '#20261018-03'
        },
        subjectsSummary: [
          { name: '语文', done: 4, total: 4, color: 'text-amber-600 bg-amber-50' },
          { name: '数学', done: 4, total: 4, color: 'text-blue-600 bg-blue-50' },
          { name: '英语', done: 3, total: 3, color: 'text-emerald-600 bg-emerald-50' },
          { name: '科学拓展', done: 2, total: 2, color: 'text-purple-600 bg-purple-50' }
        ],
        tasksList: [
          {
            id: 't18_1',
            subject: '语文',
            title: '作文 / 试卷机动作业',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '写作精炼',
            estimatedMinutes: 30,
            actualMinutes: 25,
            requirement: '作文保字数；试卷订正见红笔，新卷闭卷',
            completed: true,
            completedTime: '19:10',
            verified: true,
            verifiedStamp: '妈妈核验 细节描写丰富',
            verifiedComment: '立意新颖，环境描写烘托到位，字数达标 650 字。'
          },
          {
            id: 't18_2',
            subject: '数学',
            title: '练习册 (当天题型连贯解题)',
            type: 'school',
            typeLabel: '【课堂作业】',
            challengeTag: '速算达人',
            estimatedMinutes: 25,
            actualMinutes: 20,
            requirement: '当天新课练习，卡壳题写明卡点放2层',
            completed: true,
            completedTime: '15:40',
            verified: true,
            verifiedStamp: '家长核验 速度与准确率兼备',
            verifiedComment: '计算全部一次通过，无一笔涂改。'
          }
        ]
      },
      {
        id: '20261017',
        dateStr: '10月17日',
        dayOfWeek: '周六',
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
          { role: '妈妈核验章', time: '20:10', statusText: '满星审核 ⭐⭐⭐⭐⭐' }
        ],
        childReflection: {
          mood: '😊 平静踏实',
          quote: '每天按时完成打卡的感觉真好。',
          logId: '#20261017-02'
        },
        subjectsSummary: [
          { name: '语文', done: 4, total: 4, color: 'text-amber-600 bg-amber-50' },
          { name: '数学', done: 3, total: 3, color: 'text-blue-600 bg-blue-50' },
          { name: '英语', done: 2, total: 2, color: 'text-emerald-600 bg-emerald-50' },
          { name: '科学拓展', done: 2, total: 2, color: 'text-purple-600 bg-purple-50' }
        ],
        tasksList: [
          {
            id: 't17_1',
            subject: '英语',
            title: '默写本 (错词订正3遍+新词)',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '字词巩固',
            estimatedMinutes: 15,
            actualMinutes: 12,
            requirement: '错词 1 改 3 遍，今日新课词汇默写',
            completed: true,
            completedTime: '19:40',
            verified: true,
            verifiedStamp: '妈妈核验 单词全对',
            verifiedComment: '音标与词义记忆熟练。'
          },
          {
            id: 't17_2',
            subject: '小四门',
            title: '道法填空与思维拓展',
            type: 'school',
            typeLabel: '【课堂作业】',
            challengeTag: '要点速记',
            estimatedMinutes: 15,
            actualMinutes: 14,
            requirement: '填图题准确，大题结合课本填空',
            completed: true,
            completedTime: '16:15',
            verified: true,
            verifiedStamp: '家长核验 核心概念理解透彻',
            verifiedComment: '主观论述点结合了生活实例，答得很完整。'
          }
        ]
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
      { day: '周日', minutes: 60, target: 65, completedCount: 8 },
      { day: '周一', minutes: 45, target: 55, completedCount: 6 },
      { day: '周二', minutes: 50, target: 55, completedCount: 7 },
      { day: '周三', minutes: 52, target: 55, completedCount: 8 },
      { day: '周四', minutes: 42, target: 55, completedCount: 7 },
      { day: '周五', minutes: 45, target: 55, completedCount: 8 },
      { day: '今天', minutes: 48, target: 50, completedCount: 8 }
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
        id: '20261023',
        dateStr: '10月23日',
        dayOfWeek: '周五',
        isToday: false,
        statusBadge: '周五全通关 🌟 +70金币',
        statusType: 'gold',
        progressPercent: 100,
        completedTasks: 8,
        totalTasks: 8,
        verifiedCount: 8,
        homeCount: 5,
        schoolCount: 3,
        estimatedMinutes: 55,
        actualMinutes: 45,
        coinsEarned: 70,
        rating: 5.0,
        focusScore: 98,
        pomodoroRounds: 2,
        summaryText: '周五作业提前搞定！拼音儿歌朗朗上口，画画涂色很漂亮！',
        parentSummaryComment: '妈妈：“二宝今天放学主动拿出小书包，45分钟就全部写好了，拼音发音极准，周末尽情玩耍吧！”',
        parentStamps: [
          { role: '妈妈核验章', time: '18:50', statusText: '超级棒 ⭐⭐⭐⭐⭐' }
        ],
        childReflection: {
          mood: '🥳 开心起飞',
          quote: '今天背拼音儿歌老师表扬我声音最响亮！',
          logId: '#20261023-02'
        },
        subjectsSummary: [
          { name: '语文', done: 4, total: 4, color: 'text-amber-600 bg-amber-50' },
          { name: '数学', done: 3, total: 3, color: 'text-blue-600 bg-blue-50' },
          { name: '绘本', done: 1, total: 1, color: 'text-emerald-600 bg-emerald-50' }
        ],
        tasksList: [
          {
            id: 'e_t23_1',
            subject: '语文',
            title: '生字卡片认读与组词',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '认字达人',
            estimatedMinutes: 15,
            actualMinutes: 12,
            requirement: '大声朗读第6课生字并各组2个词语',
            completed: true,
            completedTime: '18:10',
            verified: true,
            verifiedStamp: '妈妈核验 吐字清晰标准',
            verifiedComment: '组词很有创意，“秋天”组了“秋高气爽”！'
          },
          {
            id: 'e_t23_2',
            subject: '数学',
            title: '图形分类与计数连线',
            type: 'school',
            typeLabel: '【课堂作业】',
            challengeTag: '空间观察',
            estimatedMinutes: 15,
            actualMinutes: 12,
            requirement: '区分长方形、正方形与圆柱体',
            completed: true,
            completedTime: '15:50',
            verified: true,
            verifiedStamp: '爸爸核验 全对无涂改',
            verifiedComment: '立体图形特征观察很敏锐！'
          }
        ]
      },
      {
        id: '20261022',
        dateStr: '10月22日',
        dayOfWeek: '周四',
        isToday: false,
        statusBadge: '专注小标兵 🌟 +50金币',
        statusType: 'gold',
        progressPercent: 100,
        completedTasks: 7,
        totalTasks: 7,
        verifiedCount: 7,
        homeCount: 4,
        schoolCount: 3,
        estimatedMinutes: 50,
        actualMinutes: 42,
        coinsEarned: 50,
        rating: 5.0,
        focusScore: 96,
        pomodoroRounds: 2,
        summaryText: '坐姿端正，口算连对 20 题无卡壳！',
        parentSummaryComment: '爸爸：“做算术卡时眼睛离桌面保持一尺远，握笔姿势很标准，继续保持好习惯！”',
        parentStamps: [
          { role: '爸爸核验章', time: '19:15', statusText: '坐姿满分 ⭐⭐⭐⭐⭐' }
        ],
        childReflection: {
          mood: '😃 自豪得意',
          quote: '我算加法不用掰手指头啦！',
          logId: '#20261022-02'
        },
        subjectsSummary: [
          { name: '语文', done: 3, total: 3, color: 'text-amber-600 bg-amber-50' },
          { name: '数学', done: 3, total: 3, color: 'text-blue-600 bg-blue-50' },
          { name: '绘本', done: 1, total: 1, color: 'text-emerald-600 bg-emerald-50' }
        ],
        tasksList: [
          {
            id: 'e_t22_1',
            subject: '数学',
            title: '10以内加减法速算趣味卡',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '口算小神童',
            estimatedMinutes: 15,
            actualMinutes: 10,
            requirement: '20道速算题，快速口答并记录用时',
            completed: true,
            completedTime: '18:35',
            verified: true,
            verifiedStamp: '爸爸核验 100分速算通过',
            verifiedComment: '速度比昨天提升了3分钟，真厉害！'
          }
        ]
      },
      {
        id: '20261021',
        dateStr: '10月21日',
        dayOfWeek: '周三',
        isToday: false,
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
          logId: '#20261021-02'
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
      },
      {
        id: '20261020',
        dateStr: '10月20日',
        dayOfWeek: '周二',
        isToday: false,
        statusBadge: '小小朗诵家 🌟 +55金币',
        statusType: 'gold',
        progressPercent: 100,
        completedTasks: 7,
        totalTasks: 7,
        verifiedCount: 7,
        homeCount: 4,
        schoolCount: 3,
        estimatedMinutes: 50,
        actualMinutes: 44,
        coinsEarned: 55,
        rating: 5.0,
        focusScore: 95,
        pomodoroRounds: 2,
        summaryText: '课文背诵有感情，拼音书写整洁规范。',
        parentSummaryComment: '妈妈：“今天生字笔顺记得清清楚楚，朗读很有节奏感！”',
        parentStamps: [
          { role: '妈妈核验章', time: '19:10', statusText: '朗读之星 ⭐⭐⭐⭐⭐' }
        ],
        childReflection: {
          mood: '😃 自信满满',
          quote: '老师夸我的拼音标调最标准！',
          logId: '#20261020-02'
        },
        subjectsSummary: [
          { name: '语文', done: 4, total: 4, color: 'text-amber-600 bg-amber-50' },
          { name: '数学', done: 3, total: 3, color: 'text-blue-600 bg-blue-50' }
        ],
        tasksList: [
          {
            id: 'e_t20_1',
            subject: '语文',
            title: '拼音标调与拼读练习',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '拼读小达人',
            estimatedMinutes: 15,
            actualMinutes: 12,
            requirement: '复韵母 ai ei ui 规范书写与拼读',
            completed: true,
            completedTime: '18:20',
            verified: true,
            verifiedStamp: '妈妈核验 标调规则掌握准确',
            verifiedComment: '有 a 在给 a 戴，标调规则记得牢！'
          }
        ]
      },
      {
        id: '20261019',
        dateStr: '10月19日',
        dayOfWeek: '周一',
        isToday: false,
        statusBadge: '周一好习惯 🌟 +50金币',
        statusType: 'gold',
        progressPercent: 100,
        completedTasks: 6,
        totalTasks: 6,
        verifiedCount: 6,
        homeCount: 4,
        schoolCount: 2,
        estimatedMinutes: 45,
        actualMinutes: 40,
        coinsEarned: 50,
        rating: 5.0,
        focusScore: 94,
        pomodoroRounds: 2,
        summaryText: '周一精神饱满，字迹端正工整！',
        parentSummaryComment: '爸爸：“新的一周开门红，自主完成作业不用催！”',
        parentStamps: [
          { role: '爸爸核验章', time: '19:00', statusText: '自主自觉 ⭐⭐⭐⭐⭐' }
        ],
        childReflection: {
          mood: '🥰 精神饱满',
          quote: '做完作业还可以看 20 分钟动画片！',
          logId: '#20261019-02'
        },
        subjectsSummary: [
          { name: '语文', done: 3, total: 3, color: 'text-amber-600 bg-amber-50' },
          { name: '数学', done: 3, total: 3, color: 'text-blue-600 bg-blue-50' }
        ],
        tasksList: [
          {
            id: 'e_t19_1',
            subject: '数学',
            title: '数字比大小与填空卡',
            type: 'school',
            typeLabel: '【课堂作业】',
            challengeTag: '数感思维',
            estimatedMinutes: 15,
            actualMinutes: 12,
            requirement: '大于号、小于号规范书写与比较',
            completed: true,
            completedTime: '15:40',
            verified: true,
            verifiedStamp: '老师批阅 100分 · 爸爸复核',
            verifiedComment: '开口朝大数，尖尖朝小数，全对！'
          }
        ]
      },
      {
        id: '20261018',
        dateStr: '10月18日',
        dayOfWeek: '周日',
        isToday: false,
        statusBadge: '周末拓展星 🌟 +60金币',
        statusType: 'gold',
        progressPercent: 100,
        completedTasks: 8,
        totalTasks: 8,
        verifiedCount: 8,
        homeCount: 6,
        schoolCount: 2,
        estimatedMinutes: 60,
        actualMinutes: 50,
        coinsEarned: 60,
        rating: 5.0,
        focusScore: 96,
        pomodoroRounds: 2,
        summaryText: '周末绘本阅读与画画分享，字词积累丰富！',
        parentSummaryComment: '妈妈：“绘本讲得绘声绘色，还会自己给小兔子涂好看的颜色！”',
        parentStamps: [
          { role: '妈妈核验章', time: '17:30', statusText: '绘本之星 ⭐⭐⭐⭐⭐' }
        ],
        childReflection: {
          mood: '🎨 创意满满',
          quote: '我给小狐狸画了漂亮的彩虹尾巴！',
          logId: '#20261018-02'
        },
        subjectsSummary: [
          { name: '语文', done: 4, total: 4, color: 'text-amber-600 bg-amber-50' },
          { name: '绘本', done: 2, total: 2, color: 'text-emerald-600 bg-emerald-50' },
          { name: '数学', done: 2, total: 2, color: 'text-blue-600 bg-blue-50' }
        ],
        tasksList: [
          {
            id: 'e_t18_1',
            subject: '绘本',
            title: '《猜猜我有多爱你》亲子阅读',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '亲子共读',
            estimatedMinutes: 20,
            actualMinutes: 18,
            requirement: '大声朗读并复述小兔子表达爱的方式',
            completed: true,
            completedTime: '17:00',
            verified: true,
            verifiedStamp: '妈妈核验 表达生动真诚',
            verifiedComment: '讲得太感人了，抱了妈妈一下！'
          }
        ]
      },
      {
        id: '20261017',
        dateStr: '10月17日',
        dayOfWeek: '周六',
        isToday: false,
        statusBadge: '周末自主星 🌟 +50金币',
        statusType: 'gold',
        progressPercent: 100,
        completedTasks: 6,
        totalTasks: 6,
        verifiedCount: 6,
        homeCount: 5,
        schoolCount: 1,
        estimatedMinutes: 50,
        actualMinutes: 42,
        coinsEarned: 50,
        rating: 5.0,
        focusScore: 95,
        pomodoroRounds: 2,
        summaryText: '周末快乐自主，拼音与口算全部满分通关！',
        parentSummaryComment: '爸爸：“按时搞定作业，开开心心去公园骑自行车！”',
        parentStamps: [
          { role: '爸爸核验章', time: '16:45', statusText: '周末满星 ⭐⭐⭐⭐⭐' }
        ],
        childReflection: {
          mood: '🚲 活力充沛',
          quote: '做完作业去骑自行车最开心！',
          logId: '#20261017-02'
        },
        subjectsSummary: [
          { name: '语文', done: 3, total: 3, color: 'text-amber-600 bg-amber-50' },
          { name: '数学', done: 3, total: 3, color: 'text-blue-600 bg-blue-50' }
        ],
        tasksList: [
          {
            id: 'e_t17_1',
            subject: '数学',
            title: '趣味找规律与连线涂色',
            type: 'home',
            typeLabel: '【回家作业】',
            challengeTag: '逻辑启蒙',
            estimatedMinutes: 15,
            actualMinutes: 12,
            requirement: '按照颜色和形状规律涂上正确的颜色',
            completed: true,
            completedTime: '16:20',
            verified: true,
            verifiedStamp: '爸爸核验 逻辑规律完全正确',
            verifiedComment: '规律找得很准，涂色没有涂到框外。'
          }
        ]
      }
    ]
  }
};
