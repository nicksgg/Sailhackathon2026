import { useNavigate } from 'react-router';
import { X, GitCompare, ChevronRight } from 'lucide-react';
import { units } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';

const FIELDS: { label: string; key: keyof typeof units[0]; format?: (v: unknown) => string }[] = [
  { label: 'Unit', key: 'unitNumber' },
  { label: 'Type', key: 'type' },
  { label: 'Price', key: 'price', format: (v) => `$${((v as number) / 1000000).toFixed(2)}M` },
  { label: 'PSF', key: 'psf', format: (v) => `$${(v as number).toLocaleString()}` },
  { label: 'Size', key: 'size', format: (v) => `${v} sqft` },
  { label: 'Bedrooms', key: 'bedrooms' },
  { label: 'Floor', key: 'floor' },
  { label: 'Floor Level', key: 'floorCategory' },
  { label: 'Facing', key: 'facing' },
  { label: 'Block', key: 'block' },
  { label: 'Balcony', key: 'balcony', format: (v) => (v ? 'Yes' : 'No') },
  { label: 'Study Room', key: 'study', format: (v) => (v ? 'Yes' : 'No') },
  { label: 'Est. Mortgage', key: 'estimatedMortgage', format: (v) => `$${(v as number).toLocaleString()}/mo` },
  { label: 'Status', key: 'available', format: (v) => (v ? 'Available' : 'Sold') },
];

export function Compare() {
  const navigate = useNavigate();
  const { compareList, removeFromCompare, clearCompare, shortlist, addToShortlist, isShortlisted } = useApp();

  const compareUnits = compareList.map(id => units.find(u => u.id === id)).filter(Boolean) as typeof units;

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center">
          <GitCompare className="w-5 h-5 text-[#01696F] mr-2" />
          <h1 className="text-base font-semibold">Compare Units</h1>
        </header>

        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <GitCompare className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No units to compare</h2>
          <p className="text-sm text-gray-500 mb-6">
            Select up to 3 units from the Discover or Shortlist screen to compare side-by-side.
          </p>
          <Button onClick={() => navigate('/discover')} className="bg-[#01696F] hover:bg-[#0C4E54] rounded-xl">
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
          <GitCompare className="w-5 h-5 text-[#01696F] mr-2" />
          <h1 className="text-base font-semibold">Compare</h1>
          <span className="ml-2 text-sm text-gray-500">({compareUnits.length} units)</span>
        </div>
        <button
          onClick={clearCompare}
          className="text-xs text-red-500 font-medium"
        >
          Clear all
        </button>
      </header>

      {/* Unit header strip */}
      <div className="bg-white border-b border-gray-200 overflow-x-auto">
        <div className="flex" style={{ minWidth: `${compareUnits.length * 160 + 120}px` }}>
          <div className="w-28 flex-shrink-0 px-3 py-3 text-xs text-gray-400 font-medium uppercase tracking-wide">
            Feature
          </div>
          {compareUnits.map(unit => (
            <div key={unit.id} className="flex-1 min-w-[140px] px-3 py-3 border-l border-gray-100">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-sm font-bold text-gray-900">{unit.unitNumber}</p>
                  <p className="text-xs text-gray-500">{unit.type}</p>
                </div>
                <button
                  onClick={() => removeFromCompare(unit.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="w-full h-16 rounded-lg overflow-hidden bg-gray-100 mb-2">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=80"
                  alt={unit.unitNumber}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-bold text-[#01696F]">
                ${(unit.price / 1000000).toFixed(2)}M
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table style={{ minWidth: `${compareUnits.length * 160 + 120}px` }} className="w-full">
          <tbody>
            {FIELDS.map((field, idx) => (
              <tr
                key={field.key as string}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="w-28 px-3 py-3 text-xs text-gray-500 font-medium align-top">
                  {field.label}
                </td>
                {compareUnits.map(unit => {
                  const raw = unit[field.key];
                  const display = field.format ? field.format(raw) : String(raw ?? '—');

                  // Highlight best price (lowest)
                  let highlight = false;
                  if (field.key === 'price') {
                    const min = Math.min(...compareUnits.map(u => u.price));
                    highlight = unit.price === min;
                  }
                  if (field.key === 'psf') {
                    const min = Math.min(...compareUnits.map(u => u.psf));
                    highlight = unit.psf === min;
                  }
                  if (field.key === 'size') {
                    const max = Math.max(...compareUnits.map(u => u.size));
                    highlight = unit.size === max;
                  }

                  return (
                    <td
                      key={unit.id}
                      className={`flex-1 min-w-[140px] px-3 py-3 text-sm border-l border-gray-100 align-top ${
                        highlight ? 'font-semibold text-[#01696F]' : 'text-gray-900'
                      }`}
                    >
                      {display}
                      {highlight && (
                        <span className="ml-1 text-[10px] bg-[#01696F]/10 text-[#01696F] px-1 py-0.5 rounded">
                          Best
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CTA row per unit */}
      <div className="bg-white border-t border-gray-200 overflow-x-auto px-3 py-3">
        <div className="flex gap-3" style={{ minWidth: `${compareUnits.length * 160}px` }}>
          {compareUnits.map(unit => (
            <div key={unit.id} className="flex-1 min-w-[140px] space-y-2">
              <Button
                onClick={() => navigate(`/unit/${unit.id}`)}
                variant="outline"
                className="w-full text-xs h-9 border-[#01696F] text-[#01696F]"
              >
                View <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
              <Button
                onClick={() => addToShortlist(unit.id)}
                disabled={isShortlisted(unit.id)}
                className="w-full text-xs h-9 bg-[#01696F] hover:bg-[#0C4E54]"
              >
                {isShortlisted(unit.id) ? '✓ Shortlisted' : '♡ Shortlist'}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-3">
        <Button
          onClick={() => navigate('/booking')}
          className="w-full bg-[#01696F] hover:bg-[#0C4E54] rounded-xl"
        >
          Book a Viewing
        </Button>
      </div>
    </div>
  );
}
