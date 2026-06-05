import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { cloudinary } from '../config/cloudinaryConfig.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePhotoUrl: user.profilePhotoUrl || '',
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePhotoUrl: user.profilePhotoUrl || '',
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Update user profile (name, email, password, photo)
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      if (req.body.email && req.body.email !== user.email) {
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) {
          return res.status(400).json({ message: 'Email address already in use' });
        }
      }

      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        if (!req.body.currentPassword) {
          return res.status(400).json({ message: 'Current password is required to change password' });
        }
        const isMatch = await user.matchPassword(req.body.currentPassword);
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid current password' });
        }
        user.password = req.body.password;
      }

      // Handle profile photo upload via Cloudinary
      if (req.file) {
        // Delete old photo from Cloudinary if it exists
        if (user.profilePhotoCloudinaryId) {
          await cloudinary.uploader.destroy(user.profilePhotoCloudinaryId);
        }
        user.profilePhotoUrl = req.file.path;
        user.profilePhotoCloudinaryId = req.file.filename;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profilePhotoUrl: updatedUser.profilePhotoUrl || '',
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
