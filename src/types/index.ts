export type CrowdLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type Role = 'student' | 'admin';

export type Page =
  | 'home'
  | 'login'
  | 'dashboard'
  | 'prediction'
  | 'menu'
  | 'orders'
  | 'notifications'
  | 'admin'
  | 'staff';

export interface User {
  name: string;
  email: string;
  role: Role;
}

export interface PredictionSlot {
  time: string;
  label: string;
  crowd: number;
  level: CrowdLevel;
}

export interface CrowdDataPoint {
  time: string;
  label: string;
  crowd: number;
  waitingTime: number;
  orders: number;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Meals' | 'Snacks' | 'Drinks' | 'Fast Food';
  image: string;
  prepTime: number;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type OrderStatus = 'placed' | 'preparing' | 'ready' | 'collected';

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  pickupTime: string;
  placedAt: string;
  estimatedPrepTime: number;
}

export interface NotificationItem {
  id: number;
  type: 'danger' | 'warning' | 'success' | 'info';
  message: string;
  time: string;
}

export interface PredictionFactor {
  label: string;
  value: string;
  weight: number;
  icon: string;
}
