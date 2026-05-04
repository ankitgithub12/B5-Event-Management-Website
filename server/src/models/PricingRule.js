import mongoose from 'mongoose';

const pricingRulesSchema = new mongoose.Schema({
  type: { type: String, required: true, unique: true, default: 'config' },
  baseCostPerGuest: {
    wedding: { type: Number, default: 2500 },
    engagement: { type: Number, default: 1800 },
    corporate: { type: Number, default: 2000 },
    birthday: { type: Number, default: 1200 },
    anniversary: { type: Number, default: 1500 },
    small: { type: Number, default: 1000 },
  },
  serviceCosts: { type: Map, of: Number }, // Maps service keys (e.g., 'venue_basic') to prices
  locationMultiplier: {
    tier1: { type: Number, default: 1.3 },
    tier2: { type: Number, default: 1.1 },
    tier3: { type: Number, default: 1.0 },
    destination: { type: Number, default: 1.8 },
  },
  guestBrackets: [
    { max: Number, multiplier: Number }
  ],
  packageThresholds: {
    basic: { type: Number, default: 600000 },
    medium: { type: Number, default: 1500000 },
    premium: { type: Number, default: 3000000 },
  }
}, { timestamps: true });

export default mongoose.model('PricingRule', pricingRulesSchema);
