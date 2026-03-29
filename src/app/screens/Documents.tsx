import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Download, FileText, BookOpen, BarChart2, Map, Search } from 'lucide-react';

interface Doc {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  size: string;
  date: string;
  icon: typeof FileText;
  iconBg: string;
  iconColor: string;
}

const DOCUMENTS: Doc[] = [
  {
    id: 'brochure',
    title: 'Project Lighthouse E-Brochure',
    subtitle: 'Full project overview, unit types, and payment schedule',
    type: 'PDF',
    size: '8.2 MB',
    date: 'Mar 2026',
    icon: BookOpen,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    id: 'floorplans',
    title: 'Floor Plans – All Types',
    subtitle: '1BR to 4BR floor plans with dimensions and layout details',
    type: 'PDF',
    size: '4.5 MB',
    date: 'Mar 2026',
    icon: Map,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    id: 'pricelist',
    title: 'Updated Price List',
    subtitle: 'Current available units with pricing as of March 2026',
    type: 'XLSX',
    size: '1.1 MB',
    date: 'Mar 2026',
    icon: BarChart2,
    iconBg: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
  },
  {
    id: 'siteplan',
    title: 'Development Site Plan',
    subtitle: 'Master site plan showing all blocks, facilities, and landscaping',
    type: 'PDF',
    size: '3.7 MB',
    date: 'Feb 2026',
    icon: Map,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    id: 'paymentschedule',
    title: 'Progressive Payment Schedule',
    subtitle: 'Detailed payment milestones linked to construction progress',
    type: 'PDF',
    size: '0.6 MB',
    date: 'Jan 2026',
    icon: FileText,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
  },
  {
    id: 'factsheet',
    title: 'Project Fact Sheet',
    subtitle: 'Quick reference: TOP date, tenure, developer, total units',
    type: 'PDF',
    size: '0.3 MB',
    date: 'Jan 2026',
    icon: FileText,
    iconBg: 'bg-[#01696F]/10',
    iconColor: 'text-[#01696F]',
  },
];

export function Documents() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);

  const filtered = DOCUMENTS.filter(
    d =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = (id: string) => {
    setDownloadedIds(prev => [...prev, id]);
    // In a real app, trigger actual file download here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold ml-2">Documents</h1>
      </header>

      {/* Search */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl bg-gray-100 border-0 outline-none focus:ring-2 focus:ring-[#01696F]/30"
          />
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex gap-4 text-center">
        {[
          { label: 'Total docs', value: DOCUMENTS.length },
          { label: 'Downloaded', value: downloadedIds.length },
          { label: 'Updated', value: 'Mar 2026' },
        ].map(({ label, value }) => (
          <div key={label} className="flex-1">
            <p className="text-base font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="px-4 py-4 space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            No documents match your search.
          </div>
        )}

        {filtered.map(doc => {
          const Icon = doc.icon;
          const downloaded = downloadedIds.includes(doc.id);
          return (
            <div key={doc.id} className="bg-white rounded-2xl border border-gray-200 p-4">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${doc.iconBg}`}>
                  <Icon className={`w-6 h-6 ${doc.iconColor}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 leading-snug">{doc.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{doc.subtitle}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium">
                      {doc.type}
                    </span>
                    <span className="text-[10px] text-gray-400">{doc.size}</span>
                    <span className="text-[10px] text-gray-400">·</span>
                    <span className="text-[10px] text-gray-400">{doc.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(doc.id)}
                  className={`p-2.5 rounded-xl flex-shrink-0 transition-colors ${
                    downloaded
                      ? 'bg-[#10B981]/10 text-[#10B981]'
                      : 'bg-[#01696F]/10 text-[#01696F] hover:bg-[#01696F]/20'
                  }`}
                >
                  <Download className="w-4.5 h-4.5" />
                </button>
              </div>

              {downloaded && (
                <div className="mt-2 pt-2 border-t border-gray-50 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span className="text-xs text-[#10B981] font-medium">Downloaded</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Request custom doc CTA */}
      <div className="px-4 pb-6">
        <div className="bg-[#01696F]/5 rounded-2xl p-4 text-center">
          <p className="text-sm font-semibold text-gray-900 mb-1">Need more information?</p>
          <p className="text-xs text-gray-500 mb-3">
            Our consultants can send you custom reports and comparison analyses.
          </p>
          <button
            onClick={() => navigate('/advisor')}
            className="text-sm font-semibold text-[#01696F]"
          >
            Chat with Advisor →
          </button>
        </div>
      </div>
    </div>
  );
}
