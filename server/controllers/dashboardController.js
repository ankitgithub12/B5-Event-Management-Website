import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import User from '../models/User.js';
import Service from '../models/Service.js';

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    // 1. Core Card Stats
    const totalBookings = await Booking.countDocuments();
    const totalEvents = await Event.countDocuments();
    const activeUsers = await User.countDocuments();
    const activeServices = await Service.countDocuments({ isActive: true });

    // Calculate dynamic total revenue from Confirmed & Completed bookings
    const revenueData = await Booking.aggregate([
      { $match: { status: { $in: ['Confirmed', 'Completed'] } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const totalRevenue = revenueData[0]?.total || 0;

    // 2. Recent Bookings (limit to 5)
    const recentBookings = await Booking.find({})
      .sort({ createdAt: -1 })
      .limit(5);

    // 3. Dynamic monthly chart data (past 6 months)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const chartData = [];

    // Construct chart data for the last 6 months
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const startOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
      const endOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);

      // Bookings in this month
      const bookingsCount = await Booking.countDocuments({
        eventDate: { $gte: startOfMonth, $lte: endOfMonth }
      });

      // Revenue in this month
      const monthlyRevenueData = await Booking.aggregate([
        { 
          $match: { 
            status: { $in: ['Confirmed', 'Completed'] },
            eventDate: { $gte: startOfMonth, $lte: endOfMonth }
          } 
        },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);
      const monthlyRevenue = monthlyRevenueData[0]?.total || 0;

      chartData.push({
        name: months[d.getMonth()],
        revenue: monthlyRevenue,
        bookings: bookingsCount
      });
    }

    res.json({
      stats: {
        totalRevenue: `$${totalRevenue.toLocaleString()}`,
        totalBookings,
        activeUsers,
        activeServices
      },
      chartData,
      recentBookings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
