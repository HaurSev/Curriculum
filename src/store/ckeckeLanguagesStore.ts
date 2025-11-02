import type { LanguageProficiency } from 'cv-graphql';
import { create } from 'zustand';

interface CheckedLanguageState {
  clearItems(): unknown;
  checkedItems: LanguageProficiency[];
  addItem: (item: LanguageProficiency) => void;
  removeItem: (name: string) => void;
}

const useCheckedLanguagesStore = create<CheckedLanguageState>((set) => ({
  checkedItems: [],

  addItem: (item) =>
    set((state) => ({
      checkedItems: [
        {
          name: item.name,
          proficiency: item.proficiency,
        },
        ...state.checkedItems,
      ],
    })),

  removeItem: (name) =>
    set((state) => ({
      checkedItems: state.checkedItems.filter((item) => item.name !== name),
    })),
  clearItems: () => set({ checkedItems: [] }),
}));

export default useCheckedLanguagesStore;
