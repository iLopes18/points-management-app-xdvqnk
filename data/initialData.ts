
import { AppState } from '../types';

export const initialData: AppState = {
  users: [
    {
      id: 'lara',
      name: 'Lara',
      points: 0,
      color: '#FF69B4', // Pink
    },
    {
      id: 'isaac',
      name: 'Isaac',
      points: 0,
      color: '#007AFF', // Blue
    },
  ],
  categories: [
    {
      id: 'household',
      name: 'Household Chores',
      tasks: [
        { id: 'dishes', name: 'Do the Dishes', points: 10, categoryId: 'household' },
        { id: 'laundry', name: 'Do Laundry', points: 15, categoryId: 'household' },
        { id: 'vacuum', name: 'Vacuum Living Room', points: 12, categoryId: 'household' },
        { id: 'bathroom', name: 'Clean Bathroom', points: 20, categoryId: 'household' },
        { id: 'kitchen', name: 'Clean Kitchen', points: 18, categoryId: 'household' },
      ],
    },
    {
      id: 'personal',
      name: 'Personal Goals',
      tasks: [
        { id: 'exercise', name: 'Exercise 30 mins', points: 25, categoryId: 'personal' },
        { id: 'reading', name: 'Read for 1 hour', points: 20, categoryId: 'personal' },
        { id: 'meditation', name: 'Meditate 15 mins', points: 15, categoryId: 'personal' },
        { id: 'water', name: 'Drink 8 glasses of water', points: 10, categoryId: 'personal' },
      ],
    },
    {
      id: 'work',
      name: 'Work & Study',
      tasks: [
        { id: 'project', name: 'Complete Work Project', points: 50, categoryId: 'work' },
        { id: 'study', name: 'Study for 2 hours', points: 30, categoryId: 'work' },
        { id: 'organize', name: 'Organize Workspace', points: 15, categoryId: 'work' },
        { id: 'emails', name: 'Clear Email Inbox', points: 10, categoryId: 'work' },
      ],
    },
    {
      id: 'social',
      name: 'Social & Family',
      tasks: [
        { id: 'call-family', name: 'Call Family Member', points: 15, categoryId: 'social' },
        { id: 'friend-time', name: 'Spend Time with Friends', points: 20, categoryId: 'social' },
        { id: 'date-night', name: 'Plan Date Night', points: 25, categoryId: 'social' },
        { id: 'help-neighbor', name: 'Help a Neighbor', points: 30, categoryId: 'social' },
      ],
    },
  ],
  rewards: [
    {
      id: 'coffee',
      name: 'Favorite Coffee',
      pointsRequired: 50,
      description: 'Treat yourself to your favorite coffee',
    },
    {
      id: 'movie',
      name: 'Movie Night',
      pointsRequired: 75,
      description: 'Choose the movie for movie night',
    },
    {
      id: 'massage',
      name: '30-min Massage',
      pointsRequired: 100,
      description: 'Relaxing massage session',
    },
    {
      id: 'dinner',
      name: 'Dinner Out',
      pointsRequired: 150,
      description: 'Dinner at your favorite restaurant',
    },
    {
      id: 'shopping',
      name: 'Shopping Spree',
      pointsRequired: 200,
      description: '$50 shopping budget',
    },
    {
      id: 'weekend',
      name: 'Weekend Getaway',
      pointsRequired: 500,
      description: 'Plan a weekend trip',
    },
  ],
};
