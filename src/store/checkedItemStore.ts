import type { SkillMastery } from 'cv-graphql';
import { create } from 'zustand';

interface CheckedItemState {
  clearItems(): unknown;
  checkedItems: SkillMastery[];
  addItem: (item: SkillMastery) => void;
  removeItem: (name: string) => void;
}

const useCheckedItemStore = create<CheckedItemState>((set) => ({
  checkedItems: [],

  addItem: (item) =>
    set((state) => ({
      checkedItems: [
        {
          name: item.name,
          categoryId: item.categoryId,
          mastery: item.mastery,
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

export default useCheckedItemStore;
