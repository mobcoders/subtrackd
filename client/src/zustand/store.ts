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
  monthlyTotal: number;
}



// STORE:
export const useStore = create<State>((set) => ({
  userId: '123',
  updateUserId: (userID) => set((state) => ({ ...state, userID })),

  allSubscriptions: [],
  setAllSubscriptions: (newSubscriptions) =>
    set(() => ({
      allSubscriptions: newSubscriptions,
      displaySubscriptions: newSubscriptions,
      //calculate monthly total: if monthly, add cost to accumulator, else, add cost/12 as its yearly
      monthlyTotal: newSubscriptions.reduce((acc, cur) => {
        return cur.monthly ? acc + cur.cost : acc + cur.cost/12
      },0)
    })),

  displaySubscriptions: [],
  setDisplaySubscriptions: (subscriptions) =>
    set(() => ({
      displaySubscriptions: subscriptions,
    })),
  
  monthlyTotal: 0,
  
}));
