import Package from '../models/Package.js';

// @desc    Fetch all packages
// @route   GET /api/packages
// @access  Public
export const getPackages = async (req, res, next) => {
  try {
    // Sort logic or simple return depending on requirements
    const packages = await Package.find({});
    // To maintain the frontend order, we can sort by priceRange.min
    packages.sort((a, b) => a.priceRange.min - b.priceRange.min);
    res.json(packages);
  } catch (error) {
    next(error);
  }
};
