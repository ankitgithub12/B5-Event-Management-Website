import express from 'express';
import {
  getSocialGrid,
  updateSocialSettings,
  addSocialImage,
  deleteSocialImage,
  reorderSocialImages
} from '../controllers/socialGridController.js';
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
  .get(getSocialGrid);

router.route('/settings')
  .put(protect, admin, updateSocialSettings);

router.route('/images')
  .post(protect, admin, handleUpload, addSocialImage);

router.route('/images/reorder')
  .put(protect, admin, reorderSocialImages);

router.route('/images/:id')
  .delete(protect, admin, deleteSocialImage);

export default router;
