import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Bell, Search, Grid3x3, List, Heart } from 'lucide-react';
import { units } from '../data/mockData';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Checkbox } from '../components/ui/checkbox';

export function Discover() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState<'price' | 'size' | 'floor'>('price');
  const [filters, setFilters] = useState({
    bedrooms: [] as number[],
    priceMin: 0,
    priceMax: 5000000,
    floorCategory: [] as string[],
    facing: [] as string[],
  });

  const [shortlistedIds, setShortlistedIds] = useState<string[]>(['unit-289', 'unit-241', 'unit-361']);

  const toggleShortlist = (unitId: string) => {
    setShortlistedIds(prev => 
      prev.includes(unitId) ? prev.filter(id => id !== unitId) : [...prev, unitId]
    );
  };

  // Filter and sort units
  let filteredUnits = units.filter(unit => {
    if (!unit.available) return false;
    if (filters.bedrooms.length > 0 && !filters.bedrooms.includes(unit.bedrooms)) return false;
    if (unit.price < filters.priceMin || unit.price > filters.priceMax) return false;
    if (filters.floorCategory.length > 0 && !filters.floorCategory.includes(unit.floorCategory)) return false;
    if (filters.facing.length > 0 && !filters.facing.includes(unit.facing)) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        unit.unitNumber.toLowerCase().includes(query) ||
        unit.type.toLowerCase().includes(query) ||
        unit.price.toString().includes(query)
      );
    }
    return true;
  });

  // Sort units
  filteredUnits = [...filteredUnits].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'size') return a.size - b.size;
    if (sortBy === 'floor') return a.floor - b.floor;
    return 0;
  });

  const formatPrice = (price: number) => {
    return `$${(price / 1000000).toFixed(2)}M`;
  };

  const formatPSF = (psf: number) => {
    return `$${psf.toLocaleString()} psf`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold">Discover Units</h1>
        <button onClick={() => navigate('/notifications')} className="p-2 -mr-2">
          <Bell className="w-5 h-5" />
        </button>
      </header>

      {/* Search Bar */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by unit no., type, or price"
            className="pl-10 h-10 bg-gray-50 border-gray-200 rounded-lg"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <FilterSheet
            title="Bedrooms"
            filters={filters}
            setFilters={setFilters}
            type="bedrooms"
          />
          <FilterSheet
            title="Price"
            filters={filters}
            setFilters={setFilters}
            type="price"
          />
          <FilterSheet
            title="Floor"
            filters={filters}
            setFilters={setFilters}
            type="floor"
          />
          <FilterSheet
            title="Facing"
            filters={filters}
            setFilters={setFilters}
            type="facing"
          />
        </div>
      </div>

      {/* Sort & View Toggle */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-sm font-medium text-gray-900 bg-transparent border-none focus:outline-none"
          >
            <option value="price">Price</option>
            <option value="size">Size</option>
            <option value="floor">Floor</option>
          </select>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 ${viewMode === 'grid' ? 'text-[#01696F]' : 'text-gray-400'}`}
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 ${viewMode === 'list' ? 'text-[#01696F]' : 'text-gray-400'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-gray-700">
          {filteredUnits.length} units found
        </p>
      </div>

      {/* Unit Cards */}
      <div className="px-4 pb-4 space-y-3">
        {filteredUnits.slice(0, 50).map((unit) => (
          <div key={unit.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="flex gap-3 p-3">
              <img
                src="https://images.unsplash.com/photo-1738168279272-c08d6dd22002?w=200&h=150&fit=crop"
                alt={unit.unitNumber}
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-0.5">
                  {unit.unitNumber} · {unit.type}
                </h3>
                <p className="text-xs text-gray-600 mb-1.5">
                  {unit.size} sqft · {unit.facing} · Floor {unit.floor}
                </p>
                <p className="font-bold text-gray-900 mb-1">
                  {formatPrice(unit.price)}
                  <span className="text-xs font-normal text-gray-500 ml-2">
                    ({formatPSF(unit.psf)})
                  </span>
                </p>
                <div className="flex gap-1.5 flex-wrap">
                  {unit.tags.slice(0, 2).map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 bg-[#F59E0B]/10 text-[#92400E] rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 border-t border-gray-100">
              <button
                onClick={() => toggleShortlist(unit.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  shortlistedIds.includes(unit.id)
                    ? 'bg-[#01696F]/10 text-[#01696F]'
                    : 'bg-gray-50 text-gray-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${shortlistedIds.includes(unit.id) ? 'fill-current' : ''}`} />
                Shortlist
              </button>
              <Button
                onClick={() => navigate(`/unit/${unit.id}`)}
                className="ml-auto bg-[#01696F] hover:bg-[#0C4E54] text-white h-8 px-4 text-sm rounded-lg"
              >
                View →
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterSheet({
  title,
  filters,
  setFilters,
  type,
}: {
  title: string;
  filters: any;
  setFilters: any;
  type: 'bedrooms' | 'price' | 'floor' | 'facing';
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

  const handleApply = () => {
    setFilters(tempFilters);
    setIsOpen(false);
  };

  const handleReset = () => {
    if (type === 'bedrooms') {
      setTempFilters({ ...tempFilters, bedrooms: [] });
    } else if (type === 'price') {
      setTempFilters({ ...tempFilters, priceMin: 0, priceMax: 5000000 });
    } else if (type === 'floor') {
      setTempFilters({ ...tempFilters, floorCategory: [] });
    } else if (type === 'facing') {
      setTempFilters({ ...tempFilters, facing: [] });
    }
  };

  const hasActiveFilters = () => {
    if (type === 'bedrooms') return filters.bedrooms.length > 0;
    if (type === 'price') return filters.priceMin > 0 || filters.priceMax < 5000000;
    if (type === 'floor') return filters.floorCategory.length > 0;
    if (type === 'facing') return filters.facing.length > 0;
    return false;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className={`px-4 py-2 rounded-full border whitespace-nowrap text-sm font-medium transition-colors ${
            hasActiveFilters()
              ? 'bg-[#01696F] text-white border-[#01696F]'
              : 'bg-white text-gray-700 border-gray-300'
          }`}
        >
          {title} {hasActiveFilters() && '✓'}
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-3xl">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="py-6">
          {type === 'bedrooms' && (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((num) => (
                <label key={num} className="flex items-center gap-3">
                  <Checkbox
                    checked={tempFilters.bedrooms.includes(num)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setTempFilters({
                          ...tempFilters,
                          bedrooms: [...tempFilters.bedrooms, num],
                        });
                      } else {
                        setTempFilters({
                          ...tempFilters,
                          bedrooms: tempFilters.bedrooms.filter((b: number) => b !== num),
                        });
                      }
                    }}
                  />
                  <span className="text-sm">{num} Bedroom{num > 1 ? 's' : ''}</span>
                </label>
              ))}
            </div>
          )}
          {type === 'floor' && (
            <div className="space-y-3">
              {['Low', 'Mid', 'High'].map((cat) => (
                <label key={cat} className="flex items-center gap-3">
                  <Checkbox
                    checked={tempFilters.floorCategory.includes(cat)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setTempFilters({
                          ...tempFilters,
                          floorCategory: [...tempFilters.floorCategory, cat],
                        });
                      } else {
                        setTempFilters({
                          ...tempFilters,
                          floorCategory: tempFilters.floorCategory.filter((f: string) => f !== cat),
                        });
                      }
                    }}
                  />
                  <span className="text-sm">{cat} Floor</span>
                </label>
              ))}
            </div>
          )}
          {type === 'facing' && (
            <div className="space-y-3">
              {['North', 'South', 'East', 'West'].map((dir) => (
                <label key={dir} className="flex items-center gap-3">
                  <Checkbox
                    checked={tempFilters.facing.includes(dir)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setTempFilters({
                          ...tempFilters,
                          facing: [...tempFilters.facing, dir],
                        });
                      } else {
                        setTempFilters({
                          ...tempFilters,
                          facing: tempFilters.facing.filter((f: string) => f !== dir),
                        });
                      }
                    }}
                  />
                  <span className="text-sm">{dir}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <Button onClick={handleReset} variant="outline" className="flex-1">
            Reset
          </Button>
          <Button onClick={handleApply} className="flex-1 bg-[#01696F] hover:bg-[#0C4E54]">
            Apply
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
