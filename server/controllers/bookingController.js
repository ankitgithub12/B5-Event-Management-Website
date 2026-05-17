import Booking from '../models/Booking.js';

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new booking (from frontend)
// @route   POST /api/bookings
// @access  Public
export const createBooking = async (req, res) => {
  try {
    const { clientName, email, phone, eventType, eventDate, guestCount, notes } = req.body;

    const booking = new Booking({
      clientName,
      email,
      phone,
      eventType,
      eventDate,
      guestCount,
      notes,
    });

    const createdBooking = await booking.save();

    // Emit socket event for real-time notification to admin
    const io = req.app.get('io');
    if (io) {
      io.emit('notification', {
        id: new Date().getTime(),
        title: 'New Booking Request',
        message: `${clientName} requested a ${eventType} on ${new Date(eventDate).toLocaleDateString()}.`,
        isRead: false
      });
    }

    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a booking status
// @route   PUT /api/bookings/:id
// @access  Private/Admin
export const updateBooking = async (req, res) => {
  try {
    const { status, amount } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      booking.status = status || booking.status;
      if (amount !== undefined) booking.amount = amount;

      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      await Booking.deleteOne({ _id: booking._id });
      res.json({ message: 'Booking removed' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
