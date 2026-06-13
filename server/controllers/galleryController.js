import Gallery from '../models/Gallery.js';
import { cloudinary } from '../config/cloudinaryConfig.js';

export const getGallery = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category && category !== 'all' ? { category } : {};
    const galleryItems = await Gallery.find(query).sort({ order: 1, createdAt: -1 });
    res.json(galleryItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadGalleryImage = async (req, res) => {
  try {
    const { title, category, span } = req.body;

    // Duplicate check: case-insensitive title match
    const existingItem = await Gallery.findOne({
      title: { $regex: new RegExp(`^${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
    });
    if (existingItem) {
      return res.status(409).json({ message: 'A gallery item with this title already exists.' });
    }
    let imageUrl = '';
    let cloudinaryId = '';

    if (req.file) {
      imageUrl = req.file.path;
      cloudinaryId = req.file.filename;
    } else {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Assign order to maximum order + 1
    const maxOrderItem = await Gallery.findOne().sort({ order: -1 });
    const order = maxOrderItem ? maxOrderItem.order + 1 : 0;

    const galleryItem = new Gallery({
      title,
      category,
      imageUrl,
      cloudinaryId,
      span: span || 'col-span-1 row-span-1',
      order,
    });

    const createdItem = await galleryItem.save();

    // Trigger realtime updates
    const io = req.app.get('io');
    if (io) {
      io.emit('gallery_update');
    }

    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateGalleryImage = async (req, res) => {
  try {
    const { title, category, order, span } = req.body;
    const galleryItem = await Gallery.findById(req.params.id);

    // Duplicate check on update: ensure new title doesn't conflict with another gallery item
    if (title && galleryItem && title.toLowerCase() !== galleryItem.title.toLowerCase()) {
      const existingItem = await Gallery.findOne({
        title: { $regex: new RegExp(`^${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
        _id: { $ne: galleryItem._id },
      });
      if (existingItem) {
        return res.status(409).json({ message: 'A gallery item with this title already exists.' });
      }
    }

    if (galleryItem) {
      galleryItem.title = title || galleryItem.title;
      galleryItem.category = category || galleryItem.category;
      if (span !== undefined) {
        galleryItem.span = span;
      }
      if (order !== undefined) {
        galleryItem.order = Number(order);
      }

      if (req.file) {
        // Remove old image from Cloudinary
        if (galleryItem.cloudinaryId) {
          await cloudinary.uploader.destroy(galleryItem.cloudinaryId);
        }
        galleryItem.imageUrl = req.file.path;
        galleryItem.cloudinaryId = req.file.filename;
      }

      const updatedItem = await galleryItem.save();

      // Trigger realtime updates
      const io = req.app.get('io');
      if (io) {
        io.emit('gallery_update');
      }

      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Gallery item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGalleryImage = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (galleryItem) {
      if (galleryItem.cloudinaryId) {
        await cloudinary.uploader.destroy(galleryItem.cloudinaryId);
      }
      await Gallery.deleteOne({ _id: galleryItem._id });

      // Trigger realtime updates
      const io = req.app.get('io');
      if (io) {
        io.emit('gallery_update');
      }

      res.json({ message: 'Gallery image removed' });
    } else {
      res.status(404).json({ message: 'Gallery item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reorderGallery = async (req, res) => {
  try {
    const { orders } = req.body;
    if (!Array.isArray(orders)) {
      return res.status(400).json({ message: 'Invalid orders data. Must be an array.' });
    }

    const updatePromises = orders.map((item) =>
      Gallery.findByIdAndUpdate(item.id, { order: Number(item.order) })
    );
    await Promise.all(updatePromises);

    // Trigger realtime updates
    const io = req.app.get('io');
    if (io) {
      io.emit('gallery_update');
    }

    res.json({ message: 'Gallery reordered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
