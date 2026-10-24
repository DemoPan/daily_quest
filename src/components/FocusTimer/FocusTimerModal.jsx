import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle, X, Sparkles, Clock, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/sound';

export default function FocusTimerModal({
  isOpen,
  onClose,
  initialTaskTitle = '',
  initialMinutes = 25,
  onCompleteFocus
}) {
  const [taskName, setTaskName] = useState(initialTaskTitle || '自主专注关卡攻克');
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const timerRef = useRef(null);
  const hasTriggeredFinishedRef = useRef(false);

  // 清除计时器与停止所有音效的通用安全函数
  const stopTimerAndSounds = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    sounds.stopAll();
  }, []);

  // 模态框打开与关闭生命周期
  useEffect(() => {
    if (isOpen) {
      setTaskName(initialTaskTitle || '自主专注关卡攻克');
      const secs = (initialMinutes || 25) * 60;
      setTotalSeconds(secs);
      setTimeLeft(secs);
      setIsRunning(false);
      setIsFinished(false);
      hasTriggeredFinishedRef.current = false;
    } else {
      setIsRunning(false);
      stopTimerAndSounds();
    }
  }, [isOpen, initialTaskTitle, initialMinutes, stopTimerAndSounds]);

  // 关闭模态框处理（确保停止任何残留的计时器和音频）
  const handleModalClose = useCallback(() => {
    setIsRunning(false);
    stopTimerAndSounds();
    onClose();
  }, [stopTimerAndSounds, onClose]);

  // ESC 键监听
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleModalClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleModalClose]);

  // 倒计时核心逻辑
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // 倒计时到达 0
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            setIsRunning(false);
            return 0;
          }

          // 运行中每 2 秒播放轻微节拍音（仅在开启且未结束时）
          if (soundEnabled && (prev - 1) % 2 === 0) {
            sounds.playClick();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, timeLeft, soundEnabled]);

  // 倒计时到达 0 时的单次完成触发（避免重复触发）
  useEffect(() => {
    if (timeLeft === 0 && !hasTriggeredFinishedRef.current && totalSeconds > 0) {
      hasTriggeredFinishedRef.current = true;
      setIsRunning(false);
      setIsFinished(true);

      // 1. 彻底清除计时器与停止正在播放的所有滴答音效
      stopTimerAndSounds();

      // 2. 单次播放通关欢庆号角
      sounds.playFanfare();

      // 3. 散花效果
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 }
      });

      // 4. 回调父级奖励
      if (onCompleteFocus) {
        onCompleteFocus(taskName, Math.round(totalSeconds / 60));
      }
    }
  }, [timeLeft, totalSeconds, taskName, onCompleteFocus, stopTimerAndSounds]);

  // 提早完成打卡
  const handleEarlyComplete = () => {
    if (hasTriggeredFinishedRef.current) return;
    hasTriggeredFinishedRef.current = true;
    setIsRunning(false);
    stopTimerAndSounds();

    sounds.playFanfare();
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.5 }
    });

    const elapsedMinutes = Math.max(1, Math.round((totalSeconds - timeLeft) / 60));
    if (onCompleteFocus) {
      onCompleteFocus(taskName, elapsedMinutes);
    }
    handleModalClose();
  };

  const handleSetDuration = (mins) => {
    sounds.playClick();
    setIsRunning(false);
    setIsFinished(false);
    hasTriggeredFinishedRef.current = false;
    stopTimerAndSounds();
    setTotalSeconds(mins * 60);
    setTimeLeft(mins * 60);
  };

  const toggleRun = () => {
    sounds.playClick();
    if (timeLeft === 0) {
      // 重新开始
      setTimeLeft(totalSeconds);
      setIsFinished(false);
      hasTriggeredFinishedRef.current = false;
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setIsRunning(false);
    setIsFinished(false);
    hasTriggeredFinishedRef.current = false;
    stopTimerAndSounds();
    setTimeLeft(totalSeconds);
  };

  // 确保所有 hooks 在组件顶部执行完毕后，才做判断
  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = totalSeconds > 0 ? Math.round(((totalSeconds - timeLeft) / totalSeconds) * 100) : 0;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleModalClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-6 text-center relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleModalClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          title="关闭"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-primary text-xs font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>专注计时探险舱</span>
          </div>
          <h3 className="font-headline font-bold text-xl text-onSurface">
            番茄钟 · 沉浸攻坚
          </h3>
        </div>

        {/* Task Name Input */}
        <div>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            disabled={isRunning}
            className="w-full text-center text-sm font-bold text-primary bg-blue-50/60 border border-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-80"
            placeholder="正在专注的任务..."
          />
        </div>

        {/* Circular Display */}
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="84"
              stroke="#e2e8f0"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="96"
              cy="96"
              r="84"
              stroke={isFinished ? '#10b981' : '#0058be'}
              strokeWidth="10"
              strokeDasharray={527}
              strokeDashoffset={527 - (527 * progressPercent) / 100}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-500"
            />
          </svg>

          <div className="absolute flex flex-col items-center">
            <div className={`font-headline font-extrabold text-4xl tracking-tight ${isFinished ? 'text-emerald-600' : 'text-onSurface'}`}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <span className="text-xs font-bold text-slate-400 mt-1">
              {isFinished ? '🎉 攻坚完成' : (isRunning ? '🚀 探险沉浸中' : '⏸️ 准备就绪')}
            </span>
          </div>
        </div>

        {/* 计时结束成功提示区 */}
        {isFinished ? (
          <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-4 space-y-2 animate-in zoom-in-95">
            <div className="text-2xl">🏆</div>
            <div className="font-headline font-bold text-emerald-800 text-sm">
              专注攻关大成功！音效已自动休止
            </div>
            <p className="text-xs text-emerald-700">
              已成功专注 {Math.round(totalSeconds / 60)} 分钟 · 获得 +15 XP 能量与 +5 🪙 金币！
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-sm btn-squishy"
              >
                再来一轮
              </button>
              <button
                onClick={handleModalClose}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md btn-squishy"
              >
                完成并退出
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Presets */}
            <div className="flex items-center justify-center gap-2">
              {[10, 15, 20, 25, 30].map((mins) => (
                <button
                  key={mins}
                  disabled={isRunning}
                  onClick={() => handleSetDuration(mins)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50 ${
                    totalSeconds === mins * 60
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
                title={soundEnabled ? '静音滴答声' : '开启滴答声'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              </button>

              <button
                onClick={toggleRun}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all btn-squishy ${
                  isRunning ? 'bg-amber-500 shadow-neo-secondary' : 'bg-primary shadow-neo-primary'
                }`}
                title={isRunning ? '暂停' : '开始专注'}
              >
                {isRunning ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
              </button>

              <button
                onClick={handleReset}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
                title="重置计时器"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Finish Button */}
            <button
              onClick={handleEarlyComplete}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center justify-center gap-1 mx-auto pt-1"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>提早完成了？点击打卡！</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
