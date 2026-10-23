import React, { useState } from 'react';
import { 
  Flame, 
  Compass, 
  Award, 
  MapPin, 
  Sparkles, 
  Printer, 
  Share2, 
  Lock, 
  CheckCircle2, 
  Star, 
  BookOpen, 
  Lightbulb, 
  TrendingUp, 
  Flag 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/sound';
import { useDialog } from '../../context/DialogContext';

export default function KnowledgeMapPage({
  currentChild,
  onOpenWeeklyReport
}) {
  const [selectedNode, setSelectedNode] = useState(null);
  const { showAlert } = useDialog();
  const mapData = currentChild.monopolyMap;

  const handleNodeClick = (node, index) => {
    sounds.playClick();
    setSelectedNode({ ...node, index });
    if (node.status === 'passed') {
      sounds.playSuccess();
    } else if (node.status === 'active') {
      sounds.playCoin();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner: Blue-to-yellow Voyage Log */}
      <div className="neo-card p-6 bg-gradient-to-r from-blue-700 via-primary to-amber-500 text-white shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        {/* Background decorative subtle compass */}
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none text-white text-9xl">
          🧭
        </div>

        <div className="space-y-2 z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
              {mapData.term}
            </span>
            <span className="bg-amber-400 text-amber-950 text-xs font-headline font-bold px-3 py-1 rounded-full shadow-sm">
              {mapData.week}
            </span>
          </div>

          <h1 className="font-headline font-bold text-2xl sm:text-3xl tracking-tight text-white flex items-center gap-2">
            <span>{currentChild.name}的航海探险日志</span>
            <span className="text-2xl animate-spin" style={{ animationDuration: '10s' }}>🧭</span>
          </h1>

          <p className="text-sm text-blue-100 font-medium leading-relaxed">
            {currentChild.grade.split('·')[0]}探险编队 · 扬帆前行！每完成一项每日任务，小探险船就向金银岛迈进一步！
          </p>
        </div>

        {/* 3 Right Glassmorphism Metric Cards */}
        <div className="grid grid-cols-3 gap-3 w-full lg:w-auto z-10">
          {/* Card 1: Streak days */}
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 sm:p-4 text-center min-w-[95px] shadow-sm">
            <div className="text-[11px] font-bold text-blue-100 flex items-center justify-center gap-1">
              <span>航海连续打卡</span>
              <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            </div>
            <div className="font-headline font-bold text-2xl text-white mt-1">
              {currentChild.streakDays} <span className="text-sm font-normal">天 🔥</span>
            </div>
            <div className="text-[10px] text-blue-200 mt-0.5">
              历史连胜 {currentChild.maxStreak} 天
            </div>
          </div>

          {/* Card 2: Weekly completion rate */}
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 sm:p-4 text-center min-w-[95px] shadow-sm">
            <div className="text-[11px] font-bold text-blue-100 flex items-center justify-center gap-1">
              <span>本周关卡攻克率</span>
              <span className="text-emerald-300 text-xs">🟢</span>
            </div>
            <div className="font-headline font-bold text-2xl text-white mt-1">
              {currentChild.completionRate} <span className="text-sm font-normal">%</span>
            </div>
            <div className="text-[10px] text-blue-200 mt-0.5">
              已闯 {currentChild.completedQuestsCount}/{currentChild.totalWeeklyQuestsCount} 关
            </div>
          </div>

          {/* Card 3: Explorer medals */}
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 sm:p-4 text-center min-w-[95px] shadow-sm">
            <div className="text-[11px] font-bold text-blue-100 flex items-center justify-center gap-1">
              <span>探险家勋章</span>
              <Award className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <div className="font-headline font-bold text-2xl text-white mt-1">
              {currentChild.badges.length} <span className="text-sm font-normal">枚 🎖️</span>
            </div>
            <div className="text-[10px] text-amber-200 mt-0.5">
              本周新增 +2 枚
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Monopoly Voyage Map Card */}
      <div className="neo-card p-6 bg-gradient-to-b from-sky-50/60 via-blue-50/30 to-amber-50/40 relative overflow-hidden space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200/80 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-neo-primary">
              <span className="text-xl">⛵</span>
            </div>
            <div>
              <h2 className="font-headline font-bold text-lg sm:text-xl text-onSurface">
                知识大陆 · 7天周闯关棋盘
              </h2>
              <p className="text-xs text-onSurface-variant font-medium mt-0.5">
                点击各探险节点查看当日通关宝箱与详情
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => sounds.playClick()}
              className="px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-headline font-bold shadow-sm"
            >
              本周航线 (7/7)
            </button>
            <button 
              onClick={() => {
                showAlert({
                  title: '往期航海日记',
                  message: '已成功载入往期航海日志档案！',
                  subMessage: '历史通关印章与航海藏宝图均已归档保存，可在周报中随时查阅回顾。',
                  type: 'info',
                  confirmText: '好的'
                });
              }}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-bold transition-all"
            >
              历史航海图
            </button>
          </div>
        </div>

        {/* Monopoly Path Nodes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 relative pt-2">
          {mapData.nodes.map((node, index) => {
            const isPassed = node.status === 'passed';
            const isActive = node.status === 'active';
            const isLocked = node.status === 'locked';

            return (
              <div
                key={index}
                onClick={() => handleNodeClick(node, index)}
                className={`neo-card p-3 sm:p-4 text-center cursor-pointer transition-all flex flex-col justify-between items-center relative group min-h-[190px] ${
                  isActive
                    ? 'ring-4 ring-amber-400 bg-amber-50/90 shadow-neo-secondary scale-105 z-20'
                    : isPassed
                    ? 'bg-emerald-50/70 border-emerald-300 hover:scale-102 hover:shadow-neo-card-hover'
                    : 'bg-slate-50/80 border-slate-200 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Active "Today Flag" Badge */}
                {isActive && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-headline font-bold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1 z-30">
                    <Flag className="w-3 h-3 fill-white" />
                    <span>今日驻扎</span>
                  </div>
                )}

                {/* Day Tag & Stars */}
                <div className="w-full flex items-center justify-between text-[11px] font-bold">
                  <span className={`px-2 py-0.5 rounded-md ${
                    isPassed ? 'bg-emerald-100 text-emerald-800' : isActive ? 'bg-amber-100 text-amber-900' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {node.day}
                  </span>
                  <div className="flex items-center text-amber-400 text-xs">
                    {Array.from({ length: node.stars || 1 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>

                {/* Node Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl my-2 shadow-sm transition-transform group-hover:scale-110 ${
                  isActive
                    ? 'bg-amber-400 text-white shadow-neo-secondary animate-bounce'
                    : isPassed
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-white text-slate-400 border border-slate-200'
                }`}>
                  {node.icon}
                </div>

                {/* Node Title & Description */}
                <div>
                  <h3 className="font-headline font-bold text-sm text-onSurface">
                    {node.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-1">
                    {node.desc}
                  </p>
                </div>

                {/* Reward / Status Pill */}
                <div className="mt-2 w-full">
                  <span className={`inline-block w-full py-1 px-1.5 rounded-lg text-[10px] font-bold truncate ${
                    isPassed
                      ? 'bg-emerald-100 text-emerald-800'
                      : isActive
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {node.reward}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Node detail modal/banner when clicked */}
        {selectedNode && (
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-md flex items-center justify-between gap-4 animate-in fade-in duration-150">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedNode.icon}</span>
              <div>
                <h4 className="font-headline font-bold text-sm text-onSurface">
                  {selectedNode.day} · {selectedNode.name} ({selectedNode.status === 'passed' ? '已通关' : selectedNode.status === 'active' ? '今日进行中' : '即将开启'})
                </h4>
                <p className="text-xs text-slate-500">{selectedNode.desc} · 战利品：{selectedNode.reward}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs font-bold px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg"
            >
              关闭
            </button>
          </div>
        )}
      </div>

      {/* Lower Section: 2 Columns (Radar/Study Hours & Achievements Hall) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: 学科探险雷达与精力分配 */}
        <div className="neo-card p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-primary flex items-center justify-center font-bold text-lg">
                  📊
                </div>
                <div>
                  <h3 className="font-headline font-bold text-base text-onSurface">
                    学科探险雷达与精力分配
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    本周累计学习时长: {currentChild.subjectRadar.totalHours} 小时 · 任务分布均衡度优
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 bg-blue-100 text-blue-900 rounded-md">
                {currentChild.grade.split('·')[0]}
              </span>
            </div>

            {/* Subject Distribution Progress Bars */}
            <div className="space-y-3 pt-1">
              {currentChild.subjectRadar.distribution.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                      <span>{item.subject} ({item.percent}%)</span>
                    </span>
                    <span className="text-slate-500 font-medium">{item.hours} 小时 / 周</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                    <div 
                      className={`h-full ${item.color} rounded-full transition-all duration-700`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mentor Advice Box */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-2xl border border-blue-200/80 text-xs text-slate-700 space-y-1">
            <div className="flex items-center gap-1.5 text-primary font-bold">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>探险导师每周锦囊：</span>
            </div>
            <p className="leading-relaxed font-medium text-slate-600 pl-5">
              {currentChild.subjectRadar.mentorAdvice}
            </p>
          </div>
        </div>

        {/* Right Column: 成就殿堂与习惯印章 */}
        <div className="neo-card p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-lg">
                  🏅
                </div>
                <div>
                  <h3 className="font-headline font-bold text-base text-onSurface">
                    成就殿堂与习惯印章
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">点亮习惯之光，解锁专属荣誉</p>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md">
                已点亮 {currentChild.badges.length} 枚
              </span>
            </div>

            {/* 4 Badges Grid */}
            <div className="grid grid-cols-2 gap-3.5 pt-1">
              {currentChild.badges.map((badge) => (
                <div 
                  key={badge.id}
                  onClick={() => { sounds.playSuccess(); }}
                  className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/40 border border-blue-200/60 hover:shadow-neo-card-hover transition-all cursor-pointer text-center group"
                >
                  <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">
                    {badge.icon}
                  </div>
                  <h4 className="font-headline font-bold text-xs text-onSurface">
                    {badge.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                    {badge.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Monthly Progress Badge Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-primary" />
                  <span>{currentChild.monthlyBadge.title}</span>
                </span>
                <span className="text-primary font-headline">
                  {currentChild.monthlyBadge.progress} / {currentChild.monthlyBadge.target} 天
                </span>
              </div>

              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${(currentChild.monthlyBadge.progress / currentChild.monthlyBadge.target) * 100}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-500 font-medium">
                再连续打卡 {currentChild.monthlyBadge.target - currentChild.monthlyBadge.progress} 天，即可获得「{currentChild.monthlyBadge.reward}」！
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Print / Share Callout Card */}
      <div className="neo-card p-6 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-white flex items-center justify-center text-2xl shadow-neo-secondary shrink-0">
            📋
          </div>
          <div>
            <h3 className="font-headline font-bold text-base text-onSurface">
              将本周成长足迹装订成册？
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              支持一键导出适合 A4 打印的「周成长探险喜报」，适合贴在冰箱或书桌旁激励孩子，全家共同见证进步！
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              showAlert({
                title: '喜报分享成功',
                message: '已生成周打卡喜报海报与成长分享短语！',
                subMessage: '海报格式已适配手机屏幕，快快发送到家庭微信群，让长辈与好友一起为孩子的进步点赞喝彩吧！🎉',
                type: 'success',
                confirmText: '太棒了',
                confetti: true
              });
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 btn-squishy-white text-xs font-bold"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>分享给家长群</span>
          </button>
          <button
            onClick={() => {
              sounds.playStamp();
              onOpenWeeklyReport();
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 btn-squishy-primary text-xs font-headline font-bold"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>打印周成长报告单</span>
          </button>
        </div>
      </div>
    </div>
  );
}
