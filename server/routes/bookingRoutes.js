import express from 'express';
import { getBookings, createBooking, updateBooking, deleteBooking } from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { apiSubmitLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.route('/')
  .get(protect, admin, getBookings)
  .post(apiSubmitLimiter, createBooking);

router.route('/:id')
  .put(protect, admin, updateBooking)
  .delete(protect, admin, deleteBooking);

export default router;
