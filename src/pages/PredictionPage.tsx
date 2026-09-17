import {
  TrendingUp,
  Clock,
  Calendar,
  Users,
  ShoppingBag,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  BrainCircuit,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { CrowdBadge } from '@/components/CrowdBadge';
import { PredictionChart, ConfidenceRing } from '@/components/Charts';
import { AIAnalyzing, AIPredictionDone } from '@/components/AIIndicator';
import {
  predictionSlots,
  predictionFactors,
  aiConfidence,
  recommendedTime,
} from '@/data/mockData';

export function PredictionPage() {
  const { navigate } = useApp();
  const [analyzing, setAnalyzing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAnalyzing(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const factorIcons: Record<string, typeof Users> = {
    Users,
    BarChart3,
    Clock,
    Calendar,
    ShoppingBag,
    TrendingUp,
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">
            AI Crowd Prediction
          </h1>
          <p className="mt-1 text-slate-500">
            Machine learning forecasts for upcoming canteen crowd levels
          </p>
        </div>

        {/* AI Analyzing indicator */}
        {analyzing && (
          <div className="mb-6">
            <AIAnalyzing />
          </div>
        )}

        {/* Prediction Chart */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 lg:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">
                Crowd Level Forecast
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Next 5 time slots · Updated 12:35 PM
              </p>
            </div>
            {!analyzing && <AIPredictionDone />}
          </div>

          <PredictionChart slots={predictionSlots} />

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
            {predictionSlots.map((slot) => (
              <div
                key={slot.time}
                className={`rounded-xl border p-3 text-center ${
                  slot.level === 'LOW'
                    ? 'border-green-200 bg-green-50/50'
                    : slot.level === 'MEDIUM'
                      ? 'border-amber-200 bg-amber-50/50'
                      : 'border-red-200 bg-red-50/50'
                }`}
              >
                <p className="text-xs text-slate-500 mb-1">{slot.time}</p>
                <CrowdBadge level={slot.level} size="sm" />
                <p className="text-lg font-bold text-slate-800 mt-1">{slot.crowd}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation + Confidence */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-6 lg:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <BrainCircuit className="w-6 h-6" />
                <span className="text-sm font-medium text-blue-100">AI Recommendation</span>
              </div>
              <p className="text-sm text-blue-100 mb-1">Recommended visiting time</p>
              <p className="font-display text-5xl font-bold mb-3">{recommendedTime}</p>
              <p className="text-sm text-blue-100 max-w-md mb-6">
                Based on current and historical data, {recommendedTime} is the best
                time to visit the canteen. Crowd is predicted to drop to LOW with
                only 22 students in queue.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate('menu')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors"
                >
                  Preorder for {recommendedTime}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('dashboard')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors border border-white/20"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 flex flex-col items-center justify-center">
            <ConfidenceRing value={aiConfidence} />
            <div className="mt-4 text-center">
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-slate-700">High Confidence</span>
              </div>
              <p className="text-xs text-slate-500 max-w-[200px]">
                Prediction based on current queue conditions and historical canteen patterns
              </p>
            </div>
          </div>
        </div>

        {/* Prediction Factors */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 lg:p-8 mb-6">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-1">
            AI Prediction Factors
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            The model analyzes {predictionFactors.length} key data points to generate predictions
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {predictionFactors.map((factor, i) => {
              const Icon = factorIcons[factor.icon] || Users;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200 p-4 hover:shadow-sm transition-all animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">{factor.label}</p>
                      <p className="text-xs text-slate-400">{factor.value}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700"
                        style={{ width: `${factor.weight}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-600">{factor.weight}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Prediction Summary */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium text-slate-500">Peak Prediction</span>
            </div>
            <p className="text-xl font-bold text-slate-800">1:00 PM</p>
            <p className="text-xs text-slate-400">52 students expected</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-slate-500">Best Time</span>
            </div>
            <p className="text-xl font-bold text-slate-800">{recommendedTime}</p>
            <p className="text-xs text-slate-400">22 students expected</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-cyan-500" />
              <span className="text-xs font-medium text-slate-500">Wait Reduction</span>
            </div>
            <p className="text-xl font-bold text-slate-800">~13 min</p>
            <p className="text-xs text-slate-400">saved vs peak time</p>
          </div>
        </div>
      </div>
    </div>
  );
}
