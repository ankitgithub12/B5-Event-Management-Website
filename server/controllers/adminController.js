import Notification from '../models/Notification.js';
import Example from '../models/Example.js';
import jwt from 'jsonwebtoken';

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@b5eventory.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (email === adminEmail && password === adminPassword) {
      // Create JWT token
      const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'secret_key', {
        expiresIn: '24h',
      });

      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // In a real app, you'd query real models like Event, Booking, User
    const totalEvents = await Example.countDocuments();
    const recentNotifications = await Notification.find().sort({ createdAt: -1 }).limit(5);
    const unreadNotificationsCount = await Notification.countDocuments({ isRead: false });

    res.json({
      stats: {
        totalEvents,
        totalBookings: 12, // Mock data for now
        totalRevenue: 45000, // Mock data for now
        activeUsers: 8, // Mock data for now
      },
      recentNotifications,
      unreadNotificationsCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (notification) {
      notification.isRead = true;
      await notification.save();
      res.json(notification);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
