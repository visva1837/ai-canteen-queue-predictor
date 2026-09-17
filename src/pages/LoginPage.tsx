import { useState } from 'react';
import { BrainCircuit, Mail, Lock, ArrowRight, GraduationCap, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function LoginPage() {
  const { login, navigate } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    login('student');
    navigate('dashboard');
  };

  const handleDemoLogin = (role: 'student' | 'admin') => {
    login(role);
    navigate(role === 'admin' ? 'admin' : 'dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 grid-pattern">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 mb-4">
            <BrainCircuit className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            Welcome to AI Canteen
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to check crowd levels and preorder food
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-xl border border-slate-200 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@campus.edu"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Login
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">OR TRY DEMO</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemoLogin('student')}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-700">Demo Student</p>
                <p className="text-[10px] text-slate-400">Full student access</p>
              </div>
            </button>

            <button
              onClick={() => handleDemoLogin('admin')}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 transition-all group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-50 group-hover:bg-cyan-100 transition-colors">
                <ShieldCheck className="w-5 h-5 text-cyan-600" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-700">Demo Admin</p>
                <p className="text-[10px] text-slate-400">Admin & staff access</p>
              </div>
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          No real authentication required — this is a prototype demo.
        </p>
      </div>
    </div>
  );
}
