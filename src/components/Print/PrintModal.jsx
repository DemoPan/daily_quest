import React, { useState, useEffect } from 'react';
import { Printer, X, Award, FileText } from 'lucide-react';
import { sounds } from '../../utils/sound';

export default function PrintModal({
  isOpen,
  onClose,
  currentChild,
  initialDocType = 'daily' // 'daily' or 'weekly'
}) {
  if (!isOpen) return null;

  const [docType, setDocType] = useState(initialDocType);

  // Sync initialDocType when opened
  useEffect(() => {
    setDocType(initialDocType);
  }, [initialDocType]);

  // Support ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        sounds.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handlePrint = () => {
    sounds.playStamp();
    window.print();
  };

  const todayStr = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  return (
    /* Modal Backdrop - uses items-start to ensure top is never cropped */
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sounds.playClick();
          onClose();
        }
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm p-3 sm:p-6 flex justify-center items-start"
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 my-4 sm:my-8 animate-in fade-in slide-in-from-top-4 duration-200">
        
        {/* Sticky Top Control Toolbar - Compact & Clean */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md py-3 -mt-6 -mx-6 px-6 sm:-mt-8 sm:-mx-8 sm:px-8 border-b border-slate-200 shadow-sm rounded-t-3xl flex items-center justify-between gap-4 no-print">
          {/* Toggle Type */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => { sounds.playClick(); setDocType('daily'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                docType === 'daily'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>今日作业单</span>
            </button>
            <button
              onClick={() => { sounds.playClick(); setDocType('weekly'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                docType === 'weekly'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>周成长喜报</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Primary Print Button */}
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 btn-squishy-primary text-xs sm:text-sm font-headline font-bold flex items-center gap-2 shadow-neo-primary"
              title="调用系统打印机打印 (A4)"
            >
              <Printer className="w-4 h-4" />
              <span>立即打印</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => { sounds.playClick(); onClose(); }}
              className="px-3 py-1.5 btn-squishy-white text-xs sm:text-sm font-bold flex items-center gap-1 text-slate-600 hover:text-slate-900"
              title="关闭预览 (ESC)"
            >
              <X className="w-4 h-4" />
              <span>关闭 (ESC)</span>
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="printable-area border border-slate-300 rounded-2xl p-6 sm:p-8 bg-white text-black space-y-6">
          {docType === 'daily' ? (
            /* Document 1: Daily Homework Sheet */
            <div className="space-y-6">
              {/* Document Header */}
              <div className="text-center border-b-2 border-slate-800 pb-4 space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">🧭</span>
                  <h1 className="text-2xl font-bold tracking-tight">探险学堂 · 每日作业闯关打卡单</h1>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 pt-2 px-2">
                  <span>探险家：<strong>{currentChild.name} ({currentChild.grade})</strong></span>
                  <span>日期：<strong>{todayStr}</strong></span>
                  <span>目标金币：<strong>+35 🪙</strong></span>
                </div>
              </div>

              {/* Tasks Table */}
              <div className="space-y-4">
                {currentChild.subjects.map((subject) => (
                  <div key={subject.id} className="border border-slate-300 rounded-xl overflow-hidden">
                    <div className="bg-slate-100 px-4 py-2 font-bold text-xs flex items-center justify-between border-b border-slate-300">
                      <span>{subject.icon} {subject.name}</span>
                      <span className="text-slate-500">{subject.tasks.length} 项任务</span>
                    </div>
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                        <tr>
                          <th className="py-2 px-3 w-16">类别</th>
                          <th className="py-2 px-3 w-40">关卡任务</th>
                          <th className="py-2 px-3">具体要求 / 页码</th>
                          <th className="py-2 px-3 w-16 text-center">预估</th>
                          <th className="py-2 px-3 w-20 text-center">孩子自查</th>
                          <th className="py-2 px-3 w-24 text-center">家长核验</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {subject.tasks.map((task) => (
                          <tr key={task.id} className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-3 font-semibold">
                              {task.type === 'home' ? '🏠 回家' : '🎒 课堂'}
                            </td>
                            <td className="py-2.5 px-3 font-bold text-slate-800">
                              {task.title}
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">
                              {task.requirement}
                            </td>
                            <td className="py-2.5 px-3 text-center text-slate-500">
                              {task.estimatedMinutes}m
                            </td>
                            <td className="py-2.5 px-3 text-center font-bold">
                              {task.completed ? '✓ 已完成' : '□'}
                            </td>
                            <td className="py-2.5 px-3 text-center font-bold text-amber-700">
                              {task.verified ? `⭐ ${task.verifiedTime || '已盖印'}` : '□ 待核'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>

              {/* Signatures & Evening Notes Footer */}
              <div className="grid grid-cols-2 gap-4 border-t-2 border-slate-800 pt-4 text-xs">
                <div className="space-y-2 p-3 border border-slate-300 rounded-xl">
                  <div className="font-bold">🦁 孩子今日总结与自评：</div>
                  <div className="h-10 text-slate-400">（孩子手写写下今日心得或专注感受...）</div>
                  <div className="text-right text-slate-500">学生签名：__________</div>
                </div>
                <div className="space-y-2 p-3 border border-slate-300 rounded-xl">
                  <div className="font-bold">⭐ 家长晚间 8:30 验收寄语：</div>
                  <div className="h-10 text-slate-600">今天作业专注高效，完全没有催促，特别棒！继续保持！</div>
                  <div className="text-right text-slate-500">家长签印：__________</div>
                </div>
              </div>
            </div>
          ) : (
            /* Document 2: Weekly Growth Report Poster */
            <div className="space-y-6 border-4 border-double border-amber-500 p-6 rounded-3xl bg-amber-50/20">
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="inline-block px-4 py-1 bg-amber-500 text-white font-bold text-xs rounded-full">
                  2026年秋季航海季 · 第 7 周
                </div>
                <h1 className="text-3xl font-extrabold text-amber-950 tracking-tight">
                  探险学堂 · 周成长探险喜报
                </h1>
                <p className="text-xs text-slate-600">
                  授予优秀探险家：<strong>{currentChild.name} ({currentChild.grade})</strong>
                </p>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-white rounded-2xl border border-amber-200">
                  <div className="text-xs text-slate-500">连续航海打卡</div>
                  <div className="text-2xl font-bold text-amber-600">{currentChild.streakDays} 天 🔥</div>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-blue-200">
                  <div className="text-xs text-slate-500">本周关卡攻克率</div>
                  <div className="text-2xl font-bold text-primary">{currentChild.completionRate}%</div>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-emerald-200">
                  <div className="text-xs text-slate-500">累计赚取探险金币</div>
                  <div className="text-2xl font-bold text-emerald-700">{currentChild.totalCoins} 🪙</div>
                </div>
              </div>

              {/* Radar & Study Hours */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
                <div className="font-bold text-xs text-slate-800">
                  本周学科精力分配 (累计学习 {currentChild.subjectRadar.totalHours} 小时)
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {currentChild.subjectRadar.distribution.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <span>{item.subject}</span>
                      <strong className="text-slate-700">{item.hours}h ({item.percent}%)</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unlocked Badges */}
              <div className="space-y-2">
                <div className="font-bold text-xs text-slate-800">本周点亮荣誉勋章：</div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {currentChild.badges.map(b => (
                    <div key={b.id} className="p-2 bg-white rounded-xl border border-slate-200">
                      <div className="text-xl mb-0.5">{b.icon}</div>
                      <div className="font-bold">{b.title}</div>
                      <div className="text-[10px] text-slate-400">{b.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Praise */}
              <div className="p-4 bg-amber-100/60 rounded-2xl border border-amber-300/80 text-xs text-amber-950 space-y-1">
                <div className="font-bold">💡 探险导师总评：</div>
                <p className="leading-relaxed">
                  {currentChild.subjectRadar.mentorAdvice}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-200">
                <span>探险学堂 Kids Quest 亲子协同认证</span>
                <span>印发日期：{todayStr}</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Floating Actions Footer - Extra Convenience so user doesn't have to scroll back to top */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-4 no-print">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            💡 提示：打印时请在打印设置中勾选「背景图形」，以获得最佳拟物效果。
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => { sounds.playClick(); onClose(); }}
              className="px-4 py-2 btn-squishy-white text-xs sm:text-sm font-bold text-slate-600"
            >
              返回关闭 (ESC)
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 btn-squishy-primary text-xs sm:text-sm font-headline font-bold flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>立即打印此单据</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
