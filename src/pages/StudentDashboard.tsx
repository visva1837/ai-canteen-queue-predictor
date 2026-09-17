import {
  Users,
  Clock,
  Timer,
  Calendar,
  ArrowRight,
  TrendingUp,
  Activity,
  Zap,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CrowdBadge } from '@/components/CrowdBadge';
import { AIAnalyzing, AIPredictionDone } from '@/components/AIIndicator';
import {
  currentCrowd,
  currentWaitingTime,
  predictionSlots,
  predictionFactors,
  aiConfidence,
  recommendedTime,
} from '@/data/mockData';

export function StudentDashboard() {
  const { navigate } = useApp();
  const currentLevel = predictionSlots[0].level;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">
            Live Canteen Status
          </h1>
          <p className="mt-1 text-slate-500">Real-time crowd monitoring powered by AI</p>
        </div>

        {/* Current Status Card */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 shadow-sm p-6 lg:p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-slate-500 mb-1">Current Crowd Level</p>
                <div className="flex items-center gap-3">
                  <CrowdBadge level={currentLevel} size="lg" />
                  <span className="text-3xl font-bold text-slate-800">42</span>
                  <span className="text-sm text-slate-400">students</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500 mb-1">Current Time</p>
                <p className="text-2xl font-bold text-slate-800">12:35 PM</p>
                <p className="text-xs text-slate-400">Wednesday</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-red-50 border border-red-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-medium text-slate-500">In Queue</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">{currentCrowd}</p>
                <p className="text-[10px] text-slate-400">students waiting</p>
              </div>
              <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Timer className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-medium text-slate-500">Wait Time</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">{currentWaitingTime}</p>
                <p className="text-[10px] text-slate-400">minutes estimated</p>
              </div>
              <div className="rounded-xl bg-cyan-50 border border-cyan-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-cyan-500" />
                  <span className="text-xs font-medium text-slate-500">Service</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">2.5</p>
                <p className="text-[10px] text-slate-400">min per student</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-xl bg-slate-50 p-3">
              <Activity className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <p className="text-sm text-slate-600">
                Live data updates every 15 seconds. AI is monitoring queue patterns.
              </p>
            </div>
          </div>

          {/* AI Recommendation card */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-6 lg:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium text-blue-100">AI Recommendation</span>
              </div>
              <p className="text-sm text-blue-100 mb-2">Best time to visit</p>
              <p className="font-display text-4xl font-bold mb-2">{recommendedTime}</p>
              <p className="text-sm text-blue-100 mb-6">
                Based on current and historical data, {recommendedTime} is the best
                time to visit the canteen with the lowest predicted crowd.
              </p>
              <button
                onClick={() => navigate('prediction')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors"
              >
                View Recommended Time
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* AI Prediction Section */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 lg:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">
                AI Crowd Prediction
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Predicted crowd levels for upcoming time slots
              </p>
            </div>
            <AIPredictionDone />
          </div>

          <div className="grid sm:grid-cols-5 gap-3 mb-6">
            {predictionSlots.map((slot, i) => (
              <div
                key={slot.time}
                className={`rounded-xl border p-4 text-center transition-all hover:shadow-md animate-fade-in-up ${
                  slot.level === 'LOW'
                    ? 'border-green-200 bg-green-50/50'
                    : slot.level === 'MEDIUM'
                      ? 'border-amber-200 bg-amber-50/50'
                      : 'border-red-200 bg-red-50/50'
                }`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <p className="text-xs text-slate-500 mb-2">{slot.time}</p>
                <CrowdBadge level={slot.level} size="sm" />
                <p className="text-lg font-bold text-slate-800 mt-2">{slot.crowd}</p>
                <p className="text-[10px] text-slate-400">students</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-4 rounded-xl bg-blue-50 border border-blue-100 p-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">AI Recommendation</p>
                <p className="text-xs text-slate-500">{aiConfidence}% confidence</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 flex-1">
              Based on current and historical data, <span className="font-semibold text-blue-700">{recommendedTime}</span> is the best time to visit the canteen.
            </p>
            <button
              onClick={() => navigate('prediction')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              View Details
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Prediction Factors */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">
                AI Prediction Factors
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Data points analyzed by the AI model
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {predictionFactors.map((factor, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 p-4 hover:shadow-sm transition-all animate-fade-in-up"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{factor.label}</span>
                  <span className="text-xs text-slate-400">{factor.value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700"
                      style={{ width: `${factor.weight}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 w-8 text-right">{factor.weight}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 rounded-xl bg-slate-50 border border-slate-100 p-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-slate-800">{aiConfidence}%</p>
                <p className="text-xs text-slate-500">AI Confidence Score</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-600">
                The prediction is based on current queue conditions and historical
                canteen patterns. The model analyzes {predictionFactors.length} key
                factors to generate crowd forecasts.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <button
            onClick={() => navigate('menu')}
            className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-left"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Preorder Now</p>
              <p className="text-xs text-slate-500">Skip the queue</p>
            </div>
          </button>
          <button
            onClick={() => navigate('prediction')}
            className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-left"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-50">
              <TrendingUp className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">View Predictions</p>
              <p className="text-xs text-slate-500">AI forecast details</p>
            </div>
          </button>
          <button
            onClick={() => navigate('orders')}
            className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-left"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-50">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Track Orders</p>
              <p className="text-xs text-slate-500">View order status</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
