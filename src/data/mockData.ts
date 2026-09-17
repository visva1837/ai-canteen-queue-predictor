import type {
  CrowdDataPoint,
  MenuItem,
  NotificationItem,
  Order,
  PredictionFactor,
  PredictionSlot,
} from '@/types';

export const currentCrowd = 42;
export const averageServiceTime = 2.5;
export const currentWaitingTime = Math.round(currentCrowd * averageServiceTime);

export const predictionSlots: PredictionSlot[] = [
  { time: '12:45 PM', label: '12:45', crowd: 48, level: 'HIGH' },
  { time: '1:00 PM', label: '13:00', crowd: 52, level: 'HIGH' },
  { time: '1:15 PM', label: '13:15', crowd: 36, level: 'MEDIUM' },
  { time: '1:30 PM', label: '13:30', crowd: 22, level: 'LOW' },
  { time: '1:45 PM', label: '13:45', crowd: 15, level: 'LOW' },
];

export const crowdByTime: CrowdDataPoint[] = [
  { time: '11:00 AM', label: '11:00', crowd: 8, waitingTime: 4, orders: 12 },
  { time: '11:15 AM', label: '11:15', crowd: 12, waitingTime: 5, orders: 18 },
  { time: '11:30 AM', label: '11:30', crowd: 18, waitingTime: 8, orders: 28 },
  { time: '11:45 AM', label: '11:45', crowd: 28, waitingTime: 12, orders: 45 },
  { time: '12:00 PM', label: '12:00', crowd: 38, waitingTime: 16, orders: 62 },
  { time: '12:15 PM', label: '12:15', crowd: 45, waitingTime: 18, orders: 78 },
  { time: '12:30 PM', label: '12:30', crowd: 52, waitingTime: 22, orders: 92 },
  { time: '12:45 PM', label: '12:45', crowd: 48, waitingTime: 18, orders: 85 },
  { time: '1:00 PM', label: '13:00', crowd: 52, waitingTime: 20, orders: 88 },
  { time: '1:15 PM', label: '13:15', crowd: 36, waitingTime: 14, orders: 65 },
  { time: '1:30 PM', label: '13:30', crowd: 22, waitingTime: 9, orders: 42 },
  { time: '1:45 PM', label: '13:45', crowd: 15, waitingTime: 6, orders: 28 },
  { time: '2:00 PM', label: '14:00', crowd: 8, waitingTime: 4, orders: 15 },
];

export const predictionFactors: PredictionFactor[] = [
  { label: 'Current Queue Size', value: '42 students', weight: 95, icon: 'Users' },
  { label: 'Historical Crowd Data', value: 'Mon–Fri avg', weight: 90, icon: 'BarChart3' },
  { label: 'Time of Day', value: '12:35 PM', weight: 85, icon: 'Clock' },
  { label: 'Day of Week', value: 'Wednesday', weight: 80, icon: 'Calendar' },
  { label: 'Active Orders', value: '24 active', weight: 78, icon: 'ShoppingBag' },
  { label: 'Lunch-break Patterns', value: '12:00–1:00 PM peak', weight: 88, icon: 'TrendingUp' },
];

export const aiConfidence = 92;

export const recommendedTime = '1:30 PM';

export const adminPrediction = {
  current: 42,
  in15Min: 51,
  in30Min: 34,
  confidence: 92,
};

export const adminStats = {
  currentQueue: 42,
  waitingTime: 18,
  todayOrders: 386,
  activeOrders: 24,
  peakTime: '12:30–1:00 PM',
  averageDailyCrowd: 28,
  averageWaitingTime: 12,
  ordersPerHour: 65,
};

export const menuItems: MenuItem[] = [
  {
    id: 'veg-meals',
    name: 'Veg Meals',
    price: 70,
    description: 'Complete thali with rice, dal, sabzi, roti, and salad',
    category: 'Meals',
    image: 'https://images.pexels.com/photos/32797056/pexels-photo-32797056.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    prepTime: 10,
  },
  {
    id: 'chicken-rice',
    name: 'Chicken Rice',
    price: 100,
    description: 'Aromatic chicken biryani with raita and salan',
    category: 'Meals',
    image: 'https://images.pexels.com/photos/9609860/pexels-photo-9609860.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    prepTime: 15,
  },
  {
    id: 'paneer-thali',
    name: 'Paneer Thali',
    price: 90,
    description: 'Paneer curry with naan, rice, and assorted dips',
    category: 'Meals',
    image: 'https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    prepTime: 12,
  },
  {
    id: 'samosa',
    name: 'Samosa (2 pcs)',
    price: 20,
    description: 'Crispy golden fried samosas with potato filling',
    category: 'Snacks',
    image: 'https://images.pexels.com/photos/37153389/pexels-photo-37153389.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    prepTime: 5,
  },
  {
    id: 'sandwich',
    name: 'Veg Sandwich',
    price: 50,
    description: 'Fresh vegetable sandwich with cheese and lettuce',
    category: 'Snacks',
    image: 'https://images.pexels.com/photos/24796900/pexels-photo-24796900.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    prepTime: 7,
  },
  {
    id: 'fries',
    name: 'French Fries',
    price: 60,
    description: 'Crispy golden fries served with ketchup',
    category: 'Snacks',
    image: 'https://images.pexels.com/photos/5836772/pexels-photo-5836772.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    prepTime: 8,
  },
  {
    id: 'fresh-juice',
    name: 'Fresh Juice',
    price: 40,
    description: 'Refreshing freshly squeezed orange juice',
    category: 'Drinks',
    image: 'https://images.pexels.com/photos/5668181/pexels-photo-5668181.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    prepTime: 3,
  },
  {
    id: 'tea',
    name: 'Masala Tea',
    price: 15,
    description: 'Traditional Indian masala chai with spices',
    category: 'Drinks',
    image: 'https://images.pexels.com/photos/34344554/pexels-photo-34344554.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    prepTime: 4,
  },
  {
    id: 'coffee',
    name: 'Cappuccino',
    price: 50,
    description: 'Creamy cappuccino with rich latte art',
    category: 'Drinks',
    image: 'https://images.pexels.com/photos/6747870/pexels-photo-6747870.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    prepTime: 5,
  },
  {
    id: 'burger',
    name: 'Veg Burger',
    price: 80,
    description: 'Loaded veg burger with crispy patty and fresh veggies',
    category: 'Fast Food',
    image: 'https://images.pexels.com/photos/5374419/pexels-photo-5374419.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    prepTime: 10,
  },
  {
    id: 'pizza',
    name: 'Pizza Slice',
    price: 90,
    description: 'Cheesy pepperoni pizza slice with melted mozzarella',
    category: 'Fast Food',
    image: 'https://images.pexels.com/photos/31587831/pexels-photo-31587831.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    prepTime: 12,
  },
  {
    id: 'burger-meal',
    name: 'Burger Combo',
    price: 120,
    description: 'Cheese burger with fries and a drink',
    category: 'Fast Food',
    image: 'https://images.pexels.com/photos/36007382/pexels-photo-36007382.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    prepTime: 14,
  },
];

export const initialOrders: Order[] = [
  {
    id: 1024,
    items: [
      { item: menuItems[1], quantity: 1 },
      { item: menuItems[6], quantity: 1 },
    ],
    total: 140,
    status: 'preparing',
    pickupTime: '1:30 PM',
    placedAt: '12:20 PM',
    estimatedPrepTime: 12,
  },
  {
    id: 1025,
    items: [
      { item: menuItems[0], quantity: 2 },
    ],
    total: 140,
    status: 'ready',
    pickupTime: '1:15 PM',
    placedAt: '12:10 PM',
    estimatedPrepTime: 10,
  },
  {
    id: 1026,
    items: [
      { item: menuItems[3], quantity: 2 },
      { item: menuItems[7], quantity: 1 },
    ],
    total: 55,
    status: 'placed',
    pickupTime: '1:45 PM',
    placedAt: '12:30 PM',
    estimatedPrepTime: 8,
  },
  {
    id: 1027,
    items: [
      { item: menuItems[9], quantity: 1 },
      { item: menuItems[5], quantity: 1 },
    ],
    total: 140,
    status: 'collected',
    pickupTime: '12:45 PM',
    placedAt: '12:00 PM',
    estimatedPrepTime: 10,
  },
];

export const notifications: NotificationItem[] = [
  {
    id: 1,
    type: 'danger',
    message: 'Canteen crowd is currently HIGH. 42 students in queue.',
    time: 'Just now',
  },
  {
    id: 2,
    type: 'warning',
    message: 'Crowd expected to decrease at 1:15 PM to MEDIUM level.',
    time: '5 min ago',
  },
  {
    id: 3,
    type: 'success',
    message: 'Best time to visit: 1:30 PM. Lowest predicted crowd.',
    time: '10 min ago',
  },
  {
    id: 4,
    type: 'info',
    message: 'Your preorder #1024 is being prepared. Ready in ~12 min.',
    time: '15 min ago',
  },
];

export const pickupTimeOptions = [
  { time: '1:15 PM', crowd: 'MEDIUM', reason: 'Moderate crowd, shorter queue' },
  { time: '1:30 PM', crowd: 'LOW', reason: 'Lower predicted crowd and shorter waiting time' },
  { time: '1:45 PM', crowd: 'LOW', reason: 'Very low crowd, minimal waiting' },
];
