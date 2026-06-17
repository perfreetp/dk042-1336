import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { Alert } from '@/types';
import { mockAlerts } from '@/data/alerts';

const STORAGE_KEY = 'bus-escort-alerts';

function loadAlerts(): Alert[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((a: any) => ({
          ...a,
          timestamp: new Date(a.timestamp),
          resolvedAt: a.resolvedAt ? new Date(a.resolvedAt) : undefined,
        }));
      }
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return mockAlerts;
}

function saveAlerts(alerts: Alert[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
  } catch {}
}

interface AlertStore {
  alerts: Alert[];
  resolveAlert: (id: string, handler: string, resolution: string) => void;
  markDriverContacted: (id: string) => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  alerts: loadAlerts(),

  resolveAlert: (id, handler, resolution) =>
    set((state) => {
      const target = state.alerts.find((a) => a.id === id);
      if (!target || target.status === 'resolved') return state;
      const newAlerts = state.alerts.map((a) =>
        a.id === id
          ? { ...a, status: 'resolved' as const, handler, resolution, resolvedAt: new Date() }
          : a
      );
      saveAlerts(newAlerts);
      return { alerts: newAlerts };
    }),

  markDriverContacted: (id) =>
    set((state) => {
      const newAlerts = state.alerts.map((a) =>
        a.id === id && !a.driverContactedAt
          ? { ...a, driverContactedAt: new Date().toISOString() }
          : a
      );
      saveAlerts(newAlerts);
      return { alerts: newAlerts };
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
