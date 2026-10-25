import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DailyQuestPage from './components/DailyQuest/DailyQuestPage';
import TreasureShopPage from './components/TreasureShop/TreasureShopPage';
import KnowledgeMapPage from './components/KnowledgeMap/KnowledgeMapPage';
import ParentBenchPage from './components/ParentBench/ParentBenchPage';
import StatsContainer from './components/Stats/StatsContainer';
import QuickHomeworkPage from './components/QuickInput/QuickHomeworkPage';
import FocusTimerModal from './components/FocusTimer/FocusTimerModal';
import PrintModal from './components/Print/PrintModal';
import { initialChildrenData } from './data/defaultData';
import { sounds } from './utils/sound';
import { api } from './services/api';

const STORAGE_KEY = 'kids_quest_v3_data';

// 获取今日标准日期 key (YYYY-MM-DD)
export const getTodayDateKey = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 每日自动重置与数据清洗：确保每天开始都是崭新的 17 项全科默认作业，打卡与核验全部重置为未完成
export const sanitizeDailyData = (dataMap) => {
  if (!dataMap || typeof dataMap !== 'object') return initialChildrenData;
  const todayKey = getTodayDateKey();
  const result = { ...dataMap };

  const childIds = ['dabao', 'erbao'];
  for (const childId of childIds) {
    const defaultChild = initialChildrenData[childId] || initialChildrenData.dabao;
    const current = result[childId] ? { ...result[childId] } : { ...defaultChild };

    const isNewDay = current.lastActiveDate !== todayKey;

    if (isNewDay) {
      // 跨天或首次加载旧缓存数据：自动重置为今日全新标准作业清单，打卡与核验重置为 false，今日能量归零
      result[childId] = {
        ...current,
        lastActiveDate: todayKey,
        todayEnergyXP: 0,
        subjects: defaultChild.subjects.map((sub) => ({
          ...sub,
          tasks: sub.tasks.map((task) => ({
            ...task,
            completed: false,
            verified: false,
            verifiedTime: null
          }))
        }))
      };
    } else {
      // 同一天：如果科目缺失则补齐默认科目
      if (!current.subjects || current.subjects.length === 0) {
        current.subjects = defaultChild.subjects.map((sub) => ({
          ...sub,
          tasks: sub.tasks.map((task) => ({
            ...task,
            completed: false,
            verified: false,
            verifiedTime: null
          }))
        }));
      }
      result[childId] = current;
    }
  }

  return result;
};

export default function App() {
  // Load data from LocalStorage or initialize with seed data
  const [childrenData, setChildrenData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('kids_quest_v2_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        return sanitizeDailyData(parsed);
      }
    } catch (e) {
      console.error('Failed to parse localStorage data', e);
    }
    return sanitizeDailyData(initialChildrenData);
  });

  const [currentChildId, setCurrentChildId] = useState('dabao');
  const [activeTab, setActiveTab] = useState('daily'); // 'daily', 'shop', 'map', 'parent'
  const [isParentMode, setIsParentMode] = useState(false);
  const [cloudSyncStatus, setCloudSyncStatus] = useState('syncing'); // 'synced' | 'syncing' | 'offline'

  // Focus Timer Modal State
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [timerTaskTitle, setTimerTaskTitle] = useState('');
  const [timerMinutes, setTimerMinutes] = useState(25);

  // Print Modal State
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [printDocType, setPrintDocType] = useState('daily');

  // 1. 初次加载：优先拉取 MongoDB Atlas 云端最新数据
  useEffect(() => {
    let isMounted = true;
    async function initCloudData() {
      try {
        setCloudSyncStatus('syncing');
        const remoteData = await api.getChildren();
        if (isMounted && remoteData && Object.keys(remoteData).length > 0) {
          const todayKey = getTodayDateKey();

          // 读取当前本地可能已保存的最新编辑数据
          let localData = null;
          try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) localData = JSON.parse(saved);
          } catch (e) {}

          // 核心保护机制：如果用户今天在本地修改过作业（带今日日期），而云端尚未更新今日日期或数据较旧，
          // 绝不能盲目用云端覆盖本地今日修改！优先保留本地今日作业内容并同步回云端。
          const mergedData = { ...remoteData };
          let needPushToCloud = false;

          for (const childId of ['dabao', 'erbao']) {
            const localChild = localData?.[childId];
            const remoteChild = remoteData[childId];

            if (localChild && localChild.lastActiveDate === todayKey) {
              if (!remoteChild || remoteChild.lastActiveDate !== todayKey) {
                mergedData[childId] = localChild;
                needPushToCloud = true;
              }
            }
          }

          const sanitized = sanitizeDailyData(mergedData);
          setChildrenData(sanitized);
          setCloudSyncStatus('synced');
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));

          // 若本地包含更新的今日编辑内容，立刻同步至云端补齐
          if (needPushToCloud) {
            api.syncAll(sanitized).catch(() => {});
          }
        } else if (isMounted) {
          setCloudSyncStatus('synced');
        }
      } catch (err) {
        console.warn('⚠️ [Cloud] 无法连接云端数据库，自动降级为本地离线模式:', err.message);
        if (isMounted) setCloudSyncStatus('offline');
      }
    }
    initCloudData();
    return () => { isMounted = false; };
  }, []);

  // 2. 数据变动时：即时保存 LocalStorage + 静默防抖同步至云端 MongoDB (避免频繁状态抖动触发整页重绘)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(childrenData));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }

    if (!childrenData || Object.keys(childrenData).length === 0) return;

    const timer = setTimeout(async () => {
      try {
        await api.syncAll(childrenData);
        setCloudSyncStatus((prev) => (prev !== 'synced' ? 'synced' : prev));
      } catch (err) {
        console.warn('⚠️ [Cloud] 异步保存至云端失败:', err.message);
        setCloudSyncStatus((prev) => (prev !== 'offline' ? 'offline' : prev));
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [childrenData]);

  // 手动刷新云端数据
  const handleManualSync = async () => {
    try {
      setCloudSyncStatus('syncing');
      const remoteData = await api.getChildren();
      if (remoteData && Object.keys(remoteData).length > 0) {
        const todayKey = getTodayDateKey();
        let localData = null;
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) localData = JSON.parse(saved);
        } catch (e) {}

        const mergedData = { ...remoteData };
        for (const childId of ['dabao', 'erbao']) {
          const localChild = localData?.[childId];
          const remoteChild = remoteData[childId];
          if (localChild && localChild.lastActiveDate === todayKey) {
            if (!remoteChild || remoteChild.lastActiveDate !== todayKey) {
              mergedData[childId] = localChild;
            }
          }
        }

        const sanitized = sanitizeDailyData(mergedData);
        setChildrenData(sanitized);
        setCloudSyncStatus('synced');
        sounds.playSuccess();
      }
    } catch (err) {
      console.warn('⚠️ [Cloud] 刷新失败:', err.message);
      setCloudSyncStatus('offline');
    }
  };

  const currentChild = childrenData[currentChildId] || childrenData.dabao;

  // Helper to update current child's state (确保任何内容改动都打上今日标准日期戳)
  const updateCurrentChild = (updater) => {
    setChildrenData((prev) => {
      const child = prev[currentChildId];
      const updatedChild = updater({ ...child });
      return {
        ...prev,
        [currentChildId]: {
          ...updatedChild,
          lastActiveDate: getTodayDateKey()
        }
      };
    });
  };

  // 一键重置今日作业：恢复今日全部标准默认作业，打卡与核验全部置为未完成
  const handleResetTodayTasks = () => {
    updateCurrentChild((child) => {
      const defaultChild = initialChildrenData[currentChildId] || initialChildrenData.dabao;
      return {
        ...child,
        todayEnergyXP: 0,
        lastActiveDate: getTodayDateKey(),
        subjects: defaultChild.subjects.map((sub) => ({
          ...sub,
          tasks: sub.tasks.map((task) => ({
            ...task,
            completed: false,
            verified: false,
            verifiedTime: null
          }))
        }))
      };
    });
    sounds.playSuccess();
  };

  // Task Completion Toggle (Child action)
  const handleToggleTaskComplete = (subjectId, taskId) => {
    updateCurrentChild((child) => {
      let isNowCompleted = false;
      const newSubjects = child.subjects.map((sub) => {
        if (sub.id !== subjectId) return sub;
        const newTasks = sub.tasks.map((task) => {
          if (task.id !== taskId) return task;
          isNowCompleted = !task.completed;
          return {
            ...task,
            completed: isNowCompleted
          };
        });
        return { ...sub, tasks: newTasks };
      });

      // Update XP
      const deltaXP = isNowCompleted ? 10 : -10;
      const newEnergy = Math.max(0, Math.min(100, (child.todayEnergyXP || 70) + deltaXP));

      return {
        ...child,
        subjects: newSubjects,
        todayEnergyXP: newEnergy
      };
    });
  };

  // Task Parent Verification Stamp (Parent action)
  const handleVerifyTask = (subjectId, taskId) => {
    updateCurrentChild((child) => {
      let addedCoins = 0;
      let newVerifiedState = false;

      const newSubjects = child.subjects.map((sub) => {
        if (sub.id !== subjectId) return sub;
        const newTasks = sub.tasks.map((task) => {
          if (task.id !== taskId) return task;
          newVerifiedState = !task.verified;
          addedCoins = newVerifiedState ? (task.coins || 5) : -(task.coins || 5);

          const now = new Date();
          const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

          return {
            ...task,
            verified: newVerifiedState,
            verifiedTime: newVerifiedState ? timeStr : null
          };
        });
        return { ...sub, tasks: newTasks };
      });

      const newCoins = Math.max(0, child.coins + addedCoins);
      const newTotal = newVerifiedState ? child.totalCoins + addedCoins : child.totalCoins;
      const newStamps = newVerifiedState ? child.stampsCount + 1 : Math.max(0, child.stampsCount - 1);

      return {
        ...child,
        subjects: newSubjects,
        coins: newCoins,
        totalCoins: newTotal,
        stampsCount: newStamps
      };
    });
  };

  // Batch Verify All Done Tasks (Parent Bench CTA)
  const handleBatchVerifyAll = () => {
    updateCurrentChild((child) => {
      let totalAddedCoins = 0;
      let newStampsAdded = 0;

      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const newSubjects = child.subjects.map((sub) => {
        const newTasks = sub.tasks.map((task) => {
          if (task.completed && !task.verified) {
            totalAddedCoins += (task.coins || 5);
            newStampsAdded++;
            return {
              ...task,
              verified: true,
              verifiedTime: timeStr
            };
          }
          return task;
        });
        return { ...sub, tasks: newTasks };
      });

      return {
        ...child,
        subjects: newSubjects,
        coins: child.coins + totalAddedCoins,
        totalCoins: child.totalCoins + totalAddedCoins,
        stampsCount: child.stampsCount + newStampsAdded,
        passedRate: 98.5
      };
    });
  };

  // Delete Task
  const handleDeleteTask = (subjectId, taskId) => {
    updateCurrentChild((child) => {
      const newSubjects = child.subjects.map((sub) => {
        if (sub.id !== subjectId) return sub;
        return {
          ...sub,
          tasks: sub.tasks.filter((t) => t.id !== taskId)
        };
      });
      return {
        ...child,
        subjects: newSubjects
      };
    });
  };

  // Add Task
  const handleAddTask = (subjectId, taskData) => {
    updateCurrentChild((child) => {
      const newSubjects = child.subjects.map((sub) => {
        if (sub.id !== subjectId) return sub;
        const newTask = {
          id: `task_${Date.now()}`,
          ...taskData
        };
        return {
          ...sub,
          tasks: [...sub.tasks, newTask]
        };
      });
      return {
        ...child,
        subjects: newSubjects
      };
    });
  };

  // Update Task Requirement Text
  const handleUpdateTaskRequirement = (subjectId, taskId, newRequirement) => {
    updateCurrentChild((child) => {
      const newSubjects = child.subjects.map((sub) => {
        if (sub.id !== subjectId) return sub;
        const newTasks = sub.tasks.map((t) => {
          if (t.id !== taskId) return t;
          return { ...t, requirement: newRequirement };
        });
        return { ...sub, tasks: newTasks };
      });
      return {
        ...child,
        subjects: newSubjects
      };
    });
  };

  // Redeem Reward in Shop
  const handleRedeemReward = (reward) => {
    updateCurrentChild((child) => {
      const newCoins = child.coins - reward.cost;
      const newLedgerItem = {
        id: `rl_${Date.now()}`,
        title: reward.title,
        icon: reward.icon || '🎁',
        cost: reward.cost,
        time: '刚刚兑换 · 待核销',
        status: 'ready_verify',
        statusText: '待核销'
      };

      // Decrease stock if limited
      const newRewards = child.rewards.map((r) => {
        if (r.id === reward.id && !r.unlimited) {
          return { ...r, stock: Math.max(0, r.stock - 1) };
        }
        return r;
      });

      return {
        ...child,
        coins: newCoins,
        rewards: newRewards,
        redeemedLedger: [newLedgerItem, ...child.redeemedLedger]
      };
    });
  };

  // Submit Custom Child Wish
  const handleSubmitWish = (wishData) => {
    updateCurrentChild((child) => {
      const newWish = {
        id: `wish_${Date.now()}`,
        ...wishData
      };
      return {
        ...child,
        submittedWishes: [newWish, ...child.submittedWishes]
      };
    });
  };

  // Approve Custom Wish (Parent Bench)
  const handleApproveWish = (wish) => {
    updateCurrentChild((child) => {
      // Mark wish approved
      const updatedWishes = child.submittedWishes.map((w) => {
        if (w.id === wish.id) return { ...w, status: 'approved' };
        return w;
      });

      // Add to rewards shelf
      const newReward = {
        id: `reward_from_wish_${Date.now()}`,
        title: wish.title,
        tag: '孩子自创',
        category: 'privilege',
        icon: '✨',
        cost: wish.cost,
        desc: '通过家庭民主协商与家长审核上架的专属心愿好礼！',
        stock: 1,
        unlimited: false,
        statusText: '家长已批准上架'
      };

      return {
        ...child,
        submittedWishes: updatedWishes,
        rewards: [newReward, ...child.rewards]
      };
    });
  };

  // Reject Wish (Parent Bench)
  const handleRejectWish = (wishId) => {
    updateCurrentChild((child) => {
      return {
        ...child,
        submittedWishes: child.submittedWishes.filter((w) => w.id !== wishId)
      };
    });
  };

  // Verify Redeemed Voucher in Ledger
  const handleVerifyLedgerItem = (itemId) => {
    updateCurrentChild((child) => {
      const updatedLedger = child.redeemedLedger.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            status: 'completed',
            statusText: '已完成'
          };
        }
        return item;
      });
      return {
        ...child,
        redeemedLedger: updatedLedger
      };
    });
  };

  // Grant Bonus Coins (Parent Bench)
  const handleGrantBonusCoins = (amount, reason) => {
    updateCurrentChild((child) => {
      return {
        ...child,
        coins: child.coins + amount,
        totalCoins: child.totalCoins + amount
      };
    });
  };

  // Focus Timer Finished
  const handleCompleteFocus = (taskTitle, minutes) => {
    updateCurrentChild((child) => {
      return {
        ...child,
        todayEnergyXP: Math.min(100, (child.todayEnergyXP || 70) + 15),
        coins: child.coins + 5,
        totalCoins: child.totalCoins + 5
      };
    });
  };

  // 智能作业速录舱：一键分发并自动归位到各关卡
  const handleConfirmDispatchQuickTasks = (extractedItems) => {
    updateCurrentChild((child) => {
      const newSubjects = child.subjects.map((subj) => {
        const matchingItems = extractedItems.filter((item) => {
          if (subj.id === 'chinese' && item.subject === 'chinese') return true;
          if (subj.id === 'math' && item.subject.startsWith('math')) return true;
          if (subj.id === 'english' && item.subject === 'english') return true;
          if (subj.id === 'general' && item.subject === 'general') return true;
          if (subj.id === 'extra' && item.subject === 'extra') return true;
          return false;
        });

        if (matchingItems.length === 0) return subj;

        const newTasksToAdd = matchingItems.map((item, idx) => ({
          id: `task_ai_${Date.now()}_${idx}`,
          title: item.title,
          type: item.scenario || 'home',
          requirement: item.originalText || item.title,
          estimatedMinutes: item.estimatedMinutes || 15,
          completed: item.isSchoolCompleted || false,
          verified: false,
          verifiedTime: null,
          xp: item.xp || 15,
          coins: Math.max(3, Math.round((item.estimatedMinutes || 15) / 3))
        }));

        return {
          ...subj,
          tasks: [...subj.tasks, ...newTasksToAdd]
        };
      });

      return {
        ...child,
        subjects: newSubjects
      };
    });

    setActiveTab('daily');
  };

  return (
    <div className="min-h-screen bg-brandBg text-onSurface flex flex-col font-body selection:bg-secondary-fixed selection:text-secondary-dark">
      {/* Global Navigation Header */}
      <Header
        childrenData={childrenData}
        currentChildId={currentChildId}
        onSwitchChild={setCurrentChildId}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        cloudSyncStatus={cloudSyncStatus}
        onManualSync={handleManualSync}
        onOpenTimer={() => {
          setTimerTaskTitle('自主专注关卡');
          setTimerMinutes(25);
          setIsTimerOpen(true);
        }}
        onOpenPrint={() => {
          setPrintDocType(activeTab === 'map' ? 'weekly' : 'daily');
          setIsPrintOpen(true);
        }}
        isParentMode={isParentMode}
        onToggleParentMode={() => setIsParentMode(!isParentMode)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'daily' && (
          <DailyQuestPage
            currentChild={currentChild}
            onToggleTaskComplete={handleToggleTaskComplete}
            onVerifyTask={handleVerifyTask}
            onDeleteTask={handleDeleteTask}
            onAddTask={handleAddTask}
            onUpdateTaskRequirement={handleUpdateTaskRequirement}
            onResetTodayTasks={handleResetTodayTasks}
            onOpenTimerForTask={(title, mins) => {
              setTimerTaskTitle(title);
              setTimerMinutes(mins || 15);
              setIsTimerOpen(true);
            }}
            onOpenPrint={() => {
              setPrintDocType('daily');
              setIsPrintOpen(true);
            }}
            onOpenQuickInput={() => setActiveTab('quick')}
            isParentMode={isParentMode}
          />
        )}

        {activeTab === 'quick' && (
          <QuickHomeworkPage
            currentChild={currentChild}
            onSwitchChild={setCurrentChildId}
            onBack={() => setActiveTab('daily')}
            onConfirmDispatch={handleConfirmDispatchQuickTasks}
          />
        )}

        {activeTab === 'stats' && (
          <StatsContainer
            currentChild={currentChild}
            onOpenPrint={() => {
              setPrintDocType('weekly');
              setIsPrintOpen(true);
            }}
          />
        )}

        {activeTab === 'shop' && (
          <TreasureShopPage
            currentChild={currentChild}
            onRedeemReward={handleRedeemReward}
            onSubmitWish={handleSubmitWish}
            onVerifyLedgerItem={handleVerifyLedgerItem}
            isParentMode={isParentMode}
          />
        )}

        {activeTab === 'map' && (
          <KnowledgeMapPage
            currentChild={currentChild}
            onOpenWeeklyReport={() => {
              setPrintDocType('weekly');
              setIsPrintOpen(true);
            }}
          />
        )}

        {activeTab === 'parent' && (
          <ParentBenchPage
            currentChild={currentChild}
            onBatchVerifyAll={handleBatchVerifyAll}
            onVerifyTask={handleVerifyTask}
            onApproveWish={handleApproveWish}
            onRejectWish={handleRejectWish}
            onGrantBonusCoins={handleGrantBonusCoins}
            isParentMode={isParentMode}
          />
        )}
      </main>

      {/* Focus Timer Modal */}
      {isTimerOpen && (
        <FocusTimerModal
          isOpen={isTimerOpen}
          onClose={() => setIsTimerOpen(false)}
          initialTaskTitle={timerTaskTitle}
          initialMinutes={timerMinutes}
          onCompleteFocus={handleCompleteFocus}
        />
      )}

      {/* A4 Print Modal */}
      {isPrintOpen && (
        <PrintModal
          isOpen={isPrintOpen}
          onClose={() => setIsPrintOpen(false)}
          currentChild={currentChild}
          initialDocType={printDocType}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-surface/80 py-4 text-center text-xs text-slate-500 font-medium no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>探险学堂 Kids Quest · 智慧岛航海记 · 培养主动探险精神与良好家庭协同习惯</span>
          <span>© 2026 Kids Quest Adventure System</span>
        </div>
      </footer>
    </div>
  );
}
