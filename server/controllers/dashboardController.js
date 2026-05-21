import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import User from '../models/User.js';
import Service from '../models/Service.js';

// Helper to calculate percentage growth
const calculateGrowth = (current, previous) => {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }
  return ((current - previous) / previous) * 100;
};

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    // 1. Core Card Stats
    const totalBookings = await Booking.countDocuments();
    const activeUsers = await User.countDocuments();
    const completedEvents = await Event.countDocuments({ status: 'Completed' });

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

    // 4. Growth Calculations (comparing current month vs previous month)
    // Index 5 is current month, Index 4 is previous month in our 6-month loop
    const currentMonthBookings = chartData[5]?.bookings || 0;
    const previousMonthBookings = chartData[4]?.bookings || 0;
    const bookingsGrowth = calculateGrowth(currentMonthBookings, previousMonthBookings);

    const currentMonthRevenue = chartData[5]?.revenue || 0;
    const previousMonthRevenue = chartData[4]?.revenue || 0;
    const revenueGrowth = calculateGrowth(currentMonthRevenue, previousMonthRevenue);

    // For users and events growth, get count for current month and previous month
    const startOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfPreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59);

    // Current month completed events
    const currentMonthEvents = await Event.countDocuments({
      status: 'Completed',
      date: { $gte: startOfCurrentMonth }
    });
    // Previous month completed events
    const previousMonthEvents = await Event.countDocuments({
      status: 'Completed',
      date: { $gte: startOfPreviousMonth, $lte: endOfPreviousMonth }
    });
    const eventsGrowth = calculateGrowth(currentMonthEvents, previousMonthEvents);

    // Current month users registered
    const currentMonthUsers = await User.countDocuments({
      createdAt: { $gte: startOfCurrentMonth }
    });
    // Previous month users registered
    const previousMonthUsers = await User.countDocuments({
      createdAt: { $gte: startOfPreviousMonth, $lte: endOfPreviousMonth }
    });
    const usersGrowth = calculateGrowth(currentMonthUsers, previousMonthUsers);

    res.json({
      totalRevenue,
      revenueGrowth,
      totalBookings,
      bookingsGrowth,
      activeUsers,
      usersGrowth,
      completedEvents,
      eventsGrowth,
      recentBookings,
      monthlyStats: chartData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
