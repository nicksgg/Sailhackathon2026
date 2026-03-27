import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Heart, Share2, Calendar } from 'lucide-react';
import { units } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function UnitDetail() {
  const navigate = useNavigate();
  const { unitId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isShortlisted, setIsShortlisted] = useState(false);

  const unit = units.find(u => u.id === unitId);

  if (!unit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Unit not found</p>
      </div>
    );
  }

  const images = [
    'https://images.unsplash.com/photo-1738168279272-c08d6dd22002?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1750420556288-d0e32a6f517b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1668026694348-b73c5eb5e299?w=800&h=600&fit=crop',
  ];

  const formatPrice = (price: number) => `$${(price / 1000000).toFixed(2)}M`;
  const formatMortgage = (amount: number) => `$${(amount / 1000).toFixed(1)}k/mo*`;

  const paymentSchedule = [
    { stage: 'Booking', percentage: '5%', amount: unit.price * 0.05 },
    { stage: 'OTP', percentage: '15%', amount: unit.price * 0.15 },
    { stage: 'Construction Stage 1', percentage: '10%', amount: unit.price * 0.1 },
    { stage: 'Construction Stage 2', percentage: '10%', amount: unit.price * 0.1 },
    { stage: 'Construction Stage 3', percentage: '10%', amount: unit.price * 0.1 },
    { stage: 'TOP', percentage: '25%', amount: unit.price * 0.25 },
    { stage: 'Final Payment', percentage: '25%', amount: unit.price * 0.25 },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Transparent overlay on carousel */}
      <header className="fixed top-0 left-0 right-0 max-w-[390px] mx-auto z-50 px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setIsShortlisted(!isShortlisted)}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md"
          >
            <Heart className={`w-5 h-5 ${isShortlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Image Carousel */}
      <div className="relative w-full aspect-[4/3]">
        <img
          src={images[currentImageIndex]}
          alt={unit.unitNumber}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tab Pills */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar border-b border-gray-200">
        {['Photos', '3D Tour', 'Layout', 'Video'].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
              i === 0
                ? 'bg-[#01696F] text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Unit Info Section */}
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Unit {unit.unitNumber}
            </h1>
            <p className="text-base text-gray-600">{unit.type}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{formatPrice(unit.price)}</p>
          </div>
        </div>
        {unit.tags.includes('Early Bird') && (
          <div className="inline-block px-3 py-1 bg-[#F59E0B]/10 text-[#92400E] rounded-lg text-sm font-medium">
            🎉 Early Bird — save $30K
          </div>
        )}
      </div>

      {/* Key Facts Grid */}
      <div className="grid grid-cols-4 gap-3 px-4 py-4 border-b border-gray-200">
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900">{unit.size} sqft</p>
          <p className="text-xs text-gray-500 mt-0.5">Size</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900">{unit.facing}</p>
          <p className="text-xs text-gray-500 mt-0.5">Facing</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900">Floor {unit.floor}</p>
          <p className="text-xs text-gray-500 mt-0.5">Level</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900">{formatMortgage(unit.estimatedMortgage)}</p>
          <p className="text-xs text-gray-500 mt-0.5">Est. mortgage</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="px-4 pb-20">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="similar">Similar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Layout Highlights</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Open-concept living and dining area</li>
              <li>• Large windows with abundant natural light</li>
              <li>• Premium fittings and finishes throughout</li>
              {unit.balcony && <li>• Spacious balcony with scenic views</li>}
              {unit.study && <li>• Dedicated study room for work-from-home</li>}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Nearest Amenities</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>🚇 Marine Parade MRT - 5 min walk</p>
              <p>🏫 CHIJ Katong Primary - 800m</p>
              <p>🛒 Parkway Parade Mall - 10 min walk</p>
              <p>🏖️ East Coast Park - 1.2km</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="floorplan" className="pt-4">
          <div className="bg-gray-100 rounded-2xl aspect-square flex items-center justify-center">
            <p className="text-gray-500">Floor plan image would be displayed here</p>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Living/Dining:</span>
              <span className="font-medium">250 sqft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Master Bedroom:</span>
              <span className="font-medium">180 sqft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bedroom 2:</span>
              <span className="font-medium">140 sqft</span>
            </div>
            {unit.study && (
              <div className="flex justify-between">
                <span className="text-gray-600">Study:</span>
                <span className="font-medium">70 sqft</span>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="payments" className="pt-4 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Progressive Payment Schedule</h3>
            <div className="space-y-3">
              {paymentSchedule.map((stage, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#01696F]" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        ${(stage.amount / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{stage.percentage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 mb-2">Additional Costs</h4>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Buyer Stamp Duty (BSD):</span>
                <span className="font-medium">~$65k</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Legal fees:</span>
                <span className="font-medium">~$3k</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="similar" className="pt-4">
          <div className="space-y-3">
            {units
              .filter(u => u.bedrooms === unit.bedrooms && u.id !== unit.id && u.available)
              .slice(0, 3)
              .map(similarUnit => (
                <button
                  key={similarUnit.id}
                  onClick={() => navigate(`/unit/${similarUnit.id}`)}
                  className="w-full bg-gray-50 rounded-xl p-3 text-left hover:bg-gray-100"
                >
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {similarUnit.unitNumber} · {similarUnit.type}
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">
                    {similarUnit.size} sqft · Floor {similarUnit.floor}
                  </p>
                  <p className="font-bold text-gray-900">{formatPrice(similarUnit.price)}</p>
                </button>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-white border-t border-gray-200 px-4 py-3 flex gap-2">
        <Button
          onClick={() => setIsShortlisted(!isShortlisted)}
          variant="outline"
          className="flex-1 border-[#01696F] text-[#01696F]"
        >
          <Heart className={`w-4 h-4 mr-2 ${isShortlisted ? 'fill-current' : ''}`} />
          Shortlist
        </Button>
        <Button
          onClick={() => navigate('/booking')}
          className="flex-1 bg-[#01696F] hover:bg-[#0C4E54]"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Book Viewing
        </Button>
      </div>
    </div>
  );
}
