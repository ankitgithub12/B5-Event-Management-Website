import HospitalityService from '../models/HospitalityService.js';
import { cloudinary } from '../config/cloudinaryConfig.js';

// ─── GET /api/hospitality — public ─────────────────────────────────────────
export const getHospitalityServices = async (req, res) => {
  try {
    const services = await HospitalityService.find({})
      .sort({ order: 1, createdAt: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── POST /api/hospitality — admin ─────────────────────────────────────────
export const createHospitalityService = async (req, res) => {
  try {
    const { title, description, responsibilities, staff, icon, order, isActive } = req.body;
    let imageUrl = '';
    let cloudinaryId = '';

    if (req.file) {
      imageUrl = req.file.path;
      cloudinaryId = req.file.filename;
    }

    const service = new HospitalityService({
      title,
      description,
      responsibilities: parseList(responsibilities),
      staff: parseList(staff),
      icon: icon || 'Users',
      order: order ?? (await HospitalityService.countDocuments()),
      isActive: isActive !== undefined ? isActive : true,
      image: imageUrl,
      cloudinaryId,
    });

    const created = await service.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ─── PUT /api/hospitality/:id — admin ──────────────────────────────────────
export const updateHospitalityService = async (req, res) => {
  try {
    const { title, description, responsibilities, staff, icon, order, isActive } = req.body;

    const service = await HospitalityService.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    if (title !== undefined) service.title = title;
    if (description !== undefined) service.description = description;
    if (responsibilities !== undefined) service.responsibilities = parseList(responsibilities);
    if (staff !== undefined) service.staff = parseList(staff);
    if (icon !== undefined) service.icon = icon;
    if (order !== undefined) service.order = order;
    if (isActive !== undefined) service.isActive = isActive;

    if (req.file) {
      // Remove old image from Cloudinary
      if (service.cloudinaryId) {
        await cloudinary.uploader.destroy(service.cloudinaryId);
      }
      service.image = req.file.path;
      service.cloudinaryId = req.file.filename;
    }

    const updated = await service.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ─── DELETE /api/hospitality/:id — admin ───────────────────────────────────
export const deleteHospitalityService = async (req, res) => {
  try {
    const service = await HospitalityService.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    
    // Remove image from Cloudinary if exists
    if (service.cloudinaryId) {
      await cloudinary.uploader.destroy(service.cloudinaryId);
    }
    
    await service.deleteOne();
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Helper: parse comma-string or array ────────────────────────────────────
function parseList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return value.split('\n').map(s => s.trim()).filter(Boolean);
}
