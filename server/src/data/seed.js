import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Package from '../models/Package.js';
import PricingRule from '../models/PricingRule.js';

dotenv.config();

const packages = [
  {
    pkgId: 'basic',
    name: 'Basic',
    tagline: 'A Beautiful Beginning',
    priceRange: { min: 400000, max: 600000 },
    displayPrice: '₹4 – 6 Lakhs',
    color: '#6366F1',
    gradient: 'linear-gradient(135deg,#4F46E5,#7C3AED)',
    popular: false,
    icon: '💐',
    includes: [
      'Basic venue decoration',
      'Standard photography (1 photographer)',
      'Buffet catering (up to 100 guests)',
      'Basic floral arrangements',
      'Event coordination (1 day)',
      'Invitation design (digital)',
    ],
    excludes: [
      'Videography',
      'Pre-wedding shoot',
      'DJ & entertainment',
      'Drone footage',
      'Accommodation',
      'Destination options',
    ],
  },
  {
    pkgId: 'medium',
    name: 'Medium',
    tagline: 'Elegance Redefined',
    priceRange: { min: 1000000, max: 1500000 },
    displayPrice: '₹10 – 15 Lakhs',
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg,#7C3AED,#9333EA)',
    popular: true,
    icon: '💍',
    includes: [
      'Themed venue decoration',
      'Photography & videography',
      'Pre-wedding shoot (local)',
      'Multi-cuisine catering (up to 200 guests)',
      'DJ & sound system',
      'Floral centrepieces & mandap',
      'Event coordination (2 days)',
      'Printed invitations',
    ],
    excludes: [
      'Drone footage',
      'Destination shoot',
      'Accommodation',
      'Live performers',
      'Cinematic video production',
    ],
  },
  {
    pkgId: 'premium',
    name: 'Premium',
    tagline: 'Pure Luxury, No Compromise',
    priceRange: { min: 2500000, max: 3000000 },
    displayPrice: '₹25 – 30 Lakhs',
    color: '#9333EA',
    gradient: 'linear-gradient(135deg,#9333EA,#D4AF37)',
    popular: false,
    icon: '👑',
    includes: [
      'Luxury venue with premium décor',
      'Drone shoot & cinematic video',
      'Pre-wedding shoot (premium location)',
      'Fine-dining catering (up to 400 guests)',
      'Full entertainment setup (DJ + live band)',
      'Makeup & styling for couple',
      'Coordinated transportation',
      'Event coordination (3 days)',
      'Designer invitations',
      'Photo album & highlights reel',
    ],
    excludes: [
      'Destination wedding setup',
      'International accommodation',
      'International pre-wedding shoot',
    ],
  },
  {
    pkgId: 'luxury',
    name: 'Luxury',
    tagline: 'Destination Dreams, Delivered',
    priceRange: { min: 4000000, max: null },
    displayPrice: '₹40 Lakhs+',
    color: '#D4AF37',
    gradient: 'linear-gradient(135deg,#D4AF37,#F0D060)',
    popular: false,
    icon: '✨',
    includes: [
      'Destination wedding (anywhere in India)',
      'Luxury 5-star venue & accommodation',
      'International/destination pre-wedding shoot',
      'Full cinematic production team',
      'Celebrity-style makeup & styling',
      'Gourmet multi-day catering (unlimited guests)',
      'Full entertainment (DJ + live acts + fireworks)',
      'Dedicated wedding planner',
      'Guest transportation & hospitality',
      'Custom printed & digital invitations',
      'Drone + aerial photography',
      'Premium photo books & films',
    ],
    excludes: [],
  },
];

const pricingRule = {
  type: 'config',
  baseCostPerGuest: {
    wedding: 2500,
    engagement: 1800,
    corporate: 2000,
    birthday: 1200,
    anniversary: 1500,
    small: 1000,
  },
  serviceCosts: {
    venue_basic: 100000, venue_premium: 300000, venue_luxury: 700000,
    photography_basic: 50000, photography_pro: 120000, photography_full: 200000,
    videography_basic: 40000, videography_pro: 90000, videography_cinema: 180000,
    prewedding_basic: 50000, prewedding_medium: 120000, prewedding_high: 300000,
    makeup_basic: 20000, makeup_pro: 50000, makeup_full: 100000,
    dj: 40000, live_band: 120000, fireworks: 80000,
    drone: 30000,
    transport_basic: 50000, transport_full: 150000,
    accommodation_budget: 80000, accommodation_luxury: 300000,
    invitations_digital: 5000, invitations_print: 25000,
    decor_basic: 80000, decor_themed: 200000, decor_luxury: 500000,
  },
  locationMultiplier: {
    tier1: 1.3, tier2: 1.1, tier3: 1.0, destination: 1.8,
  },
  guestBrackets: [
    { max: 50, multiplier: 1.0 },
    { max: 100, multiplier: 0.95 },
    { max: 200, multiplier: 0.9 },
    { max: 400, multiplier: 0.85 },
    { max: 10000, multiplier: 0.8 },
  ],
  packageThresholds: {
    basic: 600000, medium: 1500000, premium: 3000000
  }
};

const importData = async () => {
  try {
    await connectDB();
    await Package.deleteMany();
    await PricingRule.deleteMany();

    await Package.insertMany(packages);
    await PricingRule.create(pricingRule);

    console.log('Data Imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

importData();
