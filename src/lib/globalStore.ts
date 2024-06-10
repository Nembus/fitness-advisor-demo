import {create} from 'zustand';

type Store = {
  sharedState: string | null;
  setSharedState: (value: string) => void;
};

export const useStore = create<Store>(set => ({
  sharedState: 'openai', // Shared state value
  setSharedState: (value: string) => set(() => ({ sharedState: value }))  // Action to update the shared state
}))
