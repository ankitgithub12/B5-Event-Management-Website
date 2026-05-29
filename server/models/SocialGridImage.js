import mongoose from 'mongoose';

const socialGridImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const SocialGridImage = mongoose.model('SocialGridImage', socialGridImageSchema);

export default SocialGridImage;
