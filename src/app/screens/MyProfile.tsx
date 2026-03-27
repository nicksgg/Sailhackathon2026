import { useNavigate } from 'react-router';
import { Heart, Calendar, FileText, DollarSign, ChevronRight, Bell, Globe, Lock, LogOut } from 'lucide-react';

export function MyProfile() {
  const navigate = useNavigate();

  const activities = [
    {
      icon: Heart,
      title: 'Shortlisted Units',
      count: 3,
      subtitle: 'Last added: #12-03 2BR',
      path: '/shortlist',
    },
    {
      icon: Calendar,
      title: 'Appointments',
      count: 1,
      subtitle: 'Next: Sat 28 Mar, 2:00 PM',
      path: '/booking',
    },
    {
      icon: FileText,
      title: 'EOI Status',
      count: 1,
      subtitle: 'EOI-2026-0342: Under Review',
      path: '/eoi',
    },
    {
      icon: DollarSign,
      title: 'Saved Scenarios',
      count: 2,
      subtitle: 'Last: Budget $2.15M scenario',
      path: '/calculator',
    },
  ];

  const resources = [
    { icon: '📥', label: 'Download E-Brochure', path: '/documents' },
    { icon: '📋', label: 'Payment Schedule Guide', path: '/documents' },
    { icon: '📞', label: 'Contact Sales Gallery', path: '/' },
    { icon: '❓', label: 'FAQ', path: '/' },
  ];

  const settings = [
    { icon: Bell, label: 'Notifications Preferences', path: '/notifications' },
    { icon: Globe, label: 'Language: English', path: '/' },
    { icon: Lock, label: 'Privacy Settings', path: '/' },
    { icon: FileText, label: 'Terms & Conditions', path: '/' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-xl font-semibold text-gray-900">My Account</h1>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-[#01696F] flex items-center justify-center text-white text-2xl font-semibold">
              JT
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">John Tan</h2>
              <p className="text-sm text-gray-600">john.tan@email.com</p>
              <p className="text-sm text-gray-600">+65 9123 4567</p>
            </div>
          </div>
          <button className="w-full py-2 text-sm font-medium text-[#01696F] border border-[#01696F] rounded-lg hover:bg-[#01696F]/5">
            Edit Profile →
          </button>
        </div>

        {/* My Activity */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3 px-1">My Activity</h2>
          <div className="space-y-3">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(activity.path)}
                  className="w-full bg-white rounded-2xl p-4 border border-gray-200 hover:border-[#01696F] hover:bg-[#01696F]/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#01696F]/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#01696F]" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                        <span className="text-sm font-medium text-[#01696F]">({activity.count})</span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.subtitle}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3 px-1">Resources</h2>
          <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
            {resources.map((resource, index) => (
              <button
                key={index}
                onClick={() => navigate(resource.path)}
                className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl">{resource.icon}</span>
                <span className="flex-1 text-left text-sm text-gray-700">{resource.label}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3 px-1">Settings</h2>
          <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
            {settings.map((setting, index) => {
              const Icon = setting.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(setting.path)}
                  className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                >
                  <Icon className="w-5 h-5 text-gray-600" />
                  <span className="flex-1 text-left text-sm text-gray-700">{setting.label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Sign Out */}
        <button className="w-full py-3 text-red-600 font-medium text-sm">
          <LogOut className="w-4 h-4 inline mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
