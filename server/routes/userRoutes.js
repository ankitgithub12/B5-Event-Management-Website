import express from 'express';
import { getUsers, registerUser, deleteUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, admin, getUsers)
  .post(protect, admin, registerUser);

router.route('/:id')
  .delete(protect, admin, deleteUser);

export default router;
