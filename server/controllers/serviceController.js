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
    const { title, description, priceRange, isActive, includes, popularAddOn } = req.body;
    let imageUrl = '';
    let cloudinaryId = '';

    if (req.file) {
      imageUrl = req.file.path;
      cloudinaryId = req.file.filename;
    }

    let parsedIncludes = [];
    if (includes) {
      if (typeof includes === 'string') {
        try {
          parsedIncludes = JSON.parse(includes);
        } catch (e) {
          parsedIncludes = includes.split(',').map(item => item.trim()).filter(Boolean);
        }
      } else if (Array.isArray(includes)) {
        parsedIncludes = includes;
      }
    }

    const service = new Service({
      title,
      description,
      priceRange,
      isActive: isActive === 'true' || isActive === true,
      imageUrl,
      cloudinaryId,
      includes: parsedIncludes,
      popularAddOn,
    });

    const createdService = await service.save();

    // Trigger realtime updates
    const io = req.app.get('io');
    if (io) {
      io.emit('services_update');
    }

    res.status(201).json(createdService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { title, description, priceRange, isActive, includes, popularAddOn } = req.body;
    const service = await Service.findById(req.params.id);

    if (service) {
      service.title = title || service.title;
      service.description = description || service.description;
      service.priceRange = priceRange !== undefined ? priceRange : service.priceRange;
      service.popularAddOn = popularAddOn !== undefined ? popularAddOn : service.popularAddOn;
      
      if (isActive !== undefined) {
        service.isActive = isActive === 'true' || isActive === true;
      }

      if (includes !== undefined) {
        let parsedIncludes = [];
        if (typeof includes === 'string') {
          try {
            parsedIncludes = JSON.parse(includes);
          } catch (e) {
            parsedIncludes = includes.split(',').map(item => item.trim()).filter(Boolean);
          }
        } else if (Array.isArray(includes)) {
          parsedIncludes = includes;
        }
        service.includes = parsedIncludes;
      }

      if (req.file) {
        if (service.cloudinaryId) {
          await cloudinary.uploader.destroy(service.cloudinaryId);
        }
        service.imageUrl = req.file.path;
        service.cloudinaryId = req.file.filename;
      }

      const updatedService = await service.save();

      // Trigger realtime updates
      const io = req.app.get('io');
      if (io) {
        io.emit('services_update');
      }

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

      // Trigger realtime updates
      const io = req.app.get('io');
      if (io) {
        io.emit('services_update');
      }

      res.json({ message: 'Service removed' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
