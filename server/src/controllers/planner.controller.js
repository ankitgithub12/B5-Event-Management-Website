import PricingRule from '../models/PricingRule.js';

// Get the guest-count discount multiplier
const getGuestMultiplier = (guestCount, brackets) => {
  // brackets should be sorted by max ascending
  const bracket = brackets.find((b) => guestCount <= b.max);
  return bracket ? bracket.multiplier : 0.8; // default fallback
};

// @desc    Calculate estimate cost
// @route   POST /api/planner/estimate
// @access  Public
export const calculateEstimate = async (req, res, next) => {
  try {
    const { eventType, guestCount, locationTier, addons = [] } = req.body;

    // Fetch pricing rules from DB
    // In a real app, you might cache this. For now, we find the single config doc.
    const rules = await PricingRule.findOne({ type: 'config' });

    if (!rules) {
      res.status(500);
      throw new Error('Pricing rules not configured in database');
    }

    const baseCPG = rules.baseCostPerGuest[eventType] || 1500;
    const guestMult = getGuestMultiplier(guestCount, rules.guestBrackets);
    const locMult = rules.locationMultiplier[locationTier] || 1.0;

    const cateringCost = baseCPG * guestCount * guestMult;
    
    // Calculate addon total
    const serviceCosts = rules.serviceCosts;
    const addonTotal = addons.reduce((sum, key) => sum + (serviceCosts.get(key) || 0), 0);

    const subtotal = (cateringCost + addonTotal) * locMult;
    const gst = subtotal * 0.18;
    const total = Math.round(subtotal + gst);

    const breakdown = {
      catering: Math.round(cateringCost * locMult),
      addons: Math.round(addonTotal * locMult),
      gst: Math.round(gst),
      total,
    };

    // Suggest a package tier
    let suggestedPackage = 'luxury';
    if (total <= rules.packageThresholds.basic) suggestedPackage = 'basic';
    else if (total <= rules.packageThresholds.medium) suggestedPackage = 'medium';
    else if (total <= rules.packageThresholds.premium) suggestedPackage = 'premium';

    res.json({
      total,
      breakdown,
      suggestedPackage,
    });
  } catch (error) {
    next(error);
  }
};
