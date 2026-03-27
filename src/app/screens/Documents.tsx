import { useNavigate } from 'react-router';
import { ArrowLeft, Download, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Documents() {
  const navigate = useNavigate();

  const projectDocuments = [
    {
      icon: '📄',
      title: 'E-Brochure',
      details: '45 pages · PDF · 12.3 MB',
      updated: null,
    },
    {
      icon: '📄',
      title: 'Floor Plan Book',
      details: 'All unit types · PDF · 8.1 MB',
      updated: null,
    },
    {
      icon: '📄',
      title: 'Price List',
      details: 'Updated 25 Mar 2026 · PDF',
      updated: '25 Mar 2026',
    },
    {
      icon: '📄',
      title: 'Payment Schedule',
      details: 'Progressive payment breakdown',
      updated: null,
    },
  ];

  const myDocuments = [
    {
      icon: '📝',
      title: 'EOI Form (Draft)',
      details: 'Saved 27 Mar 2026',
      action: 'Continue editing',
      path: '/eoi',
    },
    {
      icon: '📊',
      title: 'Affordability Report',
      details: 'Generated 26 Mar 2026',
      action: 'View / Share',
      path: '/calculator',
    },
  ];

  const handleDownload = (title: string) => {
    // In real app, would trigger actual download
    alert(`Downloading ${title}...`);
  };

  const handleView = (title: string) => {
    // In real app, would open document viewer
    alert(`Opening ${title}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold ml-2">Documents</h1>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Project Documents */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3 px-1">Project Documents</h2>
          <div className="space-y-3">
            {projectDocuments.map((doc, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{doc.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-0.5">{doc.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{doc.details}</p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleView(doc.title)}
                        size="sm"
                        variant="outline"
                        className="flex-1 text-[#01696F] border-[#01696F]"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1.5" />
                        View
                      </Button>
                      <Button
                        onClick={() => handleDownload(doc.title)}
                        size="sm"
                        className="flex-1 bg-[#01696F] hover:bg-[#0C4E54]"
                      >
                        <Download className="w-3.5 h-3.5 mr-1.5" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Documents */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3 px-1">My Documents</h2>
          <div className="space-y-3">
            {myDocuments.map((doc, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{doc.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-0.5">{doc.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{doc.details}</p>
                    {doc.action === 'Continue editing' ? (
                      <Button
                        onClick={() => navigate(doc.path)}
                        size="sm"
                        className="bg-[#01696F] hover:bg-[#0C4E54]"
                      >
                        Continue editing →
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => navigate(doc.path)}
                          size="sm"
                          variant="outline"
                          className="flex-1 text-[#01696F] border-[#01696F]"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1.5" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-[#01696F] border-[#01696F]"
                        >
                          Share with consultant
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-[#01696F]/5 rounded-2xl p-4 border border-[#01696F]/20">
          <p className="text-sm text-gray-700">
            💡 <strong>Tip:</strong> All documents are automatically saved to your account and can be accessed anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
