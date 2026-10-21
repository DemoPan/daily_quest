import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Award, 
  TrendingDown, 
  TrendingUp, 
  Flame, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Filter, 
  Download, 
  FileText, 
  Sparkles, 
  CheckCircle, 
  AlertCircle,
  PieChart as PieIcon,
  BarChart2
} from 'lucide-react';
import { sounds } from '../../utils/sound';

export default function DailyStatsListPage({ 
  currentChild, 
  stats, 
  onSelectDay, 
  onOpenPrint 
}) {
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all', 'gold', 'revision', 'overtime'
  const [selectedScene, setSelectedScene] = useState('all'); // 'all', 'home', 'school'

  const metrics = stats.metrics;
  const historyDays = stats.historyDays;

  // 状态筛选
  const filteredDays = historyDays.filter((day) => {
    if (selectedFilter === 'gold') return day.statusType === 'gold';
    if (selectedFilter === 'revision') return day.rating < 4.8;
    if (selectedFilter === 'overtime') return day.actualMinutes > day.estimatedMinutes;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-primary to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-neo-card relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                {currentChild.grade || stats.grade}
              </span>
              <span className="bg-amber-400 text-amber-950 font-black px-2.5 py-0.5 rounded-full text-xs flex items-center gap-1 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-amber-950" /> 正向激励打卡档
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-headline font-black tracking-tight">
              {currentChild.name} 的作业时光档案 · 每日统计
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm font-medium max-w-2xl leading-relaxed">
              记录每一天的坚持与进步，把学习变成看得见的知识金币与通关勋章！
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                if (onOpenPrint) onOpenPrint();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-primary font-bold text-sm shadow-neo-sm hover:bg-blue-50 transition-all btn-squishy"
            >
              <Download className="w-4 h-4" />
              <span>导出打卡月报 (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. 4大核心月度看板 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* 指标 1: 打卡天数 */}
        <div className="bg-surface rounded-2xl p-5 border border-slate-200 shadow-neo-sm hover:shadow-neo-card transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold tracking-wider">本月累计打卡</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-primary flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-headline font-black text-onSurface">
              {metrics.activeDays}
            </span>
            <span className="text-sm font-bold text-slate-400">/ {metrics.totalDays} 天</span>
          </div>
          <div className="mt-2.5 flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg w-fit">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>连续打卡 {metrics.streakDays} 天 · 探险狂热中</span>
          </div>
        </div>

        {/* 指标 2: 日均耗时 */}
        <div className="bg-surface rounded-2xl p-5 border border-slate-200 shadow-neo-sm hover:shadow-neo-card transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold tracking-wider">日均作业耗时</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-headline font-black text-onSurface">
              {metrics.avgMinutesPerDay}
            </span>
            <span className="text-sm font-bold text-slate-400">分钟 / 天</span>
          </div>
          <div className="mt-2.5 flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg w-fit">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
            <span>较上月提升 12 分钟 (效率跃升)</span>
          </div>
        </div>

        {/* 指标 3: 累计完成 */}
        <div className="bg-surface rounded-2xl p-5 border border-slate-200 shadow-neo-sm hover:shadow-neo-card transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold tracking-wider">累计完成作业项</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-headline font-black text-onSurface">
              {metrics.completedTasks}
            </span>
            <span className="text-sm font-bold text-slate-400">项</span>
          </div>
          <div className="mt-2.5 flex items-center gap-1 text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg w-fit">
            <CheckCircle className="w-3.5 h-3.5 text-purple-600" />
            <span>完成率高达 {metrics.completionRate}% (优异)</span>
          </div>
        </div>

        {/* 指标 4: 家长满意度 */}
        <div className="bg-surface rounded-2xl p-5 border border-slate-200 shadow-neo-sm hover:shadow-neo-card transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold tracking-wider">家长核验满意率</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-headline font-black text-onSurface">
              {metrics.satisfactionRate}%
            </span>
            <span className="text-sm font-bold text-slate-400">金牌率</span>
          </div>
          <div className="mt-2.5 flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg w-fit">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>累计获得 {metrics.goldStampsCount} 枚满星印章</span>
          </div>
        </div>
      </div>

      {/* 3. 筛选栏与月份控制器 */}
      <div className="bg-surface rounded-2xl p-4 border border-slate-200/90 shadow-neo-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* 月份翻页 */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => sounds.playClick()}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="px-3 py-1 font-headline font-bold text-sm text-onSurface flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{stats.month}</span>
            <span className="text-xs font-normal text-slate-400">(共 {stats.totalDaysInMonth} 天记录)</span>
          </div>
          <button 
            onClick={() => sounds.playClick()}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 状态过滤 Tab 按钮 */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: '全部日期' },
            { id: 'gold', label: '满星通关 🏆' },
            { id: 'revision', label: '有待订正 ✍️' },
            { id: 'overtime', label: '超时预警 ⏳' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setSelectedFilter(tab.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === tab.id
                  ? 'bg-primary text-white shadow-neo-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. 双栏主体内容区 (左 70% 列表，右 30% 图表) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 左侧：每日打卡卡片流 (8 列) */}
        <div className="lg:col-span-8 space-y-4">
          {filteredDays.map((day) => (
            <div
              key={day.id}
              onClick={() => {
                sounds.playClick();
                onSelectDay(day);
              }}
              className="bg-surface rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-neo-sm hover:shadow-neo-card-hover transition-all cursor-pointer group relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="text-center bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
                    <div className="text-base font-headline font-black text-primary leading-none">
                      {day.dateStr}
                    </div>
                    <div className="text-[11px] font-bold text-slate-500 mt-0.5">
                      {day.dayOfWeek}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        day.statusType === 'gold' 
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : day.statusType === 'fast'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {day.statusBadge}
                      </span>
                      {day.isToday && (
                        <span className="text-[10px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                          TODAY
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {day.summaryText}
                    </p>
                  </div>
                </div>

                <div className="text-right flex items-center gap-3">
                  <div className="text-xs">
                    <span className="text-slate-400 font-medium">综合评级</span>
                    <div className="font-black text-amber-500 flex items-center justify-end gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{day.rating}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary group-hover:text-white flex items-center justify-center text-slate-400 transition-all">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Card Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3.5 my-1 text-xs">
                <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block font-medium">关卡攻克</span>
                  <span className="font-bold text-onSurface text-sm">
                    {day.completedTasks} / {day.totalTasks} 项 (100%)
                  </span>
                </div>
                <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block font-medium">作业场景</span>
                  <span className="font-bold text-onSurface text-sm">
                    回家 {day.homeCount} · 课堂 {day.schoolCount}
                  </span>
                </div>
                <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block font-medium">实际总耗时</span>
                  <span className="font-bold text-emerald-600 text-sm">
                    {day.actualMinutes} 分钟 (省时)
                  </span>
                </div>
                <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block font-medium">金币掉落</span>
                  <span className="font-bold text-amber-600 text-sm">
                    +{day.coinsEarned} 🪙
                  </span>
                </div>
              </div>

              {/* 学科分布标签 */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {day.subjectsSummary.map((sub, i) => (
                  <span
                    key={i}
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border border-slate-200/60 ${sub.color}`}
                  >
                    {sub.name} ({sub.done}/{sub.total})
                  </span>
                ))}
              </div>

              {/* 家长寄语摘要 */}
              {day.parentSummaryComment && (
                <div className="mt-3 bg-amber-50/60 border border-amber-200/50 rounded-xl p-2.5 text-xs text-amber-900/90 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="line-clamp-2 leading-relaxed">
                    {day.parentSummaryComment}
                  </p>
                </div>
              )}
            </div>
          ))}

          {filteredDays.length === 0 && (
            <div className="bg-surface rounded-2xl p-12 text-center border border-slate-200 text-slate-400 space-y-2">
              <AlertCircle className="w-8 h-8 mx-auto text-slate-300" />
              <p className="font-bold text-sm">当前筛选条件下暂无打卡记录</p>
            </div>
          )}
        </div>

        {/* 右侧：智能统计与数据分析侧栏 (4 列) */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. 本周耗时趋势柱状图 */}
          <div className="bg-surface rounded-2xl p-5 border border-slate-200 shadow-neo-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-bold text-sm text-onSurface flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-primary" />
                <span>本周作业耗时曲线 (分钟)</span>
              </h3>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                高效作业带: 90~120m
              </span>
            </div>

            {/* 柱状模拟图 */}
            <div className="flex items-end justify-between gap-2 h-36 pt-6 px-1">
              {stats.weeklyTrend.map((item, idx) => {
                const heightPercent = Math.min(100, Math.round((item.minutes / 180) * 100));
                const isOver = item.minutes > item.target;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[10px] font-bold text-slate-500 scale-90">
                      {item.minutes}m
                    </span>
                    <div 
                      className="w-full rounded-t-lg transition-all duration-500 relative group"
                      style={{ 
                        height: `${heightPercent}%`,
                        backgroundColor: isOver ? '#f59e0b' : '#3b82f6'
                      }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap pointer-events-none z-10 transition-opacity">
                        目标: {item.target}m
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 mt-1">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. 学科耗时比重 */}
          <div className="bg-surface rounded-2xl p-5 border border-slate-200 shadow-neo-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-bold text-sm text-onSurface flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-amber-500" />
                <span>学科耗时比重</span>
              </h3>
              <span className="text-xs text-slate-400 font-medium">日均占比</span>
            </div>

            <div className="space-y-2.5 pt-1">
              {stats.subjectBreakdown.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </span>
                    <span className="font-bold text-slate-500">
                      {item.percent}% <span className="text-slate-400 font-normal">({item.minutes}m)</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 回家 vs 课堂作业比例 */}
          <div className="bg-surface rounded-2xl p-5 border border-slate-200 shadow-neo-sm space-y-3">
            <h3 className="font-headline font-bold text-sm text-onSurface">
              🏠 回家作业 vs 🎒 课堂作业构成
            </h3>
            <div className="flex items-center gap-2 h-4 w-full rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500" 
                style={{ width: `${stats.taskTypesDistribution.homePercent}%` }}
                title={`回家自主作业: ${stats.taskTypesDistribution.homePercent}%`}
              />
              <div 
                className="h-full bg-blue-500" 
                style={{ width: `${stats.taskTypesDistribution.schoolPercent}%` }}
                title={`课堂当堂完成: ${stats.taskTypesDistribution.schoolPercent}%`}
              />
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>回家自主 {stats.taskTypesDistribution.homePercent}% ({stats.taskTypesDistribution.homeCount}项)</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-blue-700">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>课堂交付 {stats.taskTypesDistribution.schoolPercent}% ({stats.taskTypesDistribution.schoolCount}项)</span>
              </div>
            </div>
          </div>

          {/* 4. 近期家长肯定高频词 */}
          <div className="bg-surface rounded-2xl p-5 border border-slate-200 shadow-neo-sm space-y-3">
            <h3 className="font-headline font-bold text-sm text-onSurface">
              ⭐ 近期家长肯定高频词
            </h3>
            <div className="flex flex-wrap gap-2">
              {stats.frequentPraises.map((praise, idx) => (
                <span
                  key={idx}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${praise.color} transition-transform hover:scale-105 cursor-default`}
                >
                  {praise.text}
                </span>
              ))}
            </div>
          </div>

          {/* 5. 探险导师每周寄语 */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 text-xs space-y-2 text-amber-950">
            <div className="flex items-center gap-2 font-bold text-amber-800">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>探险导师寄语</span>
            </div>
            <p className="leading-relaxed font-medium">
              “{stats.tutorTip}”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
