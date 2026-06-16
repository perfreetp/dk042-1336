import { useState } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import ChecklistRow from '@/components/ChecklistRow';
import {
  useChecklistStore,
  useUnfinishedItems,
  useCompletionRate,
} from '@/store/checklistStore';
import {
  ClipboardCheck,
  RefreshCw,
  Send,
  AlertCircle,
  CheckCircle2,
  Clock,
  Bus,
  MapPin,
  UserCheck,
} from 'lucide-react';

export default function Preparation() {
  const [sent, setSent] = useState(false);
  const items = useChecklistStore((s) => s.items);
  const unfinished = useUnfinishedItems();
  const completionRate = useCompletionRate();
  const refreshCheck = useChecklistStore((s) => s.refreshCheck);
  const toggleDriverConfirm = useChecklistStore((s) => s.toggleDriverConfirm);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const onlineCount = items.filter((i) => i.isOnline).length;
  const gpsOkCount = items.filter((i) => i.isGpsNormal).length;
  const confirmedCount = items.filter((i) => i.isDriverConfirmed).length;

  return (
    <AppLayout title="放学前准备">
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-navy-800 via-navy-700 to-navy-800 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-1/2 w-40 h-40 bg-alert-green/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-navy-200 text-sm mb-2">
                <Clock size={16} />
                <span>放学时间 16:30 · 距离发车还有 25 分钟</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">发车前检查清单</h2>
              <p className="text-navy-200 text-sm">
                请在放学前 30 分钟完成以下检查，确保所有车辆准点发车
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-navy-200 mb-1">完成进度</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold font-mono">{completionRate}</span>
                <span className="text-2xl text-navy-300">%</span>
              </div>
              <div className="w-40 h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-alert-green to-alert-green/70 rounded-full transition-all duration-700"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {unfinished.length > 0 && (
          <div className="bg-alert-orange/10 border border-alert-orange/30 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-alert-orange/20 flex items-center justify-center">
                <AlertCircle size={20} className="text-alert-orange" />
              </div>
              <div>
                <p className="font-semibold text-navy-800">
                  发现 <span className="text-alert-orange font-mono">{unfinished.length}</span> 项未完成检查
                </p>
                <p className="text-sm text-slate-600 mt-0.5">
                  建议立即联系相关司机或值班老师处理
                </p>
              </div>
            </div>
            <button
              onClick={handleSend}
              disabled={sent}
              className="flex items-center gap-2 px-5 py-2.5 bg-alert-orange hover:bg-alert-orange/90 disabled:bg-alert-green text-white rounded-lg font-medium transition-all shadow-lg shadow-alert-orange/30 disabled:shadow-alert-green/30"
            >
              {sent ? (
                <>
                  <CheckCircle2 size={18} />
                  已发送给值班老师
                </>
              ) : (
                <>
                  <Send size={18} />
                  一键通知值班老师
                </>
              )}
            </button>
          </div>
        )}

        {unfinished.length === 0 && (
          <div className="bg-alert-green/10 border border-alert-green/30 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-alert-green/20 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-alert-green" />
            </div>
            <div>
              <p className="font-semibold text-navy-800">所有检查项已完成 🎉</p>
              <p className="text-sm text-slate-600 mt-0.5">
                全部车辆已就绪，可准点发车
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardCheck size={18} className="text-navy-600" />
              <h3 className="font-semibold text-navy-800">车辆检查清单</h3>
            </div>
            <button
              onClick={refreshCheck}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-navy-600 hover:bg-navy-50 rounded-lg transition-colors"
            >
              <RefreshCw size={14} />
              重新检查
            </button>
          </div>

          <div className="grid grid-cols-12 px-5 py-3 bg-slate-50 text-xs font-medium text-slate-500 border-b border-slate-100">
            <div className="col-span-2">车辆信息</div>
            <div className="col-span-2">线路 / 发车时间</div>
            <div className="col-span-2 text-center flex items-center justify-center gap-1">
              <span className="w-3 h-3 rounded-full bg-slate-300" />
              设备上线
            </div>
            <div className="col-span-2 text-center flex items-center justify-center gap-1">
              <MapPin size={12} />
              GPS定位
            </div>
            <div className="col-span-2 text-center flex items-center justify-center gap-1">
              <UserCheck size={12} />
              司机确认
            </div>
            <div className="col-span-2 text-center">操作</div>
          </div>

          <div>
            {items.map((item) => (
              <ChecklistRow
                key={item.busId}
                item={item}
                onToggleConfirm={() => toggleDriverConfirm(item.busId)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-alert-green/10 flex items-center justify-center">
                <CheckCircle2 size={20} className="text-alert-green" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy-800 font-mono">
                  {onlineCount}
                </p>
                <p className="text-xs text-slate-500">设备已上线</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-alert-green/10 flex items-center justify-center">
                <MapPin size={20} className="text-alert-green" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy-800 font-mono">
                  {gpsOkCount}
                </p>
                <p className="text-xs text-slate-500">定位正常</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-alert-green/10 flex items-center justify-center">
                <Bus size={20} className="text-alert-green" />
              </div>
              <div>
                <p className="text-2xl font-bold text-navy-800 font-mono">
                  {confirmedCount}
                </p>
                <p className="text-xs text-slate-500">司机已确认</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
