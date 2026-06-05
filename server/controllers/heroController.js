import Hero from '../models/Hero.js';
import { cloudinary } from '../config/cloudinaryConfig.js';

// ─── Helper: migrate legacy left/right images → slideshowImages ──────────────
const migrateLegacyImages = async (hero) => {
  const toMigrate = [];

  if (hero.leftImageUrl) {
    toMigrate.push({
      url: hero.leftImageUrl,
      cloudinaryId: hero.leftImageCloudinaryId || '',
      order: 0,
    });
  }
  if (hero.rightImageUrl) {
    toMigrate.push({
      url: hero.rightImageUrl,
      cloudinaryId: hero.rightImageCloudinaryId || '',
      order: 1,
    });
  }

  if (toMigrate.length > 0) {
    hero.slideshowImages = toMigrate;
    hero.leftImageUrl = undefined;
    hero.leftImageCloudinaryId = undefined;
    hero.rightImageUrl = undefined;
    hero.rightImageCloudinaryId = undefined;
    await hero.save();
  }
};

// ─── GET /api/hero ─────────────────────────────────────────────────────────────
export const getHero = async (req, res) => {
  try {
    let hero = await Hero.findOne({});

    if (!hero) {
      hero = new Hero({
        slideshowImages: [
          {
            url: 'https://images.unsplash.com/photo-1530023367847-a683933f4172',
            cloudinaryId: '',
            order: 0,
          },
          {
            url: 'https://www.bfivewarriors.com/assets/images/gallery/image16.png',
            cloudinaryId: '',
            order: 1,
          },
        ],
        badgeText: '✨ WE DESIGN. YOU CELEBRATE.',
        title: 'Where Every Event Becomes a Story',
        subtitle: 'Weddings • Engagements • Birthdays • Anniversaries • Corporate Events',
        ctaPrimaryText: 'Start Planning',
        ctaPrimaryLink: '#contact',
        ctaSecondaryText: 'View Packages',
        ctaSecondaryLink: '/packages',
      });
      await hero.save();
    } else {
      // Auto-migrate legacy images if needed
      if ((!hero.slideshowImages || hero.slideshowImages.length === 0) &&
          (hero.leftImageUrl || hero.rightImageUrl)) {
        await migrateLegacyImages(hero);
        hero = await Hero.findOne({});
      }
    }

    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── PUT /api/hero ─────────────────────────────────────────────────────────────
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
      hero = new Hero({ slideshowImages: [] });
    }

    if (badgeText !== undefined) hero.badgeText = badgeText;
    if (title !== undefined) hero.title = title;
    if (subtitle !== undefined) hero.subtitle = subtitle;
    if (ctaPrimaryText !== undefined) hero.ctaPrimaryText = ctaPrimaryText;
    if (ctaPrimaryLink !== undefined) hero.ctaPrimaryLink = ctaPrimaryLink;
    if (ctaSecondaryText !== undefined) hero.ctaSecondaryText = ctaSecondaryText;
    if (ctaSecondaryLink !== undefined) hero.ctaSecondaryLink = ctaSecondaryLink;

    // Append newly uploaded slideshow images
    if (req.files && req.files.slideshowImages) {
      const newSlides = req.files.slideshowImages.map((file, idx) => ({
        url: file.path,
        cloudinaryId: file.filename,
        order: (hero.slideshowImages.length) + idx,
      }));
      hero.slideshowImages.push(...newSlides);
    }

    const updatedHero = await hero.save();

    // Realtime push via socket.io
    const io = req.app.get('io');
    if (io) io.emit('hero_update', updatedHero);

    res.json(updatedHero);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ─── DELETE /api/hero/slide/:slideId ─────────────────────────────────────────
export const deleteHeroSlide = async (req, res) => {
  try {
    const { slideId } = req.params;

    const hero = await Hero.findOne({});
    if (!hero) return res.status(404).json({ message: 'Hero not found' });

    const slide = hero.slideshowImages.id(slideId);
    if (!slide) return res.status(404).json({ message: 'Slide not found' });

    // Delete from Cloudinary if we have a cloudinaryId
    if (slide.cloudinaryId) {
      try {
        await cloudinary.uploader.destroy(slide.cloudinaryId);
      } catch (cloudErr) {
        console.warn('Cloudinary delete warning:', cloudErr.message);
      }
    }

    // Remove slide from array and re-index order
    hero.slideshowImages = hero.slideshowImages
      .filter((s) => s._id.toString() !== slideId)
      .map((s, idx) => ({ ...s.toObject(), order: idx }));

    const updatedHero = await hero.save();

    // Realtime push
    const io = req.app.get('io');
    if (io) io.emit('hero_update', updatedHero);

    res.json(updatedHero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
