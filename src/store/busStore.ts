import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { Bus, FilterState } from '@/types';
import { mockBuses } from '@/data/buses';

interface BusStore {
  buses: Bus[];
  selectedBusId: string | null;
  filters: FilterState;
  setSelectedBus: (id: string | null) => void;
  setFilters: (filters: Partial<FilterState>) => void;
}

export const useBusStore = create<BusStore>((set) => ({
  buses: mockBuses,
  selectedBusId: null,
  filters: {
    grade: 'all',
    route: 'all',
    risk: 'all',
  },

  setSelectedBus: (id) => set({ selectedBusId: id }),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
}));

export const useBusStats = () =>
  useBusStore(
    useShallow((s) => ({
      onlineCount: s.buses.filter((b) => b.status === 'online').length,
      totalPassengers: s.buses.reduce((sum, b) => sum + b.currentPassengers, 0),
      alertCount: s.buses.filter((b) => b.isDeviating).length,
      highRiskCount: s.buses.filter((b) => b.riskLevel === 'high').length,
    }))
  );

export const useSelectedBus = () =>
  useBusStore(
    useShallow((s) => s.buses.find((b) => b.id === s.selectedBusId) || null)
  );

export const useFilteredBuses = () =>
  useBusStore(
    useShallow((s) => {
      return s.buses.filter((bus) => {
        if (s.filters.grade !== 'all') {
          const hasGrade = bus.students.some((st) => st.grade === s.filters.grade);
          if (!hasGrade) return false;
        }
        if (s.filters.route !== 'all' && bus.route.name !== s.filters.route) {
          return false;
        }
        if (s.filters.risk !== 'all' && bus.riskLevel !== s.filters.risk) {
          return false;
        }
        return true;
      });
    })
  );
