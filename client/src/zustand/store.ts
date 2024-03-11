import { create } from 'zustand';

interface State {
  userId: string;
  updateUserId: (userId: string) => void;
}

export const useStore = create<State>((set) => ({
  userId: '123',
  updateUserId: (userID) => set((state) => ({ ...state, userID })),
}));
