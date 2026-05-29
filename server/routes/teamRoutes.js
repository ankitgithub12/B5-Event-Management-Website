import express from 'express';
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember, reorderTeamMembers } from '../controllers/teamController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinaryConfig.js';

const router = express.Router();

router.route('/')
  .get(getTeamMembers)
  .post(protect, admin, upload.single('image'), createTeamMember);

router.put('/reorder', protect, admin, reorderTeamMembers);

router.route('/:id')
  .put(protect, admin, upload.single('image'), updateTeamMember)
  .delete(protect, admin, deleteTeamMember);

export default router;
