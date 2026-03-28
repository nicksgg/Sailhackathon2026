import { Outlet, useLocation, useNavigate } from 'react-router';
import { Home, Search, Heart, MessageCircle, User } from 'lucide-react';

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/', enabled: true },
    { id: 'discover', label: 'Discover', icon: Search, path: '/discover', enabled: true },
    { id: 'shortlist', label: 'Shortlist', icon: Heart, path: '/shortlist', enabled: false },
    { id: 'advisor', label: 'Advisor', icon: MessageCircle, path: '/advisor', enabled: false },
    { id: 'me', label: 'Me', icon: User, path: '/profile', enabled: false },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {/* Main content area with scroll - responsive container */}
      <main className="flex-1 overflow-y-auto pb-[72px]">
        <div className="w-full max-w-[1200px] mx-auto bg-white min-h-full md:shadow-lg">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation - Fixed and responsive */}
      <nav className="fixed bottom-0 left-0 right-0 h-[72px] bg-white border-t border-gray-200 flex items-center justify-around px-2 z-50 md:shadow-xl">
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <button
                key={item.id}
                onClick={() => item.enabled && navigate(item.path)}
                disabled={!item.enabled}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  active ? 'text-[#01696F]' : item.enabled ? 'text-gray-500' : 'text-gray-300'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" strokeWidth={active ? 2.5 : 2} />
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