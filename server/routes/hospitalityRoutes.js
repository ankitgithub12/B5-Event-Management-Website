import express from 'express';
import {
  getHospitalityServices,
  createHospitalityService,
  updateHospitalityService,
  deleteHospitalityService,
} from '../controllers/hospitalityController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinaryConfig.js';

const router = express.Router();

const handleUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

// GET /api/hospitality — public
// POST /api/hospitality — admin only
router.route('/')
  .get(getHospitalityServices)
  .post(protect, admin, handleUpload, createHospitalityService);

// PUT /api/hospitality/:id — admin only
// DELETE /api/hospitality/:id — admin only
router.route('/:id')
  .put(protect, admin, handleUpload, updateHospitalityService)
  .delete(protect, admin, deleteHospitalityService);

export default router;
