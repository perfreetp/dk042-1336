import { NavLink } from 'react-router-dom';
import { Bus, AlertTriangle, ClipboardCheck, School, Settings } from 'lucide-react';
import { cn } from '@/utils/format';
import { usePendingAlertCount } from '@/store/alertStore';

const navItems = [
  { to: '/', label: '实时护航台', icon: Bus },
  { to: '/alerts', label: '路线偏离提醒', icon: AlertTriangle },
  { to: '/preparation', label: '放学前准备', icon: ClipboardCheck },
];

export default function Sidebar() {
  const pendingCount = usePendingAlertCount();

  return (
    <aside className="w-64 bg-navy-800 min-h-screen flex flex-col text-white">
      <div className="h-16 flex items-center gap-3 px-6 border-b border-navy-700">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-alert-green to-navy-500 flex items-center justify-center">
          <School size={22} className="text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg">校车护航台</h1>
          <p className="text-xs text-navy-300">实验小学 v1.0</p>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3">
        <p className="px-3 py-2 text-xs font-medium text-navy-400 uppercase tracking-wider">
          运营管理
        </p>
        <ul className="space-y-1 mt-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                    isActive
                      ? 'bg-navy-600 text-white shadow-lg shadow-navy-900/50'
                      : 'text-navy-200 hover:bg-navy-700/60 hover:text-white'
                  )
                }
              >
                <item.icon size={18} className="flex-shrink-0" />
                <span className="text-sm font-medium flex-1">{item.label}</span>
                {item.to === '/alerts' && pendingCount > 0 && (
                  <span className="bg-alert-red text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                    {pendingCount}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-3 border-t border-navy-700">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-navy-200 hover:bg-navy-700/60 hover:text-white transition-colors">
          <Settings size={18} />
          <span className="text-sm font-medium">系统设置</span>
        </button>
        <div className="mt-3 flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 rounded-full bg-alert-green/20 flex items-center justify-center text-alert-green font-bold text-sm">
            管
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">王主任</p>
            <p className="text-xs text-navy-400 truncate">校车管理员</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
