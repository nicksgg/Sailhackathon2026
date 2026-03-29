import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ArrowLeft, Heart, Share2, ChevronLeft, ChevronRight,
  Bed, Bath, Maximize2, Compass, Building2, Tag,
  Calculator, CalendarCheck, FileText, Check
} from 'lucide-react';
import { units } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
];

export function UnitDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isShortlisted, addToShortlist, removeFromShortlist, addToCompare, compareList } = useApp();
  const [currentImage, setCurrentImage] = useState(0);

  const unit = units.find(u => u.id === id);

  if (!unit) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-gray-500">Unit not found.</p>
        <Button onClick={() => navigate('/discover')} className="bg-[#01696F] hover:bg-[#0C4E54]">
          Back to Discover
        </Button>
      </div>
    );
  }

  const images = PLACEHOLDER_IMAGES;
  const shortlisted = isShortlisted(unit.id);
  const inCompare = compareList.includes(unit.id);

  const toggleShortlist = () => {
    if (shortlisted) removeFromShortlist(unit.id);
    else addToShortlist(unit.id);
  };

  const formatPrice = (p: number) => `$${(p / 1000000).toFixed(2)}M`;
  const formatMortgage = (m: number) =>
    `$${m.toLocaleString()}/mo`;

  const tagColors: Record<string, string> = {
    'Early Bird': 'bg-[#F59E0B]/10 text-[#92400E]',
    'Pool View': 'bg-blue-50 text-blue-700',
    Balcony: 'bg-green-50 text-green-700',
    'Study Room': 'bg-purple-50 text-purple-700',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Image Carousel */}
      <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
        <img
          src={images[currentImage]}
          alt={`Unit ${unit.unitNumber}`}
          className="w-full h-full object-cover"
        />

        {/* Overlay controls */}
        <div className="absolute inset-0 flex items-center justify-between px-3">
          <button
            onClick={() => setCurrentImage(i => (i - 1 + images.length) % images.length)}
            className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentImage(i => (i + 1) % images.length)}
            className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={toggleShortlist}
              className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center"
            >
              <Heart
                className="w-5 h-5"
                fill={shortlisted ? '#EF4444' : 'none'}
                stroke={shortlisted ? '#EF4444' : 'white'}
              />
            </button>
            <button className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === currentImage ? 'bg-white w-4' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Unit Header */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{unit.unitNumber}</h1>
            <p className="text-sm text-gray-600">{unit.type} · Block {unit.block}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{formatPrice(unit.price)}</p>
            <p className="text-sm text-gray-500">${unit.psf.toLocaleString()} psf</p>
          </div>
        </div>

        {/* Tags */}
        {unit.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {unit.tags.map(tag => (
              <span
                key={tag}
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${tagColors[tag] ?? 'bg-gray-100 text-gray-600'}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Key stats */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Bed, label: `${unit.bedrooms} BR`, sub: 'Bedrooms' },
            { icon: Bath, label: `${Math.ceil(unit.bedrooms * 0.8)} BA`, sub: 'Bathrooms' },
            { icon: Maximize2, label: `${unit.size}`, sub: 'sqft' },
            { icon: Compass, label: unit.facing.split('-')[0], sub: 'Facing' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={sub} className="flex flex-col items-center bg-gray-50 rounded-xl p-2">
              <Icon className="w-4 h-4 text-[#01696F] mb-1" />
              <span className="text-sm font-semibold text-gray-900">{label}</span>
              <span className="text-[10px] text-gray-500">{sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="px-4 pt-3">
        <TabsList className="w-full mb-4 bg-gray-100">
          <TabsTrigger value="details" className="flex-1 text-xs">Details</TabsTrigger>
          <TabsTrigger value="financials" className="flex-1 text-xs">Financials</TabsTrigger>
          <TabsTrigger value="floorplan" className="flex-1 text-xs">Floor Plan</TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-4">
          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">About this unit</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{unit.description}</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Unit Specifications</h3>
            <div className="space-y-2">
              {[
                { label: 'Unit Number', value: unit.unitNumber },
                { label: 'Block', value: `Block ${unit.block}` },
                { label: 'Floor', value: `${unit.floor} (${unit.floorCategory} floor)` },
                { label: 'Type', value: unit.type },
                { label: 'Size', value: `${unit.size} sqft` },
                { label: 'Facing', value: unit.facing },
                { label: 'Balcony', value: unit.balcony ? 'Yes' : 'No' },
                { label: 'Study', value: unit.study ? 'Yes' : 'No' },
                { label: 'Status', value: unit.available ? 'Available' : 'Sold' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Project Amenities</h3>
            <div className="grid grid-cols-2 gap-2">
              {['50m Lap Pool', 'Gym & Fitness', 'BBQ Pavilion', 'Tennis Court',
                'Children\'s Pool', 'Function Room', 'Sky Garden', 'Concierge'].map(amenity => (
                <div key={amenity} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-3.5 h-3.5 text-[#01696F] flex-shrink-0" />
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Financials Tab */}
        <TabsContent value="financials" className="space-y-4">
          <div className="bg-gradient-to-br from-[#01696F] to-[#0C4E54] rounded-2xl p-5 text-white">
            <p className="text-sm opacity-80 mb-1">Listing Price</p>
            <p className="text-3xl font-bold mb-1">{formatPrice(unit.price)}</p>
            <p className="text-sm opacity-70">${unit.psf.toLocaleString()} psf</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Est. Monthly Mortgage', value: formatMortgage(unit.estimatedMortgage), sub: 'at 4% / 25yr' },
              { label: 'Min. Down Payment', value: `$${((unit.price * 0.25) / 1000).toFixed(0)}k`, sub: '25% of price' },
              { label: 'Min. Cash (5%)', value: `$${((unit.price * 0.05) / 1000).toFixed(0)}k`, sub: 'Cash component' },
              { label: 'Max Loan (75%)', value: `$${((unit.price * 0.75) / 1000000).toFixed(2)}M`, sub: 'LTV 75%' },
            ].map(({ label, value, sub }) => (
              <div key={label} className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-lg font-bold text-gray-900">{value}</p>
                <p className="text-[10px] text-gray-400">{sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Estimated Stamp Duties</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Buyer Stamp Duty (BSD)', value: `~$${Math.round(unit.price * 0.03 / 1000)}k` },
                { label: 'Additional BSD (ABSD)', value: 'Depends on residency & loans' },
                { label: 'Legal Fees', value: '~$3,000' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={() => navigate('/calculator')}
            variant="outline"
            className="w-full border-[#01696F] text-[#01696F] rounded-xl"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Open Affordability Calculator
          </Button>
        </TabsContent>

        {/* Floor Plan Tab */}
        <TabsContent value="floorplan">
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-700 mb-1">Floor Plan — {unit.type}</p>
            <p className="text-xs text-gray-400 mb-4">
              {unit.size} sqft · Floor {unit.floor} · Block {unit.block}
            </p>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 mb-4">
              <p className="text-xs text-gray-400">Floor plan diagram available in the e-brochure</p>
            </div>
            <Button
              onClick={() => navigate('/documents')}
              variant="outline"
              className="border-[#01696F] text-[#01696F]"
            >
              <FileText className="w-4 h-4 mr-2" />
              Download E-Brochure
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Sticky CTA Footer */}
      <div className="sticky bottom-[72px] left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              addToCompare(unit.id);
              navigate('/compare');
            }}
            className={`flex-1 rounded-xl ${
              inCompare ? 'border-[#01696F] text-[#01696F]' : 'border-gray-300 text-gray-700'
            }`}
          >
            {inCompare ? <Check className="w-4 h-4 mr-1" /> : null}
            Compare
          </Button>
          <Button
            onClick={() => navigate('/booking')}
            className="flex-1 bg-[#01696F] hover:bg-[#0C4E54] rounded-xl"
          >
            <CalendarCheck className="w-4 h-4 mr-2" />
            Book Viewing
          </Button>
          <Button
            onClick={() => navigate('/eoi')}
            className="flex-1 bg-[#0C4E54] hover:bg-[#01696F] rounded-xl"
          >
            Submit EOI
          </Button>
        </div>
      </div>
    </div>
  );
}
