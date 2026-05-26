import express from 'express';
import { getHero, updateHero } from '../controllers/heroController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinaryConfig.js';

const router = express.Router();

router.route('/')
  .get(getHero)
  .put(protect, admin, upload.fields([
    { name: 'leftImage', maxCount: 1 },
    { name: 'rightImage', maxCount: 1 }
  ]), updateHero);

export default router;
