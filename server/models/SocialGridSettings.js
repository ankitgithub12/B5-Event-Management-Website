import mongoose from 'mongoose';

const socialGridSettingsSchema = new mongoose.Schema({
  sectionTitle: {
    type: String,
    required: true,
    default: 'FOLLOW OUR JOURNEY',
  },
  instagramHandle: {
    type: String,
    required: true,
    default: '@b5eventory',
  },
}, {
  timestamps: true,
});

const SocialGridSettings = mongoose.model('SocialGridSettings', socialGridSettingsSchema);

export default SocialGridSettings;
