export interface Unit {
  id: string;
  unitNumber: string;
  block: string;
  floor: number;
  bedrooms: number;
  bathrooms: number;
  size: number; // sqft
  price: number;
  psf: number;
  facing: 'North' | 'South' | 'East' | 'West' | 'North-East' | 'North-West' | 'South-East' | 'South-West';
  view: string;
  status: 'available' | 'reserved' | 'sold';
  unitType: string;
  balconySize?: number;
}

// Generate 600+ realistic units across multiple blocks and floors
const facings = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'] as const;
const views = ['Sea View', 'City View', 'Park View', 'Pool View', 'Garden View'];
const statuses = ['available', 'reserved', 'sold'] as const;

// Unit type configurations
const unitTypes = [
  { beds: 1, baths: 1, minSize: 450, maxSize: 550, basePrice: 1280000, type: '1BR' },
  { beds: 2, baths: 2, minSize: 650, maxSize: 750, basePrice: 1680000, type: '2BR' },
  { beds: 3, baths: 2, minSize: 900, maxSize: 1100, basePrice: 2280000, type: '3BR' },
  { beds: 4, baths: 3, minSize: 1300, maxSize: 1500, basePrice: 3180000, type: '4BR' },
  { beds: 5, baths: 4, minSize: 1800, maxSize: 2200, basePrice: 4280000, type: '5BR Penthouse' },
];

function generateUnits(): Unit[] {
  const units: Unit[] = [];
  const blocks = ['A', 'B', 'C', 'D'];
  const unitsPerFloor = 8; // 8 units per floor
  const totalFloors = 25; // 25 floors per block
  
  let unitCounter = 1;

  blocks.forEach((block) => {
    for (let floor = 2; floor <= totalFloors; floor++) {
      for (let unitOnFloor = 1; unitOnFloor <= unitsPerFloor; unitOnFloor++) {
        const unitTypeConfig = unitTypes[Math.floor(Math.random() * unitTypes.length)];
        
        // Generate realistic size variation
        const size = Math.floor(
          unitTypeConfig.minSize + Math.random() * (unitTypeConfig.maxSize - unitTypeConfig.minSize)
        );
        
        // Price increases with floor level
        const floorPremium = 1 + (floor - 2) * 0.015; // 1.5% per floor
        const price = Math.floor(unitTypeConfig.basePrice * floorPremium * (size / ((unitTypeConfig.minSize + unitTypeConfig.maxSize) / 2)));
        const psf = Math.floor(price / size);
        
        // Balcony for 3BR and above
        const balconySize = unitTypeConfig.beds >= 3 ? Math.floor(60 + Math.random() * 80) : undefined;
        
        // Unit number format: Floor + Unit (e.g., 05-123)
        const unitNumber = `${String(floor).padStart(2, '0')}-${String(unitCounter).padStart(3, '0')}`;
        
        // Higher floors more likely to be available
        const statusRoll = Math.random();
        let status: 'available' | 'reserved' | 'sold';
        if (floor <= 10) {
          status = statusRoll < 0.3 ? 'available' : statusRoll < 0.5 ? 'reserved' : 'sold';
        } else if (floor <= 18) {
          status = statusRoll < 0.5 ? 'available' : statusRoll < 0.7 ? 'reserved' : 'sold';
        } else {
          status = statusRoll < 0.7 ? 'available' : statusRoll < 0.85 ? 'reserved' : 'sold';
        }
        
        units.push({
          id: `unit-${unitCounter}`,
          unitNumber,
          block,
          floor,
          bedrooms: unitTypeConfig.beds,
          bathrooms: unitTypeConfig.baths,
          size,
          price,
          psf,
          facing: facings[unitOnFloor % facings.length],
          view: views[Math.floor(Math.random() * views.length)],
          status,
          unitType: unitTypeConfig.type,
          balconySize,
        });
        
        unitCounter++;
      }
    }
  });

  return units;
}

export const units = generateUnits();

// Helper functions for filtering
export function getAvailableUnits() {
  return units.filter(u => u.status === 'available');
}

export function getUnitsByBedrooms(bedrooms: number) {
  return units.filter(u => u.bedrooms === bedrooms && u.status === 'available');
}

export function getUnitsByPriceRange(min: number, max: number) {
  return units.filter(u => u.price >= min && u.price <= max && u.status === 'available');
}

export function getUnitById(id: string) {
  return units.find(u => u.id === id);
}
