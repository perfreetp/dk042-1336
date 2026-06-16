import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { ChecklistItem } from '@/types';
import { mockChecklist } from '@/data/checklist';

interface ChecklistStore {
  items: ChecklistItem[];
  toggleDriverConfirm: (busId: string) => void;
  refreshCheck: () => void;
}

export const useChecklistStore = create<ChecklistStore>((set) => ({
  items: mockChecklist,

  toggleDriverConfirm: (busId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.busId === busId && !item.isDriverConfirmed
          ? { ...item, isDriverConfirmed: true }
          : item
      ),
    })),

  refreshCheck: () => {
    set((state) => ({
      items: state.items.map((item) => ({
        ...item,
        isOnline: true,
        isGpsNormal: true,
      })),
    }));
  },
}));

export const useUnfinishedItems = () =>
  useChecklistStore(
    useShallow((s) =>
      s.items.filter(
        (item) => !item.isOnline || !item.isGpsNormal || !item.isDriverConfirmed
      )
    )
  );

export const useCompletionRate = () =>
  useChecklistStore((s) => {
    const total = s.items.length * 3;
    if (total === 0) return 0;
    const completed = s.items.reduce(
      (sum, item) =>
        sum +
        (item.isOnline ? 1 : 0) +
        (item.isGpsNormal ? 1 : 0) +
        (item.isDriverConfirmed ? 1 : 0),
      0
    );
    return Math.round((completed / total) * 100);
  });
