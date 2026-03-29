import { useNavigate } from 'react-router';
import { Heart, Trash2, GitCompare, ArrowRight, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';

export function Shortlist() {
  const navigate = useNavigate();
  const { shortlist, removeFromShortlist, addToCompare, compareList } = useApp();

  const formatPrice = (p: number) => `$${(p / 1000000).toFixed(2)}M`;

  if (shortlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center">
          <Heart className="w-5 h-5 text-[#01696F] mr-2" />
          <h1 className="text-base font-semibold">My Shortlist</h1>
        </header>

        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Heart className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No units shortlisted yet</h2>
          <p className="text-sm text-gray-500 mb-6">
            Tap the heart icon on any unit to save it here for easy access.
          </p>
          <Button
            onClick={() => navigate('/discover')}
            className="bg-[#01696F] hover:bg-[#0C4E54] rounded-xl"
          >
            <Search className="w-4 h-4 mr-2" />
            Browse Units
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center">
          <Heart className="w-5 h-5 text-[#01696F] mr-2" fill="#01696F" />
          <h1 className="text-base font-semibold">My Shortlist</h1>
          <span className="ml-2 bg-[#01696F] text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {shortlist.length}
          </span>
        </div>
        {shortlist.length >= 2 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/compare')}
            className="border-[#01696F] text-[#01696F] text-xs"
          >
            <GitCompare className="w-3.5 h-3.5 mr-1" />
            Compare
          </Button>
        )}
      </header>

      <div className="px-4 py-4 space-y-3">
        {shortlist.map((unit) => {
          const inCompare = compareList.includes(unit.id);
          return (
            <div
              key={unit.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
            >
              <div className="flex">
                {/* Image thumbnail */}
                <div
                  className="w-24 h-24 bg-gray-200 flex-shrink-0 cursor-pointer"
                  onClick={() => navigate(`/unit/${unit.id}`)}
                >
                  <img
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80"
                    alt={unit.unitNumber}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 px-3 py-3 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{unit.unitNumber}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{unit.type} · Floor {unit.floor}</p>
                      <p className="text-xs text-gray-500">{unit.facing} · {unit.size} sqft</p>
                    </div>
                    <button
                      onClick={() => removeFromShortlist(unit.id)}
                      className="text-gray-400 hover:text-red-500 p-1 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="font-bold text-gray-900 text-sm mt-1">{formatPrice(unit.price)}</p>
                  <p className="text-xs text-gray-400">${unit.psf.toLocaleString()} psf</p>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => addToCompare(unit.id)}
                      className={`text-xs px-2 py-1 rounded-lg border transition-colors ${
                        inCompare
                          ? 'border-[#01696F] bg-[#01696F]/5 text-[#01696F]'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      {inCompare ? '✓ In Compare' : '+ Compare'}
                    </button>
                    <button
                      onClick={() => navigate(`/unit/${unit.id}`)}
                      className="text-xs px-2 py-1 rounded-lg border border-gray-200 text-gray-600 flex items-center gap-1"
                    >
                      View <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Actions row */}
        <div className="pt-2 space-y-3">
          {compareList.length >= 2 && (
            <Button
              onClick={() => navigate('/compare')}
              className="w-full bg-[#01696F] hover:bg-[#0C4E54] rounded-xl"
            >
              <GitCompare className="w-4 h-4 mr-2" />
              Compare Selected ({compareList.length})
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => navigate('/advisor')}
            className="w-full border-[#01696F] text-[#01696F] rounded-xl"
          >
            Share shortlist with Advisor
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/eoi')}
            className="w-full border-[#01696F] text-[#01696F] rounded-xl"
          >
            Submit EOI for shortlisted units
          </Button>
        </div>
      </div>
    </div>
  );
}
