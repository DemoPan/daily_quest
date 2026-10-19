import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle, X, Sparkles, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/sound';

export default function FocusTimerModal({
  isOpen,
  onClose,
  initialTaskTitle = '',
  initialMinutes = 25,
  onCompleteFocus
}) {
  if (!isOpen) return null;

  const [taskName, setTaskName] = useState(initialTaskTitle || '自主专注关卡攻克');
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsRunning(false);
            handleFinished();
            return 0;
          }
          if (soundEnabled && prev % 2 === 0) {
            sounds.playClick();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, soundEnabled]);

  const handleFinished = () => {
    sounds.playFanfare();
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.5 }
    });
    if (onCompleteFocus) {
      onCompleteFocus(taskName, Math.round(totalSeconds / 60));
    }
  };

  const handleSetDuration = (mins) => {
    sounds.playClick();
    setIsRunning(false);
    setTotalSeconds(mins * 60);
    setTimeLeft(mins * 60);
  };

  const toggleRun = () => {
    sounds.playClick();
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    sounds.playClick();
    setIsRunning(false);
    setTimeLeft(totalSeconds);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = Math.round(((totalSeconds - timeLeft) / totalSeconds) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-6 text-center relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
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
            className="w-full text-center text-sm font-bold text-primary bg-blue-50/60 border border-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
              stroke="#0058be"
              strokeWidth="10"
              strokeDasharray={527}
              strokeDashoffset={527 - (527 * progressPercent) / 100}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-500"
            />
          </svg>

          <div className="absolute flex flex-col items-center">
            <div className="font-headline font-extrabold text-4xl text-onSurface tracking-tight">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <span className="text-xs font-bold text-slate-400 mt-1">
              {isRunning ? '🚀 探险沉浸中' : '⏸️ 准备就绪'}
            </span>
          </div>
        </div>

        {/* Presets */}
        <div className="flex items-center justify-center gap-2">
          {[10, 15, 20, 25, 30].map((mins) => (
            <button
              key={mins}
              onClick={() => handleSetDuration(mins)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleRun}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all btn-squishy ${
              isRunning ? 'bg-amber-500 shadow-neo-secondary' : 'bg-primary shadow-neo-primary'
            }`}
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
          onClick={() => {
            sounds.playSuccess();
            handleFinished();
            onClose();
          }}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center justify-center gap-1 mx-auto"
        >
          <CheckCircle className="w-3.5 h-3.5" />
          <span>提早完成了？点击打卡！</span>
        </button>
      </div>
    </div>
  );
}
