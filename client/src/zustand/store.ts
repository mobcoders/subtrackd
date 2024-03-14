import { create } from 'zustand';
import { Subscription } from '../utils/types';

// TYPE:
interface State {
  allSubscriptions: Subscription[];
  setAllSubscriptions: (subscriptions: Subscription[]) => void;
  displaySubscriptions: Subscription[];
  setDisplaySubscriptions: (subscriptions: Subscription[]) => void;
  monthlyTotal: number;
}

// STORE:
export const useStore = create<State>((set) => ({
  allSubscriptions: [],
  setAllSubscriptions: (newSubscriptions) =>
    set(() => ({
      allSubscriptions: newSubscriptions,
      displaySubscriptions: newSubscriptions,
      //Calculate monthly total:
      // If monthly, add cost to accumulator, else if yearly, add cost/12
      monthlyTotal: newSubscriptions.reduce((acc, cur) => {
        return cur.monthly && cur.active ? acc + cur.cost : acc + cur.cost / 12;
      }, 0),
    })),

  displaySubscriptions: [],
  setDisplaySubscriptions: (subscriptions) =>
    set(() => ({
      displaySubscriptions: subscriptions,
    })),

  monthlyTotal: 0,
}));
