import express from 'express';
import { getGallery, uploadGalleryImage, deleteGalleryImage } from '../controllers/galleryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinaryConfig.js';

const router = express.Router();

router.route('/')
  .get(getGallery)
  .post(protect, admin, upload.single('image'), uploadGalleryImage);

router.route('/:id')
  .delete(protect, admin, deleteGalleryImage);

export default router;
