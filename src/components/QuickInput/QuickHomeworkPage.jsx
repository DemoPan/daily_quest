import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Bot, 
  Sparkles, 
  Clipboard, 
  Mic, 
  Camera, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Trash2, 
  Edit3, 
  Plus, 
  Minus, 
  Check, 
  Send, 
  SlidersHorizontal, 
  Eye, 
  CheckSquare,
  Home,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/sound';
import { defaultRawInput, defaultExtractedItems } from './defaultQuickData';

export default function QuickHomeworkPage({ 
  currentChild, 
  onSwitchChild, 
  onBack, 
  onConfirmDispatch 
}) {
  const [rawText, setRawText] = useState(defaultRawInput);
  const [isParsing, setIsParsing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); // all, chinese, math, english, general, extra
  const [isRecording, setIsRecording] = useState(false);
  const [showToast, setShowToast] = useState(null); // toast message
  const [isDispatching, setIsDispatching] = useState(false);

  // 策略开关状态
  const [strategyMerge, setStrategyMerge] = useState(true);
  const [strategyScholar, setStrategyScholar] = useState(true);
  const [strategyAutoSeal, setStrategyAutoSeal] = useState(true);

  // 解析出的作业条目状态
  const [items, setItems] = useState(defaultExtractedItems);

  // 快捷追加模板
  const quickTemplates = [
    { label: '+ 语文每日生字古诗巩固', text: '\n6. 语文：每日生字古诗重点巩固15分钟。' },
    { label: '+ 数学计算天天练 15 题', text: '\n7. 数学：计算天天练15题口算速算。' },
    { label: '+ 英语原版分级绘本伴读', text: '\n8. 英语：原版分级绘本自主阅读伴读15分钟。' },
    { label: '+ 每日体育跳绳 500 次', text: '\n9. 体育：每日花样跳绳500次，开合跳30次打卡。' }
  ];

  const handleAppendTemplate = (templateText) => {
    sounds.playClick();
    setRawText(prev => prev + templateText);
    triggerReparse();
  };

  // 触发重解析动画
  const triggerReparse = () => {
    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
      sounds.playSuccess();
    }, 600);
  };

  // 粘贴剪贴板
  const handlePasteClipboard = async () => {
    sounds.playClick();
    try {
      if (navigator.clipboard?.readText) {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          setRawText(text);
          triggerReparse();
          showNotification('已从剪贴板读取最新作业内容！');
          return;
        }
      }
    } catch {
      // ignore
    }
    showNotification('已触发剪贴板同步检测');
  };

  // 语音速录模拟
  const handleToggleVoice = () => {
    sounds.playClick();
    if (!isRecording) {
      setIsRecording(true);
      showNotification('正在聆听语音录音... 说话即可自动转文字');
      setTimeout(() => {
        setIsRecording(false);
        setRawText(prev => prev + '\n6. 语文：听写第16课词语盘点，红笔订正。');
        triggerReparse();
        showNotification('语音转文字识别成功并已追加！');
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  // OCR 识字模拟
  const handleOcr = () => {
    sounds.playClick();
    showNotification('正在通过 OCR 高精度提取微信通知中的各科作业...');
    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
      sounds.playSuccess();
      showNotification('OCR 识别完成，已自动匹配科目与预估耗时！');
    }, 1200);
  };

  const showNotification = (msg) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  // 耗时步进器
  const handleStepMinutes = (itemId, delta) => {
    sounds.playClick();
    setItems(prev => prev.map(item => {
      if (item.id !== itemId) return item;
      const newMins = Math.max(5, (item.estimatedMinutes || 15) + delta);
      return { ...item, estimatedMinutes: newMins };
    }));
  };

  // 切换场景 (回家 vs 课堂)
  const handleToggleScenario = (itemId, targetScenario) => {
    sounds.playClick();
    setItems(prev => prev.map(item => {
      if (item.id !== itemId) return item;
      return {
        ...item,
        scenario: targetScenario,
        isSchoolCompleted: targetScenario === 'school'
      };
    }));
  };

  // 删除单项任务
  const handleDeleteItem = (itemId) => {
    sounds.playClick();
    setItems(prev => prev.filter(item => item.id !== itemId));
    showNotification('已移除该项作业条目');
  };

  // 统计指标计算
  const stats = useMemo(() => {
    let totalMinutes = 0;
    let homeCount = 0;
    let homeMinutes = 0;
    let schoolCount = 0;
    let schoolMinutes = 0;

    items.forEach(item => {
      const mins = item.estimatedMinutes || 0;
      totalMinutes += mins;
      if (item.scenario === 'home') {
        homeCount++;
        homeMinutes += mins;
      } else {
        schoolCount++;
        schoolMinutes += mins;
      }
    });

    return { totalMinutes, homeCount, homeMinutes, schoolCount, schoolMinutes };
  }, [items]);

  // 过滤后的卡片
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return items;
    return items.filter(item => item.subject === activeFilter);
  }, [items, activeFilter]);

  // 科目数量统计
  const countsBySubject = useMemo(() => {
    const map = { chinese: 0, math: 0, english: 0, general: 0, extra: 0 };
    items.forEach(item => {
      if (item.subject.startsWith('math')) map.math++;
      else if (map[item.subject] !== undefined) map[item.subject]++;
    });
    return map;
  }, [items]);

  // 一键确认分发并自动归位
  const handleConfirmDispatch = () => {
    sounds.playStamp();
    setIsDispatching(true);

    setTimeout(() => {
      sounds.playFanfare();
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 }
      });
      setIsDispatching(false);
      showNotification('🎉 11项作业已归入【大宝·六年级】关卡地图！正在返回主页...');

      if (onConfirmDispatch) {
        onConfirmDispatch(items);
      }
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 pb-28 animate-in fade-in duration-200">
      {/* 浮动提示 Toast */}
      {showToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-2 animate-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{showToast}</span>
        </div>
      )}

      {/* 1. 面包屑与速录舱头部 */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* 左: 返回按钮与状态徽章 */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              sounds.playClick();
              onBack();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface hover:bg-surface-container border border-slate-200 text-slate-700 font-bold text-xs shadow-neo-sm transition-all btn-squishy"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-primary" />
            <span>返回每日打卡表</span>
          </button>

          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>NLP 语义解析内核 v4.2 已就绪</span>
          </span>
        </div>

        {/* 右: 录入对象切换与查重指示 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-surface-container-high/60 p-1 rounded-2xl border border-slate-200/80 text-xs font-bold">
            <span className="text-slate-400 pl-2 text-[11px]">录入对象:</span>
            <button
              onClick={() => {
                sounds.playClick();
                onSwitchChild('dabao');
              }}
              className={`px-3 py-1 rounded-xl transition-all ${
                currentChild.id === 'dabao'
                  ? 'bg-primary text-white shadow-neo-sm'
                  : 'text-slate-600 hover:text-onSurface'
              }`}
            >
              🦁 大宝 (六年级)
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onSwitchChild('erbao');
              }}
              className={`px-3 py-1 rounded-xl transition-all ${
                currentChild.id === 'erbao'
                  ? 'bg-primary text-white shadow-neo-sm'
                  : 'text-slate-600 hover:text-onSurface'
              }`}
            >
              🐰 二宝 (二年级)
            </button>
          </div>

          <span className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>自动重复查重 已开启</span>
          </span>
        </div>
      </div>

      {/* 2. 主标题 Banner */}
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl sm:text-3xl font-headline font-black text-onSurface tracking-tight flex items-center gap-2">
            <span>🤖 智能作业速录舱</span>
          </h1>
          <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black px-2.5 py-0.5 rounded-full shadow-sm">
            语义精准拆分 · 自动归位
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-4xl leading-relaxed">
          直接粘贴微信群通知，或语音通话录音/截图OCR文本，系统自动抽取学科、任务实体、动态预估并智能匹配到「今日知识关卡」对应槽位。
        </p>
      </div>

      {/* 3. Section 1: 双栏工作台网格 (左 7 栏: 输入区, 右 5 栏: 策略看板) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 左栏 (7 栅格): 群消息智能输入区 */}
        <div className="lg:col-span-7 bg-surface rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-neo-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="font-headline font-black text-sm text-onSurface flex items-center gap-1.5">
                <span>💬 群消息智能输入区</span>
              </span>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                {isParsing ? '正在智能分析...' : '实时解析中'}
              </span>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                setRawText('');
                setItems([]);
              }}
              className="text-xs font-bold text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>清空重写</span>
            </button>
          </div>

          {/* 快捷录入行动工具栏 */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handlePasteClipboard}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200/80 text-primary font-bold text-xs transition-all btn-squishy"
            >
              <Clipboard className="w-3.5 h-3.5 text-primary" />
              <span>从剪贴板粘贴</span>
            </button>

            <button
              onClick={handleToggleVoice}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border font-bold text-xs transition-all btn-squishy ${
                isRecording
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                  : 'bg-amber-50/70 hover:bg-amber-100/80 border-amber-200/80 text-amber-900'
              }`}
            >
              <Mic className="w-3.5 h-3.5 text-amber-600" />
              <span>{isRecording ? '录音聆听中...' : '语音速录 (口述)'}</span>
            </button>

            <button
              onClick={handleOcr}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-50/70 hover:bg-purple-100/80 border border-purple-200/80 text-purple-900 font-bold text-xs transition-all btn-squishy"
            >
              <Camera className="w-3.5 h-3.5 text-purple-600" />
              <span>微信截图 OCR 识字</span>
            </button>
          </div>

          {/* 多行输入文本框 */}
          <div className="relative">
            <textarea
              value={rawText}
              onChange={(e) => {
                setRawText(e.target.value);
                triggerReparse();
              }}
              placeholder="在此粘贴老师在家长微信群、钉钉群发送的每日作业通知文本..."
              className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/60 border border-slate-200/90 rounded-2xl p-4 min-h-[190px] focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white leading-relaxed resize-y font-mono"
            />
            <div className="absolute right-3 bottom-3 text-[11px] font-bold text-slate-400 bg-white/90 px-2 py-0.5 rounded-md border border-slate-200/60">
              共 {rawText.length} 字 · 实时解析
            </div>
          </div>

          {/* 高频快捷追加 Chips */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>快捷追加常用自定义作业模版:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickTemplates.map((tmpl, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAppendTemplate(tmpl.text)}
                  className="text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                >
                  {tmpl.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 右栏 (5 栅格): 解析状态大卡与智能策略控制 */}
        <div className="lg:col-span-5 space-y-4">
          {/* 1. 语义提取解析看板 (Dark Emerald / Gradient Card) */}
          <div className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-5 shadow-neo-card relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-md">
                <CheckSquare className="w-3.5 h-3.5 text-emerald-300" />
                <span>已完成智能抽取</span>
              </span>
              <span className="text-xs font-black text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-lg">
                99.8% 置信度
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
                <span className="text-[11px] text-emerald-200 block font-medium">识别独立作业</span>
                <div className="text-2xl font-headline font-black mt-0.5">
                  {items.length} <span className="text-xs font-bold text-emerald-200">项细分任务</span>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
                <span className="text-[11px] text-emerald-200 block font-medium">预计总耗时</span>
                <div className="text-2xl font-headline font-black mt-0.5">
                  {stats.totalMinutes} <span className="text-xs font-bold text-emerald-200">分钟</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10 font-bold">
              <span className="flex items-center gap-1.5 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>🏠 回家自主: {stats.homeCount} 项 ({stats.homeMinutes}分)</span>
              </span>
              <span className="flex items-center gap-1.5 text-blue-300">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>🎒 课堂已完: {stats.schoolCount} 项 ({stats.schoolMinutes}分)</span>
              </span>
            </div>
          </div>

          {/* 2. 智能分发与合流控制策略 (Clean Card) */}
          <div className="bg-surface rounded-3xl p-5 border border-slate-200/90 shadow-neo-sm space-y-3">
            <h3 className="font-headline font-bold text-sm text-onSurface flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span>智能分发与合流控制策略</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              {/* 策略 1 */}
              <label className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={strategyMerge}
                  onChange={(e) => setStrategyMerge(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                />
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-800">关卡已有任务智能合并</div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    检测同科目习题册，自动累加页码而非新建多张卡
                  </p>
                </div>
              </label>

              {/* 策略 2 */}
              <label className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={strategyScholar}
                  onChange={(e) => setStrategyScholar(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                />
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-800">学霸难度模型时长预估</div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    根据六年级近30天做题均速智能微调打卡时间
                  </p>
                </div>
              </label>

              {/* 策略 3 */}
              <label className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={strategyAutoSeal}
                  onChange={(e) => setStrategyAutoSeal(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                />
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-800">课堂已完成作业自动归档为「免做印章」</div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    校内完成项直接赋予完成态，待家长晚间统一核验
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Section 2: 实体投递看板与任务卡片流 */}
      <div className="space-y-4 pt-2">
        {/* 筛选标签条 */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-surface p-3.5 rounded-2xl border border-slate-200/90 shadow-neo-sm">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400 mr-1">实体投递看板:</span>
            {[
              { id: 'all', label: `全部 (${items.length})` },
              { id: 'chinese', label: `语文关卡 (${countsBySubject.chinese})` },
              { id: 'math', label: `数学关卡 (${countsBySubject.math})` },
              { id: 'english', label: `英语关卡 (${countsBySubject.english})` },
              { id: 'general', label: `综合小四门 (${countsBySubject.general})` },
              { id: 'extra', label: `课外拓展 (${countsBySubject.extra})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveFilter(tab.id);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-primary text-white shadow-neo-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1 text-amber-700">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> 高优强化
            </span>
            <span className="flex items-center gap-1 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> 自动合流
            </span>
          </div>
        </div>

        {/* 实体卡片列表 */}
        <div className="space-y-3.5">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-surface rounded-2xl p-5 border border-slate-200/90 shadow-neo-sm hover:shadow-neo-card-hover transition-all space-y-3 relative overflow-hidden"
            >
              {/* 卡片头部行 */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-headline font-black text-sm px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 flex items-center gap-1.5">
                    <span>{item.subjectIcon}</span>
                    <span>{item.subjectName}</span>
                  </span>

                  <h3 className="font-headline font-black text-base text-onSurface">
                    {item.title}
                  </h3>

                  {item.xp > 0 && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                      {item.xp} XP
                    </span>
                  )}

                  {item.highlightBadge && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                      {item.highlightBadge}
                    </span>
                  )}
                </div>

                {/* 场景切换与操作按钮 */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-bold">
                    <button
                      onClick={() => handleToggleScenario(item.id, 'home')}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        item.scenario === 'home'
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      🏠 回家作业
                    </button>
                    <button
                      onClick={() => handleToggleScenario(item.id, 'school')}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        item.scenario === 'school'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      🎒 课堂作业
                    </button>
                  </div>

                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="移除此项"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 原文语义比对展示 */}
              <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/60 text-xs space-y-1.5">
                <div className="text-slate-700 leading-relaxed font-medium">
                  <span className="text-slate-400 font-bold mr-1.5">原文语义:</span>
                  <span>{item.originalText}</span>
                </div>

                {/* 语义元数据 Chips */}
                {item.metadata && item.metadata.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.metadata.map((meta, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600"
                      >
                        <span className="text-slate-400 mr-1">{meta.label}:</span>
                        <span>{meta.value}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 槽位匹配与耗时调节 */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                {/* 投递归位槽位指示 */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary flex items-center gap-1.5 bg-blue-50/80 px-2.5 py-1 rounded-lg border border-blue-100">
                    <Send className="w-3.5 h-3.5 text-primary" />
                    <span>自动投递归位 ➔</span>
                    <span className="font-black">{item.targetSlot.islandName}</span>
                    <span>第 {item.targetSlot.slotIndex} 槽位</span>
                  </span>

                  {item.targetSlot.slotNote && (
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      item.targetSlot.isMerge
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.targetSlot.slotNote}
                    </span>
                  )}
                </div>

                {/* 预估耗时步进调节器 */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold">预估耗时:</span>
                  {item.isSchoolCompleted ? (
                    <span className="font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                      不占用晚间自主时长
                    </span>
                  ) : (
                    <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200">
                      <button
                        onClick={() => handleStepMinutes(item.id, -5)}
                        className="w-6 h-6 rounded-lg bg-white hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-headline font-black px-2.5 text-xs text-onSurface">
                        {item.estimatedMinutes} 分钟
                      </span>
                      <button
                        onClick={() => handleStepMinutes(item.id, 5)}
                        className="w-6 h-6 rounded-lg bg-white hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="bg-surface rounded-2xl p-12 text-center border border-slate-200 text-slate-400 font-bold text-sm">
              当前分类暂无作业实体卡片
            </div>
          )}
        </div>
      </div>

      {/* 5. 底部结算吸附栏 (Sticky Bottom Action Dock) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] p-3 sm:p-4 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* 左侧结算摘要 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline font-black text-sm text-onSurface">
                  已核验就绪 {items.length} 项作业任务
                </span>
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                  零冲突
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                预计总耗时 {stats.totalMinutes} 分钟 · {stats.homeCount}项回家自主 / {stats.schoolCount}项校内实操已结
              </p>
            </div>
          </div>

          {/* 右侧动作按钮组 */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                sounds.playClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all btn-squishy"
            >
              <Edit3 className="w-4 h-4 inline mr-1 text-slate-500" />
              <span>修改原始文本</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onBack();
              }}
              className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all btn-squishy"
            >
              <Eye className="w-4 h-4 inline mr-1 text-slate-500" />
              <span>预览关卡地图</span>
            </button>

            <button
              disabled={isDispatching || items.length === 0}
              onClick={handleConfirmDispatch}
              className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-2xl text-white font-headline font-black text-sm shadow-neo-primary transition-all flex items-center justify-center gap-2 btn-squishy ${
                isDispatching
                  ? 'bg-primary-container opacity-80 cursor-wait'
                  : 'bg-primary hover:bg-primary-dark active:translate-y-1'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>
                {isDispatching
                  ? '正在智能分发...'
                  : `一键确认分发并自动归位 (${items.length})`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
