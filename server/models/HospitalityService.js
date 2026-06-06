import mongoose from 'mongoose';

const hospitalityServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: [String],
    default: [],
  },
  staff: {
    type: [String],
    default: [],
  },
  icon: {
    // Store lucide icon name as a string so admin can pick it
    type: String,
    default: 'Users',
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    default: '',
  },
  cloudinaryId: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

const HospitalityService = mongoose.model('HospitalityService', hospitalityServiceSchema);

export default HospitalityService;
