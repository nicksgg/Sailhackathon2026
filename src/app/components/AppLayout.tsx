import { Outlet, useLocation, useNavigate } from 'react-router';
import { Home, Search, Heart, MessageCircle, User } from 'lucide-react';

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'discover', label: 'Discover', icon: Search, path: '/discover' },
    { id: 'shortlist', label: 'Shortlist', icon: Heart, path: '/shortlist' },
    { id: 'advisor', label: 'Advisor', icon: MessageCircle, path: '/advisor' },
    { id: 'me', label: 'Me', icon: User, path: '/profile' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-screen max-w-[390px] mx-auto bg-white">
      {/* Main content area with scroll */}
      <main className="flex-1 overflow-y-auto pb-[72px]">
        <Outlet />
      </main>

      {/* Bottom Navigation - Fixed */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto h-[72px] bg-white border-t border-gray-200 flex items-center justify-around px-2 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                active ? 'text-[#01696F]' : 'text-gray-500'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" strokeWidth={active ? 2.5 : 2} />
              <span className={`text-xs ${active ? 'font-semibold' : 'font-normal'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
