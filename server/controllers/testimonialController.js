import Testimonial from '../models/Testimonial.js';
import { cloudinary } from '../config/cloudinaryConfig.js';

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
export const createTestimonial = async (req, res) => {
  try {
    const { name, role, text, rating } = req.body;
    let image = '';
    let cloudinaryId = '';

    if (req.file) {
      image = req.file.path;
      cloudinaryId = req.file.filename;
    } else {
      // Generate standard ui-avatar as fallback
      image = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3B1E54&color=C89E62&size=150&bold=true&font-size=0.4`;
    }

    const maxOrderItem = await Testimonial.findOne().sort({ order: -1 });
    const order = maxOrderItem ? maxOrderItem.order + 1 : 0;

    const testimonial = new Testimonial({
      name,
      role,
      text,
      rating: rating ? Number(rating) : 5,
      image,
      cloudinaryId,
      order,
    });

    const createdItem = await testimonial.save();

    // Trigger realtime update via Socket.io
    const io = req.app.get('io');
    if (io) {
      io.emit('testimonial_update');
    }

    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
export const updateTestimonial = async (req, res) => {
  try {
    const { name, role, text, rating, order } = req.body;
    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
      testimonial.name = name || testimonial.name;
      testimonial.role = role || testimonial.role;
      testimonial.text = text || testimonial.text;
      
      if (rating !== undefined) {
        testimonial.rating = Number(rating);
      }
      if (order !== undefined) {
        testimonial.order = Number(order);
      }

      if (req.file) {
        // Remove old image from Cloudinary if it was custom uploaded
        if (testimonial.cloudinaryId) {
          await cloudinary.uploader.destroy(testimonial.cloudinaryId);
        }
        testimonial.image = req.file.path;
        testimonial.cloudinaryId = req.file.filename;
      } else if (req.body.image) {
        testimonial.image = req.body.image;
      }

      const updatedItem = await testimonial.save();

      // Trigger realtime update via Socket.io
      const io = req.app.get('io');
      if (io) {
        io.emit('testimonial_update');
      }

      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
      // Remove custom uploaded image from Cloudinary
      if (testimonial.cloudinaryId) {
        await cloudinary.uploader.destroy(testimonial.cloudinaryId);
      }
      await Testimonial.deleteOne({ _id: testimonial._id });

      // Trigger realtime update via Socket.io
      const io = req.app.get('io');
      if (io) {
        io.emit('testimonial_update');
      }

      res.json({ message: 'Testimonial removed successfully' });
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reorder testimonials
// @route   PUT /api/testimonials/reorder
// @access  Private/Admin
export const reorderTestimonials = async (req, res) => {
  try {
    const { orders } = req.body; // Array of { id, order }
    if (!Array.isArray(orders)) {
      return res.status(400).json({ message: 'Invalid orders data. Must be an array.' });
    }

    const updatePromises = orders.map((item) =>
      Testimonial.findByIdAndUpdate(item.id, { order: Number(item.order) })
    );
    await Promise.all(updatePromises);

    // Trigger realtime update via Socket.io
    const io = req.app.get('io');
    if (io) {
      io.emit('testimonial_update');
    }

    res.json({ message: 'Testimonials reordered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
