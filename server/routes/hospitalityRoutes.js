import express from 'express';
import {
  getHospitalityServices,
  createHospitalityService,
  updateHospitalityService,
  deleteHospitalityService,
} from '../controllers/hospitalityController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/hospitality — public
// POST /api/hospitality — admin only
router.route('/')
  .get(getHospitalityServices)
  .post(protect, admin, createHospitalityService);

// PUT /api/hospitality/:id — admin only
// DELETE /api/hospitality/:id — admin only
router.route('/:id')
  .put(protect, admin, updateHospitalityService)
  .delete(protect, admin, deleteHospitalityService);

export default router;
