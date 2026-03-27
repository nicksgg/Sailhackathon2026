import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export function SitePlan() {
  const navigate = useNavigate();
  const [selectedBlock, setSelectedBlock] = useState<'A' | 'B' | 'C'>('A');

  const blocks = [
    { id: 'A' as const, floors: 25, totalUnits: 200, available: 140 },
    { id: 'B' as const, floors: 25, totalUnits: 200, available: 150 },
    { id: 'C' as const, floors: 25, totalUnits: 200, available: 132 },
  ];

  const facilities = [
    { icon: '🏊', name: '50m Lap Pool' },
    { icon: '🏋', name: 'Gym' },
    { icon: '🌳', name: 'Garden Deck' },
    { icon: '🎾', name: 'Tennis Court' },
    { icon: '👶', name: "Kids' Playground" },
    { icon: '🍳', name: 'BBQ Pavilion' },
    { icon: '🧘', name: 'Yoga Deck' },
    { icon: '🏃', name: 'Jogging Track' },
    { icon: '🅿️', name: 'Basement Parking' },
  ];

  const nearbyPlaces = [
    { type: 'Transport', items: ['Marine Parade MRT - 5 min', 'Dakota MRT - 8 min'] },
    { type: 'Schools', items: ['CHIJ Katong Primary - 800m', 'Tanjong Katong Sec - 1.2km'] },
    { type: 'Shopping', items: ['Parkway Parade - 10 min', 'I12 Katong - 12 min'] },
    { type: 'F&B', items: ['Katong Food Centre - 8 min', 'Siglap Food Centre - 15 min'] },
  ];

  const currentBlock = blocks.find(b => b.id === selectedBlock)!;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold ml-2">Site Plan & Facilities</h1>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Interactive Site Plan */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h2 className="font-semibold text-gray-900 mb-4">Site Plan</h2>
          <div className="bg-gradient-to-br from-[#01696F]/10 to-[#0C4E54]/10 rounded-xl p-6 aspect-square flex items-center justify-center relative">
            <div className="text-center">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {blocks.map((block) => (
                  <button
                    key={block.id}
                    onClick={() => setSelectedBlock(block.id)}
                    className={`w-16 h-24 rounded-lg flex items-center justify-center text-2xl font-bold transition-all ${
                      selectedBlock === block.id
                        ? 'bg-[#01696F] text-white shadow-lg scale-110'
                        : 'bg-white text-gray-400 border-2 border-gray-200'
                    }`}
                  >
                    {block.id}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-[#01696F]" />
                  <span className="text-gray-600">Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-gray-300" />
                  <span className="text-gray-600">Sold</span>
                </div>
              </div>
            </div>
          </div>

          {/* Block Info */}
          <div className="mt-4 p-4 bg-[#01696F]/5 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-2">Block {currentBlock.id}</h3>
            <p className="text-sm text-gray-600 mb-1">
              {currentBlock.floors} storeys, {currentBlock.totalUnits} units
            </p>
            <p className="text-sm text-gray-600 mb-3">
              Available: <span className="font-semibold text-[#01696F]">{currentBlock.available} units</span>
            </p>
            <Button
              onClick={() => navigate('/discover')}
              size="sm"
              className="bg-[#01696F] hover:bg-[#0C4E54]"
            >
              View units in Block {currentBlock.id} →
            </Button>
          </div>
        </div>

        {/* Facilities */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h2 className="font-semibold text-gray-900 mb-4">Facilities</h2>
          <div className="grid grid-cols-3 gap-3">
            {facilities.map((facility, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-[#01696F]/10 flex items-center justify-center text-2xl mb-2">
                  {facility.icon}
                </div>
                <p className="text-xs text-gray-700">{facility.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Neighbourhood */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h2 className="font-semibold text-gray-900 mb-4">Neighbourhood</h2>
          
          {/* Map Placeholder */}
          <div className="bg-gray-100 rounded-xl aspect-video mb-4 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Interactive map</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-2">
            {['Transport', 'Schools', 'Shopping', 'F&B', 'Healthcare'].map((filter, i) => (
              <button
                key={filter}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                  i < 4
                    ? 'bg-[#01696F] text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Nearby Places */}
          <div className="space-y-3">
            {nearbyPlaces.map((category, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{category.type}</h3>
                <div className="space-y-1">
                  {category.items.map((item, i) => (
                    <p key={i} className="text-sm text-gray-600 pl-2">• {item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MapPin({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
