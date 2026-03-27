import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { units } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';

export function Shortlist() {
  const navigate = useNavigate();
  const [shortlistedIds] = useState(['unit-289', 'unit-241', 'unit-361']);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const shortlistedUnits = units.filter(u => shortlistedIds.includes(u.id));

  const toggleCompareSelection = (unitId: string) => {
    setSelectedForCompare(prev =>
      prev.includes(unitId)
        ? prev.filter(id => id !== unitId)
        : [...prev, unitId]
    );
  };

  const formatPrice = (price: number) => `$${(price / 1000000).toFixed(2)}M`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold">My Shortlist</h1>
        <button className="text-sm text-[#01696F] font-medium">Edit</button>
      </header>

      {/* Counter */}
      <div className="px-4 py-4 bg-white">
        <p className="text-sm font-medium text-gray-700">
          {shortlistedUnits.length} units shortlisted
        </p>
      </div>

      {/* Unit Cards */}
      <div className="px-4 py-4 space-y-3">
        {shortlistedUnits.map((unit) => (
          <div key={unit.id} className="bg-white rounded-2xl border border-gray-200 p-4">
            <div className="flex gap-3">
              <Checkbox
                checked={selectedForCompare.includes(unit.id)}
                onCheckedChange={() => toggleCompareSelection(unit.id)}
                className="mt-1"
              />
              <img
                src="https://images.unsplash.com/photo-1738168279272-c08d6dd22002?w=120&h=120&fit=crop"
                alt={unit.unitNumber}
                className="w-20 h-20 object-cover rounded-xl"
              />
              <div className="flex-1 min-w-0">
                <h3
                  onClick={() => navigate(`/unit/${unit.id}`)}
                  className="font-semibold text-gray-900 mb-0.5 cursor-pointer hover:text-[#01696F]"
                >
                  {unit.unitNumber} · {unit.type}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  {unit.size} sqft · {formatPrice(unit.price)}
                </p>
                <p className="text-sm text-gray-500">
                  {unit.facing} · Floor {unit.floor}
                </p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <button className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium">
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Compare Button */}
      {selectedForCompare.length >= 2 && (
        <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-white border-t border-gray-200 px-4 py-3">
          <Button
            onClick={() => navigate('/compare', { state: { unitIds: selectedForCompare } })}
            className="w-full h-12 bg-[#01696F] hover:bg-[#0C4E54] text-white font-semibold rounded-xl"
          >
            Compare Selected ({selectedForCompare.length})
          </Button>
        </div>
      )}
    </div>
  );
}
