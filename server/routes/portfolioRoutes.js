import express from 'express';
import { getPortfolios, createPortfolio, updatePortfolio, deletePortfolio } from '../controllers/portfolioController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinaryConfig.js';

const router = express.Router();

router.route('/')
  .get(getPortfolios)
  .post(protect, admin, upload.single('image'), createPortfolio);

router.route('/:id')
  .put(protect, admin, upload.single('image'), updatePortfolio)
  .delete(protect, admin, deletePortfolio);

export default router;
