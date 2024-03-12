import { create } from 'zustand';
import { Subscription } from '../utils/types';

// TYPE:
interface State {
  userId: string;
  updateUserId: (userId: string) => void;
  allSubscriptions: Subscription[];
  setAllSubscriptions: (subscriptions: Subscription[]) => void;
  displaySubscriptions: Subscription[];
  setDisplaySubscriptions: (subscriptions: Subscription[]) => void;
}

// STORE:
export const useStore = create<State>((set) => ({
  userId: '123',
  updateUserId: (userID) => set((state) => ({ ...state, userID })),

  allSubscriptions: [],
  setAllSubscriptions: (newSubscriptions) =>
    set(() => ({
      allSubscriptions: newSubscriptions,
    })),

  displaySubscriptions: [],
  setDisplaySubscriptions: (subscriptions) =>
    set(() => ({
      displaySubscriptions: subscriptions,
    })),
}));
