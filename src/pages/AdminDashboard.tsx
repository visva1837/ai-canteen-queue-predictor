import {
  Users,
  Clock,
  ShoppingBag,
  TrendingUp,
  Activity,
  BarChart3,
  BrainCircuit,
  Zap,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  CrowdBadge,
} from '@/components/CrowdBadge';
import {
  CrowdBarChart,
  WaitingTimeChart,
  OrdersChart,
  ConfidenceRing,
} from '@/components/Charts';
import { AIAnalyzing, AIPredictionDone } from '@/components/AIIndicator';
import {
  adminStats,
  adminPrediction,
  crowdByTime,
  aiConfidence,
} from '@/data/mockData';

export function AdminDashboard() {
  const [analyzing, setAnalyzing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAnalyzing(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-slate-500">
              Monitor canteen operations and AI predictions
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-700">Live</span>
          </div>
        </div>

        {/* Live Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <StatCard
            icon={Users}
            label="Current Queue"
            value={adminStats.currentQueue.toString()}
            unit="students"
            color="red"
            trend="up"
            trendValue="+12%"
          />
          <StatCard
            icon={Clock}
            label="Waiting Time"
            value={adminStats.waitingTime.toString()}
            unit="minutes"
            color="amber"
            trend="up"
            trendValue="+3m"
          />
          <StatCard
            icon={ShoppingBag}
            label="Today's Orders"
            value={adminStats.todayOrders.toString()}
            unit="orders"
            color="blue"
            trend="up"
            trendValue="+24%"
          />
          <StatCard
            icon={Activity}
            label="Active Orders"
            value={adminStats.activeOrders.toString()}
            unit="orders"
            color="cyan"
            trend="down"
            trendValue="-5"
          />
          <StatCard
            icon={TrendingUp}
            label="Peak Time"
            value={adminStats.peakTime}
            unit=""
            color="slate"
          />
        </div>

        {/* AI Prediction Panel */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 lg:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900">
                  AI Prediction Model
                </h2>
                <p className="text-sm text-slate-500">Real-time crowd forecasting</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {analyzing ? (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  Analyzing...
                </span>
              ) : (
                <>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Prediction Status: Active
                  </span>
                  <AIPredictionDone />
                </>
              )}
            </div>
          </div>

          {analyzing && (
            <div className="mb-6">
              <AIAnalyzing />
            </div>
          )}

          <div className="grid lg:grid-cols-4 gap-4">
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-medium text-slate-500">Current Crowd</span>
              </div>
              <p className="text-3xl font-bold text-slate-800">{adminPrediction.current}</p>
              <p className="text-xs text-slate-400 mt-1">students in queue</p>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-100 p-5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-medium text-slate-500">In 15 min</span>
              </div>
              <p className="text-3xl font-bold text-slate-800">{adminPrediction.in15Min}</p>
              <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +{adminPrediction.in15Min - adminPrediction.current} expected
              </p>
            </div>
            <div className="rounded-xl bg-green-50 border border-green-100 p-5">
              <div className="flex items-center gap-2 mb-2">
                <ArrowDownRight className="w-4 h-4 text-green-500" />
                <span className="text-xs font-medium text-slate-500">In 30 min</span>
              </div>
              <p className="text-3xl font-bold text-slate-800">{adminPrediction.in30Min}</p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <ArrowDownRight className="w-3 h-3" /> -{adminPrediction.current - adminPrediction.in30Min} expected
              </p>
            </div>
            <div className="rounded-xl bg-cyan-50 border border-cyan-100 p-5 flex flex-col items-center justify-center">
              <ConfidenceRing value={aiConfidence} />
              <p className="text-xs text-slate-500 mt-2">AI Confidence</p>
            </div>
          </div>
        </div>

        {/* Crowd Analytics */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                <h3 className="font-display font-bold text-slate-800">Crowd by Time</h3>
              </div>
              <span className="text-xs text-slate-400">11:00 AM – 2:00 PM</span>
            </div>
            <CrowdBarChart data={crowdByTime} />
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <h3 className="font-display font-bold text-slate-800">Waiting Time by Hour</h3>
              </div>
              <span className="text-xs text-slate-400">minutes</span>
            </div>
            <WaitingTimeChart data={crowdByTime} />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-cyan-500" />
                <h3 className="font-display font-bold text-slate-800">Orders per Hour</h3>
              </div>
              <span className="text-xs text-slate-400">today</span>
            </div>
            <OrdersChart data={crowdByTime} />
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <h3 className="font-display font-bold text-slate-800 mb-4">Summary Stats</h3>
            <div className="space-y-3">
              <SummaryRow label="Average Daily Crowd" value={`${adminStats.averageDailyCrowd} students`} />
              <SummaryRow label="Peak Hours" value={adminStats.peakTime} />
              <SummaryRow label="Average Waiting Time" value={`${adminStats.averageWaitingTime} min`} />
              <SummaryRow label="Orders per Hour" value={`${adminStats.ordersPerHour} orders`} />
              <SummaryRow label="Total Today" value={`${adminStats.todayOrders} orders`} />
            </div>
          </div>
        </div>

        {/* Current crowd level indicator */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
          <h3 className="font-display font-bold text-slate-800 mb-4">Current Crowd Status</h3>
          <div className="flex items-center gap-4">
            <CrowdBadge level="HIGH" size="lg" />
            <div className="flex-1">
              <p className="text-sm text-slate-600">
                Canteen is currently at peak capacity. AI predicts crowd will
                decrease to MEDIUM at 1:15 PM and LOW at 1:30 PM.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-50 border border-cyan-200">
              <Zap className="w-4 h-4 text-cyan-500" />
              <span className="text-sm font-medium text-cyan-700">AI Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  color,
  trend,
  trendValue,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  unit: string;
  color: string;
  trend?: 'up' | 'down';
  trendValue?: string;
}) {
  const colors: Record<string, string> = {
    red: 'bg-red-50 text-red-500',
    amber: 'bg-amber-50 text-amber-500',
    blue: 'bg-blue-50 text-blue-500',
    cyan: 'bg-cyan-50 text-cyan-500',
    slate: 'bg-slate-100 text-slate-500',
  };
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 lg:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`flex items-center justify-center w-9 h-9 rounded-xl ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && trendValue && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trendValue}
          </span>
        )}
      </div>
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p className="font-display text-xl lg:text-2xl font-bold text-slate-800">
        {value}
        {unit && <span className="text-xs font-normal text-slate-400 ml-1">{unit}</span>}
      </p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-semibold text-slate-700">{value}</span>
    </div>
  );
}
