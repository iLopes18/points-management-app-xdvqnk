
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, User, Category, Reward, HistoryEntry } from '../types';
import { initialData } from '../data/initialData';

interface AppContextType {
  users: User[];
  categories: Category[];
  rewards: Reward[];
  history: HistoryEntry[];
  totalPoints: number;
  addPoints: (userId: string, points: number, taskName: string, categoryName: string) => void;
  redeemReward: (userId: string, rewardId: string) => boolean;
  resetPoints: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>(initialData);

  const addPoints = (userId: string, points: number, taskName: string, categoryName: string) => {
    console.log(`Adding ${points} points to user ${userId} for task: ${taskName}`);
    
    const user = appState.users.find(u => u.id === userId);
    if (!user) {
      console.log('User not found');
      return;
    }

    const historyEntry: HistoryEntry = {
      id: `${Date.now()}-${userId}-${taskName}`,
      type: 'task',
      userId,
      userName: user.name,
      userColor: user.color,
      taskName,
      categoryName,
      points,
      timestamp: new Date(),
    };

    setAppState(prevState => ({
      ...prevState,
      totalPoints: prevState.totalPoints + points,
      history: [historyEntry, ...prevState.history],
    }));
  };

  const redeemReward = (userId: string, rewardId: string): boolean => {
    const user = appState.users.find(u => u.id === userId);
    const reward = appState.rewards.find(r => r.id === rewardId);
    
    if (!user || !reward) {
      console.log('User or reward not found');
      return false;
    }
    
    if (appState.totalPoints < reward.pointsRequired) {
      console.log('Insufficient points for redemption');
      return false;
    }

    console.log(`Redeeming reward ${rewardId} for user ${userId}`);

    const historyEntry: HistoryEntry = {
      id: `${Date.now()}-${userId}-${reward.name}`,
      type: 'reward',
      userId,
      userName: user.name,
      userColor: user.color,
      rewardName: reward.name,
      points: -reward.pointsRequired,
      timestamp: new Date(),
    };

    setAppState(prevState => ({
      ...prevState,
      totalPoints: prevState.totalPoints - reward.pointsRequired,
      history: [historyEntry, ...prevState.history],
    }));
    
    return true;
  };

  const resetPoints = () => {
    console.log('Resetting all points and history');
    setAppState(prevState => ({
      ...prevState,
      totalPoints: 0,
      history: [],
    }));
  };

  return (
    <AppContext.Provider
      value={{
        users: appState.users,
        categories: appState.categories,
        rewards: appState.rewards,
        history: appState.history,
        totalPoints: appState.totalPoints,
        addPoints,
        redeemReward,
        resetPoints,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
