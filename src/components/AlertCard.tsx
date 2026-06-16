import {
  AlertTriangle,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  CheckCircle2,
  User,
  NavigationOff,
  Pause,
  Ban,
} from 'lucide-react';
import type { Alert } from '@/types';
import { cn, getAlertTypeLabel, getAlertTypeColor, formatDateTime, formatTime } from '@/utils/format';

interface AlertCardProps {
  alert: Alert;
  onResolve: () => void;
}

const typeIcons = {
  deviation: NavigationOff,
  stop: Pause,
  restricted: Ban,
};

export default function AlertCard({ alert, onResolve }: AlertCardProps) {
  const TypeIcon = typeIcons[alert.type] || AlertTriangle;
  const isPending = alert.status === 'pending';

  return (
    <div
      className={cn(
        'bg-white rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-md',
        isPending
          ? 'border-l-4 border-alert-red shadow-sm'
          : 'border-slate-200 opacity-80'
      )}
    >
      <div
        className={cn(
          'p-5',
          isPending && 'bg-gradient-to-r from-alert-red/5 to-transparent'
        )}
      >
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
              isPending
                ? 'bg-alert-red/10 ring-4 ring-alert-red/20'
                : 'bg-slate-100'
            )}
          >
            <TypeIcon
              size={24}
              className={isPending ? 'text-alert-red' : 'text-slate-400'}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-bold text-navy-800 font-mono">
                    {alert.busPlateNumber}
                  </h4>
                  <span
                    className={cn(
                      'text-xs px-2.5 py-1 rounded-md font-medium',
                      getAlertTypeColor(alert.type)
                    )}
                  >
                    {getAlertTypeLabel(alert.type)}
                  </span>
                  {!isPending && (
                    <span className="text-xs px-2.5 py-1 rounded-md bg-alert-green/10 text-alert-green font-medium flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      已处理
                    </span>
                  )}
                </div>
                <p className="text-slate-600 mt-1.5">{alert.description}</p>
              </div>

              {isPending && alert.duration && (
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl font-bold text-alert-red font-mono">
                    {alert.duration}
                  </p>
                  <p className="text-xs text-slate-400">分钟</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-5 mt-3 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-400" />
                <span>{alert.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-slate-400" />
                <span>{formatDateTime(alert.timestamp)}</span>
              </div>
            </div>

            {!isPending && alert.handler && (
              <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <User size={14} />
                  <span>处理人：</span>
                  <span className="font-medium text-slate-700">{alert.handler}</span>
                  <span className="text-slate-300 mx-1">·</span>
                  <span>
                    处理时间：
                    {alert.resolvedAt ? formatDateTime(alert.resolvedAt) : '-'}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <span className="text-slate-400">处理结果：</span>
                  {alert.resolution}
                </p>
              </div>
            )}
          </div>
        </div>

        {isPending && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-navy-800 hover:bg-navy-700 text-white rounded-lg text-sm font-medium transition-colors">
              <Phone size={16} />
              联系司机
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors">
              <MessageSquare size={16} />
              发送消息
            </button>
            <button
              onClick={onResolve}
              className="ml-auto flex items-center gap-1.5 px-4 py-2 bg-alert-green hover:bg-alert-green/90 text-white rounded-lg text-sm font-medium transition-colors shadow-md shadow-alert-green/30"
            >
              <CheckCircle2 size={16} />
              记录处理结果
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
