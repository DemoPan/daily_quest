import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Coins, 
  Clock, 
  Check, 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Save, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  School,
  Home
} from 'lucide-react';
import { sounds } from '../../utils/sound';
import { useDialog } from '../../context/DialogContext';
import { initialChildrenData } from '../../data/defaultData';

export default function HomeworkTemplateManager({
  currentChild,
  childrenData,
  onSelectChild,
  onSaveHomeworkTemplates,
  onRestoreDefaultTemplates
}) {
  const { showAlert, showConfirm } = useDialog();

  // 当前选中的孩子 ID
  const selectedChildId = currentChild?.id || 'dabao';
  const selectedChild = childrenData?.[selectedChildId] || currentChild;

  // 获取该孩子的初始/默认模板，深度拷贝保证本地编辑不直接污染外部
  const getInitialTemplates = () => {
    if (selectedChild?.templateSubjects && selectedChild.templateSubjects.length > 0) {
      return JSON.parse(JSON.stringify(selectedChild.templateSubjects));
    }
    const fallback = initialChildrenData[selectedChildId] || initialChildrenData.dabao;
    return JSON.parse(JSON.stringify(fallback.subjects || []));
  };

  // 本地正在编辑中的模板科目列表
  const [templateSubjects, setTemplateSubjects] = useState(getInitialTemplates);
  // 是否同时应用到今日作业
  const [applyToToday, setApplyToToday] = useState(true);
  // 是否存在未保存的修改
  const [isDirty, setIsDirty] = useState(false);

  // 模态框状态：编辑或新增任务
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [editingSubjectId, setEditingSubjectId] = useState('chinese');
  const [editingTaskId, setEditingTaskId] = useState(null);

  // 模态框表单数据
  const [formSubjectId, setFormSubjectId] = useState('chinese');
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState('home'); // 'school' | 'home'
  const [formRequirement, setFormRequirement] = useState('');
  const [formEstimatedMinutes, setFormEstimatedMinutes] = useState(15);
  const [formXp, setFormXp] = useState(10);
  const [formCoins, setFormCoins] = useState(5);

  // 当外部切换孩子时，重新载入该孩子的模板
  useEffect(() => {
    setTemplateSubjects(getInitialTemplates());
    setIsDirty(false);
  }, [selectedChildId, selectedChild?.templateSubjects]);

  // 统计指标
  const stats = useMemo(() => {
    let totalTasks = 0;
    let totalMinutes = 0;
    let totalXp = 0;
    let totalCoins = 0;
    let schoolTasks = 0;
    let homeTasks = 0;

    templateSubjects.forEach(sub => {
      (sub.tasks || []).forEach(task => {
        totalTasks += 1;
        totalMinutes += Number(task.estimatedMinutes) || 0;
        totalXp += Number(task.xp) || 0;
        totalCoins += Number(task.coins) || 0;
        if (task.type === 'school') schoolTasks += 1;
        else homeTasks += 1;
      });
    });

    return {
      totalTasks,
      totalMinutes,
      totalXp,
      totalCoins,
      schoolTasks,
      homeTasks
    };
  }, [templateSubjects]);

  // 打开添加任务弹窗
  const handleOpenAddModal = (subjectId) => {
    sounds.playClick();
    setModalMode('add');
    setFormSubjectId(subjectId || templateSubjects[0]?.id || 'chinese');
    setEditingTaskId(null);
    setFormTitle('');
    setFormType('home');
    setFormRequirement('');
    setFormEstimatedMinutes(15);
    setFormXp(10);
    setFormCoins(5);
    setIsModalOpen(true);
  };

  // 打开编辑任务弹窗
  const handleOpenEditModal = (subjectId, task) => {
    sounds.playClick();
    setModalMode('edit');
    setFormSubjectId(subjectId);
    setEditingSubjectId(subjectId);
    setEditingTaskId(task.id);
    setFormTitle(task.title || '');
    setFormType(task.type || 'home');
    setFormRequirement(task.requirement || '');
    setFormEstimatedMinutes(task.estimatedMinutes || 15);
    setFormXp(task.xp || 10);
    setFormCoins(task.coins || 5);
    setIsModalOpen(true);
  };

  // 快速推荐作业标题
  const quickTitleSuggestions = [
    '抄写本 (生字词)',
    '练习册 (课后习题)',
    '错题本订正',
    '古诗/课文背诵朗读',
    '口算速算天天练',
    '英语分级绘本阅读',
    '单词听写默写',
    '体育跳绳打卡'
  ];

  // 提交添加或保存编辑任务
  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      return;
    }

    setTemplateSubjects(prev => {
      const next = JSON.parse(JSON.stringify(prev));

      if (modalMode === 'add') {
        const targetSub = next.find(s => s.id === formSubjectId);
        if (targetSub) {
          const newTask = {
            id: `tpl_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            title: formTitle.trim(),
            type: formType,
            requirement: formRequirement.trim() || '认真书写，保持卷面整洁',
            estimatedMinutes: Number(formEstimatedMinutes) || 15,
            completed: false,
            verified: false,
            verifiedTime: null,
            xp: Number(formXp) || 10,
            coins: Number(formCoins) || 5
          };
          targetSub.tasks = [...(targetSub.tasks || []), newTask];
        }
      } else {
        // 编辑已有任务
        // 如果更换了科目，先从原科目移除
        if (editingSubjectId !== formSubjectId) {
          const oldSub = next.find(s => s.id === editingSubjectId);
          if (oldSub) {
            oldSub.tasks = (oldSub.tasks || []).filter(t => t.id !== editingTaskId);
          }
          const newSub = next.find(s => s.id === formSubjectId);
          if (newSub) {
            newSub.tasks = [
              ...(newSub.tasks || []),
              {
                id: editingTaskId,
                title: formTitle.trim(),
                type: formType,
                requirement: formRequirement.trim() || '认真书写，保持卷面整洁',
                estimatedMinutes: Number(formEstimatedMinutes) || 15,
                completed: false,
                verified: false,
                verifiedTime: null,
                xp: Number(formXp) || 10,
                coins: Number(formCoins) || 5
              }
            ];
          }
        } else {
          const targetSub = next.find(s => s.id === formSubjectId);
          if (targetSub) {
            targetSub.tasks = (targetSub.tasks || []).map(t => {
              if (t.id === editingTaskId) {
                return {
                  ...t,
                  title: formTitle.trim(),
                  type: formType,
                  requirement: formRequirement.trim() || '认真书写，保持卷面整洁',
                  estimatedMinutes: Number(formEstimatedMinutes) || 15,
                  xp: Number(formXp) || 10,
                  coins: Number(formCoins) || 5
                };
              }
              return t;
            });
          }
        }
      }

      return next;
    });

    setIsDirty(true);
    setIsModalOpen(false);
    sounds.playSuccess();
  };

  // 删除任务
  const handleDeleteTask = async (subjectId, taskId, taskTitle) => {
    const confirmed = await showConfirm({
      title: '删除模板任务',
      message: `确定要从每日默认模板中移除「${taskTitle}」吗？`,
      subMessage: '删除后，未来每天将不再自动生成此项默认作业。',
      confirmText: '确认移除',
      cancelText: '取消',
      danger: true
    });

    if (confirmed) {
      setTemplateSubjects(prev => {
        const next = JSON.parse(JSON.stringify(prev));
        const targetSub = next.find(s => s.id === subjectId);
        if (targetSub) {
          targetSub.tasks = (targetSub.tasks || []).filter(t => t.id !== taskId);
        }
        return next;
      });
      setIsDirty(true);
      sounds.playClick();
    }
  };

  // 保存整个模板配置到系统
  const handleSaveAll = async () => {
    sounds.playCoin();
    onSaveHomeworkTemplates(selectedChildId, templateSubjects, applyToToday);
    setIsDirty(false);

    await showAlert({
      title: '每日作业模板保存成功！',
      message: `已为【${selectedChild.name}】更新每日作业标准模板 (共 ${stats.totalTasks} 项)`,
      subMessage: applyToToday
        ? '设置已保存至云端与本地！同时已即时同步至今天的作业待办列表。'
        : '设置已保存至云端与本地！从明天开始将按新模板自动生成每日作业。',
      type: 'success',
      confirmText: '太棒了',
      confetti: true
    });
  };

  // 恢复出厂预设模板
  const handleRestoreDefaults = async () => {
    const confirmed = await showConfirm({
      title: '恢复出厂预设作业模板',
      message: `确定将【${selectedChild.name}】的每日作业模板重置为系统出厂的 17 项全科标准作业吗？`,
      subMessage: '你之前自定义的新增或修改项将被系统标准模板覆盖。',
      confirmText: '恢复出厂设置',
      cancelText: '取消',
      danger: true
    });

    if (confirmed) {
      const fallback = initialChildrenData[selectedChildId] || initialChildrenData.dabao;
      const cleanDefaults = JSON.parse(JSON.stringify(fallback.subjects || []));
      setTemplateSubjects(cleanDefaults);
      setIsDirty(true);
      onRestoreDefaultTemplates(selectedChildId);
      await showAlert({
        title: '已恢复系统出厂模板',
        message: '已重新载入系统标准 17 项作业模板，点击「保存模板」后即可正式生效。',
        type: 'info',
        confirmText: '知道了'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* 顶部控制栏与孩子切换 */}
      <div className="neo-card p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-primary text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-0.5 rounded-full border border-white/20 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              <span>每日作业固定母版</span>
            </span>
            <span className="text-xs text-blue-100 font-medium">
              支持按孩子独立配置 · 跨天自动派发
            </span>
          </div>

          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-2">
            <span>每日作业模板与规则配置</span>
            <BookOpen className="w-7 h-7" />
          </h1>

          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl font-medium">
            在这里定制每天自动生成的默认作业清单。设定合理的预估用时与金币奖励，孩子每天一开学堂即可按照模板专注闯关！
          </p>
        </div>

        {/* 孩子切换按钮 */}
        <div className="flex items-center gap-3 bg-white/10 p-1.5 rounded-2xl border border-white/20">
          {['dabao', 'erbao'].map((id) => {
            const childInfo = childrenData?.[id] || initialChildrenData[id];
            const isSelected = selectedChildId === id;
            return (
              <button
                key={id}
                onClick={() => {
                  sounds.playClick();
                  onSelectChild(id);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-white text-blue-900 shadow-md scale-105'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <span className="text-lg">{childInfo?.avatar || '🦁'}</span>
                <span>{childInfo?.name || id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 统计指标卡片 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="neo-card p-4 bg-white border border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
            📋
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">每日模板任务</div>
            <div className="text-xl font-headline font-extrabold text-onSurface">
              {stats.totalTasks} <span className="text-xs font-normal text-slate-400">项</span>
            </div>
          </div>
        </div>

        <div className="neo-card p-4 bg-white border border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
            ⏱️
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">预估总用时</div>
            <div className="text-xl font-headline font-extrabold text-onSurface">
              {stats.totalMinutes} <span className="text-xs font-normal text-slate-400">分钟</span>
            </div>
          </div>
        </div>

        <div className="neo-card p-4 bg-white border border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
            🪙
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">通关总奖励</div>
            <div className="text-xl font-headline font-extrabold text-amber-600">
              +{stats.totalCoins} <span className="text-xs font-normal text-slate-400">金币</span>
            </div>
          </div>
        </div>

        <div className="neo-card p-4 bg-white border border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
            ⚖️
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">结构分布</div>
            <div className="text-xs font-bold text-slate-700 mt-1 flex items-center gap-1.5">
              <span className="text-blue-600">校内 {stats.schoolTasks}</span>
              <span className="text-slate-300">/</span>
              <span className="text-amber-600">家庭 {stats.homeTasks}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 保存与操作浮动栏 */}
      <div className="neo-card p-4 bg-white border-2 border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={applyToToday}
              onChange={(e) => setApplyToToday(e.target.checked)}
              className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
            />
            <span className="text-xs sm:text-sm font-bold text-slate-700">
              保存时同时同步更新到今天的作业清单
            </span>
          </label>
          {isDirty && (
            <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 animate-pulse">
              ● 有未保存改动
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleRestoreDefaults}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 font-headline font-bold text-xs flex items-center gap-1.5 transition-colors btn-squishy"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>恢复出厂模板</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            className={`px-6 py-2.5 rounded-xl font-headline font-bold text-xs shadow-neo-secondary flex items-center gap-1.5 transition-all btn-squishy ${
              isDirty 
                ? 'bg-primary hover:bg-primary-hover text-white scale-102' 
                : 'bg-primary text-white'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>保存并应用模板</span>
          </button>
        </div>
      </div>

      {/* 科目与任务模板分组列表 */}
      <div className="space-y-6">
        {templateSubjects.map((subject) => {
          const tasks = subject.tasks || [];
          const subjectMinutes = tasks.reduce((acc, t) => acc + (Number(t.estimatedMinutes) || 0), 0);

          return (
            <div key={subject.id} className="neo-card p-5 bg-white border border-slate-100 space-y-4">
              {/* 科目头部 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{subject.icon || '📜'}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-headline font-bold text-base text-onSurface">
                        {subject.name}
                      </h3>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                        {tasks.length} 项
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium">
                      {subject.desc || `预估用时：${subjectMinutes} 分钟`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-xs text-slate-500 font-medium mr-2">
                    ⏱️ 合计 {subjectMinutes}m
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenAddModal(subject.id)}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-headline font-bold text-xs flex items-center gap-1 transition-colors btn-squishy"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>添加任务</span>
                  </button>
                </div>
              </div>

              {/* 任务列表 */}
              {tasks.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400 bg-slate-50/60 rounded-xl border border-dashed border-slate-200">
                  该科目下暂无默认模板任务，点击右上角「添加任务」开始定制
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tasks.map((task, idx) => (
                    <div
                      key={task.id || idx}
                      className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/40 hover:bg-white hover:shadow-sm transition-all flex items-start justify-between gap-3 group"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-headline font-bold text-sm text-onSurface truncate">
                            {task.title}
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
                            task.type === 'school' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {task.type === 'school' ? <School className="w-3 h-3" /> : <Home className="w-3 h-3" />}
                            <span>{task.type === 'school' ? '校内必做' : '家庭巩固'}</span>
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Clock className="w-3 h-3" />
                            <span>{task.estimatedMinutes}m</span>
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 font-medium line-clamp-2">
                          {task.requirement || '按要求完成'}
                        </p>

                        <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
                          <span className="text-indigo-600">⚡ +{task.xp} XP</span>
                          <span className="text-amber-600">🪙 +{task.coins} 金币</span>
                        </div>
                      </div>

                      {/* 编辑与删除按钮 */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(subject.id, task)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors btn-squishy"
                          title="编辑任务"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTask(subject.id, task.id, task.title)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors btn-squishy"
                          title="删除任务"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 新增/编辑任务弹窗 Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[92vh] flex flex-col border border-slate-100 animate-scale-up overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                  {modalMode === 'add' ? <Plus className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                </div>
                <h3 className="font-headline font-bold text-base text-slate-800">
                  {modalMode === 'add' ? '添加每日默认作业' : '编辑作业模板项目'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveModal} className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
              {/* 所属科目 */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  所属科目分类
                </label>
                <select
                  value={formSubjectId}
                  onChange={(e) => setFormSubjectId(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                >
                  {templateSubjects.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.icon} {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 任务名称 */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  作业名称 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：抄写本 (第16课生字)"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                />

                {/* 快捷推荐 */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {quickTitleSuggestions.map((sug, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormTitle(sug)}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition-colors"
                    >
                      + {sug}
                    </button>
                  ))}
                </div>
              </div>

              {/* 作业类型与时长 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    作业类型
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setFormType('school')}
                      className={`py-1.5 rounded-lg transition-all ${
                        formType === 'school'
                          ? 'bg-white text-blue-700 shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      校内必做
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormType('home')}
                      className={`py-1.5 rounded-lg transition-all ${
                        formType === 'home'
                          ? 'bg-white text-amber-700 shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      家庭巩固
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    预估用时 (分钟)
                  </label>
                  <select
                    value={formEstimatedMinutes}
                    onChange={(e) => setFormEstimatedMinutes(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  >
                    {[5, 10, 15, 20, 25, 30, 40, 45, 60].map(m => (
                      <option key={m} value={m}>{m} 分钟</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 验收要求 */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  验收标准与要求说明
                </label>
                <input
                  type="text"
                  placeholder="例如：按固定格式规范书写，字迹工整无涂改"
                  value={formRequirement}
                  onChange={(e) => setFormRequirement(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                />
              </div>

              {/* 奖励经验与金币 */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    奖励经验 (XP)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formXp}
                    onChange={(e) => setFormXp(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    奖励金币 (🪙)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formCoins}
                    onChange={(e) => setFormCoins(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-white font-medium"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-neo-secondary btn-squishy flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{modalMode === 'add' ? '确认添加' : '保存修改'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
