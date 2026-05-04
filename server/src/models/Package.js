import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  pkgId: { type: String, required: true, unique: true }, // e.g., 'basic', 'medium'
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  priceRange: {
    min: { type: Number, required: true },
    max: { type: Number, default: null }
  },
  displayPrice: { type: String, required: true },
  color: { type: String, required: true },
  gradient: { type: String, required: true },
  popular: { type: Boolean, default: false },
  icon: { type: String, required: true },
  includes: [{ type: String }],
  excludes: [{ type: String }],
}, { timestamps: true });

export default mongoose.model('Package', packageSchema);
