import express from 'express';
import { getForms, submitForm, updateFormStatus, deleteForm } from '../controllers/formController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, admin, getForms)
  .post(submitForm);

router.route('/:id')
  .put(protect, admin, updateFormStatus)
  .delete(protect, admin, deleteForm);

export default router;
