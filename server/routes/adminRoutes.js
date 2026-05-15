import express from 'express';
import { adminLogin, getDashboardStats, getNotifications, markNotificationRead } from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', adminLogin);

router.get('/stats', getDashboardStats);
router.get('/notifications', getNotifications);
router.patch('/notifications/:id', markNotificationRead);

export default router;
