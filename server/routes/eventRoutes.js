import express from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinaryConfig.js';

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protect, admin, upload.single('image'), createEvent);

router.route('/:id')
  .put(protect, admin, upload.single('image'), updateEvent)
  .delete(protect, admin, deleteEvent);

export default router;
