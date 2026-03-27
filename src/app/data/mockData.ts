// Mock data for Project Lighthouse real estate app

export interface Unit {
  id: string;
  unitNumber: string;
  type: string;
  bedrooms: number;
  size: number;
  price: number;
  psf: number;
  facing: string;
  floor: number;
  floorCategory: 'Low' | 'Mid' | 'High';
  available: boolean;
  tags: string[];
  images: string[];
  description: string;
  layout?: string;
  balcony: boolean;
  study: boolean;
  estimatedMortgage: number;
  block: 'A' | 'B' | 'C';
}

export interface ShortlistedUnit extends Unit {
  shortlistedAt: Date;
}

export interface Appointment {
  id: string;
  type: 'showflat' | 'virtual' | 'financial';
  date: Date;
  time: string;
  consultant: {
    name: string;
    phone: string;
    avatar?: string;
  };
  location?: string;
}

export interface EOI {
  id: string;
  referenceNumber: string;
  status: 'draft' | 'submitted' | 'reviewed' | 'confirmed';
  submittedAt?: Date;
  preferredUnits: string[];
  documents: {
    nric: boolean;
    income: boolean;
    funds: boolean;
    optionFee: boolean;
  };
}

export interface Notification {
  id: string;
  type: 'eoi' | 'appointment' | 'price' | 'availability';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

// Generate 600 units with realistic Singapore property data
export const generateUnits = (): Unit[] => {
  const units: Unit[] = [];
  const facings = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];
  const blocks: ('A' | 'B' | 'C')[] = ['A', 'B', 'C'];
  
  const unitTypes = [
    { bedrooms: 1, type: '1 Bedroom', baseSize: 450, basePrice: 1200000 },
    { bedrooms: 2, type: '2 Bedroom', baseSize: 650, basePrice: 1850000 },
    { bedrooms: 2, type: '2 Bedroom + Study', baseSize: 720, basePrice: 2050000 },
    { bedrooms: 3, type: '3 Bedroom', baseSize: 950, basePrice: 2600000 },
    { bedrooms: 3, type: '3 Bedroom + Study', baseSize: 1100, basePrice: 2950000 },
    { bedrooms: 4, type: '4 Bedroom', baseSize: 1350, basePrice: 3650000 },
  ];

  let unitCount = 1;
  
  // Generate units across 3 blocks, 25 floors each
  blocks.forEach(block => {
    for (let floor = 2; floor <= 25; floor++) {
      // 8 units per floor
      for (let unitOnFloor = 1; unitOnFloor <= 8; unitOnFloor++) {
        const unitTypeData = unitTypes[Math.floor(Math.random() * unitTypes.length)];
        const facing = facings[Math.floor(Math.random() * facings.length)];
        
        // Size variation +/- 10%
        const sizeVariation = unitTypeData.baseSize * (0.95 + Math.random() * 0.1);
        const size = Math.round(sizeVariation);
        
        // Price variation based on floor and facing
        let priceMultiplier = 1;
        if (floor >= 15) priceMultiplier += 0.08; // High floor premium
        else if (floor >= 10) priceMultiplier += 0.04; // Mid floor
        if (facing.includes('South')) priceMultiplier += 0.03; // South facing premium
        if (facing.includes('North')) priceMultiplier += 0.02; // North facing premium
        
        const price = Math.round(unitTypeData.basePrice * priceMultiplier / 10000) * 10000;
        const psf = Math.round(price / size);
        
        const floorCategory: 'Low' | 'Mid' | 'High' = 
          floor <= 8 ? 'Low' : floor <= 15 ? 'Mid' : 'High';
        
        const tags: string[] = [];
        if (Math.random() > 0.7 && floor >= 10) tags.push('Early Bird');
        if (Math.random() > 0.6 && facing.includes('South')) tags.push('Pool View');
        if (Math.random() > 0.5) tags.push('Balcony');
        if (unitTypeData.type.includes('Study')) tags.push('Study Room');
        
        const unit: Unit = {
          id: `unit-${unitCount}`,
          unitNumber: `#${floor.toString().padStart(2, '0')}-${unitOnFloor.toString().padStart(2, '0')}`,
          type: unitTypeData.type,
          bedrooms: unitTypeData.bedrooms,
          size,
          price,
          psf,
          facing,
          floor,
          floorCategory,
          available: Math.random() > 0.3, // 70% available
          tags,
          images: [],
          description: `Beautiful ${unitTypeData.type} unit with ${facing.toLowerCase()} facing, located on the ${floorCategory.toLowerCase()} floor. ${tags.includes('Balcony') ? 'Features a spacious balcony.' : ''} ${tags.includes('Study Room') ? 'Includes an additional study room.' : ''}`,
          balcony: tags.includes('Balcony'),
          study: unitTypeData.type.includes('Study'),
          estimatedMortgage: Math.round((price * 0.75 * 0.04) / 12),
          block,
        };
        
        units.push(unit);
        unitCount++;
        
        if (unitCount > 600) break;
      }
      if (unitCount > 600) break;
    }
    if (unitCount > 600) break;
  });
  
  return units.slice(0, 600);
};

export const units = generateUnits();

// Sample shortlisted units
export const initialShortlist: ShortlistedUnit[] = [
  {
    ...units.find(u => u.unitNumber === '#12-03')!,
    shortlistedAt: new Date('2026-03-26'),
  },
  {
    ...units.find(u => u.unitNumber === '#10-05')!,
    shortlistedAt: new Date('2026-03-26'),
  },
  {
    ...units.find(u => u.unitNumber === '#15-01')!,
    shortlistedAt: new Date('2026-03-25'),
  },
];

// Sample appointment
export const sampleAppointment: Appointment = {
  id: 'apt-001',
  type: 'showflat',
  date: new Date('2026-03-28'),
  time: '14:00',
  consultant: {
    name: 'Sarah Tan',
    phone: '+65 9123 4567',
  },
  location: 'Showflat at 123 Marine Parade Rd',
};

// Sample EOI
export const sampleEOI: EOI = {
  id: 'eoi-001',
  referenceNumber: 'EOI-2026-0342',
  status: 'submitted',
  submittedAt: new Date('2026-03-27T15:15:00'),
  preferredUnits: ['#12-03', '#10-05', '#15-01'],
  documents: {
    nric: true,
    income: true,
    funds: false,
    optionFee: false,
  },
};

// Sample notifications
export const sampleNotifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'eoi',
    title: 'EOI Update',
    message: 'Your EOI-2026-0342 is now under review. Est. 3 working days for response.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: 'notif-002',
    type: 'appointment',
    title: 'Appointment Reminder',
    message: 'Showflat visit tomorrow at 2:00 PM. Tap for directions.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: 'notif-003',
    type: 'price',
    title: 'Price Update',
    message: 'New early bird pricing for 2BR units. Starts from $1.88M.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: 'notif-004',
    type: 'availability',
    title: 'Unit Availability',
    message: '#08-02 3BR is now available. Matches your saved search.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    read: true,
  },
];

// Chat messages
export interface ChatMessage {
  id: string;
  role: 'bot' | 'user';
  content: string;
  timestamp: Date;
  units?: Unit[];
  quickReplies?: string[];
}

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-001',
    role: 'bot',
    content: 'Welcome to Project Lighthouse 👋\nI can help you find the right unit.\nWhat matters most to you?',
    timestamp: new Date(),
    quickReplies: ['High floor', 'Pool view', 'Under $2M', '3 bedrooms'],
  },
];
