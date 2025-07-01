const Temple = require('../models/Temple');

// Create a new temple
exports.createTemple = async (req, res) => {
  try {
    const temple = await Temple.create(req.body);
    res.status(201).json(temple);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all temples
exports.getAllTemples = async (req, res) => {
  try {
    const temples = await Temple.find();
    res.json(temples);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single temple by ID
exports.getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) return res.status(404).json({ error: 'Temple not found' });
    res.json(temple);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a temple by ID
exports.updateTemple = async (req, res) => {
  try {
    const temple = await Temple.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!temple) return res.status(404).json({ error: 'Temple not found' });
    res.json(temple);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a temple by ID
exports.deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findByIdAndDelete(req.params.id);
    if (!temple) return res.status(404).json({ error: 'Temple not found' });
    res.json({ message: 'Temple deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
