import SocialGridSettings from '../models/SocialGridSettings.js';
import SocialGridImage from '../models/SocialGridImage.js';
import { cloudinary } from '../config/cloudinaryConfig.js';

// Get social grid settings and images
export const getSocialGrid = async (req, res) => {
  try {
    let settings = await SocialGridSettings.findOne({});
    if (!settings) {
      settings = new SocialGridSettings({
        sectionTitle: 'FOLLOW OUR JOURNEY',
        instagramHandle: '@b5eventory',
      });
      await settings.save();
    }

    const images = await SocialGridImage.find({}).sort({ order: 1, createdAt: -1 });
    res.json({ settings, images });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update social settings
export const updateSocialSettings = async (req, res) => {
  try {
    const { sectionTitle, instagramHandle } = req.body;

    let settings = await SocialGridSettings.findOne({});
    if (!settings) {
      settings = new SocialGridSettings();
    }

    if (sectionTitle !== undefined) settings.sectionTitle = sectionTitle;
    if (instagramHandle !== undefined) settings.instagramHandle = instagramHandle;

    const updatedSettings = await settings.save();

    // Trigger realtime updates
    const io = req.app.get('io');
    if (io) {
      io.emit('social_grid_update');
    }

    res.json(updatedSettings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add social image
export const addSocialImage = async (req, res) => {
  try {
    let imageUrl = '';
    let cloudinaryId = '';

    if (req.file) {
      imageUrl = req.file.path;
      cloudinaryId = req.file.filename;
    } else {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Get max order
    const maxOrderItem = await SocialGridImage.findOne().sort({ order: -1 });
    const order = maxOrderItem ? maxOrderItem.order + 1 : 0;

    const newImage = new SocialGridImage({
      imageUrl,
      cloudinaryId,
      order,
    });

    const createdImage = await newImage.save();

    // Trigger realtime updates
    const io = req.app.get('io');
    if (io) {
      io.emit('social_grid_update');
    }

    res.status(201).json(createdImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete social image
export const deleteSocialImage = async (req, res) => {
  try {
    const imageItem = await SocialGridImage.findById(req.params.id);

    if (imageItem) {
      // Don't delete from Cloudinary if it is a seeded image (starts with seeded_social_)
      if (imageItem.cloudinaryId && !imageItem.cloudinaryId.startsWith('seeded_social_')) {
        await cloudinary.uploader.destroy(imageItem.cloudinaryId);
      }

      await SocialGridImage.deleteOne({ _id: imageItem._id });

      // Trigger realtime updates
      const io = req.app.get('io');
      if (io) {
        io.emit('social_grid_update');
      }

      res.json({ message: 'Social image removed' });
    } else {
      res.status(404).json({ message: 'Social image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reorder social images
export const reorderSocialImages = async (req, res) => {
  try {
    const { orders } = req.body;
    if (!Array.isArray(orders)) {
      return res.status(400).json({ message: 'Invalid orders data. Must be an array.' });
    }

    const updatePromises = orders.map((item) =>
      SocialGridImage.findByIdAndUpdate(item.id, { order: Number(item.order) })
    );
    await Promise.all(updatePromises);

    // Trigger realtime updates
    const io = req.app.get('io');
    if (io) {
      io.emit('social_grid_update');
    }

    res.json({ message: 'Social grid images reordered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
