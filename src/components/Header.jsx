import React, { useState } from 'react';
import { 
  Compass, 
  Coins, 
  Zap, 
  Clock, 
  Printer, 
  ShieldCheck, 
  ChevronDown, 
  Star, 
  CheckCircle2, 
  BookOpen, 
  Map, 
  Award,
  BarChart3,
  Cloud,
  CloudOff,
  RefreshCw
} from 'lucide-react';
import { sounds } from '../utils/sound';

export default function Header({
  childrenData,
  currentChildId,
  onSwitchChild,
  activeTab,
  onSelectTab,
  onOpenTimer,
  onOpenPrint,
  isParentMode,
  onToggleParentMode,
  cloudSyncStatus = 'synced',
  onManualSync
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentChild = childrenData[currentChildId];

  const tabs = [
    { id: 'daily', name: '每日闯关', icon: CheckCircle2 },
    { id: 'stats', name: '作业统计', icon: BarChart3 },
    { id: 'shop', name: '宝藏兑换屋', icon: Award },
    { id: 'map', name: '知识寻宝地图', icon: Map },
    { id: 'parent', name: '家长核验台', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_4px_20px_rgba(0,88,190,0.06)] no-print">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => sounds.playClick()}
            className="w-11 h-11 rounded-2xl bg-secondary-container flex items-center justify-center text-secondary-dark shadow-neo-secondary btn-squishy"
            title="探险指南针"
          >
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-xl text-onSurface tracking-tight">探险学堂</span>
              <span className="bg-tertiary-fixed text-tertiary-dark text-xs font-bold px-2 py-0.5 rounded-full border border-tertiary/20 tracking-wider">
                DAILY QUEST
              </span>
              {/* Cloud Sync Status Indicator */}
              <button
                onClick={onManualSync}
                className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
                title={
                  cloudSyncStatus === 'synced'
                    ? '云端数据已连接 (MongoDB Atlas) · 点击手动刷新'
                    : cloudSyncStatus === 'syncing'
                    ? '正在同步数据至云端...'
                    : '当前为离线模式 (数据保存在本地)'
                }
              >
                {cloudSyncStatus === 'synced' && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200">
                    <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">云端已同步</span>
                  </span>
                )}
                {cloudSyncStatus === 'syncing' && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                    <span className="hidden sm:inline">同步中...</span>
                  </span>
                )}
                {cloudSyncStatus === 'offline' && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-full border border-slate-300">
                    <CloudOff className="w-3.5 h-3.5 text-slate-500" />
                    <span className="hidden sm:inline">本地离线</span>
                  </span>
                )}
              </button>
            </div>
            <p className="text-xs text-onSurface-variant font-medium hidden sm:block">
              每日作业闯关打卡 · 智慧岛航海记
            </p>
          </div>
        </div>

        {/* Center/Right: Child Switcher & Resources & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Child Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                sounds.playClick();
                setDropdownOpen(!dropdownOpen);
              }}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-surface-low hover:bg-surface-container border border-slate-200/80 transition-all btn-squishy"
            >
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-lg shadow-sm">
                {currentChild.avatar}
              </div>
              <div className="text-left hidden md:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline font-bold text-sm text-onSurface">{currentChild.name}</span>
                  <span className="text-[11px] font-bold px-1.5 py-0.5 bg-primary text-white rounded-md">
                    Lv.{currentChild.level} ★
                  </span>
                </div>
                <div className="text-[11px] text-onSurface-variant truncate max-w-[120px]">
                  {currentChild.grade}
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                  切换探险家身份
                </div>
                {Object.values(childrenData).map((child) => (
                  <button
                    key={child.id}
                    onClick={() => {
                      sounds.playSuccess();
                      onSwitchChild(child.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-surface-low transition-colors ${
                      child.id === currentChildId ? 'bg-primary-light border-l-4 border-primary font-bold' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-lg">
                      {child.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-onSurface">{child.name}</span>
                        <span className="text-xs text-amber-600 font-bold">Lv.{child.level}</span>
                      </div>
                      <p className="text-xs text-slate-500">{child.grade}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Gold Coins Counter */}
          <div 
            onClick={() => {
              sounds.playCoin();
              onSelectTab('shop');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200/60 text-secondary-dark cursor-pointer transition-all btn-squishy"
            title="点击前往宝藏兑换屋"
          >
            <Coins className="w-4 h-4 text-amber-500 fill-amber-400 animate-bounce" />
            <span className="font-headline font-bold text-sm">{currentChild.coins}</span>
            <span className="text-xs text-amber-800/80 hidden sm:inline">金币</span>
          </div>

          {/* Energy XP */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/60 text-tertiary-dark">
            <Zap className="w-4 h-4 text-emerald-500 fill-emerald-400" />
            <span className="text-xs font-bold">{currentChild.todayEnergyXP}% XP</span>
            <div className="w-12 h-2 bg-emerald-200/60 rounded-full overflow-hidden ml-1">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                style={{ width: `${currentChild.todayEnergyXP}%` }} 
              />
            </div>
          </div>

          {/* Action: Focus Timer */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenTimer();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-surface-low hover:bg-surface-container border border-slate-200/80 text-onSurface text-xs sm:text-sm font-semibold transition-all btn-squishy"
            title="开启番茄专注计时器"
          >
            <Clock className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline">专注计时</span>
          </button>


          {/* Action: Parent Mode */}
          <button
            onClick={() => {
              sounds.playStamp();
              onToggleParentMode();
            }}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all btn-squishy ${
              isParentMode 
                ? 'bg-amber-500 text-white shadow-neo-secondary' 
                : 'bg-surface-low hover:bg-amber-50 text-amber-900 border border-amber-200/80'
            }`}
            title="切换家长管理/核验权限"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isParentMode ? '🛡️ 家长模式 (已开启)' : '家长模式'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 sm:gap-2 overflow-x-auto border-t border-slate-100">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                onSelectTab(tab.id);
              }}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-sm font-headline font-bold transition-all border-b-2 whitespace-nowrap ${
                isActive
                  ? 'border-primary text-primary bg-primary-light/40'
                  : 'border-transparent text-onSurface-variant hover:text-onSurface hover:bg-surface-low'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
