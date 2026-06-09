import express from 'express';
import { getServices, createService, updateService, deleteService, getServiceById } from '../controllers/serviceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinaryConfig.js';


const router = express.Router();

router.route('/')
  .get(getServices)
  .post(protect, admin, upload.single('image'), createService);

router.route('/:id')
  .get(getServiceById)
  .put(protect, admin, upload.single('image'), updateService)
  .delete(protect, admin, deleteService);


export default router;
