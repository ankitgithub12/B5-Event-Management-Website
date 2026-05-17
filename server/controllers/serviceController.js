import Service from '../models/Service.js';
import { cloudinary } from '../config/cloudinaryConfig.js';

export const getServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const { title, description, priceRange, isActive } = req.body;
    let imageUrl = '';
    let cloudinaryId = '';

    if (req.file) {
      imageUrl = req.file.path;
      cloudinaryId = req.file.filename;
    }

    const service = new Service({
      title,
      description,
      priceRange,
      isActive: isActive === 'true' || isActive === true,
      imageUrl,
      cloudinaryId,
    });

    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { title, description, priceRange, isActive } = req.body;
    const service = await Service.findById(req.params.id);

    if (service) {
      service.title = title || service.title;
      service.description = description || service.description;
      service.priceRange = priceRange || service.priceRange;
      if (isActive !== undefined) {
        service.isActive = isActive === 'true' || isActive === true;
      }

      if (req.file) {
        if (service.cloudinaryId) {
          await cloudinary.uploader.destroy(service.cloudinaryId);
        }
        service.imageUrl = req.file.path;
        service.cloudinaryId = req.file.filename;
      }

      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      if (service.cloudinaryId) {
        await cloudinary.uploader.destroy(service.cloudinaryId);
      }
      await Service.deleteOne({ _id: service._id });
      res.json({ message: 'Service removed' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
