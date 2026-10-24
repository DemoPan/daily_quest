import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Printer, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle,
  CheckCircle2, 
  Clock, 
  Coins, 
  Flame, 
  Star, 
  Sparkles, 
  ShieldCheck, 
  Timer, 
  Award, 
  Check, 
  ExternalLink,
  Smile,
  Edit3
} from 'lucide-react';
import { sounds } from '../../utils/sound';

export default function DailyQuestDetailPage({ 
  currentChild, 
  dayData, 
  onBack, 
  onOpenPrint,
  onPrevDay,
  onNextDay,
  hasPrev,
  hasNext
}) {
  const [showShareToast, setShowShareToast] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [parentNoteText, setParentNoteText] = useState(
    dayData.parentSummaryComment || '大宝今天表现优异，独立攻克难题，按时通关！'
  );

  // 当 dayData 切换时同步更新评语文本
  React.useEffect(() => {
    setParentNoteText(dayData.parentSummaryComment || '孩子今天表现优异，独立攻克难题，按时通关！');
    setIsEditingNote(false);
  }, [dayData]);

  const handleShare = () => {
    sounds.playCoin();
    setShowShareToast(true);
    navigator.clipboard?.writeText?.(
      `🎉【探险学堂·家庭喜报】${currentChild.name} 在 ${dayData.dateStr} 达成全部作业满星通关！实际耗时 ${dayData.actualMinutes} 分钟，荣获 ${dayData.coinsEarned} 🪙 知识金币！`
    );
    setTimeout(() => setShowShareToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-in fade-in duration-200">
      {/* 1. 顶部操作栏 */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => {
            sounds.playClick();
            onBack();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-surface hover:bg-surface-container border border-slate-200 text-slate-700 font-bold text-sm shadow-neo-sm transition-all btn-squishy"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
          <span>返回作业统计列表</span>
        </button>

        {/* 日期指示器 */}
        <div className="flex items-center gap-2 bg-surface px-4 py-1.5 rounded-2xl border border-slate-200 shadow-neo-sm">
          <button 
            disabled={!hasPrev}
            onClick={() => {
              if (hasPrev && onPrevDay) {
                sounds.playClick();
                onPrevDay();
              }
            }}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
              hasPrev ? 'hover:bg-slate-100 text-slate-600 cursor-pointer' : 'text-slate-200 cursor-not-allowed'
            }`}
            title="前一天"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-headline font-black text-sm text-onSurface min-w-[120px] text-center">
            {dayData.dateStr} ({dayData.dayOfWeek})
          </span>
          <button 
            disabled={!hasNext}
            onClick={() => {
              if (hasNext && onNextDay) {
                sounds.playClick();
                onNextDay();
              }
            }}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
              hasNext ? 'hover:bg-slate-100 text-slate-600 cursor-pointer' : 'text-slate-200 cursor-not-allowed'
            }`}
            title="后一天"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 右侧打印与分享按钮 */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              sounds.playStamp();
              if (onOpenPrint) onOpenPrint();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-surface hover:bg-surface-container border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm shadow-neo-sm transition-all btn-squishy"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>打印单日存档表</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-primary text-white font-bold text-xs sm:text-sm shadow-neo-primary transition-all btn-squishy"
          >
            <Share2 className="w-4 h-4" />
            <span>分享到家庭群</span>
          </button>
        </div>
      </div>

      {showShareToast && (
        <div className="fixed top-16 right-6 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top-2">
          <Check className="w-4 h-4" />
          <span>喜报文字已复制到剪贴板，快去发到微信家庭群吧！</span>
        </div>
      )}

      {/* 2. 通关荣誉 Hero Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-neo-card relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">
                {currentChild.avatar}
              </span>
              <span className="bg-white/25 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                {currentChild.name} · {currentChild.grade}
              </span>
              <span className="bg-emerald-400 text-emerald-950 font-black px-2.5 py-0.5 rounded-full text-xs flex items-center gap-1 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" /> 黄金通关 Verified
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-headline font-black tracking-tight">
              {dayData.dateStr} ({dayData.dayOfWeek}) · 作业探险全景复盘
            </h1>

            <p className="text-amber-100 text-xs sm:text-sm font-medium max-w-2xl">
              {dayData.summaryText}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* 勋章与金币奖励胶囊 */}
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 border border-white/30 text-center min-w-[100px]">
              <span className="text-[11px] font-bold text-amber-100 block">综合评级</span>
              <div className="font-headline font-black text-xl flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-200" />
                <span>{dayData.rating}</span>
              </div>
            </div>

            <div className="bg-white text-amber-900 rounded-2xl p-3 shadow-neo-sm text-center min-w-[120px]">
              <span className="text-[11px] font-bold text-amber-700 block">通关掉落奖励</span>
              <div className="font-headline font-black text-xl text-amber-600 flex items-center justify-center gap-1">
                <Coins className="w-5 h-5 fill-amber-400" />
                <span>+{dayData.coinsEarned} 🪙</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 4大核心量化数据磁贴 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-neo-sm">
          <span className="text-xs font-bold text-slate-400 block mb-1">任务总完成率</span>
          <div className="text-2xl font-headline font-black text-onSurface">
            {dayData.completedTasks} / {dayData.totalTasks} 项 (100%)
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-2">
            家长全星核验已通过 ✓
          </span>
        </div>

        <div className="bg-surface rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-neo-sm">
          <span className="text-xs font-bold text-slate-400 block mb-1">作业场景类型</span>
          <div className="text-2xl font-headline font-black text-onSurface">
            回家 {dayData.homeCount} · 课堂 {dayData.schoolCount}
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-block mt-2">
            自主比例 64% (独立性高)
          </span>
        </div>

        <div className="bg-surface rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-neo-sm">
          <span className="text-xs font-bold text-slate-400 block mb-1">总耗时分析</span>
          <div className="text-2xl font-headline font-black text-emerald-600">
            实际 {dayData.actualMinutes} 分钟
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-2">
            预计 {dayData.estimatedMinutes}m · 提前 15 分钟！
          </span>
        </div>

        <div className="bg-surface rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-neo-sm">
          <span className="text-xs font-bold text-slate-400 block mb-1">专注度指数</span>
          <div className="text-2xl font-headline font-black text-amber-600 flex items-center gap-1.5">
            <Flame className="w-5 h-5 fill-amber-500" />
            <span>{dayData.focusScore} 分 (极佳)</span>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md inline-block mt-2">
            番茄钟 {dayData.pomodoroRounds} 轮 · 规律护眼
          </span>
        </div>
      </div>

      {/* 4. 主内容双栏布局 (左 65% 作业明细，右 35% 复盘报告) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 左栏：当日作业清单与核验实录 (8 列) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline font-black text-lg text-onSurface flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>当日关卡攻克清单与家长核验印章 (共 {dayData.tasksList?.length || 0} 项)</span>
            </h2>
            <span className="text-xs font-bold text-slate-500">
              按完成顺序归档
            </span>
          </div>

          <div className="space-y-3.5">
            {dayData.tasksList?.map((task) => (
              <div 
                key={task.id}
                className="bg-surface rounded-2xl p-5 border border-slate-200 shadow-neo-sm space-y-3"
              >
                {/* 任务头部标签与学科 */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-headline font-bold text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                      {task.subject}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      task.type === 'home' 
                        ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {task.typeLabel}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                      {task.challengeTag}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>预计 {task.estimatedMinutes}m / 实际 {task.actualMinutes}m</span>
                  </div>
                </div>

                {/* 任务标题与要求 */}
                <div>
                  <h3 className="font-headline font-black text-base text-onSurface">
                    {task.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                    {task.requirement}
                  </p>
                </div>

                {/* 孩子完成时刻 */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                  {task.completed ? (
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>孩子搞定打卡时刻: {task.completedTime || '已完成'}</span>
                    </span>
                  ) : (
                    <span className="font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>今日进行中 · 待打卡攻克</span>
                    </span>
                  )}
                  {task.verified ? (
                    <span className="font-bold text-amber-600 text-[11px] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      家长已盖章
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[11px]">
                      待家长核验
                    </span>
                  )}
                </div>

                {/* 家长核验火漆印章卡片 */}
                {task.verified && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50/80 border border-amber-200/80 rounded-xl p-3 flex items-start gap-3 relative">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-headline font-black text-xs text-amber-900">
                          {task.verifiedStamp}
                        </span>
                      </div>
                      <p className="text-xs text-amber-950/80 font-medium leading-relaxed">
                        “{task.verifiedComment}”
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 右栏：深度复盘图表与亲子互动 (4 列) */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. 学科耗时结构环形/进度分布 */}
          <div className="bg-surface rounded-2xl p-5 border border-slate-200 shadow-neo-sm space-y-4">
            <h3 className="font-headline font-bold text-sm text-onSurface flex items-center justify-between">
              <span>学科用时与攻关效率</span>
              <span className="text-xs text-slate-400">总 {dayData.actualMinutes || dayData.estimatedMinutes || 120} 分钟</span>
            </h3>

            <div className="space-y-3">
              {(dayData.subjectsSummary && dayData.subjectsSummary.length > 0 ? dayData.subjectsSummary.map((sub, i) => {
                const total = dayData.totalTasks || 1;
                const percent = Math.round((sub.done / total) * 100);
                const colors = ['bg-amber-500', 'bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-rose-500'];
                const mins = Math.max(10, Math.round(((dayData.actualMinutes || 110) * (sub.done || 1)) / (dayData.completedTasks || 1)));
                return {
                  name: `${sub.name}关卡`,
                  minutes: mins,
                  percent: percent || 25,
                  note: sub.done === sub.total ? `已全部通关 · 共 ${sub.total} 项` : `攻克进度 ${sub.done}/${sub.total}`,
                  color: colors[i % colors.length]
                };
              }) : [
                { name: '语文关卡', minutes: 45, percent: 35, note: '朗读流畅，字迹端正', color: 'bg-amber-500' },
                { name: '数学关卡', minutes: 40, percent: 30, note: '草稿严谨，运算无误', color: 'bg-blue-500' },
                { name: '英语关卡', minutes: 25, percent: 20, note: '口语表达自然标准', color: 'bg-emerald-500' },
                { name: '科学拓展', minutes: 20, percent: 15, note: '探究记录完整', color: 'bg-purple-500' }
              ]).map((sub, i) => (
                <div key={i} className="space-y-1 text-xs">
                  <div className="flex justify-between font-bold text-slate-700">
                    <span>{sub.name}</span>
                    <span>{sub.minutes}m ({sub.percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${sub.color} rounded-full`}
                      style={{ width: `${sub.percent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {sub.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. 课堂 vs 回家综合表现看板 */}
          <div className="bg-surface rounded-2xl p-5 border border-slate-200 shadow-neo-sm space-y-3">
            <h3 className="font-headline font-bold text-sm text-onSurface">
              双轨表现看板
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-100 space-y-1">
                <span className="font-black text-blue-800 block">🎒 课堂校内</span>
                <span className="text-slate-600 block">{dayData.schoolCount || 0} 项在校交付</span>
                <span className="text-slate-600 block">A+ 规范度评分</span>
                <span className="text-emerald-700 font-bold block pt-1">教师批改无返工</span>
              </div>
              <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-100 space-y-1">
                <span className="font-black text-amber-800 block">🏠 回家自主</span>
                <span className="text-slate-600 block">{dayData.homeCount || 0} 项自主管理</span>
                <span className="text-slate-600 block">90% 独立思考率</span>
                <span className="text-emerald-700 font-bold block pt-1">零拖延自发开工</span>
              </div>
            </div>
          </div>

          {/* 3. 家长晚间复盘手记 */}
          <div className="bg-surface rounded-2xl p-5 border border-slate-200 shadow-neo-sm space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-black text-sm text-onSurface flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>家长晚间复盘手记</span>
              </h3>
              <button
                onClick={() => setIsEditingNote(!isEditingNote)}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingNote ? '完成保存' : '修改评语'}</span>
              </button>
            </div>

            <div className="text-xs text-slate-400 font-medium">
              记录时刻: 20:35:12 · 家长端已归档
            </div>

            {isEditingNote ? (
              <textarea
                value={parentNoteText}
                onChange={(e) => setParentNoteText(e.target.value)}
                className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-primary min-h-[90px]"
              />
            ) : (
              <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-3 text-xs text-amber-950 leading-relaxed font-medium">
                “{parentNoteText}”
              </div>
            )}

            {/* 双亲专属核验印章 */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>爸爸核验章: 20:30 已过关</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
                <Star className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>妈妈点赞章: 20:35 超赞！</span>
              </span>
            </div>
          </div>

          {/* 4. 孩子今日心声与自评 */}
          <div className="bg-surface rounded-2xl p-5 border border-slate-200 shadow-neo-sm space-y-3">
            <h3 className="font-headline font-bold text-sm text-onSurface flex items-center gap-1.5">
              <Smile className="w-4 h-4 text-emerald-500" />
              <span>探险家今日自评</span>
            </h3>

            <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-3 text-xs space-y-1.5">
              <div className="font-bold text-emerald-800">
                今日心情: {dayData.childReflection?.mood || '开心自主'}
              </div>
              <p className="text-emerald-950 font-medium italic">
                “{dayData.childReflection?.quote || '今天学得很开心！'}”
              </p>
              <div className="text-[10px] text-emerald-600/80 text-right">
                日志编号: {dayData.childReflection?.logId || '#20261018-01'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
