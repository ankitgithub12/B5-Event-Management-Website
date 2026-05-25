import EventPackage from '../models/EventPackage.js';
import PackageAddon from '../models/PackageAddon.js';

// ==========================================
// Event Packages Controllers
// ==========================================

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
export const getPackages = async (req, res) => {
  try {
    const packages = await EventPackage.find({});
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a package
// @route   POST /api/packages
// @access  Private/Admin
export const createPackage = async (req, res) => {
  try {
    const { name, description, price, features, popular, isActive } = req.body;
    
    const eventPackage = new EventPackage({
      name,
      description,
      price,
      features: Array.isArray(features) ? features : [],
      popular: popular === 'true' || popular === true,
      isActive: isActive === 'true' || isActive === true,
    });

    const createdPackage = await eventPackage.save();
    res.status(201).json(createdPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a package
// @route   PUT /api/packages/:id
// @access  Private/Admin
export const updatePackage = async (req, res) => {
  try {
    const { name, description, price, features, popular, isActive } = req.body;
    const eventPackage = await EventPackage.findById(req.params.id);

    if (eventPackage) {
      eventPackage.name = name || eventPackage.name;
      eventPackage.description = description || eventPackage.description;
      eventPackage.price = price || eventPackage.price;
      if (features !== undefined) {
        eventPackage.features = Array.isArray(features) ? features : eventPackage.features;
      }
      if (popular !== undefined) {
        eventPackage.popular = popular === 'true' || popular === true;
      }
      if (isActive !== undefined) {
        eventPackage.isActive = isActive === 'true' || isActive === true;
      }

      const updatedPackage = await eventPackage.save();
      res.json(updatedPackage);
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
export const deletePackage = async (req, res) => {
  try {
    const eventPackage = await EventPackage.findById(req.params.id);

    if (eventPackage) {
      await EventPackage.deleteOne({ _id: eventPackage._id });
      res.json({ message: 'Package removed' });
    } else {
      res.status(404).json({ message: 'Package not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// Add-on Services Controllers
// ==========================================

// @desc    Get all addons
// @route   GET /api/packages/addons
// @access  Public
export const getAddons = async (req, res) => {
  try {
    const addons = await PackageAddon.find({});
    res.json(addons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an addon
// @route   POST /api/packages/addons
// @access  Private/Admin
export const createAddon = async (req, res) => {
  try {
    const { name, price, description, isActive } = req.body;

    const addon = new PackageAddon({
      name,
      price,
      description,
      isActive: isActive === 'true' || isActive === true,
    });

    const createdAddon = await addon.save();
    res.status(201).json(createdAddon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an addon
// @route   PUT /api/packages/addons/:id
// @access  Private/Admin
export const updateAddon = async (req, res) => {
  try {
    const { name, price, description, isActive } = req.body;
    const addon = await PackageAddon.findById(req.params.id);

    if (addon) {
      addon.name = name || addon.name;
      addon.price = price || addon.price;
      addon.description = description || addon.description;
      if (isActive !== undefined) {
        addon.isActive = isActive === 'true' || isActive === true;
      }

      const updatedAddon = await addon.save();
      res.json(updatedAddon);
    } else {
      res.status(404).json({ message: 'Addon not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an addon
// @route   DELETE /api/packages/addons/:id
// @access  Private/Admin
export const deleteAddon = async (req, res) => {
  try {
    const addon = await PackageAddon.findById(req.params.id);

    if (addon) {
      await PackageAddon.deleteOne({ _id: addon._id });
      res.json({ message: 'Addon removed' });
    } else {
      res.status(404).json({ message: 'Addon not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
