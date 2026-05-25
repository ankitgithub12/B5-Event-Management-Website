import express from 'express';
import { 
  getPackages, 
  createPackage, 
  updatePackage, 
  deletePackage,
  getAddons,
  createAddon,
  updateAddon,
  deleteAddon
} from '../controllers/packageController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Addons endpoints (MUST be defined before parameterized paths to prevent collisions)
router.route('/addons')
  .get(getAddons)
  .post(protect, admin, createAddon);

router.route('/addons/:id')
  .put(protect, admin, updateAddon)
  .delete(protect, admin, deleteAddon);

// Event Package endpoints
router.route('/')
  .get(getPackages)
  .post(protect, admin, createPackage);

router.route('/:id')
  .put(protect, admin, updatePackage)
  .delete(protect, admin, deletePackage);

export default router;
