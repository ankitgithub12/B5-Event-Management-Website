import Portfolio from '../models/Portfolio.js';
import { cloudinary } from '../config/cloudinaryConfig.js';

export const getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({}).sort({ createdAt: -1 });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPortfolio = async (req, res) => {
  try {
    const { title, category } = req.body;
    let imageUrl = '';
    let cloudinaryId = '';

    if (req.file) {
      imageUrl = req.file.path;
      cloudinaryId = req.file.filename;
    } else {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const portfolio = new Portfolio({
      title,
      category,
      imageUrl,
      cloudinaryId,
    });

    const createdPortfolio = await portfolio.save();

    // Trigger realtime updates
    const io = req.app.get('io');
    if (io) {
      io.emit('portfolio_update');
    }

    res.status(201).json(createdPortfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePortfolio = async (req, res) => {
  try {
    const { title, category } = req.body;
    const portfolio = await Portfolio.findById(req.params.id);

    if (portfolio) {
      portfolio.title = title || portfolio.title;
      portfolio.category = category || portfolio.category;

      if (req.file) {
        // Remove old image from Cloudinary
        if (portfolio.cloudinaryId) {
          await cloudinary.uploader.destroy(portfolio.cloudinaryId);
        }
        portfolio.imageUrl = req.file.path;
        portfolio.cloudinaryId = req.file.filename;
      }

      const updatedPortfolio = await portfolio.save();

      // Trigger realtime updates
      const io = req.app.get('io');
      if (io) {
        io.emit('portfolio_update');
      }

      res.json(updatedPortfolio);
    } else {
      res.status(404).json({ message: 'Portfolio item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (portfolio) {
      if (portfolio.cloudinaryId) {
        await cloudinary.uploader.destroy(portfolio.cloudinaryId);
      }
      await Portfolio.deleteOne({ _id: portfolio._id });

      // Trigger realtime updates
      const io = req.app.get('io');
      if (io) {
        io.emit('portfolio_update');
      }

      res.json({ message: 'Portfolio item removed' });
    } else {
      res.status(404).json({ message: 'Portfolio item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
