export interface Driver {
  id: string;
  name: string;
  phone: string;
  avatar: string;
}

export interface Attendant {
  id: string;
  name: string;
  phone: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  className: string;
  isOnBoard: boolean;
  busId: string;
  boardTime?: string;
}

export interface RouteStop {
  id: string;
  name: string;
  order: number;
  eta: string;
  isCompleted: boolean;
}

export interface Route {
  id: string;
  name: string;
  color: string;
  stops: RouteStop[];
}

export type BusStatus = 'online' | 'offline';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface Bus {
  id: string;
  plateNumber: string;
  driver: Driver;
  attendant: Attendant;
  currentPassengers: number;
  capacity: number;
  route: Route;
  status: BusStatus;
  riskLevel: RiskLevel;
  location: { lat: number; lng: number; x: number; y: number };
  nextStop?: RouteStop;
  students: Student[];
  isDeviating: boolean;
  lastUpdate: string;
  speed: number;
}

export type AlertType = 'deviation' | 'stop' | 'restricted';
export type AlertStatus = 'pending' | 'resolved';

export interface Alert {
  id: string;
  busId: string;
  busPlateNumber: string;
  type: AlertType;
  description: string;
  location: string;
  timestamp: Date;
  status: AlertStatus;
  handler?: string;
  resolution?: string;
  resolvedAt?: Date;
  duration?: number;
}

export interface ChecklistItem {
  busId: string;
  plateNumber: string;
  isOnline: boolean;
  isGpsNormal: boolean;
  isDriverConfirmed: boolean;
  driverName: string;
  driverPhone: string;
  routeName: string;
  expectedDeparture: string;
}

export type FilterGrade = 'all' | '一年级' | '二年级' | '三年级' | '四年级' | '五年级' | '六年级';
export type FilterRoute = 'all' | string;
export type FilterRisk = 'all' | RiskLevel;

export interface FilterState {
  grade: FilterGrade;
  route: FilterRoute;
  risk: FilterRisk;
}
