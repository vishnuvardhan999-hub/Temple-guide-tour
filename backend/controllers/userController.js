const User = require('../models/User');

// @desc Get current logged-in user's profile
// @route GET /api/users/me
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Update current logged-in user's profile
// @route PUT /api/users/me
exports.updateUserProfile = async (req, res) => {
  try {
    const updates = {};
    if (req.body.username) updates.username = req.body.username;
    if (req.body.email) updates.email = req.body.email;

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
      select: '-password',
    });

    res.json({ message: 'Profile updated', user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ===============================
// Admin-only controller functions
// ===============================

// @desc Get all users (admin only)
// @route GET /api/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Delete user by ID (admin only)
// @route DELETE /api/users/:id
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Update user role (admin only)
// @route PUT /api/users/:id/role
exports.updateUserRole = async (req, res) => {
  const { role } = req.body;
  if (!role || !['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid or missing role' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = role;
    await user.save();

    res.json({
      message: `User role updated to ${role}`,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateTheme = async (req, res) => {
  try {
    const { theme } = req.body;

    const allowedThemes = [
      "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
      "synthwave", "retro", "cyberpunk", "valentine", "halloween",
      "garden", "forest", "aqua", "lofi", "pastel", "fantasy",
      "wireframe", "black", "luxury", "dracula", "cmyk",
      "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"
    ];

    if (!allowedThemes.includes(theme)) {
      return res.status(400).json({
        error: `Invalid theme. Choose one of: ${allowedThemes.join(", ")}`
      });
    }

    req.user.theme = theme;
    await req.user.save();

    res.json({ message: 'Theme updated successfully', theme: req.user.theme });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const { username } = req.body;

    if (username) req.user.username = username;
    if (req.file && req.file.path) {
      req.user.profileImage = req.file.path;
    }

    await req.user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        profileImage: req.user.profileImage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
