
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, User, Category, Reward } from '../types';
import { initialData } from '../data/initialData';

interface AppContextType {
  users: User[];
  categories: Category[];
  rewards: Reward[];
  addPoints: (userId: string, points: number) => void;
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

  const addPoints = (userId: string, points: number) => {
    console.log(`Adding ${points} points to user ${userId}`);
    setAppState(prevState => ({
      ...prevState,
      users: prevState.users.map(user =>
        user.id === userId
          ? { ...user, points: user.points + points }
          : user
      ),
    }));
  };

  const redeemReward = (userId: string, rewardId: string): boolean => {
    const user = appState.users.find(u => u.id === userId);
    const reward = appState.rewards.find(r => r.id === rewardId);
    
    if (!user || !reward) {
      console.log('User or reward not found');
      return false;
    }
    
    if (user.points < reward.pointsRequired) {
      console.log('Insufficient points for redemption');
      return false;
    }

    console.log(`Redeeming reward ${rewardId} for user ${userId}`);
    setAppState(prevState => ({
      ...prevState,
      users: prevState.users.map(u =>
        u.id === userId
          ? { ...u, points: u.points - reward.pointsRequired }
          : u
      ),
    }));
    
    return true;
  };

  const resetPoints = () => {
    console.log('Resetting all points');
    setAppState(prevState => ({
      ...prevState,
      users: prevState.users.map(user => ({ ...user, points: 0 })),
    }));
  };

  return (
    <AppContext.Provider
      value={{
        users: appState.users,
        categories: appState.categories,
        rewards: appState.rewards,
        addPoints,
        redeemReward,
        resetPoints,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
