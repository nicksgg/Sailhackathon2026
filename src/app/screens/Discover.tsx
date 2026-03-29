import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, SlidersHorizontal, Bed, Maximize, MapPin, X, Heart } from 'lucide-react';
import { units, Unit } from '../data/units';
import { Button } from '../components/ui/button';
import { useApp } from '../context/AppContext';

export function Discover() {
  const navigate = useNavigate();
  const { isShortlisted, addToShortlist, removeFromShortlist } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedBedrooms, setSelectedBedrooms] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [floorRange, setFloorRange] = useState<[number, number]>([2, 25]);
  const [selectedFacings, setSelectedFacings] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('available');

  // Filter options
  const bedroomOptions = [1, 2, 3, 4, 5];
  const facingOptions = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];

  // Apply filters
  const filteredUnits = useMemo(() => {
    return units.filter(unit => {
      // Status filter
      if (selectedStatus && unit.status !== selectedStatus) return false;
      
      // Bedroom filter
      if (selectedBedrooms.length > 0 && !selectedBedrooms.includes(unit.bedrooms)) return false;
      
      // Price filter
      if (unit.price < priceRange[0] || unit.price > priceRange[1]) return false;
      
      // Floor filter
      if (unit.floor < floorRange[0] || unit.floor > floorRange[1]) return false;
      
      // Facing filter
      if (selectedFacings.length > 0 && !selectedFacings.includes(unit.facing)) return false;
      
      return true;
    });
  }, [selectedBedrooms, priceRange, floorRange, selectedFacings, selectedStatus]);

  const toggleBedroom = (beds: number) => {
    setSelectedBedrooms(prev =>
      prev.includes(beds) ? prev.filter(b => b !== beds) : [...prev, beds]
    );
  };

  const toggleFacing = (facing: string) => {
    setSelectedFacings(prev =>
      prev.includes(facing) ? prev.filter(f => f !== facing) : [...prev, facing]
    );
  };

  const clearFilters = () => {
    setSelectedBedrooms([]);
    setPriceRange([0, 5000000]);
    setFloorRange([2, 25]);
    setSelectedFacings([]);
  };

  const activeFilterCount = 
    selectedBedrooms.length + 
    selectedFacings.length + 
    (priceRange[0] !== 0 || priceRange[1] !== 5000000 ? 1 : 0) +
    (floorRange[0] !== 2 || floorRange[1] !== 25 ? 1 : 0);

  const formatPrice = (price: number) => {
    return `$${(price / 1000000).toFixed(2)}M`;
  };

  const getUnitImage = (unit: Unit) => {
    // Rotate between different images based on unit type
    const images = [
      'https://images.unsplash.com/photo-1662454419736-de132ff75638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1768118422932-4cdcca2ced8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    ];
    return images[parseInt(unit.id.split('-')[1]) % images.length];
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="px-4 h-14 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="font-semibold text-gray-900">Discover Units</h1>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 -mr-2 relative"
          >
            <SlidersHorizontal className="w-6 h-6 text-gray-700" />
            {activeFilterCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#01696F] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Status Tabs */}
        <div className="flex border-b border-gray-200">
          {['available', 'reserved', 'sold'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${
                selectedStatus === status
                  ? 'text-[#01696F] border-b-2 border-[#01696F]'
                  : 'text-gray-500'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </header>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-gray-50 border-b border-gray-200 p-4 space-y-4">
          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Bedrooms</label>
            <div className="flex flex-wrap gap-2">
              {bedroomOptions.map((beds) => (
                <button
                  key={beds}
                  onClick={() => toggleBedroom(beds)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedBedrooms.includes(beds)
                      ? 'bg-[#01696F] text-white'
                      : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  {beds}BR
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </label>
            <div className="flex gap-3">
              <input
                type="range"
                min="0"
                max="5000000"
                step="100000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="flex-1"
              />
              <input
                type="range"
                min="0"
                max="5000000"
                step="100000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="flex-1"
              />
            </div>
          </div>

          {/* Floor Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Floor: {floorRange[0]} - {floorRange[1]}
            </label>
            <div className="flex gap-3">
              <input
                type="range"
                min="2"
                max="25"
                value={floorRange[0]}
                onChange={(e) => setFloorRange([parseInt(e.target.value), floorRange[1]])}
                className="flex-1"
              />
              <input
                type="range"
                min="2"
                max="25"
                value={floorRange[1]}
                onChange={(e) => setFloorRange([floorRange[0], parseInt(e.target.value)])}
                className="flex-1"
              />
            </div>
          </div>

          {/* Facing */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Facing</label>
            <div className="flex flex-wrap gap-2">
              {facingOptions.map((facing) => (
                <button
                  key={facing}
                  onClick={() => toggleFacing(facing)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedFacings.includes(facing)
                      ? 'bg-[#01696F] text-white'
                      : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  {facing}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="w-full py-2 text-sm font-medium text-[#01696F] hover:bg-[#01696F]/5 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {/* Results Summary */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{filteredUnits.length}</span> units found
        </p>
      </div>

      {/* Unit List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUnits.map((unit) => (
            <div
              key={unit.id}
              onClick={() => navigate(`/unit/${unit.id}`)}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* Unit Image */}
              <div className="relative aspect-video">
                <img
                  src={getUnitImage(unit)}
                  alt={`${unit.unitType} Unit`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-gray-900">
                  {unit.unitType}
                </div>
                {unit.status === 'reserved' && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                    Reserved
                  </div>
                )}
                {unit.status === 'sold' && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                    Sold
                  </div>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); isShortlisted(unit.id) ? removeFromShortlist(unit.id) : addToShortlist(unit.id); }}
                  className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow"
                >
                  <Heart className="w-4 h-4" fill={isShortlisted(unit.id) ? '#EF4444' : 'none'} stroke={isShortlisted(unit.id) ? '#EF4444' : '#374151'} />
                </button>
              </div>

              {/* Unit Details */}
              <div className="p-4 space-y-3">
                {/* Unit Number & Block */}
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">#{unit.unitNumber}</h3>
                  <span className="text-sm text-gray-600">Block {unit.block}</span>
                </div>

                {/* Price */}
                <div>
                  <div className="text-xl font-bold text-[#01696F]">{formatPrice(unit.price)}</div>
                  <div className="text-xs text-gray-500">${unit.psf.toLocaleString()} PSF</div>
                </div>

                {/* Specs */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span>{unit.bedrooms} Bed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize className="w-4 h-4" />
                    <span>{unit.size} sqft</span>
                  </div>
                </div>

                {/* Location Info */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>Floor {unit.floor} • {unit.facing} • {unit.view}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredUnits.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <X className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No units found</h3>
            <p className="text-sm text-gray-600 text-center mb-4">
              Try adjusting your filters to see more results
            </p>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="border-[#01696F] text-[#01696F]"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
