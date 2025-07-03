const Bookmark = require('../models/Bookmark');

// Add bookmark
exports.addBookmark = async (req, res) => {
  try {
    const existing = await Bookmark.findOne({
      user: req.user._id,
      temple: req.body.templeId,
    });

    if (existing) {
      return res.status(400).json({ error: 'Temple already bookmarked' });
    }

    const bookmark = await Bookmark.create({
      user: req.user._id,
      temple: req.body.templeId,
    });

    res.status(201).json(bookmark);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add bookmark' });
  }
};

// Get bookmarks for current user
exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id }).populate('temple');
    res.json(bookmarks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
};

// Remove a bookmark
exports.removeBookmark = async (req, res) => {
  try {
    await Bookmark.findOneAndDelete({
      user: req.user._id,
      temple: req.params.templeId,
    });

    res.json({ message: 'Bookmark removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove bookmark' });
  }
};
