export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateTime = (date: Date): string => {
  return date.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getAlertTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    deviation: '路线偏离',
    stop: '长时间停留',
    restricted: '接近禁停区',
  };
  return labels[type] || type;
};

export const getRiskLevelLabel = (level: string): string => {
  const labels: Record<string, string> = {
    low: '正常',
    medium: '关注',
    high: '预警',
  };
  return labels[level] || level;
};

export const getAlertTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    deviation: 'bg-alert-red text-white',
    stop: 'bg-alert-orange text-white',
    restricted: 'bg-purple-600 text-white',
  };
  return colors[type] || 'bg-gray-500 text-white';
};

export const getRiskLevelColor = (level: string): string => {
  const colors: Record<string, string> = {
    low: 'bg-alert-green text-white',
    medium: 'bg-alert-yellow text-navy-800',
    high: 'bg-alert-red text-white',
  };
  return colors[level] || 'bg-gray-500 text-white';
};

export const cn = (...classes: (string | false | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

const VALID_COLORS = new Set([
  '#E63946', '#2A9D8F', '#F4A261', '#264653', '#8338EC',
  '#94A3B8', '#0F2A4A',
]);

export const sanitizeColor = (color: string): string => {
  if (VALID_COLORS.has(color)) return color;
  if (/^#[0-9A-Fa-f]{6}$/.test(color)) return color;
  return '#94A3B8';
};
