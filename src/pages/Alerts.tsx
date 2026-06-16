import { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import AlertCard from '@/components/AlertCard';
import ResolveModal from '@/components/ResolveModal';
import { useAlertStore, usePendingAlerts, useResolvedAlerts } from '@/store/alertStore';
import { AlertTriangle, History, Clock } from 'lucide-react';
import { cn } from '@/utils/format';

type TabType = 'pending' | 'resolved';

export default function Alerts() {
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [resolveAlertId, setResolveAlertId] = useState<string | null>(null);

  const pendingAlerts = usePendingAlerts();
  const resolvedAlerts = useResolvedAlerts();
  const resolveAlert = useAlertStore((s) => s.resolveAlert);

  const displayAlerts = activeTab === 'pending' ? pendingAlerts : resolvedAlerts;

  const handleResolve = (handler: string, resolution: string) => {
    if (resolveAlertId) {
      resolveAlert(resolveAlertId, handler, resolution);
      setResolveAlertId(null);
    }
  };

  const maxDuration = pendingAlerts.length > 0
    ? Math.max(...pendingAlerts.map((a) => a.duration ?? 0))
    : 0;

  return (
    <AppLayout title="路线偏离提醒">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div
            className={cn(
              'bg-white rounded-xl p-5 border-2 cursor-pointer transition-all',
              activeTab === 'pending'
                ? 'border-alert-red shadow-lg'
                : 'border-slate-200 hover:border-slate-300'
            )}
            onClick={() => setActiveTab('pending')}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">待处理预警</p>
                <p className="text-3xl font-bold text-alert-red mt-2 font-mono">
                  {pendingAlerts.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-alert-red/10 flex items-center justify-center ring-4 ring-alert-red/20">
                <AlertTriangle size={24} className="text-alert-red" />
              </div>
            </div>
            {pendingAlerts.length > 0 && (
              <p className="text-xs text-slate-400 mt-3">
                最久已等待 {maxDuration} 分钟
              </p>
            )}
          </div>

          <div
            className={cn(
              'bg-white rounded-xl p-5 border-2 cursor-pointer transition-all',
              activeTab === 'resolved'
                ? 'border-navy-500 shadow-lg'
                : 'border-slate-200 hover:border-slate-300'
            )}
            onClick={() => setActiveTab('resolved')}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">已处理记录</p>
                <p className="text-3xl font-bold text-navy-700 mt-2 font-mono">
                  {resolvedAlerts.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-navy-500/10 flex items-center justify-center ring-4 ring-navy-500/20">
                <History size={24} className="text-navy-600" />
              </div>
            </div>
            {resolvedAlerts.length > 0 && (
              <p className="text-xs text-slate-400 mt-3">
                今日共处理 {resolvedAlerts.length} 起异常
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-navy-800">
            {activeTab === 'pending' ? '待处理预警' : '已处理记录'}
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock size={14} />
            <span>按发生时间倒序排列</span>
          </div>
        </div>

        <div className="space-y-4">
          {displayAlerts.length === 0 ? (
            <div className="bg-white rounded-xl p-16 text-center border border-slate-200">
              <div className="w-16 h-16 rounded-full bg-alert-green/10 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} className="text-alert-green" />
              </div>
              <p className="text-lg font-semibold text-navy-800 mb-1">
                {activeTab === 'pending' ? '暂无待处理预警' : '暂无处理记录'}
              </p>
              <p className="text-sm text-slate-500">
                {activeTab === 'pending'
                  ? '所有校车运行正常，继续保持监控'
                  : '今日尚未处理任何预警'}
              </p>
            </div>
          ) : (
            displayAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onResolve={() => setResolveAlertId(alert.id)}
              />
            ))
          )}
        </div>
      </div>

      {resolveAlertId && (
        <ResolveModal
          alertId={resolveAlertId}
          onClose={() => setResolveAlertId(null)}
          onResolve={handleResolve}
        />
      )}
    </AppLayout>
  );
}
