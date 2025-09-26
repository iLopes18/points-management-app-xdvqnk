
export interface User {
  id: string;
  name: string;
  points: number;
  color: string;
}

export interface Task {
  id: string;
  name: string;
  points: number;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  tasks: Task[];
}

export interface Reward {
  id: string;
  name: string;
  pointsRequired: number;
  description?: string;
}

export interface TaskHistoryEntry {
  id: string;
  taskId: string;
  taskName: string;
  userId: string;
  userName: string;
  userColor: string;
  points: number;
  categoryName: string;
  timestamp: Date;
}

export interface RewardHistoryEntry {
  id: string;
  rewardId: string;
  rewardName: string;
  userId: string;
  userName: string;
  userColor: string;
  points: number;
  timestamp: Date;
}

export interface AppState {
  users: User[];
  categories: Category[];
  rewards: Reward[];
  totalPoints: number;
  taskHistory: TaskHistoryEntry[];
  rewardHistory: RewardHistoryEntry[];
}

export type TabType = 'categories' | 'rewards' | 'history';
