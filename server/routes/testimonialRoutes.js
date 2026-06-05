import express from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  reorderTestimonials,
} from '../controllers/testimonialController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinaryConfig.js';

const router = express.Router();

// Helper to catch size limit / file type errors from multer and respond gracefully
const handleUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

router.route('/')
  .get(getTestimonials)
  .post(protect, admin, handleUpload, createTestimonial);

router.route('/reorder')
  .put(protect, admin, reorderTestimonials);

router.route('/:id')
  .put(protect, admin, handleUpload, updateTestimonial)
  .delete(protect, admin, deleteTestimonial);

export default router;
