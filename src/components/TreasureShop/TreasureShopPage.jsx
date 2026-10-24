import React, { useState } from 'react';
import { 
  Coins, 
  Award, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  QrCode, 
  Gift, 
  Clock, 
  Check, 
  Heart, 
  Ticket, 
  ChevronRight, 
  AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/sound';
import { useDialog } from '../../context/DialogContext';

export default function TreasureShopPage({
  currentChild,
  onRedeemReward,
  onSubmitWish,
  onVerifyLedgerItem,
  isParentMode
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc'); // asc: low to high, desc: high to low
  const [customWishTitle, setCustomWishTitle] = useState('');
  const [customWishCost, setCustomWishCost] = useState(70);

  const { showAlert, showConfirm } = useDialog();

  const categories = [
    { id: 'all', name: `全部奖励 (${currentChild.rewards.length})`, icon: '🎁' },
    { id: 'game', name: '游戏娱乐券', icon: '🎮' },
    { id: 'food', name: '美食心愿', icon: '🍧' },
    { id: 'outdoor', name: '户外与探险', icon: '🏕️' },
    { id: 'stationery', name: '文具手办', icon: '🎨' },
    { id: 'privilege', name: '专属特权', icon: '👑' },
  ];

  // Filter & Sort
  const filteredRewards = (currentChild?.rewards || []).filter(r => {
    if (selectedCategory === 'all') return true;
    return r.category === selectedCategory;
  }).sort((a, b) => {
    return sortOrder === 'asc' ? a.cost - b.cost : b.cost - a.cost;
  });

  const bigGoal = currentChild?.bigGoal || { targetCoins: 300, currentCoins: 0, title: '' };
  const bigGoalPercent = Math.min(100, Math.round(((currentChild?.coins || 0) / (bigGoal.targetCoins || 1)) * 100));
  const bigGoalRemaining = Math.max(0, (bigGoal.targetCoins || 0) - (currentChild?.coins || 0));
  const estimatedDays = Math.ceil(bigGoalRemaining / 20) || 1;

  const handleRedeem = async (reward) => {
    if (currentChild.coins < reward.cost) {
      await showAlert({
        title: '金币还不够哦',
        message: `当前拥有 ${currentChild.coins} 🪙，还差 ${reward.cost - currentChild.coins} 🪙。`,
        subMessage: '快去每日打卡多攻克几个学习关卡，金币很快就能攒齐啦！',
        type: 'coin',
        confirmText: '去攻克关卡'
      });
      return;
    }

    const confirmed = await showConfirm({
      title: '确认兑换好礼',
      message: `确定要消耗 ${reward.cost} 🪙 兑换「${reward.title}」吗？`,
      subMessage: '兑换成功后将自动扣除金币，并生成专属核销卡券！',
      type: 'coin',
      confirmText: '确认兑换',
      cancelText: '再想想'
    });

    if (confirmed) {
      sounds.playCoin();
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
      onRedeemReward(reward);
    }
  };

  const handleCustomWishSubmit = async (e) => {
    e.preventDefault();
    if (!customWishTitle.trim()) return;

    const wishName = customWishTitle.trim();
    const wishCost = parseInt(customWishCost, 10) || 50;

    sounds.playCoin();
    onSubmitWish({
      title: wishName,
      cost: wishCost,
      status: 'pending',
      submitTime: '刚刚提交'
    });

    setCustomWishTitle('');
    setCustomWishCost(70);

    await showAlert({
      title: '心愿递交成功',
      message: `「${wishName}」已成功递交到家长审核台！`,
      subMessage: '爸爸妈妈在家长工作台审批通过后，就会立即上架到宝藏货架哦！',
      type: 'success',
      confirmText: '好的，期待上架'
    });
  };

  const readyLedgerCount = currentChild.redeemedLedger.filter(item => item.status !== 'completed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Header Card & Piggy Bank Overview */}
      <div className="neo-card p-6 bg-gradient-to-r from-amber-50/70 via-orange-50/40 to-yellow-50/60 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold px-3 py-1 rounded-full">
              宝藏兑换屋 · 愿望补给站
            </span>
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              今日目标金币充足 · 随时兑换
            </span>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <h1 className="font-headline font-bold text-2xl sm:text-3xl text-onSurface tracking-tight">
              {currentChild.name}的冒险储蓄罐
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 bg-primary-fixed text-primary rounded-md">
              {currentChild.grade}
            </span>
          </div>

          <p className="text-sm text-onSurface-variant mt-1 max-w-2xl">
            打卡闯关积攒的每一枚金币，都是通往梦想宝藏的钥匙！自主规划、合理支配你的探险所得吧。
          </p>
        </div>

        {/* Top-Right 3 Asset Metric Cards */}
        <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
          {/* Available Coins */}
          <div className="neo-card p-3 sm:p-4 bg-amber-50/90 border-amber-200/90 text-center flex flex-col items-center justify-center min-w-[100px]">
            <div className="flex items-center gap-1 text-amber-900 font-headline font-bold text-xl sm:text-2xl">
              <span>🪙</span>
              <span>{currentChild.coins}</span>
            </div>
            <div className="text-[11px] font-bold text-amber-800/80 mt-0.5">当前可用金币</div>
          </div>

          {/* Total Earned Coins */}
          <div className="neo-card p-3 sm:p-4 bg-blue-50/90 border-blue-200/90 text-center flex flex-col items-center justify-center min-w-[100px]">
            <div className="flex items-center gap-1 text-blue-900 font-headline font-bold text-xl sm:text-2xl">
              <span>🏆</span>
              <span>{currentChild.totalCoins}</span>
            </div>
            <div className="text-[11px] font-bold text-blue-800/80 mt-0.5">累计赚取金币</div>
          </div>

          {/* Wish Completion Rate */}
          <div className="neo-card p-3 sm:p-4 bg-emerald-50/90 border-emerald-200/90 text-center flex flex-col items-center justify-center min-w-[100px]">
            <div className="flex items-center gap-1 text-emerald-900 font-headline font-bold text-xl sm:text-2xl">
              <span>🌱</span>
              <span>75%</span>
            </div>
            <div className="text-[11px] font-bold text-emerald-800/80 mt-0.5">心愿达成率</div>
          </div>
        </div>
      </div>

      {/* Super Big Goal Card (终极大愿望契约) */}
      <div className="neo-card p-6 bg-gradient-to-r from-orange-100/40 via-amber-50/50 to-white border-amber-300/80 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-5 flex-1">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-4xl sm:text-5xl shadow-neo-secondary shrink-0">
            {bigGoal.image || '🏰'}
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-500 text-white font-headline font-bold text-xs px-2.5 py-0.5 rounded-full shadow-sm">
                终极大愿望
              </span>
              <span className="text-xs text-primary font-bold bg-blue-100/80 px-2 py-0.5 rounded-md">
                正在积金币 目标周期：{bigGoal.period}
              </span>
            </div>
            <h2 className="font-headline font-bold text-xl sm:text-2xl text-onSurface">
              {bigGoal.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{bigGoal.note}</span>
            </p>
          </div>
        </div>

        {/* Big Goal Progress Bar & Days needed */}
        <div className="w-full md:w-80 space-y-2 bg-white/80 p-4 rounded-2xl border border-amber-200/80 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1">
              <span>🚩</span>
              <span>储蓄进度</span>
            </span>
            <span className="text-amber-600 font-headline text-sm">
              {currentChild.coins} / {bigGoal.targetCoins} 🪙 ({bigGoalPercent}%)
            </span>
          </div>

          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 rounded-full transition-all duration-700"
              style={{ width: `${bigGoalPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="text-rose-600">
              还差 {bigGoalRemaining} 金币
            </span>
            <span className="text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
              预计坚持打卡 {estimatedDays} 天可解锁！
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills & Sorting Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sounds.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-headline font-bold transition-all whitespace-nowrap flex items-center gap-1.5 btn-squishy ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white shadow-neo-primary'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Sort Order Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-500 font-bold">排序:</span>
          <select
            value={sortOrder}
            onChange={(e) => {
              sounds.playClick();
              setSortOrder(e.target.value);
            }}
            className="text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
          >
            <option value="asc">金币升序 (先买得起的)</option>
            <option value="desc">金币降序 (大心愿在先)</option>
          </select>
        </div>
      </div>

      {/* Section Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-5 rounded-full bg-amber-500 inline-block"></span>
          <h2 className="font-headline font-bold text-xl text-onSurface">可立即兑换的心愿好礼</h2>
          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
            即买即享
          </span>
        </div>
        <p className="text-xs text-slate-500 hidden sm:block">
          兑换后生成核销卡券，向爸爸妈妈出示凭证核销使用
        </p>
      </div>

      {/* 6 Reward Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRewards.map((reward) => {
          const canAfford = currentChild.coins >= reward.cost;
          return (
            <div 
              key={reward.id}
              className={`neo-card p-5 flex flex-col justify-between transition-all group ${
                canAfford ? 'hover:shadow-neo-card-hover' : 'opacity-90 bg-slate-50/50'
              }`}
            >
              <div>
                {/* Card Top: Tag + Price in Coins */}
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {reward.tag}
                  </span>
                  <div className="flex items-center gap-1 font-headline font-bold text-sm bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 text-amber-950">
                    <span>🪙</span>
                    <span>{reward.cost} 金币</span>
                  </div>
                </div>

                {/* Card Main: Icon + Title + Description */}
                <div className="flex items-start gap-3.5 mt-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-2xl shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                    {reward.icon}
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-base text-onSurface leading-snug">
                      {reward.title}
                    </h3>
                    <p className="text-xs text-onSurface-variant font-medium mt-1 leading-relaxed">
                      {reward.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer: Stock & Redeem Button */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-500 font-medium">
                  {canAfford ? (
                    <span className="text-emerald-700 font-bold">✓ 余额充足可兑换</span>
                  ) : (
                    <span className="text-rose-600">差 {reward.cost - currentChild.coins} 金币</span>
                  )}
                  {reward.unlimited ? ' · 无限量' : ` · 剩余库存：${reward.stock}张`}
                </span>

                <button
                  onClick={() => handleRedeem(reward)}
                  disabled={!canAfford}
                  className={`px-4 py-1.5 rounded-xl text-xs font-headline font-bold transition-all btn-squishy ${
                    canAfford
                      ? 'btn-squishy-primary'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  立即兑换
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom 2 Columns: Child Wish Submission Station & Redeemed Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        {/* Left Column: 孩子自主心愿发起台 */}
        <div className="neo-card p-6 bg-gradient-to-br from-amber-50/50 to-white flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-neo-secondary">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-base text-onSurface">
                    孩子自主心愿发起台
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">Wish Submission Station</p>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 bg-blue-100 text-blue-900 rounded-md">
                民主协商 · 家长24h内心愿审批
              </span>
            </div>

            {/* Tip Banner */}
            <div className="p-3 bg-amber-100/70 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium mt-4 flex items-start gap-2">
              <span className="text-base">💡</span>
              <p>
                有什么特别想要的心愿吗？写下来告诉爸爸妈妈，只要合理，通过家长审核后就会化身为心愿卡，正式上架到兑换屋哦！
              </p>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleCustomWishSubmit} className="space-y-3.5 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  心愿名称及详情
                </label>
                <input
                  type="text"
                  required
                  value={customWishTitle}
                  onChange={(e) => setCustomWishTitle(e.target.value)}
                  placeholder="如：看一场新上映的科幻电影 / 想要一副专业羽毛球拍"
                  className="w-full px-3 py-2 text-xs font-body border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  期望金币标价
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="10"
                    max="500"
                    value={customWishCost}
                    onChange={(e) => setCustomWishCost(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-body border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white shadow-sm pr-14"
                  />
                  <span className="absolute right-3 top-2 text-xs font-bold text-amber-700 flex items-center gap-1">
                    <span>🪙</span>
                    <span>枚</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500 font-medium">
                  {currentChild.name}本学期已成功上架过 {currentChild.submittedWishes.filter(w => w.status === 'approved').length} 个自创心愿
                </span>
                <button
                  type="submit"
                  className="px-5 py-2 btn-squishy-secondary text-xs font-headline font-bold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>提交心愿申请</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: 已兑战利品与核销 */}
        <div className="neo-card p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold text-lg">
                  🎟️
                </div>
                <div>
                  <h3 className="font-headline font-bold text-base text-onSurface">
                    已兑战利品与核销
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">Redemption Ledger</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md">
                共 {readyLedgerCount} 张待使用
              </span>
            </div>

            {/* Ledger Items */}
            <div className="divide-y divide-slate-100 mt-3 space-y-1">
              {currentChild.redeemedLedger.map((item) => {
                const isCompleted = item.status === 'completed';
                return (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-low border border-slate-200/90 flex items-center justify-center text-xl shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className={`font-headline font-bold text-sm ${isCompleted ? 'text-slate-400 line-through' : 'text-onSurface'}`}>
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          {item.time}
                        </p>
                      </div>
                    </div>

                    <div>
                      {isCompleted ? (
                        <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>已完成</span>
                        </span>
                      ) : (
                        <button
                          onClick={async () => {
                            const confirmed = await showConfirm({
                              title: '核销心愿卡券',
                              message: `向家长核销并享用「${item.title}」吗？`,
                              subMessage: '核销后卡券状态将变更为「已完成」，快去开心享用您的专属特权吧！',
                              type: 'success',
                              confirmText: '确认核销',
                              cancelText: '取消'
                            });
                            if (confirmed) {
                              sounds.playStamp();
                              onVerifyLedgerItem(item.id);
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-headline text-xs font-bold flex items-center gap-1 shadow-neo-secondary btn-squishy"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>{item.statusText || '待核销'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>已累计兑换并享用 14 项心愿好礼</span>
            <button 
              onClick={() => {
                showAlert({
                  title: '心愿手账归档',
                  message: '您的所有历史兑换手账记录均已妥善归档与云端加密保存！',
                  type: 'info',
                  confirmText: '太棒了'
                });
              }}
              className="text-primary hover:underline font-bold flex items-center gap-0.5"
            >
              <span>查看完整手账</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
