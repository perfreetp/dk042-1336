import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { ChecklistItem } from '@/types';
import { mockChecklist } from '@/data/checklist';

const STORAGE_KEY = 'bus-escort-checklist';

function loadItems(): ChecklistItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return mockChecklist;
}

function saveItems(items: ChecklistItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

interface ChecklistStore {
  items: ChecklistItem[];
  toggleDriverConfirm: (busId: string) => void;
  refreshCheck: () => void;
}

export const useChecklistStore = create<ChecklistStore>((set) => ({
  items: loadItems(),

  toggleDriverConfirm: (busId) =>
    set((state) => {
      const newItems = state.items.map((item) =>
        item.busId === busId && !item.isDriverConfirmed
          ? { ...item, isDriverConfirmed: true }
          : item
      );
      saveItems(newItems);
      return { items: newItems };
    }),

  refreshCheck: () => {
    set((state) => {
      const newItems = state.items.map((item) => ({
        ...item,
        isOnline: true,
        isGpsNormal: true,
      }));
      saveItems(newItems);
      return { items: newItems };
    });
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
