import { Outlet, useLocation, useNavigate } from 'react-router';
import { Home, Search, Heart, MessageCircle, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { shortlist, unreadCount } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'discover', label: 'Discover', icon: Search, path: '/discover' },
    { id: 'shortlist', label: 'Shortlist', icon: Heart, path: '/shortlist', badge: shortlist.length },
    { id: 'advisor', label: 'Advisor', icon: MessageCircle, path: '/advisor' },
    { id: 'me', label: 'Me', icon: User, path: '/profile', badge: unreadCount },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* Main content area */}
      <main className="flex-1 overflow-y-auto pb-[72px]">
        <div className="w-full max-w-[1200px] mx-auto bg-white min-h-full md:shadow-lg">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-[72px] bg-white border-t border-gray-200 flex items-center justify-around px-2 z-50 md:shadow-xl">
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`relative flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  active ? 'text-[#01696F]' : 'text-gray-500'
                }`}
              >
                <div className="relative">
                  <Icon className="w-6 h-6 mb-1" strokeWidth={active ? 2.5 : 2} />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs ${active ? 'font-semibold' : 'font-normal'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
