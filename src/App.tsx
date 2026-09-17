import { AppProvider, useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { StudentDashboard } from '@/pages/StudentDashboard';
import { PredictionPage } from '@/pages/PredictionPage';
import { MenuPage } from '@/pages/MenuPage';
import { OrdersPage } from '@/pages/OrdersPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { StaffView } from '@/pages/StaffView';

function AppContent() {
  const { currentPage, user } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'dashboard':
        return <StudentDashboard />;
      case 'prediction':
        return <PredictionPage />;
      case 'menu':
        return <MenuPage />;
      case 'orders':
        return <OrdersPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'admin':
        return <AdminDashboard />;
      case 'staff':
        return <StaffView />;
      default:
        return <LandingPage />;
    }
  };

  const isLanding = currentPage === 'home';
  const isLogin = currentPage === 'login';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {!isLogin && <Navbar />}
      <main className="flex-1">
        {renderPage()}
      </main>
      {isLanding && <Footer />}
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
