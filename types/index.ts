
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

export interface AppState {
  users: User[];
  categories: Category[];
  rewards: Reward[];
}

export type TabType = 'categories' | 'rewards';
