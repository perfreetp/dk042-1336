import type { Bus, Route, RouteStop, Student } from '@/types';

const routes: Route[] = [
  {
    id: 'r1',
    name: '1号线 - 城东线',
    color: '#E63946',
    stops: [
      { id: 's1', name: '阳光花园南门', order: 1, eta: '07:05', isCompleted: true },
      { id: 's2', name: '东方明珠小区', order: 2, eta: '07:12', isCompleted: true },
      { id: 's3', name: '翠湖公园站', order: 3, eta: '07:20', isCompleted: false },
      { id: 's4', name: '实验小学本部', order: 4, eta: '07:35', isCompleted: false },
    ],
  },
  {
    id: 'r2',
    name: '2号线 - 城西线',
    color: '#2A9D8F',
    stops: [
      { id: 's5', name: '绿城春晓', order: 1, eta: '06:55', isCompleted: true },
      { id: 's6', name: '万达广场西', order: 2, eta: '07:05', isCompleted: true },
      { id: 's7', name: '西山公园', order: 3, eta: '07:15', isCompleted: false },
      { id: 's8', name: '实验小学本部', order: 4, eta: '07:30', isCompleted: false },
    ],
  },
  {
    id: 'r3',
    name: '3号线 - 城南线',
    color: '#F4A261',
    stops: [
      { id: 's9', name: '江南明珠', order: 1, eta: '07:00', isCompleted: true },
      { id: 's10', name: '滨江花园', order: 2, eta: '07:10', isCompleted: false },
      { id: 's11', name: '南站换乘中心', order: 3, eta: '07:22', isCompleted: false },
      { id: 's12', name: '实验小学本部', order: 4, eta: '07:40', isCompleted: false },
    ],
  },
  {
    id: 'r4',
    name: '4号线 - 城北线',
    color: '#264653',
    stops: [
      { id: 's13', name: '北国风光', order: 1, eta: '06:50', isCompleted: true },
      { id: 's14', name: '北辰花园', order: 2, eta: '07:02', isCompleted: true },
      { id: 's15', name: '大学城北', order: 3, eta: '07:15', isCompleted: false },
      { id: 's16', name: '实验小学本部', order: 4, eta: '07:32', isCompleted: false },
    ],
  },
  {
    id: 'r5',
    name: '5号线 - 开发专线',
    color: '#8338EC',
    stops: [
      { id: 's17', name: '开发区管委会', order: 1, eta: '07:08', isCompleted: false },
      { id: 's18', name: '科技园东门', order: 2, eta: '07:18', isCompleted: false },
      { id: 's19', name: '创业大厦', order: 3, eta: '07:28', isCompleted: false },
      { id: 's20', name: '实验小学本部', order: 4, eta: '07:45', isCompleted: false },
    ],
  },
];

const generateStudents = (busId: string, count: number, gradeBase: number): Student[] => {
  const names = ['张伟', '李娜', '王芳', '刘洋', '陈静', '杨帆', '赵磊', '黄敏', '周涛', '吴婷',
    '徐强', '孙丽', '马超', '朱琳', '胡军', '郭燕', '林峰', '何雪', '罗宇', '梁佳'];
  const onBoardCount = Math.floor(count * 0.7);
  return Array.from({ length: count }, (_, i) => {
    const isOnBoard = i < onBoardCount;
    const minutes = 5 + i * 2;
    const clampedMinutes = Math.min(minutes, 59);
    return {
      id: `stu-${busId}-${i + 1}`,
      name: names[i % names.length] + (i >= names.length ? String(i - names.length + 1) : ''),
      grade: `${gradeBase + Math.floor(i / 8)}年级`,
      className: `${(i % 4) + 1}班`,
      isOnBoard,
      busId,
      boardTime: isOnBoard ? `07:${String(clampedMinutes).padStart(2, '0')}` : undefined,
    };
  });
};

const buildBus = (
  id: string,
  plateNumber: string,
  driver: { id: string; name: string; phone: string; avatar: string },
  attendant: { id: string; name: string; phone: string },
  capacity: number,
  route: Route,
  status: 'online' | 'offline',
  riskLevel: 'low' | 'medium' | 'high',
  location: { lat: number; lng: number; x: number; y: number },
  nextStop: RouteStop | undefined,
  studentCount: number,
  gradeBase: number,
  isDeviating: boolean,
  lastUpdate: string,
  speed: number,
  overrideStudents?: Student[]
): Bus => {
  const students = overrideStudents ?? generateStudents(id, studentCount, gradeBase);
  return {
    id,
    plateNumber,
    driver,
    attendant,
    currentPassengers: students.filter((s) => s.isOnBoard).length,
    capacity,
    route,
    status,
    riskLevel,
    location,
    nextStop,
    students,
    isDeviating,
    lastUpdate,
    speed,
  };
};

export const mockBuses: Bus[] = [
  buildBus('bus1', '京A·88881',
    { id: 'd1', name: '张建国', phone: '138****1234', avatar: '张' },
    { id: 'a1', name: '李秀英', phone: '139****5678' },
    45, routes[0], 'online', 'low',
    { lat: 39.92, lng: 116.46, x: 35, y: 45 },
    routes[0].stops[2], 28, 1, false, '刚刚', 32),
  buildBus('bus2', '京A·88882',
    { id: 'd2', name: '王德福', phone: '138****2345', avatar: '王' },
    { id: 'a2', name: '张桂芳', phone: '139****6789' },
    45, routes[1], 'online', 'medium',
    { lat: 39.91, lng: 116.35, x: 65, y: 35 },
    routes[1].stops[2], 35, 3, false, '1分钟前', 18),
  buildBus('bus3', '京A·88883',
    { id: 'd3', name: '李卫东', phone: '138****3456', avatar: '李' },
    { id: 'a3', name: '王秀兰', phone: '139****7890' },
    45, routes[2], 'online', 'high',
    { lat: 39.87, lng: 116.42, x: 48, y: 72 },
    routes[2].stops[1], 22, 2, true, '刚刚', 0),
  buildBus('bus4', '京A·88884',
    { id: 'd4', name: '赵志明', phone: '138****4567', avatar: '赵' },
    { id: 'a4', name: '刘淑珍', phone: '139****8901' },
    45, routes[3], 'online', 'low',
    { lat: 39.98, lng: 116.40, x: 52, y: 18 },
    routes[3].stops[2], 31, 4, false, '2分钟前', 40),
  buildBus('bus5', '京A·88885',
    { id: 'd5', name: '孙永强', phone: '138****5678', avatar: '孙' },
    { id: 'a5', name: '陈美玲', phone: '139****9012' },
    45, routes[4], 'offline', 'high',
    { lat: 39.95, lng: 116.55, x: 82, y: 28 },
    undefined, 38, 5, false, '15分钟前', 0,
    generateStudents('bus5', 38, 5).map((s) => ({ ...s, isOnBoard: false, boardTime: undefined }))),
  buildBus('bus6', '京A·88886',
    { id: 'd6', name: '周文博', phone: '138****6789', avatar: '周' },
    { id: 'a6', name: '吴雅琴', phone: '139****0123' },
    45, routes[0], 'online', 'low',
    { lat: 39.93, lng: 116.50, x: 22, y: 52 },
    routes[0].stops[3], 38, 1, false, '刚刚', 28),
];

export const allGrades = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'];
export const allRoutes = routes.map(r => r.name);
