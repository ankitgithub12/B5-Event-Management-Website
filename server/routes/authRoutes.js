import express from 'express';
import { authUser, getUserProfile, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { upload } from '../config/cloudinaryConfig.js';

const router = express.Router();

router.post('/login', authLimiter, authUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, upload.single('profilePhoto'), updateUserProfile);

export default router;
