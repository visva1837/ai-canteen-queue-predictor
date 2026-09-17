import {
  ClipboardList,
  ChefHat,
  Package,
  CheckCircle2,
  Clock,
  Play,
  Check,
  ArrowRight,
  UtensilsCrossed,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Order, OrderStatus } from '@/types';

const columns: { status: OrderStatus; label: string; icon: typeof Package; color: string }[] = [
  { status: 'placed', label: 'Incoming', icon: ClipboardList, color: 'blue' },
  { status: 'preparing', label: 'Preparing', icon: ChefHat, color: 'amber' },
  { status: 'ready', label: 'Ready', icon: Package, color: 'green' },
  { status: 'collected', label: 'Completed', icon: CheckCircle2, color: 'slate' },
];

const nextStatus: Record<OrderStatus, OrderStatus | null> = {
  placed: 'preparing',
  preparing: 'ready',
  ready: 'collected',
  collected: null,
};

const nextActionLabel: Record<OrderStatus, string> = {
  placed: 'Start Preparing',
  preparing: 'Mark Ready',
  ready: 'Complete Order',
  collected: '',
};

export function StaffView() {
  const { orders, updateOrderStatus } = useApp();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">
              Canteen Staff View
            </h1>
            <p className="mt-1 text-slate-500">
              Manage incoming orders and update status
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-700">Kitchen Open</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {columns.map((col) => {
            const count = orders.filter((o) => o.status === col.status).length;
            const Icon = col.icon;
            const colors: Record<string, string> = {
              blue: 'bg-blue-50 text-blue-600',
              amber: 'bg-amber-50 text-amber-600',
              green: 'bg-green-50 text-green-600',
              slate: 'bg-slate-100 text-slate-500',
            };
            return (
              <div key={col.status} className="rounded-xl bg-white border border-slate-200 shadow-sm p-3 lg:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${colors[col.color]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-slate-500 hidden sm:inline">{col.label}</span>
                </div>
                <p className="text-xl lg:text-2xl font-bold text-slate-800">{count}</p>
                <p className="text-[10px] text-slate-400 sm:hidden">{col.label}</p>
              </div>
            );
          })}
        </div>

        {/* Kanban columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => {
            const colOrders = orders.filter((o) => o.status === col.status);
            const Icon = col.icon;
            const colors: Record<string, { bg: string; border: string; text: string }> = {
              blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
              amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
              green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
              slate: { bg: 'bg-slate-100', border: 'border-slate-200', text: 'text-slate-600' },
            };
            const c = colors[col.color];

            return (
              <div key={col.status} className={`rounded-2xl ${c.bg} ${c.border} border p-4`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${c.text}`} />
                    <h3 className={`font-display font-bold ${c.text}`}>{col.label}</h3>
                  </div>
                  <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${c.text} bg-white/60`}>
                    {colOrders.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {colOrders.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-sm text-slate-400">No orders</p>
                    </div>
                  ) : (
                    colOrders.map((order) => (
                      <StaffOrderCard
                        key={order.id}
                        order={order}
                        onUpdateStatus={updateOrderStatus}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StaffOrderCard({
  order,
  onUpdateStatus,
}: {
  order: Order;
  onUpdateStatus: (id: number, status: OrderStatus) => void;
}) {
  const next = nextStatus[order.status];
  const actionLabel = nextActionLabel[order.status];

  return (
    <div className="rounded-xl bg-white border border-slate-200 shadow-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-display font-bold text-slate-800">#{order.id}</span>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {order.pickupTime}
        </span>
      </div>

      <div className="space-y-1.5 mb-3">
        {order.items.map(({ item, quantity }) => (
          <div key={item.id} className="flex items-center gap-2">
            <img src={item.image} alt={item.name} className="w-6 h-6 rounded object-cover" />
            <span className="text-sm text-slate-600 flex-1">{item.name}</span>
            <span className="text-xs font-semibold text-slate-500">×{quantity}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <span className="text-sm font-semibold text-slate-700">₹{order.total}</span>
        {next && actionLabel && (
          <button
            onClick={() => onUpdateStatus(order.id, next)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              order.status === 'placed'
                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                : order.status === 'preparing'
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {order.status === 'placed' && <Play className="w-3 h-3" />}
            {order.status === 'preparing' && <Check className="w-3 h-3" />}
            {order.status === 'ready' && <ArrowRight className="w-3 h-3" />}
            {actionLabel}
          </button>
        )}
        {order.status === 'collected' && (
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Done
          </span>
        )}
      </div>
    </div>
  );
}
