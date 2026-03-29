import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Map, Layers, Info } from 'lucide-react';
import { Button } from '../components/ui/button';

const BLOCKS = [
  { id: 'A', label: 'Block A', floors: 25, units: 200, x: 15, y: 20, w: 22, h: 45, color: '#01696F' },
  { id: 'B', label: 'Block B', floors: 25, units: 200, x: 42, y: 15, w: 22, h: 45, color: '#0C4E54' },
  { id: 'C', label: 'Block C', floors: 25, units: 200, x: 68, y: 25, w: 22, h: 45, color: '#1B7A80' },
];

const FACILITIES = [
  { label: '50m Lap Pool', emoji: '🏊', x: 30, y: 70 },
  { label: 'Gym', emoji: '🏋️', x: 55, y: 72 },
  { label: 'BBQ', emoji: '🔥', x: 20, y: 82 },
  { label: 'Tennis', emoji: '🎾', x: 65, y: 80 },
  { label: 'Playground', emoji: '🛝', x: 43, y: 84 },
  { label: 'Clubhouse', emoji: '🏛️', x: 38, y: 55 },
];

const FLOOR_TYPES = [
  { floors: '2–8', category: 'Low Floor', description: 'Garden & pool views' },
  { floors: '9–15', category: 'Mid Floor', description: 'Partial city views' },
  { floors: '16–25', category: 'High Floor', description: 'Panoramic skyline views' },
];

export function SitePlan() {
  const navigate = useNavigate();
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'siteplan' | 'floors' | 'facilities'>('siteplan');

  const selected = BLOCKS.find(b => b.id === selectedBlock);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-semibold ml-2">Site Plan</h1>
        </div>
        <button className="p-2 -mr-2 text-gray-500">
          <Info className="w-4 h-4" />
        </button>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 flex">
        {[
          { id: 'siteplan', label: 'Site Map' },
          { id: 'floors', label: 'Floor Levels' },
          { id: 'facilities', label: 'Facilities' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#01696F] text-[#01696F]'
                : 'border-transparent text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Site Map Tab */}
      {activeTab === 'siteplan' && (
        <div className="px-4 py-4 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-900">Project Lighthouse</p>
              <p className="text-xs text-gray-500">Marine Parade, D15</p>
            </div>

            {/* SVG Site Map */}
            <div className="relative w-full bg-[#E8F5E9] rounded-xl overflow-hidden" style={{ paddingBottom: '70%' }}>
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Ground / grass */}
                <rect x="0" y="0" width="100" height="100" fill="#E8F5E9" />

                {/* Roads */}
                <rect x="0" y="95" width="100" height="5" fill="#D1D5DB" />
                <rect x="95" y="0" width="5" height="100" fill="#D1D5DB" />
                <rect x="8" y="0" width="3" height="100" fill="#D1D5DB" opacity="0.5" />

                {/* Pool area */}
                <ellipse cx="38" cy="68" rx="12" ry="6" fill="#BAE6FD" stroke="#7DD3FC" strokeWidth="0.5" />
                <text x="38" y="69.5" textAnchor="middle" fontSize="3" fill="#0369A1" fontWeight="bold">Pool</text>

                {/* Green areas */}
                <circle cx="25" cy="60" r="5" fill="#86EFAC" opacity="0.5" />
                <circle cx="70" cy="58" r="4" fill="#86EFAC" opacity="0.5" />
                <circle cx="50" cy="90" r="4" fill="#86EFAC" opacity="0.5" />

                {/* Blocks */}
                {BLOCKS.map(block => (
                  <g key={block.id} onClick={() => setSelectedBlock(block.id === selectedBlock ? null : block.id)}>
                    <rect
                      x={block.x}
                      y={block.y}
                      width={block.w}
                      height={block.h}
                      rx="1.5"
                      fill={block.id === selectedBlock ? '#F59E0B' : block.color}
                      opacity={0.9}
                      className="cursor-pointer"
                      stroke={block.id === selectedBlock ? '#D97706' : 'transparent'}
                      strokeWidth="1"
                    />
                    <text
                      x={block.x + block.w / 2}
                      y={block.y + block.h / 2 - 2}
                      textAnchor="middle"
                      fontSize="3.5"
                      fill="white"
                      fontWeight="bold"
                    >
                      Blk {block.id}
                    </text>
                    <text
                      x={block.x + block.w / 2}
                      y={block.y + block.h / 2 + 4}
                      textAnchor="middle"
                      fontSize="2.5"
                      fill="white"
                      opacity="0.8"
                    >
                      25F
                    </text>
                  </g>
                ))}

                {/* Facility emojis */}
                {FACILITIES.map(f => (
                  <text key={f.label} x={f.x} y={f.y} textAnchor="middle" fontSize="5">
                    {f.emoji}
                  </text>
                ))}

                {/* North indicator */}
                <g transform="translate(90,8)">
                  <circle cx="0" cy="0" r="4" fill="white" stroke="#D1D5DB" strokeWidth="0.5" />
                  <text x="0" y="1.5" textAnchor="middle" fontSize="3.5" fill="#374151" fontWeight="bold">N</text>
                </g>
              </svg>
            </div>

            <p className="text-xs text-gray-400 text-center mt-2">
              Tap a block to see details
            </p>
          </div>

          {/* Selected Block Details */}
          {selected && (
            <div className="bg-white rounded-2xl border border-[#01696F]/20 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Block {selected.id}</h3>
                <span className="text-xs bg-[#01696F]/10 text-[#01696F] px-2 py-0.5 rounded-full font-medium">
                  Selected
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Floors', value: `${selected.floors}` },
                  { label: 'Units', value: `${selected.units}` },
                  { label: 'Status', value: 'Active' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-lg font-bold text-gray-900">{value}</p>
                    <p className="text-xs text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => navigate(`/discover?block=${selected.id}`)}
                className="w-full bg-[#01696F] hover:bg-[#0C4E54] rounded-xl"
              >
                View Units in Block {selected.id}
              </Button>
            </div>
          )}

          {/* Legend */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Legend</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { color: '#01696F', label: 'Residential Block' },
                { color: '#BAE6FD', label: 'Swimming Pool' },
                { color: '#86EFAC', label: 'Landscaped Garden' },
                { color: '#D1D5DB', label: 'Road / Driveway' },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: color }} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floor Levels Tab */}
      {activeTab === 'floors' && (
        <div className="px-4 py-4 space-y-3">
          {FLOOR_TYPES.map(({ floors, category, description }) => (
            <div key={category} className="bg-white rounded-2xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-900">{category}</p>
                  <p className="text-sm text-gray-500">Floors {floors}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Price premium</p>
                  <p className="text-sm font-semibold text-[#01696F]">
                    {floors === '2–8' ? 'Base' : floors === '9–15' ? '+4%' : '+8%'}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3">{description}</p>
              <Button
                variant="outline"
                onClick={() => navigate('/discover')}
                className="w-full border-[#01696F] text-[#01696F] text-xs rounded-xl h-9"
              >
                Browse {category} Units
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Facilities Tab */}
      {activeTab === 'facilities' && (
        <div className="px-4 py-4 space-y-3">
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <h2 className="font-semibold text-gray-900 mb-3 text-sm">Recreation & Wellness</h2>
            <div className="space-y-3">
              {[
                { emoji: '🏊', name: '50m Lap Pool', desc: 'Heated · Level 1' },
                { emoji: '🛁', name: 'Jacuzzi & Wading Pool', desc: 'Level 1' },
                { emoji: '🏋️', name: 'Gymnasium', desc: '24/7 · Level 2' },
                { emoji: '🎾', name: 'Tennis Courts (×2)', desc: 'Floodlit · Level 1' },
                { emoji: '🛝', name: 'Children\'s Playground', desc: 'Shaded · Level 1' },
              ].map(({ emoji, name, desc }) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl flex-shrink-0">
                    {emoji}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <h2 className="font-semibold text-gray-900 mb-3 text-sm">Community & Social</h2>
            <div className="space-y-3">
              {[
                { emoji: '🏛️', name: 'Grand Clubhouse', desc: 'Events · Level 1' },
                { emoji: '🔥', name: 'BBQ Pavilions (×4)', desc: 'Level 1 & Rooftop' },
                { emoji: '🌿', name: 'Sky Garden', desc: 'Level 25' },
                { emoji: '📚', name: 'Reading Lounge', desc: 'Level 2' },
                { emoji: '🚗', name: 'Basement Car Park', desc: '650 lots · EV charging' },
              ].map(({ emoji, name, desc }) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl flex-shrink-0">
                    {emoji}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
