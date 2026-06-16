import { Filter, GraduationCap, Route, AlertTriangle, X } from 'lucide-react';
import { useBusStore } from '@/store/busStore';
import { allGrades, allRoutes } from '@/data/buses';
import { cn } from '@/utils/format';

export default function FilterBar() {
  const { filters, setFilters } = useBusStore();

  const riskOptions = [
    { value: 'all', label: '全部状态', color: 'text-slate-600' },
    { value: 'low', label: '正常', color: 'text-alert-green' },
    { value: 'medium', label: '关注', color: 'text-alert-orange' },
    { value: 'high', label: '预警', color: 'text-alert-red' },
  ];

  const hasActiveFilter =
    filters.grade !== 'all' || filters.route !== 'all' || filters.risk !== 'all';

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2 text-slate-600">
          <Filter size={18} />
          <span className="font-medium text-sm">筛选条件</span>
        </div>

        <div className="flex items-center gap-2">
          <GraduationCap size={16} className="text-slate-400" />
          <select
            value={filters.grade}
            onChange={(e) => setFilters({ grade: e.target.value as any })}
            className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-500/30 focus:border-navy-500 transition-all cursor-pointer"
          >
            <option value="all">全部年级</option>
            {allGrades.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Route size={16} className="text-slate-400" />
          <select
            value={filters.route}
            onChange={(e) => setFilters({ route: e.target.value })}
            className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-500/30 focus:border-navy-500 transition-all cursor-pointer"
          >
            <option value="all">全部线路</option>
            {allRoutes.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <AlertTriangle size={16} className="text-slate-400" />
          <div className="flex gap-1">
            {riskOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilters({ risk: opt.value as any })}
                className={cn(
                  'text-sm px-3 py-1.5 rounded-lg transition-all duration-200',
                  filters.risk === opt.value
                    ? 'bg-navy-800 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                  filters.risk === opt.value && opt.color
                )}
              >
                <span className={cn(filters.risk === opt.value ? '' : opt.color)}>
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {hasActiveFilter && (
          <button
            onClick={() =>
              setFilters({ grade: 'all', route: 'all', risk: 'all' })
            }
            className="ml-auto flex items-center gap-1 text-sm text-slate-500 hover:text-alert-red transition-colors"
          >
            <X size={14} />
            清除筛选
          </button>
        )}
      </div>
    </div>
  );
}
