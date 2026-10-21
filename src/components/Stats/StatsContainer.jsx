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
  const childStats = statsData[currentChild.id] || statsData.dabao;

  const handleSelectDay = (day) => {
    setSelectedDay(day);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedDay(null);
  };

  if (viewMode === 'detail' && selectedDay) {
    return (
      <DailyQuestDetailPage
        currentChild={currentChild}
        dayData={selectedDay}
        onBack={handleBackToList}
        onOpenPrint={onOpenPrint}
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
