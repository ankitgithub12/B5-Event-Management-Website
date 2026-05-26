import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  },
  priceRange: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  includes: {
    type: [String],
    default: [],
  },
  popularAddOn: {
    type: String,
  },
  pastEvent: {
    type: String,
  },
}, {
  timestamps: true,
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
