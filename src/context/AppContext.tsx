import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {
  CartItem,
  Order,
  OrderStatus,
  Page,
  Role,
  User,
} from '@/types';
import { initialOrders, menuItems } from '@/data/mockData';

interface AppContextValue {
  currentPage: Page;
  navigate: (page: Page) => void;

  user: User | null;
  login: (role: Role) => void;
  logout: () => void;

  cart: CartItem[];
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  orders: Order[];
  placeOrder: (pickupTime: string) => Order | undefined;
  updateOrderStatus: (orderId: number, status: OrderStatus) => void;

  showCart: boolean;
  setShowCart: (show: boolean) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [showCart, setShowCart] = useState(false);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const login = useCallback((role: Role) => {
    if (role === 'admin') {
      setUser({ name: 'Admin', email: 'admin@campus.edu', role: 'admin' });
    } else {
      setUser({ name: 'Rahul Sharma', email: 'rahul@campus.edu', role: 'student' });
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCurrentPage('home');
    setCart([]);
  }, []);

  const addToCart = useCallback((itemId: string) => {
    const item = menuItems.find((m) => m.id === itemId);
    if (!item) return;
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === itemId);
      if (existing) {
        return prev.map((c) =>
          c.item.id === itemId ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.item.id === itemId ? { ...c, quantity: c.quantity + delta } : c
        )
        .filter((c) => c.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = useMemo(
    () => cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0),
    [cart],
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, c) => sum + c.quantity, 0),
    [cart],
  );

  const placeOrder = useCallback(
    (pickupTime: string) => {
      if (cart.length === 0) return undefined;
      const newOrder: Order = {
        id: 1028 + orders.length,
        items: [...cart],
        total: cartTotal,
        status: 'placed',
        pickupTime,
        placedAt: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
        estimatedPrepTime: Math.max(
          ...cart.map((c) => c.item.prepTime),
          8,
        ),
      };
      setOrders((prev) => [newOrder, ...prev]);
      setCart([]);
      return newOrder;
    },
    [cart, cartTotal, orders.length],
  );

  const updateOrderStatus = useCallback(
    (orderId: number, status: OrderStatus) => {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
      );
    },
    [],
  );

  const value: AppContextValue = {
    currentPage,
    navigate,
    user,
    login,
    logout,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    orders,
    placeOrder,
    updateOrderStatus,
    showCart,
    setShowCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
