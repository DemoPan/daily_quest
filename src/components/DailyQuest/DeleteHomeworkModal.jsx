import React, { useEffect, useRef } from 'react';
import { 
  AlertTriangle, 
  X, 
  Trash2, 
  Clock, 
  Home, 
  Lightbulb, 
  Info,
  BookOpen
} from 'lucide-react';
import { sounds } from '../../utils/sound';

export default function DeleteHomeworkModal({
  isOpen,
  item, // { subjectId, subjectName, task }
  onClose,
  onConfirm
}) {
  const cancelBtnRef = useRef(null);

  // 默认聚焦取消按钮，防止键盘回车误删，支持 ESC 键关闭
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        cancelBtnRef.current?.focus();
      }, 50);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !item || !item.task) return null;

  const { subjectName, task } = item;
  const cleanSubjectName = subjectName ? subjectName.split('·')[0].trim() : '学科';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部区：警示图标 + 标题 + 关闭按钮 */}
        <div className="p-5 pb-3 flex items-start gap-3 relative">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 text-amber-500 shadow-sm">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="flex-1 pr-6">
            <h3 id="modal-title" className="text-base font-bold text-slate-800">
              确认删除该项作业吗？
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              删除后今日打卡进度与预估耗时将自动重算
            </p>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="关闭"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 待删作业详情回显卡片 */}
        <div className="px-5 py-2">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5 truncate">
                <BookOpen className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="truncate">{cleanSubjectName} · {task.title}</span>
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${
                  task.type === 'home'
                    ? 'bg-blue-100/70 text-blue-700'
                    : 'bg-emerald-100/70 text-emerald-700'
                }`}>
                  {task.type === 'home' ? <Home className="w-3 h-3" /> : null}
                  {task.type === 'home' ? '回家作业' : '课堂作业'}
                </span>
                <span className="text-[11px] text-slate-500 font-medium flex items-center gap-0.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {task.estimatedMinutes || 15} 分钟
                </span>
              </div>
            </div>

            {task.requirement && (
              <div className="bg-white/80 rounded-xl p-2.5 border border-slate-100">
                <div className="text-[11px] text-slate-400 font-medium mb-0.5">任务要求：</div>
                <div className="text-xs text-slate-600 leading-relaxed font-normal">
                  {task.requirement}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 影响告知徽章区 */}
        <div className="px-5 py-2 space-y-2">
          {/* 金币与记录不受影响 */}
          <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-2.5 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span className="text-xs text-amber-800 font-medium leading-tight">
              已获得的知识金币与孩子历史记录不受影响
            </span>
          </div>

          {/* 后悔药补录提示 */}
          <div className="bg-blue-50/80 border border-blue-200/60 rounded-xl p-2.5 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <span className="text-xs text-blue-800 leading-tight">
              若在今日 20:30 核验前误删，可在学科卡片重新「+ 添加作业」补录
            </span>
          </div>
        </div>

        {/* 底部按钮栏 */}
        <div className="p-5 pt-3 flex items-center gap-3">
          <button
            ref={cancelBtnRef}
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold text-sm transition-all focus:ring-2 focus:ring-slate-400/40 outline-none"
          >
            取消，保留作业
          </button>
          <button
            onClick={() => {
              sounds.playStamp();
              onConfirm(item);
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white font-bold text-sm transition-all shadow-sm hover:shadow-rose-500/25 flex items-center justify-center gap-1.5 focus:ring-2 focus:ring-rose-400/40 outline-none"
          >
            <Trash2 className="w-4 h-4" />
            <span>确认删除</span>
          </button>
        </div>
      </div>
    </div>
  );
}
