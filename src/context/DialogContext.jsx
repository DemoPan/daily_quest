import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Sparkles, 
  Coins, 
  X,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/sound';

const DialogContext = createContext(null);

export function DialogProvider({ children }) {
  const [dialogConfig, setDialogConfig] = useState(null);
  const resolveRef = useRef(null);
  const confirmBtnRef = useRef(null);

  const handleClose = useCallback((result = false) => {
    sounds.playClick();
    if (resolveRef.current) {
      resolveRef.current(result);
      resolveRef.current = null;
    }
    setDialogConfig(null);
  }, []);

  const handleConfirm = useCallback(() => {
    sounds.playClick();
    if (dialogConfig?.onConfirm) {
      dialogConfig.onConfirm();
    }
    if (resolveRef.current) {
      resolveRef.current(true);
      resolveRef.current = null;
    }
    setDialogConfig(null);
  }, [dialogConfig]);

  const showDialog = useCallback((config) => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setDialogConfig(config);

      // 播放对应音效与动画
      if (config.type === 'success') {
        sounds.playSuccess();
        if (config.confetti !== false) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
          });
        }
      } else if (config.type === 'coin') {
        sounds.playCoin();
      } else if (config.type === 'warning' || config.type === 'danger') {
        sounds.playStamp();
      } else {
        sounds.playClick();
      }
    });
  }, []);

  const showAlert = useCallback((optionsOrMessage) => {
    let options = {};
    if (typeof optionsOrMessage === 'string') {
      options = {
        title: '温馨提示',
        message: optionsOrMessage,
        type: 'info'
      };
    } else {
      options = {
        title: optionsOrMessage.title || '温馨提示',
        message: optionsOrMessage.message || '',
        subMessage: optionsOrMessage.subMessage,
        type: optionsOrMessage.type || 'info',
        confirmText: optionsOrMessage.confirmText || '我知道了',
        confetti: optionsOrMessage.confetti
      };
    }

    return showDialog({
      ...options,
      isConfirm: false
    });
  }, [showDialog]);

  const showConfirm = useCallback((optionsOrMessage) => {
    let options = {};
    if (typeof optionsOrMessage === 'string') {
      options = {
        title: '确认提示',
        message: optionsOrMessage,
        type: 'warning'
      };
    } else {
      options = {
        title: optionsOrMessage.title || '确认提示',
        message: optionsOrMessage.message || '',
        subMessage: optionsOrMessage.subMessage,
        type: optionsOrMessage.type || 'warning',
        confirmText: optionsOrMessage.confirmText || '确定',
        cancelText: optionsOrMessage.cancelText || '取消',
        danger: optionsOrMessage.danger || false
      };
    }

    return showDialog({
      ...options,
      isConfirm: true
    });
  }, [showDialog]);

  // 键盘快捷键响应 (ESC 取消，回车确认)
  useEffect(() => {
    if (!dialogConfig) return;

    const timer = setTimeout(() => {
      confirmBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dialogConfig, handleClose]);

  return (
    <DialogContext.Provider value={{ showDialog, showAlert, showConfirm }}>
      {children}
      {dialogConfig && (
        <CustomDialogModal
          config={dialogConfig}
          onClose={() => handleClose(false)}
          onConfirm={handleConfirm}
          confirmBtnRef={confirmBtnRef}
        />
      )}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}

function CustomDialogModal({ config, onClose, onConfirm, confirmBtnRef }) {
  const { type = 'info', danger = false, isConfirm = false } = config;

  let iconComponent = <Sparkles className="w-6 h-6 text-primary" />;
  let iconWrapperClass = 'w-12 h-12 rounded-2xl bg-primary-light border border-primary/20 flex items-center justify-center flex-shrink-0 shadow-sm';
  let accentHeaderClass = 'bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent';
  let confirmBtnClass = 'bg-primary hover:bg-primary-container shadow-neo-primary';

  if (type === 'coin') {
    iconComponent = <Coins className="w-6 h-6 text-amber-600" />;
    iconWrapperClass = 'w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200/80 flex items-center justify-center flex-shrink-0 shadow-sm';
    accentHeaderClass = 'bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-transparent';
    confirmBtnClass = 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 shadow-md';
  } else if (type === 'success') {
    iconComponent = <CheckCircle2 className="w-6 h-6 text-emerald-600" />;
    iconWrapperClass = 'w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200/80 flex items-center justify-center flex-shrink-0 shadow-sm';
    accentHeaderClass = 'bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent';
    confirmBtnClass = 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md';
  } else if (type === 'warning') {
    iconComponent = <AlertTriangle className="w-6 h-6 text-amber-600" />;
    iconWrapperClass = 'w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200/80 flex items-center justify-center flex-shrink-0 shadow-sm';
    accentHeaderClass = 'bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent';
    confirmBtnClass = danger
      ? 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 shadow-md'
      : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md';
  } else if (type === 'danger') {
    iconComponent = <AlertCircle className="w-6 h-6 text-rose-600" />;
    iconWrapperClass = 'w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200/80 flex items-center justify-center flex-shrink-0 shadow-sm';
    accentHeaderClass = 'bg-gradient-to-r from-rose-500/15 via-red-500/10 to-transparent';
    confirmBtnClass = 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 shadow-md';
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-5 pb-3 flex items-start gap-3.5 relative border-b border-slate-100/80 ${accentHeaderClass}`}>
          <div className={iconWrapperClass}>
            {iconComponent}
          </div>
          <div className="flex-1 pr-6 pt-0.5">
            <h3 className="text-lg font-headline font-bold text-slate-800 leading-snug">
              {config.title}
            </h3>
            {isConfirm && (
              <p className="text-xs text-slate-500 mt-0.5 font-medium">请确认您的下一步操作</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="关闭"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message body */}
        <div className="px-6 py-5 space-y-3">
          <p className="text-sm text-slate-600 font-medium leading-relaxed whitespace-pre-line">
            {config.message}
          </p>
          {config.subMessage && (
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-xs text-slate-600 leading-relaxed font-medium flex items-start gap-2.5">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span className="whitespace-pre-line">{config.subMessage}</span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="p-4 px-6 bg-slate-50/70 border-t border-slate-100 flex items-center gap-3">
          {isConfirm && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-headline font-bold text-sm border border-slate-200/80 shadow-sm btn-squishy transition-all"
            >
              {config.cancelText || '取消'}
            </button>
          )}
          <button
            ref={confirmBtnRef}
            type="button"
            onClick={onConfirm}
            className={`flex-1 py-2.5 px-4 rounded-2xl text-white font-headline font-bold text-sm btn-squishy transition-all ${confirmBtnClass}`}
          >
            {config.confirmText || (isConfirm ? '确定' : '我知道了')}
          </button>
        </div>
      </div>
    </div>
  );
}
