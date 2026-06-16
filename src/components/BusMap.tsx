import { useShallow } from 'zustand/react/shallow';
import { useBusStore } from '@/store/busStore';
import { cn } from '@/utils/format';

export default function BusMap() {
  const { buses, selectedBusId, setSelectedBus } = useBusStore(
    useShallow((s) => ({
      buses: s.buses,
      selectedBusId: s.selectedBusId,
      setSelectedBus: s.setSelectedBus,
    }))
  );

  const getBusColor = (bus: any) => {
    if (bus.status === 'offline') return '#94A3B8';
    if (bus.isDeviating) return '#E63946';
    if (bus.riskLevel === 'high') return '#E63946';
    if (bus.riskLevel === 'medium') return '#F4A261';
    return '#2A9D8F';
  };

  const onlineCount = buses.filter((b) => b.status === 'online').length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-semibold text-navy-800">实时位置地图</h3>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-alert-green"></span>
            正常
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-alert-orange"></span>
            关注
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-alert-red"></span>
            预警
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
            离线
          </span>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-slate-50 via-navy-50/30 to-slate-100 h-[calc(100%-52px)] min-h-[400px] overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="0.15"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />

          <path
            d="M 10 40 Q 30 20, 50 35 T 90 50"
            fill="none"
            stroke="#E63946"
            strokeWidth="0.6"
            strokeDasharray="1.5 1"
            opacity="0.4"
          />
          <path
            d="M 5 65 Q 25 55, 45 65 T 85 70"
            fill="none"
            stroke="#2A9D8F"
            strokeWidth="0.6"
            strokeDasharray="1.5 1"
            opacity="0.4"
          />
          <path
            d="M 15 20 Q 40 30, 60 25 T 95 35"
            fill="none"
            stroke="#F4A261"
            strokeWidth="0.6"
            strokeDasharray="1.5 1"
            opacity="0.4"
          />

          <circle cx="50" cy="50" r="3.5" fill="#0F2A4A" opacity="0.15" />
          <circle cx="50" cy="50" r="2.5" fill="#0F2A4A" opacity="0.3" />
          <text
            x="50"
            y="51"
            textAnchor="middle"
            fill="#0F2A4A"
            fontSize="2"
            fontWeight="bold"
          >
            实验小学
          </text>
        </svg>

        {buses.map((bus) => {
          const color = getBusColor(bus);
          const isSelected = selectedBusId === bus.id;
          return (
            <div
              key={bus.id}
              onClick={() => setSelectedBus(isSelected ? null : bus.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${bus.location.x}%`, top: `${bus.location.y}%` }}
            >
              {bus.status === 'online' && (
                <div
                  className="absolute inset-0 -m-3 rounded-full animate-pulseRing"
                  style={{ backgroundColor: color + '40' }}
                />
              )}
              <div
                className={cn(
                  'relative z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 border-2 border-white',
                  isSelected && 'scale-125 ring-4 ring-navy-500/30'
                )}
                style={{ backgroundColor: color }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
                  <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
                </svg>
              </div>

              <div
                className={cn(
                  'absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap bg-navy-800 text-white text-xs px-2 py-1 rounded shadow-lg transition-opacity duration-200 z-20 pointer-events-none',
                  isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                )}
              >
                {bus.plateNumber}
                <div
                  className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-navy-800 rotate-45"
                />
              </div>
            </div>
          );
        })}

        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-slate-500 shadow-sm">
          共 {buses.length} 辆校车 · {onlineCount} 辆在线
        </div>
      </div>
    </div>
  );
}
