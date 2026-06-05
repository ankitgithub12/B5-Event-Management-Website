import express from 'express';
import { getHero, updateHero, deleteHeroSlide } from '../controllers/heroController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinaryConfig.js';

const router = express.Router();

// GET /api/hero — public
// PUT /api/hero — admin only, multipart (up to 10 slideshow images)
router.route('/')
  .get(getHero)
  .put(protect, admin, upload.fields([
    { name: 'slideshowImages', maxCount: 10 },
  ]), updateHero);

// DELETE /api/hero/slide/:slideId — remove one slide from Cloudinary + DB
router.delete('/slide/:slideId', protect, admin, deleteHeroSlide);

export default router;
