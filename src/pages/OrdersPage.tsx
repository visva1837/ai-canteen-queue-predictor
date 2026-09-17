import {
  ClipboardList,
  Clock,
  Package,
  ChefHat,
  CheckCircle2,
  ShoppingBag,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Order, OrderStatus } from '@/types';

const statusSteps: { status: OrderStatus; label: string; icon: typeof Package }[] = [
  { status: 'placed', label: 'Order Placed', icon: ShoppingBag },
  { status: 'preparing', label: 'Preparing', icon: ChefHat },
  { status: 'ready', label: 'Ready', icon: Package },
  { status: 'collected', label: 'Collected', icon: CheckCircle2 },
];

function getStatusIndex(status: OrderStatus): number {
  return statusSteps.findIndex((s) => s.status === status);
}

export function OrdersPage() {
  const { orders, navigate } = useApp();
  const userOrders = orders.filter((o) => o.status !== 'collected' || true).slice(0, 10);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">
            My Orders
          </h1>
          <p className="mt-1 text-slate-500">Track your preorders and order history</p>
        </div>

        {userOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <ClipboardList className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="font-display text-lg font-semibold text-slate-700 mb-1">
              No orders yet
            </h3>
            <p className="text-sm text-slate-500 mb-4">Browse the menu and place your first preorder</p>
            <button
              onClick={() => navigate('menu')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors"
            >
              Browse Menu <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {userOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const currentIndex = getStatusIndex(order.status);
  const isComplete = order.status === 'collected';

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50">
            <ClipboardList className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-display font-bold text-slate-800">Order #{order.id}</p>
            <p className="text-xs text-slate-500">Placed at {order.placedAt}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            order.status === 'placed' ? 'bg-blue-50 text-blue-700'
            : order.status === 'preparing' ? 'bg-amber-50 text-amber-700'
            : order.status === 'ready' ? 'bg-green-50 text-green-700'
            : 'bg-slate-100 text-slate-500'
          }`}>
            {order.status === 'placed' ? 'Order Placed' : order.status === 'preparing' ? 'Preparing' : order.status === 'ready' ? 'Ready for Pickup' : 'Collected'}
          </span>
          <span className="font-display text-lg font-bold text-slate-800">₹{order.total}</span>
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-wrap gap-2 mb-5">
        {order.items.map(({ item, quantity }) => (
          <div key={item.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
            <img src={item.image} alt={item.name} className="w-6 h-6 rounded object-cover" />
            <span className="text-sm text-slate-600">{item.name}</span>
            <span className="text-xs font-semibold text-slate-500">×{quantity}</span>
          </div>
        ))}
      </div>

      {/* Status timeline */}
      <div className="relative">
        <div className="flex items-center justify-between">
          {statusSteps.map((step, i) => {
            const Icon = step.icon;
            const isDone = i <= currentIndex;
            const isCurrent = i === currentIndex && !isComplete;
            return (
              <div key={step.status} className="flex flex-col items-center flex-1 relative">
                {i < statusSteps.length - 1 && (
                  <div className={`absolute top-5 left-1/2 w-full h-0.5 ${i < currentIndex ? 'bg-blue-500' : 'bg-slate-200'}`} />
                )}
                <div
                  className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                    isDone
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-400'
                  } ${isCurrent ? 'ring-4 ring-blue-100' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                  {isCurrent && (
                    <span className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping" />
                  )}
                </div>
                <span className={`mt-2 text-[10px] sm:text-xs font-medium ${isDone ? 'text-slate-700' : 'text-slate-400'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info */}
      {!isComplete && (
        <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-xl bg-slate-50 p-3">
          <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <p className="text-sm text-slate-600">
            {order.status === 'ready'
              ? 'Your order is ready for pickup!'
              : `Your order will be ready in approximately ${order.estimatedPrepTime} minutes.`}
          </p>
          <div className="sm:ml-auto flex items-center gap-1.5 text-sm">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">Pickup: {order.pickupTime}</span>
          </div>
        </div>
      )}
    </div>
  );
}
