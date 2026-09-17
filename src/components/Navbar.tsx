import { useState } from 'react';
import {
  BrainCircuit,
  Home,
  Activity,
  TrendingUp,
  UtensilsCrossed,
  ClipboardList,
  LayoutDashboard,
  Menu as MenuIcon,
  X,
  ShoppingBag,
  Bell,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Page } from '@/types';

const studentNav: { label: string; page: Page; icon: typeof Home }[] = [
  { label: 'Home', page: 'home', icon: Home },
  { label: 'Live Crowd', page: 'dashboard', icon: Activity },
  { label: 'AI Prediction', page: 'prediction', icon: TrendingUp },
  { label: 'Menu', page: 'menu', icon: UtensilsCrossed },
  { label: 'My Orders', page: 'orders', icon: ClipboardList },
  { label: 'Dashboard', page: 'notifications', icon: LayoutDashboard },
];

export function Navbar() {
  const { currentPage, navigate, user, logout, cartCount, setShowCart } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleNav = (page: Page) => {
    navigate(page);
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNav('home')}>
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-slate-800">
              AI Canteen
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {studentNav.map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {user && (
              <>
                <button
                  onClick={() => setShowCart(true)}
                  className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Cart"
                >
                  <ShoppingBag className="w-5 h-5 text-slate-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleNav('notifications')}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors relative"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5 text-slate-600" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
                </button>

                <div className="relative hidden lg:block">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-sm font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-slate-700 leading-tight">{user.name}</p>
                      <p className="text-[10px] text-slate-500 capitalize leading-tight">{user.role}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                      <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-slate-200 py-1 z-20 animate-fade-in">
                        <div className="px-4 py-2 border-b border-slate-100">
                          <p className="text-sm font-medium text-slate-700">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                        {user.role === 'admin' && (
                          <button
                            onClick={() => { handleNav('admin'); setProfileOpen(false); }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                          >
                            <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
                          </button>
                        )}
                        <button
                          onClick={() => { handleNav('staff'); setProfileOpen(false); }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                        >
                          <ClipboardList className="w-4 h-4" /> Staff View
                        </button>
                        <button
                          onClick={() => { logout(); setProfileOpen(false); }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

            {!user && (
              <button
                onClick={() => handleNav('login')}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {studentNav.map((item) => {
                const Icon = item.icon;
                const active = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNav(item.page)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
              {!user && (
                <button
                  onClick={() => handleNav('login')}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50"
                >
                  Login
                </button>
              )}
              {user && (
                <>
                  <button
                    onClick={() => handleNav('admin')}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
                  </button>
                  <button
                    onClick={() => handleNav('staff')}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
                  >
                    <ClipboardList className="w-4 h-4" /> Staff View
                  </button>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
