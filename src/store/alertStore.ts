import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { Alert } from '@/types';
import { mockAlerts } from '@/data/alerts';

interface AlertStore {
  alerts: Alert[];
  resolveAlert: (id: string, handler: string, resolution: string) => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  alerts: mockAlerts,

  resolveAlert: (id, handler, resolution) =>
    set((state) => {
      const target = state.alerts.find((a) => a.id === id);
      if (!target || target.status === 'resolved') return state;
      return {
        alerts: state.alerts.map((a) =>
          a.id === id
            ? { ...a, status: 'resolved', handler, resolution, resolvedAt: new Date() }
            : a
        ),
      };
    }),
}));

export const usePendingAlertCount = () =>
  useAlertStore((s) => s.alerts.filter((a) => a.status === 'pending').length);

export const usePendingAlerts = () =>
  useAlertStore(
    useShallow((s) => s.alerts.filter((a) => a.status === 'pending'))
  );

export const useResolvedAlerts = () =>
  useAlertStore(
    useShallow((s) => s.alerts.filter((a) => a.status === 'resolved'))
  );
