import { useNavigate } from 'react-router';
import {
  User, Heart, Calendar, FileText, Bell, Calculator,
  ChevronRight, LogOut, Settings, Map, BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sampleAppointment, sampleEOI } from '../data/mockData';

const STATUS_COLORS = {
  draft: 'bg-gray-100 text-gray-600',
  submitted: 'bg-blue-50 text-blue-700',
  reviewed: 'bg-yellow-50 text-yellow-700',
  confirmed: 'bg-green-50 text-green-700',
};

export function MyProfile() {
  const navigate = useNavigate();
  const { shortlist, unreadCount } = useApp();

  const menuSections = [
    {
      title: 'My Activity',
      items: [
        {
          icon: Heart,
          label: 'My Shortlist',
          badge: shortlist.length || undefined,
          path: '/shortlist',
        },
        {
          icon: Calendar,
          label: 'My Appointments',
          badge: 1,
          path: '/booking',
        },
        {
          icon: FileText,
          label: 'EOI Status',
          badge: undefined,
          path: '/eoi',
          extra: (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[sampleEOI.status]}`}>
              {sampleEOI.status.charAt(0).toUpperCase() + sampleEOI.status.slice(1)}
            </span>
          ),
        },
        {
          icon: BookOpen,
          label: 'Documents',
          badge: undefined,
          path: '/documents',
        },
      ],
    },
    {
      title: 'Explore',
      items: [
        { icon: Calculator, label: 'Affordability Calculator', path: '/calculator' },
        { icon: Map, label: 'Site Plan', path: '/siteplan' },
      ],
    },
    {
      title: 'Settings & Support',
      items: [
        {
          icon: Bell,
          label: 'Notifications',
          badge: unreadCount || undefined,
          path: '/notifications',
        },
        { icon: Settings, label: 'App Settings', path: '/profile' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <h1 className="text-base font-semibold">My Account</h1>
        <button className="p-2 -mr-2 text-gray-500">
          <Settings className="w-5 h-5" />
        </button>
      </header>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-[#01696F] to-[#0C4E54] px-5 py-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Property Buyer</h2>
            <p className="text-sm opacity-80">Member since Mar 2026</p>
            <p className="text-xs opacity-70 mt-0.5">Singapore Citizen</p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { label: 'Shortlisted', value: shortlist.length },
            { label: 'Appointments', value: '1' },
            { label: 'EOI Ref', value: sampleEOI.referenceNumber.split('-').pop() ?? '—' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-xl font-bold">{value}</p>
              <p className="text-xs opacity-70 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Appointment Banner */}
      <div
        className="mx-4 mt-4 bg-white rounded-2xl border border-[#01696F]/20 p-4 flex items-center gap-3 cursor-pointer"
        onClick={() => navigate('/booking')}
      >
        <div className="w-10 h-10 rounded-xl bg-[#01696F]/10 flex items-center justify-center flex-shrink-0">
          <Calendar className="w-5 h-5 text-[#01696F]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">Next: Showflat Visit</p>
          <p className="text-xs text-gray-500">
            {sampleAppointment.date.toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'short' })} · {sampleAppointment.time} · {sampleAppointment.consultant.name}
          </p>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
      </div>

      {/* EOI Banner */}
      <div
        className="mx-4 mt-3 bg-white rounded-2xl border border-blue-100 p-4 flex items-center gap-3 cursor-pointer"
        onClick={() => navigate('/eoi')}
      >
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">EOI #{sampleEOI.referenceNumber}</p>
          <p className="text-xs text-gray-500">Submitted · Under review (est. 3 working days)</p>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[sampleEOI.status]}`}>
          {sampleEOI.status.charAt(0).toUpperCase() + sampleEOI.status.slice(1)}
        </span>
      </div>

      {/* Menu Sections */}
      <div className="px-4 mt-4 space-y-3 pb-6">
        {menuSections.map(section => (
          <div key={section.title} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 pt-3 pb-1">
              {section.title}
            </p>
            {section.items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-gray-50 ${
                    idx < section.items.length - 1 ? 'border-b border-gray-50' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="flex-1 text-sm font-medium text-gray-900">{item.label}</span>
                  {item.extra ?? null}
                  {item.badge !== undefined && (
                    <span className="bg-[#01696F] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                </button>
              );
            })}
          </div>
        ))}

        {/* Sign Out */}
        <button className="w-full flex items-center justify-center gap-2 py-3 text-sm text-red-500 font-medium">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
