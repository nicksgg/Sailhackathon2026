import { useNavigate } from 'react-router';
import { Bell, FileCheck, Calendar, TrendingDown, Home, CheckCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';

const typeConfig = {
  eoi: { icon: FileCheck, color: 'bg-blue-50 text-blue-600', label: 'EOI Update' },
  appointment: { icon: Calendar, color: 'bg-green-50 text-green-600', label: 'Appointment' },
  price: { icon: TrendingDown, color: 'bg-yellow-50 text-yellow-600', label: 'Price Alert' },
  availability: { icon: Home, color: 'bg-purple-50 text-purple-600', label: 'Availability' },
};

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function Notifications() {
  const navigate = useNavigate();
  const { notifications, markNotificationRead, markAllRead, unreadCount } = useApp();

  const handleTap = (id: string, type: string) => {
    markNotificationRead(id);
    if (type === 'eoi') navigate('/eoi');
    else if (type === 'appointment') navigate('/booking');
    else navigate('/discover');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center">
          <Bell className="w-5 h-5 text-[#01696F] mr-2" />
          <h1 className="text-base font-semibold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="ml-2 bg-[#EF4444] text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-sm text-[#01696F] font-medium flex items-center gap-1">
            <CheckCheck className="w-4 h-4" />
            Mark all read
          </button>
        )}
      </header>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Bell className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">All caught up</h2>
          <p className="text-sm text-gray-500">No notifications yet.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {notifications.map(notif => {
            const cfg = typeConfig[notif.type] ?? typeConfig.availability;
            const Icon = cfg.icon;
            return (
              <button
                key={notif.id}
                onClick={() => handleTap(notif.id, notif.type)}
                className={`w-full text-left px-4 py-4 flex items-start gap-3 transition-colors ${
                  notif.read ? 'bg-white' : 'bg-[#01696F]/5'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold ${notif.read ? 'text-gray-800' : 'text-gray-900'}`}>
                      {notif.title}
                    </p>
                    <span className="text-[11px] text-gray-400 flex-shrink-0">
                      {timeAgo(notif.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5 leading-snug">{notif.message}</p>
                  {!notif.read && (
                    <span className="inline-block mt-1 w-2 h-2 rounded-full bg-[#01696F]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      <div className="px-4 py-4">
        <Button
          variant="outline"
          onClick={() => navigate('/profile')}
          className="w-full border-gray-300 text-gray-600 rounded-xl text-sm"
        >
          Manage notification settings
        </Button>
      </div>
    </div>
  );
}
