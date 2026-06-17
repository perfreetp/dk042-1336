import {
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Bus,
  UserCheck,
  User,
} from 'lucide-react';
import type { ChecklistItem } from '@/types';
import { cn } from '@/utils/format';

interface ChecklistRowProps {
  item: ChecklistItem;
  onToggleConfirm: () => void;
}

function StatusCell({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {ok ? (
        <span className="flex items-center gap-1 text-sm text-alert-green font-medium">
          <CheckCircle2 size={18} />
          {label}
        </span>
      ) : (
        <span className="flex items-center gap-1 text-sm text-alert-red font-medium">
          <XCircle size={18} />
          未{label}
        </span>
      )}
    </div>
  );
}

export default function ChecklistRow({ item, onToggleConfirm }: ChecklistRowProps) {
  const allOk = item.isOnline && item.isGpsNormal && item.isDriverConfirmed;
  const hasIssue = !item.isOnline || !item.isGpsNormal;

  return (
    <div
      className={cn(
        'grid grid-cols-12 px-5 py-4 border-b border-slate-50 items-center transition-colors hover:bg-slate-50/50',
        allOk && 'bg-alert-green/[0.02]'
      )}
    >
      <div className="col-span-2 flex items-center gap-3">
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center',
            allOk
              ? 'bg-alert-green/10'
              : hasIssue
              ? 'bg-alert-red/10'
              : 'bg-alert-orange/10'
          )}
        >
          <Bus
            size={20}
            className={
              allOk
                ? 'text-alert-green'
                : hasIssue
                ? 'text-alert-red'
                : 'text-alert-orange'
            }
          />
        </div>
        <div>
          <p className="font-mono font-semibold text-navy-800">{item.plateNumber}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-5 h-5 rounded-full bg-navy-100 flex items-center justify-center text-[10px] font-bold text-navy-700">
              {item.driverName?.[0] || '?'}
            </div>
            <span className="text-xs text-slate-500">{item.driverName}</span>
          </div>
        </div>
      </div>

      <div className="col-span-2">
        <p className="text-sm text-slate-700">{item.routeName}</p>
        <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
          <Clock size={11} />
          预计 {item.expectedDeparture} 发车
        </div>
      </div>

      <div className="col-span-2">
        <StatusCell ok={item.isOnline} label="上线" />
      </div>

      <div className="col-span-2">
        <StatusCell ok={item.isGpsNormal} label="正常" />
      </div>

      <div className="col-span-2">
        {item.isDriverConfirmed ? (
          <span className="flex items-center justify-center gap-1 text-sm text-alert-green font-medium">
            <UserCheck size={18} />
            已确认
          </span>
        ) : (
          <button
            onClick={onToggleConfirm}
            className="mx-auto flex items-center gap-1 px-3 py-1 text-xs bg-alert-orange/10 text-alert-orange hover:bg-alert-orange hover:text-white rounded-md font-medium transition-colors"
          >
            <User size={14} />
            模拟确认
          </button>
        )}
      </div>

      <div className="col-span-2 flex items-center justify-center gap-2">
        <a
          href={`tel:${item.driverPhone.replace(/\*/g, '0')}`}
          className="flex items-center gap-1 px-3 py-1.5 text-xs text-navy-600 hover:bg-navy-50 rounded-md transition-colors border border-slate-200"
        >
          <Phone size={12} />
          联系司机
        </a>
      </div>
    </div>
  );
}
