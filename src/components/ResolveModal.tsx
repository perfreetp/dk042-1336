import { useState } from 'react';
import { X, AlertTriangle, CheckCircle2, User, FileText } from 'lucide-react';
import { useAlertStore } from '@/store/alertStore';
import { cn } from '@/utils/format';

interface ResolveModalProps {
  alertId: string;
  onClose: () => void;
  onResolve: (handler: string, resolution: string) => void;
}

export default function ResolveModal({ alertId, onClose, onResolve }: ResolveModalProps) {
  const alert = useAlertStore((s) => s.alerts.find((a) => a.id === alertId));
  const [handler, setHandler] = useState('王主任');
  const [resolution, setResolution] = useState('');
  const [errors, setErrors] = useState<{ handler?: string; resolution?: string }>({});

  if (!alert) return null;

  const handleSubmit = () => {
    const newErrors: typeof errors = {};
    if (!handler.trim()) newErrors.handler = '请输入处理人姓名';
    if (!resolution.trim()) newErrors.resolution = '请填写处理结果';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onResolve(handler.trim(), resolution.trim());
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-navy-900/40 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] bg-white rounded-2xl shadow-2xl z-50 animate-fadeIn overflow-hidden">
        <div className="bg-gradient-to-r from-alert-red/10 via-alert-orange/10 to-alert-yellow/10 px-6 py-5 border-b border-slate-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-alert-red/20 flex items-center justify-center">
                <AlertTriangle size={22} className="text-alert-red" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy-800">记录处理结果</h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  车牌号 <span className="font-mono font-semibold">{alert.busPlateNumber}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-white/60 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-sm text-slate-600 leading-relaxed">{alert.description}</p>
            <p className="text-xs text-slate-400 mt-2">
              发生位置：{alert.location}
            </p>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
              <User size={14} />
              处理人 <span className="text-alert-red">*</span>
            </label>
            <input
              type="text"
              value={handler}
              maxLength={50}
              onChange={(e) => {
                setHandler(e.target.value);
                if (errors.handler) setErrors({ ...errors, handler: undefined });
              }}
              placeholder="请输入处理人姓名"
              className={cn(
                'w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none',
                errors.handler
                  ? 'border-alert-red focus:ring-2 focus:ring-alert-red/20 bg-alert-red/5'
                  : 'border-slate-200 focus:ring-2 focus:ring-navy-500/20 focus:border-navy-500'
              )}
            />
            {errors.handler && (
              <p className="text-xs text-alert-red mt-1.5">{errors.handler}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
              <FileText size={14} />
              处理措施及结果 <span className="text-alert-red">*</span>
            </label>
            <textarea
              value={resolution}
              maxLength={500}
              onChange={(e) => {
                setResolution(e.target.value);
                if (errors.resolution) setErrors({ ...errors, resolution: undefined });
              }}
              rows={4}
              placeholder="请详细描述与司机的沟通情况、问题原因、处理措施和结果..."
              className={cn(
                'w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none resize-none',
                errors.resolution
                  ? 'border-alert-red focus:ring-2 focus:ring-alert-red/20 bg-alert-red/5'
                  : 'border-slate-200 focus:ring-2 focus:ring-navy-500/20 focus:border-navy-500'
              )}
            />
            {errors.resolution && (
              <p className="text-xs text-alert-red mt-1.5">{errors.resolution}</p>
            )}
            <p className="text-xs text-slate-400 mt-1.5">
              建议记录：联系情况、原因分析、采取措施、对学生的影响、后续预防
            </p>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-white border border-slate-200 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-alert-green hover:bg-alert-green/90 text-white rounded-lg text-sm font-medium transition-all shadow-md shadow-alert-green/30"
          >
            <CheckCircle2 size={16} />
            确认处理完成
          </button>
        </div>
      </div>
    </>
  );
}
