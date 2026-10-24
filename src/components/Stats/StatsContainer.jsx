import React, { useState } from 'react';
import DailyStatsListPage from './DailyStatsListPage';
import DailyQuestDetailPage from './DailyQuestDetailPage';
import { statsData } from './mockStatsData';

export default function StatsContainer({ 
  currentChild, 
  onOpenPrint 
}) {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'detail'
  const [selectedDay, setSelectedDay] = useState(null);

  // 获取当前孩子（大宝或二宝）的统计数据
  const childStats = statsData[currentChild?.id] || statsData.dabao;

  const handleSelectDay = (day) => {
    setSelectedDay(day);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedDay(null);
  };

  const daysList = childStats.historyDays || [];
  const currentIndex = selectedDay ? daysList.findIndex((d) => d.id === selectedDay.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < daysList.length - 1;

  const handlePrevDay = () => {
    if (currentIndex > 0) {
      setSelectedDay(daysList[currentIndex - 1]);
    }
  };

  const handleNextDay = () => {
    if (currentIndex >= 0 && currentIndex < daysList.length - 1) {
      setSelectedDay(daysList[currentIndex + 1]);
    }
  };

  if (viewMode === 'detail' && selectedDay) {
    return (
      <DailyQuestDetailPage
        currentChild={currentChild}
        dayData={selectedDay}
        onBack={handleBackToList}
        onOpenPrint={onOpenPrint}
        onPrevDay={handlePrevDay}
        onNextDay={handleNextDay}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    );
  }

  return (
    <DailyStatsListPage
      currentChild={currentChild}
      stats={childStats}
      onSelectDay={handleSelectDay}
      onOpenPrint={onOpenPrint}
    />
  );
}
