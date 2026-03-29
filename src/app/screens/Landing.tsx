import { useNavigate } from 'react-router';
import { MapPin, DollarSign, FileText, Calendar, Menu } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Landing() {
  const navigate = useNavigate();

  const highlights = [
    { icon: MapPin, text: 'Marine Parade, D15' },
    { icon: DollarSign, text: 'From $1.28M' },
    { icon: FileText, text: '99-year leasehold' },
    { icon: Calendar, text: 'TOP 2028' },
  ];

  const sellingPoints = [
    {
      icon: '🚇',
      title: '5-min walk to MRT',
      description: 'Convenient access to Marine Parade MRT station and city connections',
    },
    {
      icon: '🏊',
      title: 'Full condo facilities',
      description: '50m lap pool, gym, tennis court, BBQ pavilion and more',
    },
    {
      icon: '🎓',
      title: 'Near top schools',
      description: 'Within 1km of highly-rated primary and secondary schools',
    },
  ];

  const quickLinks = [
    { label: 'View Floor Plans', action: () => navigate('/discover') },
    { label: 'Calculate Affordability', action: () => navigate('/calculator') },
    { label: 'Book Showflat', action: () => navigate('/booking') },
    { label: 'Download E-Brochure', action: () => navigate('/documents') },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="https://www.cdl.com.sg/images/cdl-logo.svg" 
            alt="CDL" 
            className="h-8"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="10" y="25" font-family="Arial" font-size="18" font-weight="bold" fill="%2301696F">CDL</text></svg>';
            }}
          />
          <span className="text-sm font-semibold text-gray-900">Project Lighthouse</span>
        </div>
        <button className="p-2">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </header>

      {/* Hero Image */}
      <div className="relative w-full aspect-video">
        <img
          src="https://images.unsplash.com/photo-1668763787443-a39e8578667a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Project Lighthouse"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-4 right-4 text-white">
          <h1 className="text-2xl font-bold mb-1">Project Lighthouse</h1>
          <p className="text-base">Your new address in District 15</p>
        </div>
      </div>

      {/* CTAs */}
      <div className="px-4 py-4 space-y-3">
        <Button
          onClick={() => navigate('/discover')}
          className="w-full h-12 bg-[#01696F] hover:bg-[#0C4E54] text-white font-semibold rounded-xl"
        >
          Explore Units
        </Button>
        <Button
          onClick={() => navigate('/advisor')}
          variant="outline"
          className="w-full h-12 border-2 border-[#01696F] text-[#01696F] hover:bg-[#01696F]/5 font-semibold rounded-xl"
        >
          Talk to an Advisor
        </Button>
      </div>

      {/* Project Highlights */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Project Highlights</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-full border border-gray-200 whitespace-nowrap"
              >
                <Icon className="w-4 h-4 text-[#01696F]" />
                <span className="text-sm text-gray-700">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Selling Points */}
      <div className="px-4 py-6 bg-gray-50">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Key Selling Points</h2>
        <div className="space-y-3">
          {sellingPoints.map((point, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{point.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{point.title}</h3>
                  <p className="text-sm text-gray-600">{point.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickLinks.map((link, index) => (
            <button
              key={index}
              onClick={link.action}
              className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-[#01696F] hover:bg-[#01696F]/5 transition-colors"
            >
              <span className="text-sm font-medium text-gray-900">{link.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Developer Info */}
      <div className="px-4 py-6 bg-gray-50">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Developer</h2>
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src="https://www.cdl.com.sg/images/cdl-logo.svg" 
              alt="City Developments Ltd" 
              className="h-10"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="10" y="25" font-family="Arial" font-size="16" font-weight="bold" fill="%2301696F">City Developments</text></svg>';
              }}
            />
          </div>
          <p className="text-sm text-gray-600">
            Track record: 20+ projects since 1990
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-4 py-8 bg-white border-t border-gray-200">
        <div className="flex flex-wrap gap-3 justify-center mb-4 text-xs text-gray-600">
          <button className="hover:text-[#01696F]">Contact Us</button>
          <span>|</span>
          <button className="hover:text-[#01696F]">FAQ</button>
          <span>|</span>
          <button className="hover:text-[#01696F]">Privacy Policy</button>
          <span>|</span>
          <button className="hover:text-[#01696F]">Terms</button>
        </div>
        <p className="text-xs text-center text-gray-500">© 2026 City Developments Ltd</p>
      </footer>
    </div>
  );
}