import mongoose from 'mongoose';

const slideshowImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    default: '',
  },
  order: {
    type: Number,
    default: 0,
  },
}, { _id: true });

const heroSchema = new mongoose.Schema({
  // New: array of slideshow images (replaces leftImageUrl / rightImageUrl)
  slideshowImages: {
    type: [slideshowImageSchema],
    default: [],
  },

  // Legacy fields — kept temporarily for migration; will be removed after first migration
  leftImageUrl: { type: String },
  leftImageCloudinaryId: { type: String },
  rightImageUrl: { type: String },
  rightImageCloudinaryId: { type: String },

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
    default: '/contact',
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
