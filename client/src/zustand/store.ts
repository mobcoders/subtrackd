import { create } from 'zustand';

// Type:
interface State {
  userId: string;
  updateUserId: (userId: string) => void;
}

// Store:
export const useStore = create<State>((set) => ({
  userId: '123',
  updateUserId: (userID) => set((state) => ({ ...state, userID })),
}));
