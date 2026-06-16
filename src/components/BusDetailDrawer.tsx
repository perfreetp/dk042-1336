import {
  X,
  MapPin,
  Clock,
  User,
  Users,
  Phone,
  Bus as BusIcon,
  Route,
  CheckCircle2,
  Circle,
  ChevronRight,
} from 'lucide-react';
import { useSelectedBus, useBusStore } from '@/store/busStore';
import { cn, sanitizeColor } from '@/utils/format';

export default function BusDetailDrawer() {
  const bus = useSelectedBus();
  const setSelectedBus = useBusStore((s) => s.setSelectedBus);

  if (!bus) return null;

  const onBoardStudents = bus.students.filter((s) => s.isOnBoard);
  const pendingStudents = bus.students.filter((s) => !s.isOnBoard);

  return (
    <>
      <div
        className="fixed inset-0 bg-navy-900/30 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={() => setSelectedBus(null)}
      />
      <div className="fixed right-0 top-0 bottom-0 w-[480px] bg-white z-50 shadow-2xl animate-slideInRight flex flex-col">
        <div
          className="p-5 border-b border-slate-200"
          style={{ borderLeft: `4px solid ${sanitizeColor(bus.route.color)}` }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: sanitizeColor(bus.route.color) + '20' }}
              >
                <BusIcon size={24} style={{ color: sanitizeColor(bus.route.color) }} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-800 font-mono">
                  {bus.plateNumber}
                </h3>
                <p className="text-sm" style={{ color: sanitizeColor(bus.route.color) }}>
                  {bus.route.name}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedBus(null)}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500">车内人数</p>
              <p className="text-lg font-bold text-navy-800 font-mono mt-1">
                {bus.currentPassengers}
                <span className="text-sm font-normal text-slate-400">/{bus.capacity}</span>
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500">当前车速</p>
              <p className="text-lg font-bold text-navy-800 font-mono mt-1">
                {bus.speed}
                <span className="text-sm font-normal text-slate-400"> km/h</span>
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500">状态更新</p>
              <p className="text-sm font-bold text-navy-800 mt-1">{bus.lastUpdate}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto scrollbar-thin p-5 space-y-5">
          <section>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Route size={16} className="text-navy-500" />
              接送线路
            </h4>
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="relative">
                {bus.route.stops.map((stop, idx) => (
                  <div key={stop.id} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      {stop.isCompleted ? (
                        <CheckCircle2 size={20} className="text-alert-green flex-shrink-0" />
                      ) : stop.id === bus.nextStop?.id ? (
                        <div className="relative">
                          <Circle size={20} className="text-alert-orange flex-shrink-0 fill-alert-orange/20" />
                          <div className="absolute inset-0 rounded-full bg-alert-orange/30 animate-ping" />
                        </div>
                      ) : (
                        <Circle size={20} className="text-slate-300 flex-shrink-0" />
                      )}
                      {idx < bus.route.stops.length - 1 && (
                        <div
                          className={cn(
                            'w-0.5 flex-1 min-h-[32px]',
                            stop.isCompleted ? 'bg-alert-green' : 'bg-slate-200'
                          )}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <p
                          className={cn(
                            'text-sm font-medium',
                            stop.isCompleted
                              ? 'text-slate-500 line-through'
                              : stop.id === bus.nextStop?.id
                              ? 'text-navy-800'
                              : 'text-slate-600'
                          )}
                        >
                          {stop.name}
                        </p>
                        <span
                          className={cn(
                            'text-xs font-mono',
                            stop.id === bus.nextStop?.id
                              ? 'text-alert-orange font-bold'
                              : 'text-slate-400'
                          )}
                        >
                          {stop.eta}
                        </span>
                      </div>
                      {stop.id === bus.nextStop?.id && (
                        <p className="text-xs text-alert-orange mt-0.5">
                          预计 5 分钟后到达
                        </p>
                      )}
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-slate-300 mt-0.5 flex-shrink-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <User size={16} className="text-navy-500" />
              随车人员
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center text-base font-bold text-navy-700">
                    {bus.driver.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy-800">
                      {bus.driver.name}
                    </p>
                    <p className="text-xs text-slate-400">司机</p>
                  </div>
                </div>
                <button className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 bg-white rounded-lg text-sm text-navy-600 hover:bg-navy-50 border border-slate-200 transition-colors">
                  <Phone size={14} />
                  联系司机
                </button>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-alert-green/10 flex items-center justify-center text-base font-bold text-alert-green">
                    {bus.attendant.name?.[0] || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy-800">
                      {bus.attendant.name}
                    </p>
                    <p className="text-xs text-slate-400">随车照管员</p>
                  </div>
                </div>
                <button className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 bg-white rounded-lg text-sm text-navy-600 hover:bg-navy-50 border border-slate-200 transition-colors">
                  <Phone size={14} />
                  联系照管
                </button>
              </div>
            </div>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users size={16} className="text-navy-500" />
                学生名单
              </span>
              <span className="text-xs font-normal text-slate-400">
                已上车 {onBoardStudents.length} / 未上车 {pendingStudents.length}
              </span>
            </h4>

            <div className="space-y-2">
              <div className="text-xs text-alert-green font-medium flex items-center gap-1">
                <CheckCircle2 size={12} />
                已上车学生
              </div>
              <div className="max-h-[180px] overflow-auto scrollbar-thin space-y-1">
                {onBoardStudents.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between py-2 px-3 bg-alert-green/5 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-navy-800">{s.name}</span>
                      <span className="text-xs text-slate-400">
                        {s.grade} {s.className}
                      </span>
                    </div>
                    <span className="text-xs text-alert-green font-mono">
                      {s.boardTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {pendingStudents.length > 0 && (
              <div className="space-y-2 mt-4">
                <div className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <Circle size={12} />
                  待上车学生
                </div>
                <div className="max-h-[150px] overflow-auto scrollbar-thin space-y-1">
                  {pendingStudents.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-500">{s.name}</span>
                        <span className="text-xs text-slate-400">
                          {s.grade} {s.className}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">等待中</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <MapPin size={16} className="text-navy-500" />
              位置信息
            </h4>
            <div className="bg-gradient-to-br from-slate-50 to-navy-50/50 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">纬度</span>
                <span className="font-mono text-navy-700">{bus.location.lat.toFixed(4)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">经度</span>
                <span className="font-mono text-navy-700">{bus.location.lng.toFixed(4)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  <Clock size={12} className="inline mr-1" />
                  更新时间
                </span>
                <span className="text-slate-600">{bus.lastUpdate}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
