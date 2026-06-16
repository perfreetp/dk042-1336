import { Bell, Clock, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePendingAlertCount } from '@/store/alertStore';

export default function TopBar({ title }: { title: string }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const pendingCount = usePendingAlertCount();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = currentTime.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const dateStr = currentTime.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-navy-800">{title}</h2>
        <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
          <Clock size={14} />
          <span>{dateStr}</span>
          <span className="text-slate-300">|</span>
          <span className="font-mono text-navy-600 font-medium">{timeStr}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
          <RefreshCw size={16} />
          <span className="text-sm">刷新数据</span>
        </button>

        <button className="relative w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
          <Bell size={20} />
          {pendingCount > 0 && (
            <span className="absolute top-1 right-1 w-5 h-5 bg-alert-red text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
              {pendingCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
