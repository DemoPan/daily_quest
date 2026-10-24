import React, { useState } from 'react';
import { 
  Check, 
  Circle, 
  Plus, 
  Trash2, 
  Clock, 
  Award, 
  Stamp, 
  Sparkles, 
  Filter, 
  Printer, 
  CheckCircle2, 
  AlertCircle,
  AlertTriangle,
  Calendar,
  Bot,
  RotateCcw,
  X 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/sound';
import { useDialog } from '../../context/DialogContext';
import DeleteHomeworkModal from './DeleteHomeworkModal';

export default function DailyQuestPage({
  currentChild,
  onToggleTaskComplete,
  onVerifyTask,
  onDeleteTask,
  onAddTask,
  onUpdateTaskRequirement,
  onResetTodayTasks,
  onOpenTimerForTask,
  onOpenPrint,
  onOpenQuickInput,
  isParentMode
}) {
  const [filterType, setFilterType] = useState('all'); // all, home, school, pending, unverified
  const [showAddModal, setShowAddModal] = useState(false);
  const [targetSubjectId, setTargetSubjectId] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null); // { subjectId, subjectName, task }

  const { showConfirm, showAlert } = useDialog();

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState(currentChild?.subjects?.[0]?.id || '');
  const [newTaskType, setNewTaskType] = useState('home');
  const [newTaskRequirement, setNewTaskRequirement] = useState('');
  const [newTaskMinutes, setNewTaskMinutes] = useState(15);

  // Calculate totals
  let totalTasks = 0;
  let completedTasks = 0;
  let verifiedTasks = 0;
  let totalHome = 0;
  let totalSchool = 0;

  const subjectsList = currentChild?.subjects || [];
  subjectsList.forEach(subject => {
    (subject?.tasks || []).forEach(task => {
      totalTasks++;
      if (task.completed) completedTasks++;
      if (task.verified) verifiedTasks++;
      if (task.type === 'home') totalHome++;
      if (task.type === 'school') totalSchool++;
    });
  });

  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const verificationPercentage = totalTasks > 0 ? Math.round((verifiedTasks / totalTasks) * 100) : 0;

  // 动态获取当天的真实日期
  const today = new Date();
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const todayFormatted = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日 ${weekDays[today.getDay()]}`;

  const handleOpenAddModal = (subjectId = null) => {
    sounds.playClick();
    if (subjectId) {
      setNewTaskSubject(subjectId);
    } else {
      setNewTaskSubject(currentChild?.subjects?.[0]?.id || '');
    }
    setNewTaskTitle('');
    setNewTaskRequirement('');
    setNewTaskMinutes(15);
    setNewTaskType('home');
    setShowAddModal(true);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    sounds.playCoin();
    onAddTask(newTaskSubject, {
      title: newTaskTitle.trim(),
      type: newTaskType,
      requirement: newTaskRequirement.trim() || '按要求认真规范完成',
      estimatedMinutes: parseInt(newTaskMinutes, 10) || 15,
      completed: false,
      verified: false,
      verifiedTime: null,
      xp: parseInt(newTaskMinutes, 10) || 15,
      coins: Math.max(3, Math.round(newTaskMinutes / 3))
    });

    setShowAddModal(false);
  };

  const handleToggleComplete = (subjectId, taskId, currentStatus) => {
    if (!currentStatus) {
      sounds.playSuccess();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      sounds.playClick();
    }
    onToggleTaskComplete(subjectId, taskId);
  };

  const handleStamp = (subjectId, taskId, currentVerified) => {
    sounds.playStamp();
    if (!currentVerified) {
      sounds.playCoin();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    onVerifyTask(subjectId, taskId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner & Quick Controls */}
      <div className="neo-card p-5 sm:p-6 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-amber-50/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          {/* 今日真实日期徽章 */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold text-primary bg-primary-light border border-primary/20 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>{todayFormatted} · 今日闯关</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <h1 className="font-headline font-bold text-2xl sm:text-3xl text-onSurface tracking-tight">
              每日作业动态闯关打卡表
            </h1>
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold px-2.5 py-1 rounded-full">
              {completedTasks}/{totalTasks} 关搞定 ({completionPercentage}%)
            </span>
          </div>
          <p className="text-sm text-onSurface-variant mt-1">
            双重核验机制 · 孩子自主按时搞定，晚间 8:30 家长火漆盖印验收与掉落金币！
          </p>

          {/* Quick Tag Filter */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> 筛选关卡:
            </span>
            <button
              onClick={() => { sounds.playClick(); setFilterType('all'); }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                filterType === 'all' 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              全部 ({totalTasks})
            </button>
            <button
              onClick={() => { sounds.playClick(); setFilterType('home'); }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                filterType === 'home' 
                  ? 'bg-amber-500 text-white shadow-sm' 
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              🏠 回家作业 ({totalHome})
            </button>
            <button
              onClick={() => { sounds.playClick(); setFilterType('school'); }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                filterType === 'school' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200'
              }`}
            >
              🎒 课堂作业 ({totalSchool})
            </button>
            <button
              onClick={() => { sounds.playClick(); setFilterType('pending'); }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                filterType === 'pending' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              待搞定 ({totalTasks - completedTasks})
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => {
              sounds.playClick();
              if (onOpenQuickInput) onOpenQuickInput();
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-primary text-white font-headline font-bold text-sm shadow-neo-primary btn-squishy"
            title="微信群作业智能速录与语义拆分"
          >
            <Bot className="w-4 h-4 text-amber-300" />
            <span>智能速录舱</span>
            <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
              AI
            </span>
          </button>

          <button
            onClick={() => handleOpenAddModal()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 btn-squishy-primary text-sm font-headline"
          >
            <Plus className="w-4 h-4" />
            <span>登记新作业</span>
          </button>

          <button
            onClick={async () => {
              const confirmed = await showConfirm({
                title: '重置今日作业',
                message: '确定要重置今日作业吗？',
                subMessage: '将恢复今日 17 项全科默认作业清单，并将所有打卡和核验印章重置为待完成。',
                type: 'warning',
                confirmText: '确认重置',
                cancelText: '取消',
                danger: true
              });
              if (confirmed && onResetTodayTasks) {
                onResetTodayTasks();
              }
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/90 font-headline font-bold text-xs sm:text-sm btn-squishy transition-all"
            title="恢复今日全科默认作业并将状态重置为待完成"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
            <span>重置今日作业</span>
          </button>

          <button
            onClick={() => { sounds.playClick(); onOpenPrint(); }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 btn-squishy-white text-sm"
            title="打印今日纸质学习单"
          >
            <Printer className="w-4 h-4 text-slate-700" />
            <span className="hidden sm:inline">打印今日单</span>
          </button>
        </div>
      </div>

      {/* Subject Quest Cards Waterfall */}
      <div className="space-y-6">
        {(currentChild?.subjects || []).map((subject) => {
          // Filter tasks based on selected filter
          const filteredTasks = subject.tasks.filter((task) => {
            if (filterType === 'all') return true;
            if (filterType === 'home') return task.type === 'home';
            if (filterType === 'school') return task.type === 'school';
            if (filterType === 'pending') return !task.completed;
            if (filterType === 'unverified') return task.completed && !task.verified;
            return true;
          });

          const subjectDone = subject.tasks.filter(t => t.completed).length;
          const subjectTotal = subject.tasks.length;
          const isAllDone = subjectTotal > 0 && subjectDone === subjectTotal;

          const homeCount = subject.tasks.filter(t => t.type === 'home').length;
          const schoolCount = subject.tasks.filter(t => t.type === 'school').length;

          return (
            <div 
              key={subject.id} 
              className={`neo-card p-5 sm:p-6 transition-all ${
                isAllDone ? 'ring-2 ring-emerald-400/40 bg-emerald-50/15' : ''
              }`}
            >
              {/* Subject Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-low border border-slate-200/90 flex items-center justify-center text-xl shadow-sm">
                    {subject.icon}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-headline font-bold text-lg text-onSurface">
                        {subject.name}
                      </h2>
                      <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold px-2 py-0.5 rounded-full">
                        {subjectTotal}项任务 ({homeCount}回家 / {schoolCount}课堂)
                      </span>
                    </div>
                    <p className="text-xs text-onSurface-variant font-medium mt-0.5">
                      {subject.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                    isAllDone ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-50 text-blue-800'
                  }`}>
                    关卡完成：{subjectDone}/{subjectTotal}
                  </span>
                  <button
                    onClick={() => handleOpenAddModal(subject.id)}
                    className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-primary border border-blue-200 transition-all btn-squishy"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>添加{subject.name.slice(0, 2)}作业</span>
                  </button>
                </div>
              </div>

              {/* Tasks List */}
              <div className="divide-y divide-slate-100 mt-2">
                {filteredTasks.length === 0 ? (
                  <div className="py-6 text-center text-slate-400 text-xs">
                    当前筛选条件下没有待完成的关卡任务哦！
                  </div>
                ) : (
                  filteredTasks.map((task) => {
                    return (
                      <div 
                        key={task.id} 
                        className={`py-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 group transition-colors rounded-xl px-2.5 ${
                          task.completed ? 'bg-emerald-50/20' : 'hover:bg-slate-50/60'
                        }`}
                      >
                        {/* Left: Checkmark + Title + Badge + Status */}
                        <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                          {/* Child Complete Button */}
                          <button
                            onClick={() => handleToggleComplete(subject.id, task.id, task.completed)}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 btn-squishy ${
                              task.completed 
                                ? 'bg-tertiary-container text-white shadow-neo-tertiary scale-100' 
                                : 'border-2 border-slate-300 hover:border-emerald-500 bg-white text-transparent'
                            }`}
                            title={task.completed ? '点击标记为未完成' : '点击标记为已搞定！'}
                          >
                            <Check className="w-5 h-5 stroke-[3]" />
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`font-headline font-bold text-sm ${
                                task.completed ? 'text-slate-800 line-through decoration-emerald-500/50' : 'text-onSurface'
                              }`}>
                                {task.title}
                              </span>

                              {/* Home vs School Badge */}
                              {task.type === 'home' ? (
                                <span className="bg-amber-100 text-amber-900 border border-amber-300/80 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                  <span>🏠</span>
                                  <span>回家作业</span>
                                </span>
                              ) : (
                                <span className="bg-blue-100 text-blue-900 border border-blue-300/80 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                  <span>🎒</span>
                                  <span>课堂作业</span>
                                </span>
                              )}

                              {/* Completed Pill */}
                              {task.completed ? (
                                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <span>已搞定 ✓</span>
                                </span>
                              ) : (
                                <span className="bg-slate-100 text-slate-500 text-[11px] font-medium px-2 py-0.5 rounded-full">
                                  未完成
                                </span>
                              )}
                            </div>

                            {/* Task Requirement Input (Interactive & Editable) */}
                            <div className="mt-1.5 flex items-center gap-2">
                              <span className="text-xs text-slate-400 shrink-0 font-medium">任务要求：</span>
                              <input
                                type="text"
                                value={task.requirement}
                                onChange={(e) => onUpdateTaskRequirement(subject.id, task.id, e.target.value)}
                                className="flex-1 text-xs text-slate-700 bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200/80 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-primary transition-all font-body"
                                placeholder="输入具体要求与页码..."
                              />
                            </div>
                          </div>
                        </div>

                        {/* Right: Time + Parent Stamp + Delete */}
                        <div className="flex items-center justify-between lg:justify-end gap-2.5 pl-11 lg:pl-0 shrink-0">
                          {/* Time estimation (clickable to start Pomodoro) */}
                          <button
                            onClick={() => {
                              sounds.playClick();
                              onOpenTimerForTask(task.title, task.estimatedMinutes);
                            }}
                            className="flex items-center gap-1 text-xs text-slate-600 hover:text-primary font-medium px-2 py-1 rounded-lg hover:bg-blue-50/80 transition-colors"
                            title="点击开启专注计时"
                          >
                            <Clock className="w-3.5 h-3.5 text-primary" />
                            <span>⏱️ {task.estimatedMinutes}分钟</span>
                          </button>

                          {/* Parent Stamp Button */}
                          {task.verified ? (
                            <button
                              onClick={() => {
                                if (isParentMode) {
                                  handleStamp(subject.id, task.id, true);
                                } else {
                                  sounds.playStamp();
                                }
                              }}
                              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-headline font-bold text-xs shadow-sm flex items-center gap-1.5 animate-stamp cursor-pointer border border-amber-300"
                              title={isParentMode ? '家长点击可撤销盖印' : '家长已于此时间核验通过'}
                            >
                              <span>⭐</span>
                              <span>家长已核验 ✓ {task.verifiedTime || '已盖印'}</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStamp(subject.id, task.id, false)}
                              className={`px-3 py-1.5 rounded-xl border-2 border-dashed text-xs font-bold transition-all flex items-center gap-1.5 btn-squishy ${
                                isParentMode || task.completed
                                  ? 'border-amber-400 bg-amber-50/80 text-amber-900 hover:bg-amber-100 hover:border-amber-500 shadow-sm'
                                  : 'border-slate-300 text-slate-400 hover:border-slate-400 hover:text-slate-600 bg-white'
                              }`}
                              title={task.completed ? '孩子已搞定，点击盖上家长核验印章' : '完成任务后进行家长签印'}
                            >
                              <Stamp className="w-3.5 h-3.5" />
                              <span>[家长签印]</span>
                            </button>
                          )}

                          {/* Delete Button */}
                          <button
                            onClick={() => {
                              sounds.playClick();
                              setTaskToDelete({
                                subjectId: subject.id,
                                subjectName: subject.name,
                                task
                              });
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="删除今日不需要的作业条目"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Bar */}
      <div className="neo-card p-4 sm:p-5 bg-surface-low border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-onSurface-variant">
        <div className="flex items-center gap-2 font-medium">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>探险学堂 Kids Quest · 启发主动学习与亲子正向鼓励</span>
        </div>
        <div className="flex items-center gap-4 font-bold">
          <span className="flex items-center gap-1 text-amber-900">
            🥇 累计印章：{currentChild.stampsCount} 枚
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1 text-emerald-800">
            🏅 已通过核验率：{currentChild.passedRate}%
          </span>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary-fixed flex items-center justify-center text-primary font-bold">
                  📝
                </div>
                <h3 className="font-headline font-bold text-lg text-onSurface">登记 / 添加新作业</h3>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-sm">
              {/* Select Subject */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">所属学科关卡</label>
                <select
                  value={newTaskSubject}
                  onChange={(e) => setNewTaskSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary font-body text-sm"
                >
                  {currentChild.subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
                  ))}
                </select>
              </div>

              {/* Task Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">作业名称 (如: 练习册第28页、古诗朗诵)</label>
                <input
                  type="text"
                  required
                  placeholder="如: 练字本第 12 页 / 朗读第三自然段"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary font-body text-sm"
                />
              </div>

              {/* Home vs School Quest */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">作业标签属性</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewTaskType('home')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      newTaskType === 'home'
                        ? 'bg-amber-100 text-amber-900 border-amber-400 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>🏠</span>
                    <span>回家作业 (需放学完成)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewTaskType('school')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      newTaskType === 'school'
                        ? 'bg-blue-100 text-blue-900 border-blue-400 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>🎒</span>
                    <span>课堂作业 (校内查验)</span>
                  </button>
                </div>
              </div>

              {/* Requirement details */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">具体要求与说明 (可选)</label>
                <input
                  type="text"
                  placeholder="如: 完成第 24 页 至 27 页（重点完成第 26 页）"
                  value={newTaskRequirement}
                  onChange={(e) => setNewTaskRequirement(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary font-body text-sm"
                />
              </div>

              {/* Estimated minutes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">预估用时 (分钟)</label>
                <div className="flex items-center gap-2">
                  {[10, 15, 20, 25, 30].map(mins => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setNewTaskMinutes(mins)}
                      className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                        newTaskMinutes === mins
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 btn-squishy-primary text-xs font-headline font-bold"
                >
                  确认添加
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Task Secondary Confirmation Modal from Stitch */}
      {Boolean(taskToDelete) && (
        <DeleteHomeworkModal
          isOpen={Boolean(taskToDelete)}
          item={taskToDelete}
          onClose={() => setTaskToDelete(null)}
          onConfirm={(targetItem) => {
            onDeleteTask(targetItem.subjectId, targetItem.task.id);
            setTaskToDelete(null);
          }}
        />
      )}
    </div>
  );
}
