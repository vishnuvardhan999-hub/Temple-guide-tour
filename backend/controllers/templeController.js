const Temple = require('../models/Temple');

// Create a new temple (Admin only)
exports.createTemple = async (req, res) => {
  try {
    const { name, description, photoUrl, lat, lng } = req.body;

    if (!name || lat === undefined || lng === undefined) {
      return res.status(400).json({ error: 'Name, lat, and lng are required' });
    }

    const temple = await Temple.create({
      name,
      description,
      photoUrl,
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)],
      },
    });

    res.status(201).json(temple);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Get all temples
exports.getAllTemples = async (req, res) => {
  try {
    const temples = await Temple.find();
    res.json(temples);
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Update a temple by ID (Admin only)
exports.updateTemple = async (req, res) => {
  try {
    const updateData = req.body;

    // Update location if lat/lng provided
    if (updateData.lat !== undefined && updateData.lng !== undefined) {
      updateData.location = {
        type: 'Point',
        coordinates: [parseFloat(updateData.lng), parseFloat(updateData.lat)],
      };
      delete updateData.lat;
      delete updateData.lng;
    }

    const temple = await Temple.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!temple) return res.status(404).json({ error: 'Temple not found' });
    res.json(temple);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// Delete a temple by ID (Admin only)
exports.deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findByIdAndDelete(req.params.id);
    if (!temple) return res.status(404).json({ error: 'Temple not found' });
    res.json({ message: 'Temple deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get temples near a given lat/lng within radius (km)
exports.getNearbyTemples = async (req, res) => {
  const { lat, lng, radius = 10 } = req.query; // default 10 km radius

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  const radiusInMeters = parseFloat(radius) * 1000;

  try {
    const temples = await Temple.find({
      location: {
        $nearSphere: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: radiusInMeters,
        },
      },
    });

    res.json({ temples });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
