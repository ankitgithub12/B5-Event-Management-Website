import Hero from '../models/Hero.js';
import { cloudinary } from '../config/cloudinaryConfig.js';

export const getHero = async (req, res) => {
  try {
    let hero = await Hero.findOne({});
    if (!hero) {
      // Create and save defaults if none exists
      hero = new Hero({
        leftImageUrl: 'https://images.unsplash.com/photo-1530023367847-a683933f4172',
        rightImageUrl: 'https://www.bfivewarriors.com/assets/images/gallery/image16.png',
        badgeText: '✨ WE DESIGN. YOU CELEBRATE.',
        title: 'Where Every Event Becomes a Story',
        subtitle: 'Weddings • Engagements • Birthdays • Anniversaries • Corporate Events',
        ctaPrimaryText: 'Start Planning',
        ctaPrimaryLink: '#contact',
        ctaSecondaryText: 'View Packages',
        ctaSecondaryLink: '/packages',
      });
      await hero.save();
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHero = async (req, res) => {
  try {
    const {
      badgeText,
      title,
      subtitle,
      ctaPrimaryText,
      ctaPrimaryLink,
      ctaSecondaryText,
      ctaSecondaryLink,
    } = req.body;

    let hero = await Hero.findOne({});
    if (!hero) {
      hero = new Hero({
        leftImageUrl: 'https://images.unsplash.com/photo-1530023367847-a683933f4172',
        rightImageUrl: 'https://www.bfivewarriors.com/assets/images/gallery/image16.png',
      });
    }

    if (badgeText !== undefined) hero.badgeText = badgeText;
    if (title !== undefined) hero.title = title;
    if (subtitle !== undefined) hero.subtitle = subtitle;
    if (ctaPrimaryText !== undefined) hero.ctaPrimaryText = ctaPrimaryText;
    if (ctaPrimaryLink !== undefined) hero.ctaPrimaryLink = ctaPrimaryLink;
    if (ctaSecondaryText !== undefined) hero.ctaSecondaryText = ctaSecondaryText;
    if (ctaSecondaryLink !== undefined) hero.ctaSecondaryLink = ctaSecondaryLink;

    // Check for uploaded files
    if (req.files) {
      if (req.files.leftImage && req.files.leftImage[0]) {
        if (hero.leftImageCloudinaryId) {
          await cloudinary.uploader.destroy(hero.leftImageCloudinaryId);
        }
        hero.leftImageUrl = req.files.leftImage[0].path;
        hero.leftImageCloudinaryId = req.files.leftImage[0].filename;
      }
      if (req.files.rightImage && req.files.rightImage[0]) {
        if (hero.rightImageCloudinaryId) {
          await cloudinary.uploader.destroy(hero.rightImageCloudinaryId);
        }
        hero.rightImageUrl = req.files.rightImage[0].path;
        hero.rightImageCloudinaryId = req.files.rightImage[0].filename;
      }
    }

    const updatedHero = await hero.save();

    // Trigger realtime updates
    const io = req.app.get('io');
    if (io) {
      io.emit('hero_update', updatedHero);
    }

    res.json(updatedHero);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
