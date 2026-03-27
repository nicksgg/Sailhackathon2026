import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { units } from '../data/mockData';
import { Button } from '../components/ui/button';

export function Compare() {
  const navigate = useNavigate();
  const location = useLocation();
  const unitIds = location.state?.unitIds || ['unit-289', 'unit-241'];

  const compareUnits = units.filter(u => unitIds.includes(u.id)).slice(0, 2);

  const formatPrice = (price: number) => `$${(price / 1000000).toFixed(2)}M`;
  const formatPSF = (psf: number) => `$${psf.toLocaleString()}`;
  const formatMortgage = (amount: number) => `$${(amount / 1000).toFixed(1)}k`;

  const comparisonRows = [
    { label: 'Type', getValue: (u: any) => u.type },
    { label: 'Price', getValue: (u: any) => formatPrice(u.price) },
    { label: 'Size', getValue: (u: any) => `${u.size} sqft` },
    { label: 'PSF', getValue: (u: any) => formatPSF(u.psf) },
    { label: 'Facing', getValue: (u: any) => u.facing },
    { label: 'Floor', getValue: (u: any) => u.floor.toString() },
    { label: 'Est. Monthly', getValue: (u: any) => formatMortgage(u.estimatedMortgage) },
    { label: 'Promo', getValue: (u: any) => u.tags.includes('Early Bird') ? 'Early Bird' : '—' },
    { label: 'Balcony', getValue: (u: any) => u.balcony ? 'Yes' : 'No' },
  ];

  if (compareUnits.length < 2) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please select at least 2 units to compare</p>
          <Button onClick={() => navigate('/shortlist')}>Go to Shortlist</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold ml-2">Compare Units</h1>
      </header>

      {/* Comparison Table */}
      <div className="p-4">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Header Row with Images */}
          <div className="grid grid-cols-3 gap-px bg-gray-200">
            <div className="bg-white p-3"></div>
            {compareUnits.map(unit => (
              <div key={unit.id} className="bg-white p-3">
                <img
                  src="https://images.unsplash.com/photo-1738168279272-c08d6dd22002?w=200&h=150&fit=crop"
                  alt={unit.unitNumber}
                  className="w-full aspect-video object-cover rounded-lg mb-2"
                />
                <p className="text-sm font-semibold text-gray-900">{unit.unitNumber}</p>
              </div>
            ))}
          </div>

          {/* Comparison Rows */}
          {comparisonRows.map((row, index) => {
            const values = compareUnits.map(u => row.getValue(u));
            
            return (
              <div key={index} className="grid grid-cols-3 gap-px bg-gray-200">
                <div className="bg-white p-3">
                  <p className="text-sm font-medium text-gray-700">{row.label}</p>
                </div>
                {compareUnits.map((unit, unitIndex) => {
                  const value = values[unitIndex];
                  const isWinner = determineWinner(row.label, values, value);
                  
                  return (
                    <div key={unit.id} className="bg-white p-3">
                      <p className={`text-sm ${isWinner ? 'font-bold text-[#01696F]' : 'text-gray-900'}`}>
                        {value}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-6">
          <Button
            onClick={() => navigate('/advisor')}
            variant="outline"
            className="w-full h-12 border-[#01696F] text-[#01696F] rounded-xl font-semibold"
          >
            Ask Advisor About Differences
          </Button>
        </div>
      </div>
    </div>
  );
}

function determineWinner(label: string, values: string[], currentValue: string): boolean {
  if (label === 'Price' || label === 'PSF' || label === 'Est. Monthly') {
    // Lower is better
    const numValues = values.map(v => parseFloat(v.replace(/[^0-9.]/g, '')));
    const minValue = Math.min(...numValues);
    return parseFloat(currentValue.replace(/[^0-9.]/g, '')) === minValue;
  }
  if (label === 'Size' || label === 'Floor') {
    // Higher is better
    const numValues = values.map(v => parseFloat(v.replace(/[^0-9.]/g, '')));
    const maxValue = Math.max(...numValues);
    return parseFloat(currentValue.replace(/[^0-9.]/g, '')) === maxValue;
  }
  if (label === 'Promo') {
    return currentValue !== '—';
  }
  if (label === 'Balcony') {
    return currentValue === 'Yes';
  }
  return false;
}
