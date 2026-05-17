import Gallery from '../models/Gallery.js';
import { cloudinary } from '../config/cloudinaryConfig.js';

export const getGallery = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const galleryItems = await Gallery.find(query).sort({ createdAt: -1 });
    res.json(galleryItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadGalleryImage = async (req, res) => {
  try {
    const { title, category } = req.body;
    let imageUrl = '';
    let cloudinaryId = '';

    if (req.file) {
      imageUrl = req.file.path;
      cloudinaryId = req.file.filename;
    } else {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const galleryItem = new Gallery({
      title,
      category,
      imageUrl,
      cloudinaryId,
    });

    const createdItem = await galleryItem.save();
    res.status(201).json(createdItem);
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
      res.json({ message: 'Gallery image removed' });
    } else {
      res.status(404).json({ message: 'Gallery item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
