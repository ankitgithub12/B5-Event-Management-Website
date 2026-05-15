import Example from '../models/Example.js';

// @desc    Get all examples
// @route   GET /api/examples
// @access  Public
export const getExamples = async (req, res) => {
  try {
    const examples = await Example.find();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an example
// @route   POST /api/examples
// @access  Public
export const createExample = async (req, res) => {
  try {
    const { name, description } = req.body;
    const example = new Example({ name, description });
    const createdExample = await example.save();
    res.status(201).json(createdExample);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
