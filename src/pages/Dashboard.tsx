import { shallow } from 'zustand/shallow';
import AppLayout from '@/components/Layout/AppLayout';
import StatCard from '@/components/StatCard';
import FilterBar from '@/components/FilterBar';
import BusMap from '@/components/BusMap';
import BusCard from '@/components/BusCard';
import BusDetailDrawer from '@/components/BusDetailDrawer';
import { useBusStore, useBusStats, useFilteredBuses, useSelectedBus } from '@/store/busStore';
import { Bus, Users, AlertTriangle, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const stats = useBusStats();
  const filteredBuses = useFilteredBuses();
  const selectedBus = useSelectedBus();
  const busesTotal = useBusStore((s) => s.buses.length);

  return (
    <AppLayout title="实时护航台">
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            title="在线车辆"
            value={`${stats.onlineCount} / ${busesTotal}`}
            icon={Bus}
            color="blue"
            subtitle={`${busesTotal - stats.onlineCount} 辆未上线`}
            trend="up"
            trendValue="较昨日 +1"
          />
          <StatCard
            title="车内学生总数"
            value={stats.totalPassengers}
            icon={Users}
            color="green"
            subtitle={`${busesTotal} 辆校车合计`}
            trend="up"
            trendValue="实时统计中"
          />
          <StatCard
            title="异常预警"
            value={stats.alertCount}
            icon={AlertTriangle}
            color="red"
            subtitle="路线偏离车辆"
          />
          <StatCard
            title="高风险车辆"
            value={stats.highRiskCount}
            icon={AlertCircle}
            color="orange"
            subtitle="需重点关注"
          />
        </div>

        <FilterBar />

        <div className="grid grid-cols-5 gap-4" style={{ minHeight: '520px' }}>
          <div className="col-span-3">
            <BusMap />
          </div>
          <div className="col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-navy-800">
                车辆列表
                <span className="ml-2 text-sm font-normal text-slate-400">
                  共 {filteredBuses.length} 辆
                </span>
              </h3>
            </div>
            <div className="flex-1 overflow-auto scrollbar-thin space-y-3 pr-1">
              {filteredBuses.map((bus) => (
                <BusCard key={bus.id} bus={bus} />
              ))}
              {filteredBuses.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                  <Bus size={48} className="mb-3 opacity-40" />
                  <p className="text-sm">没有符合筛选条件的车辆</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedBus && <BusDetailDrawer />}
    </AppLayout>
  );
}
