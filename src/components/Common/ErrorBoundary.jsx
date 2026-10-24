import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('⚠️ [KidsQuest ErrorBoundary] 捕获到界面渲染异常:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brandBg flex items-center justify-center p-6 text-onSurface font-body">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 text-center space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 border border-amber-200 flex items-center justify-center mx-auto text-amber-600 shadow-sm">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-headline font-bold text-slate-800">
                探险航线遇到了小波动
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                不用担心，您孩子的今日打卡与作业数据均已安全保存在本地和云端，点击下方按钮即可快速重新启航。
              </p>
            </div>

            <button
              onClick={this.handleReload}
              className="w-full py-3 px-6 rounded-2xl bg-primary hover:bg-primary-container text-white font-headline font-bold text-sm shadow-neo-primary btn-squishy flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重新载入探险学堂</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
