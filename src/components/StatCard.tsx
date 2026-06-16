import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/utils/format';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'green' | 'red' | 'blue' | 'orange';
  trend?: 'up' | 'down';
  trendValue?: string;
  subtitle?: string;
}

const colorMap = {
  green: {
    bg: 'bg-alert-green/10',
    text: 'text-alert-green',
    border: 'border-alert-green/20',
    ring: 'ring-alert-green/20',
  },
  red: {
    bg: 'bg-alert-red/10',
    text: 'text-alert-red',
    border: 'border-alert-red/20',
    ring: 'ring-alert-red/20',
  },
  blue: {
    bg: 'bg-navy-500/10',
    text: 'text-navy-600',
    border: 'border-navy-500/20',
    ring: 'ring-navy-500/20',
  },
  orange: {
    bg: 'bg-alert-orange/10',
    text: 'text-alert-orange',
    border: 'border-alert-orange/20',
    ring: 'ring-alert-orange/20',
  },
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  trend,
  trendValue,
  subtitle,
}: StatCardProps) {
  const colors = colorMap[color];

  return (
    <div
      className={cn(
        'bg-white rounded-xl p-5 border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5',
        colors.border
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-bold text-navy-800 mt-2 font-mono tracking-tight">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
          )}
          {trend && trendValue && (
            <div
              className={cn(
                'flex items-center gap-1 mt-2 text-xs font-medium',
                trend === 'up' ? 'text-alert-green' : 'text-alert-red'
              )}
            >
              {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center ring-4',
            colors.bg,
            colors.text,
            colors.ring
          )}
        >
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
