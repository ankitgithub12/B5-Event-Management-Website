import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  leftImageUrl: {
    type: String,
    required: true,
  },
  leftImageCloudinaryId: {
    type: String,
  },
  rightImageUrl: {
    type: String,
    required: true,
  },
  rightImageCloudinaryId: {
    type: String,
  },
  badgeText: {
    type: String,
    required: true,
    default: '✨ WE DESIGN. YOU CELEBRATE.',
  },
  title: {
    type: String,
    required: true,
    default: 'Where Every Event Becomes a Story',
  },
  subtitle: {
    type: String,
    required: true,
    default: 'Weddings • Engagements • Birthdays • Anniversaries • Corporate Events',
  },
  ctaPrimaryText: {
    type: String,
    required: true,
    default: 'Start Planning',
  },
  ctaPrimaryLink: {
    type: String,
    required: true,
    default: '#contact',
  },
  ctaSecondaryText: {
    type: String,
    required: true,
    default: 'View Packages',
  },
  ctaSecondaryLink: {
    type: String,
    required: true,
    default: '/packages',
  },
}, {
  timestamps: true,
});

const Hero = mongoose.model('Hero', heroSchema);

export default Hero;
