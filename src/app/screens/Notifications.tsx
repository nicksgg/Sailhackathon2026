import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { sampleNotifications } from '../data/mockData';

export function Notifications() {
  const navigate = useNavigate();

  const groupedNotifications = {
    today: sampleNotifications.filter(n => {
      const hoursDiff = (Date.now() - n.timestamp.getTime()) / 1000 / 60 / 60;
      return hoursDiff < 24;
    }),
    yesterday: sampleNotifications.filter(n => {
      const hoursDiff = (Date.now() - n.timestamp.getTime()) / 1000 / 60 / 60;
      return hoursDiff >= 24 && hoursDiff < 48;
    }),
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(seconds / 86400);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'eoi': return '📄';
      case 'appointment': return '📅';
      case 'price': return '💰';
      case 'availability': return '🏠';
      default: return '📢';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold">Notifications</h1>
        <button className="text-sm text-[#01696F] font-medium">Mark all read</button>
      </header>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['All', 'Units', 'Appointments', 'EOI', 'Promos'].map((filter, i) => (
            <button
              key={filter}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                i === 0
                  ? 'bg-[#01696F] text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Notification List */}
      <div className="px-4 py-4">
        {/* Today */}
        {groupedNotifications.today.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase mb-3 px-1">Today</h2>
            <div className="space-y-2">
              {groupedNotifications.today.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white rounded-2xl p-4 border ${
                    !notification.read ? 'border-[#01696F] bg-[#01696F]/5' : 'border-gray-200'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="text-2xl">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{notification.title}</h3>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-[#01696F] flex-shrink-0 ml-2 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">{getTimeAgo(notification.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Yesterday */}
        {groupedNotifications.yesterday.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase mb-3 px-1">Yesterday</h2>
            <div className="space-y-2">
              {groupedNotifications.yesterday.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white rounded-2xl p-4 border ${
                    !notification.read ? 'border-[#01696F] bg-[#01696F]/5' : 'border-gray-200'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="text-2xl">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{notification.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">{getTimeAgo(notification.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
