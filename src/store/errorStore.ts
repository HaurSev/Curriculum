import { create } from 'zustand';

interface ErrorState {
  message: string;
  setError: (message: string) => void;
  clearError: () => void;
}

const useErrorStore = create<ErrorState>((set) => ({
  message: '',
  setError: (message: string) => set({ message }),
  clearError: () => set({ message: '' }),
}));

export default useErrorStore;
