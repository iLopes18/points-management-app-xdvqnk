
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
  
  // User management
  updateUser: (userId: string, updates: Partial<User>) => void;
  
  // Category management
  addCategory: (name: string) => void;
  updateCategory: (categoryId: string, updates: Partial<Category>) => void;
  deleteCategory: (categoryId: string) => void;
  
  // Task management
  addTask: (categoryId: string, name: string, points: number) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, newCategoryId: string) => void;
  
  // Reward management
  addReward: (name: string, pointsRequired: number, description?: string) => void;
  updateReward: (rewardId: string, updates: Partial<Reward>) => void;
  deleteReward: (rewardId: string) => void;
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

  // User management functions
  const updateUser = (userId: string, updates: Partial<User>) => {
    console.log(`Updating user ${userId}:`, updates);
    setAppState(prevState => ({
      ...prevState,
      users: prevState.users.map(user =>
        user.id === userId ? { ...user, ...updates } : user
      ),
    }));
  };

  // Category management functions
  const addCategory = (name: string) => {
    const newCategory: Category = {
      id: `category_${Date.now()}`,
      name,
      tasks: [],
    };
    console.log('Adding new category:', newCategory);
    setAppState(prevState => ({
      ...prevState,
      categories: [...prevState.categories, newCategory],
    }));
  };

  const updateCategory = (categoryId: string, updates: Partial<Category>) => {
    console.log(`Updating category ${categoryId}:`, updates);
    setAppState(prevState => ({
      ...prevState,
      categories: prevState.categories.map(category =>
        category.id === categoryId ? { ...category, ...updates } : category
      ),
    }));
  };

  const deleteCategory = (categoryId: string) => {
    console.log(`Deleting category ${categoryId}`);
    setAppState(prevState => ({
      ...prevState,
      categories: prevState.categories.filter(category => category.id !== categoryId),
    }));
  };

  // Task management functions
  const addTask = (categoryId: string, name: string, points: number) => {
    const newTask: Task = {
      id: `task_${Date.now()}`,
      name,
      points,
      categoryId,
    };
    console.log('Adding new task:', newTask);
    setAppState(prevState => ({
      ...prevState,
      categories: prevState.categories.map(category =>
        category.id === categoryId
          ? { ...category, tasks: [...category.tasks, newTask] }
          : category
      ),
    }));
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    console.log(`Updating task ${taskId}:`, updates);
    setAppState(prevState => ({
      ...prevState,
      categories: prevState.categories.map(category => ({
        ...category,
        tasks: category.tasks.map(task =>
          task.id === taskId ? { ...task, ...updates } : task
        ),
      })),
    }));
  };

  const deleteTask = (taskId: string) => {
    console.log(`Deleting task ${taskId}`);
    setAppState(prevState => ({
      ...prevState,
      categories: prevState.categories.map(category => ({
        ...category,
        tasks: category.tasks.filter(task => task.id !== taskId),
      })),
    }));
  };

  const moveTask = (taskId: string, newCategoryId: string) => {
    console.log(`Moving task ${taskId} to category ${newCategoryId}`);
    setAppState(prevState => {
      let taskToMove: Task | null = null;
      
      // Find and remove the task from its current category
      const categoriesWithoutTask = prevState.categories.map(category => ({
        ...category,
        tasks: category.tasks.filter(task => {
          if (task.id === taskId) {
            taskToMove = { ...task, categoryId: newCategoryId };
            return false;
          }
          return true;
        }),
      }));

      // Add the task to the new category
      if (taskToMove) {
        return {
          ...prevState,
          categories: categoriesWithoutTask.map(category =>
            category.id === newCategoryId
              ? { ...category, tasks: [...category.tasks, taskToMove!] }
              : category
          ),
        };
      }

      return prevState;
    });
  };

  // Reward management functions
  const addReward = (name: string, pointsRequired: number, description?: string) => {
    const newReward: Reward = {
      id: `reward_${Date.now()}`,
      name,
      pointsRequired,
      description,
    };
    console.log('Adding new reward:', newReward);
    setAppState(prevState => ({
      ...prevState,
      rewards: [...prevState.rewards, newReward],
    }));
  };

  const updateReward = (rewardId: string, updates: Partial<Reward>) => {
    console.log(`Updating reward ${rewardId}:`, updates);
    setAppState(prevState => ({
      ...prevState,
      rewards: prevState.rewards.map(reward =>
        reward.id === rewardId ? { ...reward, ...updates } : reward
      ),
    }));
  };

  const deleteReward = (rewardId: string) => {
    console.log(`Deleting reward ${rewardId}`);
    setAppState(prevState => ({
      ...prevState,
      rewards: prevState.rewards.filter(reward => reward.id !== rewardId),
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
        updateUser,
        addCategory,
        updateCategory,
        deleteCategory,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        addReward,
        updateReward,
        deleteReward,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
