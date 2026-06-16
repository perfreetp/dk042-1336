import { useShallow } from 'zustand/react/shallow';
import { Bus, User, Users, MapPin, Clock, Gauge } from 'lucide-react';
import type { Bus as BusType } from '@/types';
import { cn, getRiskLevelLabel, getRiskLevelColor } from '@/utils/format';
import { useBusStore } from '@/store/busStore';

interface BusCardProps {
  bus: BusType;
}

export default function BusCard({ bus }: BusCardProps) {
  const { selectedBusId, setSelectedBus } = useBusStore(
    useShallow((s) => ({
      selectedBusId: s.selectedBusId,
      setSelectedBus: s.setSelectedBus,
    }))
  );
  const isSelected = selectedBusId === bus.id;

  const borderColor =
    bus.riskLevel === 'high'
      ? 'border-l-alert-red'
      : bus.riskLevel === 'medium'
      ? 'border-l-alert-orange'
      : 'border-l-alert-green';

  return (
    <div
      onClick={() => setSelectedBus(isSelected ? null : bus.id)}
      className={cn(
        'bg-white rounded-xl border-l-4 border-slate-200 shadow-sm p-4 cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-0.5',
        borderColor,
        isSelected && 'ring-2 ring-navy-500 shadow-lg scale-[1.02]'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: bus.route.color + '20' }}
          >
            <Bus size={18} style={{ color: bus.route.color }} />
          </div>
          <div>
            <p className="font-bold text-navy-800 font-mono">{bus.plateNumber}</p>
            <p className="text-xs text-slate-500" style={{ color: bus.route.color }}>
              {bus.route.name}
            </p>
          </div>
        </div>
        <span
          className={cn(
            'text-xs px-2 py-1 rounded-md font-medium',
            getRiskLevelColor(bus.riskLevel)
          )}
        >
          {getRiskLevelLabel(bus.riskLevel)}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <div className="w-6 h-6 rounded-full bg-navy-100 flex items-center justify-center text-xs font-bold text-navy-700">
            {bus.driver.avatar}
          </div>
          <span className="flex-1 truncate">
            <span className="text-slate-400">司机：</span>
            {bus.driver.name}
          </span>
          <User size={14} className="text-slate-400" />
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Users size={14} className="text-slate-400" />
          <span className="flex-1">
            <span className="text-slate-400">照管：</span>
            {bus.attendant.name}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1 text-sm">
            <Users size={14} className="text-alert-green" />
            <span className="font-mono font-bold text-navy-800">
              {bus.currentPassengers}
            </span>
            <span className="text-slate-400">/ {bus.capacity} 人</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Gauge size={14} className="text-slate-400" />
            <span className="font-mono text-slate-600">{bus.speed} km/h</span>
          </div>
        </div>

        {bus.nextStop && (
          <div className="flex items-start gap-2 pt-2 border-t border-slate-100">
            <MapPin size={14} className="text-alert-orange mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-400">下一站</p>
              <p className="text-sm font-medium text-slate-700 truncate">
                {bus.nextStop.name}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} className="text-navy-500" />
              <span className="text-xs font-mono font-bold text-navy-600">
                {bus.nextStop.eta}
              </span>
            </div>
          </div>
        )}

        {bus.status === 'offline' && (
          <div className="mt-2 bg-slate-100 rounded-lg py-1.5 px-2 text-center text-xs text-slate-500">
            设备离线 · {bus.lastUpdate}
          </div>
        )}

        {bus.isDeviating && (
          <div className="mt-2 bg-alert-red/10 rounded-lg py-1.5 px-2 text-center text-xs text-alert-red font-medium">
            ⚠ 路线偏离中
          </div>
        )}
      </div>
    </div>
  );
}
