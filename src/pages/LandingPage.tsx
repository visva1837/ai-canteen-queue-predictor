import {
  ArrowRight,
  BrainCircuit,
  Activity,
  TrendingUp,
  UtensilsCrossed,
  ClipboardList,
  Bell,
  Clock,
  Users,
  CheckCircle2,
  Zap,
  Target,
  Sparkles,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CrowdBadge } from '@/components/CrowdBadge';
import { predictionSlots, recommendedTime, aiConfidence } from '@/data/mockData';

export function LandingPage() {
  const { navigate, user } = useApp();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden grid-pattern">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/40 to-cyan-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-100/30 to-blue-100/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Campus Innovation
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                Skip the Queue. Let{' '}
                <span className="text-gradient">AI Predict</span> Your Perfect
                Canteen Time.
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                AI-powered crowd prediction helps students avoid long queues,
                preorder food, and save valuable lunch-break time.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate(user ? 'dashboard' : 'login')}
                  className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-200"
                >
                  <Activity className="w-5 h-5" />
                  Check Crowd Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate(user ? 'menu' : 'login')}
                  className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:border-blue-300 hover:text-blue-700 transition-all"
                >
                  <UtensilsCrossed className="w-5 h-5" />
                  Preorder Food
                </button>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {['A', 'R', 'S', 'P'].map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-xs font-semibold border-2 border-white"
                    >
                      {c}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">2,400+</span> students
                  already saving time
                </p>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="relative rounded-2xl bg-white shadow-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="ai-orbit">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BrainCircuit className="w-5 h-5 text-cyan-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">AI Live Monitor</p>
                      <p className="text-[11px] text-cyan-600">Analyzing canteen data...</p>
                    </div>
                  </div>
                  <CrowdBadge level="HIGH" size="sm" />
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="rounded-xl bg-red-50 border border-red-100 p-3">
                    <Users className="w-4 h-4 text-red-500 mb-1" />
                    <p className="text-lg font-bold text-slate-800">42</p>
                    <p className="text-[10px] text-slate-500">In Queue</p>
                  </div>
                  <div className="rounded-xl bg-amber-50 border border-amber-100 p-3">
                    <Clock className="w-4 h-4 text-amber-500 mb-1" />
                    <p className="text-lg font-bold text-slate-800">18m</p>
                    <p className="text-[10px] text-slate-500">Wait Time</p>
                  </div>
                  <div className="rounded-xl bg-cyan-50 border border-cyan-100 p-3">
                    <Target className="w-4 h-4 text-cyan-500 mb-1" />
                    <p className="text-lg font-bold text-slate-800">92%</p>
                    <p className="text-[10px] text-slate-500">AI Accuracy</p>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-medium text-slate-500 mb-2">Upcoming Predictions</p>
                  <div className="space-y-2">
                    {predictionSlots.slice(0, 4).map((slot) => (
                      <div key={slot.time} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{slot.time}</span>
                        <CrowdBadge level={slot.level} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <p className="text-xs font-medium text-green-700">
                    Best time: {recommendedTime} · {aiConfidence}% confidence
                  </p>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 rounded-xl bg-white shadow-lg border border-slate-200 px-4 py-2.5 hidden sm:block">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-semibold text-slate-700">Real-time AI</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-white shadow-lg border border-slate-200 px-4 py-2.5 hidden sm:block">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-semibold text-slate-700">Predictive ML</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900">
              Everything You Need for a Smarter Lunch Break
            </h2>
            <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
              From real-time crowd monitoring to AI-powered predictions and food
              preordering — all in one platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Activity, title: 'Live Crowd Monitor', desc: 'See current canteen crowd level, queue size, and estimated waiting time in real-time.', color: 'blue' },
              { icon: TrendingUp, title: 'AI Crowd Prediction', desc: 'ML model predicts crowd levels for upcoming time slots with 92% accuracy.', color: 'cyan' },
              { icon: UtensilsCrossed, title: 'Food Preordering', desc: 'Browse the full menu, add items to cart, and preorder for the best pickup time.', color: 'amber' },
              { icon: ClipboardList, title: 'Order Tracking', desc: 'Track your preorder from placed to ready with live status updates.', color: 'green' },
              { icon: Bell, title: 'Smart Notifications', desc: 'Get alerts about crowd changes, best visiting times, and order readiness.', color: 'red' },
              { icon: Target, title: 'AI Recommendations', desc: 'Get personalized best-time recommendations based on historical patterns.', color: 'slate' },
            ].map((f, i) => {
              const Icon = f.icon;
              const colors: Record<string, string> = {
                blue: 'bg-blue-50 text-blue-600',
                cyan: 'bg-cyan-50 text-cyan-600',
                amber: 'bg-amber-50 text-amber-600',
                green: 'bg-green-50 text-green-600',
                red: 'bg-red-50 text-red-600',
                slate: 'bg-slate-100 text-slate-600',
              };
              return (
                <div
                  key={i}
                  className="group p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${colors[f.color]} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-slate-800 text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900">
              How It Works
            </h2>
            <p className="mt-3 text-slate-500">Four simple steps to a smarter lunch break</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Check Crowd', desc: 'View live canteen status and AI predictions', icon: Activity },
              { step: '02', title: 'Get Recommendation', desc: 'AI suggests the best time to visit', icon: Target },
              { step: '03', title: 'Preorder Food', desc: 'Browse menu and place your order', icon: UtensilsCrossed },
              { step: '04', title: 'Track & Pickup', desc: 'Track your order and pick up with no wait', icon: ClipboardList },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="relative">
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-display text-2xl font-bold text-blue-200">{s.step}</span>
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-slate-800 mb-1">{s.title}</h3>
                    <p className="text-sm text-slate-500">{s.desc}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:flex absolute top-1/2 -right-3 z-10">
                      <ArrowRight className="w-5 h-5 text-slate-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-8 lg:p-12 text-center">
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="relative">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">
                Ready to Skip the Queue?
              </h2>
              <p className="mt-3 text-blue-100 max-w-xl mx-auto">
                Join thousands of students saving time every day with AI-powered
                canteen predictions.
              </p>
              <button
                onClick={() => navigate(user ? 'dashboard' : 'login')}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
              >
                Get Started Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
