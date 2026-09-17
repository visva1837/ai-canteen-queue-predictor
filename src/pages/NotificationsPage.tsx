import {
  Bell,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  TrendingUp,
  Activity,
  Clock,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CrowdBadge } from '@/components/CrowdBadge';
import { notifications, predictionSlots, recommendedTime } from '@/data/mockData';

export function NotificationsPage() {
  const { navigate, orders } = useApp();

  const typeConfig = {
    danger: { icon: AlertCircle, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', iconColor: 'text-red-500' },
    warning: { icon: AlertTriangle, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', iconColor: 'text-amber-500' },
    success: { icon: CheckCircle2, bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', iconColor: 'text-green-500' },
    info: { icon: Info, bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', iconColor: 'text-blue-500' },
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-6 lg:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">
            Notifications & Alerts
          </h1>
          <p className="mt-1 text-slate-500">
            Stay updated on crowd conditions and your orders
          </p>
        </div>

        {/* Quick status summary */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-red-500" />
              <span className="text-xs font-medium text-slate-500">Current Status</span>
            </div>
            <CrowdBadge level="HIGH" />
            <p className="text-xs text-slate-400 mt-2">42 students in queue</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-slate-500">Best Time</span>
            </div>
            <p className="text-lg font-bold text-slate-800">{recommendedTime}</p>
            <p className="text-xs text-slate-400">Lowest predicted crowd</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-slate-500">Wait Time</span>
            </div>
            <p className="text-lg font-bold text-slate-800">18 min</p>
            <p className="text-xs text-slate-400">Currently at peak</p>
          </div>
        </div>

        {/* Notification cards */}
        <div className="space-y-3 mb-6">
          <h2 className="font-display text-lg font-bold text-slate-800">Recent Alerts</h2>
          {notifications.map((n) => {
            const c = typeConfig[n.type];
            const Icon = c.icon;
            return (
              <div
                key={n.id}
                className={`flex items-start gap-3 p-4 rounded-xl border ${c.bg} ${c.border} animate-fade-in-up`}
                style={{ animationDelay: `${n.id * 0.05}s` }}
              >
                <Icon className={`w-5 h-5 ${c.iconColor} flex-shrink-0 mt-0.5`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${c.text}`}>{n.message}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order-related notifications */}
        {orders.filter((o) => o.status === 'preparing' || o.status === 'ready').length > 0 && (
          <div className="space-y-3 mb-6">
            <h2 className="font-display text-lg font-bold text-slate-800">Order Updates</h2>
            {orders
              .filter((o) => o.status === 'preparing' || o.status === 'ready')
              .map((o) => (
                <div
                  key={o.id}
                  className="flex items-start gap-3 p-4 rounded-xl border bg-blue-50 border-blue-200"
                >
                  <Bell className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-700">
                      {o.status === 'ready'
                        ? `Your preorder #${o.id} is ready for pickup!`
                        : `Your preorder #${o.id} is being prepared. Ready in ~${o.estimatedPrepTime} min.`}
                    </p>
                    <button
                      onClick={() => navigate('orders')}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-1"
                    >
                      View Order →
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Prediction timeline */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
          <h2 className="font-display text-lg font-bold text-slate-800 mb-4">
            Crowd Level Timeline
          </h2>
          <div className="space-y-2">
            {predictionSlots.map((slot) => (
              <div key={slot.time} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <span className="text-sm text-slate-600">{slot.time}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-700">{slot.crowd} students</span>
                  <CrowdBadge level={slot.level} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
