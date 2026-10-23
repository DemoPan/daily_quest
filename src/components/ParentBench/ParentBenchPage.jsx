import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Stamp, 
  Sparkles, 
  Coins, 
  Award, 
  ThumbsUp, 
  MessageCircle, 
  Clock, 
  Check, 
  X, 
  PlusCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/sound';
import { useDialog } from '../../context/DialogContext';

export default function ParentBenchPage({
  currentChild,
  onBatchVerifyAll,
  onVerifyTask,
  onApproveWish,
  onRejectWish,
  onGrantBonusCoins,
  isParentMode
}) {
  const { showAlert, showConfirm } = useDialog();
  const [bonusReason, setBonusReason] = useState('主动订正错题，书写极其端正！');
  const [bonusAmount, setBonusAmount] = useState(10);
  const [parentComment, setParentComment] = useState('今天作业专注高效，完全没有催促，特别棒！继续保持！');

  // Collect pending tasks (completed by child but not yet stamped)
  const pendingVerificationTasks = [];
  currentChild.subjects.forEach(subject => {
    subject.tasks.forEach(task => {
      if (task.completed && !task.verified) {
        pendingVerificationTasks.push({ subjectId: subject.id, subjectName: subject.name, ...task });
      }
    });
  });

  const handleBatchVerify = async () => {
    if (pendingVerificationTasks.length === 0) {
      await showAlert({
        title: '全部核验完毕',
        message: '今晚所有搞定的作业都已经核验过啦！',
        subMessage: '暂无待核验的打卡项目，孩子今天表现很棒！',
        type: 'info',
        confirmText: '太棒了'
      });
      return;
    }

    sounds.playStamp();
    setTimeout(() => {
      sounds.playFanfare();
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
    }, 200);

    onBatchVerifyAll();
    await showAlert({
      title: '晚间批量核验完成',
      message: `已为 ${pendingVerificationTasks.length} 项作业盖上金色火漆印章，并掉落对应金币！`,
      subMessage: '成长印章与金币已即时同步至孩子账户，可在宝藏屋随时查阅与兑换！',
      type: 'success',
      confirmText: '太棒了',
      confetti: true
    });
  };

  const handleBonusSubmit = async (e) => {
    e.preventDefault();
    const amount = parseInt(bonusAmount, 10) || 10;
    sounds.playCoin();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    onGrantBonusCoins(amount, bonusReason);
    await showAlert({
      title: '鼓励金币发放成功',
      message: `已为 ${currentChild.name} 额外发放 +${amount} 🪙 奖励金币！`,
      subMessage: `表扬理由：「${bonusReason}」`,
      type: 'coin',
      confirmText: '好的'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="neo-card p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-0.5 rounded-full border border-white/20">
              晚间 8:30 极速核验台
            </span>
            <span className="text-xs text-amber-100 font-medium">
              协同正向激励 · 避免催促内耗
            </span>
          </div>

          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-2">
            <span>家长专属核验与审批工作台</span>
            <ShieldCheck className="w-7 h-7" />
          </h1>

          <p className="text-xs sm:text-sm text-amber-100 max-w-2xl font-medium">
            建立明确规则：孩子放学自主搞定 ➔ 晚间8:30家长极速查验盖章 ➔ 掉落金币兑换心愿契约！
          </p>
        </div>

        {/* Batch Verify Button */}
        <div className="w-full md:w-auto">
          <button
            onClick={handleBatchVerify}
            disabled={pendingVerificationTasks.length === 0}
            className={`w-full md:w-auto px-6 py-3.5 rounded-2xl font-headline font-bold text-sm shadow-neo-secondary flex items-center justify-center gap-2 transition-all btn-squishy ${
              pendingVerificationTasks.length > 0
                ? 'bg-white hover:bg-amber-50 text-amber-950 active:translate-y-1'
                : 'bg-white/40 text-white/60 cursor-not-allowed shadow-none'
            }`}
          >
            <Stamp className="w-5 h-5 text-amber-600" />
            <span>
              {pendingVerificationTasks.length > 0
                ? `一键全科盖印验收 (${pendingVerificationTasks.length} 项待签)`
                : '今晚作业已全部核验 ✓'}
            </span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: 待签印作业列表 */}
        <div className="neo-card p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold text-lg">
                  📑
                </div>
                <div>
                  <h3 className="font-headline font-bold text-base text-onSurface">
                    今晚待家长查验条目
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {pendingVerificationTasks.length} 项已由孩子勾选「搞定」，等待盖印
                  </p>
                </div>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                pendingVerificationTasks.length > 0 ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {pendingVerificationTasks.length > 0 ? '待签印' : '已全部查验'}
              </span>
            </div>

            {/* List */}
            <div className="divide-y divide-slate-100 mt-2">
              {pendingVerificationTasks.length === 0 ? (
                <div className="py-8 text-center space-y-2">
                  <div className="text-4xl">🎉</div>
                  <p className="font-headline font-bold text-sm text-slate-700">
                    太棒了！今晚没有待核验的遗留作业
                  </p>
                  <p className="text-xs text-slate-400">
                    大宝已全部获得家长签印，金币已自动计入账户！
                  </p>
                </div>
              ) : (
                pendingVerificationTasks.map((task) => (
                  <div key={task.id} className="py-3 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-headline font-bold text-sm text-onSurface">
                          {task.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                          {task.subjectName.slice(0, 2)}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          task.type === 'home' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {task.type === 'home' ? '回家' : '课堂'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                        要求: {task.requirement} · ⏱️ {task.estimatedMinutes}m
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        sounds.playStamp();
                        onVerifyTask(task.subjectId, task.id);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-headline font-bold text-xs shadow-neo-secondary btn-squishy flex items-center gap-1 shrink-0"
                    >
                      <Stamp className="w-3.5 h-3.5" />
                      <span>盖章核验</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Evening Praise Comment Box */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5 text-primary" />
              <span>家长今日评语与鼓励寄语 (将同步打印于报告单)</span>
            </label>
            <textarea
              rows="2"
              value={parentComment}
              onChange={(e) => setParentComment(e.target.value)}
              className="w-full text-xs font-body p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Right Column: 孩子心愿审批台 + 表现优异鼓励金币 */}
        <div className="space-y-6">
          {/* Child Wish Approval Station */}
          <div className="neo-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-lg">
                  🎁
                </div>
                <div>
                  <h3 className="font-headline font-bold text-base text-onSurface">
                    孩子自主心愿审批台
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    来自孩子发起的心愿申请，家长可同意上架或协商价格
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-100 space-y-2">
              {currentChild.submittedWishes.length === 0 ? (
                <div className="py-4 text-center text-xs text-slate-400">
                  暂无待审批的新心愿申请
                </div>
              ) : (
                currentChild.submittedWishes.map((wish) => (
                  <div key={wish.id} className="pt-2 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-headline font-bold text-sm text-onSurface">
                          {wish.title}
                        </span>
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          标价 {wish.cost} 🪙
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        提交时间：{wish.submitTime} · 状态：{wish.status === 'approved' ? '已上架' : '待家长审批'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {wish.status === 'approved' ? (
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>已上架</span>
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={async () => {
                              sounds.playCoin();
                              onApproveWish(wish);
                              await showAlert({
                                title: '心愿已批准上架',
                                message: `「${wish.title}」已正式在宝藏货架上架！`,
                                subMessage: `标价 ${wish.cost} 🪙，孩子完成每日作业赚足金币后即可兑换！`,
                                type: 'success',
                                confirmText: '好的'
                              });
                            }}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm flex items-center gap-1 btn-squishy"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>同意上架</span>
                          </button>
                          <button
                            onClick={async () => {
                              const confirmed = await showConfirm({
                                title: '退回心愿申请',
                                message: `确定要退回「${wish.title}」的心愿申请吗？`,
                                subMessage: '退回后该心愿将从审核台移除，建议与孩子沟通后重新提交。',
                                type: 'warning',
                                confirmText: '确认退回',
                                cancelText: '取消',
                                danger: true
                              });
                              if (confirmed) {
                                sounds.playClick();
                                onRejectWish(wish.id);
                              }
                            }}
                            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-600 text-xs font-bold transition-colors btn-squishy"
                            title="退回申请"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Bonus Coins Station */}
          <div className="neo-card p-6 space-y-4 bg-gradient-to-br from-amber-50/40 to-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-white flex items-center justify-center font-bold text-lg shadow-neo-secondary">
                  ⭐
                </div>
                <div>
                  <h3 className="font-headline font-bold text-base text-onSurface">
                    表现优异 · 颁发额外奖励金币
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    对于主动性、专注度或好习惯进行即时正向强化！
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleBonusSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  表扬原因 / 优良表现
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {[
                    '主动整理书桌与书包',
                    '遇到难题耐心思考不放弃',
                    '专注学习 30 分钟未走神',
                    '字体极其工整美观'
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setBonusReason(preset)}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 transition-colors border border-slate-200"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  required
                  value={bonusReason}
                  onChange={(e) => setBonusReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white shadow-sm"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  {[5, 10, 20, 30].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setBonusAmount(amt)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        bonusAmount === amt
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      +{amt} 🪙
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 btn-squishy-secondary text-xs font-headline font-bold flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>立即颁发金币</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
