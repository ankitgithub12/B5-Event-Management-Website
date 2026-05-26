import express from 'express';
import { 
  getGallery, 
  uploadGalleryImage, 
  updateGalleryImage, 
  deleteGalleryImage,
  reorderGallery
} from '../controllers/galleryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinaryConfig.js';

const router = express.Router();

// Middleware helper to run multer and catch size limits/mimetype errors gracefully
const handleUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

router.route('/')
  .get(getGallery)
  .post(protect, admin, handleUpload, uploadGalleryImage);

router.route('/reorder')
  .put(protect, admin, reorderGallery);

router.route('/:id')
  .put(protect, admin, handleUpload, updateGalleryImage)
  .delete(protect, admin, deleteGalleryImage);

export default router;
