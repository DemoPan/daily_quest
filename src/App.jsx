import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DailyQuestPage from './components/DailyQuest/DailyQuestPage';
import TreasureShopPage from './components/TreasureShop/TreasureShopPage';
import KnowledgeMapPage from './components/KnowledgeMap/KnowledgeMapPage';
import ParentBenchPage from './components/ParentBench/ParentBenchPage';
import StatsContainer from './components/Stats/StatsContainer';
import FocusTimerModal from './components/FocusTimer/FocusTimerModal';
import PrintModal from './components/Print/PrintModal';
import { initialChildrenData } from './data/defaultData';
import { sounds } from './utils/sound';
import { api } from './services/api';

const STORAGE_KEY = 'kids_quest_v2_data';

export default function App() {
  // Load data from LocalStorage or initialize with seed data
  const [childrenData, setChildrenData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse localStorage data', e);
    }
    return initialChildrenData;
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
          setChildrenData(remoteData);
          setCloudSyncStatus('synced');
          localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteData));
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

  // 2. 数据变动时：即时保存 LocalStorage + 防抖同步至云端 MongoDB
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(childrenData));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }

    if (!childrenData || Object.keys(childrenData).length === 0) return;

    const timer = setTimeout(async () => {
      try {
        setCloudSyncStatus('syncing');
        await api.syncAll(childrenData);
        setCloudSyncStatus('synced');
      } catch (err) {
        console.warn('⚠️ [Cloud] 异步保存至云端失败:', err.message);
        setCloudSyncStatus('offline');
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [childrenData]);

  // 手动刷新云端数据
  const handleManualSync = async () => {
    try {
      setCloudSyncStatus('syncing');
      const remoteData = await api.getChildren();
      if (remoteData && Object.keys(remoteData).length > 0) {
        setChildrenData(remoteData);
        setCloudSyncStatus('synced');
        sounds.playSuccess();
      }
    } catch (err) {
      console.warn('⚠️ [Cloud] 刷新失败:', err.message);
      setCloudSyncStatus('offline');
    }
  };

  const currentChild = childrenData[currentChildId] || childrenData.dabao;

  // Helper to update current child's state
  const updateCurrentChild = (updater) => {
    setChildrenData((prev) => {
      const child = prev[currentChildId];
      const updatedChild = updater({ ...child });
      return {
        ...prev,
        [currentChildId]: updatedChild
      };
    });
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
            onOpenTimerForTask={(title, mins) => {
              setTimerTaskTitle(title);
              setTimerMinutes(mins || 15);
              setIsTimerOpen(true);
            }}
            onOpenPrint={() => {
              setPrintDocType('daily');
              setIsPrintOpen(true);
            }}
            isParentMode={isParentMode}
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
      <FocusTimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
        initialTaskTitle={timerTaskTitle}
        initialMinutes={timerMinutes}
        onCompleteFocus={handleCompleteFocus}
      />

      {/* A4 Print Modal */}
      <PrintModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        currentChild={currentChild}
        initialDocType={printDocType}
      />

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
